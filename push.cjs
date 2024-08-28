/***
 * 该脚本用于推送到远端服务器制作docker镜像
 */
const { name, group, version } = require("./package.json"); // 获取 package.json 中的版本号
const webLabel = name + version;
// 假设你要推送的本地目录
const localDistPath = `dist/${version}`;
const startTime = new Date().getTime();

const { execSync } = require("child_process");

function checkMasterGit() {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
    if (branch !== "master") {
      console.error("当前非master分支！");
      return false;
    }

    console.log(`当前Git分支是: ${branch}`);

    const statusOutput = execSync("git status --porcelain", {
      encoding: "utf8",
    });
    if (statusOutput.trim().length > 0) {
      console.error("本地代码未完全提交到Git仓库，要保证生产环境与master代码一致才能推送！");
      return false;
    }

    const latestLocalCommitHash = execSync("git rev-parse master").toString().trim();

    console.log("正在更新远程信息...");
    execSync("git fetch ");
    console.log("远程信息已更新..");

    const remoteCommitHash = execSync("git ls-remote origin master")
      .toString()
      .trim()
      .substring(0, latestLocalCommitHash.length);

    if (latestLocalCommitHash !== remoteCommitHash) {
      console.error("本地代码未同步到远程仓库，要保证生产环境与master代码一致！");
      return false;
    }

    console.log("master分支校验通过");
    return true;
  } catch (error) {
    console.error("Git分支校验错误:", error);
    return false;
  }
}

// 远程服务器信息
let remoteHost = "172.31.0.25";
let remotePort = "22022";
let remoteUser = "slzs";
let remotePwd = "1q2w3e4r%T^Y";
let remotePath = `/home/slzs/web/`;

// npm run push 403 带403参数时推送至403配置服务器
if (process.argv[2] === "403") {
  remoteHost = "10.61.23.141";
  remotePort = "22";
  remoteUser = "root";
  remotePwd = "Wxb@2023!";
  remotePath = `/home/slzs/web/`;
  console.log("推送至403仓库，检查是否为主分支");
  const res = checkMasterGit();
  if (!res) {
    process.exit(1); // 退出脚本，返回非零状态表示失败
  }
} else {
  console.log("推送至政务云仓库");
}

const ora = require("ora");
const spinner = ora(`版本推送 ${localDistPath} ==> ${remoteHost}:${remotePath}`);
spinner.start();

const client = require("scp2");
client.scp(
  localDistPath,
  {
    host: remoteHost,
    username: remoteUser,
    password: remotePwd,
    port: remotePort,
    path: remotePath + webLabel,
  },
  (err) => {
    client.close();
    spinner.stop();
    if (err) {
      console.error(`SCP Error: ${err}`);
      process.exit(1); // 传输失败时退出
    } else {
      console.log(`文件上传耗时：${(new Date().getTime() - startTime) / 1000}s`);
      doPack(); // 打包镜像
    }
  }
);

const imageTag = `${remoteHost}/${group}/${name}:${version}`;
const { Client } = require("ssh2");
function doPack() {
  const conn = new Client();
  conn
    .on("ready", () => {
      console.log("开始制作镜像");
      const command = `
        sudo docker inspect ${imageTag} &>/dev/null && exit 2 || (
          cat > ${remotePath}${webLabel}/Dockerfile << EOF
FROM ${remoteHost}/trs/httpd:2.4.58_slzs20240627
ADD ./ /usr/local/apache2/htdocs
ENV HOST_IP=
ENV API_SERVER=
EXPOSE 443
ENTRYPOINT ["/usr/local/apache2/openssl.sh"]
EOF
          sudo docker build -t="${imageTag}" ${remotePath}${webLabel} &&
          sudo docker push ${imageTag} || exit 3
        )`;

      conn.exec(command, (err, stream) => {
        if (err) throw err;
        stream
          .on("close", (code, signal) => {
            console.log("end-code: " + code);
            if (code === 2) {
              console.log("版本已经存在，请注意修改版本号重新发布！");
            } else if (code === 3) {
              console.log("版本镜像制作失败！");
            } else {
              console.log("镜像制作完成 :: " + imageTag);
              console.log(
                `推送至[${process.argv[2] === "403" ? "403" : "政务云"}]共耗时：${
                  (new Date().getTime() - startTime) / 1000
                }s`
              );
            }
            conn.end();
          })
          .on("data", (data) => {
            console.log("STDOUT: " + data);
          })
          .stderr.on("data", (data) => {
            console.log("STDERR: " + data);
          });
      });
    })
    .connect({
      host: remoteHost,
      username: remoteUser,
      password: remotePwd,
      port: remotePort,
    });
}

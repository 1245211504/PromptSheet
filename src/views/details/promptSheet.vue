<!-- 提示单详情 -->
<template>
  <div class="promptSheet">
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <van-loading type="spinner" color="#1989fa" size="50px" />
      </div>
    </van-overlay>
    <van-nav-bar
      title="提示单详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="box">
      <div class="title">舆情提示单</div>
      <div class="id">（编号：{{ info.promptNum }}）</div>
      <div class="table">
        <div class="row">
          <div class="item half">
            <div class="label">发送单位</div>
            <div class="value">{{ info.sendOrgName }}</div>
          </div>
          <div class="item half">
            <div class="label">发送时间</div>
            <div class="value">
              {{ moment(info.sendTime).format("YYYY-MM-DD hh:mm:ss") }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item half">
            <div class="label">接收人</div>
            <div class="value">{{ info.sendUserName }}</div>
          </div>
          <div class="item half">
            <div class="label">联系电话</div>
            <div class="value">{{ info.sendUserPhone }}</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">舆情线索</div>
            <div class="value">
              <InfoContent
                :info="{
                  msgTitle: info.msgTitle,
                  msgAbstract: info.msgAbstract,
                  msgContentUrl: info.msgContentUrl,
                }"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">舆情处 <br />置建议</div>
            <div class="value">{{ info.suggest }}</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">情况反馈</div>
            <div class="value feedback">
              <span v-if="info.promptStatus === 4">
                {{ info.backContent }}
              </span>
              <div v-else>
                <div>
                  {{ feedback }}
                </div>
                <div class="btn" @click="toFill">
                  <van-icon name="records-o" />
                  {{
                    feedback || info.promptStatus === 5
                      ? "重新填写反馈内容"
                      : "填写反馈内容"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="remark">
        <div class="item">单位：{{ info.promptOrganName }}</div>
        <div class="item">联系人：{{ info.promptUserName }}</div>
        <div class="item">电话：{{ info.sendPhone }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
//生命周期 - 创建完成（访问当前this实例）
import moment from "moment";
import InfoContent from "@/components/infoContent/index.vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { findById } from "@/services/api";
const info = ref({});
const route = useRoute();
const router = useRouter();
const feedback = ref("");
const show = ref(true);

const toFill = () => {
  router.push({
    path: "/Details/FillFeedback",
  });
};

onBeforeMount(async () => {
  const response = await findById({
    promptMsgId: route.query.id,
  });
  show.value = false
  let routerFrom = JSON.parse(localStorage.getItem("routerFrom"));
  if (routerFrom?.fullPath === "/Details/FillFeedback") {
    //暂存的时候路由跳回来
    feedback.value = localStorage.getItem("feedback");
  } else {
    feedback.value = localStorage.removeItem("feedback");
  }
  info.value = response.data;
  if (response.data.promptStatus === 5) {
    localStorage.setItem("feedback", response.data.backContent);
    feedback.value = response.data.backContent;
  }
  localStorage.setItem("promptSheetDetails", JSON.stringify(response.data));
});

const onClickLeft = () => {
  history.back();
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.promptSheet {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .box {
    height: calc(~"100vh - 105px");
    overflow-y: auto;
  }
  .title {
    font-weight: 600;
    text-align: center;
    font-size: 18px;
    line-height: 30px;
  }
  .id {
    text-align: center;
  }
  .table {
    background-color: #fff;
    border-top: 1px solid #aaa;
    border-left: 1px solid #aaa;
    margin: 5px;
    font-size: 14px;
    .row {
      display: flex;
    }
    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50px;
      & > div {
        border-bottom: 1px solid #aaa;
        border-right: 1px solid #aaa;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .label {
        width: 25%;
        text-align: center;
        font-weight: 600;
      }
      .value {
        width: 75%;
        text-align: center;
        word-break: break-all;
        :deep(.infoContent) {
          padding: 10px;
        }
      }
      .feedback {
        padding: 10px;
        width: calc(~"75% - 20px");
        height: calc(~"100% - 20px");
      }
      .Clue {
        height: 400px;
      }
      .content {
        width: 100%;
      }
      .btn {
        background-color: #e6f7ff;
        border: 1px solid #228be2;
        border-radius: 5px;
        padding: 0 5px;
        font-size: 14px;
        line-height: 26px;
        .van-icon {
          color: #228be2;
          font-size: 16px;
        }
      }
    }
    .half {
      width: 50%;
      .label {
        width: 50%;
      }
      .value {
        width: 50%;
      }
    }
  }
  .remark {
    padding: 10px;
    font-size: 14px;
  }
}
</style>

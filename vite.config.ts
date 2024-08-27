import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const packageInfo: any = require('./package.json');
console.log(packageInfo.version);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    vueJsx(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://172.31.0.25:32822/api/', // 目标服务器地址
        changeOrigin: true, // 是否改变请求源
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: `dist/${packageInfo.version}`
  }
})

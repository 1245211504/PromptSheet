import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const packageInfo: any = require('./package.json');
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
      imports: [
        'vue', // 自动导入 Vue 相关函数
        'vue-router', // 自动导入 vue-router 相关函数
        'pinia', // 自动导入 pinia 相关函数

      ],
      dts: fileURLToPath(new URL('./auto-imports.d.ts', import.meta.url)) // 生成类型声明文件
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    vueJsx(),
    createSvgIconsPlugin({
      // 指定 SVG图标 保存的文件夹路径
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 使用svg图标的格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  server: {
    proxy: {
      '/sheetapi': {
        target: 'http://172.31.0.23:32822/', // 目标服务器地址
        // target: 'http://192.168.0.21:8098/',
        changeOrigin: true, // 是否改变请求源
        rewrite: (path) => path.replace(/^\/sheetapi/, ''), // 重写路径
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

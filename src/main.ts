import './assets/main.css'
import './assets/common.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import App from './App.vue'
import router from './router'
import http from './services/http';
import gloablComponent from './components/index';

const app = createApp(App)
app.config.globalProperties.$http = http;
app.use(gloablComponent);
// 全局注册 SvgIcon 组件
app.use(createPinia())
app.use(router)

app.mount('#app')

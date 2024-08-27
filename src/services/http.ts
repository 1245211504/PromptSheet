import axios from 'axios';
import type { AxiosInstance } from 'axios';

// 创建 Axios 实例
const http: AxiosInstance = axios.create({
  baseURL: '/api', // 替换为你的 API 基础路径
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Token'] = token
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data;
  },
  (error) => {
    // 对响应错误做些什么
    if (error.response) {
      // 处理不同的错误状态码
      switch (error.response.status) {
        case 401:
          console.log('未授权，请登录');
          break;
        case 403:
          console.log('拒绝访问');
          break;
        case 404:
          console.log('请求地址出错');
          break;
        case 500:
          console.log('服务器内部错误');
          break;
        default:
          console.log('其他错误信息');
      }
    }
    return Promise.reject(error);
  }
);

export default http;

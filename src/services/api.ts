// src/services/api.ts
import http from './http.js';

// 查询提示单列表
export const findAllAPI = (params: any) => {
  return http.get('/api/prompt/findAllAPI', { params });
};

// 根据提示单id查询信息
export const findById = (params: any) => {
  return http.get('/api/prompt/findById', { params });
};

// 提交反馈
export const updateMsgStatus = (data: any) => {
  return http.post(`/api/prompt/updateMsgStatus`, data);
};


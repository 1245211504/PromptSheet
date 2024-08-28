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

// 示例：更新用户信息
export const updateUser = (userId: string, data: any) => {
  return http.put(`/users/${userId}`, data);
};

// 示例：删除用户
export const deleteUser = (userId: string) => {
  return http.delete(`/users/${userId}`);
};

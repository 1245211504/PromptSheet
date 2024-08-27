// src/services/api.ts
import http from './http.js';

// 示例：获取用户信息
export const findAllAPI = (params: any) => {
  return http.get('/prompt/findAllAPI', { params });
};

// 示例：创建新用户
export const createUser = (data: any) => {
  return http.post('/users', data);
};

// 示例：更新用户信息
export const updateUser = (userId: string, data: any) => {
  return http.put(`/users/${userId}`, data);
};

// 示例：删除用户
export const deleteUser = (userId: string) => {
  return http.delete(`/users/${userId}`);
};

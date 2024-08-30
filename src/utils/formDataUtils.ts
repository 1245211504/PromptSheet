// utils/formDataUtils.ts
import { stringify, parse } from 'flatted';

/**
 * 将一个对象转换为 FormData
 * @param data - 需要转换的对象
 * @returns FormData 对象
 */
export const jsonToFormData = (data: Record<string, any>): FormData => {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      const value = data[key];
      
      // 跳过 null 和 undefined 值
      if (value === null || value === undefined) {
        return;
      }
      
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          // 处理数组元素
          if (item === null || item === undefined) {
            return;
          }
          formData.append(`${key}[${index}]`, item);
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value && typeof value === 'object') {
        // 如果是对象，将其转换为 JSON 字符串
        formData.append(key, stringify(value));
      } else {
        // 处理基本数据类型
        formData.append(key, value);
      }
    });
    
    return formData;
  };
  
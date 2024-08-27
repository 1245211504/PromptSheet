// src/shims-vue.d.ts
import { ComponentCustomProperties } from 'vue';
import { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $http: AxiosInstance;
    }
}

export { };

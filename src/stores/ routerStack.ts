import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useRouterStack = defineStore('routerStack', () => {

    const routerStack = ref<string[]>([])

    return {routerStack}
})
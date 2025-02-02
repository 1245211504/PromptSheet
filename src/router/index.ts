import { createRouter, createWebHistory } from 'vue-router'
import { stringify, parse } from 'flatted';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/TodoList'
        },
        {
            path: '/TodoList',
            name: 'TodoList',
            component: () => import('@/views/todoList/index.vue')
        },
        {
            path: '/NearlyWeek',
            name: 'NearlyWeek',
            component: () => import('@/views/nearlyWeek/index.vue')
        }, {
            path: '/SearchHistory',
            name: 'SearchHistory',
            component: () => import('@/views/searchHistory/index.vue')
        }, {
            path: '/Details/PromptSheet',
            name: 'promptSheet',
            component: () => import('@/views/details/promptSheet.vue')
        }, {
            path: '/Details/FillFeedback',
            name: 'FillFeedback',
            component: () => import('@/views/details/fillFeedback.vue')
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (from.name) {
        let json = stringify(from)
        localStorage.setItem('routerFrom', json)
    }
    next();
});
export default router

import { createRouter, createWebHistory } from 'vue-router'

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
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/nearlyWeek/index.vue')
        }, {
            path: '/SearchHistory',
            name: 'SearchHistory',
            component: () => import('@/views/searchHistory/index.vue')
        },
    ]
})

export default router

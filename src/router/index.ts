import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'
console.log(routes, '-----routes')

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...routes,
        {
            path: '/:pathMatch(.*)*',
            name: '/',
            redirect: '/first'
        }
    ]
})

import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/page1'
        },
        {
            path: '',
            name: 'home',
            component: home,
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    component: () => import('@/views/page1')
                },
                {
                    path: '/page2',
                    name: 'page2',
                    component: () => import('@/views/page2')
                },
                {
                    path: '/page3',
                    name: 'page3',
                    component: () => import('@/views/page3')
                },
                {
                    path: '/page4',
                    name: 'page4',
                    component: () => import('@/views/page4')
                },
                {
                    path: '/page5',
                    name: 'page5',
                    component: () => import('@/views/page5')
                },
                {
                    path: '/page6',
                    name: 'page6',
                    component: () => import('@/views/page6')
                },
                {
                    path: '/userInfo',
                    name: 'userInfo',
                    component: () => import('@/views/userInfo')
                },
            ]
        }
    ]
})
export default router

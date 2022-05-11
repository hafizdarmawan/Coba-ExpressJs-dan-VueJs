// import vue router
import {
    createRouter,
    createWebHistory
} from 'vue-router'

// define routes
const routes = [

    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName:'home'*/ '@/views/Index.vue')
    },

    {
        path: '/posts',
        name: 'posts.index',
        component: () => import( /* webpackChunkName:"post.index"*/ '@/views/posts/Index.vue')
    },

    {
        path: '/posts/create',
        name: 'posts.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/posts/Create.vue')
    },

    {
        path: '/posts/edit/:id',
        name: 'posts.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/posts/Edit.vue')
    }
]

// create router
const router = createRouter({
    history: createWebHistory(),
    routes //config
})

export default router
import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('@/views/Login.vue');
const Home = () => import('@/views/Home.vue');
const OrderManage = () => import('@/views/OrderManage.vue');
const Register = () => import('@/views/Register.vue');
const PersonCenter = () => import('@/views/PersonCenter.vue');
const GoodManageInfo = () => import('@/views/goodManage/Info.vue');
const GoodManageCategory = () => import('@/views/goodManage/Category.vue');
const GoodManageGoodAdd = () => import('@/views/goodManage/GoodAdd.vue');
const GoodManageEvaluate = () => import('@/views/goodManage/Evaluate.vue');
const MessageCenter = () => import('@/views/MessageCenter.vue');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home',
            redirect: '/home/goodManage/info',
            children: [
                {
                    path: '/home/goodManage/info',
                    component: GoodManageInfo,
                    name: 'goodManageInfo'
                },
                {
                    path: '/home/goodManage/category',
                    component: GoodManageCategory,
                    name: 'goodManageCategory'
                },
                {
                    path: '/home/goodManage/goodAdd',
                    component: GoodManageGoodAdd,
                    name: 'goodManageGoodAdd'
                },
                {
                    path: '/home/goodManage/evaluate',
                    component: GoodManageEvaluate,
                    name: 'goodManageEvaluate'
                },
                {
                    path: '/home/orderManage',
                    name: 'orderManage',
                    component: OrderManage
                },
                {
                    path: '/home/messageCenter',
                    name: 'messageCenter',
                    component: MessageCenter
                },
                {
                    path: '/home/personCenter',
                    name: 'personCenter',
                    component: PersonCenter
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

export default router;

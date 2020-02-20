import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Login from '@/views/Login'
import Index from '@/views/Index'

export function createRouter() {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: Index,
            },
            {
                path: '/login',
                component: Login,
                meta: {fullPage: true}
            },
            {
                path: '/userList',
                component: () => import(/*webpackChunkName: "UserList"*/'@/views/UserList'),
                meta: ['数据管理', '用户列表']
            },
            {
                path: '/shopList',
                component: () => import(/*webpackChunkName: "ShopList"*/'@/views/ShopList'),
                meta: ['数据管理', '商家列表']
            },
            {
                path: '/foodList',
                component: () => import(/*webpackChunkName: "FoodList"*/'@/views/FoodList'),
                meta: ['数据管理', '食品列表']
            },
            {
                path: '/orderList',
                component: () => import(/*webpackChunkName: "OrderList"*/'@/views/OrderList'),
                meta: ['数据管理', '订单列表']
            },
            {
                path: '/adminList',
                component: () => import(/*webpackChunkName: "AdminList"*/'@/views/AdminList'),
                meta: ['数据管理', '管理员列表']
            },
            {
                path: '/addShop',
                component: () => import(/*webpackChunkName: "AddShop"*/'@/views/AddShop'),
                meta: ['添加数据', '添加商铺']
            },
            {
                path: '/addFood',
                component: () => import(/*webpackChunkName: "AddFood"*/'@/views/AddFood'),
                meta: ['添加数据', '添加商品']
            },
            {
                path: '/userDistribution',
                component: () => import(/*webpackChunkName: "UserDistribution"*/'@/views/UserDistribution'),
                meta: ['图表', '用户分布']
            },
            {
                path: '/textEdit',
                component: () => import(/*webpackChunkName: "TextEdit"*/'@/views/TextEdit'),
                meta: ['编辑', '文本编辑']
            },
            {
                path: '/adminSetting',
                component: () => import(/*webpackChunkName: "AdminSetting"*/'@/views/AdminSetting'),
                meta: ['设置', '管理员设置']
            },
            {
                path: '/illustrationItem',
                component: () => import(/*webpackChunkName: "IllustrationItem"*/'@/views/IllustrationItem'),
                meta: ['说明', '说明']
            },
            {
                path: '*',
                component: () => import(/*webpackChunkName: "NotFound"*/'@/views/NotFound'),
                meta: {fullPage: true}
            }]
    })
}
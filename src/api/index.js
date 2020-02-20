import axios from 'axios'
import {baseURL} from '@/utils/config'

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

// 登录
export const signIn = data => axios({
    method: 'post',
    url: '/admin/login',
    data
});

// 退出
export const signOut = data => axios({
    method: 'get',
    url: '/admin/singout'
});

// 管理员信息
export const getAdminInfo = () => axios({
    method: 'get',
    url: '/admin/info'
});

// 某天用户注册量
export const getUserDayCount = date => axios({
    method: 'get',
    url: '/statis/user/' + date + '/count'
});

// 某天订单数量
export const getOrderDayCount = date => axios({
    method: 'get',
    url: '/statis/order/' + date + '/count'
});

// 某天管理员注册量
export const getAdminDayCount = date => axios({
    method: 'get',
    url: '/statis/admin/' + date + '/count'
});

// 全部用户注册量
export const getUserTotalCount = () => axios({
    method: 'get',
    url: '/v1/users/count'
});

// 全部订单数量
export const getOrderTotalCount = () => axios({
    method: 'get',
    url: '/bos/orders/count'
});

// 全部管理员注册量
export const getAdminTotalCount = () => axios({
    method: 'get',
    url: '/admin/count'
});

// 全部用户列表
export const getUserInfoList = (limit, offset) => axios({
    method: 'get',
    url: '/v1/users/list',
    params: {
        limit,
        offset
    }
});

// 全部管理员列表
export const getAdminInfoList = (limit, offset) => axios({
    method: 'get',
    url: '/admin/all',
    params: {
        limit,
        offset
    }
});

// 全部订单列表
export const getOrderInfoList = (limit, offset) => axios({
    method: 'get',
    url: '/bos/orders',
    params: {
        limit,
        offset
    }
});

// 用户分布信息
export const getAdminDistribution = (limit, offset) => axios({
    method: 'get',
    url: '/v1/user/city/count'
});

// 全部店铺列表
export const getShopList = (latitude, longitude, limit, offset, order_by) => axios({
    method: 'get',
    url: '/shopping/restaurants',
    params: {
        latitude,
        longitude,
        limit,
        offset,
        order_by
    }
});

// 全部店铺数量
export const getShopCount = () => axios({
    method: 'get',
    url: '/shopping/restaurants/count'
});

// 添加店铺
export const addShop = data => axios({
    method: 'post',
    url: '/shopping/addshop',
    data
});

// 店铺种类列表
export const getShopCategory = () => axios({
    method: 'get',
    url: '/shopping/v2/restaurant/category'
});

// 城市定位信息
export const getCityLocation = () => axios({
    method: 'get',
    url: '/v1/cities',
    params: {
        type: 'guess'
    }
});

// 更新店铺
export const updateShop = data => axios({
    method: 'post',
    url: '/shopping/updateshop',
    data
});

// 删除店铺
export const deleteShop = id => axios({
    method: 'delete',
    url: '/shopping/restaurant/' + id
});

// 全部食品列表
export const getFoodList = (limit, offset, restaurant_id) => axios({
    method: 'get',
    url: '/shopping/v2/foods',
    params: {
        limit,
        offset,
        restaurant_id
    }
});

// 全部食品数量
export const getFoodCount = () => axios({
    method: 'get',
    url: '/shopping/v2/foods/count'
});

// 店铺详情
export const getShopInfo = shopID => axios({
    method: 'get',
    url: '/shopping/restaurant/' + shopID
});

// 当前食品种类
export const getFoodCategory = restaurant_id => axios({
    method: 'get',
    url: '/shopping/getcategory/' + restaurant_id
});

// 添加食品种类
export const addFoodCategory = data => axios({
    method: 'post',
    url: '/shopping/addcategory',
    data
});

// 添加食品
export const addFood = data => axios({
    method: 'post',
    url: '/shopping/addfood',
    data
});

// 食品种类详情
export const getCategoryInfo = category_id => axios({
    method: 'get',
    url: '/shopping/v2/menu/' + category_id
});

// 删除食品
export const deleteFood = food_id => axios({
    method: 'delete',
    url: '/shopping/v2/food/' + food_id
});

//更新食品
export const updateFood = data => axios({
    method: 'post',
    url: '/shopping/v2/updatefood',
    data
});
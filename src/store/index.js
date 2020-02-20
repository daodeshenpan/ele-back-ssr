import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import {getAdminInfo, getUserInfoList, getUserTotalCount, getShopCategory} from '@/api/index'

export function createStore() {
    return new Vuex.Store({
        state: {
            adminInfo: {},
            userInfoList: [],
            userTotalCount: 0,
            shopCategory: []
        },
        mutations: {
            setAdminInfo(state, payload) {
                state.adminInfo = payload;
            },
            setUserInfoList(state, payload) {
                state.userInfoList = payload;
            },
            setUserTotalCount(state, payload) {
                state.userTotalCount = payload;
            },
            setShopCategory(state, payload) {
                payload.forEach(item => {
                    if (item.sub_categories.length) {
                        let addnew = {
                            value: item.name,
                            label: item.name,
                            children: []
                        };
                        item.sub_categories.forEach((subitem, index) => {
                            if (index === 0) {
                                return;
                            }
                            addnew.children.push({
                                value: subitem.name,
                                label: subitem.name,
                            });
                        });
                        state.shopCategory.push(addnew);
                    }
                });
            }
        },
        actions: {
            fetchAdminInfo({commit}) {
                return getAdminInfo().then(({data}) => {
                    if (data.status === 1) {
                        commit('setAdminInfo', data.data);
                        return data.data;
                    }
                })
            },
            fetchUserInfoList({commit}, {limit, offset}) {
                return getUserInfoList(limit, offset).then(({data}) => {
                    commit('setUserInfoList', data);
                })
            },
            fetchUserTotalCount({commit}) {
                return getUserTotalCount().then(({data}) => {
                    commit('setUserTotalCount', data.count);
                })
            },
            fetchShopCategory({commit}) {
                return getShopCategory().then(({data}) => {
                    commit('setShopCategory', data);
                })
            }
        },
        modules: {}
    })
}
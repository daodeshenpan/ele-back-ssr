import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import {createStore} from './store'
import {sync} from 'vuex-router-sync'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

Vue.config.productionTip = false;

export function createApp() {
    const router = createRouter();
    const store = createStore();

    sync(store, router);

    if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
        store.replaceState(window.__INITIAL_STATE__);
    }

    router.beforeEach((to, from, next) => {
        console.log('beforeEach');
        console.log(store.state.adminInfo.user_name,
            store.state.adminInfo.id,
            store.state.adminInfo.create_time,
            store.state.adminInfo.status,
            store.state.adminInfo.city,
            store.state.adminInfo.avatar,
            store.state.adminInfo.admin);
        if (to.path === '/login') {
            next();
        } else {
            if (store.state.adminInfo.user_name) {
                next();
            } else {
                if (router.options.routes.some(route => {return route.path === to.path})) {
                    next('/login');
                } else {
                    next();
                }
            }
        }
    });

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    return {app, router, store}
}
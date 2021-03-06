import Vue from 'vue';
import {createApp} from './app'

Vue.mixin({
    beforeMount() {
        const {asyncData} = this.$options;
        if (asyncData) {
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            });
        }
    }
});

Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const {asyncData} = this.$options;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
});

const {app, router, store} = createApp();

router.onReady(() => {
    app.$mount('#app');
});
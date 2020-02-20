import {createApp} from './app'

export default context => {
    return new Promise((resolve, reject) => {
        const {app, router, store} = createApp();

        if (context.login) {
            store.state.adminInfo = {
                "user_name": "adminkkk",
                "id": 61771,
                "create_time": "2019-12-04 14:56",
                "status": 1,
                "city": "南昌",
                "avatar": "16ecfe82e9b59586.jpg",
                "admin": "管理员"
            };
        }

        router.push(context.url);

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();

            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(() => {
                context.state = store.state;

                resolve(app);
            }).catch(reject);
        }, reject)
    })
}
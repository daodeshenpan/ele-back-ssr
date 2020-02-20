<template>
    <div class="top-bar">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(value,index) in $route.meta" :key="index">{{value}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command="handleCommand">
            <img :src="imgBaseURL + adminInfo.avatar" alt=""
                 class="avatar">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="quit">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {signOut} from '@/api/index'
    import {imgBaseURL} from '@/utils/config'
    import {mapState} from 'vuex'

    export default {
        name: "TopBar",
        data() {
            return {
                imgBaseURL
            }
        },
        computed: mapState(['adminInfo']),
        methods: {
            handleCommand(command) {
                if (command === 'quit') {
                    signOut().then((response) => {
                        if (response.data.status === 1) {
                            this.$store.commit('setAdminInfo', {});
                            this.$message({
                                type: 'success',
                                message: response.data.success
                            });
                            this.$router.push('/login');
                        } else {

                        }
                    }).catch(() => {
                        this.$message({
                            type: 'error',
                            message: '网络错误'
                        })
                    })
                }
            }
        }
    }
</script>

<style>
    .top-bar {
        height: 60px;
        padding: 0 40px 0 20px;
        background-color: #eeeeee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 999;
    }

    .top-bar .avatar {
        width: 36px;
        height: 36px;
        border-radius: 100%;
        cursor: pointer;
    }
</style>
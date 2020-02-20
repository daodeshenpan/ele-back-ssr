<template>
    <div id="app">
        <el-menu v-if="!$route.meta.fullPage"
                 style="width: 20%;overflow-y: auto"
                 default-active="index"
                 class="fill-container"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 unique-opened
                 router>
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="dataManage">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据管理</span>
                </template>
                <el-menu-item index="/userList">用户列表</el-menu-item>
                <el-menu-item index="/shopList">商家列表</el-menu-item>
                <el-menu-item index="/foodList">食品列表</el-menu-item>
                <el-menu-item index="/orderList">订单列表</el-menu-item>
                <el-menu-item index="/adminList">管理员列表</el-menu-item>
            </el-submenu>
            <el-submenu index="addData">
                <template slot="title">
                    <i class="el-icon-aim"></i>
                    <span>添加数据</span>
                </template>
                <el-menu-item index="/addShop">添加商铺</el-menu-item>
                <el-menu-item index="/addFood">添加商品</el-menu-item>
            </el-submenu>
            <el-submenu index="/chart">
                <template slot="title">
                    <i class="el-icon-back"></i>
                    <span>图表</span>
                </template>
                <el-menu-item index="userDistribution">用户分布</el-menu-item>
            </el-submenu>
            <el-submenu index="/edit">
                <template slot="title">
                    <i class="el-icon-circle-close"></i>
                    <span>编辑</span>
                </template>
                <el-menu-item index="textEdit">文本编辑</el-menu-item>
            </el-submenu>
            <el-submenu index="/setting">
                <template slot="title">
                    <i class="el-icon-d-caret"></i>
                    <span>设置</span>
                </template>
                <el-menu-item index="adminSetting">管理员设置</el-menu-item>
            </el-submenu>
            <el-submenu index="/illustration">
                <template slot="title">
                    <i class="el-icon-edit"></i>
                    <span>说明</span>
                </template>
                <el-menu-item index="illustrationItem">说明</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="main" style="flex: 1">
            <top-bar v-if="!$route.meta.fullPage"/>
            <router-view style="flex: 1"/>
        </div>
    </div>
</template>

<script>
    import '@/assets/css/reset.css'
    import TopBar from '@/components/TopBar'

    export default {
        name: 'App',
        components: {
            TopBar
        },
        beforeCreate(){
            console.log('app beforeCreate');
        },
        created(){
            console.log('app created');
        }
    }
</script>

<style>
    html, body, #app {
        width: 100%;
        height: 100%;
    }

    #app {
        display: flex;
    }

    .main {
        display: flex;
        flex-direction: column;
    }

    .fill-container {
        width: 100%;
        height: 100%;
    }
</style>

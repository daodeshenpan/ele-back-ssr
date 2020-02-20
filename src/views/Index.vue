<template>
    <div class="index-content">
        <main-title title="数据统计"/>
        <el-row>
            <el-col :span="4" :offset="4">
                <div class="data-item">今日新增：</div>
            </el-col>
            <el-col :span="4">
                <div class="data-item"><span class="data-num">{{userDayCount}}</span>位用户</div>
            </el-col>
            <el-col :span="4">
                <div class="data-item"><span class="data-num">{{orderDayCount}}</span>份订单</div>
            </el-col>
            <el-col :span="4">
                <div class="data-item"><span class="data-num">{{adminDayCount}}</span>位管理员</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" :offset="4">
                <div class="data-item">合计：</div>
            </el-col>
            <el-col :span="4">
                <div class="data-item"><span class="data-num">{{userTotalCount}}</span>位用户</div>
            </el-col>
            <el-col :span="4">
                <div class="data-item"><span class="data-num">{{orderTotalCount}}</span>份订单</div>
            </el-col>
            <el-col :span="4">
                <div class="data-item"><span class="data-num">{{adminTotalCount}}</span>位管理员</div>
            </el-col>
        </el-row>
        <trend-chart/>
    </div>
</template>

<script>
    import MainTitle from '@/components/MainTitle'
    import TrendChart from '@/components/TrendChart'
    import {
        getUserDayCount,
        getOrderDayCount,
        getAdminDayCount,
        getUserTotalCount,
        getOrderTotalCount,
        getAdminTotalCount
    } from '@/api/index'

    export default {
        name: "Index",
        components: {
            MainTitle,
            TrendChart
        },
        data() {
            return {
                userDayCount: 0,
                orderDayCount: 0,
                adminDayCount: 0,
                userTotalCount: 0,
                orderTotalCount: 0,
                adminTotalCount: 0
            }
        },
        beforeRouteEnter(t, f, n) {
            console.log('index beforeRouteEnter');
            n();
        },
        asyncData() {
            console.log('index asyncData');
        },
        beforeCreate() {
            console.log('index beforeCreate');
        },
        created() {
            console.log('index created');
        },
        mounted() {
            Promise.all([getUserDayCount(this.getFormattedDate(0)),
                getOrderDayCount(this.getFormattedDate(0)),
                getAdminDayCount(this.getFormattedDate(0)),
                getUserTotalCount(),
                getOrderTotalCount(),
                getAdminTotalCount()]).then((value) => {
                this.userDayCount = value[0].data.count;
                this.orderDayCount = value[1].data.count;
                this.adminDayCount = value[2].data.count;
                this.userTotalCount = value[3].data.count;
                this.orderTotalCount = value[4].data.count;
                this.adminTotalCount = value[5].data.count;
            })
        },
        methods: {
            getFormattedDate(n) {
                let date = new Date(Date.now() - 86400000 * n);
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            }
        }
    }
</script>

<style>
    .index-content {
        overflow-y: auto;
    }

    .index-content .data-item {
        height: 40px;
        border-radius: 10px;
        background-color: #f9f9f9;
        margin: 10px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
    }

    .index-content .el-col:first-child .data-item {
        background-color: #FF9800;
        color: #ffffff;
        font-size: 20px;
    }

    .data-num {
        font-size: 26px;
        margin-right: 10px;
    }
</style>
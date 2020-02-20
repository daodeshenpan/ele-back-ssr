<template>
    <div class="user-list">
        <el-table
                :data="userInfoList"
                border
                size="small">
            <el-table-column
                    prop="id"
                    label="ID">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="registe_time"
                    label="注册日期">
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="注册地址">
            </el-table-column>
        </el-table>
        <el-pagination
                :page-size="20"
                layout="total, prev, pager, next"
                :total="userTotalCount"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "UserList",
        components: {},
        data() {
            return {
                tableData: [],
                total: 0
            }
        },
        computed: mapState(['userInfoList', 'userTotalCount']),
        asyncData({store, route}) {
            return Promise.all([store.dispatch('fetchUserInfoList', {
                limit: 20,
                offset: 0
            }), store.dispatch('fetchUserTotalCount')]);
        },
        methods: {
            handleCurrentChange(val) {
                this.$store.dispatch('fetchUserInfoList', {
                    limit: 20,
                    offset: (val - 1) * 20
                });
            }
        }
    }
</script>

<style>
    .user-list {
        overflow-y: auto;
    }

    .user-list .el-table, .user-list .el-pagination {
        width: 95%;
        margin: 25px auto;
    }
</style>
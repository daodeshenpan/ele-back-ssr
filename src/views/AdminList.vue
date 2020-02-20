<template>
    <div class="admin-list">
        <el-table
                :data="tableData"
                border
                size="small">
            <el-table-column
                    prop="id"
                    label="ID">
            </el-table-column>
            <el-table-column
                    prop="user_name"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="create_time"
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
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
    import {getAdminInfoList, getAdminTotalCount} from '@/api/index';

    export default {
        name: "AdminList",
        components: {
        },
        data(){
            return {
                tableData: [],
                total: 0
            }
        },
        mounted() {
            getAdminInfoList(20, 0).then(response => {
                this.tableData = response.data.data;
            });
            getAdminTotalCount().then(response => {
                this.total = response.data.count;
            });
        },
        methods: {
            handleCurrentChange(val) {
                getAdminInfoList(20, (val - 1) * 20).then(response => {
                    this.tableData = response.data.data;
                });
            }
        }
    }
</script>

<style>
    .admin-list {
        overflow-y: auto;
    }

    .admin-list .el-table ,.admin-list .el-pagination {
        width: 95%;
        margin: 25px auto;
    }
</style>
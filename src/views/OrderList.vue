<template>
    <div class="order-list">
        <el-table
                :data="tableData"
                border
                size="small">
            <el-table-column type="expand">
                <template #default="{row}">
                    <el-form label-position="left" class="table-expand">
                        <el-form-item label="店铺名称">
                            <span>{{ row.restaurant_name }}</span>
                        </el-form-item>
                        <el-form-item label="件数">
                            <span>{{ row.total_quantity }}</span>
                        </el-form-item>
                        <el-form-item label="金额">
                            <span>{{ row.total_amount }}</span>
                        </el-form-item>
                        <el-form-item label="订单状态">
                            <span>{{ row.status_bar.title }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="ID">
            </el-table-column>
            <el-table-column
                    prop="user_id"
                    label="用户ID">
            </el-table-column>
            <el-table-column
                    prop="formatted_created_at"
                    label="下单时间">
            </el-table-column>
            <el-table-column
                    prop="status_bar.title"
                    label="订单状态">
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
    import {getOrderInfoList, getOrderTotalCount} from '@/api/index';

    export default {
        name: "OrderList",
        components: {
        },
        data() {
            return {
                tableData: [],
                total: 0
            }
        },
        mounted() {
            getOrderInfoList().then(response => {
                this.tableData = response.data;
            });
            getOrderTotalCount().then(response => {
                this.total = response.data.count;
            })
        },
        methods: {
            handleCurrentChange(val) {
                getOrderInfoList(20, (val - 1) * 20).then(response => {
                    this.tableData = response.data;
                });
            }
        }
    }
</script>

<style>
    .order-list{
        overflow-y: auto;
    }

    .order-list .el-table, .order-list .el-pagination {
        width: 95%;
        margin: 25px auto;
    }

    .order-list .table-expand {
        font-size: 0;
    }

    .order-list .table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .order-list .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
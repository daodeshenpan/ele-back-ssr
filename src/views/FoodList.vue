<template>
    <div class="food-list">
        <el-table
                :data="tableData"
                border
                size="small"
                ref="table"
                @expand-change="handleExpand"
                :expand-row-keys='expendRow'
                :row-key="row=>tableData.indexOf(row)">
            <el-table-column type="expand">
                <template #default="{row}">
                    <el-form label-position="left" class="table-expand">
                        <el-form-item label="店铺名称">
                            <span>{{ row.shopName }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ row.shopAddress }}</span>
                        </el-form-item>
                        <el-form-item label="食品种类">
                            <span>{{ row.categoryName }}</span>
                        </el-form-item>
                        <el-form-item label="种类介绍">
                            <span>{{ row.categoryDescription }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    prop="item_id"
                    label="食品ID">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="食品名称"
                    width="350">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="食品介绍">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template #default="scope">
                    <el-button size="mini" @click="dialogVisible=true;openEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :page-size="20"
                layout="total, prev, pager, next"
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>
        <el-dialog
                title="修改食品信息"
                :visible.sync="dialogVisible"
                width="50%">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="食品名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="食品介绍">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="食品分类">
                    <el-select v-model="form.new_category_id">
                        <el-option
                                v-for="item in categoryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="打包费">
                    <el-input-number v-model="form.specs[0].packing_fee" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input-number v-model="form.specs[0].price" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="食品图片">
                    <el-upload :action="baseURL+ '/v1/addimg/food'" class="avatar-uploader"
                               :on-success="handleSuccess" :show-file-list="false">
                        <img v-if="form.image_path" :src="imgBaseURL + form.image_path"
                             class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogVisible = false;editCancel()">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false;editConfirm()">确 定</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getFoodList,
        getFoodCount,
        getShopInfo,
        getCategoryInfo,
        deleteFood,
        updateFood,
        getFoodCategory
    } from '@/api/index'
    import {baseURL, imgBaseURL} from '@/utils/config'

    export default {
        name: "FoodList",
        components: {},
        data() {
            return {
                total: 0,
                tableData: [],
                selectedRow: {},
                expendRow: [],
                dialogVisible: false,
                form: {
                    name: '',
                    restaurant_id: '',
                    item_id: '',
                    category_id: '',
                    new_category_id: '',
                    description: '',
                    image_path: '',
                    specs: [{specs: '默认', packing_fee: 0, price: 20}]
                },
                rules: {
                    name: [
                        {required: true, message: '请输入食品名称', trigger: 'blur'}
                    ]
                },
                categoryList: [],
                baseURL,
                imgBaseURL
            }
        },
        async mounted() {
            if (this.$route.query.restaurant_id) {
                let res = await getFoodList(20, 0, this.$route.query.restaurant_id);
                this.tableData = res.data;
                this.total = res.data.length;
            } else {
                let response = await getFoodList(20, 0);
                this.tableData = response.data;
                let result = await getFoodCount();
                this.total = result.data.count;
            }
        },
        methods: {
            handleCurrentChange(val) {
                if (this.$route.query.restaurant_id) {

                } else {
                    getFoodList(20, (val - 1) * 20).then(res => {
                        this.tableData = res.data;
                    }).catch(() => {

                    })
                }
            },
            async handleExpand(row, expandedRows) {
                if (expandedRows[0]) {
                    // 打开
                    let response = await getShopInfo(row.restaurant_id);
                    let result = await getCategoryInfo(row.category_id);
                    row.shopName = response.data.name;
                    row.shopAddress = response.data.address;
                    row.categoryName = result.data.name;
                    row.categoryDescription = result.data.description;
                    let index = this.tableData.indexOf(row);
                    this.expendRow.push(index);
                } else {
                    // 关闭
                    let index = this.tableData.indexOf(row);
                    let i = this.expendRow.indexOf(index);
                    this.expendRow.splice(i, 1);
                }
            },
            handleDelete(id) {
                deleteFood(id).then((res) => {
                    if (res.data.status === 1) {
                        this.$message.success(res.data.success);
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(() => {

                })
            },
            async openEdit(row) {
                this.form.name = row.name;
                this.form.restaurant_id = row.restaurant_id;
                this.form.item_id = row.item_id;
                this.form.category_id = row.category_id;
                this.form.description = row.description;
                this.form.image_path = row.image_path;
                this.form.specs[0].packing_fee = row.specfoods[0].packing_fee;
                this.form.specs[0].price = row.specfoods[0].price;
                let response = await getFoodCategory(row.restaurant_id);
                this.categoryList = response.data.category_list;
            },
            handleSuccess(res) {
                if (res.status === 1) {
                    this.form.image_path = res.image_path;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    })
                }
            },
            editCancel() {

            },
            editConfirm() {
                updateFood(this.form).then(response => {
                    if (response.data.status === 1) {
                        this.$message.success(response.data.success);
                    } else {
                        this.$message.error(response.data.message);
                    }
                }).catch(() => {

                })
            }
        }
    }
</script>

<style>
    .food-list{
        overflow-y: auto;
    }

    .food-list .el-table, .food-list .el-pagination {
        width: 95%;
        margin: 25px auto;
    }

    .food-list .table-expand {
        font-size: 0;
    }

    .food-list .table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .food-list .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
<template>
    <div class="shop-list">
        <el-table
                :data="tableData"
                border
                size="small"
                ref="table">
            <el-table-column type="expand">
                <template #default="{row}">
                    <el-form label-position="left" class="table-expand">
                        <el-form-item label="店铺介绍">
                            <span>{{ row.description }}</span>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <span>{{ row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="距离">
                            <span>{{ row.distance }}</span>
                        </el-form-item>
                        <el-form-item label="分类">
                            <span>{{ row.category }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="店铺ID">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="店铺名称"
                    width="350">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="店铺地址">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template #default="scope">
                    <el-button size="mini" @click="dialogVisible=true;openEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="$router.push('/addFood?restaurant_id='+scope.row.id)">添加商品
                    </el-button>
                    <el-button size="mini" @click="$router.push('/foodList?restaurant_id='+scope.row.id)">查看商品
                    </el-button>
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
                title="修改店铺信息"
                :visible.sync="dialogVisible"
                width="50%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="店铺名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model.number="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="店铺介绍">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="店铺分类">
                    <el-cascader
                            v-model="form.category"
                            :options="options"
                            :props="{ expandTrigger: 'hover' }"></el-cascader>
                </el-form-item>
                <el-form-item label="店铺图片">
                    <el-upload :action="baseURL + '/v1/addimg/shop'" class="avatar-uploader"
                               :on-success="handleShopAvatarSuccess" :show-file-list="false">
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
    import {getShopList, getShopCount, getCityLocation, deleteShop, getShopCategory, updateShop} from '@/api/index'
    import {baseURL, imgBaseURL} from '@/utils/config'

    export default {
        name: "ShopList",
        components: {},
        data() {
            return {
                total: 0,
                tableData: [],
                latitude: '0',
                longitude: '0',
                dialogVisible: false,
                form: {
                    id: '',
                    name: '',
                    address: '',
                    phone: '',
                    latitude: '',
                    longitude: '',
                    category: ['异国料理', '日韩料理'],
                    description: '',
                    image_path: ''
                },
                options: [],
                currentPage: 1,
                baseURL,
                imgBaseURL
            }
        },
        async mounted() {
            let response = await getCityLocation();
            this.latitude = response.data.latitude;
            this.longitude = response.data.longitude;
            let result = await getShopList(this.latitude, this.longitude, 20, 0, 5);
            this.tableData = result.data;
            let res = await getShopCount();
            this.total = res.data.count;
            let r = await getShopCategory();
            r.data.forEach(item => {
                if (item.sub_categories.length) {
                    let addnew = {
                        value: item.name,
                        label: item.name,
                        children: []
                    };
                    item.sub_categories.forEach((subitem, index) => {
                        if (index === 0) {
                            return;
                        }
                        addnew.children.push({
                            value: subitem.name,
                            label: subitem.name,
                        });
                    });
                    this.options.push(addnew);
                }
            });
        },
        methods: {
            handleCurrentChange(val) {
                getShopList(this.latitude, this.longitude, 20, (val - 1) * 20, 5).then(response => {
                    this.tableData = response.data;
                });
                this.currentPage = val;
            },
            handleDelete(id) {
                deleteShop(id).then((response) => {
                    if (response.data.status === 1) {

                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.message
                        })
                    }
                }).catch(() => {

                })
            },
            openEdit(row) {
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.address = row.address;
                this.form.phone = row.phone;
                this.form.description = row.description;
                this.form.image_path = row.image_path;
                this.form.category = row.category.split('/');
            },
            editConfirm() {
                if (Array.isArray(this.form.category)) {
                    this.form.category = this.form.category.join('/');
                }
                updateShop(this.form).then(response => {
                    if (response.data.status === 1) {
                        this.$message({
                            type: 'success',
                            message: response.data.success
                        });
                        getShopList(this.latitude, this.longitude, 20, (this.currentPage - 1) * 20).then(response => {
                            this.tableData = response.data;
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.message
                        })
                    }
                }).catch(() => {

                })
            },
            handleShopAvatarSuccess(res) {
                if (res.status === 1) {
                    this.form.image_path = res.image_path;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    })
                }
            }
        }
    }
</script>

<style>
    .shop-list{
        overflow-y: auto;
    }

    .shop-list .el-table, .shop-list .el-pagination {
        width: 95%;
        margin: 25px auto;
    }

    .shop-list .table-expand {
        font-size: 0;
    }

    .shop-list .table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .shop-list .table-expand .el-form-item {
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
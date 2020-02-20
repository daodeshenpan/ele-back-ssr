<template>
    <div class="add-food">
        <p class="form-header">选择食品种类</p>
        <el-form :model="categoryForm" :rules="categoryFormRules" ref="categoryForm" label-width="120px" class="form">
            <el-form-item label="食品种类">
                <el-select v-model="form.category_id" style="width:100%;">
                    <el-option
                            v-for="item in categoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-collapse-transition>
                <div class="add_category" v-show="showAddCategory">
                    <el-form-item label="食品种类" prop="name">
                        <el-input v-model="categoryForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="种类描述" prop="description">
                        <el-input v-model="categoryForm.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onCategorySubmit">提交</el-button>
                    </el-form-item>
                </div>
            </el-collapse-transition>
            <div class="add_category_button" @click="showAddCategory=!showAddCategory">
                <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
                <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
                <span>添加食品种类</span>
            </div>
        </el-form>
        <p class="form-header">添加食品</p>
        <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="form">
            <el-form-item label="食品名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="食品活动">
                <el-input v-model="form.activity"></el-input>
            </el-form-item>
            <el-form-item label="食品描述">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="食品图片">
                <el-upload
                        class="avatar-uploader"
                        :action="baseURL + '/v1/addimg/food'"
                        :show-file-list="false"
                        :on-success="handleSuccess">
                    <img v-if="form.image_path" :src="imgBaseURL + form.image_path" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="食品特色">
                <el-select
                        v-model="form.attributes"
                        multiple
                        placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="包装费">
                <el-input-number v-model="form.specs[0].packing_fee" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
                <el-input-number v-model="form.specs[0].price" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {getFoodCategory, addFoodCategory, addFood} from '@/api/index'
    import {baseURL,imgBaseURL} from '@/utils/config'

    export default {
        name: "AddGoods",
        data() {
            return {
                form: {
                    name: '',
                    activity: '',
                    restaurant_id: '',
                    category_id: '',
                    description: '',
                    image_path: '',
                    specs: [{specs: '默认', packing_fee: 0, price: 20}],
                    attributes: []
                },
                categoryForm: {
                    name: '',
                    description: '',
                    restaurant_id: ''
                },
                categoryFormRules: {
                    name: [
                        {required: true, message: '请输入食品种类', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请选择种类描述', trigger: 'blur'}
                    ],
                },
                rules: {
                    name: [
                        {required: true, message: '请输入食品名称', trigger: 'blur'}
                    ]
                },
                showAddCategory: false,
                categoryList: [],
                options: [{
                    value: '招牌',
                    label: '招牌'
                }, {
                    value: '新品',
                    label: '新品'
                }],
                baseURL,
                imgBaseURL
            }
        },
        async mounted() {
            if (this.$route.query.restaurant_id) {
                // 选择了店铺
                this.form.restaurant_id = this.$route.query.restaurant_id;
                this.categoryForm.restaurant_id = this.$route.query.restaurant_id;
                let response = await getFoodCategory(this.form.restaurant_id);
                this.categoryList = response.data.category_list;
            } else {
                // 没选择店铺
                this.$confirm('添加食品需要先选择店铺，是否现在去选择？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.$router.push('/shopList')
                }).catch(() => {

                });
            }
        },
        methods: {
            onCategorySubmit() {
                if (!this.form.restaurant_id) {
                    this.$confirm('你还没有选择店铺，是否现在去选择？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        this.$router.push('/shopList')
                    }).catch(() => {

                    });
                } else {
                    this.$refs.categoryForm.validate(async valid => {
                        if (valid) {
                            let response = await addFoodCategory(this.categoryForm);
                            if (response.data.status === 1) {
                                this.$message.success(response.data.success);
                                this.categoryForm.name = '';
                                this.categoryForm.description = '';
                                this.showAddCategory = false;
                                let result = await getFoodCategory(this.form.restaurant_id);
                                this.categoryList = result.data.category_list;
                            } else {
                                this.$message.error(response.data.message);
                            }
                        } else {

                        }
                    })

                }
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
            onSubmit() {
                if (!this.form.restaurant_id) {
                    this.$confirm('你还没有选择店铺，是否现在去选择？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        this.$router.push('/shopList')
                    }).catch(() => {

                    });
                } else {
                    this.$refs.form.validate(valid => {
                        if (valid) {
                            addFood(this.form).then((response) => {
                                if (response.data.status === 1) {
                                    this.$message.success(response.data.success);
                                    this.form = {
                                        name: '',
                                        activity: '',
                                        restaurant_id: '',
                                        category_id: '',
                                        description: '',
                                        image_path: '',
                                        specs: [{specs: '默认', packing_fee: 0, price: 20}],
                                        attributes: []
                                    };
                                    this.form.restaurant_id = this.$route.query.restaurant_id;
                                } else {
                                    this.$message.error(response.data.message);
                                }
                            }).catch(() => {

                            })
                        } else {

                        }
                    })

                }
            }
        }
    }
</script>

<style>
    .add-food{
        overflow-y: auto;
    }

    .add-food .el-form {
        width: 70%;
        margin: 25px auto;
    }

    .add-food .form-header {
        text-align: center;
        margin: 10px;
    }

    .add-food .form {
        min-width: 400px;
        padding: 20px 20px 0 0;
        border: 1px solid #eaeefb;
    }

    .add_category {
        border-top: 1px solid #eaeefb;
        padding-top: 20px;
    }

    .add_category_button {
        cursor: pointer;
        text-align: center;
        line-height: 40px;
        transition: all 400ms;
        color: #ccc;
        font-size: 14px;
        border-top: 1px solid #eaeefb;
    }

    .add_category_button:hover {
        color: #20a0ff;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
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
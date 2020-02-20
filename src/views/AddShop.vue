<template>
    <div class="add-shop">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="店铺名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="店铺地址" prop="address">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input v-model.number="form.phone" maxLength="11"></el-input>
            </el-form-item>
            <el-form-item label="店铺简介" prop="description">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="推广信息" prop="promotion_info">
                <el-input v-model="form.promotion_info"></el-input>
            </el-form-item>
            <el-form-item label="店铺分类">
                <el-cascader
                        v-model="form.category"
                        :options="shopCategory"
                        :props="{ expandTrigger: 'hover' }"></el-cascader>
            </el-form-item>
            <el-form-item label="店铺特色">
                <span>品牌保证</span>
                <el-switch v-model="form.is_premium"></el-switch>
                <span>蜂鸟专送</span>
                <el-switch v-model="form.delivery_mode"></el-switch>
                <span>新开店铺</span>
                <el-switch v-model="form.new"></el-switch>
            </el-form-item>
            <el-form-item>
                <span>外卖保</span>
                <el-switch v-model="form.bao"></el-switch>
                <span>准时达</span>
                <el-switch v-model="form.zhun"></el-switch>
                <span>开发票</span>
                <el-switch v-model="form.piao"></el-switch>
            </el-form-item>
            <el-form-item label="配送费">
                <el-input-number v-model="form.float_delivery_fee" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="起送价">
                <el-input-number v-model="form.float_minimum_order_amount" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="营业时间">
                <el-time-select
                        v-model="form.startTime"
                        :picker-options="{start: '05:30',step: '00:15',end: '23:30'}"
                        placeholder="起始时间">
                </el-time-select>
                <el-time-select
                        v-model="form.endTime"
                        :picker-options="{start: '05:30' ,step: '00:15',end: '23:30',minTime: form.startTime}"
                        placeholder="结束时间">
                </el-time-select>
            </el-form-item>
            <el-form-item label="上传店铺头像">
                <el-upload :action="baseURL + '/v1/addimg/shop'" class="avatar-uploader"
                           :on-success="handleShopAvatarSuccess" :show-file-list="false">
                    <img v-if="form.image_path" :src="imgBaseURL + form.image_path" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传营业执照">
                <el-upload :action="baseURL + '/v1/addimg/shop'" class="avatar-uploader"
                           :on-success="handleBusinessAvatarSuccess" :show-file-list="false">
                    <img v-if="form.business_license_image"
                         :src="imgBaseURL + form.business_license_image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传餐饮服务许可证">
                <el-upload :action="baseURL + '/v1/addimg/shop'" class="avatar-uploader"
                           :on-success="handleServiceAvatarSuccess" :show-file-list="false">
                    <img v-if="form.catering_service_license_image"
                         :src="imgBaseURL + form.catering_service_license_image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="优惠活动">
                <el-select v-model="activityValue" @change="selectActivity">
                    <el-option
                            v-for="item in activityOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-table
                    :data="form.activities"
                    style="min-width: 600px;margin-bottom: 20px;">
                <el-table-column
                        prop="icon_name"
                        label="活动标题"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="活动名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="活动详情">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="120">
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="removeActivity(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import MainTitle from '@/components/MainTitle'
    import {addShop} from '@/api/index'
    import {baseURL, imgBaseURL} from '@/utils/config'

    export default {
        name: "AddShop",
        components: {
            MainTitle
        },
        data() {
            return {
                form: {
                    name: '',
                    address: '',
                    phone: '',
                    latitude: '',
                    longitude: '',
                    category: ['异国料理', '日韩料理'],
                    float_delivery_fee: 5,
                    float_minimum_order_amount: 20,
                    description: '',
                    promotion_info: '',
                    is_premium: true,
                    delivery_mode: true,
                    new: true,
                    bao: true,
                    zhun: true,
                    piao: true,
                    startTime: '',
                    endTime: '',
                    image_path: '',
                    business_license_image: '',
                    catering_service_license_image: '',
                    activities: [{
                        icon_name: '减',
                        name: '满减优惠',
                        description: '满30减5，满60减8'
                    }]
                },
                rules: {
                    name: [
                        {required: true, message: '请输入餐馆名称', trigger: 'blur'},
                    ],
                    address: [
                        {required: true, message: '请输入餐馆地址', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入联系电话'},
                        {type: 'number', message: '电话号码必须是数字'}
                    ]
                },
                activityOptions: [{
                    value: '满减优惠',
                    label: '满减优惠'
                }, {
                    value: '优惠大酬宾',
                    label: '优惠大酬宾'
                }, {
                    value: '新用户立减',
                    label: '新用户立减'
                }, {
                    value: '进店领券',
                    label: '进店领券'
                }],
                activityValue: '满减优惠',
                baseURL,
                imgBaseURL
            }
        },
        computed: mapState(['shopCategory']),
        asyncData({store, route}) {
            return store.dispatch('fetchShopCategory');
        },
        methods: {
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        // 验证通过
                        if (Array.isArray(this.form.category)) {
                            this.form.category = this.form.category.join('/');
                        }
                        addShop(this.form).then((response) => {
                            if (response.data.status === 1) {
                                // 添加成功
                                this.$message({
                                    type: 'success',
                                    message: '添加店铺成功'
                                });
                                this.form = {
                                    name: '',
                                    address: '',
                                    phone: '',
                                    latitude: '',
                                    longitude: '',
                                    category: ['异国料理', '日韩料理'],
                                    float_delivery_fee: 5,
                                    float_minimum_order_amount: 20,
                                    description: '',
                                    promotion_info: '',
                                    is_premium: true,
                                    delivery_mode: true,
                                    new: true,
                                    bao: true,
                                    zhun: true,
                                    piao: true,
                                    startTime: '',
                                    endTime: '',
                                    image_path: '',
                                    business_license_image: '',
                                    catering_service_license_image: '',
                                    activities: [{
                                        icon_name: '减',
                                        name: '满减优惠',
                                        description: '满30减5，满60减8'
                                    }]
                                }
                                this.form.latitude = this.latitude;
                                this.form.longitude = this.longitude;
                            } else {
                                // 添加失败
                                this.$message({
                                    type: 'error',
                                    message: response.data.message
                                });
                            }
                        }).catch(() => {
                            // 网络错误
                        })
                    } else {
                        // 验证未通过
                    }
                });
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
            },
            handleBusinessAvatarSuccess(res) {
                if (res.status === 1) {
                    this.form.business_license_image = res.image_path;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    })
                }
            },
            handleServiceAvatarSuccess(res) {
                if (res.status === 1) {
                    this.form.catering_service_license_image = res.image_path;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    })
                }
            },
            selectActivity(val) {
                this.$prompt('请输入活动内容', '添加活动', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    if (value) {
                        // 有输入内容
                        switch (val) {
                            case '满减优惠':
                                this.form.activities.push({
                                    icon_name: '减',
                                    name: '满减优惠',
                                    description: value
                                });
                                break;
                            case '优惠大酬宾':
                                this.form.activities.push({
                                    icon_name: '特',
                                    name: '优惠大酬宾',
                                    description: value
                                });
                                break;
                            case '新用户立减':
                                this.form.activities.push({
                                    icon_name: '新',
                                    name: '新用户立减',
                                    description: value
                                });
                                break;
                            case '进店领券' :
                                this.form.activities.push({
                                    icon_name: '领',
                                    name: '进店领券',
                                    description: value
                                });
                                break;
                        }
                    } else {
                        // 没有输入内容
                        this.$message({
                            type: 'error',
                            message: '请输入活动内容'
                        });
                    }
                }).catch(() => {
                    // 点了取消按钮
                });
            },
            removeActivity(index) {
                this.form.activities.splice(index, 1);
            }
        }
    }
</script>

<style>
    .add-shop {
        overflow-y: auto;
    }

    .add-shop .el-form {
        width: 50%;
        margin: 25px auto;
    }

    .add-shop .el-switch {
        margin: 0 5px;
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
<template>
    <div class="admin-setting">
        <main-title title="管理员信息"/>
        <div class="setting-panel">
            <ul>
                <li>
                    <span>用&emsp;户&emsp;名&emsp;：</span><span>{{adminInfo.user_name}}</span>
                </li>
                <li>
                    <span>注册城市：</span><span>{{adminInfo.city}}</span>
                </li>
                <li>
                    <span>注册时间：</span><span>{{adminInfo.create_time}}</span>
                </li>
                <li>
                    <span>管理权限：</span><span>{{adminInfo.admin}}</span>
                </li>
                <li>
                    <span>管理员ID：</span><span>{{adminInfo.id}}</span>
                </li>
                <li class="clearfix">
                    <span>更换头像：</span>
                    <el-upload
                            class="avatar-uploader"
                            :action="baseURL+'/admin/update/avatar/'+adminInfo.id"
                            :show-file-list="false"
                            :on-success="handleSuccess"
                            :before-upload="beforeUpload">
                        <img :src="imgBaseURL+adminInfo.avatar" class="avatar">
                    </el-upload>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import MainTitle from '@/components/MainTitle'
    import {baseURL, imgBaseURL} from '@/utils/config'
    import {mapState} from 'vuex'

    export default {
        name: "AdminSetting",
        components: {
            MainTitle
        },
        data() {
            return {
                baseURL,
                imgBaseURL
            }
        },
        computed: mapState(['adminInfo']),
        methods: {
            handleSuccess(response) {
                this.adminInfo.avatar = response.image_path;
            },
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 0.5;

                if (!isJPG) {
                    this.$message({
                        type: 'error',
                        message: '上传头像图片只能是JPG或PNG格式!'
                    });
                }
                if (!isLt2M) {
                    this.$message({
                        type: 'error',
                        message: '上传头像图片大小不能超过 500KB!'
                    });
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style>
    .admin-setting{
        overflow-y: auto;
    }

    .setting-panel {
        width: 1000px;
        height: 350px;
        background-color: #f9f9f9;
        margin: 25px auto;
        border-radius: 20px;
    }

    .setting-panel li {
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        padding-left: 50px;
        color: #606266;
    }

    .setting-panel li span:first-child {
        margin-right: 10px;
    }

    .setting-panel li:last-child {
        height: 100px;
        line-height: 100px;
    }

    .setting-panel li:last-child span {
        float: left;
    }

    .avatar-uploader {
        float: left;
    }

    .avatar-uploader .avatar {
        width: 90px;
        height: 90px;
        display: block;
    }
</style>
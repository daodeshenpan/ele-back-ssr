<template>
    <div class="login fill-container clearfix">
        <h1>饿了么后台管理系统</h1>
        <div class="login-panel">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="密码" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {signIn} from '@/api/index'

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted(){
            window.addEventListener('keypress',(e)=>{
                if (e.key === 'Enter') {
                    this.onSubmit();
                }
            })
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            var response = await signIn({user_name: this.form.username, password: this.form.password});
                        } catch (e) {
                            return this.$message({
                                type: 'error',
                                message: '网络错误'
                            })
                        }
                        if (response.data.status === 1) {
                            // 登录成功
                            try {
                                var result = await this.$store.dispatch('fetchAdminInfo');
                            } catch (e) {
                                return this.$message({
                                    type: 'error',
                                    message: '网络错误或mutation错误'
                                })
                            }
                            this.$message({
                                type: 'success',
                                message: response.data.success +'！ 欢迎' + result.user_name
                            });
                            this.$router.push('/');
                        } else {
                            // 登录不成功
                            this.$message({
                                type: 'error',
                                message: response.data.message
                            })
                        }
                    } else {
                        // 表单未能验证通过
                    }
                });
            }
        }
    }
</script>

<style>
    .login{
        overflow-y: auto;
    }

    .login {
        background-color: #545c64;
    }

    .login h1 {
        margin: 300px auto 0;
        color: #ffffff;
        width: 300px;
    }

    .login-panel {
        width: 400px;
        height: 160px;
        background-color: #fff;
        margin: 50px auto;
        padding: 50px;
        border-radius: 20px;
    }

    .login-panel .el-button {
        width: 100%;
    }
</style>
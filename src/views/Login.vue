<template>
    <div class="login grid-bac">
        <div class="item">
            <span>用户名：</span>
            <el-input v-model="userName"></el-input>
        </div>
        <div class="item">
            <span>密码：</span>
            <el-input v-model="password" show-password></el-input>
        </div>
        <div class="item action">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" @click="jumpRegister">注册</el-button>
        </div>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
    } from 'vue-property-decorator';
    import REQUEST_PATH from '@/config/request/path';

    @Component
    export default class Login extends Vue {
        private userName: string = '';
        private password: string = '';

        private async login(): Promise<void>{
            await this.$requestTool.get(REQUEST_PATH.adminLogin, {
                params: {
                    userName: this.userName,
                    password: this.password 
                }
            });
            this.$router.push({
                name: 'goodManageInfo'
            });
        }

        private jumpRegister(): void{
            this.$router.push({
                name: 'register'
            });
        }
    }
</script>
<style lang="scss">
    .login {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // background-color: #131831;

        .item {
            width: 260px;
            margin-top: 20px;

            &.action {
                margin-top: 20px;
                display: flex;
                justify-content: center;
            }
        }
    }
</style>
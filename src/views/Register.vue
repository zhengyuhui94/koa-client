<template>
    <div class="login grid-bac">
        <div class="item">
            <span>用户名：</span>
            <el-input v-model="registerUserName"></el-input>
        </div>
        <div class="item">
            <span>密码：</span>
            <el-input v-model="registerPassword" show-password auto-complete="new-password"></el-input>
        </div>
        <el-button style="margin-top: 20px;" type="primary" @click="login">注册</el-button>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
    } from 'vue-property-decorator';
    import REQUEST_PATH from '@/config/request/path';

    @Component
    export default class Register extends Vue {
        private registerUserName = '';
        private registerPassword = '';

        private async login(): Promise<void>{
            await this.$requestTool.post(REQUEST_PATH.register, {
                userName: this.registerUserName,
                password: this.registerPassword 
            });
            this.$router.push({
                name: 'login'
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
        }
    }
</style>
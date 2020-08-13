<template>
    <div class="head-wrap">
        <div class="title" @click="jump">
            <img src="@/assets/img/logo.png" />
            <span>后台管理</span>
        </div>
        <!-- <div class="tab">
            <a>区域经济</a>
            <a>中国宏观</a>
            <a>产业经济</a>
            <a>金融市场</a>
            <a>企业研究</a> 
            <a>京东大数据</a>
        </div> -->
        <div class="user" @mouseenter="showModule" @mouseleave="hideModule">
            <img v-if="avatar" :src="avatar" />
            <img v-else src="@/assets/img/default-avatar.png" />
            <span>{{adminName}}</span>
            <i class="el-icon-arrow-down"></i>
        </div>
        <div class="module-wrap" v-show="moduleShow" @mouseenter="showModule" @mouseleave="hideModule">
            <span @click="jumpPerson">个人中心</span>
            <span @click="logout">退出登录</span>
        </div>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue
    } from 'vue-property-decorator';

    @Component
    export default class Head extends Vue {
        private moduleShow: boolean = false

        private get adminName(): string {
            return this.$store.state.adminInfo.name
        }

        private get avatar(): string {
            return this.$store.state.adminInfo.avatar
        }

        private showModule(): void {
            this.moduleShow = true
        }

        private hideModule(): void {
            this.moduleShow = false
        }

        private async logout(): Promise<void>{
            await this.$requestTool.post('/admin/logout');
            this.$router.push({
                name: 'login'
            });
        }

        private jump(): void{
            this.$router.push({
                name: 'goodManageInfo'
            });
        }

        private jumpPerson(): void{
            this.$router.push({
                name: 'personCenter'
            });
        }
    }
</script>
<style lang="scss" scoped>
    .head-wrap {
        width: 100%;
        min-width: 1300px;
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 10;
        background: #171f37;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        color: #ffffff;

        .title {
            width: 200px;
            padding-left: 24px;
            font-size: 16px;
            display: flex;
            align-items: center;
            cursor: pointer;

            img {
                width: 40px;
                margin-right: 8px;
                padding: 0 0 2px 0;
            }
        }

        .tab {
            flex: 1;
            display: flex;
            font-size: 16px;
            text-align: center;

            a {
                cursor: pointer;
                padding: 0 18px;
                color: rgba(255, 255, 255, 0.6);

                &.nuxt-link-active {
                    color: #1690f2;
                    position: relative;

                    &::after {
                        content: '';
                        display: inline-block;
                        width: 56px;
                        height: 3px;
                        background: #1690f2;
                        border-radius: 1px;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }

                &:hover {
                    color: #ffffff !important;
                }
            }

            .disabled {
                pointer-events: none;
                color: #67718d;
            }
        }

        .user {
            width: 180px;
            text-align: right;
            font-size: 14px;
            padding-right: 28px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            cursor: pointer;

            img {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                margin-right: 8px;
            }

            i {
                margin-left: 8px;
            }
        }

        .module-wrap {
            position: absolute;
            top: 60px;
            right: 28px;
            font-size: 14px;
            background-color: #333333;
            cursor: pointer;
            display: flex;
            flex-direction: column;

            span,
            a {
                color: #ffffff;
                height: 40px;
                line-height: 40px;
                padding: 0 20px;

                &:hover{
                    background-color: rgba(255, 255, 255, 0.05);
                }
            }
        }
    }
</style>
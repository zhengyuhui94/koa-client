<template>
    <div class="default-wrap">
        <Head></Head>
        <div class="main">
            <left-nav v-if="leftNavShow"></left-nav>
            <div style="min-width:200px;height:100%;" v-if="leftNavShow"></div>
            <div class="child">
                <router-view v-if="childShow"></router-view>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
    } from 'vue-property-decorator';
    import Head from '@/components/com/Head.vue';
    import LeftNav from '@/components/com/LeftNav.vue';
    import REQUEST_PATH from '@/config/request/path';

    @Component({
        components: {
            Head,
            LeftNav
        }
    })
    export default class Home extends Vue {
        private childShow: boolean = false;

        private get leftNavShow(): boolean {
            return this.$route.name !== 'personCenter';
        }

        private async getAdminInfo(): Promise < void > {
            const {
                data
            } = await this.$requestTool.get(REQUEST_PATH.adminGetInfoById);
            this.$store.commit('setAdminInfo', data);
        }

        private async created(): Promise<void> {
            await this.getAdminInfo();
            this.childShow = true;
        }
    }
</script>
<style lang="scss">
    .default-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .main {
            // height: 100%;
            width: 100%;
            flex: 1;
            padding-top: 60px;
            display: flex;

            .child {
                // width: 100%;
                flex: 1;
            }
        }
    }
</style>
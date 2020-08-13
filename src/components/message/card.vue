<template>
    <div class="card">
        <header>
            <img class="avatar" width="40" height="40" :alt="userName" :src="avatar">
            <p class="name">{{userName}}</p>
        </header>
        <footer>
            <input class="search" type="text" placeholder="search user..." @keyup="onKeyup">
        </footer>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
    } from 'vue-property-decorator';

    @Component({
        components: {

        }
    })
    export default class MessageCard extends Vue {
        private get avatar(): string{
            return this.$store.state.adminInfo.avatar;
        }

        private get userName(): string{
            return this.$store.state.adminInfo.name;
        }

        private onKeyup(e: any): void {

        }
    }
</script>
<style scoped lang="scss">
    .card {
        padding: 12px;
        border-bottom: solid 1px #24272C;

        footer {
            margin-top: 10px;
        }

        .avatar,
        .name {
            vertical-align: middle;
        }

        .avatar {
            border-radius: 2px;
        }

        .name {
            display: inline-block;
            margin: 0 0 0 15px;
            font-size: 16px;
        }

        .search {
            padding: 0 10px;
            width: 88%;
            font-size: 12px;
            color: #fff;
            height: 30px;
            line-height: 30px;
            border: solid 1px #3a3a3a;
            border-radius: 4px;
            outline: none;
            background-color: #26292E;
        }
    }
</style>
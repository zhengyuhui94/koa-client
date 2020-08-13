<template>
    <div class="list">
        <ul>
            <li v-for="(item, index) in userList" :class="{ active: item.user_id === currentUserId }" 
            :key="item.id" @click="select(item, index)">
                <img class="avatar" width="30" height="30" :src="item.avatar">
                <p class="name">{{item.name}}</p>
                <span v-if="item.count" class="new-count">{{item.count}}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
    } from 'vue-property-decorator';

    @Component
    export default class MessageList extends Vue {
        @Prop() private userList!: any[];

        private get avatar(): string{
            return this.$store.state.adminInfo.avatar;
        }

        private get currentUserId(): string{
            return this.$store.state.currentUserId;
        }

        private async select(item: any, index: number): Promise<void>{
            if(index === 0 && item.id === -1){
                const {data} = await this.$requestTool.post('/admin/message/getMessageId', {
                    user_id: item.user_id
                });
                this.$store.commit('setMessageId', data.length > 0 ? data[0].id : -1);
            }else{
                this.$store.commit('setMessageId', item.id);
            }
            this.$store.commit('setCurrentUserId', item.user_id);
            this.$store.commit('setUserAvatar', item.avatar);
            this.$emit('getMessageList');
            this.$emit('changeUser');
            this.$emit('createWebsocket');
        }

        private created() {
            const {userId, avatar} = this.$route.query;
            if(userId){
                this.$store.commit('setCurrentUserId', Number(userId));
                this.$store.commit('setUserAvatar', avatar);
            }

        }
    }
</script>

<style scoped lang="scss">
    .list {
        li {
            padding: 12px 15px;
            border-bottom: 1px solid #292C33;
            cursor: pointer;
            position: relative;
            transition: background-color .1s;

            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }

            &.active {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }

        .new-count {
            position: absolute;
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #fa3534;
            color: #ffffff;
            font-size: 10px;
            text-align: center;
            line-height: 14px;
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
            width: 122px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
        }
    }
</style>
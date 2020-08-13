<template>
    <div class="message scrollbar" style="margin-bottom: 102px;overflow: auto;height: 536px;" ref="list" @scroll="onScroll">
        <div class="loading" v-show="loading">正在加载数据...</div>
        <ul v-if="currentUserId !== -1">
            <li v-for="(item, index) in messageList" :key="index">
                <p class="time" v-if="item.create_time && index % 10 === 0">
                    <span>{{ item.create_time | disposeTime }}</span>
                </p>
                <div class="main" :class="{ self: item.from_flag === 'admin' }" style="padding-top: 30px;">
                    <img class="avatar" width="30" height="30" :src="item.from_flag === 'admin' ? avatar : userAvatar" />
                    <div class="text">{{ item.remark }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Watch,
    } from 'vue-property-decorator';
    import dateTool from '@/util/dateTool';

    @Component({
        filters: {
            disposeTime(date: Date){
				return dateTool.formatLineDate(new Date(date), true, true);
			}
        },
        directives: {
            // 发送消息后滚动到底部
            // 'scroll-bottom' () {
            //     this.$nextTick(() => {
            //         this.$el.scrollTop = this.$el.scrollHeight - this.$el.clientHeight;
            //     });
            // }
        }
    })
    export default class MessageMessage extends Vue {
        @Prop() private messageList!: any[];
        @Prop() private sendFlag!: boolean;

        private currentPage: number = 1;
        private loading: boolean = false;

        private get avatar(): string{
            return this.$store.state.adminInfo.avatar;
        }

        private get userAvatar(): string{
            return this.$store.state.userAvatar;
        }

        private get currentUserId(): string{
            return this.$store.state.currentUserId;
        }

        private get adminId(): string{
            return this.$store.state.adminInfo.id;
        }

        @Watch('sendFlag')
        private handle(val: boolean): void{
            // 如果 sendFlag 为 true，即当前处于发送消息中，滚动到最底部
            if(val){
                (this.$refs.list as any).scrollTop = 10000;
            }
        }

        private onScroll(): void {
            if ((this.$refs.list as any).scrollTop === 0 && !this.loading) {
                this.loading = true;
                this.currentPage += 1;
                this.$emit('getMessageList', this.currentPage);
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
            }
        }

        private created() {
            this.$emit('getMessageList');
            setTimeout(() => {
                (this.$refs.list as any).scrollTop = 10000;
            }, 1000);
        }
    }
</script>

<style lang="scss" scoped>
    .message {
        padding: 10px 15px;
        overflow-y: scroll;

        .loading {
            color: #606266;
            font-size: 14px;
            text-align: center;
            height: 40px;
            line-height: 40px;
        }

        li {
            margin-bottom: 15px;
        }

        .time {
            margin: 7px 0;
            text-align: center;

            >span {
                display: inline-block;
                padding: 0 18px;
                font-size: 12px;
                color: #fff;
                border-radius: 2px;
                background-color: #dcdcdc;
            }
        }

        .avatar {
            float: left;
            margin: 0 10px 0 0;
            border-radius: 3px;
        }

        .text {
            display: inline-block;
            position: relative;
            padding: 0 10px;
            max-width: calc(100% - 40px);
            min-height: 30px;
            line-height: 2.5;
            font-size: 12px;
            text-align: left;
            word-break: break-all;
            background-color: #fafafa;
            border-radius: 4px;

            &:before {
                content: " ";
                position: absolute;
                top: 9px;
                right: 100%;
                border: 6px solid transparent;
                border-right-color: #fafafa;
            }
        }

        .self {
            text-align: right;
            display: flex;
            flex-direction: row-reverse;

            .avatar {
                float: right;
                margin: 0 0 0 10px;
            }

            .text {
                background-color: #b2e281;

                &:before {
                    right: inherit;
                    left: 100%;
                    border-right-color: transparent;
                    border-left-color: #b2e281;
                }
            }
        }
    }
</style>
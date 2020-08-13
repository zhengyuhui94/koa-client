<template>
    <div class="message-center">
        <div class="sidebar">
            <card></card>
            <list :userList="userList" @changeUser="changeUser" @getMessageList="getMessageList" @createWebsocket="createWebsocket"></list>
        </div>
        <div class="main" style="padding-top: 1px;position:relative;">
            <div class="message-tip" v-show="count" @click="closeTip">
                <span>新消息{{count}}条</span>
                <i class="el-icon-circle-close"></i>
            </div>
            <message @getMessageList="getMessageList" :messageList="messageList" :sendFlag="sendFlag"></message>
            <message-text @sendMessage="sendMessage"></message-text>
        </div>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
    } from 'vue-property-decorator';
    import card from '@/components/message/card.vue';
    import list from '@/components/message/list.vue';
    import message from '@/components/message/message.vue';
    import MessageText from '@/components/message/text.vue';
    import dateTool from '@/util/dateTool';
    import REQUEST_PATH from '@/config/request/path';

    @Component({
        components: {
            card,
            list,
            message,
            MessageText
        }
    })
    export default class MessageCenter extends Vue {
        private messageList: any[] = [];
        private userList: any[] = [];
        private currentPage: number = 1;
        private sendFlag: boolean = false;
        private count: number = 0;

        private changeUser(): void{
            this.closeTip();
            for(let item of this.userList){
                if(this.$store.state.currentUserId === item.user_id){
                    item.count = 0;
                    break;
                }
            }
            // this.$data.websocket.close();
            // this.$data.websocket = null;
        }

        private closeTip(): void{
            this.count = 0;
        }

        // 添加新消息数量
        private addNewMessageCount(data: any[]): any[]{
            return data.map(item => {
                return Object.assign(item, {
                    count: 0
                });
            });
        }

        private sendMessage(params: any){
            const {remark, create_time} = params;
            this.messageList.push({
                id: -1,
                message_id: this.$store.state.messageId,
                remark,
                from_id: this.$store.state.adminInfo.id,
                to_id: this.$store.state.currentUserId,
                from_flag: 'admin'
            });
            if(this.$data.websocket){
                this.$data.websocket.send(JSON.stringify(params));
            } 
            setTimeout(() => {
                this.sendFlag = true;
                this.$nextTick(() => {
                    this.sendFlag = false;
                });
            }, 500); 
        }

        // 创建 websocket 连接
        private createWebsocket(): void{
            if(!this.$data.websocket){
                let ipAddress: string = process.env.NODE_ENV === 'development' ? 'localhost' : '81.70.15.16';
                this.$data.websocket = new WebSocket(`ws://${ipAddress}:8081/websocket/admin/${this.$store.state.adminInfo.id}`);
                // this.$data.websocket.addEventListener('open', (event: any) => {
                //     this.$data.websocket.send('Hello Server!');
                // });
                this.$data.websocket.addEventListener('message', (event: any) => {
                    const messageInfo = JSON.parse(event.data);
                    if(messageInfo.from_id === this.$store.state.currentUserId){
                        this.messageList.push(messageInfo);
                        this.count += 1;
                    }else{
                        for(let item of this.userList){
                            if(messageInfo.from_id === item.user_id){
                                item.count += 1;
                                break;
                            }
                        }
                    }
                });
                setTimeout(() => {
                    this.sendFlag = true;
                    this.$nextTick(() => {
                        this.sendFlag = false;
                    });
                }, 500); 
            }           
        }

        // 获取用户列表
        private async getUserList(): Promise<void>{
            const {data} = await this.$requestTool.get(REQUEST_PATH.messageUserList);
            this.userList = this.addNewMessageCount(data);
        }

        // 获取消息列表
        private async getMessageList(currentPage: number = 1): Promise<void>{
            if(this.$store.state.messageId === -1){
                this.messageList = [];
            }else{
                let {data} = await this.$requestTool.post(REQUEST_PATH.messageListById, {
                    currentPage,
                    pageSize: 10,
                    message_id: this.$store.state.messageId
                });
                data = data.reverse();
                if(currentPage === 1){
                    this.messageList = data;
                }else{
                    this.messageList.unshift(...data);
                }
            }
        }

        private async created(): Promise<void>{
            await this.getUserList();
            // 如果是从订单列表进来的，直接锁定某个聊天窗口，并创建 websocket 连接
            const {userId, name, avatar} = this.$route.query;
            if(userId){
                this.$store.commit('setCurrentUserId', Number(userId));
                // 如果当前联系的用户，之前未联系过，则添加一个虚拟数据到数组最前面
                if(!this.userList.some(item => item.user_id === Number(userId))){
                    this.userList.unshift({
                        id: -1,
                        admin_id: this.$store.state.adminInfo.id,
                        user_id: Number(userId),
                        name,
                        avatar
                    });
                }
                // 获取当前的 messageId
                const result = this.userList.filter(item => item.user_id === Number(userId));
                this.$store.commit('setMessageId', result[0].id);
                await this.getMessageList();
                this.createWebsocket();
            }else{
                
            }
        }

        private destroyed(){
            if(this.$data.websocket){
                this.$data.websocket.close();
            }
            this.$store.commit('setCurrentUserId', -1);
        }
    }
</script>
<style lang="scss">
    .message-center {
        height: 100%;
        // padding: 20px;
        // width: 800px;
        // height: 600px;
        overflow: hidden;
        // border-radius: 3px;
        display: flex;
        // background-color: #1a1b22;

        .message-tip {
            position: absolute;
            bottom: 122px;
            z-index: 100;
            background: #ffffff;
            color: #b2e281;
            font-size: 14px;
            padding: 0 6px;
            border-radius: 4px;
            cursor: pointer;
            right: 2px;

            span {
                margin-right: 3px;
            }
        }

        .sidebar, .main {
            height: 100%;
        }
        .sidebar {
            float: left;
            width: 200px;
            color: #f4f4f4;
            background-color: #2e3238;
        }
        .main {
            position: relative;
            overflow: hidden;
            background-color: #eee;
        }
        .text {
            position: absolute;
            // width: 100%;
            bottom: 0;
            left: 0;
        }
        .message {
            // height: calc(100% - 160px);
            overflow: hidden;
            width: 100%;
        }
    }
</style>
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        adminInfo: {
            id: -1,
            name: '',
            avatar: '',
            sex: '',
            birthday: '',
            remark: '',
            remark_file: ''
        },
        currentUserId: -1,
        messageId: -1,
        userAvatar: ''
    },
    mutations: {
        setAdminInfo(state, adminInfo: any): void{
            state.adminInfo = adminInfo;
        },
        setCurrentUserId(state, currentUserId: number): void{
            state.currentUserId = currentUserId;
        },
        setMessageId(state, messageId: number): void{
            state.messageId = messageId;
        },
        setUserAvatar(state, userAvatar: string): void{
            state.userAvatar = userAvatar;
        }
    },
    actions: {

    },
});

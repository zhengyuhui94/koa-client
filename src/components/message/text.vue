<template>
    <div class="text">
        <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup" :disabled="currentUserId === -1"></textarea>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
    } from 'vue-property-decorator';
    import dateTool from '@/util/dateTool';

    @Component
    export default class MessageText extends Vue {
        private content: string = '';

        private get currentUserId(): string{
            return this.$store.state.currentUserId;
        }

        private onKeyup(e: any): void {
            if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                this.$emit('sendMessage', {
                    remark: this.content,
                    create_time: dateTool.formatLineDate(new Date(), true, true),
                    to: this.$store.state.currentUserId
                });
                this.content = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .text {
        width: 100%;
        height: 120px;
        border-top: solid 1px #ddd;

        textarea {
            padding: 10px;
            height: 100%;
            width: 100%;
            border: none;
            outline: none;
            font-family: "Micrsofot Yahei";
            resize: none;
        }
    }
</style>
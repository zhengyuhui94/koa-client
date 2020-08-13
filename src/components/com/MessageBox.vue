<template>
    <div class="message-wrap" v-show="visible">
        <div class="message-box" :style="{top: top ? top + '%' : '50%'}">
            <div class="header" v-if="title">
                <span>{{title}}<slot name="title"></slot></span>
                <i class="el-icon-close" @click="close"></i>
            </div>
            <div class="slot-node">
                <slot></slot>
            </div>
            <div class="footer">
                <div class="com-btn action">
                    <span class="cancel" @click="close" v-if="cancel">取消</span>
                    <span class="confirm" v-text="confirmBtnText ? confirmBtnText : '确定'" @click="confirm"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
        Prop
    } from 'vue-property-decorator';

    @Component
    export default class MessageBox extends Vue {
        @Prop(String) private confirmBtnText ? : string;
        @Prop(Boolean) private visible!: boolean;
        @Prop(String) private title ? : string;
        @Prop(String) private top ? : string; // 针对部分带有时间选择的弹窗使用
        @Prop({
            type: Boolean,
            default: true
        }) private cancel ? : boolean;

        private close(): void {
            this.$emit('close');
        }

        private confirm(): void {
            this.$emit('confirm');
        }
    }
</script>
<style lang="scss" scoped>
    .message-wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 20;
        background: rgba(0, 0, 0, 0.5);

        .message-box {
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(19, 24, 49, 1);
            border-radius: 8px;
            min-width: 400px;

            .header {
                height: 50px;
                padding: 0 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #ffffff;
                border-bottom: 1px solid rgba(39, 59, 108, 0.6);

                i {
                    cursor: pointer;
                }
            }

            .slot-node {
                min-height: 100px;
                padding: 12px 20px;
                border-bottom: 1px solid rgba(39, 59, 108, 0.6);
            }

            .action {
                padding: 12px 20px;
                float: right;
            }
        }
    }

    .com-btn {
        span {
            display: inline-block;
            width: 80px;
            height: 36px;
            line-height: 36px;
            border-radius: 4px;
            font-size: 14px;
            text-align: center;
            cursor: pointer;

            &:first-of-type {
                margin-right: 6px;
            }

            &.confirm {
                background: rgba(43, 147, 255, 1);
                color: #ffffff;
            }

            &.cancel {
                background-color: transparent;
                border: 1px solid rgba(43, 147, 255, 1);
                color: rgba(43, 147, 255, 1);
            }
        }
    }
</style>
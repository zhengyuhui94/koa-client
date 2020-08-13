<template>
    <div class="good-manage">
        <div class="search">
            <div class="item">
                <el-button type="primary" round @click="goback">返回</el-button>
                <el-select class="input ml20" v-model="statu" clearable placeholder="好评度" @change="search">
                    <el-option
                    v-for="item in statuOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span class="good-name">{{goodName}}</span>
            </div>
        </div>
        <div v-if="evaluateList.length > 0">
            <div class="evaluate-item" v-for="item in evaluateList" :key="item.id">
                <div class="item-head">
                    <img :src="item.avatar">
                    <span class="item-info">
                        <span class="item-name">{{item.name}}</span>
                        <span class="item-time">{{item.create_time | disposeTime}}</span>
                    </span>
                </div>
                <div class="item-body">
                    <div class="item-remark">{{item.remark}}</div>
                    <div class="item-img-wrap">
                        <img v-for="(imgItem, imgIndex) in item.imgs" :key="imgIndex" :src="imgItem">
                    </div>
                </div>
            </div>
        </div>   
        <div class="empty" v-else>
            暂无数据
        </div>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
    } from 'vue-property-decorator';
    import dateTool from '@/util/dateTool';
    import REQUEST_PATH from '@/config/request/path';

    @Component(
        {
            filters: {
                disposeTime(date: Date){
                    return dateTool.formatDate(new Date(date), true);
                }
            }
        }
    )
    export default class GoodManageEvaluate extends Vue {
        private evaluateList: any[] = [];
        private statuOption: any[] =  [
            {
                value: '',
                label: '全部' 
            },
            {
                value: 3,
                label: '好评'
            }, 
            {
                value: 2,
                label: '一般'
            }, 
            {
                value: 1,
                label: '差评'
            }
        ];
        private statu: string = '';
        private goodName: string = '';

        private async getEvaluateList(): Promise<void>{
            const {data} = await this.$requestTool.get(REQUEST_PATH.evaluateByGoodIdList, {
                params: {
                    good_id: this.$data.goodId,
                    statu: this.statu
                }
            });
            this.evaluateList = data;
        }

        private search(): void{
            this.getEvaluateList();
        }

        private goback(): void{
            this.$router.push({
                name: 'goodManageInfo'
            });
        }

        private created(): void{
            this.goodName = (this.$route.query as any).name;
            this.$data.goodId = Number(this.$route.query.id);
            this.getEvaluateList();
        }
    }
</script>
<style lang="scss">
    .good-manage {
        padding: 20px;
        background-color: #F1F1F1;
        height: 100%;

        .empty {
            border: 1px solid #F1F1F1;
            background-color: #ffffff;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            font-size: 16px;
            color: #606266;
            line-height: 200px;
            text-align: center;
        }

        .search {
            margin-bottom: 10px;

            .good-name {
                font-size: 16px;
                color: #606266;
                margin-left: 20px;
            }

            .input {
                width: 120px;
            }

            .text {
                font-size: 16px;
                color: #606266;
            }

            em {
                padding: 0 6px;
            }
        }

        .ml20 {
            margin-left: 20px;
        }

        .mt20 {
            margin-top: 20px;
        }

        .evaluate-item {
            border: 1px solid #F1F1F1;
            background-color: #ffffff;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            padding: 10px;
            margin-top: 10px;

            .item-head {
                display: flex;
                align-items: center;

                img {
                   margin-right: 20px; 
                   width: 40px;
                   height: 40px;
                   border-radius: 50%;
                   border: 1px solid rgba(200, 199, 204, 0.5);
                   cursor: pointer;
                }

                .item-info {
                    font-size: 14px;
                    color: #606266;
                    display: flex;
                    flex-direction: column;
                }
            }

            .item-body {
                margin-top: 10px;

                .item-remark {
                    font-size: 14px;
                    color: #606266;
                }
                .item-img-wrap {
                    margin-top: 10px;

                    .item-img-wrap {
                        display: flex;
                        flex-wrap: wrap;
                    }

                    img {
                        width: 100px;
                        height: 100px;
                        border: 1px solid rgba(200, 199, 204, 0.5);
                        margin-right: 10px;
                        // justify-content: space-between;
                        // align-items: center;
                    }
                }
            }
        }
    }
</style>
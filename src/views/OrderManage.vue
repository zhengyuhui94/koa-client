<template>
    <div class="good-manage">
        <div class="search">
            <div class="item">
                <el-select class="input" v-model="statu" clearable placeholder="好评度" @change="search">
                    <el-option
                    v-for="item in statuOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div v-if="orderList.length > 0">
            <div class="evaluate-item" v-for="item in orderList" :key="item.id">
                <div class="item-head">
                    <div class="item-head-left">
                        <img :src="item.user_avatar" @click="jumpMessage(item)">
                        <span class="item-info">
                            <span class="item-name">{{item.user_name}}</span>
                            <span class="item-time">{{item.create_time | disposeTime}}</span>
                        </span>
                    </div>
                    <div class="item-head-right">
                        <div class="item-right-info">
                            <div>收货人：{{item.address_name}}</div>
                            <div>手机号：{{item.address_mobile}}</div>
                            <div>收货地址：{{item.address_area}}</div>
                        </div>
                    </div>
                </div>
                <div class="item-body" v-for="(infoItem, infoIndex) in item.list" :key="infoIndex">
                    <div class="item-body-good">
                        <img class="item-good-img" :src="infoItem.good_img">
                        <span class="item-good-info">
                            <span class="item-good-name">{{infoItem.good_name}}</span>
                            <span class="item-good-total">
                                <span class="item-good-price">{{infoItem.good_price}}元</span>
                                <span class="item-good-count">x{{infoItem.good_count}}</span>
                            </span>
                        </span>
                    </div>
                    <div v-if="infoItem.remark" class="item-good-remark">
                        <div class="item-remark">{{infoItem.evaluate_statu === 3 ? '好评' : infoItem.evaluate_statu === 2 ? '一般' : '差评'}}：{{infoItem.remark}}</div>
                        <div class="item-img-wrap">
                            <img v-for="(imgItem, imgIndex) in infoItem.imgs" :key="imgIndex" :src="imgItem">
                        </div>
                    </div>
                </div>
                <div class="item-foot">
                    <div>合计：{{item.total_price}}</div>
                    <div class="item-statu" v-if="item.statu === 0">待付款</div>
                    <div class="item-statu" v-else-if="item.statu === 1">待评价</div>
                    <div class="item-statu" v-else-if="item.statu === 2">已评价</div>
                    <div class="item-statu" v-else>已取消</div>
                </div>
            </div>
        </div>   
        <div class="empty" v-else>
            暂无数据
        </div>
        <el-pagination
            v-show="orderList.length > 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, prev, pager, next, sizes"
            :total="total"
            class="mt20">
        </el-pagination>
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
        private orderList: any[] = [];
        private statuOption: any[] =  [
            {
                value: '',
                label: '全部' 
            },
            {
                value: 0,
                label: '待付款' 
            },
            {
                value: 1,
                label: '待评价'
            }, 
            {
                value: 2,
                label: '已评价'
            }, 
            {
                value: 3,
                label: '已取消'
            }
        ];
        private statu: string = '';
        private currentPage: number = 1;
        private pageSize: number = 10;
        private total: number = 100;

        private resetOrderList(data: any[]){
            let results: any[] = [];
            data.forEach(item => {
                const {id, admin_id, user_name, user_avatar, total_price, statu, user_id,
                create_time, good_id, good_count, good_name, good_img, good_price, evaluate_statu,
                remark, imgs, address, address_mobile, address_area, address_name} = item;
                const goodItem = {
                    good_id,
                    good_count,
                    good_price,
                    good_name,
                    good_img,
                    remark,
                    evaluate_statu,
                    imgs
                };
                if(results.every(result => result.id !== item.id)){
                    results.push({
                        id,
                        admin_id,
                        user_avatar,
                        user_id,
                        user_name,
                        create_time,
                        total_price,
                        statu,
                        address,
                        address_mobile,
                        address_area,
                        address_name,
                        list: [goodItem]
                    });
                }else{
                    for(let result of results){
                        if(result.id === item.id){
                            result.list.push(goodItem);
                            break;
                        }
                    }
                }
            });
            this.orderList = results;
            console.log(results);
        }

        private jumpMessage(item: any): void{
            this.$router.push({
                path: '/home/messageCenter',
                query: {
                    userId: String(item.user_id),
                    name: item.user_name,
                    avatar: item.user_avatar
                }
            });
        }

        private async getEvaluateList(): Promise<void>{
            const {data} = await this.$requestTool.get(REQUEST_PATH.orderList, {
                params: {
                    statu: this.statu,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
            });
            this.resetOrderList(data.data);
            this.total = data.total;
        }

        // currentPage 改变时触发
        private handleCurrentChange(currentPage: number): void{
            this.currentPage = currentPage;
            this.getEvaluateList();
            window.scrollTo(0, 0);
        }

        // pageSize 改变时触发，页码改变时，从第一页重新请求
        private handleSizeChange(pageSize: number): void{
            this.pageSize = pageSize;
            this.search();
            window.scrollTo(0, 0);
        }

        private search(): void{
            this.currentPage = 1;
            this.getEvaluateList();
            window.scrollTo(0, 0);
        }

        private created(): void{
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
            padding: 10px 10px 0 10px;
            margin-top: 10px;

            .item-head {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .item-head-left {
                    display: flex;

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

                .item-head-right {
                    text-align: left;

                    .item-right-info {
                        display: flex;
                        // align-items: center;
                        flex-direction: column;
                        font-size: 14px;
                        color: #606266;
                    }
                }
            }

            .item-body {
                // border-bottom: 1px solid rgba(200, 199, 204, 0.5);

                .item-body-good {
                    display: flex;
                    margin-bottom: 10px;
                    // justify-content: space-between;

                    .item-good-img {
                        margin-right: 20px; 
                        width: 60px;
                        height: 60px;
                        // border: 1px solid rgba(200, 199, 204, 0.5);
                    }

                    .item-good-info {
                        display: flex;
                        // align-items: center;
                        flex-direction: column;
                        width: 400px;

                        .item-good-name {
                            font-size: 16px;
                            margin-right: 20px; 
                        }

                        .item-good-total {
                            font-size: 14px;
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-start;

                            .item-good-price {
                                color: #fa3534;
                            }

                            .item-good-count {
                                color: #C8C7CC;
                            }
                        }
                    }                    
                }

                .item-good-remark {
                    margin-bottom: 10px;

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
                            // border: 1px solid rgba(200, 199, 204, 0.5);
                            margin-right: 10px;
                            // justify-content: space-between;
                            // align-items: center;
                        }
                    }
                }
            }

            .item-foot {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;

                .total-price {
                    font-size: 16px;
                    color: #fa3534;
                }

                .item-statu {
                    font-size: 16px;
                    color: #fa3534;
                }
            }
        }
    }
</style>
<template>
    <div class="table-list">
        <div class="header">            
            <el-checkbox v-if="checkShow" v-model="allChecked" class="check-box" @change="changeChecked"></el-checkbox>
            <span class="cell-item" v-for="(column, columnIndex) in columns" :key="columnIndex" :style="column.style">
                <expand v-if="column.renderHead" :column="column" :columnIndex="columnIndex" :renderFn="column.renderHead"></expand>
                <em v-else>{{column.title}}</em>
            </span>
        </div>
        <div class="list-wrap" v-if="datas.length > 0">
            <div class="item" v-for="(data, rowIndex) in datas" :key="rowIndex" 
            @click="cellHandle(data)" :style="bodyStyle">
                <el-checkbox v-if="checkShow" v-model="data.checked" class="check-box"></el-checkbox>
                <span class="cell-item" v-for="(column, columnIndex) in columns" :key="columnIndex" 
                :style="column.cellStyle">
                    <slot :name="column.slot"></slot>
                    <expand v-if="column.renderBody" :row="data" :column="column"
                    :rowIndex="rowIndex" :columnIndex="columnIndex" :renderFn="column.renderBody"></expand>
                    <em v-else>{{data[column.key]}}</em>
                </span>
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
        Prop,
        Watch
    } from 'vue-property-decorator';
    import {Column} from '@/types/component/table';
    import Expand from '@/util/component/expand';

    @Component({
        components: {
            Expand
        }
    })
    export default class Table extends Vue {
        @Prop() private columns!: Column[];
        @Prop() private datas!: any[];
        @Prop() private checkShow?: boolean;
        @Prop() private bodyStyle?: Object;

        private allChecked: boolean = false;

        // @Watch('allChecked')
        // private allCheckedHandle(val: boolean): void{
        //     this.datas.forEach((item: any) => {
        //         item.checked = val;
        //     });
        // }

        @Watch('datas', {
            deep: true
        })
        private datasHandle(val: any[]): void{
            if(this.checkShow){
                if(val.length === 0){
                    this.allChecked = false;
                }else{
                    this.allChecked = val.every((item: any) => item.checked === true);
                }
            }
        }

        // private get allChecked(): boolean{
        //     if(this.datas.length === 0){
        //         return false;
        //     }
        //     return this.datas.every((item: any) => item.checked = true);
        // }

        private changeChecked(value: boolean): void{
            this.datas.forEach((item: any) => {
                item.checked = value;
            });
        }

        private cellHandle(row: any): void{
            this.$emit('cellHandle', row);
        }
    }
</script>
<style lang="scss" scoped>
    .table-list {
        // border: 1px solid rgba(39,59,108,1);
        color: #ffffff;
        font-size: 14px;
        width: 100%;

        .header, .item {
            padding: 0 17px;
            height: 44px;
            line-height: 44px;
            width: 100%;
            // display: flex;

            .check-box {
                width: 10%;
            }

            .cell-item {
                display: inline-block;
                vertical-align: top;
                padding: 0 3px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
            }
        }

        .header {
            background-color: #273B6C;

            i {
                padding: 0 4px;
                cursor: pointer;
                color: rgba(255,255,255,0.4);

                &.active {
                    color: #ffffff;
                }
            }
        }

        .list-wrap {
            border: 1px solid #273b6c;

            .item {
                color: rgba(255,255,255,0.7);
                border-bottom: 1px solid rgba(39,59,108,1);

                &:last-of-type {
                    border-bottom: none;
                }

                &:hover {
                    background-color: rgba(39,59,108,.2);
                }
            }
        }
        
        .empty {
            border: 1px solid #273b6c;
            height: 80px;
            line-height: 80px;
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
        }
    }
</style>

<template>
    <div class="good-manage">
        <div class="search">
            <div class="item">
                <span class="text">价格范围：</span>
                <el-input class="input" v-model="startPrice"></el-input>
                <em class="text">-</em>
                <el-input class="input" v-model="endPrice"></el-input>
                <el-select class="input ml20" v-model="goodStatu" clearable placeholder="商品状态">
                    <el-option
                    v-for="item in goodStatuOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="input ml20" v-model="category" clearable placeholder="商品类目">
                    <el-option
                    v-for="item in categoryOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="ml20" type="primary" plain @click="search">查询商品</el-button>
            </div>
        </div>
        <div class="action">
            <el-button type="danger" plain @click="delGood">批量删除</el-button>
            <el-button type="success" plain @click="jumpGoodAdd">添加商品</el-button>
            <el-button type="warning" plain @click="exportExcel">导出数据</el-button>
        </div>
        <el-table ref="multipleTable" :data="goodList" :stripe="true" style="width: 100%"
            @selection-change="handleSelectionChange" @sort-change="handleSortChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="创建日期" width="120" sortable="custom" prop="create_time">
                <template slot-scope="scope">{{ scope.row.create_time | disposeTime }}</template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称">
            </el-table-column>
            <el-table-column prop="total" label="数量" width="100">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="100" sortable="custom">
            </el-table-column>
            <el-table-column label="图片" width="120">
                <template slot-scope="scope">
                    <img :src="scope.row.img" style="width:100px;height:100px;">
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="描述">
            </el-table-column>
            <el-table-column
            label="操作"
            width="120">
                <template slot-scope="scope">
                    <span style="color: #409EFF;cursor: pointer;" @click="jumpEvaluate(scope.row)">查看评价</span>
                </template>
            </el-table-column>
            <el-table-column
            label="状态"
            width="100">
                <template slot-scope="scope">
                    <el-button type="primary" v-if="scope.row.statu === 0" @click="changeStatu(scope.row)">在售</el-button>
                    <el-button type="warning" v-else-if="scope.row.statu === 2" @click="changeStatu(scope.row)">禁售</el-button>
                    <el-button type="danger" v-else>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-show="goodList.length > 0"
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
    import download from '@/util/download';
    import REQUEST_PATH from '@/config/request/path';

    @Component({
        filters: {
            disposeTime(date: Date){
                return dateTool.formatLineDate(new Date(date), true);
            }
        }
    })
    export default class GoodManageInfo extends Vue {
        private goodList: any[] = [];
        private multipleSelection: any[] = [];
        private startPrice: number | string = '';
        private endPrice: number | string = '';
        private goodStatu: string = '';
        private goodStatuOption: any[] =  [
            {
                value: 0,
                label: '在售'
            }, 
            {
                value: 2,
                label: '禁售'
            }, 
            {
                value: 1,
                label: '已删除'
            }
        ];
        private category: string = '';
        private categoryOption: any[] =  [];
        private currentPage: number = 1;
        private pageSize: number = 10;
        private total: number = 100;
        private createTimeSort: string = '';
        private priceSort: string = '';

        private jumpGoodAdd(): void{
            this.$router.push({
                name: 'goodManageGoodAdd'
            });
        }

        // 删除商品
        private async delGood(): Promise<void>{
            await this.$requestTool.post(REQUEST_PATH.goodInfoDel, {
                ids: this.multipleSelection.map(item => item.id)
            });
            this.$message.success({
                message: '删除成功'
            });
            this.search();
            this.multipleSelection = [];
        }

        // 导出数据
        private async exportExcel(): Promise<void>{
            let path = 'http://81.70.15.16:8081/goodManage/info/exportExcel';
            if(process.env.NODE_ENV === 'development'){
                path = 'http://localhost:8081/goodManage/info/exportExcel';
            }
            download(path, 'mall');
        }

        // 查看商品评价
        private jumpEvaluate(item: any): void{
            this.$router.push({
                name: 'goodManageEvaluate',
                query: {
                    id: item.id,
                    name: item.name
                }
            });
        }

        // 改变商品在售状态
        private async changeStatu(item: any): Promise<void>{
            item.statu = item.statu === 0 ? 2 : 0;
            const {data} = await this.$requestTool.post(REQUEST_PATH.goodInfoChangeStatu, {
                id: item.id,
                statu: item.statu
            });
            this.$message.success({
                message: '状态更新成功'
            });
        }

        private handleSelectionChange(val: any): void {
            this.multipleSelection = val;
            console.log(val);
        }

        private handleSortChange(row: any): void {
            const {order, prop} = row;
            if(!order){
                this.priceSort = '';
                this.createTimeSort = '';
            }else{
                if(row.prop === 'create_time'){
                    this.priceSort = '';
                    this.createTimeSort = order === 'ascending' ? 'asc' : 'desc';
                }else if(row.prop === 'price'){
                    this.createTimeSort = '';
                    this.priceSort = order === 'ascending' ? 'asc' : 'desc';
                }
            }
            this.search();
        }

        private async getGoodList(): Promise<void>{
            const {data} = await this.$requestTool.post(REQUEST_PATH.goodInfoList, {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                statu: this.goodStatu,
                category_id: this.category,
                min_price: this.startPrice,
                max_price: this.endPrice,
                createTimeSort: this.createTimeSort,
                priceSort: this.priceSort
            });
            this.goodList = data.data;
            this.total = data.total;
        }

        private search(): void{
            this.currentPage = 1;
            this.getGoodList();
        }

        // currentPage 改变时触发
        private handleCurrentChange(currentPage: number): void{
            this.currentPage = currentPage;
            this.getGoodList();
        }

        // pageSize 改变时触发，页码改变时，从第一页重新请求
        private handleSizeChange(pageSize: number): void{
            this.pageSize = pageSize;
            this.search();
        }

        // 获取商品分类信息
        private async getCategoryOption(): Promise<void>{
            const {data} = await this.$requestTool.get(REQUEST_PATH.categoryAllList);
            this.categoryOption = data.map((item: any) => {
                return {
                    value: item.id,
                    label: item.name
                }
            });
        }

        private created(): void{
            this.getCategoryOption();
            this.getGoodList();
        }
    }
</script>
<style lang="scss" scoped>
    .good-manage {
        padding: 20px;
        background-color: #F1F1F1;
        height: 100%;

        .ml20 {
            margin-left: 20px;
        }

        .mt20 {
            margin-top: 20px;
        }

        .action {
            margin-bottom: 20px;
        }

        .search {
            margin-bottom: 20px;

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
    }
</style>
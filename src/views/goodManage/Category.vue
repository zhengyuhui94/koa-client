<template>
    <div class="good-manage">
        <div class="action">
            <el-button type="success" plain @click="showCategoryShow">添加商品类目</el-button>
        </div>
        <el-table ref="multipleTable" :data="categoryList" :border="true" tooltip-effect="dark" style="width: 100%">
            <el-table-column
            label="序号"
            type="index"
            width="100">
            </el-table-column>
            <el-table-column label="分类名" width="240">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button @click="delCategory(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-show="categoryList.length > 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, prev, pager, next, sizes"
            :total="total"
            class="mt20">
        </el-pagination>
        <message-box :visible="categoryShow" title="添加商品类目" @close="hideCategoryShow" @confirm="addCategory">
            <el-input class="input" v-model="categoryName"></el-input>
        </message-box>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
    } from 'vue-property-decorator';
    import REQUEST_PATH from '@/config/request/path';

    @Component
    export default class GoodManageCategory extends Vue {
        private categoryList: any[] = [];
        private categoryShow: boolean = false;
        private categoryName: string = '';
        private currentPage: number = 1;
        private pageSize: number = 10;
        private total: number = 100;

        private async delCategory(row: any): Promise<void> {
            const {data} = await this.$requestTool.post(REQUEST_PATH.categoryDel, {
                id: row.id
            });
            this.$message.success({
                message: '删除成功'
            });
            this.search();
        }

        private hideCategoryShow(): void{
            this.categoryName = '';
            this.categoryShow = false;
        }

        private showCategoryShow(): void{
            this.categoryShow = true;
        }

        // 获取商品分类列表
        private async getCategoryList(): Promise<void>{
            const {data} = await this.$requestTool.get(REQUEST_PATH.categoryList, {
                params: {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
            });
            this.categoryList = data.data;
            this.total = data.total;
        }

        private search(): void{
            this.currentPage = 1;
            this.getCategoryList();
        }

        // currentPage 改变时触发
        private handleCurrentChange(currentPage: number): void{
            this.currentPage = currentPage;
            this.getCategoryList();
        }

        // pageSize 改变时触发，页码改变时，从第一页重新请求
        private handleSizeChange(pageSize: number): void{
            this.pageSize = pageSize;
            this.search();
        }

        // 添加商品
        private async addCategory(): Promise<void>{
            await this.$requestTool.post(REQUEST_PATH.categoryAdd, {
                name: this.categoryName
            });
            this.hideCategoryShow();
            this.$message.success({
                message: '添加成功'
            });
            this.search();
        }

        private created(): void{
            this.getCategoryList();
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
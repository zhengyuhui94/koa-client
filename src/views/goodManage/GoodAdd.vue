<template>
    <div class="good-manage">
        <el-form label-position="right" label-width="80px" :model="form" style="width: 400px;">
            <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品状态">
                <el-radio-group v-model="form.statu">
                    <el-radio label="0">在售</el-radio>
                    <el-radio label="2">禁售</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="商品类目">
                <el-select class="input" v-model="form.category_id">
                    <el-option
                    v-for="item in categoryOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品数量">
                <el-input-number v-model="form.total" :min="1" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input-number v-model="form.price" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="创建日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.create_time" style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-upload ref="upload" :action="uploadPath" :on-change="handleFileChange" :multiple="false" 
                :limit="1" accept="image/*">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addGood">确定</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
    } from 'vue-property-decorator';
    import dateTool from '@/util/dateTool';
    import REQUEST_PATH from '@/config/request/path';
    import UPLOAD_PATH from '@/config/request/uploadPath';

    @Component
    export default class GoodManageGoodAdd extends Vue {
        private uploadPath: string = UPLOAD_PATH;
        private form: any = {
            name: '',
            statu: '',
            total: 1,
            price: 1,
            remark: '',
            img: '',
            category_id: '',
            create_time: ''
        };
        private categoryOption: any[] =  [];

        // 简介文件上传成功之后，保存起来
        private async handleFileChange(file: any, fileList: any): Promise < void > {
            if (fileList[0].response) {
                this.form.img = fileList[0].response.data;
                (this.$refs.upload as any).clearFiles();
                this.$message.success({
                    message: '文件上传成功'
                });
            }
        }

        // 添加商品
        private async addGood(): Promise<void>{
            const {name, statu, remark, category_id, img, price, total, create_time} = this.form;
            if(!name){
                this.$message.error('请填写商品名称');
            }else if(!statu && statu !== 0){
                this.$message.error('请选择商品状态');
            }else if(!category_id){
                this.$message.error('请选择商品品类');
            }else if(!create_time){
                this.$message.error('请选择商品创建日期');
            }else if(!remark){
                this.$message.error('请填写商品描述');
            }else if(!img){
                this.$message.error('请上传商品图片');
            }else{
                await this.$requestTool.post(REQUEST_PATH.goodInfoAdd, {
                    name,
                    statu,
                    remark,
                    category_id,
                    img,
                    price,
                    total,
                    create_time: dateTool.formatLineDate(create_time, true)
                });
                this.$message.success({
                    message: '添加成功'
                });
                this.goback();
            }
        }

        private goback(): void {
            this.$router.push({
                name: 'goodManageInfo'
            });
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
    }
</style>
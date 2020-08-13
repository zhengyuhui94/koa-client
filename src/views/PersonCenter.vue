<template>
    <div class="person-center grid-bac">
        <div class="left">
            <div class="user">
                <img v-if="avatar" :src="avatar" />
                <img v-else src="../assets/img/default-avatar.png" />
                <span @click="showUploadAvatar">修改头像</span>
            </div>
            <el-form label-position="right" label-width="80px" :model="form" style="width: 400px;">
                <el-form-item label="姓名">
                    <el-input :disabled="true" v-model="adminName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
                <el-form-item label="上传文件">
                    <el-upload :action="uploadPath" :on-change="handleFileChange"
                    :multiple="false" :limit="1" accept=".pdf">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="uploadAdminInfo">确定</el-button>
                    <el-button @click="goback">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="right">
            <div class="iframe">
                <iframe :src="remarkFile" scrolling="yes" width="100%" height="100%" frameborder="0"></iframe>
            </div>
        </div>
        <message-box :visible="uploadAvatarShow" title="上传头像" @close="hideUploadAvatar" @confirm="uploadAvatar">
            <div class="upload-avatar-box">
                <el-upload ref="upload" :action="uploadPath" list-type="picture-card" :on-change="handleChange"
                    :auto-upload="false" :multiple="false" :limit="1" accept="image/*">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </message-box>
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
    export default class PersonCenter extends Vue {
        private uploadPath: string = UPLOAD_PATH;
        private form: any = {
            sex: '',
            birthday: '',
            remark: '',
            remark_file: ''
        };
        private dialogImageUrl: string = '';
        private dialogVisible: boolean = false;
        private disabled: boolean = false;
        private uploadAvatarShow: boolean = false;

        private get adminName(): string {
            return this.$store.state.adminInfo.name;
        }

        private get avatar(): string {
            return this.$store.state.adminInfo.avatar;
        }

        private get remarkFile(): string {
            return this.$store.state.adminInfo.remark_file;
        }

        private showUploadAvatar(): void {
            this.uploadAvatarShow = true;
        }

        private hideUploadAvatar(): void {
            this.uploadAvatarShow = false;
        }

        // 保存头像到文件系统服务器
        private uploadAvatar(): void {
            (this.$refs.upload as any).submit();
        }

        // 头像上传成功之后，保存起来
        private async handleChange(file: any, fileList: any): Promise < void > {
            if (fileList[0].response) {
                this.$store.state.adminInfo.avatar = fileList[0].response.data;
                // 更新管理员头像
                await this.$requestTool.post(REQUEST_PATH.updateAvatar, {
                    avatar: fileList[0].response.data
                });
                (this.$refs.upload as any).clearFiles();
                this.hideUploadAvatar();
                this.$message.success({
                    message: '头像更新成功'
                });
            }
        }

        // 简介文件上传成功之后，保存起来
        private async handleFileChange(file: any, fileList: any): Promise < void > {
            if (fileList[0].response) {
                this.$store.state.adminInfo.remark_file = fileList[0].response.data;
                this.form.remark_file = fileList[0].response.data;
                (this.$refs.upload as any).clearFiles();
                this.$message.success({
                    message: '文件上传成功'
                });
            }
        }

        // 上传管理员信息
        private async uploadAdminInfo(): Promise < void > {
            const {
                sex,
                remark,
                birthday,
                remark_file
            } = this.form;
            if (!sex) {
                this.$message.error('请选择性别');
            } else if (!birthday) {
                this.$message.error('请选择生日');
            } else if(!remark_file){
                this.$message.error('请上传文件');
            }
            await this.$requestTool.post(REQUEST_PATH.updateInfo, {
                sex,
                remark,
                remark_file,
                birthday: birthday ? dateTool.formatLineDate(birthday, true) : ''
            });
            this.$message.success({
                message: '保存成功'
            });
        }

        private goback(): void {
            this.$router.push({
                name: 'goodManageInfo'
            });
        }

        private created(): void {
            const {
                sex,
                birthday,
                remark,
                remark_file
            } = this.$store.state.adminInfo;
            this.form = {
                sex,
                birthday: new Date(birthday),
                remark,
                remark_file
            };
        }
    }
</script>
<style lang="scss">
    .person-center {
        height: 100%;
        // width: 100%;
        padding: 20px;
        display: flex;
        justify-content: center;
        // flex-direction: column;
        align-items: center;
        // padding-top: 80px;
        background-color: #1a1b22;

        .left {
            width: 400px;

            .user {
                width: 100%;
                margin-bottom: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 60px;
                    height: 60px;
                    // height: 34px;
                    border-radius: 50%;
                    margin-bottom: 8px;
                }

                span {
                    font-size: 14px;
                    color: #409EFF;
                    cursor: pointer;
                }
            }

            .upload-avatar-box {
                height: 200px;
                padding: 20px;
                // width: 600px;
            }
        }

        .right {
            flex: 1;
            height: 100%;
            padding: 0 20px;

            .iframe {
                height: 100%;
            }
        }
    }
</style>
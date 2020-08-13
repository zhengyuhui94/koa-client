<template>
    <div class="left-nav scrollbar">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            @select="selectItem" background-color="transparent" active-text-color="#ffd04b" text-color="#fff"
            :default-openeds="defaultOpeneds">
            <div v-for="(item, index) in defalutData" :key="index">
                <!-- 无子菜单 -->
                <el-menu-item v-if="!item.items" :index="item.key" class="submenu no-children">
                    <template slot="title">
                        <!-- <img :src="item.imgPath"> -->
                        <i class="iconfont el-icon-s-order"></i>
                        <!-- <svg-icon :icon-class="item.iconClass"></svg-icon> -->
                        <span class="title" slot="title">{{item.title}}</span>
                    </template>
                </el-menu-item>
                <!-- 有子菜单 -->
                <el-submenu v-else :index="item.key" class="submenu">
                    <template slot="title">
                        <!-- <img :src="item.imgPath"> -->
                        <i class="iconfont el-icon-s-order"></i>
                        <!-- <svg-icon :icon-class="item.iconClass"></svg-icon> -->
                        <span class="title" slot="title">{{item.title}}</span>
                    </template>
                    <el-menu-item-group>
                        <template v-for="(el, elIndex) in item.items">
                            <el-menu-item v-if="!el.subItems" :index="el.key" :key="elIndex">{{el.text}}</el-menu-item>
                            <el-submenu v-else :key="elIndex" :index="el.key" class="item-submenu">
                                <template slot="title">{{el.text}}</template>
                                <el-menu-item v-for="(subItem, subIndex) in el.subItems" :key="subIndex" :index="subItem.key">{{subItem.text}}</el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
            </div>
        </el-menu>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Watch
    } from 'vue-property-decorator';
    import {data, nameMap} from '@/config/leftNav';

    @Component
    export default class LeftNav extends Vue {
        private defalutData: any[] = data;
        private nameMap: any = nameMap;

        private defaultOpeneds: string[] = [];
        private defaultActive: string = '';

        // 通过监听路由变化去修改组件依赖数据
        @Watch('$route')
        private changeHandle(): void{
            // this.setData();
            this.selDefaultItem();
        }

        // 打开菜单
        private handleOpen(key: string, keyPath: string[]): void {
            // console.log(key, keyPath);
        }

        // 关闭菜单
        private handleClose(key: string, keyPath: string[]): void {
            // console.log(key, keyPath);
        }

        // 默认选中某一项
        private selDefaultItem(): void{
            for(let key in this.nameMap){
                if(this.nameMap[key] === this.$route.name || this.nameMap[key] === this.$route.matched[0].name){
                    this.defaultActive = key;
                    break;
                }
            }
        }

        // 点击某个选项
        private selectItem(index: string, indexPath: string) {
            const routeName: string = this.nameMap[index];
            if(routeName){
                this.$router.replace({
                    name: routeName
                });
            }
        }

        // 设置依赖 data 数据
        // private setData(): void{
        //     const fileName: string = this.$route.matched[0].name!.split('-')[0];
        //     try{
        //         const {data, nameMap} = require(`../../config/component/leftNav/${fileName}.ts`);
        //         this.defalutData = data;
        //         this.nameMap = nameMap;
        //     }catch{
        //         console.log(this.$route.matched[0].name);
        //     } 
        // }

        private created(): void {
            // this.setData();
            this.selDefaultItem();
        }
    }

</script>
<style lang="scss" scoped>
    .left-nav {
        height: 100%;
        width: 200px;
        background: #131831;
        position: fixed;
        overflow-y: auto;

        svg {
            color: #909399;
            vertical-align: sub;
        }

        .no-children {
            .title {
                color: #909399;
            }

            &:hover {
                background-color: rgba(255, 255, 255, 0.05)!important;
                

                i, svg, .title {
                    color: #ffffff!important;
                }
            }
        }

        .submenu {
            background: #131831;
            
            i, svg {
                margin-right: 8px;
            }

            .title {
                color: #909399;
                font-size: 14px;
            }
        }
    }
</style>

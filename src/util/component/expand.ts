// 类似插槽的函数式扩展组件
import {
    Vue
} from 'vue-property-decorator';
import {Params} from '@/types/component/table';

const Expand = Vue.extend({
    data(){
        return {
            msg: 'expand'
        }
    },
    props: {
        column: Object,
        columnIndex: Number,
        renderFn: Function,
        // 可传可不传
        row: {
            type: Object,
            default: null
        },
        rowIndex: {
            type: Number,
            default: -1
        }
    },
    // render 渲染函数会将从父组件传进来的 this 对象进行浅拷贝，
    // 如果想依赖父组件的数据进行动态变化的话，需要将依赖数据类型定义为引用类型
    render(createElement: Function): any{
        const params: Params = {
            row: this.row,
            column: this.column,
            rowIndex: this.rowIndex,
            columnIndex: this.columnIndex,
        };
        return this.renderFn(createElement, params);
    }
});

export default Expand;

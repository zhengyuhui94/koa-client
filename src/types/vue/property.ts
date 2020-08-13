import {AxiosRequestConfig, AxiosPromise} from 'axios';

// 定义 $requestToolType 请求方法类的接口
interface $requestToolType {
    get(url: string, config?: AxiosRequestConfig): AxiosPromise;
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    cancelRequests(): void;
}

// 图表数据接口
interface ChartDatascache {
    // 属性名是图表 id
    [propName: string]: any;
}

// Vue 原型上添加的方法/属性，对其添加声明，让编辑器识别
declare module 'vue/types/vue' {
    interface Vue {
        $requestTool: $requestToolType;
        NODE_ENV: string;
        $chartDatasCache: ChartDatascache;
    }
}


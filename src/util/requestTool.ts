import Vue from 'vue';
import ElementUI from 'element-ui';
import router from '@/router';
import axios, {AxiosPromise, AxiosRequestConfig, AxiosInstance} from 'axios';
Vue.use(ElementUI);

// 创建一个新的 axios 实例
const axiosInstance: AxiosInstance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? '' : `http://81.70.15.16/:8081`,
    // 设置请求超时的最大时长
    timeout: 180000,
    // 允许服务器在跨域情况下，获取客户端的 cookie 信息【跨域即不同源，正常情况服务器默认只能获取同源的 cookie】
    withCredentials: true
});

// 请求类
class RequestTool {
    // RequestTool 中间件的安装调用方法
    public install(): void{
        Vue.prototype.$requestTool = {
            get: this.get,
            post: this.post
        };
    }

    // get 请求，config 跟 axios 参数配置一致
    private get(url: string, config?: AxiosRequestConfig): AxiosPromise{
        return new Promise((resolve, reject) => {
            axiosInstance.get(url, config).then((res) => {
                const data = res.data;
                if(data.code === 0){
                    resolve(data);
                }else if(data.code === 403){
                    router.push('/login');
                }else{
                    const msg = data.retMessage ? data.retMessage : data.msg;
                    Vue.prototype.$message.error(msg);
                    reject();
                }
            }).catch((e) => { // 500 默认走 catch
                reject(e);
            });
        });
    }

    // post 请求，requestData、config 跟 axios 参数配置一致
    private post(url: string, requestData?: any, config?: AxiosRequestConfig): AxiosPromise{
        return new Promise((resolve, reject) => {
            axiosInstance.post(url, requestData, config).then((res) => {
                const data = res.data;
                if(data.code === 0){
                    resolve(data);
                }else if(data.code === 403){
                    router.push('/login');
                }else{
                    const msg = data.retMessage ? data.retMessage : data.msg;
                    Vue.prototype.$message.error(msg);
                    reject();
                }
            }).catch((e) => { // 500 默认走 catch
                reject(e);
            });
        });
    }
}

const requestTool = new RequestTool();

export default requestTool;


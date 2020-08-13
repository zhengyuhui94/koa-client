import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import EventBus from 'vue-bus-ts';
import VueJsonp from 'vue-jsonp';
import requestTool from '@/util/requestTool';
import '@/types/vue/property';
import MessageBox from './components/com/MessageBox.vue';

Vue.config.productionTip = false;
// 在 VueConfiguration 中设置一个 chartIds 字段，用于保存图表数据
Vue.prototype.$chartDatasCache = {
    board: {}, // 宏观图谱图表缓存，BoardChartShow 组件缓存
    chart: {} // 主页和区域经济图表缓存，ChartShow 组件缓存
};

// 注册全局组件
Vue.component('message-box', MessageBox);

Vue.use(EventBus);
Vue.use(ElementUI);
Vue.use(requestTool);
Vue.use(VueJsonp);

const bus = new EventBus.Bus();
new Vue({
    bus,
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

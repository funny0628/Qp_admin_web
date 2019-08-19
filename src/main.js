import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'nprogress/nprogress.css'// Progress 进度条样式
import {install} from './plugin/install'
import config from './script/config/config';
import models from './script/config/models';
import './assets/styles/common.css';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(install, {
  config: config,
  models: models,
  checkPermission(name) {
  },
  headerVue: r => require.ensure([], () => r(require('./components/HeaderMenu.vue')), 'headerVue')
});

new Vue({
  router,
}).$mount('#app');

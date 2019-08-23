import Vue from 'vue'
import App from './App'
import {install} from './plugin/install'
import config from './script/config/config';
import models from './script/config/models';
import './assets/styles/common.css';

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.use(iView);

Vue.config.productionTip = false;
Vue.use(install, {
  config: config,
  models: models,
  checkPermission(name) {
  },
  headerVue: r => require.ensure([], () => r(require('./components/HeaderMenu.vue')), 'headerVue'),
  startApp: App
});


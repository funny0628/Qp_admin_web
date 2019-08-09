import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'nprogress/nprogress.css'// Progress 进度条样式
import {install} from './plugin/install'
import config from './script/config/config';
import models from './script/config/models';
import './style/common.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(install, {
  config: config,
  models: models,
  checkPermission(name) {
  }
});

new Vue({
  router,
}).$mount('#app');

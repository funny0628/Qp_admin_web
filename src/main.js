import Vue from 'vue'
import App from './App'

// import axios from 'axios'
// import HallFunConfig from './assets/js/HallFunConfig.js'

import {
  install
} from './plugin/install'
import config from './script/config/config';
import models from './script/config/models';
import './assets/styles/common.css';
import echarts from 'echarts'
import VueQuillEditor from 'vue-quill-editor'
import axios from 'axios'
import HallFunConfig from './assets/js/HallFunConfig.js'
// Import upload
import uploadFile from './assets/js/uploadFile'
// 把封装好的文件下载挂载到vue上
Vue.use(uploadFile)
import OperationMan from './assets/js/OperationMan.js'
import allAgency from './assets/js/allAgency.js'
import DataAnalysis from './assets/js/DataAnalysis.js'
// import http from './assets/js/http';
axios.HallFunConfig = HallFunConfig;
axios.OperationMan = OperationMan;
//全民代理配置
axios.allAgency = allAgency;
//数据分析
axios.DataAnalysis = DataAnalysis;
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueCookie from 'vue-cookie';
// Tell Vue to use the plugin
Vue.use(VueCookie);

Vue.use(VueQuillEditor, /* { default global options } */ )
// Vue.use(http);

// axios.HallFunConfig = HallFunConfig;
// Vue.prototype.$http = axios;

Vue.config.productionTip = false;
Vue.filter('dateFormat', (originVal) => {
  const dt = new Date(originVal * 1000);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1).toString().padStart(2, '0');
  const d = dt
    .getDate()
    .toString()
    .padStart(2, '0');

  const hh = dt
    .getHours()
    .toString()
    .padStart(2, '0');
  const mm = dt
    .getMinutes()
    .toString()
    .padStart(2, '0');
  const ss = dt
    .getSeconds()
    .toString()
    .padStart(2, '0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});
Vue.directive('has', {
  inserted: function (el, binding) {
    if (!permissionJudge(binding.value)) {
      el.parentNode.removeChild(el);
    }
    function get_permission_names(rightArr) {
      let arr = [];
      const fn = function (list) {
        if (list.length === 0) {
          return undefined
        }
        list.forEach(item => {
          if (!item.children) {
            arr.push(item.name)
          } else {
            arr.push(item.name)
            fn(item.children)
          }
        })
      }
      fn(rightArr)
      console.log(arr)
      return arr;
    }
    function permissionJudge(value) {
      let userInfo = JSON.parse(localStorage.getItem('user_info'));
      let permission_names = get_permission_names(userInfo);
      for (let i = 0; i < permission_names.length; i++) {
        if (permission_names[i] === value) {
          return true
        }
      }
      return false
    }
  }
});
Vue.use(install, {
  config: config,
  models: models,
  checkPermission(name) {

  },
  headerVue: r => require.ensure([], () => r(require('./components/HeaderMenu.vue')), 'headerVue'),
  loginVue: r => require.ensure([], () => r(require('./pages/login/Login.vue')), 'loginVue'),
  startApp: App
});

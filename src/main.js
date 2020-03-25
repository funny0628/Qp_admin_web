import Vue from 'vue'
import App from './App'
import {install} from './plugin/install'
import config from './script/config/config';
import models from './script/config/models';
import './assets/styles/common.css';
import echarts from 'echarts'
import VueQuillEditor from 'vue-quill-editor'
import http from './assets/js/http';
Vue.prototype.$echarts = echarts;

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(http);


Vue.config.productionTip = false;
Vue.filter('dateFormat', (originVal) => {
  const dt = new Date(originVal);
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

Vue.use(install, {
  config: config,
  models: models,
  checkPermission(name) {
  },
  headerVue: r => require.ensure([], () => r(require('./components/HeaderMenu.vue')), 'headerVue'),
  startApp: App
});


import Vue from 'vue'
import App from './App'
import {install} from './plugin/install'
import config from './script/config/config';
import models from './script/config/models';
import './assets/styles/common.css';

import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)


Vue.config.productionTip = false;

Vue.use(install, {
  config: config,
  models: models,
  checkPermission(name) {
  },
  headerVue: r => require.ensure([], () => r(require('./components/HeaderMenu.vue')), 'headerVue'),
  startApp: App
});


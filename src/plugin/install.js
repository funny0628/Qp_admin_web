import Vue from 'vue'
import Vuex from 'vuex';
import Router from 'vue-router'
import ElementUI from 'element-ui'
import {
  Message
} from 'element-ui';
import NProgress from 'nprogress' // Progress 进度条
import promise from 'es6-promise' // ie 兼容
import 'nprogress/nprogress.css' // Progress 进度条样式
import './styles/common.css';
import root from './script/common/Root';
import './styles/iconfont/iconfont.css';
import './styles/element/index.css';
import BaseStore from './script/store/index';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import VueI18n from 'vue-i18n';
import en from './script/language/en';
import zhcn from './script/language/zh-cn';
import locale from 'element-ui/lib/locale'
import getCookie from '../assets/js/util.js'

/** 管理后台组件安装 **/
/**
 * @param vueElement
 * @param config 全局设置内容
 * @param models 管理后台界面
 * @param checkPermission   校验权限方法
 * @param headerVue 头部组件菜单显示
 * @param loopArray 首页轮询方法
 * @param loginVue
 * @param store
 * @param startApp
 * @param el
 * @param checkLogin
 * @param language  语言包 zh-cn 简体中文  en 英语
 * @param extraInstall  构建额外引入包
 */
export function install(vueElement, {
  config,
  models,
  checkPermission,
  headerVue = null,
  loopArray = [],
  loginVue,
  store = {},
  startApp = null,
  el = '#app',
  checkLogin,
  language = {},
  extraInstall = {}
}) {
  if (typeof models === undefined) throw "can not find models";
  if (typeof checkPermission === undefined || typeof checkPermission !== "function") {
    console.warn("no find check permission");
  }
  store = store || {};

  root.models = models;
  root.checkPermission = checkPermission;
  root.headerVue = headerVue;
  root.loopArray = loopArray;
  root.loginVue = loginVue;
  root.startApp = startApp;
  root.checkLogin = checkLogin;

  root.store = {
    state: {
      ...(BaseStore.state || {}),
      ...(store.state || {})
    },
    mutations: {
      ...(BaseStore.mutations || {}),
      ...(store.mutations || {})
    },
    actions: {
      ...(BaseStore.actions || {}),
      ...(store.actions || {})
    },
    getters: {
      ...(BaseStore.getters || {}),
      ...(store.getters || {})
    }
  };
  root.el = el;

  let _vue = vueElement;
  vueElement.mixin({
    beforeCreate() {
      this.$pageInfo._app = this;
    },
    created() {},
    deactivated() {},
    destroyed() {}
  });

  Object.defineProperty(vueElement.prototype, '$pageInfo', {
    value: {
      get app() {
        return this._app || null;
      },
      get models() {
        return root.models;
      },
      get pageList() {
        return root.pageList;
      },
      get pageMap() {
        return root.pageMap;
      },
      get config() {
        return config;
      },
      // get loginVue() {
      //     return loginVue;
      // }
    }
  });

  /** 合并语言包 TODO 后期采用 Object.assign 方式处理 **/
  let pluginLanguage = {
    'zh-cn': {
      ...zhLocale,
      ...zhcn
    },
    'en': {
      ...enLocale,
      ...en
    }
  };
  let elementLanguage = {
    'en': enLocale,
    'zh-cn': zhLocale
  };
  let languagePackage = {};
  let languageType = config.LANGUAGE || 'zh-cn';
  for (let lkey in language) {
    let lan = language[lkey];
    if ('_admin_plugin' in lan) {
      throw `${lkey} language package key use _admin_plugin`;
    }

    languagePackage[lkey] = lkey in pluginLanguage ? {
      ...pluginLanguage[lkey],
      ...lan
    } : lan;
  }

  //国际化
  Vue.use(VueI18n);

  Vue.use(Router);
  Vue.use(ElementUI);
  Vue.use(Vuex);

  /*
  Vue.config.lang = config.LANGUAGE || 'zh-cn';   // element ui 国际化处理
  Vue.locale('zh-cn', zhLocale);
  Vue.locale('en', enLocale);
   */

  /** 多语言包处理 **/
  const i18n = new VueI18n({
    locale: languageType,
    messages: languagePackage
  });
  window.i18n = i18n;
  locale.use(elementLanguage[languageType]);

  promise.polyfill();

  /** 创建界面 **/
  let rootStore = new Vuex.Store(root.store);
  const routes = [{
      path: '/',
      redirect: config.baseRedirect || '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: r => require.ensure([], () => r(require('./pages/home/Home.vue')), 'home')
    },
    {
      path: '/login',
      name: 'login',
      component: loginVue
    },
  ];
  const router = new Router({
    // mode: 'history',
    // strict: process.env.NODE_ENV !== 'production',
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         if (from.meta.keepAlive) {
    //             from.meta.savedPosition = document.body.scrollTop;
    //         }
    //         return {x: 0, y: to.meta.savedPosition || 0}
    //     }
    // },
    routes: routes
  });

  /** 全局路由守卫 **/
  router.beforeEach((to, from, next) => {
    // NProgress.start();
    if (to.fullPath !== '/login') {
      const cookie = getCookie('user')
      if (!cookie) {
        Message({
          type: "warning",
          message: "请先登录!"
        })
        next('login')
      } else {
        next()
      }
    } else {
      next()
    }
  });
  /** 全局路由守卫 **/
  // router.beforeEach((to, from, next) => {
  //   // NProgress.start();

  //   if (to.fullPath !== '/login' && typeof root.checkLogin === 'function' && !root.checkLogin()) {
  //     next('/login');
  //     return;
  //   }

  //   next();
  // });

  //   router.afterEach(() => {
  //     NProgress.done(); // 结束Progress
  //   });
  router.afterEach((to,from)=>{
    if(from.path != '/login' && from.path != '/' && to.path == '/login'){
        window.location.reload();
    }
})

  new Vue({
    el: el || "#app",
    components: {
      startApp
    },
    router,
    store: rootStore,
    i18n,
    ...extraInstall,
    template: '<start-app/>'
  });
}

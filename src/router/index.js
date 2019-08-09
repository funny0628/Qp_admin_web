import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const routes = [
  {
    path: '/',
    component: App,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: r => require.ensure([], () => r(require('../plugin/pages/home/Home.vue')), 'home'),
      },
      {
        path: '/login',
        name: 'login',
        component: r => require.ensure([], () => r(require('../pages/login/Login.vue')), 'login')
      }
    ]
  }
];

const router = new Router({
  mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  },
  routes: routes
});

Vue.use(Router);

/** 全局路由守卫 **/
router.beforeEach((to, from, next) => {
  NProgress.start();

  let checkLogin = () => {
    return true;
  };

  if (to.fullPath !== '/login' && !checkLogin()) {
    next('/login');
    return;
  }

  next();
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

export default router;

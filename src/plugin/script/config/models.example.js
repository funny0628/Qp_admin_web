/** 包含模块 **/
const models = {
  index: {
    name: 'index',
    vue: r => require.ensure([], () => r(require('../../pages/index')), 'index'),
    text: '首页',
    children: []
  },
  user: {
    name: 'user',
    vue: null,
    text: '用户模块',
    children: [
      {
        name: 'userIndex',
        text: '用户查询',
        vue: r => require.ensure([], () => r(require('../../pages/user')), 'user'),
        children: [
          {
            name: 'userDetails',
            text: '用户详情',
            vue: r => require.ensure([], () => r(require('../../pages/user/UserDetails')), 'userDetails'),
            children: []
          }
        ]
      },
    ]
  },
  money: {
    name: 'money',
    vue: null,
    text: '资金模块',
    children: [
      {
        name: 'monIndex',
        text: '资金查询',
        vue: r => require.ensure([], () => r(require('../../pages/money')), 'money'),
      }
    ]
  }
};

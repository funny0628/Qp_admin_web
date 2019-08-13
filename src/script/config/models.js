/** 包含模块 **/
const models = {
  index: {
    name: 'index',
    vue: null,
    text: '首页',
    children: []
  },
  user:{
    name:'user',
    vue: null,
    text:'用户管理',
    children: [
      {
        name:'userList',
        text:'用户列表',
        vue: r => require.ensure([],() => r(require('../../pages/user/userList/UserList.vue')),'userList'),
      },
      {
        name:'memCardList',
        text:'会员银行卡列表',
        vue: r => require.ensure([],() => r(require('../../pages/user/memCardList/MemCardList.vue')),'memCardList'),
      },
      {
        name:'agentLink',
        text:'代理链接管理',
        vue: r => require.ensure([],() => r(require('../../pages/user/agentLink/AgentLink.vue')),'agentLink'),
      },
      {
        name:'userLayer',
        text:'用户分层',
        vue: r => require.ensure([],() => r(require('../../pages/user/userLayer/UserLayer.vue')),'userLayer'),
      }
    ]
  }
};

export default models;

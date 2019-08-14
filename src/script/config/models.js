/** 包含模块 **/
const models = {
  index: {
    name: 'index',
    vue: null,
    text: '首页',
    children: []
  },
  user: {
    name: 'user',
    vue: null,
    text: '用户管理',
    children: [
      {
        name: 'userList',
        text: '用户列表',
        vue: r => require.ensure([], () => r(require('../../pages/user/userList/UserList')), 'userList'),
      },
      {
        name: 'memCardList',
        text: '会员银行卡列表',
        vue: r => require.ensure([], () => r(require('../../pages/user/memCardList/MemCardList')), 'memCardList'),
      },
      {
        name: 'agentLink',
        text: '代理链接管理',
        vue: r => require.ensure([], () => r(require('../../pages/user/agentLink/AgentLink')), 'agentLink'),
      },
      {
        name: 'userLayer',
        text: '用户分层',
        vue: r => require.ensure([], () => r(require('../../pages/user/userLayer/UserLayer')), 'userLayer'),
      }
    ]
  },
  agent:{
    name:'agent',
    vue: null,
    text:'代理管理',
    children:[
      {
        name:'level',
        text:'代理层级',
        vue: r => require.ensure([], () => r(require('../../pages/agent/level/Level')), 'level'),
      },
      {
        name:'commission',
        text:'代理返佣设置',
        vue: r => require.ensure([], () => r(require('../../pages/agent/commission/Commission')), 'commission'),
      }
    ]
  },
  financial:{
    name:'financial',
    vue:null,
    text:'财务管理',
    children:[
      {
        name:'bank',
        text:'银行管理',
        vue: r => require.ensure([], () => r(require('../../pages/financial/bank/Bank')), 'bank'),
      },
      {
        name:'bankAccount',
        text:'银行收款账号',
        vue: r => require.ensure([], () => r(require('../../pages/financial/bankAccoumt/BankAccount')), 'bankAccount'),
      },
      {
        name:'thirdAccount',
        text:'第三方收款账号',
        vue: r => require.ensure([], () => r(require('../../pages/financial/thirdAccount/ThirdAccount')), 'thirdAccount'),
      },
      {
        name:'prepaidRecord',
        text:'充值记录查询',
        vue: r => require.ensure([], () => r(require('../../pages/financial/prepaidRecord/PrepaidRecord')), 'prepaidRecord'),
      },
      {
        name:'enquiry',
        text:'兑换记录查询',
        vue: r => require.ensure([], () => r(require('../../pages/financial/enquiry/Enquiry')), 'enquiry'),
      },
      {
        name:'manual',
        text:'手动上下分',
        vue: r => require.ensure([], () => r(require('../../pages/financial/manual/Manual')), 'manual'),
      },
      {
        name:'moneyFlow',
        text:'资金流水',
        vue: r => require.ensure([], () => r(require('../../pages/financial/manual/Manual')), 'manual'),
      }
    ]
  }
};

export default models;

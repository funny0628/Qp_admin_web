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
        vue: r => require.ensure([], () => r(require('../../pages/User/UserList')), 'userList'),
      },
      {
        name: 'memCardList',
        text: '会员银行卡列表',
        vue: r => require.ensure([], () => r(require('../../pages/User/MemCardList')), 'memCardList'),
      },
      {
        name: 'agentLink',
        text: '代理链接管理',
        vue: r => require.ensure([], () => r(require('../../pages/User/AgentLink')), 'agentLink'),
      },
      {
        name: 'userLayer',
        text: '用户分层',
        vue: r => require.ensure([], () => r(require('../../pages/User/UserLayer')), 'userLayer'),
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
        vue: r => require.ensure([], () => r(require('../../pages/Agent/Level')), 'level')
      },
      {
        name:'commission',
        text:'代理返佣设置',
        vue: r => require.ensure([], () => r(require('../../pages/Agent/Commission')), 'commission')
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
        vue: r => require.ensure([], () => r(require('../../pages/Financial/Bank')), 'bank'),
      },
      {
        name:'bankAccount',
        text:'银行收款账号',
        vue: r => require.ensure([], () => r(require('../../pages/Financial/BankAccount')), 'bankAccount'),
      },
      {
        name:'thirdAccount',
        text:'第三方收款账号',
        vue: r => require.ensure([], () => r(require('../../pages/Financial/ThirdAccount')), 'thirdAccount'),
      },
      {
        name:'prepaidRecord',
        text:'充值记录查询',
        vue: r => require.ensure([], () => r(require('../../pages/Financial/PrepaidRecord')), 'prepaidRecord'),
      },
      {
        name:'enquiry',
        text:'兑换记录查询',
        vue: r => require.ensure([], () => r(require('../../pages/Financial/Enquiry')), 'enquiry'),
      },
      {
        name:'manual',
        text:'手动上下分',
        vue: r => require.ensure([], () => r(require('../../pages/Financial/Manual')), 'manual'),
      },
      {
        name:'moneyFlow',
        text:'资金流水',
        vue: r => require.ensure([], () => r(require('../../pages/Financial/MoneyFlow')), 'moneyFlow'),
      }
    ]
  },
  dataSta:{
    name:'dataSta',
    text:'数据统计',
    vue:null,
    children:[
      {
        name:'onlineSta',
        text:'在线统计',
        vue: r => require.ensure([], () => r(require('../../pages/DataSta/OnlineSta')), 'onlineSta')
      },
      {
        name:'taxSta',
        text:'税收统计表',
        vue: r => require.ensure([], () => r(require('../../pages/DataSta/TaxSta')), 'taxSta')
      },
      {
        name:'gameRep',
        text:'游戏报表',
        vue: r => require.ensure([], () => r(require('../../pages/DataSta/GameRep')), 'gameRep')
      },
      {
        name:'teamRep',
        text:'团队报表',
        vue: r => require.ensure([], () => r(require('../../pages/DataSta/TeamRep')), 'teamRep')
      },
      {
        name:'summaryAcc',
        text:'出入账目汇总',
        vue: r => require.ensure([], () => r(require('../../pages/DataSta/SummaryAcc')), 'summaryAcc')
      },
      {
        name:'flowSta',
        text:'金流数据统计',
        vue: r => require.ensure([], () => r(require('../../pages/DataSta/FlowSta')), 'flowSta')
      }
    ]
  }
};

export default models;

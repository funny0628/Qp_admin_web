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
      },
      {
        name:'riskList',
        text:'风控列表',
        vue: r => require.ensure([], () => r(require('../../pages/User/RiskList')), 'riskList'),
      },
      {
        name:'leaderBoard',
        text:'排行版数据',
        vue: r => require.ensure([], () => r(require('../../pages/User/LeaderBoard')), 'leaderBoard'),
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
      },
      {
        name:'universal',
        text:'全民返佣',
        vue: r => require.ensure([], ()=> r(require('../../pages/Agent/Universal')),'universal')
      },
      {
        name:'sales',
        text:'业绩返佣',
        vue: r => require.ensure([], ()=> r(require('../../pages/Agent/Sales')),'sales')
      },
      {
        name:'salesList',
        text:'业绩返佣列表',
        vue: r => require.ensure([], ()=> r(require('../../pages/Agent/SalesList')),'sales')
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
      },
      {
        name:'dayTrend',
        text:'每日趋势',
        vue: r => require.ensure([], () => r(require('../../pages/DataSta/DayTrend')), 'dayTrend')
      }
    ]
  },
  theConfig:{
    name:'theConfig',
    text:'大厅配置',
    vue:null,
    children:[
      {
        name:'scrollNotice',
        text:'滚动公告',
        vue: r => require.ensure([], () => r(require('../../pages/TheConfig/ScrollNotice')), 'scrollNotice')
      },
      {
        name:'internalMail',
        text:'内部邮件',
        vue: r => require.ensure([], () => r(require('../../pages/TheConfig/InternalMail')), 'internalMail')
      },
      {
        name:'popNotice',
        text:'弹窗公告',
        vue: r => require.ensure([], () => r(require('../../pages/TheConfig/PopNotice')), 'popNotice')
      },
      {
        name:'posterHall',
        text:'大厅海报',
        vue: r => require.ensure([], () => r(require('../../pages/TheConfig/PosterHall')), 'posterHall')
      },
      {
        name:'topPref',
        text:'充值优惠',
        vue: r => require.ensure([], () => r(require('../../pages/TheConfig/TopPref')), 'topPref')
      },
      {
        name:'dayCheck',
        text:'每日签到',
        vue: r => require.ensure([], () => r(require('../../pages/TheConfig/DayCheck')), 'dayCheck')
      },
      {
        name:'rotaActive',
        text:'转盘活动',
        vue: r => require.ensure([], () => r(require('../../pages/TheConfig/RotaActive')), 'rotaActive')
      },
      {
        name:'playTask',
        text:'玩家任务',
        vue: r => require.ensure([], () => r(require('../../pages/TheConfig/PlayTask')), 'playTask')
      },
      {
        name:'setService',
        text:'客服设置',
        vue: r => require.ensure([], () => r(require('../../pages/TheConfig/SetService')), 'setService')
      }
    ]
  },
  channel:{
    name:'channel',
    vue: null,
    text:'渠道管理',
    children:[
      {
        name:'packagemanage',
        text:'包管理',
        vue: r => require.ensure([], () => r(require('../../pages/Channel/PackageManage.vue')), 'packagemanage'),
      },
      {
        name:'packagestatistics',
        text:'渠道包统计',
        vue: r => require.ensure([], () => r(require('../../pages/Channel/PackageStatistics.vue')), 'packagestatistics'),
      },
      {
        name:'report',
        text:'渠道报表',
        vue: r => require.ensure([], () => r(require('../../pages/Channel/Report.vue')), 'report'),
      }
    ]
  },
  silvermanage:{
    name:'silvermanage',
    vue: null,
    text:'银商管理',
    children:[
      {
        name:'rechargelist',
        text:'银商充值列表',
        vue: r => require.ensure([], () => r(require('../../pages/SilverManage/RechargeList.vue')), 'rechargelist'),
      },
      {
        name:'accountlist',
        text:'银商账号列表',
        vue: r => require.ensure([], () => r(require('../../pages/SilverManage/AccountList.vue')), 'accountlist'),
      },
    ]
  },
  journal:{
    name:'journal',
    vue: null,
    text:'日志记录',
    children:[
      {
        name:'operate',
        text:'会员操作日志',
        vue: r => require.ensure([], () => r(require('../../pages/Journal/Operate.vue')), 'operate'),
      },
      {
        name:'loginlog',
        text:'会员登录日志',
        vue: r => require.ensure([], () => r(require('../../pages/Journal/LoginLog.vue')), 'loginlog'),
      },
    ]
  },
  subbackstage:{
    name:'subbackstage',
    vue: null,
    text:'运营后台管理',
    children:[
      {
        name:'subaccount',
        text:'运营后台账号列表',
        vue: r => require.ensure([], () => r(require('../../pages/SubBackstage/Subaccount.vue')), 'subaccount'),
        children:[
          {
            name:'setpermission',
            text:'权限设置',
            vue: r => require.ensure([], () => r(require('../../pages/SubBackstage/Setpermission.vue')), 'setpermission'),
          },
        ]
      }
    ]
  },
  limit:{
    name:'limit',
    vue: null,
    text:'权限管理',
    children:[
      {
        name:'manager',
        text:'管理员角色',
        vue: r => require.ensure([], () => r(require('../../pages/Limit/Manager.vue')), 'manager'),
        children:[
          {
            name:'setlimit',
            text:'权限设置',
            vue: r => require.ensure([], () => r(require('../../pages/Limit/SetLimit.vue')), 'setlimit'),
          },
        ]
      },
      {
        name:'managerlist',
        text:'管理员列表',
        vue: r => require.ensure([], () => r(require('../../pages/Limit/ManagerList.vue')), 'managerlist'),
      },
      {
        name:'backdo',
        text:'后台操作日志',
        vue: r => require.ensure([], () => r(require('../../pages/Limit/BackDo.vue')), 'backdo'),
      },
      {
        name:'backlogin',
        text:'后台登陆日志',
        vue: r => require.ensure([], () => r(require('../../pages/Limit/BackLogin.vue')), 'backlogin'),
      }
    ]
  },
  systemmanage:{
    name:'systemmanage',
    vue: null,
    text:'系统管理',
    children:[
      {
        name:'global',
        text:'全局设置',
        vue: r => require.ensure([], () => r(require('../../pages/SystemManage/Global.vue')), 'global'),
      }
    ]
  },
};

export default models;

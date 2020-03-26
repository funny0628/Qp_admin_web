/** 包含模块 **/
const models = {
  index: {
    name: 'index',
    vue: null,
    text: '首页',
    children: []
  },
  right: {
    name: 'right',
    vue: null,
    text: '权限管理',
    children: [
      {
        name: 'userList',
        text: '用户管理',
        vue: r => require.ensure([], () => r(require('../../pages/User/UserList')), 'userList'),
      },
      {
        name: 'roleMan',
        text: '角色管理',
        vue: r => require.ensure([], () => r(require('../../pages/User/roleMan')), 'roleMan'),
      },
      {
        name: 'systemJournal',
        text: '系统操作日志',
        vue: r => require.ensure([], () => r(require('../../pages/User/SystemJournal')), 'systemJournal'),
      },
    ]
  },
  gameMan:{
    name:'gameMan',
    vue:null,
    text:'游戏管理',
    children:[
      {
        name:'gameRec',
        text:'游戏记录',
        vue: r => require.ensure([],()=> r(require('../../pages/GameMan/GameRec')),'gameRec')
      },
      // {
      //   name:'gold_rec',
      //   text:"金币记录",
      //   vue: r => require.ensure([], () => r(require('../../pages/GameMan/GoldRec')),'goldRec')
      // }
    ]
  },
  hallFunConfig:{
    name:'HallFunConfig',
    text:'大厅功能配置',
    vue:null,
    children:[
      {
        name:'payConfig',
        text:'支付配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/PayConfig')), 'payConfig')
      },
      {
        name:'offlinePay',
        text:'线下支付',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/OfflinePay')), 'offlinePay')
      },
      {
        name:'PayTabControl',
        text:'支付页签控制',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/PayTabControl')), 'PayTabControl')
      },
      {
        name:'RankListManage',
        text:'排行榜管理',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/RankListManage')), 'RankListManage')
      },
      {
        name:'VipSystem',
        text:'vip系统',
        vue: null,
        children: [
          {
            name:'vipClassConf',
            text:'VIP等级配置',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/vip_child/VipClassConf')), 'vipClassConf')
          },
          {
            name:'vipRobotConf',
            text:'VIP机器人配置',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/vip_child/VipRobotConf')), 'vipRobotConf')
          },
        ]
      },
      {
        name:'gameList',
        text:'游戏列表',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/GameList')), 'gameList')
      },
      {
        name:'GameSortConf',
        text:'游戏排序配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/GameSortConf')), 'GameSortConf')
      },
      {
        name:'SetBackgroundMusic',
        text:'背景音乐设置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/SetBackgroundMusic')), 'SetBackgroundMusic')
      },
      {
        name:'DefaultAvatarUpload',
        text:'默认头像上传',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/DefaultAvatarUpload')), 'DefaultAvatarUpload')
      },
      {
        name:'HallAdvertiseConf',
        text:'大厅宣传页配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/HallAdvertiseConf')), 'HallAdvertiseConf')
      },
      {
        name:'BottomMenu',
        text:'底部菜单',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/BottomMenu')), 'BottomMenu')
      },
      {
        name:'FunSortConf',
        text:'功能排序配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/FunSortConf')), 'FunSortConf')
      },
      {
        name:'NoticeConf',
        text:'公告配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/NoticeConf')), 'NoticeConf')
      },
      {
        name:'MarqueeConf',
        text:'跑马灯配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/MarqueeConf')), 'MarqueeConf')
      },
      {
        name:'EmailSystem',
        text:'邮件系统',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/EmailSystem')), 'EmailSystem')
      },
      // {
      //   name:'scrollNotice',
      //   text:'滚动公告',
      //   vue: r => require.ensure([], () => r(require('../../pages/TheConfig/ScrollNotice')), 'scrollNotice')
      // },
      // {
      //   name:'internalMail',
      //   text:'内部邮件',
      //   vue: r => require.ensure([], () => r(require('../../pages/TheConfig/InternalMail')), 'internalMail')
      // },
      // {
      //   name:'popNotice',
      //   text:'弹窗公告',
      //   vue: r => require.ensure([], () => r(require('../../pages/TheConfig/PopNotice')), 'popNotice')
      // },
      // {
      //   name:'posterHall',
      //   text:'大厅海报',
      //   vue: r => require.ensure([], () => r(require('../../pages/TheConfig/PosterHall')), 'posterHall')
      // },
      // {
      //   name:'topPref',
      //   text:'充值优惠',
      //   vue: r => require.ensure([], () => r(require('../../pages/TheConfig/TopPref')), 'topPref')
      // },
      // {
      //   name:'dayCheck',
      //   text:'每日签到',
      //   vue: r => require.ensure([], () => r(require('../../pages/TheConfig/DayCheck')), 'dayCheck')
      // },
      // {
      //   name:'rotaActive',
      //   text:'转盘活动',
      //   vue: r => require.ensure([], () => r(require('../../pages/TheConfig/RotaActive')), 'rotaActive')
      // },
      // {
      //   name:'playTask',
      //   text:'玩家任务',
      //   vue: r => require.ensure([], () => r(require('../../pages/TheConfig/PlayTask')), 'playTask')
      // },
      // {
      //   name:'setService',
      //   text:'客服设置',
      //   vue: r => require.ensure([], () => r(require('../../pages/TheConfig/SetService')), 'setService')
      // }
    ]
  },
  operationReport: {
    name: 'operationReport',
    vue: null,
    text: '运营报表',
    children: [
      {
        name: 'UserTeamRep',
        text: '用户团队报表',
        vue: r => require.ensure([], () => r(require('../../pages/OperationReport/UserTeamRep')), 'UserTeamRep'),
      },
      {
        name: 'GameRep',
        text: '游戏报表',
        vue: r => require.ensure([], () => r(require('../../pages/OperationReport/GameRep')), 'GameRep'),
      },
      {
        name: 'PlatformRep',
        text: '平台报表',
        vue: r => require.ensure([], () => r(require('../../pages/OperationReport/PlatformRep')), 'PlatformRep'),
      },
      {
        name: 'InoutcashRep',
        text: '出入款报表',
        vue: r => require.ensure([], () => r(require('../../pages/OperationReport/InoutcashRep')), 'InoutcashRep'),
      },
    ]
  },
  channelPackageMan: {
    name: 'channelPackageMan',
    vue: null,
    text: '渠道包管理',
    children: [
      {
        name: 'ChannelPackageStat',
        text: '渠道包统计',
        vue: r => require.ensure([], () => r(require('../../pages/ChannelPackageMan/ChannelPackageStat')), 'ChannelPackageStat'),
      },
      {
        name: 'ChannelPackageMan',
        text: '渠道包管理',
        vue: r => require.ensure([], () => r(require('../../pages/ChannelPackageMan/ChannelPackageMan')), 'ChannelPackageMan'),
      },
      {
        name: 'ChannelGainOrLoseData',
        text: '渠道盈亏数据',
        vue: r => require.ensure([], () => r(require('../../pages/ChannelPackageMan/ChannelGainOrLoseData')), 'ChannelGainOrLoseData'),
      },
      {
        name: 'ChannelPayConf',
        text: '渠道支付配置',
        vue: r => require.ensure([], () => r(require('../../pages/ChannelPackageMan/ChannelPayConf')), 'ChannelPayConf'),
      },
    ]
  },
  agent:{
    name:'agent',
    vue: null,
    text:'代理数据',
    children:[
      {
        name:'level',
        text:'代理层级',
        vue: r => require.ensure([], () => r(require('../../pages/Agent/Level')), 'level')
      },
      // {
      //   name:'commission',
      //   text:'代理返佣设置',
      //   vue: r => require.ensure([], () => r(require('../../pages/Agent/Commission')), 'commission')
      // },
      {
        name:'universal',
        text:'全民代理列表',
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
  dataAnalyze:{
    name:'dataAnalyze',
    vue: null,
    text:'数据分析',
    children:[
      {
        name:'OnlinePlay',
        text:'在线在玩',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalyze/OnlinePlay')), 'OnlinePlay')
      },
      {
        name:'KeepAnalyze',
        text:'留存分析',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalyze/KeepAnalyze')), 'KeepAnalyze')
      },
      {
        name:'AgentAddProfit',
        text:'代理日新增收益',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalyze/AgentAddProfit')), 'AgentAddProfit')
      },
    ]
  },
  ActiveOperation:{
    name:'ActiveOperation',
    vue: null,
    text:'活动运营',
    children:[
      {
        name:'RechargeDiscount',
        text:'充值优惠',
        vue: r => require.ensure([], () => r(require('../../pages/ActiveOperation/RechargeDiscount')), 'RechargeDiscount')
      },
      {
        name:'EverydaySign',
        text:'每日签到',
        vue: r => require.ensure([], () => r(require('../../pages/ActiveOperation/EverydaySign')), 'EverydaySign')
      },
      {
        name:'SetAward',
        text:'抽奖设置',
        vue: r => require.ensure([], () => r(require('../../pages/ActiveOperation/SetAward')), 'SetAward')
      },
      {
        name:'RedPackageRain',
        text:'红包雨活动',
        vue: r => require.ensure([], () => r(require('../../pages/ActiveOperation/RedPackageRain')), 'RedPackageRain')
      },
      {
        name:'HelpMoney',
        text:'救援金活动',
        vue: r => require.ensure([], () => r(require('../../pages/ActiveOperation/HelpMoney')), 'HelpMoney')
      },
      {
        name:'BetBackWater',
        text:'投注返水活动',
        vue: r => require.ensure([], () => r(require('../../pages/ActiveOperation/BetBackWater')), 'BetBackWater')
      },
      {
        name:'ActiveGetRecord',
        text:'活动领取记录',
        vue: r => require.ensure([], () => r(require('../../pages/ActiveOperation/ActiveGetRecord')), 'ActiveGetRecord')
      },
    ]
  },
  SystemConfig:{
    name:'SystemConfig',
    vue: null,
    text:'系统配置',
    children:[
      {
        name:'PushFunction',
        text:'推送功能',
        vue: r => require.ensure([], () => r(require('../../pages/SystemConfig/PushFunction')), 'PushFunction')
      },
      {
        name:'PropertyConf',
        text:'属性配置',
        vue: r => require.ensure([], () => r(require('../../pages/SystemConfig/PropertyConf')), 'PropertyConf')
      },
      {
        name:'popularizeConf',
        text:'推广配置',
        vue: r => require.ensure([], () => r(require('../../pages/SystemConfig/popularizeConf')), 'popularizeConf')
      },
    ]
  },
  PowerManage:{
    name:'PowerManage',
    vue: null,
    text:'权限管理',
    children:[
      {
        name:'AdminRole',
        text:'管理员角色',
        vue: r => require.ensure([], () => r(require('../../pages/PowerManage/AdminRole')), 'AdminRole')
      },
      {
        name:'AdminList',
        text:'管理员列表',
        vue: r => require.ensure([], () => r(require('../../pages/PowerManage/AdminList')), 'AdminList')
      },
      {
        name:'SystemHandleLog',
        text:'系统操作日志',
        vue: r => require.ensure([], () => r(require('../../pages/PowerManage/SystemHandleLog')), 'SystemHandleLog')
      },
    ]
  },
  //---------------- 
  // financial:{
  //   name:'financial',
  //   vue:null,
  //   text:'财务管理',
  //   children:[
  //     {
  //       name:'bank',
  //       text:'银行管理',
  //       vue: r => require.ensure([], () => r(require('../../pages/Financial/Bank')), 'bank'),
  //     },
  //     {
  //       name:'bankAccount',
  //       text:'银行收款账号',
  //       vue: r => require.ensure([], () => r(require('../../pages/Financial/BankAccount')), 'bankAccount'),
  //     },
  //     {
  //       name:'thirdAccount',
  //       text:'第三方收款账号',
  //       vue: r => require.ensure([], () => r(require('../../pages/Financial/ThirdAccount')), 'thirdAccount'),
  //     },
  //     {
  //       name:'prepaidRecord',
  //       text:'充值记录查询',
  //       vue: r => require.ensure([], () => r(require('../../pages/Financial/PrepaidRecord')), 'prepaidRecord'),
  //     },
  //     {
  //       name:'enquiry',
  //       text:'兑换记录查询',
  //       vue: r => require.ensure([], () => r(require('../../pages/Financial/Enquiry')), 'enquiry'),
  //     },
  //     {
  //       name:'manual',
  //       text:'手动上下分',
  //       vue: r => require.ensure([], () => r(require('../../pages/Financial/Manual')), 'manual'),
  //     },
  //     {
  //       name:'moneyFlow',
  //       text:'资金流水',
  //       vue: r => require.ensure([], () => r(require('../../pages/Financial/MoneyFlow')), 'moneyFlow'),
  //     },
  //     {
  //       name:'record',
  //       text:'赠送记录',
  //       vue: r => require.ensure([], () => r(require('../../pages/Financial/Record')), 'record'),
  //     }
  //   ]
  // },
  // dataSta:{
  //   name:'dataSta',
  //   text:'数据统计',
  //   vue:null,
  //   children:[
  //     {
  //       name:'onlineSta',
  //       text:'在线统计',
  //       vue: r => require.ensure([], () => r(require('../../pages/DataSta/OnlineSta')), 'onlineSta')
  //     },
  //     {
  //       name:'taxSta',
  //       text:'税收统计表',
  //       vue: r => require.ensure([], () => r(require('../../pages/DataSta/TaxSta')), 'taxSta')
  //     },
  //     {
  //       name:'gameRep',
  //       text:'游戏报表',
  //       vue: r => require.ensure([], () => r(require('../../pages/DataSta/GameRep')), 'gameRep')
  //     },
  //     {
  //       name:'teamRep',
  //       text:'团队报表',
  //       vue: r => require.ensure([], () => r(require('../../pages/DataSta/TeamRep')), 'teamRep')
  //     },
  //     {
  //       name:'summaryAcc',
  //       text:'出入账目汇总',
  //       vue: r => require.ensure([], () => r(require('../../pages/DataSta/SummaryAcc')), 'summaryAcc')
  //     },
  //     {
  //       name:'flowSta',
  //       text:'金流数据统计',
  //       vue: r => require.ensure([], () => r(require('../../pages/DataSta/FlowSta')), 'flowSta')
  //     },
  //     {
  //       name:'dayTrend',
  //       text:'每日趋势',
  //       vue: r => require.ensure([], () => r(require('../../pages/DataSta/DayTrend')), 'dayTrend')
  //     }
  //   ]
  // },
//   channel:{
//     name:'channel',
//     vue: null,
//     text:'渠道管理',
//     children:[
//       {
//         name:'packagemanage',
//         text:'包管理',
//         vue: r => require.ensure([], () => r(require('../../pages/Channel/PackageManage.vue')), 'packagemanage'),
//       },
//       {
//         name:'packagestatistics',
//         text:'渠道包统计',
//         vue: r => require.ensure([], () => r(require('../../pages/Channel/PackageStatistics.vue')), 'packagestatistics'),
//       },
//       {
//         name:'report',
//         text:'渠道报表',
//         vue: r => require.ensure([], () => r(require('../../pages/Channel/Report.vue')), 'report'),
//       }
//     ]
//   },
//   silvermanage:{
//     name:'silvermanage',
//     vue: null,
//     text:'银商管理',
//     children:[
//       {
//         name:'rechargelist',
//         text:'银商充值列表',
//         vue: r => require.ensure([], () => r(require('../../pages/SilverManage/RechargeList.vue')), 'rechargelist'),
//       },
//       {
//         name:'accountlist',
//         text:'银商账号列表',
//         vue: r => require.ensure([], () => r(require('../../pages/SilverManage/AccountList.vue')), 'accountlist'),
//       },
//     ]
//   },
//   journal:{
//     name:'journal',
//     vue: null,
//     text:'日志记录',
//     children:[
//       {
//         name:'operate',
//         text:'会员操作日志',
//         vue: r => require.ensure([], () => r(require('../../pages/Journal/Operate.vue')), 'operate'),
//       },
//       {
//         name:'loginlog',
//         text:'会员登录日志',
//         vue: r => require.ensure([], () => r(require('../../pages/Journal/LoginLog.vue')), 'loginlog'),
//       },
//     ]
//   },
//   subbackstage:{
//     name:'subbackstage',
//     vue: null,
//     text:'运营后台管理',
//     children:[
//       {
//         name:'subaccount',
//         text:'运营后台账号列表',
//         vue: r => require.ensure([], () => r(require('../../pages/SubBackstage/Subaccount.vue')), 'subaccount'),
//         children:[
//           {
//             name:'setpermission',
//             text:'权限设置',
//             vue: r => require.ensure([], () => r(require('../../pages/SubBackstage/Setpermission.vue')), 'setpermission'),
//           },
//         ]
//       },
//       {
//         name:'companymanage',
//         text:'公司管理',
//         vue: r => require.ensure([], () => r(require('../../pages/SubBackstage/CompanyManage.vue')), 'companymanage'),
//       },
//     ]
//   },
//   limit:{
//     name:'limit',
//     vue: null,
//     text:'权限管理',
//     children:[
//       {
//         name:'manager',
//         text:'管理员角色',
//         vue: r => require.ensure([], () => r(require('../../pages/Limit/Manager.vue')), 'manager'),
//         children:[
//           {
//             name:'setlimit',
//             text:'权限设置',
//             vue: r => require.ensure([], () => r(require('../../pages/Limit/SetLimit.vue')), 'setlimit'),
//           },
//         ]
//       },
//       {
//         name:'managerlist',
//         text:'管理员列表',
//         vue: r => require.ensure([], () => r(require('../../pages/Limit/ManagerList.vue')), 'managerlist'),
//       },
//       {
//         name:'backdo',
//         text:'后台操作日志',
//         vue: r => require.ensure([], () => r(require('../../pages/Limit/BackDo.vue')), 'backdo'),
//       },
//       {
//         name:'backlogin',
//         text:'后台登陆日志',
//         vue: r => require.ensure([], () => r(require('../../pages/Limit/BackLogin.vue')), 'backlogin'),
//       }
//     ]
//   },
//   systemmanage:{
//     name:'systemmanage',
//     vue: null,
//     text:'系统管理',
//     children:[
//       {
//         name:'global',
//         text:'全局设置',
//         vue: r => require.ensure([], () => r(require('../../pages/SystemManage/Global.vue')), 'global'),
//       }
//     ]
//   },
};

export default models;

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
    name:'SubGameConfig',
    vue:null,
    text:'子游戏配置',
    children:[
      {
        name:'happyFishing',
        text:'欢乐捕鱼',
        vue: null,
        children: [
          {
            name: 'fishRoomCofig',
            text: '捕鱼-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/happyFishing_child/fishRoomCofig')), 'fishRoomCofig')
          },
          {
            name: 'fishControl',
            text: '捕鱼-机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/happyFishing_child/fishControl')), 'fishControl')
          },
          {
            name: 'batteryConfig',
            text: '炮台配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/happyFishing_child/batteryConfig')), 'batteryConfig')
          },
        ]
      },
      {
        name:'hundredNiuNiu',
        text:'百人牛牛',
        vue: null,
        children: [
          {
            name: 'trineRoomCofig',
            text: '三倍场房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/trineRoomCofig')), 'trineRoomCofig')
          },
          {
            name: 'decupleRoomCofig',
            text: '十倍场房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/decupleRoomCofig')), 'decupleRoomCofig')
          },
          {
            name: 'trineRobotControl',
            text: '三倍场机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/trineRobotControl')), 'trineRobotControl')
          },
          {
            name: 'decupleRobotControl',
            text: '十倍场机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/decupleRobotControl')), 'decupleRobotControl')
          },
          {
            name: 'trineBankerControl',
            text: '三倍场上庄机器人控制 ',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/trineBankerControl')), 'trineBankerControl')
          },
          {
            name: 'decupleBankerControl',
            text: '十倍场上庄机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/decupleBankerControl')), 'decupleBankerControl')
          },
        ]
      },
      {
        name:'RobNiuNiu',
        text:'抢庄牛牛',
        vue: null,
        children: [
          {
            name: 'RoomCofig',
            text: '抢庄牛-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/RobNiuNiu/RoomCofig')), 'RoomCofig')
          },
          {
            name: 'RobotControl',
            text: '抢庄牛-机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/RobNiuNiu/RobotControl')), 'RobotControl')
          },
        ]
      },
      {
        name:'GoldenFlower',
        text:'炸金花',
        vue: null,
        children: [
          {
            name: 'F_RoomCofig',
            text: '金花-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/GoldenFlower/F_RoomCofig')), 'F_RoomCofig')
          },
          {
            name: 'F_RobotControl',
            text: '金花-机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/GoldenFlower/F_RobotControl')), 'F_RobotControl')
          },
          {
            name: 'F_ProbConfig',
            text: '金花-牌型概率配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/GoldenFlower/F_ProbConfig')), 'F_ProbConfig')
          },
        ]
      },
      {
        name:'Landlords',
        text:'斗地主',
        vue: null,
        children: [
          {
            name: 'L_RoomCofig',
            text: '斗地主-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/Landlords/L_RoomCofig')), 'L_RoomCofig')
          },
          {
            name: 'L_RobotControl',
            text: '斗地主-机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/Landlords/L_RobotControl')), 'L_RobotControl')
          },
          {
            name: 'L_PreventConfig',
            text: '斗地主-防刷配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/Landlords/L_PreventConfig')), 'L_PreventConfig')
          },
        ]
      },
      {
        name:'FruitMachine',
        text:'水果机',
        vue: null,
        children: [
          {
            name: 'S_RoomCofig',
            text: '水果机-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/FruitMachine/S_RoomCofig')), 'S_RoomCofig')
          },
          {
            name: 'S_BasicDeploy',
            text: '水果机-基础配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/FruitMachine/S_BasicDeploy')), 'S_BasicDeploy')
          },
        ]
      },
      {
        name:'RedBlackWar',
        text:'红黑大战',
        vue: null,
        children: [
          {
            name: 'W_RoomCofig',
            text: '红黑-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/RedBlackWar/W_RoomCofig')), 'W_RoomCofig')
          },
          {
            name: 'W_RobotControl',
            text: '红黑-机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/RedBlackWar/W_RobotControl')), 'W_RobotControl')
          },
        ]
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
        // vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/PayConfig')), 'payConfig'),
        children: [
          {
            name: 'VIPpayConfig',
            text: 'VIP充值配置',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/PayConfig_child/VIPpayConfig')), 'VIPpayConfig')
          },
          {
            name: 'payList',
            text: '支付列表',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/PayConfig_child/payList')), 'payList')
          },
          {
            name: 'reportWayConfig',
            text: '举报方式配置',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/PayConfig_child/reportWayConfig')), 'reportWayConfig')
          },
        ]
      },
      {
        name: 'Announcements ',
        text: '活动和公告',
        // vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/Announcements')), 'Announcements '),
        children: [
          {
            name: 'gameAnnouncement',
            text: '游戏公告',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/Announcements_child/gameAnnouncement')), 'gameAnnouncement')
          },
          {
            name: 'systemBroadcast',
            text: '系统广播',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/Announcements_child/systemBroadcast')), 'systemBroadcast')
          },
          {
            name: 'activityList',
            text: '活动列表',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/Announcements_child/activityList')), 'activityList')
          },
          {
            name: 'stopNotice',
            text: '停服公告',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/Announcements_child/stopNotice')), 'stopNotice')
          },
        ]
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
        // vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/RankListManage')), 'RankListManage'),
        children: [
          {
            name:'RankListManageConf',
            text:'排行榜配置',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/RankListManage_child/RankListManageConf')), 'RankListManageConf')
          },
          {
            name:'RankListManageHistory',
            text:'排行榜历史数据',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/RankListManage_child/RankListManageHistory')), 'RankListManageHistory')
          },
        ]
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
        name:'BroadcastConf',
        text:'对局广播配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/BroadcastConf')), 'BroadcastConf')
      },
      {
        name:'ExchangeConf',
        text:'兑换配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/ExchangeConf')), 'ExchangeConf')
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
        text:'邮件管理',
        // vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/EmailSystem')), 'EmailSystem'),
        children: [
          {
            name:'platformEmail',
            text:'平台邮件',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/EmailSystem_child/platformEmail')), 'platformEmail')
          },
          {
            name:'allServersEmail',
            text:'全服邮件',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/EmailSystem_child/allServersEmail')), 'allServersEmail')
          },
        ]
      },
      // {
      //   name:'godSystem',
      //   text:'财神驾到系统',
      //   vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/EmailSystem')), 'EmailSystem'),
      //   children: [
      //     {
      //       name:'godCofig',
      //       text:'财神驾到玩法配置',
      //       vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/godSystem_child/godCofig')), 'godCofig')
      //     },
      //     {
      //       name:'godMessage',
      //       text:'财神驾到数据查询',
      //       vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/godSystem_child/godMessage')), 'godMessage')
      //     },
      //   ]
      // },
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

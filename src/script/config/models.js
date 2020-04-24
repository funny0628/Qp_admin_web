/** 包含模块 **/
const models = {
  index: {
    name: 'index',
    vue: null,
    text: '首页',
    children: []
  },
  authentications: {
    name: "authentications",
    vue: null,
    text: '权限管理',
    children: [
      {
        name: 'user_manage',
        text: '用户管理',
        vue: r => require.ensure([], () => r(require('../../pages/User/UserMan')), 'user_manage'),
      },
      {
        name: 'role_manage',
        text: '角色管理',
        vue: r => require.ensure([], () => r(require('../../pages/User/roleMan')), 'role_manage'),
      },
      {
        name: 'operation_logs',
        text: '系统操作日志',
        vue: r => require.ensure([], () => r(require('../../pages/User/SystemJournal')), 'operation_logs'),
      },
    ]
  },
  allAgency: {
    name: 'allAgency',
    vue: null,
    text: '全民代理',
    children: [
      {
        name: 'AgencyConfig',
        text: '全民代理配置',
        vue: r => require.ensure([], () => r(require('../../pages/allAgency/AgencyConfig')), 'AgencyConfig'),
      },
      {
        name: 'Agency',
        text: '全民代理',
        vue: r => require.ensure([], () => r(require('../../pages/allAgency/Agency')), 'Agency'),
      },
      // {
      //   name: 'AgencyTop',
      //   text: '全民代理top100',
      //   vue: r => require.ensure([], () => r(require('../../pages/allAgency/AgencyTop')), 'AgencyTop'),
      // },
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
      {
        name:'ChineseBoxer',
        text:'龙虎斗',
        vue: null,
        children: [
          {
            name: 'C_RoomCofig',
            text: '龙虎-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/ChineseBoxer/C_RoomCofig')), 'C_RoomCofig')
          },
          {
            name: 'C_RobotControl',
            text: '龙虎-机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/ChineseBoxer/C_RobotControl')), 'C_RobotControl')
          },
        ]
      },
      {
        name:'BMW',
        text:'奔驰宝马',
        vue: null,
        children: [
          {
            name: 'B_RoomCofig',
            text: '奔驰-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/BMW/B_RoomCofig')), 'B_RoomCofig')
          },
          {
            name: 'B_RobotControl',
            text: '奔驰-机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/BMW/B_RobotControl')), 'B_RobotControl')
          },
        ]
      },
      {
        name:'FamiliesHappy',
        text:'百家乐',
        vue: null,
        children: [
          {
            name: 'H_RoomCofig',
            text: '百家乐-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/FamiliesHappy/H_RoomCofig')), 'H_RoomCofig')
          },
          {
            name: 'H_RobotControl',
            text: '百家乐-机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/FamiliesHappy/H_RobotControl')), 'H_RobotControl')
          },
        ]
      },
      {
        name:'LinConfiguration',
        text:'百人场下注额度配置',
        vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/LinConfiguration')), 'LinConfiguration')
      },
      // {
      //   name:'gold_rec',
      //   text:"金币记录",
      //   vue: r => require.ensure([], () => r(require('../../pages/GameMan/GoldRec')),'goldRec')
      // }
    ]
  },
  lobby_config:{
    name:'lobby_config',
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
    ]
  },
  operations: {
    name: 'operations',
    vue: null,
    text: '运营管理',
    children: [
      {
        name: 'bank_card',
        text: '银行卡订单',
        vue: r => require.ensure([], () => r(require('../../pages/OperationMan/BankOrder')), 'bank_card'),
      },
      {
        name: 'order_manage',
        text: '订单管理',
        vue: r => require.ensure([], () => r(require('../../pages/OperationMan/OrderMan')), 'order_manage'),
      },
      {
        name: 'users',
        text: '用户列表',
        vue: r => require.ensure([], () => r(require('../../pages/OperationMan/UserList')), 'users'),
      },
      {
        name: 'channels',
        text: '渠道列表',
        vue: r => require.ensure([], () => r(require('../../pages/OperationMan/ChannelList')), 'channels'),
      },
      {
        name: 'play_records',
        text: '牌局记录',
        vue: r => require.ensure([], () => r(require('../../pages/OperationMan/GamblingRecord')), 'play_records'),
      },
      {
        name: 'fresher_awards',
        text: '新人奖励',
        vue: r => require.ensure([], () => r(require('../../pages/OperationMan/FreshmanReward')), 'fresher_awards'),
      },
      {
        name: 'cash_flows',
        text: '流水查询',
        vue: r => require.ensure([], () => r(require('../../pages/OperationMan/FlowSearch')), 'cash_flows'),
      },
      {
        name: 'fish_statistic',
        text: '捕鱼统计',
        vue: r => require.ensure([], () => r(require('../../pages/OperationMan/FishStatistic')), 'fish_statistic'),
      },
      {
        name: 'withdraw_records',
        text: '提现记录',
        vue: r => require.ensure([], () => r(require('../../pages/OperationMan/WithdrawRec')), 'withdraw_records'),
      },
      {
        name: 'change_coins',
        text: '修改玩家金币',
        vue: r => require.ensure([], () => r(require('../../pages/OperationMan/ModPlayGold')), 'change_coins'),
      },
    ]
  },
  repertoryMan: {
    name: 'RepertoryMan',
    vue: null,
    text: '库存管理',
    children: [
      {
        name: 'GMconfig',
        text: 'GM配置',
        children: [
          {
            name: 'GMrepControl',
            text: 'GM库存控制',
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/GMconfig_child/GMrepControl')), 'GMrepControl')
          },
          {
            name: 'GMconf',
            text: 'GM配置',
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/GMconfig_child/GMconf')), 'GMconf')
          },
          {
            name: 'GMdata',
            text: 'GM库存数据',
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/GMconfig_child/GMdata')), 'GMdata')
          },
          {
            name: 'GMcontrol',
            text: 'GM控制',
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/GMconfig_child/GMcontrol')), 'GMcontrol')
          },
          {
            name: 'GMrepFlow',
            text: 'GM库存流水',
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/GMconfig_child/GMrepFlow')), 'GMrepFlow')
          },
        ]
      },
      {
        name: "Landlords",
        text: "斗地主",
        children: [
          {
            name: "LandDrawWater",
            text: "斗地主-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/Landlords_child/LandDrawWater')), 'LandDrawWater')
          }
        ]
      },
      {
        name: "BombFlower",
        text: "炸金花",
        children: [
          {
            name: "GFlowerControl",
            text: "炸金花-库存控制",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/BombFlower_child/GFlowerControl')), 'GFlowerControl')
          },
          {
            name: "GFlowerWater",
            text: "炸金花-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/BombFlower_child/GFlowerWater')), 'GFlowerWater')
          }
        ]
      },
      {
        name: "HogCow",
        text: "抢庄牛牛",
        children: [
          {
            name: "CowControl",
            text: "抢庄牛牛-抢庄控制",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/HogCow_child/CowControl')), 'CowControl')
          },
          {
            name: "CowWater",
            text: "抢庄牛牛-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/HogCow_child/CowWater')), 'CowWater')
          }
        ]
      },
      {
        name: "HundredNiu",
        text: "百人牛牛",
        children: [
          {
            name: "HNControl",
            text: "百人牛牛-抢庄控制",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/HundredNiu/HNControl')), 'HNControl')
          },
          {
            name: "HNWater",
            text: "百人牛牛-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/HundredNiu/HNWater')), 'HNWater')
          }
        ]
      },
      {
        name: "RedBlackWar",
        text: "红黑大战",
        children: [
          {
            name: "RBControl",
            text: "红黑-抢庄控制",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/RedBlackWar/RBControl')), 'RBControl')
          },
          {
            name: "RBWater",
            text: "红黑-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/RedBlackWar/RBWater')), 'RBWater')
          }
        ]
      },
      {
        name: "ChineseWar",
        text: "龙虎斗",
        children: [
          {
            name: "C_Control",
            text: "龙虎斗-抢庄控制",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/ChineseWar/C_Control')), 'C_Control')
          },
          {
            name: "C_Water",
            text: "龙虎斗-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/ChineseWar/C_Water')), 'C_Water')
          }
        ]
      },
      {
        name: "HappyFishing",
        text: "欢乐捕鱼",
        children: [
          {
            name: "H_Control",
            text: "欢乐捕鱼-抢庄控制",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/HappyFishing/H_Control')), 'H_Control')
          },
          {
            name: "H_Water",
            text: "欢乐捕鱼-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/HappyFishing/H_Water')), 'H_Water')
          }
        ]
      },
      {
        name: "FruitMachine",
        text: "水果机",
        children: [
          {
            name: "F_Control",
            text: "水果机-抢庄控制",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/FruitMachine/F_Control')), 'F_Control')
          },
          {
            name: "F_Water",
            text: "水果机-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/FruitMachine/F_Water')), 'F_Water')
          }
        ]
      },
      {
        name: "Mammon",
        text: "财神驾到",
        children: [
          {
            name: "M_Control",
            text: "财神驾到-抢庄控制",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/Mammon/M_Control')), 'M_Control')
          },
          {
            name: "M_Water",
            text: "财神驾到-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/Mammon/M_Water')), 'M_Water')
          }
        ]
      },
      {
        name: "HundredHappy",
        text: "百家乐",
        children: [
          {
            name: "Happy_Control",
            text: "百家乐-抢庄控制",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/HundredHappy/Happy_Control')), 'Happy_Control')
          },
          {
            name: "Happy_Water",
            text: "百家乐-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/HundredHappy/Happy_Water')), 'Happy_Water')
          }
        ]
      },
      {
        name: "BCBM",
        text: "百家乐",
        children: [
          {
            name: "BC_Control",
            text: "百家乐-抢庄控制",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/BCBM/BC_Control')), 'BC_Control')
          },
          {
            name: "BC_Water",
            text: "百家乐-抽水数据",
            vue: r => require.ensure([], () => r(require('../../pages/RepertoryMan/BCBM/BC_Water')), 'BC_Water')
          }
        ]
      },
    ]
  },
  sys_config:{
    name:'sys_config',
    vue: null,
    text:'系统配置',
    children:[
      {
        name:'hot_update',
        text:'热更新',
        vue: r => require.ensure([], () => r(require('../../pages/SystemConfig/HotUpdate')), 'hot_update')
      },
      {
        name:'whiteList',
        text:'ip白名单',
        vue: r => require.ensure([], () => r(require('../../pages/SystemConfig/WhiteList')), 'whiteList')
      },
      {
        name:'ip_blacklist',
        text:'ip黑名单',
        vue: r => require.ensure([], () => r(require('../../pages/SystemConfig/BlackList')), 'ip_blacklist')
      },
      {
        name:'device_blacklist',
        text:'设备黑名单',
        vue: r => require.ensure([], () => r(require('../../pages/SystemConfig/DeviceBlackList')), 'device_blacklist')
      },
    ]
  },
  DataAnalysis:{
    name:'DataAnalysis',
    vue: null,
    text:'数据分析',
    children:[
      {
        name:'ChannelsReport',
        text:'渠道报表日',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/ChannelsReport')), 'ChannelsReport')
      },
      {
        name:'Channels',
        text:'渠道报表',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/Channels')), 'Channels')
      },
      {
        name:'LTVReport',
        text:'LTV报表',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/LTVReport')), 'LTVReport')
      },
      {
        name:'lastAnalysis',
        text:'留存分析',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/lastAnalysis')), 'lastAnalysis')
      },
      {
        name:'NewPlayerChange',
        text:'新玩家付费转换',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/NewPlayerChange')), 'NewPlayerChange')
      },
      {
        name:'Statistics',
        text:'台费统计',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/Statistics')), 'Statistics')
      },
      {
        name:'CardpPandect',
        text:'牌局总览',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/CardpPandect')), 'CardpPandect')
      },
      {
        name:'AddUser',
        text:'新增用户',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/AddUser')), 'AddUser')
      },
      {
        name:'FlyBack',
        text:'流失与回归',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/FlyBack')), 'FlyBack')
      },
    ]
  },
  ActivityOperations:{
    name:'ActivityOperations',
    vue: null,
    text:'活动运营',
    children:[
      {
        name:'FirstConfig',
        text:'首充配置',
        vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/FirstConfig')), 'FirstConfig')
      },
      {
        name:'SignUp',
        text:'每日签到',
        vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/SignUp')), 'SignUp')
      },
      {
        name:'SaveMoney',
        text:'每日救赎金',
        vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/SaveMoney')), 'SaveMoney')
      },
      {
        name:'Rainstorm',
        text:'每日暴风雨',
        vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/Rainstorm')), 'Rainstorm')
      },
      {
        name:'MoneyTree',
        text:'摇钱树活动',
        vue: null,
        children:[
          {
            name:'MT_Config',
            text:'摇钱树配置',
            vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/MoneyTree/MT_Config')), 'MT_Config'),
          },
          {
            name:'MT_TaskConfig',
            text:'摇钱树任务配置',
            vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/MoneyTree/MT_TaskConfig')), 'MT_TaskConfig'),
          },
          {
            name:'MT_OtherConfig',
            text:'其他配置',
            vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/MoneyTree/MT_OtherConfig')), 'MT_OtherConfig'),
          },
        ]
      },
    ]
  },
};

export default models;

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
  agent: {
    name: 'agent',
    vue: null,
    text: '全民代理',
    children: [
      {
        name: 'agent_config',
        text: '全民代理配置',
        vue: r => require.ensure([], () => r(require('../../pages/allAgency/AgencyConfig')), 'agent_config'),
      },
      {
        name: 'agent',
        text: '全民代理',
        vue: r => require.ensure([], () => r(require('../../pages/allAgency/Agency')), 'agent'),
      },
      // {
      //   name: 'AgencyTop',
      //   text: '全民代理top100',
      //   vue: r => require.ensure([], () => r(require('../../pages/allAgency/AgencyTop')), 'AgencyTop'),
      // },
    ]
  },
  game_config:{
    name:'game_config',
    vue:null,
    text:'子游戏配置',
    children:[
      {
        name:'hl_fish',
        text:'欢乐捕鱼',
        vue: null,
        children: [
          {
            name: 'hl_fish_room_config',
            text: '捕鱼-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/happyFishing_child/fishRoomCofig')), 'hl_fish_room_config')
          },
          // {
          //   name: 'hl_fish_robot_config',
          //   text: '捕鱼-机器人控制',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/happyFishing_child/fishControl')), 'hl_fish_robot_config')
          // },
          {
            name: 'hl_fish_fire_config',
            text: '炮台配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/happyFishing_child/batteryConfig')), 'hl_fish_fire_config')
          },
        ]
      },
      {
        name:'br_nn',
        text:'百人牛牛',
        vue: null,
        children: [
          {
            name: 'three_room_config',
            text: '三倍场房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/trineRoomCofig')), 'three_room_config')
          },
          {
            name: 'ten_room_config',
            text: '十倍场房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/decupleRoomCofig')), 'ten_room_config')
          },
          // {
          //   name: 'three_robot_config',
          //   text: '三倍场机器人控制',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/trineRobotControl')), 'three_robot_config')
          // },
          // {
          //   name: 'ten_robot_config',
          //   text: '十倍场机器人控制',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/decupleRobotControl')), 'ten_robot_config')
          // },
          {
            name: 'three_szrobot_config',
            text: '三倍场上庄机器人控制 ',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/trineBankerControl')), 'three_szrobot_config')
          },
          {
            name: 'ten_szrobot_config',
            text: '十倍场上庄机器人控制',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/hundredNiuNiu/decupleBankerControl')), 'ten_szrobot_config')
          },
        ]
      },
      {
        name:'qz_nn',
        text:'抢庄牛牛',
        vue: null,
        children: [
          {
            name: 'qz_room_config',
            text: '抢庄牛-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/RobNiuNiu/RoomCofig')), 'qz_room_config')
          },
          // {
          //   name: 'qz_robot_config',
          //   text: '抢庄牛-机器人控制',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/RobNiuNiu/RobotControl')), 'qz_robot_config')
          // },
        ]
      },
      {
        name:'zjh',
        text:'炸金花',
        vue: null,
        children: [
          {
            name: 'zjh_room_config',
            text: '金花-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/GoldenFlower/F_RoomCofig')), 'zjh_room_config')
          },
          // {
          //   name: 'zjh_robot_config',
          //   text: '金花-机器人控制',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/GoldenFlower/F_RobotControl')), 'zjh_robot_config')
          // },
          {
            name: 'F_ProbConfig',
            text: '金花-牌型概率配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/GoldenFlower/F_ProbConfig')), 'F_ProbConfig')
          },
        ]
      },
      {
        name:'ddz',
        text:'斗地主',
        vue: null,
        children: [
          {
            name: 'ddz_room_config',
            text: '斗地主-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/Landlords/L_RoomCofig')), 'ddz_room_config')
          },
          // {
          //   name: 'ddz_robot_config',
          //   text: '斗地主-机器人控制',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/Landlords/L_RobotControl')), 'ddz_robot_config')
          // },
          {
            name: 'L_PreventConfig',
            text: '斗地主-防刷配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/Landlords/L_PreventConfig')), 'L_PreventConfig')
          },
        ]
      },
      {
        name:'sgj',
        text:'水果机',
        vue: null,
        children: [
          {
            name: 'sgj_room_config',
            text: '水果机-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/FruitMachine/S_RoomCofig')), 'sgj_room_config')
          },
          // {
          //   name: 'sgj_base_config',
          //   text: '水果机-基础配置',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/FruitMachine/S_BasicDeploy')), 'sgj_base_config')
          // },
        ]
      },
      {
        name:'hhdz',
        text:'红黑大战',
        vue: null,
        children: [
          {
            name: 'hhdz_room_config',
            text: '红黑-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/RedBlackWar/W_RoomCofig')), 'hhdz_room_config')
          },
          // {
          //   name: 'hhdz_robot_config',
          //   text: '红黑-机器人控制',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/RedBlackWar/W_RobotControl')), 'hhdz_robot_config')
          // },
        ]
      },
      {
        name:'lhd',
        text:'龙虎斗',
        vue: null,
        children: [
          {
            name: 'lhd_room_config',
            text: '龙虎-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/ChineseBoxer/C_RoomCofig')), 'lhd_room_config')
          },
          // {
          //   name: 'lhd_robot_config',
          //   text: '龙虎-机器人控制',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/ChineseBoxer/C_RobotControl')), 'lhd_robot_config')
          // },
        ]
      },
      {
        name:'bmbc',
        text:'奔驰宝马',
        vue: null,
        children: [
          {
            name: 'bcbm_room_config',
            text: '奔驰-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/BMW/B_RoomCofig')), 'bcbm_room_config')
          },
          // {
          //   name: 'bcbm_robot_config',
          //   text: '奔驰-机器人控制',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/BMW/B_RobotControl')), 'bcbm_robot_config')
          // },
        ]
      },
      {
        name:'bjl',
        text:'百家乐',
        vue: null,
        children: [
          {
            name: 'bjl_room_config',
            text: '百家乐-房间配置',
            vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/FamiliesHappy/H_RoomCofig')), 'bjl_room_config')
          },
          // {
          //   name: 'bjl_robot_config',
          //   text: '百家乐-机器人控制',
          //   vue: r => require.ensure([], () => r(require('../../pages/SubGameConfig/FamiliesHappy/H_RobotControl')), 'bjl_robot_config')
          // },
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
        name:'exchange_config',
        text:'支付配置',
        // vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/PayConfig')), 'payConfig'),
        children: [
          {
            name: 'vip_deposit_config',
            text: 'VIP充值配置',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/PayConfig_child/VIPpayConfig')), 'vip_deposit_config')
          },
          {
            name: 'pay_list',
            text: '支付列表',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/PayConfig_child/payList')), 'pay_list')
          },
          {
            name: 'inform_config',
            text: '举报方式配置',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/PayConfig_child/reportWayConfig')), 'inform_config')
          },
        ]
      },
      {
        name: 'activity_announcement',
        text: '活动和公告',
        // vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/Announcements')), 'Announcements '),
        children: [
          {
            name: 'game_notice',
            text: '游戏公告',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/Announcements_child/gameAnnouncement')), 'game_notice')
          },
          {
            name: 'sys_broadcast',
            text: '系统广播',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/Announcements_child/systemBroadcast')), 'sys_broadcast')
          },
          // {
          //   name: 'activityList',
          //   text: '活动列表',
          //   vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/Announcements_child/activityList')), 'activityList')
          // },
          {
            name: 'stop_notice',
            text: '停服公告',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/Announcements_child/stopNotice')), 'stop_notice')
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
        name:'vip_system',
        text:'vip系统',
        vue: null,
        children: [
          {
            name:'vip_rank_config',
            text:'VIP等级配置',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/vip_child/VipClassConf')), 'vip_rank_config')
          },
          {
            name:'vip_robot_config',
            text:'VIP机器人配置',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/vip_child/VipRobotConf')), 'vip_robot_config')
          },
        ]
      },
      {
        name:'game_list',
        text:'游戏列表',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/GameList')), 'game_list')
      },
      {
        name:'game_sort_config',
        text:'游戏排序配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/GameSortConf')), 'game_sort_config')
      },
      {
        name:'broadcast_config',
        text:'对局广播配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/BroadcastConf')), 'broadcast_config')
      },
      {
        name:'withdraw_config',
        text:'兑换配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/ExchangeConf')), 'withdraw_config')
      },
      {
        name:'lobby_flyer_config',
        text:'大厅宣传页配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/HallAdvertiseConf')), 'lobby_flyer_config')
      },
      {
        name:'button_menu_config',
        text:'底部菜单',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/BottomMenu')), 'button_menu_config')
      },
      {
        name:'function_sort_config',
        text:'功能排序配置',
        vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/FunSortConf')), 'function_sort_config')
      },
      {
        name:'mail_system',
        text:'邮件管理',
        // vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/EmailSystem')), 'EmailSystem'),
        children: [
          {
            name:'platform_mail_system',
            text:'平台邮件',
            vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/EmailSystem_child/platformEmail')), 'platform_mail_system')
          },
          // {
          //   name:'allServersEmail',
          //   text:'全服邮件',
          //   vue: r => require.ensure([], () => r(require('../../pages/HallFunConfig/EmailSystem_child/allServersEmail')), 'allServersEmail')
          // },
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
        name:'version_manage',
        text:'版本管理(整包)',
        vue: r => require.ensure([], () => r(require('../../pages/SystemConfig/VersionMan')), 'version_manage')
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
  data_analysis:{
    name:'data_analysis',
    vue: null,
    text:'数据分析',
    children:[
      {
        name:'daily_channel_report',
        text:'渠道报表(日)',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/ChannelsReport')), 'daily_channel_report')
      },
      {
        name:'channel_report',
        text:'渠道报表',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/Channels')), 'channel_report')
      },
      {
        name:'LTV_report',
        text:'LTV报表',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/LTVReport')), 'LTV_report')
      },
      {
        name:'retained_analysis',
        text:'留存分析',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/lastAnalysis')), 'retained_analysis')
      },
      {
        name:'pay_switch',
        text:'新玩家付费转换',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/NewPlayerChange')), 'pay_switch')
      },
      {
        name:'fee_statistical',
        text:'台费统计',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/Statistics')), 'fee_statistical')
      },
      {
        name:'match_overview',
        text:'牌局总览',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/CardpPandect')), 'match_overview')
      },
      {
        name:'new_users',
        text:'新增用户',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/AddUser')), 'new_users')
      },
      {
        name:'loss_regression',
        text:'流失与回归',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/FlyBack')), 'loss_regression')
      },
      {
        name:'nventory_statistics',
        text:'库存统计',
        vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/Nventory')), 'nventory_statistics')
      },
      // {
      //   name:'loss_analyze',
      //   text:'流失分析',
      //   vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/LossAnalyze')), 'loss_analyze')
      // },
      // {
      //   name:'login_log',
      //   text:'登陆日志',
      //   vue: r => require.ensure([], () => r(require('../../pages/DataAnalysis/loginLog')), 'login_log')
      // },
    ]
  },
  activity:{
    name:'activity',
    vue: null,
    text:'活动运营',
    children:[
      {
        name:'fresher_deposit',
        text:'新人首充',
        vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/FirstConfig')), 'fresher_deposit')
      },
      {
        name:'daily_sign',
        text:'每日签到',
        vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/SignUp')), 'daily_sign')
      },
      {
        name:'daily_rescue',
        text:'每日救赎金',
        vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/SaveMoney')), 'daily_rescue')
      },
      {
        name:'daily_storm',
        text:'每日暴风雨',
        vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/Rainstorm')), 'daily_storm')
      },
      {
        name:'rainmaker',
        text:'摇钱树活动',
        vue: null,
        children:[
          {
            name:'rainmaker_config',
            text:'摇钱树配置',
            vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/MoneyTree/MT_Config')), 'rainmaker_config'),
          },
          {
            name:'rainmaker_job_config',
            text:'摇钱树任务配置',
            vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/MoneyTree/MT_TaskConfig')), 'rainmaker_job_config'),
          },
          {
            name:'rainmaker_other_config',
            text:'其他配置',
            vue: r => require.ensure([], () => r(require('../../pages/ActivityOperations/MoneyTree/MT_OtherConfig')), 'rainmaker_other_config'),
          },
        ]
      },
    ]
  },
};

export default models;

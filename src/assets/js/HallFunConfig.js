import axios from 'axios'
import Qs from 'qs'

//----大厅功能配置---子游戏配置----活动运营-------------------

// [ 支付配置 ]---------------------------------------------------
//1.支付配置-VIP充值配置
//公共接口

//2.支付配置-支付列表
let GetPaylist = (params) => {
  return axios.get('v1/backend/lobby/pay_list', {
    params
  })
}
let PostPaylist = (params) => {
  return axios.post('v1/backend/lobby/pay_list', params)
}
let PutPaylist = (params) => {
  return axios.put('v1/backend/lobby/pay_list', params)
}
let DeletePaylist = (params) => {
  return axios.delete('v1/backend/lobby/pay_list', { params })
}

//3.支付配置-举报方式配置
//公共接口



// [ 活动和公告 ]---------------------------------------------------
//1.活动和公告-游戏公告
let GetGameNotice = (params) => { //get / search
  return axios.get('v1/backend/lobby/game_notice', {
    params
  })
}
let PostGameNotice = (params) => {
  console.log("post");
  return axios.post('v1/backend/lobby/game_notice', params)
}
let PutGameNotice = (params) => {
  console.log("put");
  return axios.put('v1/backend/lobby/game_notice', params)
}
let DeleteGameNotice = (params) => {
  console.log("delete");
  return axios.delete('v1/backend/lobby/game_notice', { params })
}

//2.活动和公告-系统广播
let GetSysBroadcast = (params) => { //get / search
  return axios.get('v1/backend/lobby/sys_broadcast', {
    params
  })
}
let PostSysBroadcast = (params) => {
  console.log("post");
  return axios.post('v1/backend/lobby/sys_broadcast', params)
}
let PutSysBroadcast = (params) => {
  console.log("put");
  return axios.put('v1/backend/lobby/sys_broadcast', params)
}
let DeleteSysBroadcast = (params) => { //get / search
  return axios.delete('v1/backend/lobby/sys_broadcast', {
    params
  })
}

//3.活动和公告-活动列表
let GetActivityList = (params) => { //get / search
  return axios.get('v1/backend/lobby/activity_list', {
    params
  })
}
let PostActivityList = (params) => {
  console.log("put");
  return axios.post('v1/backend/lobby/activity_list', params)
}
let PutActivityList = (params) => {
  console.log("put");
  return axios.put('v1/backend/lobby/activity_list', params)
}
let DeleteActivityList = (params) => { //get / search
  return axios.delete('v1/backend/lobby/activity_list', {
    params
  })
}

//4.活动和公告-停服公告
let GetStopNotice = (params) => { //get / search
  return axios.get('v1/backend/lobby/stop_notice', {
    params
  })
}
let PostStopNotice = (params) => {
  console.log("put");
  return axios.post('v1/backend/lobby/stop_notice', params)
}
let PutStopNotice = (params) => {
  console.log("put");
  return axios.put('v1/backend/lobby/stop_notice', params)
}
let DeleteStopNotice = (params) => { //get / search
  return axios.delete('v1/backend/lobby/stop_notice', {
    params
  })
}


// [ 邮件管理 ]---------------------------------------------------
//1.邮件管理-平台邮件 ->mail_type = 2
//2.邮件管理-全服邮件 ->mail_type = 1
let GetEmail = (params) => { //get / search
  return axios.get('v1/backend/lobby/mail', {
    params
  })
}
let PostEmail = (params) => {
  console.log("post");
  return axios.post('v1/backend/lobby/mail', params)
}
let PutEmail = (params) => {
  console.log("put");
  return axios.put('v1/backend/lobby/mail', params)
}
let patchEmail = (params) => { //get / search
  return axios.patch('v1/backend/lobby/mail', params)
}



// [ 排行榜管理 ]---------------------------------------------------
//1.排行榜管理-排行榜配置
//公共接口


//2.排行榜管理-排行榜历史数据
let GetManageHistory = (params) => { //get / search
  return axios.get('v1/backend/lobby/ranking_history', {
    params
  })
}

//通用接口
let GetServerConfig = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config', {
    params
  })
}
let PutServerConfig = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config', params)
}
let PostServerConfig = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config', params)
}

//获取游戏类型
let GetAllGameList = (params) => {
  return axios.get('v1/backend/lobby/all_game_list', {
    params
  })
}

//获取get获取类型id对应的name
let GetNameLiat = (params) => {
  return axios.get('v1/backend/lobby/name_type', {
    params
  })
}

//将表格数据提交到服务器
let GetTableConfig = (params) => { //仅限于查看type_id
  return axios.get('v1/backend/lobby/server_config_two')
}

let PostTableConfig = (params) => {
  return axios.post('v1/backend/lobby/server_config_two', params)
}



//活动运营 ->首冲配置------------------------------------------
let GetActivityNew1 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/activity_new1', {
    params
  })
}

let PutActivityNew1 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/activity_new1', params)
}
let PostActivityNew1 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/activity_new1', params)
}

//活动运营 ->每日救援金------------------------------------------
let GetActivityNew2 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/activity_new2', {
    params
  })
}

let PutActivityNew2 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/activity_new2', params)
}
let PostActivityNew2 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/activity_new2', params)
}

//活动运营 ->摇钱树---其他配置--------------------------------------
let GetActivityNew31 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/activity_new31', {
    params
  })
}

let PutActivityNew31 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/activity_new31', params)
}
let PostActivityNew31 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/activity_new31', params)
}
//活动运营 ->摇钱树---摇钱树任务配置--------------------------------------
let GetActivityNew32 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/activity_new32', {
    params
  })
}

let PutActivityNew32 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/activity_new32', params)
}
let PostActivityNew32 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/activity_new32', params)
}
//活动运营 ->摇钱树---摇钱树配置--------------------------------------
let GetActivityNew33 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/activity_new33', {
    params
  })
}

let PutActivityNew33 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/activity_new33', params)
}
let PostActivityNew33 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/activity_new33', params)
}

//活动运营 ->每日暴风雨------------------------------------------
let GetActivityNew4 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/activity_new4', {
    params
  })
}

let PutActivityNew4 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/activity_new4', params)
}
let PostActivityNew4 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/activity_new4', params)
}


//活动运营 ->每日签到------------------------------------------
let GetActivityNew5 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/activity_new5', {
    params
  })
}

let PostActivityNew5 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/activity_new5', params)
}
let PutActivityNew5 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/activity_new5', params)
}


//大厅功能配置 ->充值配置--vip充值配置----------------------------------------
let GetRechargeConfig = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/recharge_config', {
    params
  })
}

let PutRechargeConfig = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/recharge_config', params)
}

// 大厅功能配置 ->充值配置--举报方式------------------------------------------
let GetComplaintConfig = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/complaint_config', {
    params
  })
}

let PutComplaintConfig = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/complaint_config', params)
}

// 大厅功能配置 ->排行榜管理---排行榜配置------------------------------------------
let Getrank_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/rank_control', {
    params
  })
}

let Putrank_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/rank_control', params)
}
let Postrank_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/rank_control', params)
}


// 子游戏 ->欢乐捕鱼---房间配置------------------------------------------
let Getroomdata6 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata6', {
    params
  })
}

let Putroomdata6 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata6', params)
}
let Postroomdata6 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata6', params)
}

// 子游戏 ->欢乐捕鱼---机器人配置------------------------------------------
let Getfishing_robot = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/fishing_robot', {
    params
  })
}

let Putfishing_robot = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/fishing_robot', params)
}
let Postfishing_robot = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/fishing_robot', params)
}

// 子游戏 ->欢乐捕鱼---炮台配置------------------------------------------
let Getfishing_guns = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/fishing_guns', {
    params
  })
}

let Putfishing_guns = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/fishing_guns', params)
}
let Postfishing_guns = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/fishing_guns', params)
}

// 子游戏 ->百人牛牛---三倍房间配置------------------------------------------
let Getroomdata2001 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata2001', {
    params
  })
}

let Putroomdata2001 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata2001', params)
}
let Postroomdata2001 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata2001', params)
}
// 子游戏 ->百人牛牛---十倍房间配置------------------------------------------
let Getroomdata2002 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata2002', {
    params
  })
}

let Putroomdata2002 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata2002', params)
}
let Postroomdata2002 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata2002', params)
}
// 子游戏 ->百人牛牛---三倍机器人配置------------------------------------------
let Getbrnn_robot_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/brnn_robot_control', {
    params
  })
}

let Putbrnn_robot_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/brnn_robot_control', params)
}
let Postbrnn_robot_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/brnn_robot_control', params)
}
// 子游戏 ->百人牛牛---十倍机器人配置------------------------------------------
let Getbrnn_ten_robot_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/brnn_ten_robot_control', {
    params
  })
}

let Putbrnn_ten_robot_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/brnn_ten_robot_control', params)
}
let Postbrnn_ten_robot_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/brnn_ten_robot_control', params)
}
// 子游戏 ->百人牛牛---三倍上庄机器人------------------------------------------
let Getrobot_banker_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/robot_banker_control', {
    params
  })
}

let Putrobot_banker_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/robot_banker_control', params)
}
let Postrobot_banker_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/robot_banker_control', params)
}

// 子游戏 ->百人牛牛---十倍上庄机器人------------------------------------------
let Getrobot_ten_banker_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/robot_ten_banker_control', {
    params
  })
}

let Putrobot_ten_banker_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/robot_ten_banker_control', params)
}
let Postrobot_ten_banker_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/robot_ten_banker_control', params)
}

// 子游戏 ->抢庄牛牛---房间配置------------------------------------------
let Getroomdata2 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata2', {
    params
  })
}

let Putroomdata2 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata2', params)
}
let Postroomdata2 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata2', params)
}

// 子游戏 ->抢庄牛牛---机器人控制------------------------------------------
let Getqznn_robot_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/qznn_robot_control', {
    params
  })
}

let Putqznn_robot_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/qznn_robot_control', params)
}
let Postqznn_robot_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/qznn_robot_control', params)
}

// 子游戏 ->炸金花---房间配置------------------------------------------
let Getroomdata1 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata1', {
    params
  })
}

let Putroomdata1 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata1', params)
}
let Postroomdata1 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata1', params)
}
// 子游戏 ->炸金花---机器人控制------------------------------------------
let Getzjh_robot_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/zjh_robot_control', {
    params
  })
}

let Putzjh_robot_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/zjh_robot_control', params)
}
let Postzjh_robot_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/zjh_robot_control', params)
}
// 子游戏 ->炸金花---牌型控制------------------------------------------
let Getcard_type_general = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/card_type_general', {
    params
  })
}

let Putcard_type_general = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/card_type_general', params)
}
let Postcard_type_general = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/card_type_general', params)
}
// 子游戏 ->斗地主---房间配置------------------------------------------
let Getroomdata3 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata3', {
    params
  })
}

let Putroomdata3 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata3', params)
}
let Postroomdata3 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata3', params)
}
// 子游戏 ->斗地主---机器人控制------------------------------------------
let Getddz_robot_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/ddz_robot_control', {
    params
  })
}

let Putddz_robot_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/ddz_robot_control', params)
}
let Postddz_robot_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/ddz_robot_control', params)
}
// 子游戏 ->水果大战---房间配置------------------------------------------
let Getroomdata2004 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata2004', {
    params
  })
}

let Putroomdata2004 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata2004', params)
}
let Postroomdata2004 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata2004', params)
}
// 子游戏 ->水果大战---机器人控制------------------------------------------
let Gettiger_rate = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/tiger_rate', {
    params
  })
}

let Puttiger_rate = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/tiger_rate', params)
}
let Posttiger_rate = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/tiger_rate', params)
}
// 子游戏 ->红黑大战---房间配置------------------------------------------
let Getroomdata2000 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata2000', {
    params
  })
}

let Putroomdata2000 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata2000', params)
}
let Postroomdata2000 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata2000', params)
}
// 子游戏 ->红黑大战---机器人控制------------------------------------------
let Gethhdz_robot_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/hhdz_robot_control', {
    params
  })
}

let Puthhdz_robot_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/hhdz_robot_control', params)
}
let Posthhdz_robot_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/hhdz_robot_control', params)
}
// 子游戏 ->龙虎斗---房间配置------------------------------------------
let Getroomdata2003 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata2003', {
    params
  })
}

let Putroomdata2003 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata2003', params)
}
let Postroomdata2003 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata2003', params)
}
// 子游戏 ->龙虎斗---机器人控制------------------------------------------
let Getlfdj_robot_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/lfdj_robot_control', {
    params
  })
}

let Putlfdj_robot_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/lfdj_robot_control', params)
}
let Postlfdj_robot_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/lfdj_robot_control', params)
}
// 子游戏 ->奔驰宝马---房间配置------------------------------------------
let Getroomdata2005 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata2005', {
    params
  })
}

let Putroomdata2005 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata2005', params)
}
let Postroomdata2005 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata2005', params)
}
// 子游戏 ->奔驰宝马---机器人控制------------------------------------------
let Getbmbc_robot_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/bmbc_robot_control', {
    params
  })
}

let Putbmbc_robot_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/bmbc_robot_control', params)
}
let Postbmbc_robot_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/bmbc_robot_control', params)
}
// 子游戏 ->百家乐---房间配置------------------------------------------
let Getroomdata2006 = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/roomdata2006', {
    params
  })
}

let Putroomdata2006 = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/roomdata2006', params)
}
let Postroomdata2006 = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/roomdata2006', params)
}
// 子游戏 ->百家乐---机器人控制------------------------------------------
let Getbjl_robot_control = (params) => { //get / search
  return axios.get('v1/backend/lobby/server_config/bjl_robot_control', {
    params
  })
}

let Putbjl_robot_control = (params) => { //get / search
  return axios.put('v1/backend/lobby/server_config/bjl_robot_control', params)
}
let Postbjl_robot_control = (params) => { //get / search
  return axios.post('v1/backend/lobby/server_config/bjl_robot_control', params)
}





export default {
  //通用接口-----------------------
  GetServerConfig,
  PutServerConfig,
  PostServerConfig,
  GetNameLiat,
  GetTableConfig,
  PostTableConfig,
  GetAllGameList,
  //支付配置-------------------------
  GetPaylist,
  PostPaylist,
  PutPaylist,
  DeletePaylist,
  //活动和公告-----------------------
  GetGameNotice,
  PostGameNotice,
  PutGameNotice,
  DeleteGameNotice,
  GetSysBroadcast,
  PostSysBroadcast,
  PutSysBroadcast,
  DeleteSysBroadcast,
  GetActivityList,
  PostActivityList,
  PutActivityList,
  DeleteActivityList,
  GetStopNotice,
  PostStopNotice,
  PutStopNotice,
  DeleteStopNotice,
  //邮件管理-----------------------
  GetEmail,
  PostEmail,
  PutEmail,
  patchEmail,
  //排行榜历史-----------------------
  GetManageHistory,

  //活动运营===============================
  GetActivityNew1,
  PutActivityNew1,
  PostActivityNew1,
  GetActivityNew2,
  PutActivityNew2,
  PostActivityNew2,
  GetActivityNew31,
  PutActivityNew31,
  PostActivityNew31,
  GetActivityNew32,
  PutActivityNew32,
  PostActivityNew32,
  GetActivityNew33,
  PutActivityNew33,
  PostActivityNew33,
  GetActivityNew4,
  PutActivityNew4,
  PostActivityNew4,
  GetActivityNew5,
  PostActivityNew5,
  PutActivityNew5,
  //大厅功能配置-------------------
  GetRechargeConfig,
  PutRechargeConfig,
  GetComplaintConfig,
  PutComplaintConfig,
  Getrank_control,
  Putrank_control,
  Postrank_control,
  //子游戏 --------------------------
  Getroomdata6,
  Putroomdata6,
  Postroomdata6,
  Getfishing_robot,
  Putfishing_robot,
  Postfishing_robot,
  Getfishing_guns,
  Putfishing_guns,
  Postfishing_guns,
  Getroomdata2001,
  Putroomdata2001,
  Postroomdata2001,
  Getroomdata2002,
  Putroomdata2002,
  Postroomdata2002,
  Getbrnn_robot_control,
  Putbrnn_robot_control,
  Postbrnn_robot_control,
  Getbrnn_ten_robot_control,
  Putbrnn_ten_robot_control,
  Postbrnn_ten_robot_control,
  Getrobot_banker_control,
  Putrobot_banker_control,
  Postrobot_banker_control,
  Getrobot_ten_banker_control,
  Putrobot_ten_banker_control,
  Postrobot_ten_banker_control,
  Getroomdata2,
  Putroomdata2,
  Postroomdata2,
  Getqznn_robot_control,
  Putqznn_robot_control,
  Postqznn_robot_control,
  Getroomdata1,
  Putroomdata1,
  Postroomdata1,
  Getzjh_robot_control,
  Putzjh_robot_control,
  Postzjh_robot_control,
  Getcard_type_general,
  Putcard_type_general,
  Postcard_type_general,
  Getroomdata3,
  Putroomdata3,
  Postroomdata3,
  Getddz_robot_control,
  Putddz_robot_control,
  Postddz_robot_control,
  Getroomdata2004,
  Putroomdata2004,
  Postroomdata2004,
  Gettiger_rate,
  Puttiger_rate,
  Posttiger_rate,
  Getroomdata2000,
  Putroomdata2000,
  Postroomdata2000,
  Gethhdz_robot_control,
  Puthhdz_robot_control,
  Posthhdz_robot_control,
  Getroomdata2003,
  Putroomdata2003,
  Postroomdata2003,
  Getlfdj_robot_control,
  Putlfdj_robot_control,
  Postlfdj_robot_control,
  Getroomdata2005,
  Putroomdata2005,
  Postroomdata2005,
  Getbmbc_robot_control,
  Putbmbc_robot_control,
  Postbmbc_robot_control,
  Getroomdata2006,
  Putroomdata2006,
  Postroomdata2006,
  Getbjl_robot_control,
  Putbjl_robot_control,
  Postbjl_robot_control,

}
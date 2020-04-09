
import axios from 'axios'
import Qs from 'qs'

//--------------------------大厅功能配置--------------------------

// [ 支付配置 ]---------------------------------------------------
//1.支付配置-VIP充值配置
//公共接口

//2.支付配置-支付列表
let GetPaylist = (params) => {
  return axios.get('/lobby/pay_list', {
    params
  })
}
let PostPaylist = (params) => {
  return axios.post('/lobby/pay_list', params)
}
let PutPaylist = (params) => {
  return axios.put('/lobby/pay_list', params)
}
let DeletePaylist = (params) => {
  return axios.delete('/lobby/pay_list', { params })
}

//3.支付配置-举报方式配置
//公共接口



// [ 活动和公告 ]---------------------------------------------------
//1.活动和公告-游戏公告
let GetGameNotice = (params) => { //get / search
  return axios.get('/lobby/game_notice', {
    params
  })
}
let PostGameNotice = (params) => {
  console.log("post");
  return axios.post('/lobby/game_notice', params)
}
let PutGameNotice = (params) => {
  console.log("put");
  return axios.put('/lobby/game_notice', params)
}
let DeleteGameNotice = (params) => {
  console.log("delete");
  return axios.delete('/lobby/game_notice', { params })
}

//2.活动和公告-系统广播
let GetSysBroadcast = (params) => { //get / search
  return axios.get('/lobby/sys_broadcast', {
    params
  })
}
let PostSysBroadcast = (params) => {
  console.log("post");
  return axios.post('/lobby/sys_broadcast', params)
}
let PutSysBroadcast = (params) => {
  console.log("put");
  return axios.put('/lobby/sys_broadcast', params)
}
let DeleteSysBroadcast = (params) => { //get / search
  return axios.delete('/lobby/sys_broadcast', {
    params
  })
}

//3.活动和公告-活动列表
let GetActivityList = (params) => { //get / search
  return axios.get('/lobby/activity_list', {
    params
  })
}
let PostActivityList = (params) => {
  console.log("put");
  return axios.post('/lobby/activity_list', params)
}
let PutActivityList = (params) => {
  console.log("put");
  return axios.put('/lobby/activity_list', params)
}
let DeleteActivityList = (params) => { //get / search
  return axios.delete('/lobby/activity_list', {
    params
  })
}

//4.活动和公告-停服公告
let GetStopNotice = (params) => { //get / search
  return axios.get('/lobby/stop_notice', {
    params
  })
}
let PostStopNotice = (params) => {
  console.log("put");
  return axios.post('/lobby/stop_notice', params)
}
let PutStopNotice = (params) => {
  console.log("put");
  return axios.put('/lobby/stop_notice', params)
}
let DeleteStopNotice = (params) => { //get / search
  return axios.delete('/lobby/stop_notice', {
    params
  })
}


// [ 邮件管理 ]---------------------------------------------------
//1.邮件管理-平台邮件 ->mail_type = 2
//2.邮件管理-全服邮件 ->mail_type = 1
let GetEmail = (params) => { //get / search
  return axios.get('/lobby/mail', {
    params
  })
}
let PostEmail = (params) => {
  console.log("post");
  return axios.post('/lobby/mail', params)
}
let PutEmail = (params) => {
  console.log("put");
  return axios.put('/lobby/mail', params)
}
let patchEmail = (params) => { //get / search
  return axios.patch('/lobby/mail', params)
}



// [ 排行榜管理 ]---------------------------------------------------
//1.排行榜管理-排行榜配置
//公共接口


//2.排行榜管理-排行榜历史数据
let GetManageHistory = (params) => { //get / search
  return axios.get('/lobby/ranking_history', {
    params
  })
}

//通用接口
let GetServerConfig = (params) => { //get / search
  return axios.get('/lobby/server_config', {
    params
  })
}
let PutServerConfig = (params) => { //get / search
  return axios.put('/lobby/server_config', params)
}
let PostServerConfig = (params) => { //get / search
  return axios.post('/lobby/server_config', params)
}

export default {
  //通用接口-----------------------
  GetServerConfig,
  PutServerConfig,
  PostServerConfig,
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
}
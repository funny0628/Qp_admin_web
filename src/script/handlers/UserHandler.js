import BaseHandler from "./BaseHandler";

class UserHandler extends BaseHandler {
  //查询用户列表
  list(data,user_id) {
    return this.get_v1(`/list/${user_id}` , data);
  }

  //查询用户银行
  bank_info(data, user_id) {
    return this.get_v1('/bank_info/' + user_id, data)
  }

  //修改会员银行卡
  bank_set(data,user_id) {
    return this.set_v1(`/bank_set/`+user_id, data)
  }

  //添加会员
  add(data,id) {
    return this.set_v1(`/add/${id}`, data);
  }

  //修改会员信息、用户信息
  info_set(data, user_id) {
    return this.set_v1('/info_set/' + user_id, data)
  }

  //修改会员登录、资金密码
  password_set(data, user_id) {
    return this.set_v1(`/password_set/${user_id}`, data)
  }

  //修改会员信息-返点设置
  rebate_set(data, user_id) {
    return this.set_v1('/rebate_set/' + user_id, data)
  }
  /** 返点设置，原始数据获取**/
  rebate_info(data,user_id){
    return this.get_v1(`/rebate_info/${user_id}`,data)
  }
  //银行卡列表
  bank_list(data,id) {
    return this.get_v1(`/bank_list/${id}`, data)
  }

  //删除会员银行卡
  bank_delete(data,user_id) {
    return this.set_v1(`/bank_delete/${user_id}`, data)
  }

  //代理链接管理
  spread_list(data,user_id) {
    return this.get_v1(`/spread_list/${user_id}`, data)
  }

  //用户分层
  vip_list(data) {
    return this.get_v1('/vip_list', data)
  }

  //添加用户分层
  vip_add(data) {
    return this.set_v1('/vip_add', data)
  }

  //修改用户分层
  vip_set(data) {
    return this.set_v1('/vip_set', data)
  }
  //排行榜
  rank_list(data,user_id){
    return this.get_v1(`/rank_list/${user_id}`,data)
  }
  //排行榜配置
  rank_set(data){
    return this.set_v1('/rank_set',data)
  }

  //平台筛选框数据 (如果是root登录，则传公司id,其他用户则传platform_id)
  platform_menu(data,id){
    return this.get_v1(`/platform_menu/${id}`,data)
  }

  //__编辑用户信息（玩家信息）前获取用户信息
  user_info(data,user_id){
    return this.get_v1(`/user_info/${user_id}`,data)
  }

}

export default new UserHandler('/user');

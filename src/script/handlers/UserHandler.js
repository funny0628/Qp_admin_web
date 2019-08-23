import BaseHandler from "./BaseHandler";

class UserHandler extends BaseHandler {
  //查询用户列表
  list(data) {
    return this.get_v1('/list', data);
  }
  //查询用户银行
  bank_info(data, user_id) {
    return this.get_v1('/bank_info/'+ user_id , data)
  }
  //添加会员
  add(data) {
    return this.set_v1('/add', data);
  }
  //修改会员信息、用户信息
  info_set(data, user_id) {
    return this.set_v1('/info_set' + user_id, data)
  }
  //修改会员登录、资金密码
  password_set(data, user_id) {
    return this.set_v1('/password_set' + user_id, data)
  }
  //修改会员信息-返点设置
  rebate_set(data, user_id) {
    return this.set_v1('/rebate_set' + user_id, data)
  }
  //银行卡列表
  bank_list(data){
    return this.get_v1('/bank_list',data)
  }
  //修改会员银行卡
  bank_set(user_id,data){
    return this.set_v1('/bank_set/'+user_id,data)
  }
  //删除会员银行卡
  bank_delete(user_id,data){
    return this.set_v1('/bank_delete/'+user_id,data)
  }
  //代理链接管理
  spread_list(){
    return this.get_v1('/spread_list',data)
  }
  //用户分层
  vip_list(data){
    return this.get_v1('/vip_list',data)
  }
  //添加用户分层
  vip_add(data){
    return this.get_v1('/vip_add',data)
  }
  //修改用户分层
  vip_set(data){
    return this.get_v1('/vip_set',data)
  }
}

export default new UserHandler('/user');

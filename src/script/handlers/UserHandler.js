import BaseHandler from "./BaseHandler";

class UserHandler extends BaseHandler {
  list(data) {
    return this.get_v1('/list', data);
  }

  bank_info(data, user_id) {
    return this.get_v1('/bank_info/'+ user_id , data)
  }

  add(data) {
    return this.set_v1('/add', data);
  }

  info_set(data, user_id) {
    return this.set_v1('/info_set' + user_id, data)
  }

  password_set(data, user_id) {
    return this.set_v1('/password_set' + user_id, data)
  }

  rebate_set(data, user_id) {
    return this.set_v1('/rebate_set' + user_id, data)
  }
  //银行卡列表
  bank_list(data){
    return this.get_v1('/bank_list',data)
  }
}

export default new UserHandler('/user');

import BaseHandler from "./BaseHandler";
// 大厅配置
class HallHandler extends BaseHandler {
  //滚动公告
  notice_list(data, user_id) {
    return this.get_v1("/notice_list/" + user_id, data);
  }

  //修改滚动公告
  notice_set(data, user_id) {
    return this.set_v1("/notice_set/" + user_id, data);
  }

  //删除滚动公告
  notice_delete(data, user_id) {
    return this.set_v1("/notice_delete/" + user_id, data);
  }

  //增加公告
  notice_add(data, user_id) {
    return this.set_v1("/notice_add/" + user_id, data);
  }

  notice_status(data, user_id) {
    return this.set_v1(`/notice_status/${user_id}`, data)
  }

  //内部邮件
  email_list(data, user_id) {
    return this.get_v1("/email_list/" + user_id, data);
  }

  //增加内部邮件
  email_add(data, user_id) {
    return this.set_v1("/email_add/" + user_id, data);
  }

  //删除内部邮件
  email_delete(data) {
    return this.set_v1("/email_delete", data);
  }

  //大厅海报
  poster_list(data,user_id) {
    return this.get_v1("/poster_list/" + user_id, data);
  }

  //修改大厅海报
  poster_set(data) {
    return this.set_v1("/poster_set", data);
  }

  //删除大厅海报
  poster_delete(data) {
    return this.set_v1("/poster_delete", data);
  }

  //增加大厅海报
  poster_add(data) {
    return this.set_v1("/poster_add", data);
  }
  //大厅海报类型查询列表
  poster_type_list(data) {
    return this.get_v1("/poster_type_list", data);
  }
  //大厅海报点击动作查询列表
  poster_act_list(data) {
    return this.get_v1("/poster_act_list", data);
  }
}

export default new HallHandler("/hall");

import BaseHandler from "./BaseHandler";

class HallHandler extends BaseHandler {
  //滚动公告
  roll_list(data) {
    return this.get_v1('/roll_list', data);
  }
  //修改滚动公告
  roll_set(data, notice_id) {
    return this.set_v1('/roll_set', data)
  }
  //删除滚动公告
  roll_delete(user_id, data) {
    return this.set_v1('/roll_delete/' + 'user_id', data)
  }
  //内部邮件
  email_list(data) {
    return this.get_v1('/email_list', data)
  }
  //增加内部邮件
  email_add(data) {
    return this.set_v1('/email_add', data)
  }
  //弹框公告
  popup_list(data) {
    return this.get_v1('/popup_list', data)
  }
  //修改弹窗公告
  popup_set(notice_id, data) {
    return this.set_v1('/popup_set/' + notice_id, data)
  }
  //删除弹窗公告
  popup_deleet(notice_id, data) {
    return this.set_v1('/popup_deleet/' + notice_id, data)
  }
  //增加弹窗公告
  popup_add(data) {
    return this.set_v1('/popup_add', data)
  }
  //大厅海报
  poster_list(data) {
    return this.get_v1('/poster_list', data)
  }
  //修改大厅海报
  poster_set(poster_id, data) {
    return this.set_v1('/poster_set/' + poster_id, data)
  }
  //删除大厅海报
  poster_delete(poster_id, data) {
    return this.set_v1('/poster_delete/' + poster_id, data)
  }
  //增加大厅海报
  poster_add(data) {
    return this.set_v1('/poster_add', data)
  }
}

export default new HallHandler('/hall');

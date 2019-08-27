import BaseHandler from "./BaseHandler";

class HallHandler extends BaseHandler {
  //滚动公告
  notice_list(data) {
    return this.get_v1('/notice_list', data);
  }
  //修改滚动公告
  notice_set(data) {
    return this.set_v1('/notice_set', data)
  }
  //删除滚动公告
  notice_delete( data) {
    return this.set_v1('/notice_delete' , data)
  }
  //增加公告
  notice_add(data){
    return this.set_v1('/notice_add',data)
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
  poster_list() {
    return this.get_v1('/poster_list')
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

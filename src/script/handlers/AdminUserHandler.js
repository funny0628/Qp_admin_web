import BaseHandler from "./BaseHandler";
class AdminUser extends BaseHandler {
// 权限管理管理员列表
limit_manager(data,user_id){
    return this.set_v1('/user_list/' + user_id, data)
  }
  
  // 权限管理管理员列表新增管理员
  new_manager(data,user_id){
    return this.set_v1('/create_user/' + user_id, data)
  }
  // 权限管理管理员列表编辑管理员取值
  edit_manager(data,user_id){
    return this.get_v1('/edit_user_init/' + user_id, data)
  }
  
  // 权限管理管理员列表编辑管理员点击确定
  edit_manager_sure(data,user_id){
    return this.set_v1('/edit_user/' + user_id, data)
  }
}
export default new AdminUser('/admin_user');
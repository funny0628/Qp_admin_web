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

  // 运营后台管理查看运营账号列表
  admin_list(data, user_id) {
    return this.set_v1('/admin_list/' + user_id, data)
  }

  // 运营后台管理公司管理查看公司列表
  company_list(data, user_id) {
    return this.get_v1('/company_list/' + user_id, data)
  }

  // 运营后台管理公司管理新增公司
  newaddcompany(data,user_id){
    return this.set_v1('/create_company/' + user_id, data)

  }
}
export default new AdminUser('/admin_user');
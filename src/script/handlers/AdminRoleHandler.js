import BaseHandler from "./BaseHandler";
class AdminRole extends BaseHandler {
// 管理员角色列表
managerList(data,user_id) {
    return this.set_v1('/role_list/'+user_id, data)
  }

    // 权限管理管理员角色删除角色
    del_manager(data,user_id) {
      return this.set_v1('/delete_role/'+user_id, data)
    }

  // 权限管理管理员列表删除管理员
  del_managerList(data,user_id) {
    return this.set_v1('/delete_admin/'+user_id, data)
  }

  // 权限管理管理员列表启用禁用管理员
runstop_manager(data,user_id){
  return this.set_v1('/status_admin/' + user_id, data)
}

  // 权限管理管理员列表新增编辑时获取角色列表
  getmanagerrole(data,user_id){
    return this.get_v1('/all_roles/' + user_id, data)
  }

    // 权限管理管理员角色启用禁用角色
runstop_role(data,user_id){
  return this.set_v1('/status_role/' + user_id, data)
}

    // 权限管理管理员角色新增角色
  newrole(data,user_id){
      return this.get_v1('/role_power_menu/' + user_id, data)
    }
  
    // 权限管理管理员角色新增角色确认提交
  create_role(data,user_id){
    return this.set_v1('/create_role/' + user_id, data)
  }

  // 管理员角色编辑权限
  edit_role(data,user_id){
    return this.get_v1('/role_info/' + user_id, data)
  }

   // 权限管理管理员角色编辑角色确认提交
     confirm_edit(data,user_id){
      return this.set_v1('/edit_role/' + user_id, data)
    }
}
export default new AdminRole('/admin_role');
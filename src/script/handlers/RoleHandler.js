import BaseHandler from "./BaseHandler";
class RoleHandler extends BaseHandler {
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
}
export default new RoleHandler('/role');
import BaseHandler from "./BaseHandler";
class RoleHandler extends BaseHandler {
// 管理员角色列表
managerList(data,user_id) {
    return this.set_v1('/role_list/'+user_id, data)
  }
}
export default new RoleHandler('/role');
import BaseHandler from "./BaseHandler";
class AdminUser extends BaseHandler {
  // 权限管理管理员列表
  limit_manager(data, user_id) {
    return this.set_v1('/user_list/' + user_id, data)
  }

  // 权限管理管理员列表新增管理员
  new_manager(data, user_id) {
    return this.set_v1('/create_user/' + user_id, data)
  }
  // 权限管理管理员列表编辑管理员取值
  edit_manager(data, user_id) {
    return this.get_v1('/edit_user_init/' + user_id, data)
  }

  // 权限管理管理员列表编辑管理员点击确定
  edit_manager_sure(data, user_id) {
    return this.set_v1('/edit_user/' + user_id, data)
  }

  // 运营后台管理查看运营账号列表
  admin_list(data, user_id) {
    return this.get_v1('/admin_list/' + user_id, data)
  }

  // 运营后台管理公司管理查看公司列表
  company_list(data, user_id) {
    return this.get_v1('/company_list/' + user_id, data)
  }

  // 运营后台管理公司管理新增公司
  newaddcompany(data, user_id) {
    return this.set_v1('/create_company/' + user_id, data)
  }

  // 运营后台管理公司管理编辑公司
  editcompany(data, user_id) {
    return this.get_v1('/company_info/' + user_id, data)
  }

  // 运营后台管理公司管理编辑公司确认提交
  sureeditcompany(data, user_id) {
    return this.set_v1('/create_superadmin/' + user_id, data)
  }

  // 运营后台管理账号列表获取所有公司列表
  getcompanylist(data, user_id) {
    return this.get_v1('/all_company/' + user_id, data)
  }

 // 运营后台管理公司管理获取游戏列表
 gamelist(data, user_id) {
  return this.get_v1('/company_games/' + user_id, data)
}
  
 // 运营后台管理公司管理确认选中游戏
 confirmgame(data, user_id) {
  return this.set_v1('/company_games_set/' + user_id, data)
}

 // 运营后台管理账号列表游戏管理
 platformgames(data, user_id) {
  return this.get_v1('/platform_games/' + user_id, data)
}

 // 运营后台管理账号列表确认选中游戏
 platform_games_set(data, user_id) {
  return this.set_v1('/platform_games_set/' + user_id, data)
}

 // 运营后台管理授权获取列表
 user_power_menu(data, user_id) {
  return this.get_v1('/user_power_menu/' + user_id, data)
}

 // 运营后台管理授权列表编辑后点击确认
 set_user_power(data, user_id) {
  return this.set_v1('/set_user_power/' + user_id, data)
}

}
export default new AdminUser('/admin_user');
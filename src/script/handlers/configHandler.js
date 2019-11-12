import BaseHandler from "./BaseHandler";
// 财务管理
class ConfigHandler extends BaseHandler {
  bank_list(data, id) {
    return this.get_v1(`/bank_list/${id}`, data);
  }
}

export default new ConfigHandler("/config");

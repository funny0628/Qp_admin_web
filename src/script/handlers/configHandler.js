import BaseHandler from "./BaseHandler";

class ConfigHandler extends BaseHandler {
  bank_list(data) {
    return this.get_v1('/bank_list', data);
  }

}

export default new ConfigHandler('/config');

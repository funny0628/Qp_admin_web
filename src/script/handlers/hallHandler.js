import BaseHandler from "./BaseHandler";

class UserHandler extends BaseHandler {
  roll_list(data) {
    return this.get_v1('/roll_list', data);
  }
}

export default new UserHandler('/hall');

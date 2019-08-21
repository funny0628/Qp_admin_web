import BaseHandler from "./BaseHandler";

class UserHandler extends BaseHandler {
  list(data) {
    return this.get_v1('/list', data);
  }
  add(data) {
    return this.set_v1('/add', data);
  }
  set(data){
    return this.set_v1('/set',data)
  }
}

export default new UserHandler('/tier');

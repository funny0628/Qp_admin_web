import BaseHandler from "./BaseHandler";
class LogHandler extends BaseHandler {
// 会员操作日志
member_operate(data,user_id) {
    return this.set_v1('/log_operate/'+user_id, data)
  }
}
export default new LogHandler('/log');
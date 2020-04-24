import moment from 'moment/moment'

export default {

  /** 获取当天 **/
  getToday(format="YYYY-MM-DD") {
    let today = new Date();
    return moment(today).format(format);
  },

  /** 获取本周第一天 **/
  getWeekFirstDay(format="YYYY-MM-DD") {
    return moment().weekday(1).format(format);
  },

  /** 获取本周最后一天 **/
  getWeekLastDay(format="YYYY-MM-DD") {
    return moment().weekday(7).format(format);
  },

  /** 获取本周时间段位 **/
  getCurentWeek(format="YYYY-MM-DD") {
    return [this.getWeekFirstDay(), this.getWeekLastDay()];
  },

  /** 获取本月第一天 **/
  getMonthFirstDay(format="YYYY-MM-DD") {
    return moment().startOf('month').format(format);
  },

  /** 获取本月最后一天 **/
  getMonthLastDay(format="YYYY-MM-DD") {
    return moment().endOf('month').format(format);
  },

  /** 获取本周时间段位 **/
  getCurentMonth(format="YYYY-MM-DD") {
    return [this.getMonthFirstDay(), this.getMonthLastDay()];
  },

  objectIsEmpty(obj) {
    return obj === null || obj === undefined || JSON.stringify(obj) === '{}';
  }
}

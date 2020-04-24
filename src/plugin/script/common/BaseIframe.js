import NProgress from 'nprogress' // Progress 进度条
import ActionType from './ActionType';
import {mapState} from "vuex";

const CacheKey = "PAGE_INFO";


let TimerOutList = [];
let TimerIntervalList = [];

/** 基础子页面处理 **/
const BaseIframe = {
  props: {},
  data() {
    return {
      ActionType: ActionType,
      UserInfo: {}
    }
  },
  computed: {
    ...mapState(['isPhone']),
  },
  methods: {
    init() {
    },
    _reset() {
      Object.assign(this.$data, this.$options.data());
    },
    /** 申请定时器 **/
    setTimeout(func, time) {
      TimerOutList[TimerOutList.length] = setTimeout(func, time);
      return TimerOutList[TimerOutList.length - 1];
    },
    setInterval(func, time) {
      TimerIntervalList[TimerIntervalList.length] = setInterval(func, time);
      return TimerIntervalList[TimerIntervalList.length - 1];
    },
    clearTimeout(timer) {
      let item = TimerOutList.filter(item => item === timer);
      item.length > 0 ? clearTimeout(item[0]) : clearTimeout(timer);
    },
    clearInterval(timer) {
      let item = TimerIntervalList.filter(item => item === timer);
      item.length > 0 ? clearInterval(item[0]) : clearInterval(timer);
    },
    /** 前往子页面 **/
    forward(name, param) {
      NProgress.start();
      this.$pageInfo.reset = true;
      this.$emit('forward', {name, param});
    },
    back() {
      this.$pageInfo.reset = false;
      this.$emit('back');
    },
    /**
     * 清楚数据
     */
    clear() {
      TimerOutList && TimerOutList.length > 0 && TimerOutList.map((item, index) => {
        clearTimeout(item);
      });
      TimerOutList = [];

      TimerIntervalList && TimerIntervalList.length > 0 && TimerIntervalList.map((item, index) => {
        clearTimeout(item);
      });
      TimerIntervalList = [];
    }
  },
  beforeCreate() {
  },
  created() {
    NProgress.done();
    let name = this.$options.name;
    this.$pageInfo.name = name;
    !this.$pageInfo[name] && (this.$pageInfo[name] = {});
    if (!this.$pageInfo[name].isFirstEnter) {
      this.$pageInfo[name].isFirstEnter = true;
    }
  },
  activated() {
    NProgress.done();
    let name = this.$pageInfo.name;
    if (this.$pageInfo[name].isFirstEnter) {
      this.$pageInfo[name].isFirstEnter = false;
      return;
    }

    if (this.$pageInfo.reset) {
      this._reset();

      if (Object.prototype.toString.call(this.$options.created).indexOf('Array') !== -1 && this.$options.created.length > 0) {
        this.$options.created[this.$options.created.length - 1].apply(this);
      }

      if (Object.prototype.toString.call(this.$options.mounted).indexOf('Array') !== -1 && this.$options.mounted.length > 0) {
        this.$nextTick(function () {
          this.$options.mounted[this.$options.mounted.length - 1].apply(this);
        });
      }

      /** 强制要求入口函数为init **/
      /** this.init(); **/
    }
  },
  mounted() {
    /** 处理权限问题 **/
    /*console.log(this.$children);
    console.log(this.$children.length);
    console.log(this.$children[0].$options.name);
    console.log(this.$children[0].$el);

    for (let i = 0; i < this.$children.length; i++) {
      let $component = this.$children[i];
      if ($component.$options.name === 'PermissionButton') {
        // TODO 用户权限
        console.log($component.action);
        if ($component.action === 'edit') {
          $component.$destroy();
          $component.$el.remove();
          // $component.$el.parent.removeChild($component.$el);
        }
      }
    }*/
  },
  beforeDestroy() {
    this.clear();
  }
};

export default BaseIframe;

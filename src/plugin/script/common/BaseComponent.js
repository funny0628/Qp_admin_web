import NProgress from 'nprogress' // Progress 进度条

let TimerOutList = [];
let TimerIntervalList = [];

const BaseComponent = {
    prop: {},
    data() {
    },
    methods: {
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
                // console.log($component.action);
                if ($component.action === 'edit') {
                  $component.$destroy();
                  $component.$el.remove();
                  // $component.$el.parent.removeChild($component.$el);
                }
            }
        }*/
    },
};

export default BaseComponent;



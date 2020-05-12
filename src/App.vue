<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import request from "./plugin/script/service/request";
export default {
  name: "App",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true //控制视图是否显示的变量
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(() => {
        this.isRouterAlive = true; //再打开
      });
    }
  }
};
</script>

<style>
.el-pagination .el-select .el-input .el-input__inner {
  height: 28px !important;
  line-height: 28px !important;
}
</style>

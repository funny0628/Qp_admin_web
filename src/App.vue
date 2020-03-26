<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import request from './plugin/script/service/request'
export default {
  name: 'App',
}
</script>

<style>
.el-pagination .el-select .el-input .el-input__inner {
  height: 28px !important;
  line-height: 28px !important;
}
</style>

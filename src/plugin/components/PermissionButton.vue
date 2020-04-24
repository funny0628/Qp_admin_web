<template>
  <!-- 权限按钮 -->
  <a class="permissionButton" v-if="power" @click="onClick">
    <slot></slot>
  </a>
</template>

<script>
  import BaseComponent from "../script/common/BaseComponent";

  export default {
    extends: BaseComponent,
    name: "PermissionButton",
    props: {
      /** 权限类型 **/
      action: {
        type: String,
        required: true,
        default() {
          return "";
        }
      }
    },
    data() {
      return {
        power: true
      }
    },
    methods: {
      onClick(event){
        // TODO 判断权限
        this.power && (this.$emit('click', event));
      }
    },
    beforeCreate() {
      this.power = false;
    },
    created() {
      console.log(this.action);
      console.log(this.$activePage);
      this.power = true;
    },
    mounted() {

    },
  }
</script>

<style scoped>

</style>

<template>
  <div class="input-area">
    <div class="input-area-box" :class="isHide && isPhone?'is-hide':''">
      <slot></slot>
    </div>
    <div class="hide-area" v-if="isPhone">
      <div class="btn-hide" @click="click()">{{$t('_admin_plugin.click') + (isHide? $t('_admin_plugin.show'): $t('_admin_plugin.hide')) + $t('_admin_plugin.search')}}</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import BaseComponent from "../script/common/BaseComponent";

  export default {
    name: "InputArea",
    extends: BaseComponent,
    data() {
      return {
        isHide: true,
        height: 'auto'
      }
    },
    methods: {
      init() {},
      click() {
        /** TODO 后期制作动画效果 **/
        if (this.height === 'auto' && !this.isHide ) {

        }
        this.isHide = !this.isHide;
      }
    },
    computed: {
      ...mapState([
        'isPhone'
      ]),
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>
  .input-area {}
  .input-area .input-area-box {height:auto;overflow: hidden;transition: height 1s;}
  .input-area .input-area-box.is-hide {height:0}
  .input-area .hide-area {display: flex;align-items: center;justify-content: center;height:40px}
  .input-area .btn-hide {display: inline-block;height: 32px;line-height: 32px;width: auto;color:#aaa;text-align: center}
</style>

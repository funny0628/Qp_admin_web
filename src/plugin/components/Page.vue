<template>
  <keep-alive>
    <component :is="vue" @forward="forward" @back="back" :page-name="pageName" class="admin-page"></component>
  </keep-alive>
</template>

<script>
  // import {pageList} from "../script/config/pages";

  export default {
    name: "Page",
    props: {
      firstView: {
        type: String,
        default() {
          return "";
        }
      },
    },
    computed: {
      vue() {
        return this.pageList[this.pageName].vue || null;
      }
    },
    data() {
      let $this = this;
      return {
        history: [],
        pageName: '',
        pageList: (()=>{
          return $this.$pageInfo.pageList;
        })()
      }
    },
    methods: {
      /**
       * @param data
       */
      forward(data) {
        let name = data['name'];
        let param = data['param'] || {};
        let item = this.pageList[name];
        this.$pageInfo.to = name;
        this.$pageInfo.from = this.$options.name;
        this.$pageInfo.param = param;
        /** 查找对应name的vue界面 **/

        /** 判断前往是否属于该界面的子界面 **/
        let fromName = this.history[this.history.length - 1];
        if (item.parent === fromName) {
          this.history.push(name);
          this.pageName = name;
        } else if (name === this.pageList[this.pageName].parent) {
          this.history.splice(this.history.length - 1, 1);
          this.pageName = this.history[this.history.length - 1];
        } else {
          this.$emit('forward', data);
        }
      },
      back(data) {
        if (this.history.length > 0) {
          this.history.splice(this.history.length - 1, 1);
          this.pageName = this.history[this.history.length - 1];
        } else {
          this.$emit('back');
        }
      }
    },
    created() {
      this.pageName = this.firstView;
      this.history.push(this.pageName);
    },
    mounted() {

    },
    beforeDestroy() {
      this.history = [];
    },
    destroyed() {

    }
  }
</script>

<style scoped>
  .admin-page {}
</style>

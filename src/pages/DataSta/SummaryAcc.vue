<template>
  <div id="SummaryAcc">
    <div class="input-area">
      <select-time :date="date" :select-time.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size='medium'>查询</el-button>
      </permission-button>
    </div>
  </div>
</template>

<script>
  import PermissionButton from "../../plugin/components/PermissionButton";
  import InfoTable from '../../plugin/components/InfoTable';
  import SelectTime from "../../plugin/components/SelectTime";
  import BaseIframe from '../../plugin/script/common/BaseIframe';

  export default {
    name: "SummaryAcc",
    extends: BaseIframe,
    components: {PermissionButton, InfoTable, SelectTime},
    data(){
      return {
        date:[],

      }
    },
    methods:{
      search(){}
    }
  }
</script>

<style scoped>

</style>
<!--出入账目汇总-->

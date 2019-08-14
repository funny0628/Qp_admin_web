<template>
  <div id="BankAccount-main">
    <div class="input-area">
      <el-input v-model="format.channel_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-input v-model="format.payee" placeholder="收款人" size="medium"></el-input>
      <permission-button :action="ActionType.READ" @click="handelReadClick()">
        <el-button type="primary" size='medium'>查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="handelAddClick()" style="float: right;">
        <el-button type="primary" size='medium'>新增</el-button>
      </permission-button>
    </div>
  </div>
</template>

<script>
  import PermissionButton from "../../../plugin/components/PermissionButton";
  import InfoTable from '../../../plugin/components/InfoTable';
  import BaseIframe from '../../../plugin/script/common/BaseIframe';
  import PageInfo from '../../../plugin/script/common/PageInfo';
  export default {
    name: "BankAccount",
    extends: BaseIframe,
    components: {PermissionButton, InfoTable},
    data(){
      return{
        format:{
          channel_id:'', //渠道id
          payee:'', //收款人
        }
      }
    },
    methods:{
      handelReadClick(){},
      handelAddClick(){},
    }
  }
</script>

<style scoped>

</style>

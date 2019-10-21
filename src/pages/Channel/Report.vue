<template>
  <div id="report">
    <input-area>
    <el-input v-model="channel_id" placeholder="请输入渠道ID" size="medium"></el-input>
      <select-time :date="date" :select-date.sync="date"></select-time>
     <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      ></info-table>
    </div>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import SelectTime from "../../plugin/components/SelectTime";
import InputArea from "../../plugin/components/InputArea";

export default {
  extends: BaseIframe,
  name:'Report',
  components: {InputArea, SelectTime, InfoTable, PermissionButton },
  data() {
    return {
      channel_id:'',
      date: [],
      tableStyle: [
        { label: "渠道ID", prop: "channelid", width: "" },
        { label: "入款金额/笔数", prop: "inmoney", width: "" },
        { label: "兑换金额/笔数", prop: "exchangemoney", width: "" },
        { label: "发放佣金", prop: "givemoney", width: "" },
        { label: "活动奖励", prop: "reward", width: "" },
      ],
      records: [],
      pageInfo: new PageInfo(0, [10, 15, 20], 0)
    };
  },
  methods: {
    search() {},
  }
};
</script>

<style scoped>
.bd{
  margin: 0 20px;
}
.select-time{
  margin-right: 20px !important;
}
#report .el-button.el-button--primary.el-button--medium{
margin-left: 0px!important;
  margin-right: 20px !important;
}
</style>

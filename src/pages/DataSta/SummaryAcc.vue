<!--出入账目汇总-->
<template>
  <div id="SummaryAcc">
    <input-area>
      <select-time :date="date" :select-time.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
    </input-area>
    <div class="content" style="padding: 15px 20px 0 20px">
      <el-table :data="tableData" border show-summary style="width: 100%">
        <el-table-column prop="income" label="收入" align="center" width="180"></el-table-column>
        <el-table-column prop="income_money" align="center" label="收入金额"></el-table-column>
        <el-table-column prop="spend" sortable align="center" label="支出"></el-table-column>
        <el-table-column prop="speed_money" sortable align="center" label="支出金额"></el-table-column>
        <el-table-column prop="deduct" sortable align="center" label="人工扣除"></el-table-column>
        <el-table-column prop="deduct_money" sortable align="center" label="扣除金额"></el-table-column>
        <el-table-column prop="reward" sortable align="center" label="活动奖励"></el-table-column>
        <el-table-column prop="reward_money" sortable align="center" label="奖励金额"></el-table-column>
        <el-table-column prop="other" sortable align="center" label="其他"></el-table-column>
        <el-table-column prop="money" sortable align="center" label="金额"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import SelectTime from "../../plugin/components/SelectTime";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "SummaryAcc",
  extends: BaseIframe,
  components: { InputArea, PermissionButton, InfoTable, SelectTime },
  data() {
    return {
      date: [],
      tableData: [
        {
          income: "银行收款金额／笔数",
          income_money: "980821",
          spend: "兑换金额／笔数",
          speed_money: "第四级代理",
          deduct: "异常扣除",
          deduct_money: "房间一",
          reward: "新人充值",
          reward_money: "10000.00",
          other: "当前账户总余额",
          money: "9327820.00"
        }
      ]
    };
  },
  methods: {
    search() {}
  }
};
</script>

<style scoped>
</style>

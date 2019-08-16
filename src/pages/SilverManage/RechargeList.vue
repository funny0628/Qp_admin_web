<template>
  <div id="rechargelist">
    <div class="input-area">
      <el-input v-model="user_id" placeholder="请输入用户id" style="width:159px;"></el-input>
      <el-input v-model="order_id" placeholder="订单编号" style="width:145px;"></el-input>
      <el-input v-model="order_status" placeholder="订单状态" style="width:145px;"></el-input>
      <el-input v-model="pay" placeholder="支付商户" style="width:145px;"></el-input>
      <el-input v-model="status" placeholder="状态" style="width:145px;"></el-input>
      <select-time :date="date" :select-date.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
    </div>
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

export default {
  extends: BaseIframe,
  components: { SelectTime, InfoTable, PermissionButton },
  data() {
    return {
      user_id: "",
      order_id:'',
      order_status:"",
      pay:'',
      status:'',
      level: "",
      quickDate: "",
      date: [],
      tableStyle: [
        { label: "订单编号", prop: "orderid", width: "" },
        { label: "用户ID", prop: "userid", width: "" },
        { label: "用户名", prop: "user", width: "" },
        { label: "支付商户", prop: "payer", width: "" },
        { label: "订单金额", prop: "ordermoney", width: "" },
        { label: "金额变动", prop: "moneyexchange", width: "" },
        { label: "订单状态", prop: "orderstatus", width: "" },
        { label: "提交时间/到账时间", prop: "submittime", width: "" },
        { label: "操作用户", prop: "operater", width: "" },
        { label: "订单备注", prop: "ordertip", width: "" },
        { label: "操作", prop: "operate", width: "" },
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
.el-input{
    margin-right: 10px;
}
</style>

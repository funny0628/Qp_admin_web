<template>
  <div id="rechargelist">
    <input-area>
      <el-input v-model="user_id" placeholder="请输入用户id" style="width:159px;"></el-input>
      <el-input v-model="order_id" placeholder="订单编号" style="width:145px;"></el-input>
      <el-input v-model="order_status" placeholder="订单状态" style="width:145px;"></el-input>
      <el-input v-model="pay" placeholder="支付商户" style="width:145px;"></el-input>
      <el-input v-model="status" placeholder="状态" style="width:145px;"></el-input>
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
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="['moneyexchange','submittime'].indexOf(scope.prop)>=0">
              <p v-for="(ite,ind) in scope.row[scope.prop]" :key="ind">{{ite}}</p>
            </template>
            <template v-if="scope.prop==='operate'">
              <el-button type="text">审核</el-button>
              <el-button type="text">驳回</el-button>
            </template>
            <template
              v-if="['moneyexchange','submittime','operate'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
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
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  extends: BaseIframe,
  name: "RechargeList",
  components: {
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton,
    InfoTableItem
  },
  data() {
    return {
      user_id: "",
      order_id: "",
      order_status: "",
      pay: "",
      status: "",
      level: "",
      quickDate: "",
      date: [],
      tableStyle: [
        { label: "订单编号", prop: "orderId", width: "" },
        { label: "用户ID", prop: "userId", width: "" },
        { label: "用户名", prop: "user", width: "" },
        { label: "支付商户", prop: "payer", width: "" },
        { label: "订单金额", prop: "orderMoney", width: "" },
        { label: "金额变动", prop: "moneyExchange", width: "" },
        { label: "订单状态", prop: "orderStatus", width: "" },
        { label: "提交时间/到账时间", prop: "submitTime", width: "" },
        { label: "操作用户", prop: "operation", width: "" },
        { label: "订单备注", prop: "orderTip", width: "" },
        { label: "操作", prop: "operate", width: "" }
      ],
      records: [
        {
          orderId: 1,
          userId: 2,
          user: "张三",
          payer: "李四",
          orderMoney: "10000",
          moneyExchange: ["充值前：10000", "充值后：2000"],
          orderStatus: "充值成功",
          submitTime: ["2018-09-01 12:00:00", "2019-08-01 12:00:00"],
          operation: "admin",
          orderTip: ""
        }
      ],
      pageInfo: new PageInfo(0, [10, 15, 20], 0)
    };
  },
  methods: {
    search() {}
  }
};
</script>

<style scoped>
.bd {
  margin: 0 20px;
}
.el-input {
  margin-right: 10px;
}
#rechargelist .bd p {
  margin: 0;
  font-size: 13px;
}
.select-time {
  margin-right: 20px !important;
}
#rechargelist .el-button.el-button--primary.el-button--medium {
  margin-left: 0px !important;
  margin-right: 20px !important;
}
</style>

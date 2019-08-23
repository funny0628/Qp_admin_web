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
       <el-table-column
          v-for="(item,index) in tableStyle"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
          >
            <template slot-scope="scope">
            <template v-if="['moneyexchange','submittime'].indexOf(item.prop)>0">
              <p v-for="(ite,ind) in scope.row[item.prop]" :key="ind">{{ite}}</p>
            </template>
            <template v-if="item.prop==='operate'">
              <el-button type="text" v-for="(btn,i) in scope.row[item.prop]" :key="i">{{btn.label}}</el-button>
            </template>
            <template v-if="['moneyexchange','submittime','operate'].indexOf(item.prop) < 0">{{scope.row[item.prop]}}</template>
          </template>
          </el-table-column>
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

export default {
  extends: BaseIframe,
  components: {InputArea, SelectTime, InfoTable, PermissionButton },
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
      records: [
        {
          orderid:1,
          userid:2,
          user:'张三',
          payer:'李四',
          ordermoney:'10000',
          moneyexchange:["充值前：10000","充值后：2000"],
          orderstatus:'启用',
          submittime:["2018-09-01 12:00:00","2019-08-01 12:00:00"],
          operater:'admin',
          ordertip:'',
          operate:[
            { label: "审核", type: "check" },
            { label: "驳回", type: "reject" },
          ]
        }
      ],
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
#rechargelist .bd p {
  margin: 0;
  font-size: 13px;
}
</style>

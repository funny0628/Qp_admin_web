<template>
  <div id="prepaidRecord-main">
    <input-area>
      <el-input v-model="aresData.user_id" placeholder="请输入用户id" size="medium"></el-input>
      <el-input v-model="aresData.account_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-input v-model="aresData.order_num" placeholder="订单编号" size="medium"></el-input>
      <el-select v-model="aresData.channel" clearable placeholder="兑换渠道" size="medium">
        <el-option
          v-for="item in channels"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="aresData.status" clearable placeholder="订单状态" size="medium">
        <el-option
          v-for="item in order_status"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <select-time :date="date" :select-time.sync="date"></select-time>
      <permission-button
        :action="ActionType.READ"
        @click="search()"
        style="float: right;margin-bottom: 20px;"
      >
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
            <template v-if="['user_gold', 'money_change', 'submit_time'].indexOf(scope.prop) >= 0">
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handeClick(btn)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'money_change', 'submit_time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import SelectTime from "../../plugin/components/SelectTime";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PageInfo from "../../plugin/script/common/PageInfo";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "Enquiry",
  extends: BaseIframe,
  components: {
    InputArea,
    PermissionButton,
    InfoTable,
    SelectTime,
    InfoTableItem
  },
  data() {
    return {
      aresData: {
        user_id: "",
        account_id: "",
        order_num: "",
        channel: "",
        status: "" //订单状态
      },
      /*date*/
      date: [],
      channels: [
        { value: "1", label: "银行卡" },
        { value: "2", label: "支付宝" }
      ],
      order_status: [
        { value: "1", label: "待审核" },
        { value: "2", label: "代付款" },
        { value: "3", label: "兑换成功" }
      ],
      /*table*/
      tableStyle: [
        { label: "订单编号", prop: "order_num", width: "160" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "用户名", prop: "user_name", width: "" },
        { label: "渠道ID", prop: "channel_id", width: "" },
        { label: "兑换渠道", prop: "exchange_channel", width: "" },
        { label: "账号／姓名", prop: "user", width: "160" },
        { label: "兑换金额", prop: "exchange_money", width: "" },
        { label: "金额变动", prop: "money_change", width: "160" },
        { label: "订单状态", prop: "order_status", width: "160" },
        { label: "提交时间／到账时间", prop: "submit_time", width: "160" },
        { label: "操作用户", prop: "operation_user", width: "160" },
        { label: "订单备注", prop: "order_note", width: "160" },
        { label: "操作", prop: "action", width: "200" }
      ],
      records: [
        {
          order_num: "09287673429137",
          user_id: "1001001",
          user_name: "测试玩家",
          channel_id: "",
          exchange_channel: "银行卡",
          user: "13762356892/张三",
          exchange_money: "100",
          money_change: ["兑换前：10100", "兑换后：10000"],
          order_status: "待审核",
          submit_time: ["2019-01-01 12:00:00", " 2019-01-01 12:00:59"],
          operation_user: "",
          order_note: "",
          action: [
            { label: "锁定", type: "lock" },
            { label: "已兑换", type: "channel" },
            { label: "驳回", type: "rejected" }
          ]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0)
    };
  },
  methods: {
    search() {},
    /***修改、删除 */
    handeClick(btn) {
      if (btn.type === "lock") {
        console.log("这是锁定");
      }
      if (btn.type === "channel") {
        console.log("这是已兑换");
      }
      if (btn.type === "rejected") {
        console.log("这是驳回");
      }
    }
  }
};
</script>

<style scoped>
#prepaidRecord-main .bd p {
  margin: 0;
}
</style>
<!--兑换记录查询-->

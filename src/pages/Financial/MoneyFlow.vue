<template>
  <div id="MoneyFlow-main">
    <input-area>
      <el-input v-model="aresData.user_id" placeholder="请输入用户id" size="medium"></el-input>
      <el-input v-model="aresData.account_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-select v-model="aresData.game" clearable placeholder="游戏" size="medium">
        <el-option v-for="item in games" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="aresData.type" clearable placeholder="类型" size="medium">
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <select-time :date="date" :select-time.sync="date"></select-time>
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
  name: "MoneyFlow",
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
        game: "",
        type: "" //订单状态
      },
      /*date*/
      date: [],
      games: [
        { value: "1", label: "反恐精英" },
        { value: "2", label: "绝地求生" }
      ],
      types: [
        { value: "1", label: "充值" },
        { value: "2", label: "兑换" },
        { value: "3", label: "消耗" }
      ],
      /*table*/
      tableStyle: [
        { label: "关联ID", prop: "contact_id", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "用户昵称", prop: "user_name", width: "" },
        { label: "游戏", prop: "game", width: "" },
        { label: "类型", prop: "type", width: "" },
        { label: "金额", prop: "money", width: "160" },
        { label: "变动后金额", prop: "exchange_money", width: "" },
        { label: "变动时间", prop: "exchange_time", width: "" },
        { label: "操作人", prop: "operation ", width: "" },
        { label: "备注", prop: "note", width: "" }
      ],
      records: [
        {
          contact_id: "09287673429137",
          user_id: "1001001",
          user_name: "测试玩家",
          game: "反恐精英",
          type: "充值",
          money: "100.00",
          exchange_money: "100.00",
          exchange_time: "2019-01-01 12:00:00",
          operation: "-",
          note: ""
        },
        {
          contact_id: "09287673429137",
          user_id: "1001002",
          user_name: "测试玩家",
          game: "绝地求生",
          type: "充值",
          money: "200.00",
          exchange_money: "200.00",
          exchange_time: "2019-02-01 14:00:00",
          operation: "-",
          note: ""
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
</style>

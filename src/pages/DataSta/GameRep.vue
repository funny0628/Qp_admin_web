<!--游戏报表-->
<template>
  <div id="TaxSta-main">
    <input-area>
      <el-input v-model="aresData.user_id" placeholder="请输入用户id" size="medium"></el-input>
      <el-input v-model="aresData.account_id" placeholder="请输入渠道id" size="medium"></el-input>
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
  name: "GameRep",
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
        account_id: ""
      },
      date: [],
      //表格数据
      tableStyle: [
        { label: "时间", prop: "time", width: "" },
        { label: "渠道ID", prop: "channel_id", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "游戏名称", prop: "game_name", width: "" },
        { label: "参与人数", prop: "participation", width: "" },
        { label: "总投入", prop: "total_investment", width: "" },
        { label: "总产出", prop: "total_output", width: "" },
        { label: "赔率", prop: "odds", width: "" },
        { label: "总输赢", prop: "total_win", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          time: "2019-07-29",
          channel_id: "98082113",
          user_id: "10086",
          game_name: "游戏三",
          participation: "890",
          total_investment: "3278212",
          total_output: "332989",
          odds: "-",
          total_win: "-3000.00",
          action: [{ label: "查看详情", type: "read" }]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0)
    };
  },
  methods: {
    search() {},
    /*查看详情*/
    handeClick(btn) {}
  }
};
</script>

<style scoped>
</style>
<!--游戏报表-->

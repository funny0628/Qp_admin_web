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
  name: "TaxSta",
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
      date: [],
      aresData: {
        user_id: "",
        account_id: ""
      },
      /*table*/
      tableStyle: [
        { label: "渠道ID", prop: "channel_id", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "下级人数", prop: "lower_num", width: "" },
        { label: "入款金额", prop: "paragraph_money", width: "" },
        { label: "兑换金额", prop: "exchange_money", width: "" },
        { label: "游戏流水", prop: "game_water", width: "" },
        { label: "游戏盈亏", prop: "game_loss", width: "" },
        { label: "活动", prop: "activity", width: "" },
        { label: "日工资", prop: "day_wages", width: "" },
        { label: "佣金", prop: "commission", width: "" },
        { label: "实际盈亏", prop: "actual_loss", width: "" }
      ],
      records: [
        {
          channel_id: "980821",
          user_id: "android",
          lower_num: "40",
          paragraph_money: "100.00",
          exchange_money: "10.00",
          game_water: "120397.00",
          game_loss: "10000.00",
          activity: "100.00",
          day_wages: "0.00",
          commission: "0.00",
          actual_loss: "11000.00"
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0)
    };
  },
  methods: {
    search() {}
  }
};
</script>

<style scoped>
</style>
<!--团队报表-->

<!--金流次数统计-->
<template>
  <div id="FlowSta">
    <input-area>
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
  name: "FlowSta",
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
      tableStyle: [
        { label: "用户层级", prop: "user_level", width: "" },
        { label: "银行入款金额／笔数", prop: "deposit_amount", width: "" },
        { label: "第三方入款金额／笔数", prop: "third_amount", width: "" },
        { label: "人工入款金额／笔数", prop: "artificial_amount", width: "" }
      ],
      records: [
        {
          user_level: "第一级代理",
          deposit_amount: "980821／100",
          third_amount: "980821／100",
          artificial_amount: "980821／100"
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

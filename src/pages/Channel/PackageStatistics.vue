<template>
  <div id="packagestatistics">
    <input-area>
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
  components: {InputArea, SelectTime, InfoTable, PermissionButton },
  data() {
    return {
      date: [],
      tableStyle: [
        { label: "日期", prop: "date", width: "155px" },
        { label: "包名", prop: "packagename", width: "155px" },
        { label: "标识", prop: "mark", width: "155px" },
        { label: "渠道账号", prop: "account", width: "155px" },
        { label: "银行充值", prop: "bankrecharge", width: "155px" },
        { label: "第三方充值", prop: "thirdrecharge", width: "155px" },
        { label: "人工存入", prop: "artificial", width: "155px" },
        { label: "银商充值", prop: "silverrecharge", width: "155px" },
        { label: "用户兑换", prop: "exchange", width: "155px" },
        { label: "游戏税收", prop: "tax", width: "155px" },
        { label: "充兑差额", prop: "difference", width: "155px" },
        { label: "今日总登录", prop: "totallogin", width: "155px" },
        { label: "新增游客", prop: "newvistor", width: "155px" },
        { label: "今日充值人数", prop: "rechargernum", width: "155px" },
        { label: "今日新用户", prop: "newpeople", width: "155px" },
        { label: "今日兑换人数", prop: "exchangepeople", width: "155px" },
        { label: "最高在线人数", prop: "high", width: "155px" },
        { label: "安装人数", prop: "installnum", width: "155px" }
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
.select-time{
  margin-right: 20px !important;
}
#packagestatistics .el-button.el-button--primary.el-button--medium{
margin-left: 0px!important;
  margin-right: 20px !important;
}
</style>

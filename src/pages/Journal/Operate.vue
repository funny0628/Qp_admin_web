<template>
  <div id="operate">
    <input-area>
      <el-input v-model="member_id" placeholder="请输入会员id" size="medium"></el-input>
      <el-input v-model="operatemodule" placeholder="操作模块" size="medium"></el-input>
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
      member_id: "",
      operatemodule:'',
      date: [],
      tableStyle: [
        { label: "日志编号", prop: "journalid", width: "" },
        { label: "会员ID", prop: "memberid", width: "" },
        { label: "操作模块", prop: "operatemodule", width: "" },
        { label: "操作详情", prop: "operatedetail", width: "" },
        { label: "操作IP", prop: "operateip", width: "" },
        { label: "操作时间", prop: "operatetime", width: "" }
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

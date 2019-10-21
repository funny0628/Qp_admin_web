<template>
  <div id="backdo">
    <input-area>
      <el-input v-model="user_id" placeholder="请输入用户id" size="medium"></el-input>
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
import AdminLogHandler from "../../script/handlers/AdminLogHandler";

export default {
  extends: BaseIframe,
  name:'BackDo',
  components: { InputArea, SelectTime, InfoTable, PermissionButton },
  data() {
    return {
      user_id: "",
      operatemodule: "",
      current_user: 1004,
      date: [],
      tableStyle: [
        { label: "日志编号", prop: "log_id", width: "" },
        { label: "管理员ID", prop: "operator", width: "" },
        { label: "管理员名称", prop: "operator_name", width: "" },
        { label: "操作模块", prop: "power_parents", width: "" },
        { label: "操作详情", prop: "power", width: "" },
        { label: "状态", prop: "result", width: "" },
        { label: "操作IP", prop: "ip", width: "" },
        { label: "操作时间", prop: "created_at", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(1, [5, 10, 15], 0)
    };
  },
  methods: {
    search(val) {
      val = val || this.pageInfo.page;
      let data = {
        module: this.operatemodule,
        operator: this.user_id,
        start_date: this.date[0] || "",
        stop_date: this.date[1] || "",
        page_index: val
      };

      AdminLogHandler.member_operate(data, this.current_user).promise.then(res => {
        const { data, msg, code } = res;
        if (Number(code) == 200) {
          if (Number(data.total_count) > 0) {
            this.records = data.ls;
            this.pageInfo = new PageInfo(
              1,
              [5, 10, 15],
              Number(data.total_count)
            );
          } else {
            this.records = [];
            return;
          }
        }else{
            return this.$message.error(msg);
        }
      });
    }
  },
  created() {
    this.search();
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
.select-time {
  margin-right: 20px !important;
}
#backdo .el-button.el-button--primary.el-button--medium {
  margin-left: 0px !important;
  margin-right: 20px !important;
}
</style>

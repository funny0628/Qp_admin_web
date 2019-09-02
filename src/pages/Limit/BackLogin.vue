<template>
  <div id="backlogin">
    <input-area>
      <el-input v-model="user_id" placeholder="请输入用户id" size="medium"></el-input>
      <el-input v-model="loginip" placeholder="请输入登录ip" size="medium"></el-input>
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
import InputArea from "../../plugin/components/InputArea";

export default {
  extends: BaseIframe,
  components: {InputArea, InfoTable, PermissionButton },
  data() {
    return {
      user_id: "",
      loginip:'',
      date: [],
      tableStyle: [
        { label: "管理员ID", prop: "adminid", width: "" },
        { label: "管理员名称", prop: "adminname", width: "" },
        { label: "登录IP", prop: "loginip", width: "" },
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
.bd{
  margin: 0 20px;
}
.el-input{
    margin-right: 10px;
}
</style>

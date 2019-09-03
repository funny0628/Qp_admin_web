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
import LogHandler from "../../script/handlers/LogHandler";

export default {
  extends: BaseIframe,
  components: {InputArea, SelectTime, InfoTable, PermissionButton },
  data() {
    return {
      user_id: '',
      operatemodule:'',
      current_user:1002,
      module:'',
      date: [],
      tableStyle: [
        { label: "日志编号", prop: "journalid", width: "" },
        { label: "管理员ID", prop: "adminid", width: "" },
        { label: "管理员名称", prop: "adminname", width: "" },
        { label: "操作模块", prop: "operatemodule", width: "" },
        { label: "操作详情", prop: "operatedetail", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作IP", prop: "operateip", width: "" },
        { label: "操作时间", prop: "operatetime", width: "" }
      ],
      records: [],
       pageInfo: new PageInfo(0, [5, 10, 15], 0),
      current_page:1
    };
  },
  methods: {
    search() {},
    getOperateList(){
      let data={
          module:"",
          operator:this.user_id,
          start_date:"",
          stop_date:"",
          page_index:this.current_page
      }
      LogHandler.member_operate(data,this.current_user).promise.then(res=>{
         console.log(res)
      })
    }
  },
  created(){
    this.getOperateList();
    console.log(this.date)
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
.select-time{
  margin-right: 20px !important;
}
#backdo .el-button.el-button--primary.el-button--medium{
margin-left: 0px!important;
  margin-right: 20px !important;
}
</style>

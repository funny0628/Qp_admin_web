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
import LogHandler from "../../script/handlers/LogHandler";

export default {
  extends: BaseIframe,
  components: {InputArea, InfoTable, PermissionButton },
  data() {
    return {
      user_id: "",
      loginip:'',
      current_user:1004,
      date: [],
      tableStyle: [
        { label: "管理员ID", prop: "user_id", width: "" },
        { label: "管理员名称", prop: "user_name", width: "" },
        { label: "登录IP", prop: "ip", width: "" },
        { label: "操作时间", prop: "created_at", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(1, [10, 15, 20], 0)
    };
  },
  methods: {
      search(val){
      val = val||this.pageInfo.page;
      let data={
          admin_uid:this.user_id,
          ip:this.loginip,
          page_index:val
      }
      // console.log('111',data)
      LogHandler.member_login(data,this.current_user).promise.then(res=>{
         console.log(res)
         const { data, msg, code } = res;
         if(Number(code)==200){
           this.records=data.ls
          this.pageInfo = new PageInfo(1,[5,10,15],Number(data.total_count))
         }else {
          return this.$message.error("msg");
        }
      })
    }
  },
  created(){
    this.search();
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

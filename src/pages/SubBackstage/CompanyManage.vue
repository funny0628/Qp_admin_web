<template>
<div id="companymanage">
 <input-area>
      <el-input v-model="companyid" placeholder="公司ID" style="width:159px;"></el-input>
      <el-input v-model="companyname" placeholder="公司名称" style="width:145px;"></el-input>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="flag=false, addsilver=true">
        <el-button type="primary" size="medium">新增</el-button>
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
            <template v-if="scope.prop==='status'">
              <span  :class="{'runcolor':scope.row.status!=1,'stopcolor':scope.row.status==1}">{{scope.row.status==1?'禁用':'启用'}}</span>
              </template>
            <template v-if="scope.prop==='operate'">
              <el-button type="text" v-if="scope.row.role_name=='超级管理员'">禁止编辑</el-button>
              <span v-else>
                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button type="text" @click="delet(scope.row)">删除</el-button>
                <el-button type="text" @click="runstop(scope.row)">{{scope.row.status==1?'启用':'禁用'}}</el-button>
              </span>
            </template>
            <template v-if="['operate','status'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
</div>

</template>
<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import AdminUserHandler from "../../script/handlers/AdminUserHandler";

export default {
 extends: BaseIframe,
  name:'CompanyManage',
  components: {
    InputArea,
    InfoTable,
    PermissionButton,
    InfoTableItem
  },
  data(){
      return{
        companyid:'',
        companyname:'',
        user_id: 1000,
        tableStyle: [
        { label: "公司ID", prop: "company_id", width: "" },
        { label: "公司名称", prop: "company_name", width: "" },
        { label: "平台标识", prop: "token", width: "" },
        { label: "充值比例兑换", prop: "exchange", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "创建时间/修改时间", prop: "login_at", width: "" },//此处prop还有问题
        { label: "操作", prop: "operate", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(1, [10, 15, 20], 0)
      }
  },
  methods: {
      search(val){
      val = val || this.pageInfo.page;
      let data = {
        company_id: this.companyid,
        company_name: this.companyname,
        page_index: val
      };
      AdminUserHandler.company_list(data, this.user_id).promise.then(res=>{
        console.log(res)
           const { data, msg, code } = res;
          if (Number(code) == 200) {
          if (Number(data.total_count)>0) {
            this.records = data.ls;
            this.pageInfo = new PageInfo(
              1,
              [5, 10, 15],
              Number(data.total_count)
            );
          } else {
            this.records=[];
            return;
          }
        } else {
          return this.$message.error(msg);
        }
      })
      }
  },
  created() {
    this.search();      
  },
}
</script>
<style scoped>
.bd {
  margin: 0 20px;
}
.el-input {
  margin-right: 10px;
}
#companymanage .el-button.el-button--primary.el-button--medium {
  margin-left: 0px !important;
  margin-right: 20px !important;
}
</style>
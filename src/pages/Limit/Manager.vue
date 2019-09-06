<template>
<div class="manager">
    <permission-button :action="ActionType.ADD" @click="forward('setlimit', {type: 'add'})">
        <el-button type="primary" size="medium" class="addnewbtn">新增</el-button>
      </permission-button>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
       <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop==='status'">{{scope.row.status==0?'禁用':'启用'}}</template>
            <!-- <template v-if="'status'.indexOf(scope.prop) > 0">{{scope.row.status==0?'禁用':'启用'}}</template> -->
            <template v-if="scope.prop==='operate'">
              <el-button
                type="text"
               v-if="scope.row.role=='超级管理员'"
              >编辑</el-button>
              <span v-else>
              <el-button
                type="text">编辑</el-button>
                <el-button
                type="text">删除</el-button>
                <el-button
                type="text" @click="runstop()">{{scope.row.status==0?'启用':'禁用'}}</el-button>
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
import InfoTableItem from "../../plugin/components/InfoTableItem";
import RoleHandler from "../../script/handlers/RoleHandler";

export default {
  extends: BaseIframe,
  components: { InfoTable, PermissionButton ,InfoTableItem},
  data(){
      return{
        user_id:1004,
        tableStyle: [
        { label: "序号", prop: "role_id", width: "" },
        { label: "角色名称", prop: "role_name", width: "" },
        { label: "角色描述", prop: "remark", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "operate", width: "" },
      ],
      records: [
      //    {
      //     id: 111,
      //     role: "超级管理员",
      //     roledescribe: "-",
      //     status: '启用',
      //   },
      //  {
      //     id: 222,
      //     role: "会计",
      //     roledescribe: "-",
      //     status: '启用',
      //   }
      ],
      pageInfo: new PageInfo(1, [10, 15, 20], 0)
      }
  },
  methods: {
    search(val) {
      let data = {};
      RoleHandler.managerList(data, this.user_id).promise.then(res => {
             console.log(res)
         const { data, msg, code } = res;
         if(Number(code)==200){
           this.records=data
          // this.pageInfo = new PageInfo(1,[5,10,15],Number(data.total_count))
         }else {
          return this.$message.error("msg");
        }
      });
    },
    runstop(){}
  },
  created(){
    this.search()
  }
}
</script>
<style scoped>
.bd{
  margin: 0 20px;
}
.addnewbtn{
    margin: 10px 20px;
    font-size: 16px!important;
    width: 120px!important;
    height: 35px!important;
}
</style>
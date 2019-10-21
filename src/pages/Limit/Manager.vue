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
            <template v-if="scope.prop==='status'">{{scope.row.status==1?'禁用':'启用'}}</template>
            <!-- <template v-if="'status'.indexOf(scope.prop) > 0">{{scope.row.status==0?'禁用':'启用'}}</template> -->
            <template v-if="scope.prop==='operate'">
              <el-button type="text" v-if="scope.row.role_name=='超级管理员'">禁止编辑</el-button>
              <span v-else>
                <el-button type="text">编辑</el-button>
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
import InfoTableItem from "../../plugin/components/InfoTableItem";
import AdminRoleHandler from "../../script/handlers/AdminRoleHandler";

export default {
  extends: BaseIframe,
  name:'Manager',
  components: { InfoTable, PermissionButton, InfoTableItem },
  data() {
    return {
      user_id: 2000,
      current_page: 1,
      tableStyle: [
        { label: "序号", prop: "role_id", width: "" },
        { label: "角色名称", prop: "role_name", width: "" },
        { label: "角色描述", prop: "remark", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "operate", width: "" }
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
    };
  },
  methods: {
    search(val) {
      val = val || this.pageInfo.page;
      let data = {
        page_index: val
      };
      AdminRoleHandler.managerList(data, this.user_id).promise.then(res => {
        console.log(res);
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
        } else {
          return this.$message.error(msg);
        }
      });
    },
    delet(row) {
      console.log(row);
      this.$confirm("是否删除该文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let data = { role_id: row.role_id };
          AdminRoleHandler.del_manager(data, this.user_id).promise.then(res => {
            const { data, msg, code } = res;
            if (Number(code) == 200) {
              this.search();
              if (row.role_name === "超级管理员") {
                this.$message.error(msg);
              } else {
                this.$message.success(msg);
              }
            }
          });
        })
        .catch(() => {
          return;
        });
    },
     runstop(row) {
       console.log(row)
      let changestatus;
      if (Number(row.status) === 1) {
        changestatus = 2;
      } else {
        changestatus = 1;
      }
      let data = {role_id: row.role_id, status: changestatus };
      AdminRoleHandler.runstop_role(data, this.user_id).promise.then(res => {
        const { data, msg, code } = res;
        if (Number(code) == 200) {
          this.search();
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      });
    },
  },
  created() {
    this.$nextTick(()=>{
    this.search();
    })
  }
};
</script>
<style scoped>
.bd {
  margin: 0 20px;
}
.addnewbtn {
  margin: 10px 20px;
  font-size: 16px !important;
  width: 120px !important;
  height: 35px !important;
}
</style>
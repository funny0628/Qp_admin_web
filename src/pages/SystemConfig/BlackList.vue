<template>
  <div id="blackList-main">
    <input-area>
      <el-button v-has="'add_ip_blacklist'" type="primary" size="medium" @click="openAddDialog">添加</el-button>
      <div>
        <span>ip</span>
        <el-input v-model="search_ip" placeholder="请输入ip" style="width:20%;margin-top:10px;"></el-input>
        <el-button type="primary" size="medium" @click="searchData">查找</el-button>
      </div>
    </input-area>
    <div class="bd">
      <el-table
        v-has="'ip_blacklist_records'"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="lock_data" label="禁止" align="center"></el-table-column>
        <el-table-column prop="lock_status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.lock_status === 1">封号</span>
            <span v-if="scope.row.lock_status === 0">解禁</span>
          </template>
        </el-table-column>
        <el-table-column prop="memo" label="备注" align="center"></el-table-column>
        <el-table-column prop="op_name" label="最后修改的操作人" align="center"></el-table-column>
        <el-table-column prop="op_time" label="操作时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.op_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              v-has="'forbidden_ip_blacklist'"
              style="background-color:#30a99d;color:#fff;"
              size="mini"
              v-if="scope.row.lock_status === 1"
              @click="updateStatus(scope.row)"
            >{{scope.row.lock_status | formatStatus}}</el-button>
            <el-button
              v-has="'unforbidden_ip_blacklist'"
              style="background-color:#fc7658;color:#fff;"
              size="mini"
              v-if="scope.row.lock_status === 0"
              @click="updateStatus(scope.row)"
            >{{scope.row.lock_status | formatStatus}}</el-button>
            <el-button
              v-has="'modify_ip_blacklist'"
              style="background-color:#30a99d;color:#fff;"
              size="mini"
              @click="handleEdit(scope.row);change();"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加热更新信息 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="被禁ip" :label-width="formLabelWidth">
          <el-input
            v-model="form.forbid_ip"
            autocomplete="off"
            ref="forbidEle"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="封号" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBlackList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
         

<script>
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "ip_blacklist",
  components: {
    InputArea
  },
  data() {
    return {
      disabled: false,
      search_ip: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogTitle: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      tableData: [],
      form: {
        forbid_ip: "",
        type: "1",
        remark: ""
      }
    };
  },
  filters: {
    formatStatus: function(val) {
      return val === 1 ? "解禁" : "封号";
    }
  },
  methods: {
    resetForm() {
      this.form = {
        id: null,
        forbid_ip: "",
        type: "1",
        remark: ""
      };
    },

    getBlackList() {
      this.$http
        .get("v1/backend/sys-conf/ip-blacklist", {
          params: {
            page: this.currentPage,
            limit: this.pageSize
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.tableData = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    searchData() {
      this.$http
        .get("v1/backend/sys-conf/ip-blacklist", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            ip: this.search_ip
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.tableData = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    addBlackList() {
      if (!this.form.id) {
        let data = {
          ip: this.form.forbid_ip,
          op_type: Number(this.form.type),
          remarks: this.form.remark
        };
        this.$http.post("v1/backend/sys-conf/ip-blacklist", data).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getBlackList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      } else {
        let data = {
          ip: this.form.forbid_ip,
          op_type: Number(this.form.type),
          remarks: this.form.remark
        };
        this.$http.post("v1/backend/sys-conf/ip-blacklist", data).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getBlackList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      }
    },
    openAddDialog() {
      this.resetForm();
      this.disabled = false
      this.dialogTitle = "添加控制名单";
      this.dialogFormVisible = true;
    },
    handleEdit(row) {
      console.log(row);
      this.dialogTitle = "编辑";
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.forbid_ip = row.lock_data;
      this.form.type = String(row.lock_status);
      this.form.remark = row.memo;
    },
    change() {
      if (this.form.id) {
        this.disabled = true;
      }
    },
    updateStatus(row) {
      console.log(row);
      let data = {
        id: row.id,
        lock_status: row.lock_status === 0 ? 1 : 0
      };
      this.$http.put("v1/backend/sys-conf/ip-blacklist", data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.getBlackList();
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getBlackList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBlackList();
    }
  },
  mounted() {
    this.getBlackList();
  }
};
</script>

<style scoped>
#blackList-main .bd {
  padding-left: 20px;
}
#blackList-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#blackList-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#blackList-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

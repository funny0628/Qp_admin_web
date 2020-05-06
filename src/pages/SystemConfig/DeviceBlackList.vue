<template>
  <div id="deviceBlackList-main">
    <input-area>
      <el-button v-has="'add_device_blacklist'" type="primary" size="medium" @click="openAddDialog" style="background-color:#30a99d;color:#fff;">添加</el-button>
      <div>
        <span>设备号</span>
        <el-input v-model="device_id" placeholder="请输入设备号" style="width:20%;margin-top:10px;"></el-input>
        <el-button type="primary" size="medium" style="background-color:#30a99d;color:#fff;" @click="searchData">查找</el-button>
      </div>
    </input-area>
    <div class="bd">
      <el-table
        v-has="'device_blacklist_records'"
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
              v-has="'forbidden_device_blacklist'"
              style="background-color:#30a99d;color:#fff;"
              size="mini"
              v-if="scope.row.lock_status === 1"
              @click="updateStatus(scope.row)"
            >{{scope.row.lock_status | formatStatus}}</el-button>
            <el-button
              v-has="'unforbidden_device_blacklist'"
              style="background-color:#fc7658;color:#fff;"
              size="mini"
              v-if="scope.row.lock_status === 0"
              @click="updateStatus(scope.row)"
            >{{scope.row.lock_status | formatStatus}}</el-button>
            <el-button
              v-has="'modify_device_blacklist'"
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
    <!-- 添加信息 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="被禁设备" :label-width="formLabelWidth">
          <el-input v-model="form.forbid_device" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type">
            <el-option label="封号" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDeviceBlack">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
         

<script>
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "device_blacklist",
  components: {
    InputArea
  },
  data() {
    return {
      disabled: false,
      device_id: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogTitle: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogVisible: false,
      tableData: [],
      form: {
        forbid_device: "",
        type: "1",
        remark: ""
      },
      fileList: [],
      imageUrl: ""
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
        forbid_device: "",
        type: "1",
        remark: ""
      };
    },

    getDeviceBlackList() {
      this.$http
        .get("v1/backend/sys-conf/device-blacklist", {
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
        .get("v1/backend/sys-conf/device-blacklist", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            device_id: this.device_id
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
    openAddDialog() {
      this.resetForm();
      this.disabled = false
      this.dialogTitle = "添加控制名单";
      this.dialogFormVisible = true;
    },
    addDeviceBlack() {
        if (!this.form.id) {
        let data = {
          ip: this.form.forbid_device,
          op_type: Number(this.form.type),
          remarks: this.form.remark
        };
        this.$http.post("v1/backend/sys-conf/device-blacklist", data).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getDeviceBlackList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      } else {
        let data = {
          id: this.form.id,
          ip: this.form.forbid_device,
          op_type: Number(this.form.type),
          remarks: this.form.remark
        };
        this.$http.post("v1/backend/sys-conf/device-blacklist", data).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getDeviceBlackList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      }
    },
    handleEdit(row) {
      console.log(row);
      this.dialogTitle = "编辑";
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.forbid_device = row.lock_data;
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
      this.$http.put("v1/backend/sys-conf/device-blacklist", data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.getDeviceBlackList();
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDeviceBlackList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDeviceBlackList();
    }
  },
  mounted() {
    this.getDeviceBlackList();
  }
};
</script>

<style scoped>
#deviceBlackList-main .bd {
  padding-left: 20px;
}
#deviceBlackList-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#deviceBlackList-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#deviceBlackList-main .bd >>> .el-button {
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

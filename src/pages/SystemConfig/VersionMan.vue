<template>
  <div id="whiteList-main">
    <div class="mask" v-if="showProgress">
      <el-progress
        class="progress"
        v-if="showProgress"
        :text-inside="true"
        :stroke-width="26"
        :percentage="percentage"
      ></el-progress>
      <span
        v-if="percentage == 100"
        v-loading.fullscreen="apkloading"
        element-loading-text="资源包整合中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
      ></span>
    </div>
    <input-area>
      <el-button type="primary" size="medium" @click="openAddDialog">添加</el-button>
    </input-area>
    <div class="bd">
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="version" label="更新版本" align="center"></el-table-column>
        <el-table-column prop="channel" label="更新渠道" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-if="scope.row.status == 2">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="modified_time" label="更新时间" align="center"></el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button
              v-loading.fullscreen="loading"
              element-loading-text="资源加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)"
              size="mini"
              type="primary"
              @click="handleHistory(scope.row)"
            >历史版本</el-button>
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
    <!-- 添加版本管理信息 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="渠道" :label-width="formLabelWidth">
          <el-select v-model="form.channel" placeholder="请选择渠道">
            <el-option
              v-for="(item,index) in channelOpts"
              :key="index"
              :label="item.channel_name"
              :value="item.channel_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更新状态" :label-width="formLabelWidth">
          <el-radio v-model="form.radio" label="1">启用</el-radio>
          <el-radio v-model="form.radio" label="2">禁用</el-radio>
        </el-form-item>
        <el-form-item label="文件" :label-width="formLabelWidth">
          <el-upload action accept=".apk" :show-file-list="false" :http-request="uploadFile">
            <el-button size="small" type="primary">apk/ipa包上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="更新版本号" :label-width="formLabelWidth">
          <el-input v-model="form.version" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包大小(byte)" :label-width="formLabelWidth">
          <el-input v-model="form.package_size" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="整包地址" :label-width="formLabelWidth">
          <el-input v-model="form.package_url" disabled autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVersionUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 历史版本 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="70%">
      <el-table
        border
        ref="multipleTable"
        :data="records"
        tooltip-effect="dark"
        style="width: 100%;"
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="version" label="更新版本" align="center"></el-table-column>
        <el-table-column prop="channel" label="更新渠道" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-if="scope.row.status == 2">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="modified_time" label="更新时间" align="center" width="180"></el-table-column>
        <el-table-column align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
         

<script>
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "whole_package_update",
  components: {
    InputArea
  },
  data() {
    return {
      loading: false,
      apkloading: false,
      showProgress: false,
      percentage: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogTitle: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogVisible: false,
      tableData: [],
      records: [],
      imageUrl: "",
      channelOpts: [],
      form: {
        version_id: null,
        channel: "",
        radio: "1",
        version: "",
        package_size: "",
        package_url: ""
      },
      form2: {
        name: ""
      }
    };
  },
  methods: {
    resetForm() {
      this.form = {
        version_id: null,
        channel: "",
        radio: "1",
        version: "",
        package_size: "",
        package_url: ""
      };
    },
    getWholePackageList() {
      this.$http
        .get("v1/backend/sys-conf/package", {
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
    getAllChannelList() {
      let data = {
        type_id: 2,
        add_id: 2
      };
      this.$http.post("v1/backend/no_channel", data).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.channelOpts = res.data.data;
        }
      });
    },
    openAddDialog() {
      this.dialogFormVisible = true;
      this.percentage = 0;
      this.dialogTitle = "添加版本管理信息"
    },
    addVersionUpdate() {
      if (!this.form.version_id) {
        let data = {
          channel: this.form.channel,
          version: this.form.version,
          status: Number(this.form.radio),
          package_size: this.form.package_size,
          package_url: this.form.package_url
        };
        this.$http.post("v1/backend/sys-conf/package", data).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getWholePackageList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          } else {
            this.dialogFormVisible = false;
            this.$message({
              type: "info",
              message: res.data.msg
            });
          }
        });
      } else {
        let data = {
          version_id: this.form.version_id,
          channel: this.form.channel,
          version: this.form.version,
          status: Number(this.form.radio),
          package_size: this.form.package_size,
          package_url: this.form.package_url
        };
        this.$http.put("v1/backend/sys-conf/package", data).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getHistoryVersion(this.form.channel);
            this.getWholePackageList()
            this.$message({
              type: "success",
              message: res.data.msg
            });
          } else {
            this.dialogFormVisible = false;
            this.$message({
              type: "info",
              message: res.data.msg
            });
          }
        });
      }
    },
    getHistoryVersion(channel) {
      this.$http
        .get("v1/backend/sys-conf/package/history", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            channel: channel
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.dialogVisible = true;
            this.loading = false;
            this.records = res.data.data;
          }
        });
    },
    handleHistory(row) {
      console.log(row);
      this.dialogTitle = '编辑版本管理信息'
      let channel = row.channel;
      this.loading = true;
      this.getHistoryVersion(channel);
    },
    handleEdit(row) {
      console.log(row);
      this.dialogVisible = false;
      this.dialogFormVisible = true;
      this.form.version_id = row.id;
      this.form.channel = row.channel
      this.form.radio = String(row.status)
      this.form.version = row.version
      this.form.package_size = row.size
      this.form.package_url = row.apk_update_url
    },
    handleDelete(row) {
      console.log(row);
      let channel = row.channel;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("v1/backend/sys-conf/package", {
              params: {
                version_id: row.id
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.getHistoryVersion(channel);
                this.getWholePackageList();
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.data.msg
          });
        });
    },
    uploadFile(f) {
      var file = f.file;
      console.log(file);
      this.showProgress = true;
      this.apkloading = true;
      // 用FormData传输文件对象
      let fd = new FormData();
      // 设置文件上传接口的需要的参数
      fd.append("file", file);
      fd.append("file_name", file.name);
      fd.append("package_size", file.size);
      const config = {
        onUploadProgress: progressEvent => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          this.percentage = Number(
            ((progressEvent.loaded / progressEvent.total) * 100).toFixed(2)
          );
        }
      };
      this.$http
        .post("v1/backend/sys-conf/package/upload", fd, config)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.showProgress = false;
            this.apkloading = false;
            this.$message({
              type: "success",
              message: "资源包上传成功"
            });
            this.form.package_size = res.data.data.package_size;
            this.form.package_url = res.data.data.package_url;
          } else {
            this.showProgress = false;
            this.apkloading = false;
            this.$message({
              type: "info",
              message: "资源包上传失败"
            });
          }
        })
        .catch(res => {
          this.$message({
            type: "error",
            message: "请求接口异常"
          });
          this.showProgress = false;
          this.apkloading = false;
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getWholePackageList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getWholePackageList();
    }
  },
  mounted() {
    this.getWholePackageList();
    this.getAllChannelList();
  }
};
</script>

<style scoped>
#whiteList-main .mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100000000000;
  background-color: rgba(0, 0, 0, 0.5);
}
#whiteList-main .mask .progress {
  margin-top: 25%;
  width: 60%;
  margin-left: 20%;
}
#whiteList-main .bd {
  padding-left: 20px;
}
#whiteList-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#whiteList-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#whiteList-main .bd >>> .el-button--primary,
#whiteList-main .bd >>> .el-button--danger {
  margin-left: 0px;
  min-width: 30px;
}
#home .main-box .el-button--primary,
#home .main-box .el-button--danger,
#home .el-main .el-button--info {
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

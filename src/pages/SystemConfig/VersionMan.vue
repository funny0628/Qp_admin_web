<template>
  <div id="whiteList-main">
    <input-area>
      <el-button type="primary" size="medium" @click="dialogFormVisible=true">添加</el-button>
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
    <el-dialog title="添加版本管理信息" :visible.sync="dialogFormVisible">
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
          <el-upload
            v-loading.fullscreen="loading"
            element-loading-text="资源包上传中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.5)"
            action
            accept=".apk"
            :show-file-list="false"
            :http-request="uploadFile"
          >
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
      <div>{{form}}</div>
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
    addVersionUpdate() {
      let data = {
        channel: this.form.channel,
        version: this.form.version,
        status: Number(this.form.radio),
        // package_size: this.form.package_size,
        // package_url: this.form.package_url
        package_size: 100,
        package_url: "www.baidu.com"
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
    },
    handleHistory(row) {
      console.log(row);
      this.loading = true;
      this.$http
        .get("v1/backend/sys-conf/package/history", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            channel: row.channel
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
    handleEdit(row) {
      console.log(row);
      this.dialogVisible = false;
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      console.log(row);
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
                this.handleHistory();
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
      // 用FormData传输文件对象
      let fd = new FormData();
      // 设置文件上传接口的需要的参数
      fd.append("file", file);
      fd.append("file_name", file.name);
      fd.append("package_size", file.size);
      this.$http.post("v1/backend/sys-conf/package/upload", fd).then(res => {
        console.log(res);
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

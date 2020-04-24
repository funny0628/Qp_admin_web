<template>
  <div id="whiteList-main">
    <input-area>
      <el-button type="primary" size="medium" @click="dialogFormVisible=true">添加</el-button>
      <el-button type="primary" size="medium">添加ip白名单</el-button>
      <el-button type="primary" size="medium">搜索</el-button>
      <div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
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
        <el-table-column prop="username" label="ip地址" align="center"></el-table-column>
        <el-table-column prop="email" label="备注" align="center"></el-table-column>
        <el-table-column prop="phone" label="最后修改人" align="center"></el-table-column>
        <el-table-column prop="channel" label="操作时间" align="center"></el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加热更新信息 -->
    <el-dialog title="添加ip白名单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="ip地址" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addChannel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
         

<script>
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "whiteList",
  components: {
    InputArea,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogTitle: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogVisible: false,
      tableData: [],
      form: {
        versionUpd: { radio: "allVersion" },
        channelUpd: { radio: "allVersion" },
        forbidUpdVersion: { radio: "none" },
        forbidUpdChannel: { radio: "none" },
        isPublic: { radio: "none" },
        updStatus: { radio: "none" },
        checkList: ["android", "ios", "windows"],
        updateTime: "",
        version: "",
        update_type: "",
        update_way: ""
      },
      fileList: [],
      imageUrl: "",
    };
  },
  methods: {
    resetForm() {
      this.form = {
        channel_name: "",
        channel_id: "",
        belong_company: ""
      };
    },

    getChannelList() {
      this.$http
        .get("v1/backend/operation/channels", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            company: "",
            channel_name: ""
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.records = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    //获取公司列表
    getCompanyList() {
      this.$http.get("v1/backend/operation/channel/company").then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.companyList = res.data.data;
        }
      });
    },
    openAddDialog() {
      this.resetForm();
      this.dialogTitle = "添加渠道";
      this.dialogFormVisible = true;
    },
    addCompany() {
      let data = {
        name: this.form1.company_name
      };
      this.$http
        .post("v1/backend/operation/channel/company", data)
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
    },
    addChannel() {
      if (!this.form.id) {
        let data = {
          channel_name: this.form.channel_name,
          channel_num: this.form.channel_id,
          company: this.form.belong_company
        };
        this.$http.post("v1/backend/operation/channels", data).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getChannelList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      } else {
        console.log("wojinolei");
        let data = {
          channel_name: this.form.channel_name,
          channel_num: this.form.channel_id,
          company: this.form.belong_company,
          channel_id: this.form.id
        };
        this.$http.put("v1/backend/operation/channels", data).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getChannelList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      }
    },
    /**搜索*/
    search() {},
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogTitle = "编辑渠道";
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.channel_name = row.name;
      this.form.channel_id = row.code;
      this.form.belong_company = row.cname;
    },
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("v1/backend/operation/channels", {
              params: {
                channel_id: row.id
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.getChannelList();
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getChannelList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getChannelList();
    },
    handleAvatarSuccess(res, file) {},
    handleChange(file, fileList, info) {
      this.fileList[info] = fileList;
    },
    beforeUpload(file) {},
    uploadFile() {
      let formData = new FormData();
      this.fileList.forEach(item => {
        formData.append("filename", item.raw);
        formData.append("types", 1);
      });
      this.$http.post("v1/backend/upload", formData).then(res => {
        if (res.data.code === 1) {
          this.imageUrl = res.data.path;
        }
      });
    }
  },
  mounted() {
    this.getChannelList();
    this.getCompanyList();
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
#whiteList-main .bd >>> .el-button {
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

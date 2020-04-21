<template>
  <div id="hotUpdate-main">
    <input-area>
      <div style="margin-bottom:10px;">
        <el-button type="primary" size="medium" @click="dialogFormVisible=true">添加</el-button>
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
        <el-table-column prop="username" label="更新版本" align="center"></el-table-column>
        <el-table-column prop="email" label="是否强更" align="center"></el-table-column>
        <el-table-column prop="phone" label="类型" align="center"></el-table-column>
        <el-table-column prop="channel" label="允许版本" align="center"></el-table-column>
        <el-table-column prop="channel" label="允许渠道" align="center"></el-table-column>
        <el-table-column prop="channel" label="平台" align="center"></el-table-column>
        <el-table-column prop="channel" label="版本公开" align="center"></el-table-column>
        <el-table-column prop="channel" label="状态" align="center"></el-table-column>
        <el-table-column prop="create_time" label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="允许版本更新" :label-width="formLabelWidth">
          <el-radio v-model="form.versionUpd.radio" label="allVersion">所有版本</el-radio>
          <el-radio v-model="form.versionUpd.radio" label="custom">自定义</el-radio>
          <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-if="form.versionUpd.radio==='custom'"></el-input>
        </el-form-item>
        <el-form-item label="允许更新渠道" :label-width="formLabelWidth">
          <el-radio v-model="form.channelUpd.radio" label="allVersion">所有版本</el-radio>
          <el-radio v-model="form.channelUpd.radio" label="custom">自定义</el-radio>
          <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-if="form.channelUpd.radio==='custom'"></el-input>
        </el-form-item>
        <el-form-item label="不允许更新版本" :label-width="formLabelWidth">
          <el-radio v-model="form.forbidUpdVersion.radio" label="none">无</el-radio>
          <el-radio v-model="form.forbidUpdVersion.radio" label="custom">自定义</el-radio>
          <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-if="form.forbidUpdVersion.radio==='custom'"></el-input>
        </el-form-item>
        <el-form-item label="不允许更新渠道" :label-width="formLabelWidth">
          <el-radio v-model="form.forbidUpdChannel.radio" label="none">无</el-radio>
          <el-radio v-model="form.forbidUpdChannel.radio" label="custom">自定义</el-radio>
          <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-if="form.forbidUpdChannel.radio==='custom'"></el-input>
        </el-form-item>
        <el-form-item label="是否公开" :label-width="formLabelWidth">
          <el-radio v-model="form.isPublic.radio" label="none">所有人更新</el-radio>
          <el-radio v-model="form.isPublic.radio" label="custom">内部人更新</el-radio>
          <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-if="form.isPublic.radio==='custom'"></el-input>
        </el-form-item>
        <el-form-item label="更新状态" :label-width="formLabelWidth">
          <el-radio v-model="form.updStatus.radio" label="none">启用</el-radio>
          <el-radio v-model="form.updStatus.radio" label="custom">禁用</el-radio>
        </el-form-item>
        <el-form-item label="更新客户端" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.checkList">
            <el-checkbox label="Android"></el-checkbox>
            <el-checkbox label="ios"></el-checkbox>
            <el-checkbox label="windows"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.updateTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="更新版本号" :label-width="formLabelWidth">
          <el-input v-model="form.version" autocomplete="off" placeholder="请输入更新版本号"></el-input>
        </el-form-item>
        <el-form-item label="更新类型" :label-width="formLabelWidth">
          <el-select v-model="form.update_type" placeholder="请选择更新类型">
            <el-option label="强更" value="1"></el-option>
            <el-option label="非强更" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更新方式" :label-width="formLabelWidth">
          <el-select v-model="form.update_way" placeholder="请选择更新方式">
            <el-option label="热更" value="1"></el-option>
            <el-option label="整包更新" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传资源包" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action
            accept="image/jpeg, image/png"
            :show-file-list="false"
            :on-change="handleChange"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :http-request="uploadFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="安卓配置" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-model="form.android"></el-input>
        </el-form-item>
        <el-form-item label="ios配置" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-model="form.ios"></el-input>
        </el-form-item>
        <el-form-item label="windows配置" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-model="form.windows"></el-input>
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
import SelectTime from "../../plugin/components/SelectTime";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import UserHandler from "../../script/handlers/UserHandler";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "hotUpdate",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
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
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
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
#hotUpdate-main .bd {
  padding-left: 20px;
}
#hotUpdate-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#hotUpdate-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#hotUpdate-main .bd >>> .el-button {
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

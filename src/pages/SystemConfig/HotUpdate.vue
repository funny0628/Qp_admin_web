<template>
  <div id="hotUpdate-main">
    <input-area>
      <div style="margin-bottom:10px;">
        <el-button type="primary" size="medium" @click="openAddDialog">添加</el-button>
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
        <el-table-column prop="version" label="更新版本" align="center"></el-table-column>
        <el-table-column prop="is_force" label="是否强更" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.is_force === 1">强更</span>
            <span v-if="scope.row.is_force === 0">非强更</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_type" label="类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.update_type === 1">热更</span>
            <span v-if="scope.row.update_type === 0">apk更新</span>
          </template>
        </el-table-column>
        <el-table-column prop="allow_version" label="允许版本" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.allow_version === '*'">所有</span>
          </template>
        </el-table-column>
        <el-table-column prop="allow_channel" label="允许渠道" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.allow_channel === '*'">所有</span>
          </template>
        </el-table-column>
        <el-table-column prop="platform" label="平台" align="center"></el-table-column>
        <el-table-column prop="is_public" label="版本公开" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.is_public === '*'">所有</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-if="scope.row.status === 2">禁止</span>
          </template>
        </el-table-column>
        <el-table-column prop="modified_time" label="更新时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.modified_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
          <el-radio v-model="form.versionUpd.radio" label="*">所有版本</el-radio>
          <el-radio v-model="form.versionUpd.radio" label="custom">自定义</el-radio>
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-if="form.versionUpd.radio==='custom'"
          ></el-input>
        </el-form-item>
        <el-form-item label="允许更新渠道" :label-width="formLabelWidth">
          <el-radio v-model="form.channelUpd.radio" label="*">所有版本</el-radio>
          <el-radio v-model="form.channelUpd.radio" label="custom">自定义</el-radio>
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-if="form.channelUpd.radio==='custom'"
          ></el-input>
        </el-form-item>
        <el-form-item label="不允许更新版本" :label-width="formLabelWidth">
          <el-radio v-model="form.forbidUpdVersion.radio" label="*">无</el-radio>
          <el-radio v-model="form.forbidUpdVersion.radio" label="custom">自定义</el-radio>
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-if="form.forbidUpdVersion.radio==='custom'"
          ></el-input>
        </el-form-item>
        <el-form-item label="不允许更新渠道" :label-width="formLabelWidth">
          <el-radio v-model="form.forbidUpdChannel.radio" label="*">无</el-radio>
          <el-radio v-model="form.forbidUpdChannel.radio" label="custom">自定义</el-radio>
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-if="form.forbidUpdChannel.radio==='custom'"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否公开" :label-width="formLabelWidth">
          <el-radio v-model="form.isPublic.radio" label="*">所有人更新</el-radio>
          <el-radio v-model="form.isPublic.radio" label="custom">内部人更新</el-radio>
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-if="form.isPublic.radio==='custom'"
          ></el-input>
        </el-form-item>
        <el-form-item label="更新状态" :label-width="formLabelWidth">
          <el-radio v-model="form.updStatus.radio" label="1">启用</el-radio>
          <el-radio v-model="form.updStatus.radio" label="2">禁用</el-radio>
        </el-form-item>
        <el-form-item label="更新客户端" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.checkList">
            <el-checkbox label="1">android</el-checkbox>
            <el-checkbox label="2">ios</el-checkbox>
            <el-checkbox label="3">windows</el-checkbox>
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
            <el-option label="非强更" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更新方式" :label-width="formLabelWidth">
          <el-select v-model="form.update_way" placeholder="请选择更新方式">
            <el-option label="热更" value="1"></el-option>
            <el-option label="整包更新" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传资源包" :label-width="formLabelWidth">
          <!-- <el-upload
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
          </el-upload>-->
          <div>
            <button @click="file"></button>
            <label ref="upload" style="position: relative;">
              <input
                type="file"
                @change="selectFile"
                style="position: absolute; width: 1px; height: 1px; opacity: 0; z-index: -1;"
              />
            </label>
          </div>
        </el-form-item>
        <el-form-item label="安卓配置" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-model="form.android"
          ></el-input>
        </el-form-item>
        <el-form-item label="ios配置" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-model="form.ios"></el-input>
        </el-form-item>
        <el-form-item label="windows配置" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-model="form.windows"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>{{form}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUpdateConf">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
         

<script>
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "hot_update",
  components: {
    InputArea
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
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
        checkList: ["1", "2", "3"],
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
        versionUpd: { radio: "*" },
        channelUpd: { radio: "*" },
        forbidUpdVersion: { radio: "*" },
        forbidUpdChannel: { radio: "*" },
        isPublic: { radio: "*" },
        updStatus: { radio: "1" },
        checkList: ["1", "2", "3"],
        updateTime: "",
        version: "",
        update_type: "",
        update_way: ""
      };
    },

    getHotUpdateList() {
      this.$http
        .get("v1/backend/sys-conf/hot-update", {
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
    openAddDialog() {
      this.resetForm();
      this.dialogTitle = "添加信息";
      this.dialogFormVisible = true;
    },
    addUpdateConf() {
      let data = {
        allow_version: this.form.versionUpd.radio,
        allow_channel: this.form.channelUpd.radio,
        deny_version: this.form.forbidUpdVersion.radio,
        deny_channel: this.form.forbidUpdChannel.radio,
        is_public: this.form.isPublic.radio,
        status: Number(this.form.updStatus.radio),
        clients: String(this.form.checkList),
        release_time: this.form.updateTime
          ? parseInt(new Date(Number(this.form.updateTime)).getTime() / 1000)
          : 0,
        version_num: this.form.version,
        is_force: Number(this.form.update_type),
        update_type: Number(this.form.update_way),
        game_info: "我是game_info"
      };
      this.$http.post("v1/backend/sys-conf/hot-update", data).then(res => {
        console.log(res);
      });
    },
    handleEdit(row) {
      console.log(index, row);
      this.dialogTitle = "编辑渠道";
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.channel_name = row.name;
      this.form.channel_id = row.code;
      this.form.belong_company = row.cname;
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
            .delete("v1/backend/sys-conf/hot-update", {
              params: {
                version_id: row.id
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.getHotUpdateList();
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
      this.pageSize = val;
      this.getHotUpdateList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getHotUpdateList();
    },
    // handleAvatarSuccess(res, file) {},
    // handleChange(file, fileList, info) {
    //   this.fileList[info] = fileList;
    // },
    // beforeUpload(file) {},
    // uploadFile() {
    //   let formData = new FormData();
    //   this.fileList.forEach(item => {
    //     formData.append("filename", item.raw);
    //     formData.append("types", 1);
    //   });
    //   this.$http.post("v1/backend/upload", formData).then(res => {
    //     if (res.data.code === 1) {
    //       this.imageUrl = res.data.path;
    //     }
    //   });
    // }
    file() {
        // 模拟点击file input触发选择文件，注意：不能在任何方式的回调里面执行此语句
        this.$refs.upload.click()
    },
    selectFile(event) {
        // 调用上传方法，传入选择的文件对象
        this.uploadFile(event.target.files[0], () => {
            // upload-success
        })
        // 重置file input控件的值
        event.target.value = ''
    }
  },
  mounted() {
    this.getHotUpdateList();
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

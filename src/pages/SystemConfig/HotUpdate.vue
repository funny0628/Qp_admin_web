<template>
  <div id="hotUpdate-main">
    <div class="mask" v-if="showProgress">
      <el-progress
        class="progress"
        v-if="showProgress"
        :text-inside="true"
        :stroke-width="26"
        :percentage="percentage"
      ></el-progress>
    </div>
    <input-area>
      <div style="margin-bottom:10px;">
        <el-button v-has="'add_hot_update'" type="primary" size="medium" @click="openAddDialog">添加</el-button>
      </div>
    </input-area>
    <div class="bd">
      <el-table
        v-has="'hot_update_records'"
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
            <span v-else>{{scope.row.allow_version}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="allow_channel" label="允许渠道" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.allow_channel === '*'">所有</span>
            <span v-else>{{scope.row.allow_channel}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="platform" label="平台" align="center" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.platform | formatPlatform}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="is_public" label="版本公开" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.is_public === '*'">所有</span>
            <span v-else>{{scope.row.is_public}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-if="scope.row.status === 2">禁止</span>
          </template>
        </el-table-column>
        <el-table-column prop="modified_time" label="更新时间" align="center" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.modified_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              v-has="'modify_hot_update'"
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              v-has="'delete_hot_update'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="65%">
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
            v-model="form.versionUpdCustom"
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
            v-model="form.channelUpdCustom"
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
            v-model="form.forbidUpdVersionCustom"
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
            v-model="form.forbidUpdChannelCustom"
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
            v-model="form.isPublicCustom"
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
          <el-upload
            element-loading-background="rgba(0, 0, 0, 0.5)"
            class="avatar-uploader"
            action
            accept=".zip"
            :show-file-list="false"
            :on-change="handleChange"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :http-request="uploadFile"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
          <!-- <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress> -->
        </el-form-item>
        <el-form-item label="安卓配置" :label-width="formLabelWidth">
          <el-input disabled type="textarea" autosize resize="none" v-model="form.androidConfig"></el-input>
        </el-form-item>
        <el-form-item label="ios配置" :label-width="formLabelWidth">
          <el-input disabled type="textarea" autosize resize="none" v-model="form.iosConfig"></el-input>
        </el-form-item>
        <el-form-item label="windows配置" :label-width="formLabelWidth">
          <el-input disabled type="textarea" autosize resize="none" v-model="form.windowsConfig"></el-input>
        </el-form-item>
      </el-form>
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
      formLabelWidth: "100px",
      dialogFormVisible: false,
      dialogVisible: false,
      tableData: [],
      form: {
        versionUpd: { radio: "*" },
        versionUpdCustom: "",
        channelUpd: { radio: "*" },
        channelUpdCustom: "",
        forbidUpdVersion: { radio: "*" },
        forbidUpdVersionCustom: "",
        forbidUpdChannel: { radio: "*" },
        forbidUpdChannelCustom: "",
        isPublic: { radio: "*" },
        isPublicCustom: "",
        updStatus: { radio: "1" },
        checkList: ["1", "2", "3"],
        updateTime: "",
        version: "",
        update_type: "",
        update_way: "",
        androidConfig: {},
        iosConfig: {},
        windowsConfig: {},
        game_info: ""
      },
      fileData: {
        file: {},
        num: 0,
        count: 0,
        version: "",
        total_size: 0,
        file_name: ""
      },
      formData: {},
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
      },
      loading: false,
      showProgress: false,
      percentage: 0
    };
  },
  filters: {
    formatPlatform: function(val) {
      let str = "";
      let arr = val.split(",");
      if (arr.length == 1) {
        if (arr[i] == 1) {
          str += "安卓";
        } else if (arr[i] == 2) {
          str += "ios";
        } else {
          str += "windows";
        }
        return str;
      } else {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == 1) {
            str += "安卓" + ",";
          } else if (arr[i] == 2) {
            str += "ios" + ",";
          } else {
            str += "windows";
          }
        }
        return str;
      }
    }
  },
  methods: {
    resetForm() {
      this.form = {
        versionUpd: { radio: "*" },
        versionUpdCustom: "",
        channelUpd: { radio: "*" },
        channelUpdCustom: "",
        forbidUpdVersion: { radio: "*" },
        forbidUpdVersionCustom: "",
        forbidUpdChannel: { radio: "*" },
        forbidUpdChannelCustom: "",
        isPublic: { radio: "*" },
        isPublicCustom: "",
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
      this.percentage = 0;
    },
    addUpdateConf() {
      let data = {
        allow_version:
          this.form.versionUpd.radio === "*"
            ? this.form.versionUpd.radio
            : this.form.versionUpdCustom,
        allow_channel:
          this.form.channelUpd.radio === "*"
            ? this.form.channelUpd.radio
            : this.form.channelUpdCustom,
        deny_version:
          this.form.forbidUpdVersion.radio === "*"
            ? this.form.forbidUpdVersion.radio
            : this.form.forbidUpdVersionCustom,
        deny_channel:
          this.form.forbidUpdChannel.radio === "*"
            ? this.form.forbidUpdChannel.radio
            : this.form.forbidUpdChannelCustom,
        is_public:
          this.form.isPublic.radio === "*"
            ? this.form.isPublic.radio
            : this.form.isPublicCustom,
        status: Number(this.form.updStatus.radio),
        clients: String(this.form.checkList),
        release_time: this.form.updateTime
          ? parseInt(new Date(Number(this.form.updateTime)).getTime() / 1000)
          : 0,
        version_num: this.form.version,
        is_force: Number(this.form.update_type),
        update_type: Number(this.form.update_way),
        game_info: this.form.game_info
      };
      this.$http.post("v1/backend/sys-conf/hot-update", data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.dialogFormVisible = false;
          this.getHotUpdateList();
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    handleEdit(row) {
      console.log(row);
      this.dialogTitle = "编辑";
      this.dialogFormVisible = true;
      this.form.id = row.id;
      if (row.allow_version === "*") {
        this.form.versionUpd.radio = row.allow_version;
      } else {
        this.form.versionUpd.radio = "custom";
        this.form.versionUpdCustom = row.allow_version;
      }
      if (row.allow_channel === "*") {
        this.form.channelUpd.radio = row.allow_channel;
      } else {
        this.form.channelUpd.radio = "custom";
        this.form.channelUpdCustom = row.allow_version;
      }
      if (row.deny_version === "*") {
        this.form.forbidUpdVersion.radio = row.deny_version;
      } else {
        this.form.forbidUpdVersion.radio = "custom";
        this.form.forbidUpdVersionCustom = row.deny_version;
      }
      if (row.deny_channel === "*") {
        this.form.forbidUpdChannel.radio = row.deny_channel;
      } else {
        this.form.forbidUpdChannel.radio = "custom";
        this.form.forbidUpdChannelCustom = row.deny_channel;
      }
      if (row.is_public === "*") {
        this.form.isPublic.radio = row.is_public;
      } else {
        this.form.isPublic.radio = "custom";
        this.form.isPublicCustom = row.is_public;
      }
      (this.form.updStatus.radio = String(row.status)),
        (this.form.checkList = row.platform.split(",")),
        (this.form.updateTime = row.release_time),
        (this.form.version = row.version),
        (this.form.update_type = String(row.is_force)),
        (this.form.update_way = String(row.update_type));
      this.form.androidConfig = this.formatResource(
        JSON.parse(row.game_info).android
      );
      this.form.iosConfig = this.formatResource(JSON.parse(row.game_info).ios);
      this.form.windowsConfig = this.formatResource(
        JSON.parse(row.game_info).windows
      );
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
    handleAvatarSuccess(res, file) {},
    handleChange(file, fileList) {
      console.log(fileList);
    },
    // currentChunk为上传文件块的索引
    uploadChunk(file, currentChunk) {
      var fileReader = new FileReader(),
        // 上传文件块的大小，可自定义
        chunkSize = 100 * 1024 * 1024,
        // 计算改文件的可分为多少块
        chunks = Math.ceil(file.size / chunkSize);
      console.log(chunks);
      var start = currentChunk * chunkSize;
      var end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      this.fileData.file = file.slice(start, end);
      this.fileData.num = currentChunk;
      this.fileData.version = this.form.version;
      this.fileData.count = chunks;
      this.fileData.total_size = file.size;
      this.fileData.file_name = file.name;
    },
    //处理单片文件的上传
    loadNext() {
      var start = currentChunk * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize;

      fileReader.readAsBinaryString(file.slice(start, end));
    },
    beforeUpload(file) {},
    uploadFile(f) {
      console.log(f.file);
      var file = f.file;
      var currentChunk = 0;
      let that = this;
      that.loading = true;
      that.showProgress = true;
      that.percentage = 0;
      function sectionUpload() {
        // 上传文件块的大小，可自定义
        var chunkSize = 100 * 1024 * 1024;
        // 计算改文件的可分为多少块
        var chunks = Math.ceil(file.size / chunkSize);
        console.log(chunks);
        var start = currentChunk * chunkSize;
        var end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;
        that.fileData.file = file.slice(start, end);
        that.fileData.num = currentChunk;
        that.fileData.version = that.form.version;
        that.fileData.count = chunks;
        that.fileData.total_size = file.size;
        that.fileData.file_name = file.name;
        // 用FormData传输文件对象
        let fd = new FormData();
        // 设置文件上传接口的需要的参数
        fd.append("file", that.fileData.file);
        fd.append("num", that.fileData.num);
        fd.append("count", that.fileData.count);
        fd.append("version", that.form.version);
        fd.append("total_size", that.fileData.total_size);
        fd.append("file_name", that.fileData.file_name);
        const config = {
          onUploadProgress: progressEvent => {
            console.log(progressEvent);
            // progressEvent.loaded:已上传文件大小
            // progressEvent.total:被上传文件的总大小
              that.percentage =
              Number(
                (((progressEvent.loaded + currentChunk * chunkSize) / file.size) * 100).toFixed(2)
              ) || 0;
          }
        };
        that.$http
          .post("v1/backend/sys-conf/hot-update/package", fd,config)
          .then(res => {
            console.log(res);
            if (res.data.code === 200) {
              currentChunk += 1;
              console.log(currentChunk);
              // that.percentage = Math.floor(100 / chunks) * currentChunk;
              if (currentChunk < chunks) {
                sectionUpload();
              }
              if (res.data.data.list) {
                // if (currentChunk == chunks) {
                //   that.percentage = 100;
                //   setTimeout(() => {
                //     that.showProgress = false;
                //   }, 1000);
                // }
                that.showProgress = false;
                that.form.game_info = JSON.stringify(res.data.data.list);
                // console.log(that.form.game_info)
                that.form.androidConfig = that.formatResource(
                  res.data.data.list.android
                );
                that.form.iosConfig = that.formatResource(
                  res.data.data.list.ios
                );
                that.form.windowsConfig = that.formatResource(
                  res.data.data.list.windows
                );
                that.loading = false;
                that.$message({
                  type: "success",
                  message: "资源包上传成功"
                });
              }
            } else {
              that.loading = false;
              this.showProgress = false;
              that.$message({
                type: "error",
                message: "资源包上传失败"
              });
            }
          });
      }
      sectionUpload();
    },
    formatResource(obj) {
      console.log(obj)
      var str = "";
      for (var key in obj) {
        let item = obj[key];
        str += key + "项目配置地址:";
        for (var k in item) {
          // return Object.values(k);
          str += item[k];
        }
        str += "\n";
      }
      return str;
    }
  },
  mounted() {
    this.getHotUpdateList();
    // var obj = {
    //   ODMwZGFm: {
    //     game_code: "ODMwZGFm",
    //     manifest_res: "/MDRjNDhi/Yjc1ZGI3/Users/macbookpro2/",
    //     resources_url: "windows1.0.5"
    //   },
    //   ZDg3MjVi: {
    //     game_code: "ZDg3MjVi",
    //     manifest_res: "/MDRjNDhi/Yjc1ZGI3/Users/macbookpro2/",
    //     resources_url: "windows1.0.5"
    //   }
    // };
    // const res = this.formatResource(obj);
    // console.log(res);
  }
};
</script>

<style scoped>
#hotUpdate-main .mask {
  /* width: 100%;
  height: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100000000000;
  background-color: rgba(0, 0, 0, 0.5);
}
#hotUpdate-main .mask .progress {
  margin-top: 25%;
  width: 60%;
  margin-left: 20%;
}
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

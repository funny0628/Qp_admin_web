<template>
  <div id="HallAdvertiseConf-main">
    <el-button type="danger" style="margin-top: 10px;margin-bottom: 10px;margin-left:20px;">删除</el-button>
    <el-button
      type="primary"
      style="margin-top: 10px;margin-bottom: 10px;"
      @click="openAddDialog"
    >添加</el-button>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="tableData"
        :page-info="pageInfo"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop === 'action'">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            </template>
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!--添加新渠道 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" enctype="multipart/form-data">
        <el-form-item label="渠道名" :label-width="formLabelWidth">
          <el-input v-model="form.channel_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="KEY" :label-width="formLabelWidth">
          <el-input v-model="form.channel_key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文字一" :label-width="formLabelWidth">
          <!-- <el-input
            type="textarea"
            show-word-limit
            clearable
            maxlength="30"
            :autosize="{minRows:1,maxRows:3}"
            resize="none"
            placeholder="请输入内容;最多只能写30个字;最多三行!"
            v-model="form.word1"
          ></el-input>-->
          <el-upload
            class="avatar-uploader"
            action
            :fileList="fileList.imgList1"
            accept="image/jpeg, image/png"
            :show-file-list="false"
            :headers="uploadHeaders"
            :on-change="(val1,val2,val3)=>handleChange(val1,val2,'imgList1')"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :http-request="val=>uploadFile('imgList1')"
          >
            <img v-if="imageUrl.imgList1" :src="imageUrl.imgList1" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div>{{fileList}}</div>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文字一类型" :label-width="formLabelWidth">
              <el-select v-model="form.word1_type" placeholder="请选择文字一类型">
                <el-option
                  v-for="(item,index) in wordTypeOpts"
                  :key="index"
                  :label="item.name"
                  :value="JSON.stringify(item.id)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.word1_type!=='704'" label="URL" :label-width="formLabelWidth">
              <el-input v-model="form.word1_url" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="跳转位置" :label-width="formLabelWidth">
              <el-select v-model="form.word1_jump_position" placeholder="请选择">
                <el-option
                  v-for="(item,index) in jumpPathOpts"
                  :key="index"
                  :label="item.name"
                  :value="JSON.stringify(item.id)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文字二" :label-width="formLabelWidth">
          <!-- <el-input
            type="textarea"
            v-model="form.name"
            :autosize="{minRows:1,maxRows:3}"
            resize="none"
            maxlength="30"
            placeholder="请输入内容;最多只能写30个字;最多三行!"
          ></el-input>-->
          <el-upload
            class="avatar-uploader"
            action
            :fileList="fileList.imgList2"
            accept="image/jpeg, image/png"
            :show-file-list="false"
            :headers="uploadHeaders"
            :on-change="(val1,val2,val3)=>handleChange(val1,val2,'imgList2')"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :http-request="val=>uploadFile('imgList2')"
          >
            <img v-if="imageUrl.imgList2" :src="imageUrl.imgList2" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文字二类型" :label-width="formLabelWidth">
              <el-select v-model="form.word2_type">
                <el-option
                  v-for="(item,index) in wordTypeOpts"
                  :key="index"
                  :label="item.name"
                  :value="JSON.stringify(item.id)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.word2_type!=='704'" label="URL" :label-width="formLabelWidth">
              <el-input v-model="form.word2_url" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="跳转位置" :label-width="formLabelWidth">
              <el-select v-model="form.word2_jump_position" placeholder="请选择">
                <el-option
                  v-for="(item,index) in jumpPathOpts"
                  :key="index"
                  :label="item.name"
                  :value="JSON.stringify(item.id)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文字三" :label-width="formLabelWidth">
          <!-- <el-input type="textarea" maxlength="30" placeholder="请输入内容;最多只能写30个字;最多三行!"></el-input> -->
          <el-upload
            class="avatar-uploader"
            action
            :fileList="fileList.imgList3"
            accept="image/jpeg, image/png"
            :show-file-list="false"
            :headers="uploadHeaders"
            :on-change="(val1,val2,val3)=>handleChange(val1,val2,'imgList3')"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :http-request="val=>uploadFile('imgList3')"
          >
            <img v-if="imageUrl.imgList3" :src="imageUrl.imgList3" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文字三类型" :label-width="formLabelWidth">
              <el-select v-model="form.word3_type">
                <el-option
                  v-for="(item,index) in wordTypeOpts"
                  :key="index"
                  :label="item.name"
                  :value="JSON.stringify(item.id)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.word3_type!=='704'" label="URL" :label-width="formLabelWidth">
              <el-input v-model="form.word3_url" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="跳转位置" :label-width="formLabelWidth">
              <el-select v-model="form.word3_jump_position" placeholder="请选择">
                <el-option
                  v-for="(item,index) in jumpPathOpts"
                  :key="index"
                  :label="item.name"
                  :value="JSON.stringify(item.id)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>{{form}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewChannel">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <!-- 添加宣传页 -->
      <el-dialog title="添加宣传页" :visible.sync="dialogVisible" width="40%" center>
        <el-form :model="form2">
          <el-form-item>
            <table style="width: 80%;" cellspacing="0" cellpadding="10" border="1">
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">选择渠道</td>
                <td style="text-align: center">
                  <el-select v-model="form.region" placeholder="请选择渠道">
                    <el-option label="渠道一" value></el-option>
                    <el-option label="渠道二" value></el-option>
                  </el-select>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <table
              border="1"
              style="border-color: #c0c4cc;width: 80%;"
              cellspacing="0"
              cellpadding="10"
            >
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">上传内容1</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">海报类型</td>
                <td style="text-align: center">轮播海报</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">选择动作类型</td>
                <td style="text-align: center">跳转</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">跳转地址</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <table
              border="1"
              style="border-color: #c0c4cc;width: 80%;"
              cellspacing="0"
              cellpadding="10"
            >
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">上传内容2</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">海报类型</td>
                <td style="text-align: center">轮播海报</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">选择动作类型</td>
                <td style="text-align: center">复制</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">复制内容</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <table
              border="1"
              style="border-color: #c0c4cc;width: 80%;"
              cellspacing="0"
              cellpadding="10"
            >
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">上传内容3</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">海报类型</td>
                <td style="text-align: center">轮播海报</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">选择动作类型</td>
                <td style="text-align: center">加入游戏</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">选择游戏</td>
                <td style="text-align: center">
                  <el-select v-model="form.region" placeholder="请选择游戏类型">
                    <el-option label="游戏一" value></el-option>
                    <el-option label="游戏二" value></el-option>
                    <el-option label="游戏三" value></el-option>
                  </el-select>
                </td>
              </tr>
            </table>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
  name: "HallAdvertiseConf",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  data() {
    /*校验手机号*/
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        if (/^[1][345789]\d{9}$/.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      dialogTitle: "",
      fileName: "",
      pageNum: 1,
      pageSize: 5,
      total: 0,
      formLabelWidth: "120px",
      value: true,
      dialogModifyVisible: false,
      dialogVisible: false,
      labelPosition: "left", //左对齐
      activeName: "first",
      tableStyle: [
        { label: "渠道名称", prop: "channel", width: "" },
        { label: "KEY", prop: "channel_key", width: "" },
        { label: "文字一", prop: "pic_one_url", width: "" },
        { label: "文字二", prop: "pic_two_url", width: "" },
        { label: "文字三", prop: "pic_three_url", width: "" },
        { label: "操作时间", prop: "create_time", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tableData: [],
      pageInfo: new PageInfo(1, [5, 10, 15, 20], 6),
      dialogFormVisible: false,
      jumpposOpts: [
        { label: "vip", value: "vip" },
        { label: "全民代理", value: "agent" },
        { label: "客服", value: "server" },
        { label: "兑换", value: "exchange" },
        { label: "充值", value: "recharge" },
        { label: "活动", value: "active" },
        { label: "绑定手机", value: "bind_phone" },
        { label: "返水", value: "return" },
        { label: "vip福利", value: "vip_reward" },
        { label: "签到", value: "attendance" }
      ],
      form: {
        channel_name: "",
        channel_key: "",
        word1: "",
        word1_type: "701",
        word1_url: "",
        word1_jump_position: "",
        word2: "",
        word2_type: "701",
        word2_url: "",
        word2_jump_position: "",
        word3: "",
        word3_type: "701",
        word3_url: "",
        word3_jump_position: ""
      },
      wordTypeOpts: [],
      jumpPathOpts: [],
      form2: {
        name: ""
      },
      formLabelWidth: "100px",
      fileList: {
        imgList1: [],
        imgList2: [],
        imgList3: []
      }, //上传图片保存的图片信息列表
      imageUrl: {
        imgList1: "",
        imgList2: "",
        imgList3: ""
      },
      uploadHeaders: {
        Authorization: "application/json"
      }
    };
  },
  methods: {
    resetForm() {
      this.form = {
        channel_name: "",
        channel_key: "",
        word1: "",
        word1_type: "701",
        word1_url: "",
        word1_jump_position: "",
        word2: "",
        word2_type: "701",
        word2_url: "",
        word2_jump_position: "",
        word3: "",
        word3_type: "701",
        word3_url: "",
        word3_jump_position: ""
      };
    },
    //获取图片类型列表
    getPicTypeList() {
      this.$http
        .get("api/lobby/name_type", {
          params: {
            type_id: 7
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.wordTypeOpts = res.data.data;
          }
        });
    },
    //获取跳转路径列表
    getJumpPathList() {
      this.$http
        .get("api/lobby/name_type", {
          params: {
            type_id: 8
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.jumpPathOpts = res.data.data;
          }
        });
    },
    getAdvertiseConfList() {
      this.$http
        .get("api/lobby/flyer", {
          params: {
            page: 1,
            limit: 10
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
        });
    },
    openAddDialog() {
      this.dialogFormVisible = true;
      this.getPicTypeList();
      this.resetForm();
    },
    addNewChannel() {
      if (!this.form.id) {
        let data = {
          name: this.form.channel_name,
          key: this.form.channel_key,
          name_one: "我是图片一",
          url_one: this.imageUrl.imgList1,
          type_one: Number(this.form.word1_type),
          jump_id_one: Number(this.form.word1_jump_position),
          name_two: "我是图片二",
          url_two: this.imageUrl.imgList2,
          type_two: Number(this.form.word2_type),
          jump_id_two: Number(this.form.word2_jump_position),
          name_three: "我是图片三",
          url_three: this.imageUrl.imgList3,
          type_three: Number(this.form.word3_type),
          jump_id_three: Number(this.form.word3_jump_position)
        };
        this.$http.post("api/lobby/flyer", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getAdvertiseConfList();
          }
        });
      } else {
        let data = {
          banner_id: this.form.id,
          name: this.form.channel_name,
          key: this.form.channel_key,
          name_one: "我是图片一",
          url_one: this.imageUrl.imgList1,
          type_one: JSON.parse(this.form.word1_type),
          jump_id_one: JSON.parse(this.form.word1_jump_position),
          name_two: "我是图片二",
          url_two: this.imageUrl.imgList2,
          type_two: JSON.parse(this.form.word2_type),
          jump_id_two: JSON.parse(this.form.word2_jump_position),
          name_three: "我是图片三",
          url_three: this.imageUrl.imgList3,
          type_three: JSON.parse(this.form.word3_type),
          jump_id_three: JSON.parse(this.form.word3_jump_position)
        };
        this.$http.put("api/lobby/flyer", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getAdvertiseConfList();
          }
        });
      }
    },
    handleEdit(row) {
      console.log(row);
      this.getPicTypeList();
      this.getJumpPathList();
      this.dialogFormVisible = true;
      this.dialogTitle = "更新渠道信息";
      this.form.id = row.id;
      this.form.channel_name = row.channel;
      this.form.channel_key = row.channel_key;
      this.form.word1_type = JSON.stringify(row.pic_one_type);
      this.form.word1_url = row.pic_one_url;
      this.form.word2_type = JSON.stringify(row.pic_two_type);
      this.form.word2_url = row.pic_two_url;
      this.form.word3_type = JSON.stringify(row.pic_three_type);
      this.form.word3_url = row.pic_three_url;
      this.form.word1_jump_position = JSON.stringify(row.jump_id_one);
      this.form.word2_jump_position = JSON.stringify(row.jump_id_two);
      this.form.word3_jump_position = JSON.stringify(row.jump_id_three);
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
            .delete("api/lobby/flyer", {
              params: {
                id: row.id
              }
            })
            .then(res => {
              if (res.data.code === 1) {
                this.getAdvertiseConfList();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**搜索*/
    search() {},
    pageNumFn(val) {
      console.log(val, this.pageSize, this.pageNum);
      this.pageNum = val;
    },
    pageSizeFn(val) {
      console.log(val);
      this.pageSize = val;
    },
    handleAvatarSuccess(res, file) {},
    handleChange(file, fileList, info) {
      this.fileList[info] = fileList;
    },
    beforeUpload(file) {},
    uploadFile(info) {
      let formData = new FormData();
      this.fileList[info].forEach(item => {
        formData.append("filename", item.raw);
        formData.append("types", 1);
      });
      this.$http.post("api/upload", formData).then(res => {
        if (res.data.code === 1) {
          this.imageUrl[info] = res.data.path;
        }
      });
    }
  },
  watch: {
    "form.word1_type": function(newVal, oldVal) {
      console.log(newVal);
      if (newVal === "704") {
        this.getJumpPathList();
      }
      if (newVal === "702" || ("703" && newVal !== "701")) {
        this.$nextTick(() => {
          this.form.word1_url = this.form.word1;
        });
      } else {
        this.$nextTick(() => {
          this.form.word1_url = "";
        });
      }
    }
  },
  mounted() {
    this.getAdvertiseConfList();
  }
};
</script>

<style scoped>
#HallAdvertiseConf-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#HallAdvertiseConf-main .bd p {
  margin: 0;
}
#HallAdvertiseConf-main .bd >>> .el-button {
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

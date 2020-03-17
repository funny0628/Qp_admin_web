<template>
  <div id="DefaultAvatarUpload-main">
    <div
      style="background-color: #0077f9;height: 30px;color: #fff;margin: 20px 20px 0 20px;line-height: 30px;padding-left: 10px;"
    >默认头像</div>
    <div class="bd">
      <div class="img-container">
        <div class="img-item" v-for="n in 8" :key="n">
          <!-- <img src="../../assets/img/default.png" alt />
          <el-button type="primary" style="margin-top: 10px;" @click="dialogVisible=true">上传头像</el-button>-->
          <el-upload
            class="avatar-uploader"
            accept="image/jpeg,image/jpg,image/png"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary">上传头像</el-button>
        </div>
      </div>
      <el-button type="primary" style="margin-top: 20px;" @click="dialogVisible=true">上传头像设置</el-button>
    </div>
    <!-- 上传头像 -->
    <el-dialog title="添加音乐" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form2">
        <el-form-item>
          <table style="width: 80%;" cellspacing="0" cellpadding="10">
            <tr>
              <td style="width: 150px;text-align: center;background-color:#f2f2f2;">音乐名称</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off"></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 150px;text-align: center;background-color:#f2f2f2;">添加音乐链接</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off"></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 150px;text-align: center;background-color:#f2f2f2;">备注</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off"></el-input>
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
  name: "DefaultAvatarUpload",
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
      imageUrl: '',
      value: true,
      dialogModifyVisible: false,
      dialogVisible: false,
      labelPosition: "left", //左对齐
      activeName: "first",
      tableStyle: [
        { label: "等级ID", prop: "class_id", width: "" },
        { label: "VIP等级", prop: "vip_class", width: "" },
        { label: "充值金额", prop: "change_money", width: "" },
        { label: "VIP特权", prop: "vip_privilege", width: "" },
        { label: "头像", prop: "avatar", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tableData: [
        {
          class_id: "1",
          vip_class: "vip0",
          change_money: "0",
          vip_privilege: "0",
          avatar: "",
          action: "修改"
        },
        {
          class_id: "2",
          vip_class: "vip0",
          change_money: "0",
          vip_privilege: "0",
          avatar: "",
          action: "修改"
        },
        {
          class_id: "3",
          vip_class: "vip0",
          change_money: "0",
          vip_privilege: "0",
          avatar: "",
          action: "修改"
        }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogFormVisible: false,
      form: {
        name: ""
      },
      form2: {
        name: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log('我触发了？')
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log('我出发了？')
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
#DefaultAvatarUpload-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#DefaultAvatarUpload-main .bd p {
  margin: 0;
}
.img-container {
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.img-item {
  text-align: center;
}
#DefaultAvatarUpload-main .bd .img-container .img-item .el-button--primary {
  margin-left: 0;
  margin-top: 10px;
}
table {
  border-collapse: collapse;
  margin: 0 auto;
}
table,
table tr td {
  border: 1px solid #c0c4cc;
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

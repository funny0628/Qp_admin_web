<template>
  <div
    id="MoneyTree"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <!-- title -->
    <div class="title">
      <el-button type="primary" @click="add">添加</el-button>
      <el-button type="primary" @click="send(2)">发送服务器配置</el-button>
    </div>
    <!-- table -->
    <div class="table">
      <el-table
        :data="tableData"
        highlight-current-row
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="level"
          label="等级"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="draw_num"
          label="摇奖次数"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="icon_cash_cow_url"
          label="摇钱树图标展示"
          align="center"
          width="260"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <img :src="$baseUrl + scope.row.icon_cash_cow_url" />
          </template>
        </el-table-column>
        <el-table-column
          prop="award_coin"
          label="全任务金币奖励"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="growth_value"
          label="升级所属成长值"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="weight_info"
          label="摇一摇奖励"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- form -->
    <div class="form">
      <el-dialog
        :title="title"
        :visible.sync="visible"
        :destroy-on-close="true"
        width="60%"
      >
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-width="150px"
          style="margin-top:20px"
        >
          <el-form-item label="摇钱树等级" prop="level">
            <el-input
              style="width:220px"
              v-model="form.level"
              placeholder="摇钱树等级"
            ></el-input>
          </el-form-item>
          <el-form-item label="升级所需成长值" prop="growth_value">
            <el-input
              style="width:220px"
              v-model="form.growth_value"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="抽奖次数" prop="award_coin">
            <el-input
              style="width:220px"
              v-model="form.award_coin"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="摇钱树图展示" prop="icon_cash_cow_url">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="upLoad"
              :before-upload="beforeAvatarUpload"
              :limit="1"
            >
              <img
                v-if="form.icon_cash_cow_url"
                :src="form.icon_cash_cow_url"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="全任务金币奖励数量" prop="draw_num">
            <el-input
              style="width:220px"
              v-model="form.draw_num"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="摇一摇金币奖励数量" prop="weight_info">
            <el-input
              style="width:220px"
              v-model="form.weight_info"
              placeholder="1=2 ... 以 , 分隔"
            ></el-input>
            <p>(金额1=权重1,金额2=权重2,...以 , 分隔)</p>
          </el-form-item>
        </el-form>
        <div style="margin-top:20px" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form', title)"
            >保 存</el-button
          >
          <el-button type="primary" @click="back()">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DeepData from "../../../assets/js/formate.js";
export default {
  data() {
    return {
      tableData: [],
      visible: false,
      form: {
        level: "",
        growth_value: "",
        award_coin: "",
        draw_num: "",
        icon_cash_cow_url: "xxxx",
        weight_info: ""
      },
      rules: {
        level: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        growth_value: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        award_coin: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        draw_num: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        icon_cash_cow_url: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        weight_info: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      title: "新增等级",
      keys: "",
      id: "",
      allData: {},
      servebg_url: "",
      loading: false
    };
  },
  created() {
    this.initData();
  },
  methods: {
    add() {
      this.editForm(true, "新增", {});
    },
    async send(type) {
      //发送post
      let resTable = DeepData(this.tableData);
      resTable.forEach(item => {
        let formInfo = item.weight_info;
        let formWeight = [];
        let formObj = {};
        if (formInfo.search(",") !== -1) {
          //有 , 号
          formWeight = formInfo.split(",");
          let obj = {};
          formWeight.forEach((item, index) => {
            item = item.split("=");
            obj[index + 1] = { coin: item[0], weight: item[1] };
          });
          // console.log(obj);
          formObj = obj;
        } else {
          //没有 ,
          formWeight = formInfo.split("=");
          let obj1 = {};

          obj1[formWeight.length - 1] = {
            coin: formWeight[0],
            weight: formWeight[1]
          };
          formObj = obj1;
        }
        item.weight_info = formObj;
      });
      let objData = {};
      resTable.forEach((item, index) => {
        objData[index + 1] = item;
      });
      Object.keys(this.allData).forEach(item => {
        if (this.allData[item].ac_type === "10003") {
          this.allData[item].ac_content.cash_cow = objData;
        }
      });
      console.log(this.allData);

      let { data } = await this.$http.HallFunConfig.PostActivityNew3({
        keys: this.keys,
        values: JSON.stringify(this.allData),
        id: this.id
      });
      console.log(data);
      if (data.code === 1 && data.msg === "ok") {
        if (type === 1) {
          this.loading = false;
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        } else {
          // this.initData();
          this.loading = false;
          this.$message({
            type: "success",
            message: "发送服务器配置成功!"
          });
        }
      } else {
        if (type === 1) {
          this.loading = false;
          this.$message({
            type: "success",
            message: "保存失败!"
          });
        } else {
          this.loading = false;
          this.$message({
            type: "warning",
            message: "发送服务器配置失败!"
          });
        }
        
      }
    },

    upLoad(file) {
      const formData = new FormData();
      formData.append("filename", file.file);
      formData.append("types", 1);
      this.$http.post("v1/backend/upload", formData).then(data => {
        if (data.data.code === 1 && data.data.msg === "ok") {
          this.servebg_url = data.data.path;
          this.form.icon_cash_cow_url = URL.createObjectURL(file);
        }
      });
    },
    beforeAvatarUpload(file) {
      if (file) {
        this.form.icon_cash_cow_url = URL.createObjectURL(file);
      }
    },
    onSubmit() {
      this.form.icon_cash_cow_url = this.servebg_url;
      this.tableData.push(this.form);
      this.send(1);
      this.editForm(false, "新增", {});
    },
    back() {
      this.editForm(false, "新增", {});
    },
    editForm(visible, title, form) {
      this.visible = visible;
      this.title = title;
      this.form = form;
    },

    async initData() {
      let { data } = await this.$http.HallFunConfig.GetActivityNew3({
        key: "activity_new.lua"
      });
      console.log(data);
      this.keys = data.data[0].sys_key;
      this.id = data.data[0].id;
      let res = data.data[0].sys_val;
      this.allData = JSON.parse(res);
      console.log(this.allData);
      Object.keys(this.allData).forEach(item => {
        if (this.allData[item].ac_type === "10003") {
          this.tableData = Object.values(
            this.allData[item].ac_content.cash_cow
          );
        }
      });

      this.tableData.forEach(item => {
        let weight = "";
        Object.values(item.weight_info).forEach(it => {
          item.weight_info = weight += `${it.coin}=${it.weight},`;
          item.weight_info = item.weight_info.substring(
            0,
            item.weight_info.lastIndexOf(",")
          );
        });
      });
      console.log(this.tableData, this.allData);
    }
  }
};
</script>

<style lang="less" scoped>
#MoneyTree {
  .title {
    margin-top: 20px;
  }
  .table {
    margin: 20px;
    img {
      width: 100%;
      object-fit: scale-down;
    }
  }
  .form {
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
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      border: 1px dashed #ccc;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      border: 1px dashed #ccc;
    }
  }
}
</style>

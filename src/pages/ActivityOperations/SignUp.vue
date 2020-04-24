<template>
  <div
    id="SignUp"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <div class="title">
      <div class="VIP">签到配置</div>
    </div>
    <el-button type="primary" @click="send('form', 1)">保存</el-button>
    <el-button type="primary" @click="send('form', 2)">发送到服务器</el-button>
    <div class="contain">
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        label-width="150px"
        label-position="right"
      >
        <el-form-item label="签到门槛" prop="need_coin">
          <el-input style="width:200px" v-model="form.need_coin"></el-input>
        </el-form-item>
        <el-form-item label="签到奖励" prop="award_coin">
          <el-input style="width:200px" v-model="form.award_coin"></el-input>
        </el-form-item>
        <el-form-item label="月俸禄领取门槛" prop="salary_days">
          <el-input style="width:200px" v-model="form.salary_days"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        need_coin: "",
        award_coin: "",
        salary_days: ""
      },
      rules: {
        need_coin: [{ required: true, message: "不可以为空", trigger: "blur" }],
        award_coin: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        salary_days: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ]
      },
      keys: "",
      id: "",
      allData: {},
      loading: false
    };
  },
  created() {
    this.initData();
  },
  methods: {
    send(formName, type) {
      // console.log(this.allData);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (type === 1) {
            let { data } = await this.$http.HallFunConfig.PutServerConfig({
              keys: this.keys,
              values: JSON.stringify(this.allData),
              id: this.id
            });
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            }
          } else if (type === 2) {
            this.loading = true;
            let { data } = await this.$http.HallFunConfig.PostServerConfig({
              keys: this.keys,
              values: JSON.stringify(this.allData),
              id: this.id
            });
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.loading = false;
              this.$message({
                type: "success",
                message: "发送服务器配置成功!"
              });
            } else {
              this.loading = false;
              this.$message({
                type: "warning",
                message: "发送服务器配置失败!"
              });
            }
          }
        } else {
          this.$message({
            type: "warning",
            message: "必填的项不可以为空!"
          });
          return false;
        }
      });
    },
    async initData() {
      let { data } = await this.$http.HallFunConfig.GetServerConfig({
        key: "activity_new.lua"
      });
      //   console.log(data);
      this.keys = data.data[0].sys_key;
      this.id = data.data[0].id;
      let res = data.data[0].sys_val;
      this.allData = JSON.parse(res);
      //   console.log(this.keys, this.id, this.allData);
      Object.keys(this.allData).forEach(item => {
        if (this.allData[item].ac_type === "10005") {
          this.form = this.allData[item];
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#SignUp {
  // height: 500px;
  background-color: #f2f2f2;
  border: 1px solid #efefef;
  box-shadow: 1px 1px 2px #efefef;
  .title {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid#eee;
    margin-bottom: 20px;
    .VIP {
      font-size: 14px;
      width: 120px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
    }
  }
  .contain {
    margin-top: 20px;
  }
}
</style>

<template>
  <div
    id="S_BasicDeploy"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <el-button
      style="margin-bottom:10px"
      type="primary"
      @click="submitForm('ruleForm', 1)"
      >保存</el-button
    >
    <el-button
      style="margin-bottom:10px"
      type="primary"
      @click="submitForm('ruleForm', 2)"
      >发送到服务器配置</el-button
    >
    <!-- form -->

    <div class="form">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="单线下注金额" prop="bet_range">
          <el-input
            style="width:200px"
            v-model="ruleForm.bet_range"
            placeholder="房间名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="获得彩金比例" prop="caijin_rate">
          <el-input
            style="width:200px"
            v-model="ruleForm.caijin_rate[0]"
            placeholder="3=5"
          ></el-input>
          -
          <el-input
            style="width:200px"
            v-model="ruleForm.caijin_rate[1]"
            placeholder="3=5"
          ></el-input>
          -
          <el-input
            style="width:200px"
            v-model="ruleForm.caijin_rate[2]"
            placeholder="3=5"
          ></el-input>
          <p>
            3=50，三个777连线获得奖金占奖池的50%，4，四个777连线。。。，5，5个777连线
          </p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        caijin_rate: [],
        bet_range: ""
      },
      rules: {},
      id: 0,
      keys: "",
      loading: false
    };
  },

  async created() {
    let { data } = await this.$http.HallFunConfig.Gettiger_rate({
      key: "tiger_rate.lua"
    });
    // console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    // console.log(res);
    this.ruleForm = res.bet_caijin;
  },

  methods: {
    submitForm(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // console.log(this.ruleForm);
          if (type === 1) {
            //put
            let { data } = await this.$http.HallFunConfig.Puttiger_rate({
              keys: this.keys,
              values: JSON.stringify({ bet_caijin: this.ruleForm }),
              id: this.id
            });
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            }else{
            this.$message({
              type: "warning",
              message: "保存失败!"
            });
          }
          } else if (type === 2) {
            // post
            this.loading = true;

            let { data } = await this.$http.HallFunConfig.Posttiger_rate({
              keys: this.keys,
              values: JSON.stringify({ bet_caijin: this.ruleForm }),
              id: this.id
            });
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.loading = false;
              this.$message({
                type: "success",
                message: "发送服务器配置成功!"
              });
            }else {
              this.loading = false;
              this.$message({
                type: "warning",
                message: "发送服务器配置失败!"
              });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style></style>

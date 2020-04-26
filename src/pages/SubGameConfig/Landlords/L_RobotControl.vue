<template>
  <div
    id="L_RobotControl"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <el-button type="primary" @click="submitForm('ruleForm', 1)">保存</el-button
    ><el-button type="primary" @click="submitForm('ruleForm', 2)"
      >发送到服务器配置</el-button
    >
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="斗地主-低倍场" :name="namelist[0]"></el-tab-pane>
        <el-tab-pane label="斗地主-中倍场" :name="namelist[1]"></el-tab-pane>
        <el-tab-pane label="斗地主-高倍场" :name="namelist[2]"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- form -->

    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="机器人总数" prop="count">
          <el-input
            style="width:200px"
            v-model="ruleForm.count"
            placeholder="0"
          ></el-input>
        </el-form-item>

        <el-form-item label="携带范围" prop="coins_range">
          <el-input
            style="width:200px"
            v-model="ruleForm.coins_range"
            placeholder="0"
          ></el-input>
          (格式如：1,2）
        </el-form-item>
        <el-form-item label="携带金币总额(元)" prop="total_coin">
          <el-input
            style="width:200px"
            v-model="ruleForm.total_coin"
            placeholder="0"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      ruleForm: {
        count: "",
        coins_range: "",
        total_coin: ""
      },
      rules: {
        count: [{ required: true, message: "不可以为空", trigger: "blur" }],
        coins_range: [{ required: true, message: "不可以为空", trigger: "blur" }],
        total_coin: [{ required: true, message: "不可以为空", trigger: "blur" }],
      },
      namelist: [],
      id: 0,
      keys: "",
      resData: {},
      loading: false
    };
  },

  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.Getddz_robot_control({
      key: "ddz_robot_control.lua"
    });
    // console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    // console.log(res);
    this.resData = res;
    this.namelist = Object.keys(res);
    this.ruleForm = res[this.namelist[0]];
    this.activeName = this.namelist[0];
    // console.log(this.resData, this.ruleForm);
  },

  methods: {
    handleClick(tab) {
      this.namelist.forEach(item => {
        if (item === tab.name) {
          this.ruleForm = this.resData[item];
        }
      });
    },

    submitForm(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(this.resData, this.ruleForm);

          if (type === 1) {
            //put
            let { data } = await this.$http.HallFunConfig.Putddz_robot_control({
              keys: this.keys,
              values: JSON.stringify(this.resData),
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
            //post
            this.loading = true;
            //发送post
            let { data } = await this.$http.HallFunConfig.Postddz_robot_control({
              keys: this.keys,
              values: JSON.stringify(this.list),
              id: this.id
            });
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.loading = false;
              this.$message({
                type: "success",
                message: "发送到服务器配置成功!"
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
          console.log("error");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#L_RobotControl {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    padding: 10px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
  .form {
    padding:  20px;
  }
}
</style>

<template>
  <div id="F_RobotControl"  v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)">
    <el-button type="primary" @click="submitForm('ruleForm', 1)">保存</el-button
    ><el-button type="primary" @click="submitForm('ruleForm', 2)"
      >发送到服务器配置</el-button
    >
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="金花-低倍场" name="zjh_junior"></el-tab-pane>
        <el-tab-pane label="金花-中倍场" name="zjh_normal"></el-tab-pane>
        <el-tab-pane label="金花-高倍场" name="zjh_three"></el-tab-pane>
        <el-tab-pane label="金花-土豪场" name="zjh_four"></el-tab-pane>
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

        <el-form-item label="单场机器人的数量及概率" prop="num_rate">
          <el-input
            style="width:200px"
            v-model="ruleForm.num_rate"
            placeholder="0"
          ></el-input
          >（格式如：3=40,4=40,5=20）
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
        <el-form-item label="离桌率(百分比)" prop="exit_rate">
          <el-input
            style="width:200px"
            v-model="ruleForm.exit_rate"
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
      activeName: "zjh_junior",
      ruleForm: {
        count: "",
        num_rate: "",
        coins_range: "",
        total_coin: "",
        exit_rate: ""
      },
      rules: {
        count: [{ required: true, message: "不可以为空", trigger: "blur" }],
        num_rate: [{ required: true, message: "不可以为空", trigger: "blur" }],
        coins_range: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        total_coin: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        exit_rate: [{ required: true, message: "不可以为空", trigger: "blur" }]
      },
      id: 0,
      keys: "",
      loading: false,
      resData: {}
    };
  },

  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.GetServerConfig({
      key: "zjh_robot_control.lua"
    });
    // console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    // console.log(res);
    this.resData = res;
    this.ruleForm = res.zjh_junior;

    // console.log(this.resData, this.ruleForm);
  },

  methods: {

    //tab切换
    handleClick(tab) {
      Object.keys(this.resData).forEach(item => {
        if (item === tab.name) {
          this.ruleForm = this.resData[item];
        }
      });
    },

    //保存和配置到服务器
    submitForm(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //1.先拿到要发送到后台的数据
          // console.log(this.ruleForm, this.resData);
          //2.判断类型
          if (type == 1) {
            //发送put

            let { data } = await this.$http.HallFunConfig.PutServerConfig({
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
            }
          } else if (type === 2) {
            this.loading = true
            //发送post
            let { data } = await this.$http.HallFunConfig.PostServerConfig({
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
#F_RobotControl {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    padding: 10px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
  .form {
    padding: 0px 10px;
  }
}
</style>

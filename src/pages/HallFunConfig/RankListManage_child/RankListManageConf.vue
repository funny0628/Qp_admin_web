<template>
  <div id="RankListManageConf">
    <!-- 头部 -->
    <div class="title">
      排行榜配置
      <span class="send" @click="send">发送到服务器配置</span>
    </div>
    <!-- form -->
    <div class="form">
      <el-form
        v-loading="loading"
        element-loading-text="正在发送中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.6)"
        :model="ruleForm"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="排行榜显示配置">
          <el-checkbox-group v-model="showList">
            <el-checkbox :label="1">今日赚钱排行</el-checkbox>
            <el-checkbox :label="2">今日提现排行</el-checkbox>
            <el-checkbox :label="3">在线时长排行</el-checkbox>
          </el-checkbox-group>
          <span> 排行榜显示设置</span>
        </el-form-item>

        <el-form-item label="金币上榜条件" prop="coins">
          <el-input v-model="ruleForm.coins"></el-input>
          <span>金币上榜条件（元）</span>
        </el-form-item>

        <el-form-item label="提现上榜条件" prop="fech">
          <el-input v-model="ruleForm.fech"></el-input>
          <span>提现上榜条件（元）</span>
        </el-form-item>

        <el-form-item label="在线时长" prop="time">
          <el-input v-model="ruleForm.time"></el-input>
          <span>在线时长 上榜条件(秒)</span>
        </el-form-item>

        <el-form-item label="刷新时间" prop="refresh_time">
          <el-input v-model="ruleForm.refresh_time"></el-input>
          <span>刷新时间(分)</span>
        </el-form-item>

        <el-form-item label="机器人数值改变概率" prop="robot_change_rate">
          <el-input v-model="ruleForm.robot_change_rate"></el-input>
          <span>机器人数值改变概率(0 - 100数字)</span>
        </el-form-item>
        <el-form-item label="机器人数值改变范围倍数（小）">
          <el-input-number
            size="medium"
            v-model="ruleForm.robot_change_min"
          ></el-input-number
          >&nbsp;&nbsp; - &nbsp;&nbsp;
          <el-input-number
            size="medium"
            v-model="ruleForm.robot_change_max"
          ></el-input-number>
          <p>机器人数值改变范围倍数{0,10000}</p>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showList: [],
      id: 0,
      keys: "",
      loading: false,
      ruleForm: {
        show: {},
        coins: "",
        fech: "",
        time: "",
        refresh_time: "",
        robot_change_rate: "",
        robot_change_min: "",
        robot_change_max: ""
      },
      rules: {
        coins: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        fech: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        refresh_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        robot_change_rate: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        robot_change_min: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        robot_change_max: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      }
    };
  },
  async created() {
    let { data } = await this.$http.HallFunConfig.GetServerConfig({
      key: "rank_control.lua"
    });
    // console.log(data.data);
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    this.ruleForm = res;

    Object.keys(res.show).forEach(key => {
      console.log(key, res.show[key]);
      if (res.show[key] === "on") {
        this.showList.push(+key);
      }
    });
    // console.log(this.showList);
  },
  methods: {
    //发送到服务器配置
    async send() {
      // console.log("发送到服务器配置");
      // console.log(this.showList);
      this.loading = true;
      let showresl = {};
      this.showList.forEach(item => {
        showresl[item] = "on";
      });
      this.ruleForm.show = showresl;
      // console.log(this.ruleForm);

      let { data } = await this.$http.HallFunConfig.PostServerConfig({
        keys: this.keys,
        id: this.id,
        values: JSON.stringify(this.ruleForm)
      });
      // console.log(data);

      if (data.code === 1 && data.msg === "ok") {
        this.loading = false;
        this.$message({
          type: "success",
          message: "配置到服务器成功!"
        });
      }
    },

    //保存数据
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // console.log(this.showList);
          let showres = {};
          this.showList.forEach(item => {
            showres[item] = "on";
          });
          this.ruleForm.show = showres;
          let { data } = await this.$http.HallFunConfig.PutServerConfig({
            keys: this.keys,
            id: this.id,
            values: JSON.stringify(this.ruleForm)
          });
          // console.log(data);
          if (data.code === 1 && data.msg === "ok") {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
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

<style lang="less" scoped>
#RankListManageConf {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    padding: 20px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
    span {
      display: inline-block;
      font-size: 14px;
      color: #fff;
      width: 140px;
      height: 30px;
      margin-right: 5px;
      line-height: 30px;
      text-align: center;
      background-color: #009688;
      &:hover {
        background-color: #30a89d;
      }
    }
  }
  .form {
    span,
    p {
      color: #a8a8a8;
    }
  }
}
</style>

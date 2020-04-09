<template>
  <div id="RobotControl">
    <el-button type="primary" @click="submitForm('ruleForm', 1)">保存</el-button
    ><el-button type="primary" @click="submitForm('ruleForm', 2)"
      >发送到服务器配置</el-button
    >
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="抢庄牛牛-低倍场" name="nn_normal"></el-tab-pane>
        <el-tab-pane label="抢庄牛牛-中倍场" name="nn_senior"></el-tab-pane>
        <el-tab-pane label="抢庄牛牛-高倍场" name="nn_three"></el-tab-pane>
        <el-tab-pane label="抢庄牛牛-土豪场" name="nn_four"></el-tab-pane>
        <!-- <el-tab-pane label="test1" name="five"></el-tab-pane> -->
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
        <el-form-item label="无牛抢庄" prop="rob_config_one">
          <el-input
            style="width:200px"
            v-model="ruleForm.rob_config_one"
            placeholder="0"
          ></el-input
          >（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余1,2,3抢庄" prop="rob_config_two">
          <el-input
            style="width:200px"
            v-model="ruleForm.rob_config_two"
            placeholder="0"
          ></el-input>
          （格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余4,5,6抢庄" prop="rob_config_three">
          <el-input
            style="width:200px"
            v-model="ruleForm.rob_config_three"
            placeholder="0"
          ></el-input
          >（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余7,8,9抢庄" prop="rob_config_four">
          <el-input
            style="width:200px"
            v-model="ruleForm.rob_config_four"
            placeholder="0"
          ></el-input
          >（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余10抢庄" prop="rob_config_five">
          <el-input
            style="width:200px"
            v-model="ruleForm.rob_config_five"
            placeholder="0"
          ></el-input>
          （格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="无牛下注" prop="bet_config_one">
          <el-input
            style="width:200px"
            v-model="ruleForm.bet_config_one"
            placeholder="0"
          ></el-input
          >（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余1,2,3下注" prop="bet_config_two">
          <el-input
            style="width:200px"
            v-model="ruleForm.bet_config_two"
            placeholder="0"
          ></el-input
          >（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余4,5,6下注" prop="bet_config_three">
          <el-input
            style="width:200px"
            v-model="ruleForm.bet_config_three"
            placeholder="0"
          ></el-input
          >（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余7,8,9下注" prop="bet_config_four">
          <el-input
            style="width:200px"
            v-model="ruleForm.bet_config_four"
            placeholder="0"
          ></el-input
          >（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余10下注" prop="bet_config_five">
          <el-input
            style="width:200px"
            v-model="ruleForm.bet_config_five"
            placeholder="0"
          ></el-input
          >（格式如：90,10,0,0,0）
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "nn_normal",
      resData:{},
      ruleForm: {
        count: "",
        num_rate: "",
        coins_range: "",
        total_coin: "",
        exit_rate: "",
        rob_config_one: "",
        rob_config_two: "",
        rob_config_three: "",
        rob_config_four: "",
        rob_config_five: "",
        bet_config_one: "",
        bet_config_two: "",
        bet_config_three: "",
        bet_config_four: "",
        bet_config_five: ""
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
        exit_rate: [{ required: true, message: "不可以为空", trigger: "blur" }],
        rob_config_one: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        rob_config_two: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        rob_config_three: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        rob_config_four: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        rob_config_five: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        bet_config_one: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        bet_config_two: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        bet_config_three: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        bet_config_four: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        bet_config_five: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ]
      },
      id: 0,
      keys: "",
      loading: false
    };
  },

  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.GetServerConfig({
      key: "qznn_robot_control.lua"
    });
    console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    this.resData = res;
    this.ruleForm = res.nn_normal;

    console.log(this.resData, this.ruleForm);
  },

  methods: {
    //切换tab
    handleClick(tab) {
      Object.keys(this.resData).forEach(item => {
        if (item === tab.name) {
          this.ruleForm = this.resData[item];
        }
      });
    },

    submitForm(formName, type) {
      console.log(this.ruleForm, type);

      this.$refs[formName].validate(async valid => {
        if (valid) {
          //1.先拿到要发送到后台的数据
          //2.判断类型
          if(type == 1){
            //发送put
          }else if(type === 2){
            //发送post
          }

        }else{
          console.log('error');
          return false
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#RobotControl {
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

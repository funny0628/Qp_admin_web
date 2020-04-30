<template>
  <div
    id="W_RobotControl"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <el-button v-has="'hhdz_robot_config_save'" type="primary" @click="submitForm('ruleForm', 1)">保存</el-button
    ><el-button v-has="'hhdz_robot_config_send'" type="primary" @click="submitForm('ruleForm', 2)"
      >发送到服务器配置</el-button
    >
    <div v-has="'hhdz_robot_config_detail'">
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="非R" :name="namelist[0]"></el-tab-pane>
        <el-tab-pane label="小R" :name="namelist[1]"></el-tab-pane>
        <el-tab-pane label="中R" :name="namelist[2]"></el-tab-pane>
        <el-tab-pane label="大R" :name="namelist[3]"></el-tab-pane>
        <el-tab-pane label="土豪" :name="namelist[4]"></el-tab-pane>
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
        <el-form-item label="人数范围" prop="count_range">
          <el-input
            style="width:200px"
            v-model="ruleForm.count_range"
            placeholder="0"
          ></el-input
          >（格式如：1,2）
        </el-form-item>
        <el-form-item label="携带金币范围(元)" prop="coins_range">
          <el-input
            style="width:200px"
            v-model="ruleForm.coins_range"
            placeholder="0"
          ></el-input>
          (格式如：1,2）
        </el-form-item>
        <el-form-item label="机器人离桌率(百分比)" prop="leave_rate">
          <el-input
            style="width:200px"
            v-model="ruleForm.leave_rate"
            placeholder="0"
          ></el-input>
        </el-form-item>

        <el-form-item label="机器人下注下限(元)" prop="system_bet_min">
          <el-input
            style="width:200px"
            v-model="ruleForm.system_bet_min"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="上局下注选用比例" prop="system_last_bet_rate">
          <el-input
            style="width:200px"
            v-model="ruleForm.system_last_bet_rate"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="下注特殊牌型区域浮动值" prop="system_bet_area">
          <el-input
            style="width:200px"
            v-model="ruleForm.system_bet_area"
            placeholder="0"
          ></el-input>
          (1,5) 表示机器人有百分之1到百分之5的概率会下注特殊牌型区域)
        </el-form-item>

        <el-form-item label="区域下注浮动值(百分比)" prop="bet_area_float">
          <el-input
            style="width:200px"
            v-model="ruleForm.bet_area_float"
            placeholder="0"
          ></el-input
          >（格式如：80-20）
        </el-form-item>
        <el-form-item label="Vip座位上座率(百分比)" prop="vip_seat_rate">
          <el-input
            style="width:200px"
            v-model="ruleForm.vip_seat_rate"
            placeholder="0"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'hhdz_robot_config',
  data() {
    return {
      activeName: "",
      ruleForm: {
        count_range: "",
        coins_range: "",
        leave_rate: "",
        system_bet_min: "",
        system_last_bet_rate: "",
        system_bet_area: "",
        bet_area_float: "",
        vip_seat_rate: ""
      },
      rules: {
        count_range: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        coins_range: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        leave_rate: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        system_bet_min: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        system_last_bet_rate: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        system_bet_area: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        bet_area_float: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        vip_seat_rate: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ]
      },
      //当前游戏房间的所有数据
      currentlist: {},
      //匹配当前游戏的条件
      namelist: [],
      id: 0,
      keys: "",
      loading: false
    };
  },

  async created() {
    let { data } = await this.$http.HallFunConfig.Gethhdz_robot_control({
      key: "hhdz_robot_control.lua"
    });
    // console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    // console.log(res);
    this.currentlist = res.hhdz_normal.robot_type_list;
    this.namelist = Object.keys(this.currentlist);
    this.activeName = this.namelist[0];
    this.ruleForm = this.currentlist[this.namelist[0]];
  },

  methods: {
    handleClick(tab) {
      this.namelist.forEach(item => {
        if (item === tab.name) {
          this.ruleForm = this.currentlist[item];
        }
      });
    },

    submitForm(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // console.log(this.currentlist);
          if (type === 1) {
            //put
            let { data } = await this.$http.HallFunConfig.Puthhdz_robot_control({
              keys: this.keys,
              values: JSON.stringify({
                hhdz_normal: { robot_type_list: this.currentlist }
              }),
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

            let { data } = await this.$http.HallFunConfig.Posthhdz_robot_control({
              keys: this.keys,
              values: JSON.stringify({
                hhdz_normal: { robot_type_list: this.currentlist }
              }),
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

<style lang="less" scoped>
#W_RobotControl {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    padding: 10px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
  .form {
    padding: 20px;
  }
}
</style>

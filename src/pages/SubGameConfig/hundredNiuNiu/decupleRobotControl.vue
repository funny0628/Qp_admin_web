<template>
  <div id="decupleRobotControl"  v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)">
    <el-button v-has="'ten_robot_config_save'" type="primary" @click="submitForm('ruleForm', 1)">保存</el-button
    ><el-button v-has="'ten_robot_config_send'" type="primary" @click="submitForm('ruleForm', 2)"
      >发送到服务器配置</el-button
    >
    <div v-has="'ten_robot_config_detail'">
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="非R" :name="namelist[0]"></el-tab-pane>
        <el-tab-pane label="小R" :name="namelist[1]"></el-tab-pane>
        <el-tab-pane label="中R" :name="namelist[2]"></el-tab-pane>
        <el-tab-pane label="大R" :name="namelist[3]"></el-tab-pane>
        <el-tab-pane label="土豪" :name="namelist[4]"></el-tab-pane>
        <el-tab-pane label="上庄" :name="namelist[5]"></el-tab-pane>
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
        <el-form-item label="牌型大小界定值">
          <el-input
            style="width:200px"
            v-model="card_compare_value"
            placeholder="0"
          ></el-input>
        </el-form-item>

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
        <el-form-item label="系统坐庄机器人下注下限(元)" prop="system_bet_min">
          <el-input
            style="width:200px"
            v-model="ruleForm.system_bet_min"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="系统坐庄上局下注选用比例"
          prop="system_last_bet_rate"
        >
          <el-input
            style="width:200px"
            v-model="ruleForm.system_last_bet_rate"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="机器人坐庄各下注区域比例" prop="system_bet_area">
          <el-input
            style="width:200px"
            v-model="ruleForm.system_bet_area"
            placeholder="0"
          ></el-input>
          （格式如：1，2，2，1 按顺序代表 黑桃,红桃,梅花,方块）
        </el-form-item>
        <el-form-item label="玩家坐庄机器人下注下限(元)" prop="player_bet_min">
          <el-input
            style="width:200px"
            v-model="ruleForm.player_bet_min"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="玩家坐庄上局下注选用比例"
          prop="player_last_bet_rate"
        >
          <el-input
            style="width:200px"
            v-model="ruleForm.player_last_bet_rate"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="玩家坐庄各下注区域比例" prop="player_bet_area">
          <el-input
            style="width:200px"
            v-model="ruleForm.player_bet_area"
            placeholder="0"
          ></el-input>
          （（格式如：1，2，2，1 按顺序代表 黑桃,红桃,梅花,方块）
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
import {CheckValue} from '../../../assets/js/formate.js'
export default {
  name:'ten_robot_config',
  data() {
     let checkValue = (rule, theObj, callback) => {
      CheckValue(this.ruleForm,rule, theObj, callback)
    };
    return {
      activeName: "1",
      ruleForm: {
        count_range: "",
        coins_range: "",
        leave_rate: "",
        system_bet_min: "",
        system_last_bet_rate: "",
        system_bet_area: "",
        player_bet_min: "",
        player_last_bet_rate: "",
        player_bet_area: "",
        bet_area_float: "",
        vip_seat_rate: ""
      },
      rules: {
        count_range: [
          { required: false, validator: checkValue, trigger: "blur" }
        ],
        coins_range: [
          { required: false, validator: checkValue, trigger: "blur" }
        ],
        leave_rate: [
          { required: false, validator: checkValue, trigger: "blur" }
        ],
        system_bet_min: [
          { required: false, validator: checkValue, trigger: "blur" }
        ],
        system_last_bet_rate: [
          { required: false, validator: checkValue, trigger: "blur" }
        ],
        system_bet_area: [
          { required: false, validator: checkValue, trigger: "blur" }
        ],
        player_bet_min: [
          { required: false, validator: checkValue, trigger: "blur" }
        ],
        player_last_bet_rate: [
          { required: false, validator: checkValue, trigger: "blur" }
        ],
        player_bet_area: [
          { required: false, validator: checkValue, trigger: "blur" }
        ],
        bet_area_float: [
          { required: false, validator: checkValue, trigger: "blur" }
        ],
        vip_seat_rate: [
          { required: false, validator: checkValue, trigger: "blur" }
        ]
      },
      resData: {},
      id: 0,
      keys: "",
      loading: false,
      card_compare_value: "",
      namelist:[],
    };
  },

  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.Getbrnn_ten_robot_control({
      key: "brnn_ten_robot_control.lua"
    });
    console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    this.resData = res.brnn_ten_normal.robot_type_list;
    // this.ruleForm = res.brnn_ten_normal.robot_type_list[1];
    this.card_compare_value = res.brnn_ten_normal.card_compare_value;

     Object.keys(this.resData).forEach((item,index)=>{
      this.namelist.push(item)
      if(index === 0){
        this.ruleForm = this.resData[item];
      }
    })

    console.log(this.resData, this.ruleForm);
  },

  methods: {
    handleClick(tab) {
      Object.keys(this.resData).forEach(item => {
        if (item === tab.name) {
          this.ruleForm = this.resData[item];
        }
      });
    },

    submitForm(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid && this.card_compare_value !== "" && !isNaN(this.card_compare_value)) {
          console.log(this.ruleForm, type);
          let res = {
            brnn_ten_normal: {
              card_compare_value:this.card_compare_value,
              robot_type_list:this.resData
            }
          };
          if (type === 1) {
            let { data } = await this.$http.HallFunConfig.Putbrnn_ten_robot_control({
              keys: this.keys,
              values: JSON.stringify(res),
              id: this.id
            });
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
            this.loading = true;
            let { data } = await this.$http.HallFunConfig.Postbrnn_ten_robot_control({
              keys: this.keys,
              values: JSON.stringify(res),
              id: this.id
            });
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
          
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#decupleRobotControl {
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

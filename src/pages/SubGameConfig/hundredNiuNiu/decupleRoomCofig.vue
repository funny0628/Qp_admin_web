<template>
  <div
    id="decupleRoomCofig"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="labellist[0]" :name="namelist[0]"></el-tab-pane>
        <el-tab-pane :label="labellist[1]" :name="namelist[1]"></el-tab-pane>
        <el-tab-pane :label="labellist[2]" :name="namelist[2]"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- form -->

    <div class="form">
      <el-button
        v-has="'ten_room_config_send'"
        style="margin-bottom:10px"
        type="primary"
        @click="submit('ruleForm', 2)"
        >发送到服务器配置</el-button
      >
       <el-button v-has="'ten_room_config_save'" type="primary" @click="submit('ruleForm', 1)"
            >立即提交</el-button
          >
      <el-form
        v-has="'ten_room_config_detail'"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="房间名称" prop="name">
          <el-input
            disabled
            style="width:200px"
            v-model="ruleForm.name"
            placeholder="房间名称"
          ></el-input
          >房间ID:{{ruleForm.type_id}}
        </el-form-item>

        <el-form-item label="场次开关" prop="open_game">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="ruleForm.open_game"
          ></el-switch>
        </el-form-item>
        <el-form-item label="是否开放机器人" prop="open_robot">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="ruleForm.open_robot"
          ></el-switch>
        </el-form-item>

        <el-form-item label="台费" prop="cost">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.cost"
            placeholder="0"
          ></el-input
          >(百分比)
        </el-form-item>
        <el-form-item label="携带上限" prop="max">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.max"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="携带下限" prop="min">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.min"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="上座金额" prop="sit_coins_limit">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.sit_coins_limit"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="上庄最低携带" prop="min_banker_coins">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.min_banker_coins"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="下注最低携带" prop="min_bet">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.min_bet"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人限红" prop="person_limit">
          <el-input
            style="width:200px"
            v-model="ruleForm.person_limit"
            placeholder="0"
          ></el-input
          >格式如1,10000
        </el-form-item>
        <el-form-item label="个人区域限红（黑桃）" prop="spade_limit">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.spade_limit"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人区域限红（红桃）" prop="heart_limit">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.heart_limit"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人区域限红（梅花）" prop="club_limit">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.club_limit"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人区域限红（方块）" prop="diamond_limit">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.diamond_limit"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="区域总限红（黑桃）" prop="all_spade_limit">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.all_spade_limit"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="区域总限红（红桃））" prop="all_heart_limit">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.all_heart_limit"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="区域总限红（梅花）" prop="all_club_limit">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.all_club_limit"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="区域总限红（方块）" prop="all_diamond_limit">
          <el-input
          type="number"
            style="width:200px"
            v-model="ruleForm.all_diamond_limit"
            placeholder="0"
          ></el-input>
        </el-form-item>

       
      </el-form>
    </div>
  </div>
</template>

<script>
import DeepData from '../../../assets/js/formate.js'
export default {
  name:'ten_room_config',
  data() {
    let checkValue = (rule,value,callback) => {
      if(value === '') {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    };
     let checkLimit = (rule,value,callback) => {
      let reg = /^([-+] ?)?[0-9]+(,[0-9]+)?$/
      if(value !== '') {
        if(!reg.test(value)){
          return callback(new Error('请按照提示的格式填写!!'))
        }else{
          callback();
        }
      }else{
        return callback(new Error('必填项不可以为空!!'))
      }
    };
    return {
      ruleForm: {
        cost: "",
        max: "",
        min: "",
        sit_coins_limit: "",
        min_banker_coins: "",
        min_bet: "",
        person_limit: "",
        spade_limit: "",
        heart_limit: "",
        club_limit: "",
        diamond_limit: "",
        all_spade_limit: "",
        all_heart_limit: "",
        all_club_limit: "",
        all_diamond_limit: "",
        type_id: "",
        name: "",
        open_game: "",
        open_robot: "",
        robot_type: "",
        is_hundred_game: ""
      },
      rules: {
        cost: [{ required: true,validator: checkValue, trigger: "blur" }],
        max: [{ required: true,validator: checkValue, trigger: "blur" }],
        min: [{ required: true,validator: checkValue, trigger: "blur" }],
        sit_coins_limit: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
        min_banker_coins: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
        min_bet: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
        person_limit: [
          { required: true,validator: checkLimit, trigger: "blur" }
        ],
        spade_limit: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
        heart_limit: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
        club_limit: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
        diamond_limit: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
        all_spade_limit: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
        all_heart_limit: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
        all_club_limit: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
        all_diamond_limit: [
          { required: true,validator: checkValue, trigger: "blur" }
        ],
      },
      activeName: "",
      id: 0,
      keys: "",
      loading: false,
      //所有房间的数据
      allData: {},
      //匹配当前游戏的条件
      namelist: ["200200", "200201", "200202"],
      //当前游戏的所有数据
      currentlist: {},
      //游戏场次类别
      labellist:[],
    };
  },

  created() {
    this.getData()
  },

  methods: {
    //tab切换
    handleClick(tab) {
      this.namelist.forEach(item => {
        if (item === tab.name) {
          this.ruleForm = this.currentlist[item];
        }
      });
    },


     async getData() {
        //获取数据
        let { data } = await this.$http.HallFunConfig.Getroomdata2002({
          key: "roomdata.lua"
        });
        this.id = data.data[0].id;
        this.keys = data.data[0].sys_key;
        let res = JSON.parse(data.data[0].sys_val);
        this.allData = res;
        this.namelist.forEach((it, index) => {
          Object.keys(res).forEach(item => {
            if (item === it) {
              this.currentlist[item] = res[item];
              this.labellist.push(res[it].name)
              this.currentlist[item].person_limit = `${res[it].person_limit[1]},${res[it].person_limit[2]}`
            }
            if (index === 0) {
              this.ruleForm = res[it];
              this.activeName = it;
            }
          });
        });
    },

    //保存和服务器配置
    submit(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let resData = DeepData(this.allData);
          this.namelist.forEach((item)=>{
            Object.keys(this.allData).forEach((it)=>{
              if(item === it){
                let limit_str = this.allData[it].person_limit.split(',')
                let obj = {}
                limit_str.forEach((litem,lindex)=>{
                  obj[lindex + 1] = +litem
                })
                resData[it].person_limit = obj
                resData[it].max = +resData[it].max;
                resData[it].min = +resData[it].min;
                resData[it].cost = +resData[it].cost;
                resData[it].sit_coins_limit = +resData[it].sit_coins_limit;
                resData[it].heart_limit = +resData[it].heart_limit;
                resData[it].spade_limit = +resData[it].spade_limit;
                resData[it].all_club_limit = +resData[it].all_club_limit;
                resData[it].all_diamond_limit = +resData[it].all_diamond_limit;
                resData[it].min_bet = +resData[it].min_bet;
                resData[it].all_spade_limit = +resData[it].all_spade_limit;
                resData[it].all_heart_limit = +resData[it].all_heart_limit;
                resData[it].club_limit = +resData[it].club_limit;
                resData[it].diamond_limit = +resData[it].diamond_limit;
                resData[it].min_banker_coins = +resData[it].min_banker_coins;
              }
            })
          })


          //判断类型
          if (type === 1) {
            let { data } = await this.$http.HallFunConfig.Putroomdata2002({
              keys: this.keys,
              values: JSON.stringify(resData),
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
            this.loading = true;
            let { data } = await this.$http.HallFunConfig.Postroomdata2002({
              keys: this.keys,
              values: JSON.stringify(resData),
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
          this.$message({
            type: "warning",
            message: "输入正确格式的数字,必填项不能为空!"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#decupleRoomCofig {
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

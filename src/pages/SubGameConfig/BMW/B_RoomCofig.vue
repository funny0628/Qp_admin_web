

<template>
  <div id="B_RoomCofig"  v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)">
    <div v-has="'bmbc_room_config_detail'">
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="labellist[0]" :name="namelist[0]"></el-tab-pane>
        <el-tab-pane :label="labellist[1]" :name="namelist[1]"></el-tab-pane>
        <el-tab-pane :label="labellist[2] " :name="namelist[2]"></el-tab-pane>
        <el-tab-pane :label="labellist[3]" :name="namelist[3]"></el-tab-pane>
        <el-tab-pane :label="labellist[4]" :name="namelist[4]"></el-tab-pane>
        <el-tab-pane :label="labellist[5]" :name="namelist[5]"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- form -->
    
    <div class="form">
      <el-button v-has="'bmbc_room_config_send'" style="margin-bottom:10px" type="primary" @click="submitForm('ruleForm',2)">发送到服务器配置</el-button>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="360px"
        class="demo-ruleForm"
      >
        <el-form-item label="房间名称" prop="name">
          <el-input disabled style="width:200px" v-model="ruleForm.name" placeholder="房间名称"></el-input>房间ID:{{ruleForm.type_id}}
        </el-form-item>

        <el-form-item label="场次开关" prop="open_game">
          <el-switch v-model="ruleForm.open_game" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="是否开放机器人" prop="open_robot">
          <el-switch v-model="ruleForm.open_robot" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      
        <el-form-item label="台费" prop="cost">
          <el-input type="number" style="width:200px" v-model="ruleForm.cost" placeholder="0"></el-input>(百分比)
        </el-form-item>
      
         </el-form-item>
        <el-form-item label="携带上限" prop="max">
          <el-input type="number" style="width:200px" v-model="ruleForm.max" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="携带下限" prop="min">
          <el-input type="number" style="width:200px" v-model="ruleForm.min" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="上座金额" prop="sit_coins_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.sit_coins_limit" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="下注最低携带" prop="min_bet">
          <el-input type="number" style="width:200px" v-model="ruleForm.min_bet" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="个人限红" prop="person_limit">
          <el-input style="width:200px" v-model="ruleForm.person_limit" placeholder="0"></el-input>格式如1,10000
     </el-form-item>

        <el-form-item label="个人区域限红（小奔驰、宝马、大众、保时捷）5倍区域" prop="times_5_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.times_5_limit" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="个人区域限红（大大众）10倍区域" prop="times_10_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.times_10_limit" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="个人区域限红 （大宝马）20倍区域" prop="times_20_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.times_20_limit" placeholder="0"></el-input>
     </el-form-item>
        <el-form-item label="个人区域限红（大奔驰）30倍区域" prop="times_30_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.times_30_limit" placeholder="0"></el-input>
     </el-form-item>
        <el-form-item label="个人区域限红（大保时捷）40倍区域" prop="times_40_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.times_40_limit" placeholder="0"></el-input>
     </el-form-item>
        <el-form-item label="区域总限红（小奔驰、宝马、大众、保时捷）5倍区域" prop="all_times_5_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.all_times_5_limit" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="区域总限红（大大众）10倍区域" prop="all_times_10_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.all_times_10_limit" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="区域总限红 （大宝马）20倍区域" prop="all_times_20_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.all_times_20_limit" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="区域总限红（大奔驰）30倍区域" prop="all_times_30_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.all_times_30_limit" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="区域总限红（大保时捷）40倍区域" prop="all_times_40_limit">
          <el-input type="number" style="width:200px" v-model="ruleForm.all_times_40_limit" placeholder="0"></el-input>
     </el-form-item>
        <el-form-item>
          <el-button v-has="'bmbc_room_config_save'" type="primary" @click="submitForm('ruleForm',1)"
            >立即提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    </div>
  </div>
</template>

<script>
import DeepData from "../../../assets/js/formate.js";
export default {
  name:'bcbm_room_config',
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
      activeName: "",
      ruleForm: {
        cost: "",
        max: "",
        min: "",
        sit_coins_limit: "",
        min_bet: "",
        person_limit: "",
        times_5_limit: "",
        times_10_limit: "",
        times_20_limit: "",
        times_30_limit: "",
        times_40_limit: "",
        all_times_5_limit: "",
        all_times_10_limit: "",
        all_times_20_limit: "",
        all_times_30_limit: "",
        all_times_40_limit: "",
        type_id: "",
        name: "",
        open_game: "",
        open_robot: "",
        robot_type: "",
        is_hundred_game: "",

      },
      rules: {
         cost: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         max: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         min: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         sit_coins_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         min_bet: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         person_limit: [
          { required: true, validator: checkLimit, trigger: "blur" }
        ],
         times_5_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         times_10_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         times_20_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         times_30_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         times_40_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         all_times_5_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         all_times_10_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         all_times_20_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         all_times_30_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],
         all_times_40_limit: [
          { required: true, validator: checkValue, trigger: "blur" }
        ],

      },
         //房间配置的所有数据
      allData:{},
      //当前游戏房间的所有数据
      currentlist:{},
      //匹配当前游戏的条件
      namelist:['200500','200501','200502','200503','200504','200505'],
      //游戏场次类别
      labellist:[],
      id: 0,
      keys: "",
      loading: false,
    };
  },

   async created() {
      let { data } = await this.$http.HallFunConfig.Getroomdata2005({
        key: "roomdata.lua"
      });
      this.id = data.data[0].id;
      this.keys = data.data[0].sys_key;
      let res = JSON.parse(data.data[0].sys_val);
      this.allData = res;
      this.namelist.forEach((item,index)=>{
        Object.keys(res).forEach((it)=>{
          if(item === it){
            this.currentlist[item] = res[it]
            this.currentlist[item].person_limit = `${res[it].person_limit[1]},${res[it].person_limit[2]}`
            this.labellist.push(res[it].name)
          }
          if(index === 0){
            this.activeName = item
            this.ruleForm = res[item]
          }
        })
      })
  },


  methods: {
    handleClick(tab) {
      this.namelist.forEach((item)=>{
        if(item === tab.name){
          this.ruleForm = this.currentlist[item]
        }
      })
    },
    submitForm(formName,type) {
     
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
                resData[it].min_bet = +resData[it].min_bet;
                resData[it].times_5_limit = +resData[it].times_5_limit;
                resData[it].times_10_limit = +resData[it].times_10_limit;
                resData[it].times_20_limit = +resData[it].times_20_limit;
                resData[it].times_30_limit = +resData[it].times_30_limit;
                resData[it].times_40_limit = +resData[it].times_40_limit;
                resData[it].all_times_5_limit = +resData[it].all_times_5_limit;
                resData[it].all_times_10_limit = +resData[it].all_times_10_limit;
                resData[it].all_times_20_limit = +resData[it].all_times_20_limit;
                resData[it].all_times_30_limit = +resData[it].all_times_30_limit;
                resData[it].all_times_40_limit = +resData[it].all_times_40_limit;
              }
            })
          })
          if(type === 1){
            //put
            let { data } = await this.$http.HallFunConfig.Putroomdata2005({
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
          }else if(type === 2){
            //post
            this.loading = true;
            let { data } = await this.$http.HallFunConfig.Postroomdata2005({
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
        }else{
           this.$message({
            type: "warning",
            message: "输入正确格式的数字,必填项不能为空!!"
          });
          return false;
        }
      })
    },
  }
};
</script>

<style lang="less" scoped>
#B_RoomCofig {
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



<template>
  <div id="L_RoomCofig" v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)">
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="labellist[0]" :name="namelist[0]"></el-tab-pane>
        <el-tab-pane :label="labellist[1]" :name="namelist[1]"></el-tab-pane>
        <el-tab-pane :label="labellist[2]" :name="namelist[2]"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- form -->
    
    <div v-has="'ddz_room_config_detail'" class="form">
      <el-button v-has="'ddz_room_config_send'" style="margin-bottom:10px" type="success" @click="submitForm('ruleForm',2)">发送到服务器配置</el-button>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="房间名称" prop="name">
          <el-input disabled style="width:200px" v-model="ruleForm.name" placeholder="房间名称"></el-input>房间ID:{{ruleForm.type_id}}
        </el-form-item>

        <el-form-item label="场次开关" prop="open_game">
          <el-switch v-model="ruleForm.open_game"  active-color="#13ce66"
            inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="是否开放机器人" prop="open_robot">
          <el-switch v-model="ruleForm.open_robot"  active-color="#13ce66"
            inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="ip限制" prop="ip_limit">
          <el-switch v-model="ruleForm.ip_limit"  active-color="#13ce66"
            inactive-color="#ff4949"></el-switch>
        </el-form-item>

        <el-form-item label="底注" prop="dizhu">
          <el-input style="width:200px" v-model="ruleForm.dizhu" placeholder="0"></el-input>
        </el-form-item>
  
        <el-form-item label="台费" prop="cost">
          <el-input style="width:200px" v-model="ruleForm.cost" placeholder="0"></el-input>(百分比)
        </el-form-item>
      
         </el-form-item>
        <el-form-item label="携带上限" prop="max">
          <el-input style="width:200px" v-model="ruleForm.max" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="携带下限" prop="min">
          <el-input style="width:200px" v-model="ruleForm.min" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="初始倍率" prop="rate">
          <el-input style="width:200px" v-model="ruleForm.rate" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item>
          <el-button v-has="'ddz_room_config_save'" type="primary" @click="submitForm('ruleForm',1)"
            >立即提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {CheckValue} from '../../../assets/js/formate.js'
export default {
  name:'ddz_room_config',
  data() {
     let checkValue = (rule, theObj, callback) => {
      CheckValue(this.ruleForm,rule, theObj, callback)
    };
    return {
      activeName: "",
      ruleForm: {
        dizhu: "",
        cost: "",
        max: "",
        min:"",
        rate: "",
        type_id: "",
        name: "",
        open_game: "",
        open_robot: "",
        ip_limit: "",
        robot_type: "",
        is_hundred_game: "",
      },
      rules: {
          dizhu: [{ required: true, validator: checkValue, trigger: "blur" }],
          cost: [{ required: true, validator: checkValue, trigger: "blur" }],
          max: [{ required: true, validator: checkValue, trigger: "blur" }],
          min: [{ required: true, validator: checkValue, trigger: "blur" }],
          rate: [{ required: true, validator: checkValue, trigger: "blur" }],
         
      },
      //房间配置的所有数据
      allData:{},
      //当前游戏房间的所有数据
      currentlist:{},
      //匹配当前游戏的条件
      namelist:['300','301','302'],
      //游戏场次类别
      labellist:[],
      id: 0,
      keys: "",
      loading: false,
    };
  },

  async created() {
       let { data } = await this.$http.HallFunConfig.Getroomdata3({
      key: "roomdata.lua"
    });
    // console.log(data);
     this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    // console.log(res);
    this.allData = res;
    this.namelist.forEach((item,index)=>{
      Object.keys(res).forEach((it)=>{
        if(item === it){
          this.currentlist[item] = res[it]
          this.labellist.push(res[it].name)
        }
        if(index === 0){
          this.activeName = item
          this.ruleForm = res[item]
        }
      })
    })
    // console.log(this.allData,this.currentlist,this.ruleForm,this.labellist);
  },
  
  methods: {
    //切换tab
    handleClick(tab) {
      this.namelist.forEach((item)=>{
        if(item === tab.name){
          this.ruleForm = this.currentlist[item]
        }
      })
    },
    //提交和发送服务器配置
    submitForm(formName,type) {
        this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(this.ruleForm,this.currentlist,this.allData);
          if(type === 1){
            //发送put
                 let { data } = await this.$http.HallFunConfig.Putroomdata3({
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
            }else{
            this.$message({
              type: "warning",
              message: "保存失败!"
            });
          }
          }else if(type === 2){
            //发送post
             this.loading = true;

            let { data } = await this.$http.HallFunConfig.Postroomdata3({
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
            }else {
              this.loading = false;
              this.$message({
                type: "warning",
                message: "发送服务器配置失败!"
              });
            }
          }

        }else{
          console.log("error submit!!");
          return false;
        }
        })
    },
  }
};
</script>

<style lang="less" scoped>
#L_RoomCofig {
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

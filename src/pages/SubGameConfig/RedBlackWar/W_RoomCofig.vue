<template>
  <div id="W_RoomCofig" v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)">
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
      <el-button style="margin-bottom:10px" type="primary" @click="submitForm('ruleForm',2)">发送到服务器配置</el-button>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="房间名称" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="房间名称"></el-input>房间ID:{{ruleForm.type_id}}
        </el-form-item>

        <el-form-item label="场次开关" prop="open_game">
          <el-switch v-model="ruleForm.open_game" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="是否开放机器人" prop="open_robot">
          <el-switch v-model="ruleForm.open_robot" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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

        <el-form-item label="上座金额" prop="sit_coins_limit">
          <el-input style="width:200px" v-model="ruleForm.sit_coins_limit" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="下注最低携带" prop="min_bet">
          <el-input style="width:200px" v-model="ruleForm.min_bet" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="个人限红" prop="person_limit">
          <el-input style="width:200px" v-model="ruleForm.person_limit" placeholder="0"></el-input>格式如1,10000
     </el-form-item>

        <el-form-item label="个人区域限红（红）" prop="red_limit">
          <el-input style="width:200px" v-model="ruleForm.red_limit" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="个人区域限红（黑）" prop="black_limit">
          <el-input style="width:200px" v-model="ruleForm.black_limit" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="个人区域限红（幸运）" prop="special_limit">
          <el-input style="width:200px" v-model="ruleForm.special_limit" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="红黑区域差额限制" prop="difference_limit">
          <el-input style="width:200px" v-model="ruleForm.difference_limit" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="幸运区域总值限制" prop="all_special_limit">
          <el-input style="width:200px" v-model="ruleForm.all_special_limit" placeholder="0"></el-input>
     </el-form-item>
     
       
     

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm',1)"
            >立即提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import DeepData from "../../../assets/js/formate.js";
export default {
  name:'hhdz_room_config',
  data() {
    return {
      activeName: "first",
      ruleForm: {
        cost: "",
        max: "",
        min: "",
        sit_coins_limit: "",
        min_bet: "",
        person_limit: "",
        red_limit: "",
        black_limit: "",
        special_limit: "",
        difference_limit: "",
        all_special_limit: "",
        type_id: "",
        name: "",
        open_game: "",
        open_robot: "",
        robot_type: "",
        is_hundred_game: "",

      },
      rules: {
          name: [{ required: true, message: "不可以为空", trigger: "blur" }],
          open_game: [{ required: true, message: "不可以为空", trigger: "blur" }],
          open_robot: [{ required: true, message: "不可以为空", trigger: "blur" }],
          cost: [{ required: true, message: "不可以为空", trigger: "blur" }],
          max: [{ required: true, message: "不可以为空", trigger: "blur" }],
          min: [{ required: true, message: "不可以为空", trigger: "blur" }],
          sit_coins_limit: [{ required: true, message: "不可以为空", trigger: "blur" }],
          min_bet: [{ required: true, message: "不可以为空", trigger: "blur" }],
          person_limit: [{ required: true, message: "不可以为空", trigger: "blur" }],
          red_limit: [{ required: true, message: "不可以为空", trigger: "blur" }],
          black_limit: [{ required: true, message: "不可以为空", trigger: "blur" }],
          special_limit: [{ required: true, message: "不可以为空", trigger: "blur" }],
          difference_limit: [{ required: true, message: "不可以为空", trigger: "blur" }],
          all_special_limit: [{ required: true, message: "不可以为空", trigger: "blur" }],
      },
       //房间配置的所有数据
      allData:{},
      //当前游戏房间的所有数据
      currentlist:{},
      //匹配当前游戏的条件
      namelist:['200000','200001','200002','200003','200004','200005'],
      //游戏场次类别
      labellist:[],
      id: 0,
      keys: "",
      loading: false,
    };
  },

   async created() {
       let { data } = await this.$http.HallFunConfig.Getroomdata2000({
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
          this.currentlist[item].person_limit = res[it].person_limit.replace(/\{|}/g,'')
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
          // console.log(this.allData,this.currentlist,this.ruleForm);
          let resData = DeepData(this.allData);
          this.namelist.forEach((item)=>{
            Object.keys(resData).forEach((it)=>{
              if(item === it){
                resData[it].person_limit = `{${resData[item].person_limit}}`
              }
            })
          })
          // console.log(this.allData,this.currentlist,this.ruleForm,resData);
          
          if(type === 1){
            //put
                 let { data } = await this.$http.HallFunConfig.Putroomdata2000({
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

            let { data } = await this.$http.HallFunConfig.Postroomdata2000({
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
           console.log("error submit!!");
          return false;
        }
      })
    },
  }
};
</script>

<style lang="less" scoped>
#W_RoomCofig {
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

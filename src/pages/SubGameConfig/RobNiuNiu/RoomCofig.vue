<template>
  <div id="RoomCofig">
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="labellist[0]" :name="namelist[0]"></el-tab-pane>
        <el-tab-pane :label="labellist[1]" :name="namelist[1]"></el-tab-pane>
        <el-tab-pane :label="labellist[2] " :name="namelist[2]"></el-tab-pane>
        <el-tab-pane :label="labellist[3]" :name="namelist[3]"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- form -->
    
    <div class="form">
      <el-button style="margin-bottom:10px" type="success" @click="submitForm('ruleForm',2)">发送到服务器配置</el-button>
       <el-button type="primary" @click="submitForm('ruleForm',1)"
            >立即提交</el-button
          >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="房间名称" prop="type_id">
          <el-input style="width:200px" v-model="ruleForm.type_id" placeholder="房间名称"></el-input>房间ID:200
        </el-form-item>

        <el-form-item label="场次开关" prop="open_game">
          <el-switch v-model="ruleForm.open_game"></el-switch>
        </el-form-item>
        <el-form-item label="是否开放机器人" prop="open_robot">
          <el-switch v-model="ruleForm.open_robot"></el-switch>
        </el-form-item>
        <el-form-item label="ip限制" prop="ip_limit">
          <el-switch v-model="ruleForm.ip_limit"></el-switch>
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
     
        <el-form-item label="抢庄区间设置" prop="grab_banker_times">
          <el-input style="width:200px" v-model="ruleForm.grab_banker_times" placeholder="1,2|2,3|3,4"></el-input> 1,2|2,3|3,4 或者1,2;2,3;3;4 多个数字用逗号分隔,多个配置用;号或者|分隔
        </el-form-item>
       
     

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      ruleForm: {
        dizhu: "",
        cost: "",
        max: "",
        min: "",
        grab_banker_times: "",
        type_id: "",
        name: "",
        ip_limit: "",
        open_game: "",
        open_robot: "",
        robot_type: "",
        is_hundred_game: "",
      },
      rules: {
         dizhu: [{ required: true, message: "不可以为空", trigger: "blur" }],
         cost: [{ required: true, message: "不可以为空", trigger: "blur" }],
         max: [{ required: true, message: "不可以为空", trigger: "blur" }],
         min: [{ required: true, message: "不可以为空", trigger: "blur" }],
         grab_banker_times: [{ required: true, message: "不可以为空", trigger: "blur" }],
         type_id: [{ required: true, message: "不可以为空", trigger: "blur" }],
         ip_limit: [{ required: true, message: "不可以为空", trigger: "blur" }],
         open_game: [{ required: true, message: "不可以为空", trigger: "blur" }],
         open_robot: [{ required: true, message: "不可以为空", trigger: "blur" }],
      },
      //房间配置的所有数据
      allData:'',
      //当前游戏房间的所有数据
      currentlist:{},
      //匹配当前游戏的条件
      namelist:['200','201','202','203'],
      //游戏场次类别
      labellist:[],
    };
  },
  async created() {
      let { data } = await this.$http.HallFunConfig.GetServerConfig({
      key: "roomdata.lua"
    });
    console.log(data);
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    this.allData = res
    this.namelist.forEach((item,index)=>{
      Object.keys(res).forEach((it)=>{
        if(item === it){
          this.currentlist[item] = res[item]
          this.currentlist[item].grab_banker_times = res[item].grab_banker_times.join('|')
        }
        if(index === 0){
          this.ruleForm = res[item]
          this.activeName = item
        }
      })
      this.labellist.push(res[item].name)
    })
  
    
    console.log(this.currentlist,this.activeName,this.ruleForm,this.labellist);
    
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
      console.log(this.ruleForm);
      Object.keys(this.currentlist).forEach((item)=>{
        if(this.ruleForm.type_id === item){
          this.currentlist[item] = this.ruleForm
        }
        
       
      })
      console.log(this.ruleForm,this.currentlist);

      Object.keys(this.currentlist).forEach((item)=>{
        
        Object.keys(this.allData).forEach((it)=>{
          if(item === it){
            // this.allData[it].grab_banker_times =this.currentlist[item].grab_banker_times.join('|')
            this.allData[it] = this.currentlist[item]
           
          }
        })
      })
      console.log(this.allData,this.currentlist);
      
      

    },
  }
};
</script>

<style lang="less" scoped>
#RoomCofig {
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

<template>
  <div id="RoomCofig"  v-loading="loading"
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
      </el-tabs>
    </div>
    <!-- form -->
    
    <div class="form">
      <el-button v-has="'qz_room_config_send'"  style="margin-bottom:10px" type="success" @click="submitForm('ruleForm',2)">发送到服务器配置</el-button>
       <el-button v-has="'qz_room_config_save'" type="primary" @click="submitForm('ruleForm',1)"
            >立即提交</el-button
          >
      <el-form
        v-has="'qz_room_config_detail'"
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
          <el-input type="number" style="width:200px" v-model="ruleForm.dizhu" placeholder="0"></el-input>
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
     
        <el-form-item label="抢庄区间设置" prop="grab_banker_times">
          <el-input style="width:200px" v-model="ruleForm.grab_banker_times" placeholder="1,2|2,3|3,4"></el-input> 1,2|2,3|3,4 或者1,2;2,3;3;4 多个数字用逗号分隔,多个配置用 | 号分隔
        </el-form-item>
       
     

      </el-form>
    </div>
  </div>
</template>

<script>
import DeepData from '../../../assets/js/formate.js'
export default {
  name:'qz_room_config',
  data() {
    let checkValue = (rule,value,callback) => {
      if(value === '') {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    };
     let checkLimit = (rule,value,callback) => {
      if(value !== '') {
        callback();
      }else{
        return callback(new Error('必填项不可以为空!!'))
      }
    };
     let checkWeight = (rule,value,callback) => {
      let reg = /^[0-9]*$/
      let val = value.split('|')
      let arr = []
      val.forEach((item)=>{
        arr.push(item.split(',')['0'])
        arr.push(item.split(',')['1'])
      })
      console.log(arr);
      
      let isall = true
      arr.forEach((ietm)=>{
        if(+ietm){
          if(parseInt(ietm) < parseFloat(ietm)){
            isall = false
          }else{
             isall = true
          }
          }else{
             console.log('fou');
             isall = false
          }
      })
      // console.log(isall);
      if(isall){
        callback()
      }else{
        return callback(new Error('请按照提示输入正确格式的值!!'))
      }
    };
    return {
      activeName: "",
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
         dizhu: [{ required: true, validator: checkValue, trigger: "blur" }],
         cost: [{ required: true, validator: checkValue, trigger: "blur" }],
         max: [{ required: true, validator: checkValue, trigger: "blur" }],
         min: [{ required: true, validator: checkValue, trigger: "blur" }],
         grab_banker_times: [{ required: true, validator: checkWeight, trigger: "blur" }],
      },
      //房间配置的所有数据
      allData:{},
      //当前游戏房间的所有数据
      currentlist:{},
      //匹配当前游戏的条件
      namelist:['200','201','202','203'],
      //游戏场次类别
      labellist:[],
      id: 0,
      keys: "",
      loading: false,
    };
  },
  created() {
    this.getData()  
  },
  methods: {
    handleClick(tab) {
     this.namelist.forEach((item)=>{
       if(item === tab.name){
         this.ruleForm = this.currentlist[item]
       }
     })
    },

    async getData() {
       let { data } = await this.$http.HallFunConfig.Getroomdata2({
          key: "roomdata.lua"
        });
        // console.log(data);
        this.id = data.data[0].id;
        this.keys = data.data[0].sys_key;
        let res = JSON.parse(data.data[0].sys_val);
        console.log(res);
        this.allData = res
        this.namelist.forEach((item,index)=>{
          Object.keys(res).forEach((it)=>{
            if(item === it){
              this.currentlist[item] = res[item]
              this.currentlist[item].grab_banker_times = Object.values(res[item].grab_banker_times).join('|')
            }
            if(index === 0){
              this.ruleForm = res[item]
              this.activeName = item
            }
          })
          this.labellist.push(res[item].name)
        })
    },


    submitForm(formName,type) {
        this.$refs[formName].validate(async valid => {
        if (valid) {
          let all = DeepData(this.allData);
          this.namelist.forEach((item)=>{
            Object.keys(all).forEach((it,idx)=>{
              if(item === it){
                let times = all[it].grab_banker_times.split('|')
                let obj = {}
                times.forEach((item,index)=>{
                  obj[index + 1] = item
                })
                all[item].grab_banker_times = obj
                all[it].dizhu = +all[it].dizhu
                all[it].cost = +all[it].cost
                all[it].max = +all[it].max
                all[it].min = +all[it].min
              }
            })
          })
          // console.log(all,this.allData,this.ResData);
          if(type === 1){
            //发送put
            let { data } = await this.$http.HallFunConfig.Putroomdata2({
                  keys: this.keys,
                  values: JSON.stringify(all),
                  id: this.id
                });
                // console.log(data);
                if (data.code === 1 && data.msg === "ok") {
                  this.getData()
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
                let { data } = await this.$http.HallFunConfig.Postroomdata2({
                  keys: this.keys,
                  values: JSON.stringify(all),
                  id: this.id
                });
                // console.log(data);
                if (data.code === 1 && data.msg === "ok") {
                  this.getData()
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
            message: "输入正确格式的数字,必填项不能为空!"
          });
          return false;
        }
        })
   
      
      

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
    padding: 10px;
  }
}
</style>

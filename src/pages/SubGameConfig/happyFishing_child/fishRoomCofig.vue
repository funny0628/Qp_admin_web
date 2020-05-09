<template>
  <div
    id="fishRoomCofig"
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
        v-has="'hl_fish_room_config_send'"
        style="margin-bottom:10px"
        type="primary"
        @click="submit('ruleForm', 2)"
        >发送到服务器配置</el-button
      >
      <el-form
        v-has="'hl_fish_room_config_detail'"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="房间名称" prop="name">
          <el-input disabled v-model="ruleForm.name"></el-input>
          <span>房间ID:{{ruleForm.type_id}}</span>
        </el-form-item>

        <el-form-item label="场次开关" prop="open_game">
          <el-switch
            v-model="ruleForm.open_game"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="是否开放机器人" prop="open_robot">
          <el-switch
            v-model="ruleForm.open_robot"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="ip限制" prop="ip_limit">
          <el-switch
            v-model="ruleForm.ip_limit"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="携带上限" prop="max">
          <el-input type="number" v-model="ruleForm.max"></el-input>
        </el-form-item>

        <el-form-item label="携带下限" prop="min">
          <el-input type="number" v-model="ruleForm.min"></el-input>
        </el-form-item>

        <el-form-item label="子弹倍数" prop="multiple">
          <el-input type="number" v-model="ruleForm.multiple"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button v-has="'hl_fish_room_config_save'" type="primary" @click="submit('ruleForm', 1)"
            >立即提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'hl_fish_room_config',
  data() {
     let checkTime = (rule,value,callback) => {
      if(value === '') {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    };
    return {
      ruleForm: {
        type_id: "",
        open_game: "",
        open_robot: "",
        ip_limit: "",
        max: "",
        min: "",
        multiple: "",
        name: "",
        robot_type: "",
        is_hundred_game: ""
      },
      rules: {
        max: [ { required: true, validator: checkTime, trigger: "blur" }],
        min: [ {  required: true, validator: checkTime, trigger: "blur" }],
        multiple: [
          {  required: true, validator: checkTime, trigger: "blur" }
        ]
      },
      activeName: "",
      id: 0,
      keys: "",
      loading: false,
      //所有房间的数据
      allData: {},
      //匹配当前游戏的条件
      namelist: ["600", "601", "602"],
      //当前游戏的所有数据
      currentlist: {},
       //游戏场次类别
      labellist:[],
      //所有数据
      ResData:{}
    };
  },

  //roomdata.lua
  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.Getroomdata6({
      key: "roomdata.lua"
    });
    // console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    // console.log(res);
    this.allData = res;
    this.ResData = JSON.parse(JSON.stringify(res));

    this.namelist.forEach((it, index) => {
      Object.keys(res).forEach(item => {
        if (item === it) {
          this.currentlist[item] =res[item];
           this.labellist.push(res[it].name)
        }
        if (index === 0) {
          this.ruleForm = res[it];
          this.activeName = it;
        }
      });
    });
    // console.log(this.ruleForm, this.currentlist);
  },

  methods: {
    submit(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // console.log(this.ruleForm,this.currentlist,this.allData,this.ResData);
          Object.values(this.currentlist).forEach((item)=>{
            item.max = +item.max
            item.min = +item.min
            item.multiple = +item.multiple
          })
          Object.keys(this.ResData).forEach((item)=>{
            Object.keys(this.currentlist).forEach((it)=>{
              if(item === it){
                this.ResData[item] = this.currentlist[it]
              }
            })
          })

          if (type === 1) {
            let { data } = await this.$http.HallFunConfig.Putroomdata6({
              keys: this.keys,
              values: JSON.stringify(this.ResData),
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

            let { data } = await this.$http.HallFunConfig.Postroomdata6({
              keys: this.keys,
              values: JSON.stringify(this.ResData),
              id: this.id
            });
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.loading = false;
              this.$message({
                type: "success",
                message: "发送服务器配置成功!"
              });
            }else{
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
            message:"输入正确格式的数字,必填项不能为空!!"
          });
          return false;
        }
      });
    },
    handleClick(tab, event) {
      this.namelist.forEach(item => {
        if (tab.name === item) {
          this.ruleForm = this.currentlist[item];
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#fishRoomCofig {
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

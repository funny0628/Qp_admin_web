<template>
  <div
    id="SignUp"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <div class="title">
      <div class="VIP">签到配置</div>
    </div>
    <el-button v-has="'daily_sign_save'" type="primary" @click="send('form', 1)">保存</el-button>
    <el-button v-has="'daily_sign_send'" type="primary" @click="send('form', 2)">发送到服务器</el-button>
    <div class="contain">
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        label-width="150px"
        label-position="right"
      >
        <el-form-item label="签到门槛" prop="need_coin">
          <el-input  type="number" style="width:200px" v-model="form.need_coin"></el-input>
        </el-form-item>
        <el-form-item label="签到奖励" prop="award_coin">
          <el-input  type="number" style="width:200px" v-model="form.award_coin"></el-input>
        </el-form-item>
        <el-form-item label="月俸禄领取门槛" prop="salary_days">
          <el-input  type="number" style="width:200px" v-model="form.salary_days"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'daily_sign',
  data() {
      let checkItem = (rule,value,callback) => {
      if(!value) {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    };
    return {
      form: {
        need_coin: "",
        award_coin: "",
        salary_days: ""
      },
      rules: {
        need_coin: [{ required: true, validator: checkItem, trigger: "blur" }],
        award_coin: [
          { required: true, validator: checkItem, trigger: "blur" }
        ],
        salary_days: [
          { required: true, validator: checkItem, trigger: "blur" }
        ]
      },
      keys: "",
      id: "",
      //所有数据
      allData: {},
      loading: false,
      //所有数据
      ResData:{}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    send(formName, type) {
      // console.log(this.allData);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          Object.keys(this.form).forEach(item => {
            if(this.form['need_coin'] ==='' || this.form['award_coin'] ==='' || this.form['salary_days'] ===''){
                this.$message({
                type: "warning",
                message: "必填的项不可以为空!"
              });
              return false
            }else{
              this.form['need_coin'] = +this.form['need_coin']
              this.form['award_coin'] = +this.form['award_coin']
              this.form['salary_days'] = +this.form['salary_days']
            }
          });
          console.log(this.form,this.ResData);
          this.ResData['110'].ac_content = this.form
            if (type === 1) {
              let { data } = await this.$http.HallFunConfig.PutActivityNew5({
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
              } else {
                this.$message({
                  type: "warning",
                  message: "保存失败!"
                });
              }
            } else if (type === 2) {
              this.loading = true;
              let { data } = await this.$http.HallFunConfig.PostActivityNew5({
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
              } else {
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
            message: "必填的项不可以为空!"
          });
          return false;
        }
      });
    },
    async initData() {
      let { data } = await this.$http.HallFunConfig.GetActivityNew5({
        key: "activity_new.lua"
      });
      //   console.log(data);
      this.keys = data.data[0].sys_key;
      this.id = data.data[0].id;
      let res = data.data[0].sys_val;
      this.allData = JSON.parse(res);
      console.log(this.allData);
      this.ResData = JSON.parse(JSON.stringify(this.allData))
      console.log(this.ResData);
      
      //   console.log(this.keys, this.id, this.allData);
      Object.keys(this.allData).forEach(item => {
        if (item === "110") {
          this.form = this.allData[item].ac_content;
        }
      });
      // console.log(this.form);
      
    }
  }
};
</script>

<style lang="less" scoped>
#SignUp {
  // height: 500px;
  background-color: #f2f2f2;
  border: 1px solid #efefef;
  box-shadow: 1px 1px 2px #efefef;
  .title {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid#eee;
    margin-bottom: 20px;
    .VIP {
      font-size: 14px;
      width: 120px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
    }
  }
  .contain {
    margin-top: 20px;
  }
}
</style>

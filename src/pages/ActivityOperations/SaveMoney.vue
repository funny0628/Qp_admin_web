<template>
  <div
    id="SaveMoney"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <div>
      <h2>每日救赎金</h2>
      <el-button v-has="'daily_rescue_send'" type="primary" @click="send('form', 2)"
        >发送到服务器配置</el-button
      >
    </div>
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      style="margin-top:20px;padding-bottom:20px"
      label-width="120px"
    >
      <el-form-item label="活动名称" prop="ac_name">
        <el-input
          disabled
          style="width:220px"
          v-model="form.ac_name"
          placeholder="活动名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="活动状态" prop="open_state">
        <el-select v-model="form.open_state+''">
          <el-option label="开启" value="true"></el-option>
          <el-option label="关闭" value="false"></el-option>
        </el-select>
      </el-form-item>


    <div class="formTime">
        <p>
      <el-form-item label="活动时间" prop="ac_begin_time">
        <el-date-picker
          v-model="form.ac_begin_time"
          type="date"
          placeholder="请输入开始时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
       
         </el-form-item>
        
         </p>
         <span class="line">-</span>
         <p>
         <el-form-item label-width="20px"  prop="ac_end_time">
        <el-date-picker
          v-model="form.ac_end_time"
          type="date"
          placeholder="请输入结束时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      </p>
      </div>
      <el-form-item v-if="form.ac_content" label="救赎金" prop="ac_content">
        <el-button type="primary" @click="add">添加</el-button>

        <div v-for="(item, index) in form.ac_content.level" class="item">
          <p style="margin-top:10px;">
            当日亏损金额(递增):
            <el-input
            type="number"
              style="width:220px"
              v-model="item.lose_coin"
              placeholder="当日亏损金额"
            ></el-input>
          </p>
          <p style="border-bottom:1px solid #ccc">
            救赎金额:
            <span>
              <el-input
              type="number"
                style="width:220px"
                v-model="item.award_coin"
                placeholder="救赎金额"
              ></el-input>
              <el-button type="danger" @click="del(index)">删除</el-button>
              <!-- <p>(VIP1～VIP6可以领取的救援金额。每个数字间用“，”隔开)</p> -->
              <p></p>
            </span>
          </p>
        </div>
      </el-form-item>
      <el-button v-has="'daily_rescue_save'" type="primary" @click="send('form', 1)">保存</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'daily_rescue',
  data() {
     let checkTime = (rule,value,callback) => {
      if(value === null) {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    }
    return {
      form: {
        ac_type:'',
        ac_name: "",
        open_state: "",
        ac_begin_time: "",
        ac_end_time: "",
        ac_content:{
          level: [],
          prize_time:0,
          jump_position:0,
          bg_url:'',
        }
      },
      rules: {
        ac_name: [{ required: true, message: "不可以为空", trigger: "blur" }],
        open_state: [
          { required: true, message: "不可以为空", trigger: "blur" }
        ],
        ac_begin_time: [
          { required: true, validator: checkTime, trigger: "blur" }
        ],
        ac_end_time: [
          { required: true, validator: checkTime, trigger: "blur" }
        ],
      },
      keys: "",
      id: "",
      allData: "",
      loading: false,
      ResData:{}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    add() {
      // this.form.ac_content.level = Object.values(this.form.ac_content.level);
      this.form.ac_content.level.push({lose_coin:'',award_coin:''});
    },
    del(index) {
       this.$confirm('确认永久删除？')
          .then(_ => {
          this.form.ac_content.level = this.form.ac_content.level.filter((item, idx) => {
            return index !== idx;
          });
             this.$message({
            type: "success",
            message: "删除成功!"
          });

          })
          .catch(_ => {
               this.$message({
                type: "info",
                message: "取消删除!"
              });
          });
      
    },
    send(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
            this.form.ac_content.level.forEach((item)=>{
              if(item.award_coin === '' || item.lose_coin === ''){
                 this.$message({
                  type: "warning",
                  message: "必填的项不可以为空!"
                });
                return false
              }else{
                item.award_coin = +item.award_coin
                item.lose_coin = +item.lose_coin
              }
            })
            // console.log(this.form);
          let resData = JSON.parse(JSON.stringify(this.form));
          // console.log(resData);
          let resDataLeve = resData.ac_content.level
          resData.ac_content.level = {};
          resDataLeve.forEach((item, index) => {
            resData.ac_content.level[index + 1] = item;
          });
          // console.log(resData,this.ResData);
          Object.keys(this.ResData).forEach((it)=>{
            if(it === '111'){
              this.ResData[it] = resData
            }
          })
            
          if (type === 1) {
            //put
            let { data } = await this.$http.HallFunConfig.PutActivityNew2({
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
            //post
            this.loading = true;
            let { data } = await this.$http.HallFunConfig.PostActivityNew2({
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
          this.initData();
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
      let { data } = await this.$http.HallFunConfig.GetActivityNew2({
        key: "activity_new.lua"
      });
      // console.log(data);
      this.keys = data.data[0].sys_key;
      this.id = data.data[0].id;
      let res = data.data[0].sys_val;
      this.allData = JSON.parse(res);
      this.ResData = JSON.parse(JSON.stringify(this.allData))
      // console.log(this.ResData);
      // console.log(this.keys, this.id, this.allData);

      Object.keys(this.allData).forEach(item => {
        if (item === "111") {
          this.form = this.allData[item];
        }
      });
      this.form.ac_content.level = Object.values(this.form.ac_content.level);
      // console.log(this.form,this.allData);
    }
  }
};
</script>

<style lang="less" scoped>
#SaveMoney {
  // height: 500px;
  background-color: #f2f2f2;
  border: 1px solid #efefef;
  box-shadow: 1px 1px 2px #efefef;
  h2 {
    margin-left: 20px;
  }
  .item {
    margin-top: 30px;
  }
   .formTime {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .line {
      display: inline-block;
      height: 60px;
      line-height: 35px;
      margin-left: 20px;
    }
  }
}
</style>

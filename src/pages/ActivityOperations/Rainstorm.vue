<template>
  <div
    id="Rainstorm"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <el-button v-has="'daily_storm_send'" type="primary" @click="onSubmit('form', 2)"
      >发送到服务器配置</el-button
    >
    <!-- form表单 -->

    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="150px"
      style="margin-top:20px"
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
          <el-option label="待上线" value="true"></el-option>
          <el-option label="生效中" value="false"></el-option>
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

      <h2>金币暴风雨-(额外配置)</h2>

      <div>
        <div v-if="form.ac_content" class="topTitle">
          <p>
            <el-form-item label="活动触发时间点:" prop="open_time">
               <el-input
                style="width:80%;"
                v-model="form.ac_content.open_time"
                placeholder="每次触发持续时间"
              ></el-input>
              <p>每个时间之间使用 , 分隔</p>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="每次触发持续时间:" prop="continue">
              <el-input
              type="number"
                style="width:200px;"
                v-model="form.ac_content.continue"
                placeholder="每次触发持续时间"
              ></el-input>
            </el-form-item>
          </p>
          <p>
            <el-form-item v-if="form.ac_content.pack_num" label="每人每次领取红包:" prop="pack_num">
              <el-input
              type="number"
                style="width:200px;"
                v-model="form.ac_content.pack_num[1]"
                placeholder="每人每次领取红包"
              ></el-input>
              -
              <el-input
              type="number"
                style="width:200px;"
                v-model="form.ac_content.pack_num[2]"
                placeholder="每人每次领取红包"
              ></el-input>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="总发放金额:" prop="all_coins">
              <el-input
              type="number"
                style="width:200px;"
                v-model="form.ac_content.all_coins"
                placeholder="总发放金额"
              ></el-input>
            </el-form-item>
          </p>
        </div>

        <div class="topTitle" style="border-top:none">
            <p>
              <el-button type="primary" @click="add">添加</el-button>
            </p>
          <el-form-item v-if="form.ac_content.vip_range !== undefined && form.ac_content.vip_range.length>0" label="奖励:" prop="ac_content">
          
            <div v-for="(item, index) in form.ac_content.vip_range" style="margin-top:20px">
              VIP等级区间:
              <el-input
                type="number"
                style="width:150px;"
                v-model="item[1][1]"
                placeholder="VIP等级区间"
              ></el-input>
              -
              <el-input
                type="number"
                style="width:150px;"
                v-model="item[1][2]"
                placeholder="VIP等级区间"
              ></el-input>
              红包数量:
              <el-input
                type="number"
                style="width:150px;"
                v-model="item[2]"
                placeholder="红包数量"
              ></el-input>
              红包金额区间:
              <el-input
                type="number"
                style="width:150px;"
                v-model="item[3][1]"
                placeholder="红包金额区间"
              ></el-input>
              -
              <el-input
                type="number"
                style="width:150px;"
                v-model="item[3][2]"
                placeholder="红包金额区间"
              ></el-input>

              <el-button type="danger" @click="del(index)">删除</el-button>
            </div>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div style="margin-top:20px" slot="footer" class="dialog-footer">
      <el-button v-has="'daily_storm_save'" type="primary" @click="onSubmit('form', 1)">保 存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'daily_storm',
  data() {
      let checkTime = (rule,value,callback) => {
      if(value === null) {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    };
      let checkCoins = (rule,value,callback) => {
      if(this.form.ac_content.all_coins === '') {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    };
      let checkContinue = (rule,value,callback) => {
      if(this.form.ac_content.continue === '') {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    };
      let checkNum = (rule,value,callback) => {
      if(this.form.ac_content.pack_num['1'] === '' || this.form.ac_content.pack_num['2'] === '') {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    };
    return {
      loading: false,
      rules: {
        ac_begin_time: [
          { required: true, validator: checkTime, trigger: "blur" }
        ],
        ac_end_time: [
          { required: true, validator: checkTime, trigger: "blur" }
        ],
        all_coins: [
          { required: true, validator: checkCoins, trigger: "blur" }
        ],
        continue: [
          { required: true, validator: checkContinue, trigger: "blur" }
        ],
        pack_num: [
          { required: true, validator: checkNum, trigger: "blur" }
        ],
      },
      form: {
        ac_name: "",
        ac_type: "",
        open_state: "",
        ac_begin_time: "",
        ac_end_time: "",
        ac_content:{
          open_time:'',
          continue:'',
          pack_num:{},
          all_coins:'',
          vip_range:[],
          bg_url:'',
          jump_position:1019,
        }
      },
      keys: "",
      id: "",
      allData: "",
      ResData:{}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    //添加
    add() {
      this.form.ac_content.vip_range.push({1:{1:'',2:''},2:'',3:{1:'',2:''}});
    },

    //删除
    del(index) {
       this.$confirm('确认永久删除？')
          .then(_ => {
           this.form.ac_content.vip_range = this.form.ac_content.vip_range.filter((item, idx) => {
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

    //保存和发送配置
    async onSubmit(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // console.log(this.form);
          this.form.ac_content.continue = +this.form.ac_content.continue
          this.form.ac_content.all_coins = +this.form.ac_content.all_coins
          this.form.ac_content.pack_num['1'] = + this.form.ac_content.pack_num['1']
          this.form.ac_content.pack_num['2'] = + this.form.ac_content.pack_num['2']
          this.form.ac_content.vip_range.forEach((item)=>{
            if(item['1']['1'] === '' || item['1']['2'] === '' || item['2'] === '' || item['3']['1'] === '' || item['3']['2'] === ''){
               this.$message({
                type: "warning",
                message: "必填的项不可以为空!"
              });
              return false
            }else{
              item['1']['1'] = +item['1']['1']
              item['1']['2'] = +item['1']['2']
              item['2'] = +item['2']
              item['3']['1'] = +item['3']['1']
              item['3']['2'] = +item['3']['2']
            }
          })
          let resData = JSON.parse(JSON.stringify(this.form));
          // console.log(resData);
          let resDataLeve = resData.ac_content.vip_range
          resData.ac_content.vip_range = {};
          resDataLeve.forEach((item, index) => {
            resData.ac_content.vip_range[index + 1] = item;
          });
          console.log(resData,this.form);
          Object.keys(this.ResData).forEach((it)=>{
            if(it === '108'){
              this.ResData[it] = resData
            }
          })
          console.log(this.ResData);
          
            if (type === 1) {
              //put
              // console.log(this.ResData);
              let { data } = await this.$http.HallFunConfig.PutActivityNew4({
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
                  message: "保存失败"
                });
              }
            } else if (type === 2) {
              //post
              this.loading = true;
              let { data } = await this.$http.HallFunConfig.PostActivityNew4({
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
                  message: "发送服务器配置失败"
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
      let { data } = await this.$http.HallFunConfig.GetActivityNew4({
        key: "activity_new.lua"
      });
      // console.log(data);
      this.keys = data.data[0].sys_key;
      this.id = data.data[0].id;
      let res = data.data[0].sys_val;
      this.allData = JSON.parse(res);
      console.log(this.allData);
      this.ResData = JSON.parse(JSON.stringify(this.allData))
      console.log(this.ResData);
      Object.keys(this.allData).forEach(item => {
        if (item === "108") {
          this.form = this.allData[item];
        }
      });
       this.form.ac_content.vip_range = Object.values(this.form.ac_content.vip_range);
       console.log(this.form);
       
    }
  }
};
</script>

<style lang="less" scoped>
#Rainstorm {
  // background-color: #f2f2f2;
  padding: 20px;
  p {
    margin-top: 20px;
  }
  .topTitle {
    padding: 20px;
    padding-left: 0;
    padding-right: 0;
    // margin: 20px;
    // margin-left: 0;
    // margin-right: 0;
    border: 1px solid orange;
    border-left: none;
    border-right: none;
    p {
      /deep/.el-form-item .el-form-item__content .el-input input{
         white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
    }
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

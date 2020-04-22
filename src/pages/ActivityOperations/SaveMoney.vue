<template>
  <div id="SaveMoney">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      style="margin-top:20px"
      label-width="120px"
    >
      <el-form-item label="活动名称" prop="act_name">
        <el-input
          disabled
          style="width:220px"
          v-model="form.ac_name"
          placeholder="活动名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="活动状态" prop="act_status">
        <el-select v-model="form.open_state">
          <el-option label="开启" value="true"></el-option>
          <el-option label="关闭" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" prop="start_time">
        <el-date-picker
          v-model="form.ac_begin_time"
          type="date"
          placeholder="请输入开始时间"
          format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
        -
        <el-date-picker
          v-model="form.ac_end_time"
          type="date"
          placeholder="请输入结束时间"
          format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="救赎金" prop="level">
        <el-button type="primary" @click="add">添加</el-button>

        <div v-for="(item, index) in form.level" class="item">
          <p style="margin-top:10px;">
            当日亏损金额(递增):
            <el-input
              style="width:220px"
              v-model="item.lose_coin"
              placeholder="当日亏损金额"
            ></el-input>
          </p>
          <p>
            救赎金额(VIP1～VIP6可以领取的救援金额。每个数字间用“，”隔开):
            <el-input
              style="width:400px"
              v-model="item.award_coin"
              placeholder="救赎金额"
            ></el-input>
            <el-button type="danger" @click="del(index)">删除</el-button>
          </p>
        </div>
         <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    add() {},
    del() {},
    save() {},

    async initData() {
      let { data } = await this.$http.HallFunConfig.GetServerConfig({
        key: "activity_new.lua"
      });
      console.log(data);
      this.keys = data.data[0].sys_key;
      this.id = data.data[0].id;
      let res = data.data[0].sys_val;
      this.allData = JSON.parse(res);
      console.log(this.keys, this.id, this.allData);

      Object.keys(this.allData).forEach(item => {
        if (this.allData[item].ac_type === "10002") {
          this.form = this.allData[item];
        }
      });
      console.log(this.form);
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
 .item {
   margin-top: 30px;
 }
}
</style>


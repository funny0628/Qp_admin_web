<template>
  <div
    id="Rainstorm"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <!-- form表单 -->

    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="活动名称" prop="ac_name">
        <el-input
          disabled
          style="width:220px"
          v-model="form.ac_name"
          placeholder="活动名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动状态" prop="open_state">
        <el-select v-model="form.open_state">
          <el-option label="待上线" value="true"></el-option>
          <el-option label="生效中" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" prop="ac_begin_time">
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

      <h2>金币暴风雨-(额外配置)</h2>

      <div>
        <div class="topTitle">
          <p v-if="form.ac_day_time">
            活动触发时间点:
            <el-input
              style="width:150px;"
              v-model="form.ac_day_time['1']"
              placeholder="活动触发时间点"
            ></el-input>
          </p>
          <p>
            每次触发持续时间:
            <el-input
              style="width:150px;"
              v-model="form.last_time"
              placeholder="每次触发持续时间"
            ></el-input>
          </p>
          <p v-if="form.get_num">
            每人每次领取红包:
            <el-input
              style="width:150px;"
              v-model="form.get_num.min"
              placeholder="每人每次领取红包"
            ></el-input>
            -
            <el-input
              style="width:150px;"
              v-model="form.get_num.max"
              placeholder="每人每次领取红包"
            ></el-input>
          </p>
          <p>
            总发放金额:
            <el-input
              v-if="form.all_coin"
              style="width:150px;"
              v-model="form.all_coin"
              placeholder="总发放金额"
            ></el-input>
          </p>
        </div>

        <div class="topTitle" style="border-top:none">
          <p>
            奖励:
            <el-button type="primary" @click="add">添加</el-button>
          </p>
          <div
            v-for="(item, index) in form.level"
            style="margin-top:10px"
          >
            VIP等级区间:
            <el-input
              style="width:150px;"
              v-model="item.vip_start"
              placeholder="VIP等级区间"
            ></el-input>
            -
            <el-input
              style="width:150px;"
              v-model="item.vip_end"
              placeholder="VIP等级区间"
            ></el-input>
            红包数量:
            <el-input
              style="width:150px;"
              v-model="item.num"
              placeholder="红包数量"
            ></el-input>
            红包金额区间:
            <el-input
              style="width:150px;"
              v-model="item.min_coin"
              placeholder="红包金额区间"
            ></el-input>
            -
            <el-input
              style="width:150px;"
              v-model="item.max_coin"
              placeholder="红包金额区间"
            ></el-input>

            <el-button type="danger" @click="del(index)">删除</el-button>
          </div>
        </div>
      </div>
    </el-form>
    <div style="margin-top:20px" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('form', title)"
        >保 存</el-button
      >
      <el-button type="primary" @click="back()">返 回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      rules: {
        act_name: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        type_id: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        status_id: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        act_info: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        start_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      form: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    add() {},
    del() {},
    back() {},
    onSubmit() {},
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
        if (this.allData[item].ac_type === "10004") {
          this.form = this.allData[item];
        }
      });
      console.log(this.form);
    }
  }
};
</script>

<style lang="less" scoped>
#Rainstorm {
  // background-color: #f2f2f2;

  p {
    margin-top: 20px;
  }
  .topTitle {
    padding: 20px;
    padding-left: 0;
    padding-right: 0;
    margin: 20px;
    margin-left: 0;
    margin-right: 0;
    border: 1px solid orange;
    border-left: none;
    border-right: none;
  }
  .item {
    margin: 20px;
    margin-left: 0px;
    margin-right: 0px;
    border-bottom: 1px solid #ccc;
  }
}
</style>

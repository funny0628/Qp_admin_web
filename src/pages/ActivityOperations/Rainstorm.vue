<template>
  <div
    id="Rainstorm"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <el-button type="primary" @click="onSubmit('form', 2)"
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
            <el-form-item label="活动触发时间点:" prop="ac_day_time">
              <el-time-picker
                v-model="form.ac_day_time['1']"
                value-format="HH:mm:ss"
                format="HH:mm:ss"
                placeholder="任意时间点"
              >
              </el-time-picker>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="每次触发持续时间:" prop="last_time">
              <el-input
                style="width:150px;"
                v-model="form.last_time"
                placeholder="每次触发持续时间"
              ></el-input>
            </el-form-item>
          </p>
          <p v-if="form.get_num">
            <el-form-item label="每人每次领取红包:" prop="get_num">
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
            </el-form-item>
          </p>
          <p>
            <el-form-item label="总发放金额:" prop="all_coin">
              <el-input
                style="width:150px;"
                v-model="form.all_coin"
                placeholder="总发放金额"
              ></el-input>
            </el-form-item>
          </p>
        </div>

        <div class="topTitle" style="border-top:none">
          <el-form-item label="奖励:" prop="level">
            <p>
              <el-button type="primary" @click="add">添加</el-button>
            </p>
            <div v-for="(item, index) in form.level" style="margin-top:20px">
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
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div style="margin-top:20px" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('form', 1)">保 存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      rules: {
        ac_name: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        open_state: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        ac_begin_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        ac_end_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        ac_day_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        get_num: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        all_coin: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        level: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      form: {
        ac_name: "",
        open_state: "",
        ac_begin_time: "",
        ac_end_time: "",
        ac_day_time: "",
        get_num: "",
        all_coin: "",
        level: []
      },
      keys: "",
      id: "",
      allData: ""
    };
  },
  created() {
    this.initData();
  },
  methods: {
    //添加
    add() {
      this.form.level = Object.values(this.form.level);
      this.form.level.push({});
    },

    //删除
    del(index) {
      this.form.level = this.form.level.filter((item, idx) => {
        return index !== idx;
      });
    },

    //保存和发送配置
    async onSubmit(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let resData = this.form.level;
          this.form.level = {};
          // console.log(resData, this.form.level);
          resData.forEach((item, index) => {
            this.form.level[index + 1] = item;
          });
          if (type === 1) {
            //put
            // console.log(this.allData);
            let { data } = await this.$http.HallFunConfig.PutServerConfig({
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
            }
          } else if (type === 2) {
            //post
            this.loading = true;
            let { data } = await this.$http.HallFunConfig.PostServerConfig({
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
      let { data } = await this.$http.HallFunConfig.GetServerConfig({
        key: "activity_new.lua"
      });
      // console.log(data);
      this.keys = data.data[0].sys_key;
      this.id = data.data[0].id;
      let res = data.data[0].sys_val;
      this.allData = JSON.parse(res);
      // console.log(this.keys, this.id, this.allData);
      Object.keys(this.allData).forEach(item => {
        if (this.allData[item].ac_type === "10004") {
          this.form = this.allData[item];
        }
      });
      this.form.level = Object.values(this.form.level);
      // console.log(this.form);
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
    // margin: 20px;
    // margin-left: 0;
    // margin-right: 0;
    border: 1px solid orange;
    border-left: none;
    border-right: none;
  }
}
</style>

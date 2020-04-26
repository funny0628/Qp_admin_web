<template>
  <div id="reportWayConfig">
    <div class="title">
      <p @click="save">保存</p>
      <div class="repor">举报功能配置</div>
    </div>
    <div class="contain">
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="微信号" prop="wx">
          <el-input style="width:150px" v-model="form.wx"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input style="width:150px" v-model="form.money"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "reportWayConfig",
  data() {
    return {
      wx: "",
      money: "",
      id: "",
      keys: "",
      form: {
        wx: "",
        money: ""
      },
      rules: {
        wx: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
        money: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      }
    };
  },
  async created() {
    let { data } = await this.$http.HallFunConfig.GetComplaintConfig({
      key: "complaint_config.lua"
    });
    // console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    this.form.wx = res.wx;
    this.form.money = res.money;
  },
  methods: {
    async save() {
      // console.log(this.form);
      if (this.form.wx === "" || this.form.money === "") {
        this.$message({
          type: "warning",
          message: "请完整填写信息!"
        });
        return false;
      }

      let { data } = await this.$http.HallFunConfig.PutComplaintConfig({
        keys: this.keys,
        id: this.id,
        values: JSON.stringify(this.form)
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
          message: "保存失败"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
#reportWayConfig {
  // height: 500px;
  background-color: #f2f2f2;
  border: 1px solid #efefef;
  box-shadow: 1px 1px 2px #efefef;
  .title {
    width: 100%;
    border-bottom: 1px solid #eee;
    p {
      width: 100px;
      height: 30px;
      padding: 0;
      margin: 0;
      color: #fff;
      text-align: center;
      line-height: 30px;
      background-color: #009688;
      &:hover {
        background-color: #30a89d;
      }
    }
    .repor {
      margin-top: 10px;
      font-size: 14px;
      width: 120px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
    }
  }
  .contain {
    padding-top: 10px;
  }
}
</style>

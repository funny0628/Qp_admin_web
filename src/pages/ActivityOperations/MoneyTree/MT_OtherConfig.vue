<template>
  <div id="MT_OtherConfig">
    <div class="title">
      <h2>其他配置</h2>
      <el-button type="primary" @click="send('form', 2)"
        >发送服务器配置</el-button
      >
    </div>
    <div class="form">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="150px"
        style="margin-top:20px"
      >
        <el-form-item label="肥料" prop="ac_name">
          <el-input
            style="width:220px"
            v-model="form.ac_name"
            placeholder="0"
          ></el-input
          >(成长值)
        </el-form-item>
        <el-form-item label="帮助说明文本内容" prop="ac_name">
          <el-input
            style="width:220px"
            v-model="form.ac_name"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="摇奖次数特定任务文本提示内容" prop="ac_name">
          <el-input
            style="width:220px"
            v-model="form.ac_name"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="send('form', 1)">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ac_name: ""
      },
      rules: {
        ac_name: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
      this.initData();
  },
  methods: {
    send(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

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
    //   Object.keys(this.allData).forEach(item => {
    //     if (this.allData[item].ac_type === "10004") {
    //       this.form = this.allData[item];
    //     }
    //   });
    //   this.form.level = Object.values(this.form.level);
    //   console.log(this.form);
    }
  }
};
</script>

<style lang="less" scoped>
#MT_OtherConfig {
}
</style>

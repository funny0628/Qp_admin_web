<template>
  <div
    id="MT_OtherConfig"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <div class="title">
      <h2>其他配置</h2>
      <el-button v-has="'rainmaker_other_config_send'" type="primary" @click="send('form', 2)"
        >发送服务器配置</el-button
      >
    </div>
    <div class="form" v-has="'rainmaker_other_config_detail'">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="150px"
        style="margin-top:20px"
      >
        <el-form-item label="肥料" prop="experience">
          <el-input
            style="width:220px"
            v-model="form.experience"
            placeholder="0"
          ></el-input
          >(成长值)
        </el-form-item>
        <el-form-item label="帮助说明文本内容" prop="help">
          <el-input
            type="textarea"
            v-model="form.help"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="摇奖次数特定任务文本提示内容" prop="task_txt">
          <el-input
            type="textarea"
            v-model="form.task_txt"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-button v-has="'rainmaker_other_config_save'" type="primary" @click="send('form', 1)">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'rainmaker_other_config',
  data() {
    return {
      form: {
        experience: "",
        help: "",
        task_txt: ""
      },
      rules: {
        experience: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        help: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        task_txt: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      keys: "",
      id: "",
      allData: {},
      loading: false
    };
  },
  created() {
    this.initData();
  },
  methods: {
    send(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (type === 1) {
            // console.log(this.form,this.allData);

            let { data } = await this.$http.HallFunConfig.PutActivityNew31({
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
            }else{
               this.$message({
                type: "warning",
                message: "保存失败!"
              });
            }
          } else if (type === 2) {
            this.loading = true;
            let { data } = await this.$http.HallFunConfig.PostActivityNew31({
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
        } else {
          this.$message({
            type: "warning",
            message: "必填的项不可以为空"
          });
          return false;
        }
      });
    },

    async initData() {
      let { data } = await this.$http.HallFunConfig.GetActivityNew31({
        key: "activity_new.lua"
      });
      //   console.log(data);
      this.keys = data.data[0].sys_key;
      this.id = data.data[0].id;
      let res = data.data[0].sys_val;
      this.allData = JSON.parse(res);
      Object.keys(this.allData).forEach(item => {
        if (this.allData[item].ac_type === "10003") {
          this.form = this.allData[item].ac_content.other[0];
        }
      });
      // console.log(this.form, this.allData);
    }
  }
};
</script>

<style lang="less" scoped>
#MT_OtherConfig {
  padding: 20px;
}
</style>

<template>
  <div id="GMrepControl-main">
    <input-area>
      <el-button
        type="primary"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="send('form',1)"
        >保存</el-button
      >
      <el-button type="primary" @click="send('form',2)">发送到服务器配置</el-button>
      <div>
        <div class="gm">GM库存控制</div>
      </div>
    </input-area>
    <div class="bd">
      <el-form :rules="rules" :model="form" style="width:30%;">
        <el-form-item
          prop="gm_coins"
          label="实时库存值(元)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.gm_coins"
            autocomplete="off"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="warn_coins"
          label="警报值(元)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.warn_coins"
            autocomplete="off"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="gm_add_coins"
          label="库存累计添加值(元)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.gm_add_coins"
            autocomplete="off"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="add_store"
          label="添加库存(元)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.add_store"
            autocomplete="off"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-button type="primary" style="margin-top:10px;">添加库存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import InputArea from "../../../plugin/components/InputArea";
export default {
  name: "GMrepControl",
  components: {
    InputArea
  },
  data() {
    return {
      id: "",
      key: "",
      form: {
        gm_coins: "",
        warn_coins: "",
        gm_add_coins: "",
        add_store: ""
      },
      rules: {
        gm_coins: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        warn_coins: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        gm_add_coins: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        add_store: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      formLabelWidth: "150px"
    };
  },
  created() {
    this.initData({ key: "gm_control.lua" });
  },
  methods: {
    send(formName,type) {
      this.$refs[formName].validate(async (valid, x) => {
        if (valid) {
          if (type === 1) {
            //保存
            // console.log(this.form);

            let { data } = await this.$http.HallFunConfig.PutServerConfig({
              keys: this.key,
              values: JSON.stringify({ gm_coins: this.form }),
              id: this.id
            });
            // console.log(data);
            if (data.code === 1 && data.msg) {
     
              this.$message({
                type: "success",
                message: "保存成功"
              });
            }
          } else {
            //配置
            let { data } = await this.$http.HallFunConfig.PostServerConfig({
              keys: this.key,
              values: JSON.stringify({ gm_coins: this.form }),
              id: this.id
            });
            // console.log(data);
            if (data.code === 1 && data.msg) {
  
              this.$message({
                type: "success",
                message: "发送服务器配置成功"
              });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    async initData(params) {
      let { data } = await this.$http.HallFunConfig.GetServerConfig(params);
      // console.log(data);
      this.key = data.data[0].sys_key;
      this.id = data.data[0].id;
      this.form = JSON.parse(data.data[0].sys_val).gm_coins;
      // console.log(this.form);
    }
  }
};
</script>

<style scoped>
#GMrepControl-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#GMrepControl-main .bd p {
  margin: 0;
}
#GMrepControl-main >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
.el-pagination {
  margin-top: 20px;
}
.gm {
  width: 120px;
  height: 36px;
  background-color: #ccc;
  line-height: 36px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
</style>

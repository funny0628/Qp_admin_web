<template>
  <div id="GMrepControl-main">
    <input-area>
      <el-button type="primary" style="margin-top: 10px;margin-bottom: 10px;">保存</el-button>
      <el-button type="primary" @click="open">发送到服务器配置</el-button>
      <div>
        <div class="gm">GM库存控制</div>
      </div>
    </input-area>
    <div class="bd">
      <el-form :rules="rules" :model="form" style="width:30%;">
        <el-form-item prop="name" label="实时库存值(元)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="警报值(元)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="库存累计添加值(元)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="添加库存(元)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
          <el-button type="primary" style="margin-top:10px;">添加库存</el-button>
        </el-form-item>
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
      form: {
        name: "",
      },
      rules:{
         name: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
      },
      formLabelWidth: "150px"
    };
  },
  methods: {
    open() {
      this.$prompt("保留金额", "设置保留金额", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: true,
        inputValue: this.keep_money,
        inputType: "number"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  mounted() {
    this.getExchangeList();
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

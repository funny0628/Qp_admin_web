<template>
  <div id="GMrepControl-main">
    <input-area>
      <span>GM配置</span>
      <el-button type="primary" size="mini" @click="open">发送到服务器配置</el-button>
    </input-area>
    <div class="bd">
      <el-form :rules="rules" :model="form">
        <el-form-item prop="name" label="控制概率(百分比)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="首冲返水率(百分比)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="首冲返水权重" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="充值返水率(百分比)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="充值返水权重" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="兑换返水率(百分比)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="兑换返水权重" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="新增加返水率(百分比)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="新增加返水权重" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" :label-width="formLabelWidth">
          <el-button type="success" size="mini" @click="add">新增区间控制</el-button>
        </el-form-item>
        <el-form-item prop="name" label="个人库存区间" :label-width="formLabelWidth" v-for="(item,index) in counter" :key="index">
          <el-row>
              <el-col :span="6">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="2" style="text-align:center;color:#6e7073;">~</el-col>
              <el-col :span="6">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="2" style="text-align:center;color:#6e7073;">概率(%):</el-col>
              <el-col :span="6">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="2" style="padding-left:10px;">
                  <el-button type="success" size="medium" @click="deleteItem(index)">删除</el-button>
              </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" size="medium">确认</el-button>
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
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
       rules:{
         name: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
      },
      formLabelWidth: "150px",
      counter: [1]
    };
  },
  methods: {
    add() {
      this.counter.push(1);
    },
    deleteItem(index) {
      this.counter = this.counter.filter((item, n) => {
        return index !== n;
      });
    },
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
</style>

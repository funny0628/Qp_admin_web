<template>
  <div id="GMrepControl-main">
    <input-area>
      <span>GM配置</span>
      <el-button type="primary" size="mini" @click="send('form', 2)"
        >发送到服务器配置</el-button
      >
    </input-area>
    <div class="bd">
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item
          prop="control_rate"
          label="控制概率(百分比)"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.control_rate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="frist_charge_rate"
          label="首冲返水率(百分比)"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.frist_charge_rate"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="frist_charge_rate"
          label="首冲返水权重"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.frist_charge_rate"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="charge_rate"
          label="充值返水率(百分比)"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.charge_rate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="charge_weight"
          label="充值返水权重"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.charge_weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="exchange_rate"
          label="兑换返水率(百分比)"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.exchange_rate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="exchange_rate"
          label="兑换返水权重"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.exchange_rate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="exchange_rate"
          label="新增加返水率(百分比)"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.exchange_rate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="new_player_weight"
          label="新增加返水权重"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.new_player_weight"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-button
          style="margin:20px"
          type="success"
          size="mini"
          @click="addItem"
          >新增区间控制</el-button
        >
        <el-form-item
          prop="name"
          label="个人库存区间"
          :label-width="formLabelWidth"
          v-for="(item, index) in form.range_control_rate"
          :key="index"
        >
          <el-row>
            <el-col :span="6">
              <el-input v-model="item.min" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="2" style="text-align:center;color:#6e7073;"
              >~</el-col
            >
            <el-col :span="6">
              <el-input v-model="item.max" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="2" style="text-align:center;color:#6e7073;"
              >概率(%):</el-col
            >
            <el-col :span="6">
              <el-input v-model="item.rate" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="2" style="padding-left:10px;">
              <el-button type="success" size="medium" @click="deleteItem(index)"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" size="medium" @click="send('form', 1)"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import LoginVue from "../../login/Login.vue";
export default {
  name: "GMrepControl",

  data() {
    return {
      id: "",
      key: "",
      form: {
        control_rate: "",
        frist_charge_rate: "",
        frist_charge_weight: "",
        charge_rate: "",
        charge_weight: "",
        exchange_rate: "",
        exchange_weight: "",
        new_player_rate: "",
        new_player_weight: "",
        user_guide_rate: "",
        user_guide_weight: "",
        range_control_rate: []
      },
      rules: {
        control_rate: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        frist_charge_rate: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        frist_charge_weight: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        charge_rate: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        charge_weight: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        exchange_rate: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        exchange_weight: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        new_player_rate: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        new_player_weight: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      formLabelWidth: "150px"
    };
  },
  created() {
    this.initData({ key: "personal_control.lua" });
  },
  methods: {
    addItem() {
      this.form.range_control_rate.push({});
    },
    deleteItem(index) {
      this.form.range_control_rate = this.form.range_control_rate.filter(
        (item, n) => {
          return index !== n;
        }
      );
    },
    send(formName, type) {
      this.$refs[formName].validate(async (valid, x) => {
        if (valid) {
          // console.log(this.form);
          if (type === 1) {
            //put
            let { data } = await this.$http.HallFunConfig.PutServerConfig({
              keys: this.key,
              values: JSON.stringify(this.form),
              id: this.id
            });
            // console.log(data);
            if (data.code === 1 && data.msg) {

              this.$message({
                type: "success",
                message: "保存成功"
              });
            }
          } else if (type === 2) {
            // post
            let { data } = await this.$http.HallFunConfig.PostServerConfig({
              keys: this.key,
              values: JSON.stringify( this.form ),
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
      this.form = JSON.parse(data.data[0].sys_val);
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
</style>

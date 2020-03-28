<template>
  <div id="RankListManageConf">
    <!-- 头部 -->
    <div class="title">
      排行榜配置
      <span class="send" @click="send">发送到服务器配置</span>
    </div>
    <!-- form -->
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="排行榜显示配置" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="今日赚钱排行" name="type"></el-checkbox>
            <el-checkbox label="今日提现排行" name="type"></el-checkbox>
            <el-checkbox label="在线时长排行" name="type"></el-checkbox>
          </el-checkbox-group>
          <span> 排行榜显示设置</span>
        </el-form-item>

        <el-form-item label="金币上榜条件" prop="region">
          <el-input v-model="ruleForm.region"></el-input>
          <span>金币上榜条件（元）</span>
        </el-form-item>

        <el-form-item label="提现上榜条件" prop="region">
          <el-input v-model="ruleForm.region"></el-input>
          <span>提现上榜条件（元）</span>
        </el-form-item>

        
        <el-form-item label="在线时长" prop="region">
          <el-input v-model="ruleForm.region"></el-input>
          <span>在线时长 上榜条件(秒)</span>
        </el-form-item>
        
        <el-form-item label="刷新时间" prop="region">
          <el-input v-model="ruleForm.region"></el-input>
          <span>刷新时间(分)</span>
        </el-form-item>
        
        <el-form-item label="机器人数值改变概率" prop="region">
          <el-input v-model="ruleForm.region"></el-input>
          <span>机器人数值改变概率(0 - 100数字)</span>
        </el-form-item>
        <el-form-item label="机器人数值改变范围倍数（小）" prop="region">
         <el-input-number size="medium" v-model="ruleForm.num2"></el-input-number>&nbsp;&nbsp; - &nbsp;&nbsp;
          <el-input-number size="medium" v-model="ruleForm.num2"></el-input-number>
          <p>机器人数值改变范围倍数{0,10000}</p>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        num2:0
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    send() {
      console.log("发送到服务器配置");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
#RankListManageConf {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    padding: 20px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
    span {
      display: inline-block;
      font-size: 14px;
      color: #fff;
      width: 140px;
      height: 30px;
      margin-right: 5px;
      line-height: 30px;
      text-align: center;
      background-color: #009688;
      &:hover {
        background-color: #30a89d;
      }
    }
  }
  .form {
    span,
    p {
      color: #a8a8a8;
    }
  }
}
</style>

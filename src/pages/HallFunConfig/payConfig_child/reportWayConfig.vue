<template>
  <div id="reportWayConfig">
    <div class="title">
      <p>保存</p>
      <div class="repor">举报功能配置</div>
    </div>
    <div class="contain">
      <el-form
        :model="formLabelAlign"
        status-icon
        :rules="rules"
        ref="formLabelAlign"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="微信号" prop="weixinhao">
          <el-input
            style="width:150px"
            v-model="formLabelAlign.weixinhao"
          ></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="jine">
          <el-input
            style="width:150px"
            v-model="formLabelAlign.jine"
          ></el-input>
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
      input: "",
      input1: "",
      formLabelAlign: {
        weixinhao: "123456",
        jine: "3000"
      },
      rules: {
        weixinhao: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        jine: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      }
    };
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

<template>
  <div id="fishRoomCofig">
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="捕鱼-低倍场" name="first"></el-tab-pane>
        <el-tab-pane label="捕鱼-中倍场" name="second"></el-tab-pane>
        <el-tab-pane label="捕鱼-高倍场" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- form -->
    <div class="form">
      <el-button style="margin-bottom:10px" type="primary" @click="send">发送到服务器配置</el-button>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="房间名称" prop="region">
          <el-input v-model="ruleForm.region"></el-input>
          <span>房间ID:602</span>
        </el-form-item>

        <el-form-item label="场次开关" prop="region">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="是否开放机器人" prop="region">
          <el-switch
            v-model="value1"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="ip限制" prop="region">
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="携带上限" prop="region">
          <el-input v-model="ruleForm.region"></el-input>
        
        </el-form-item>

        <el-form-item label="携带下限" prop="region">
          <el-input v-model="ruleForm.region"></el-input>
        
        </el-form-item>

        <el-form-item label="子弹倍数" prop="region">
          <el-input v-model="ruleForm.region"></el-input>
         
        </el-form-item>

  

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即提交</el-button
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
      ruleForm: {},
      rules: {},
      activeName: "first",
      value: true,
      value1: true,
      value2: true
    };
  },
  methods: {
    submitForm() {},
    handleClick(tab, event) {
      console.log(tab, event);
    },
    send() {}
  }
};
</script>

<style lang="less" scoped>
#fishRoomCofig {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    padding: 10px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
    // ul {
    //   display: flex;
    //   li {
    //     list-style: none;
    //     margin-right: 10px;
    //   }
    // }
  }
  .form {
      padding: 10px;
  }
}
</style>

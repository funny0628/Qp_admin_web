
<template>
  <div id="L_RobotControl">
    <el-button type="primary" @click="save">----保存</el-button
    ><el-button type="primary" @click="send">发送到服务器配置</el-button>
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="斗地主-低倍场" name="first"></el-tab-pane>
        <el-tab-pane label="斗地主-中倍场" name="second"></el-tab-pane>
        <el-tab-pane label="斗地主-高倍场" name="third"></el-tab-pane>
        <el-tab-pane label="斗地主-土豪场" name="four"></el-tab-pane>
      </el-tabs>
    </div>
      <!-- form -->
    
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="机器人总数" prop="name">
          <el-input style="width:200px" v-model="ruleForm.room" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="携带范围" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input> (格式如：1,2）
        </el-form-item>
        <el-form-item label="携带金币总额(元)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
        </el-form-item>
     
    
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName:'first',
      ruleForm:{},
      rules:{},
    }
  },
  methods: {
    handleClick(){},
    save(){},
    send(){},
    submitForm(){},
  },
};
</script>

<style lang="less" scoped>
#L_RobotControl {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    padding: 10px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
  .form {
    padding: 0px 10px;
  }
}
</style>

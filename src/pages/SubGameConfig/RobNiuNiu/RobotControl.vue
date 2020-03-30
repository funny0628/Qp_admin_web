<template>
  <div id="RobotControl">
    <el-button type="primary" @click="save">保存</el-button
    ><el-button type="primary" @click="send">发送到服务器配置</el-button>
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="抢庄牛牛-低倍场" name="first"></el-tab-pane>
        <el-tab-pane label="抢庄牛牛-中倍场" name="second"></el-tab-pane>
        <el-tab-pane label="抢庄牛牛-高倍场" name="third"></el-tab-pane>
        <el-tab-pane label="抢庄牛牛-土豪场" name="four"></el-tab-pane>
        <el-tab-pane label="test1" name="five"></el-tab-pane>
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


        <el-form-item label="单场机器人的数量及概率" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：3=40,4=40,5=20）
        </el-form-item>
        <el-form-item label="携带范围" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input> (格式如：1,2）
        </el-form-item>
        <el-form-item label="携带金币总额(元)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
        </el-form-item>
        <el-form-item label="离桌率(百分比)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
        </el-form-item>
        <el-form-item label="无牛抢庄" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余1,2,3抢庄" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input> （格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余4,5,6抢庄" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余7,8,9抢庄" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余10抢庄" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input> （格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="无牛下注" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余1,2,3下注" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余4,5,6下注" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余7,8,9下注" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：90,10,0,0,0）
        </el-form-item>
        <el-form-item label="剩余10下注" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：90,10,0,0,0）
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
#RobotControl {
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


<template>
  <div id="H_RobotControl">
    <el-button type="primary" @click="save">保存</el-button
    ><el-button type="primary" @click="send">发送到服务器配置</el-button>
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="非R" name="first"></el-tab-pane>
        <el-tab-pane label="小R" name="second"></el-tab-pane>
        <el-tab-pane label="中R" name="third"></el-tab-pane>
        <el-tab-pane label="大R" name="four"></el-tab-pane>
        <el-tab-pane label="土豪" name="five"></el-tab-pane>
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

        <el-form-item label="人数范围" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：1,2）
        </el-form-item>
        <el-form-item label="携带金币范围(元)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input> (格式如：1,2）
        </el-form-item>
      
        <el-form-item label="机器人离桌率(百分比)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="机器人下注下限(元)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
        </el-form-item>
        <el-form-item label="上局下注选用比例" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
        </el-form-item>
        <el-form-item label="庄对、闲对、和下注区域浮动值" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input> (1,5) 表示机器人有百分之1到百分之5的概率会下注特殊牌型区域)
        </el-form-item>

        <el-form-item label="区域下注浮动值(百分比)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>（格式如：80-20）
        </el-form-item>
      
        <el-form-item label="Vip座位上座率(百分比)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
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
#H_RobotControl {
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




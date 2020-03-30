<template>
  <div id="RoomCofig">
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="抢庄牛牛-低倍场" name="first"></el-tab-pane>
        <el-tab-pane label="抢庄牛牛-中倍场" name="second"></el-tab-pane>
        <el-tab-pane label="抢庄牛牛-高倍场 " name="third"></el-tab-pane>
        <el-tab-pane label="抢庄牛牛-土豪场" name="four"></el-tab-pane>
        <el-tab-pane label="test1" name="five"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- form -->
    
    <div class="form">
      <el-button style="margin-bottom:10px" type="success" @click="send">发送到服务器配置</el-button>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="房间名称" prop="name">
          <el-input style="width:200px" v-model="ruleForm.room" placeholder="房间名称"></el-input>房间ID:200200
        </el-form-item>

        <el-form-item label="场次开关" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="是否开放机器人" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="ip限制" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>

        <el-form-item label="底注" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
        </el-form-item>
        <el-form-item label="台费" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>(百分比)
        </el-form-item>
      
         </el-form-item>
        <el-form-item label="携带上限" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="携带下限" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="抢庄区间设置" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="1,2|2,3|3,4"></el-input> 1,2|2,3|3,4 或者1,2;2,3;3;4 多个数字用逗号分隔,多个配置用;号或者|分隔
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
      activeName: "first",
      ruleForm: {
        delivery:true,

      },
      rules: {}
    };
  },
  methods: {
    send() {},
    handleClick() {},
    submitForm() {},
  }
};
</script>

<style lang="less" scoped>
#RoomCofig {
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



<template>
  <div id="H_RoomCofig">
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="传奇厅01" name="first"></el-tab-pane>
        <el-tab-pane label="传奇厅02" name="second"></el-tab-pane>
        <el-tab-pane label="荣耀厅01 " name="third"></el-tab-pane>
        <el-tab-pane label="荣耀厅02" name="four"></el-tab-pane>
        <el-tab-pane label="聚龙厅01" name="five"></el-tab-pane>
        <el-tab-pane label="聚龙厅02" name="six"></el-tab-pane>
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
          <el-input style="width:200px" v-model="ruleForm.room" placeholder="房间名称"></el-input>房间ID:200600
        </el-form-item>

        <el-form-item label="场次开关" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="是否开放机器人" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
    
         </el-form-item>
        <el-form-item label="携带上限" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="携带下限" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="上座金额" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="下注最低携带" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="个人限红" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>格式如1,10000
     </el-form-item>

        <el-form-item label="个人区域限红（闲)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>

        <el-form-item label="个人区域限红 (庄)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="个人区域限红 (和)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>
        <el-form-item label="个人区域限红 (闲对)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>
        <el-form-item label="个人区域限红 (庄对)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>
        <el-form-item label="区域限红 (庄、闲差)" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="和总值" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="庄对总值" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="0"></el-input>
     </el-form-item>
     
        <el-form-item label="闲对总值" prop="name">
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
#H_RoomCofig {
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

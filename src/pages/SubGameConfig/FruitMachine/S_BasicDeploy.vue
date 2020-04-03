<template>
  <div id="S_BasicDeploy">
      <el-button style="margin-bottom:10px" type="success" @click="save">保存</el-button>
       <el-button style="margin-bottom:10px" type="success" @click="send">发送到服务器配置</el-button>
         <!-- form -->
    
    <div class="form">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="单线下注金额" prop="name">
          <el-input style="width:200px" v-model="ruleForm.room" placeholder="房间名称"></el-input>
        </el-form-item>

        <el-form-item label="获得彩金比例" prop="name">
          <el-input style="width:200px" v-model="ruleForm.name" placeholder="3=5"></el-input> -
           <el-input style="width:200px" v-model="ruleForm.name" placeholder="3=5"></el-input> -
           <el-input style="width:200px" v-model="ruleForm.name" placeholder="3=5"></el-input>
          <p>3=50，三个777连线获得奖金占奖池的50%，4，四个777连线。。。，5，5个777连线</p>
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
            ruleForm:{}
        }
    },
    methods: {
        save(){},
        send(){},
        submitForm(){},
    }
}
</script>

<style>

</style>
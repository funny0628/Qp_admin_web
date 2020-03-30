<template>
  <div id="batteryConfig">
    <!-- title -->
    <div class="title">
      <div class="VIP">扑鱼VIP炮台配置</div>
    </div>
    <!-- 主体 -->
    <div class="contain">
      <div class="botton">
        <el-button type="primary" @click="add">添加</el-button>
        <el-button type="primary" @click="saveData">保存</el-button>
        <el-button type="primary" @click="send">发送给服务器配置</el-button>
      </div>
      <div class="table" v-for="(it, idx) in list" :key="idx">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-input v-model="name" placeholder="id"></el-input
          ></el-col>
          <el-col :span="5">
            <el-input v-model="name" placeholder="vip等级"></el-input
          ></el-col>
          <el-col :span="5">
            <el-input v-model="contact" placeholder="名称"></el-input
          ></el-col>
          <el-col :span="5">
            <el-input v-model="remark" placeholder="power"></el-input
          ></el-col>
          <el-col :span="2"><el-button type="danger" @click="del">删除</el-button></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ["",""],
      name:"",
      contact:"",
      remark:"",

    };
  },
  methods: {
    add() {},
    saveData() {},
    send() {},
    del() {},
  }
};
</script>

<style lang="less" scoped>
#batteryConfig {

  background-color: #f2f2f2;
  border: 1px solid #efefef;
  box-shadow: 1px 1px 2px #efefef;
  .title {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid#eee;
    .VIP {
      font-size: 14px;
      width: 120px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
    }
  }
  .contain {
    padding: 10px;
    box-sizing: border-box;
    .table {
        padding-top: 20px;
    }
  }
}
</style>

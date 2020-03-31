<template>
  <div id="LinConfiguration">
    <el-button type="primary" @click="save">保存</el-button
    ><el-button type="primary" @click="send">发送到服务器配置</el-button>
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="红黑大战" name="first"></el-tab-pane>
        <el-tab-pane label="百人牛牛-3倍场" name="second"></el-tab-pane>
        <el-tab-pane label="百人牛牛-10倍场" name="third"></el-tab-pane>
        <el-tab-pane label="龙虎斗" name="four"></el-tab-pane>
        <el-tab-pane label="奔驰宝马" name="five"></el-tab-pane>
        <el-tab-pane label="百家乐" name="six"></el-tab-pane>
        <el-tab-pane label="二八杠" name="seven"></el-tab-pane>
        <el-tab-pane label="红包扫雷" name="eight"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 主体 -->
    <div class="contain">
      <div class="botton">
        <el-button type="primary" @click="add">添加</el-button>
      </div>
      <div class="table" >
          <div class="top">
             <span >玩家携带游戏币的区间值</span>
             <span >可下注筹码  可选 : [1、5、10、20、50、100、500、1000、5000、10000]</span>
          </div>
          <div class="inpt"  v-for="(it, idx) in list" :key="idx">
              <el-input style="width:60px" v-model="name" placeholder="id"></el-input> -  <el-input style="width:60px;margin-right:120px;" v-model="name" placeholder="id"></el-input>
              <el-input style="width:200px" v-model="name" placeholder="id"></el-input>
           <el-button type="danger" @click="del">删除</el-button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      list: ["",""],
      name:''
    };
  },
  methods: {
    handleClick() {},
    save() {},
    send() {},
    add() {},
    del() {}
  }
};
</script>

<style lang="less" scoped>
#LinConfiguration {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    padding: 10px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
  .contain {
  
    .table {
        padding:20px;
        .top {
            margin-bottom: 10px;
            span {
                margin-right: 100px;
            }
        }
        .inpt {
            margin-top: 10px;
        }
    }
  }
}
</style>

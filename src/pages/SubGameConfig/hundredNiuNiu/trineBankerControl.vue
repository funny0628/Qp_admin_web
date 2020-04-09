<template>
  <div id="trineBankerControl">
    <!-- title -->
    <div class="title">
      三倍场上庄机器人控制
      <el-button type="primary" @click="submit(2)">发送到服务器配置</el-button>
    </div>
    <!-- container -->
    <div class="conent">
      <!-- first -->
      <div class="title title-first">
        三倍场上庄机器人控制
        <el-button type="primary" @click="add1">添加</el-button>
      </div>
      <div v-for="item in list2" class="list1">
        真实玩家人数范围:
        <el-input style="width:100px" v-model="input"></el-input> -
        <el-input style="width:100px" v-model="input"></el-input>
        &nbsp;&nbsp;&nbsp; 概率值:
        <el-input style="width:100px" v-model="input"></el-input>
        &nbsp;&nbsp;&nbsp; 上庄人数:
        <el-input style="width:100px" v-model="input"></el-input>
        &nbsp;&nbsp;&nbsp;
        <el-button type="danger" @click="del1">删除</el-button>
      </div>

      <!-- second -->
      <div class="title title-second">
        上庄机器人带的金币所对应的上庄局数设置
        <el-button type="primary" @click="add2">添加</el-button>
      </div>
      <div v-for="item in list2" class="list1">
        金币范围:
        <el-input style="width:100px" v-model="input"></el-input> -
        <el-input style="width:100px" v-model="input"></el-input>
        &nbsp;&nbsp;&nbsp; 上庄局数:
        <el-input style="width:100px" v-model="input"></el-input> -
        <el-input style="width:100px" v-model="input"></el-input>
        &nbsp;&nbsp;&nbsp;
        <el-button type="danger" @click="del2">删除</el-button>
      </div>

      <!-- third -->
      <div class="title title-third">
        机器人上庄间隔设置
      </div>
      <div class="list1">
        上庄间隔: <el-input style="width:100px" v-model="input"></el-input> (秒)
      </div>

      <!-- four -->
      <div class="title title-four">
        玩家上庄前面有机器人取消概率设置
      </div>
      <div  class="list1">
        取消概率:
        <el-input style="width:100px" v-model="input"></el-input> (百分比)
        <el-button type="primary" @click="submit(1)">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
      list2: ["", ""],
      input: "",
      id: 0,
      keys: "",
      loading: false,
    };
  },
  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.GetServerConfig({
      key: "robot_banker_control.lua"
    });
    // console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    // this.resData = res.brnn_normal.robot_type_list;
    // this.ruleForm = res.brnn_normal.robot_type_list[1];
    // this.card_compare_value = res.brnn_normal.card_compare_value;
    // console.log(this.resData, this.ruleForm);
  },

  methods: {
    send() {},
    add1() {},
    add2() {},
    submit(type) {
      //判断type
      if(type === 1){
        //发送put
      }else if(type === 2){
        //发送post
      }
    },
    del1() {},
    del2() {}
  }
};
</script>

<style lang="less" scoped>
#trineBankerControl {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    padding: 10px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
  .conent {
    padding: 10px;
    .title {
      font-size: 14px;
      margin-top: 20px;
      &.title-first {
        border-bottom: 1px solid #1e9fff;
      }
      &.title-second {
        border-bottom: 1px solid #ffb800;
      }
      &.title-third {
        border-bottom: 1px solid #ff5722;
      }
      &.title-four {
        border-bottom: 1px solid #009688;
      }
    }
    .list1 {
      margin-top: 10px;
      padding-left: 40px;
    }
  }
}
</style>

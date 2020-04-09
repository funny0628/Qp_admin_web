<template>
  <div id="fishControl">
    <!-- 头部 -->
    <div class="title">
      <el-button style="margin:0px 10px 10px 0px" type="primary" @click="save"
        >保存</el-button
      >
      <el-button type="primary" @click="send">发送给服务器配置</el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="捕鱼-低倍场" name="first"></el-tab-pane>
        <el-tab-pane label="捕鱼-中倍场" name="second"></el-tab-pane>
        <el-tab-pane label="捕鱼-高倍场" name="third"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- tabale -->
    <div class="table">
      <div class="item">
        <div class="item_div left">
          机器人命中系数
        </div>
        <div class="item_div right">
          <p>
            命中系数:<el-input
              style="width:200px"
              v-model="ruleForm.region"
            ></el-input>
          </p>
          <p>
            机器人携带金币范围（元）:<el-input
              style="width:100px;margin-top:10px"
              v-model="ruleForm.region"
            ></el-input
            >&nbsp;&nbsp;~&nbsp;&nbsp;<el-input
              style="width:100px"
              v-model="ruleForm.region"
            ></el-input>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="item_div left">
          机器人退出房间
        </div>
        <div class="item_div right">
          <p>
           退出时间（秒）:<el-input style="width:100px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input>
          </p>
          <p>
           退出概率(百分比):<el-input style="width:200px;margin-top:10px" v-model="ruleForm.region"></el-input>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="item_div left">
          机器人加入房间
        </div>
        <div class="item_div right">
          <p>
          加入时间（秒):<el-input style="width:100px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input>
          </p>
          <p>
            人数设定(百分比): <el-button type="primary" @click="add1">添加</el-button><br>
             <div v-for="item in list1">
                  <el-input style="width:100px;margin-top:10px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input><el-button type="primary" @click="del1">删除</el-button>
            </div>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="item_div left">
          子弹切换
        </div>
        <div class="item_div right">
          <p>
          切换时间（秒）:<el-input style="width:100px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input>
          </p>
          <p>
            炮台倍数(百分比): <el-button type="primary" @click="add2">添加</el-button><br>
             <div v-for="item in list1">
                  <el-input style="width:100px;margin-top:10px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input><el-button type="primary" @click="del2">删除</el-button>
            </div>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="item_div left">
          锁定概率
        </div>
        <div class="item_div right">
         
          <p>
           鱼的倍数: <el-button type="primary" @click="add3">添加</el-button><br>
             <div v-for="item in list1">
                  <el-input style="width:100px;margin-top:10px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input><el-button type="primary" @click="del3">删除</el-button>
            </div>
          </p>
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
      ruleForm: {},
      rules: {},
      input: "",
      list1: ["", ""],
      list2: ["", ""],
      list3: ["", ""],
    };
  },
  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.GetServerConfig({
      key: "fishing_robot.lua"
    });
    console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    // this.list = res;
  },
  methods: {
    save() {},
    send() {},
    add1() {},
    add2() {},
    add3() {},
    del1() {},
    del2() {},
    del3() {},
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style lang="less" scoped>
#fishControl {
  background-color: #f2f2f2;
  .table {
    padding: 10px;

    .item {
      border: 1px solid #e6e6e6;
      border-bottom: none;
      border-right: none;
      display: flex;
      .item_div {
        box-sizing: border-box;

        border: 1px solid #e6e6e6;
        border-top: none;
        border-left: none;
        &.left {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &.right {
          flex: 5;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
          padding-left: 30px;
        }
      }
    }
  }
}
</style>

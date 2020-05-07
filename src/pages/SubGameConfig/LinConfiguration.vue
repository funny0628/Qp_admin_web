<template>
  <div
    id="LinConfiguration"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <el-button type="primary" @click="send(1)">保存</el-button
    ><el-button type="primary" @click="send(2)">发送到服务器配置</el-button>
    <!-- 头部 -->
    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="红黑大战" :name="namelist[0]"></el-tab-pane>
        <el-tab-pane label="百人牛牛-3倍场" :name="namelist[1]"></el-tab-pane>
        <el-tab-pane label="百人牛牛-10倍场" :name="namelist[2]"></el-tab-pane>
        <el-tab-pane label="龙虎斗" :name="namelist[3]"></el-tab-pane>
        <el-tab-pane label="奔驰宝马" :name="namelist[4]"></el-tab-pane>
        <el-tab-pane label="百家乐" :name="namelist[5]"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 主体 -->
    <div class="contain">
      <div class="botton">
        <el-button type="primary" @click="add">添加</el-button>
      </div>
      <div class="table">
        <div class="top">
          <span>玩家携带游戏币的区间值</span>
          <span
            >可下注筹码 可选 :
            [1、5、10、20、50、100、500、1000、5000、10000]</span
          >
        </div>
        <div class="inpt" v-for="(it, idx) in list" :key="idx">
          <el-input style="width:200px" v-model="it.min"></el-input> -
          <el-input
            style="width:200px;margin-right:120px;"
            v-model="it.max"
          ></el-input>
          <el-input style="width:300px" v-model="it.str"></el-input>
          <el-button type="danger" @click="del(idx)">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      //当前数据
      list: [],
      //tab
      namelist: [],
      //所有数据
      allData: {},
      loading: false,
      key: "",
      id: ""
    };
  },
  created() {
    this.initData({
      key: "bet_list.lua"
    });
  },
  methods: {
    //tab切换
    handleClick(tab) {
      console.log(tab.name);
      this.namelist.forEach(item => {
        if (item === tab.name) {
          this.list = this.allData[item];
        }
      });
    },

    async send(type) {
      if (type === 1) {
        console.log(this.allData, this.list);

        //put
        let { data } = await this.$http.HallFunConfig.PutServerConfig({
          keys: this.key,
          values: JSON.stringify({ data: this.allData }),
          id: this.id
        });
        // console.log(data);
        if (data.code === 1 && data.msg === "ok") {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        }
      } else if (type === 2) {
        //post
        this.loading = true;
        //发送post
        let { data } = await this.$http.HallFunConfig.PostServerConfig({
          keys: this.key,
          values: JSON.stringify({ data: this.allData }),
          id: this.id
        });
        // console.log(data);
        if (data.code === 1 && data.msg === "ok") {
          this.loading = false;
          this.$message({
            type: "success",
            message: "发送服务器配置成功!"
          });
        }
      }
    },
    add() {
      this.list.push({});
    },
    del(index) {
      this.list = this.list.filter((item, idx) => {
        return index !== idx;
      });
    },

    async initData(params) {
      let { data } = await this.$http.HallFunConfig.GetServerConfig(params);
      console.log(data);
      this.id = data.data[0].id;
      this.key = data.data[0].sys_key;
      let resData = JSON.parse(data.data[0].sys_val);
      this.allData = resData.data;
      this.namelist = Object.keys(this.allData);
      this.list = this.allData[this.namelist[0]];
      this.activeName = this.namelist[0];
      // console.log(this.allData, this.id, this.key, this.namelist);
    }
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
      padding: 20px;
      .top {
        margin-bottom: 10px;
        span {
          margin-right: 350px;
        }
      }
      .inpt {
        margin-top: 10px;
      }
    }
  }
}
</style>

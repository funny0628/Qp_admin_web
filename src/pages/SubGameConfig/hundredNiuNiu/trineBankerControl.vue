<template>
  <div
    id="trineBankerControl"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <!-- title -->
    <div class="title">
      三倍场上庄机器人控制
      <el-button type="primary" @click="submit(2)">发送到服务器配置</el-button>
      <el-button type="primary" @click="submit(1)">确定</el-button>
    </div>
    <!-- container -->
    <div class="conent">
      <!-- first -->
      <div class="title title-first">
        牌局中的人数对应的概率和上庄人数设置
        <el-button type="primary" @click="addpeople">添加</el-button>
      </div>
      <div
        v-for="(peopleitem, peopleindex) in resData.banker_rate_people_min"
        :key="peopleindex"
        class="list1"
      >
        真实玩家人数范围:
        <el-input
          style="width:200px"
          v-model="resData.banker_rate_people_min[peopleindex]"
        ></el-input>
        -
        <el-input
          style="width:200px"
          v-model="resData.banker_rate_people_max[peopleindex]"
        ></el-input>
        &nbsp;&nbsp;&nbsp; 概率值:
        <el-input
          style="width:200px"
          v-model="resData.banker_rate_rate_min[peopleindex]"
        ></el-input>
        &nbsp;&nbsp;&nbsp; 上庄人数:
        <el-input
          style="width:200px"
          v-model="resData.banker_rate_people_num_min[peopleindex]"
        ></el-input>
        &nbsp;&nbsp;&nbsp;
        <el-button type="danger" @click="delpeople(peopleindex)"
          >删除</el-button
        >
      </div>

      <!-- second -->
      <div class="title title-second">
        上庄机器人带的金币所对应的上庄局数设置
        <el-button type="primary" @click="addround">添加</el-button>
      </div>
      <div
        v-for="(rounditem, roundindex) in resData.banker_round_coin_min"
        class="list1"
      >
        金币范围:
        <el-input
          style="width:200px"
          v-model="resData.banker_round_coin_min[roundindex]"
        ></el-input>
        -
        <el-input
          style="width:200px"
          v-model="resData.banker_round_coin_max[roundindex]"
        ></el-input>
        &nbsp;&nbsp;&nbsp; 上庄局数:
        <el-input
          style="width:200px"
          v-model="resData.banker_round_round_range_min[roundindex]"
        ></el-input>
        -
        <el-input
          style="width:200px"
          v-model="resData.banker_round_round_range_max[roundindex]"
        ></el-input>
        &nbsp;&nbsp;&nbsp;
        <el-button type="danger" @click="delround(roundindex)">删除</el-button>
      </div>

      <!-- third -->
      <div class="title title-third">
        机器人上庄间隔设置
      </div>
      <div class="list1">
        上庄间隔:
        <el-input
          style="width:200px"
          v-model="resData.banker_interval"
        ></el-input>
        (秒)
      </div>

      <!-- four -->
      <div class="title title-four">
        玩家上庄前面有机器人取消概率设置
      </div>
      <div class="list1">
        取消概率:
        <el-input
          style="width:200px"
          v-model="resData.banker_cancel"
        ></el-input>
        (百分比)
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      keys: "",
      loading: false,
      resData: {}
    };
  },
  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.GetServerConfig({
      key: "robot_banker_control.lua"
    });
    console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    this.resData = res;
  },

  methods: {
    //三倍场上庄机器人控制添加
    addpeople() {
      this.resData.banker_rate_people_min.push("");
    },

    //上庄机器人带的金币所对应的上庄局数设置添加
    addround() {
      this.resData.banker_rate_people_min.push("");
    },

    // 三倍场上庄机器人控制删除
    delpeople(index) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.resData.banker_round_coin_min.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //上庄机器人带的金币所对应的上庄局数设置删除
    delround(index) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.resData.banker_round_coin_min.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

     async submit(type) {
      console.log(this.resData);

      //判断type
      if (type === 1) {
        //发送put
        let { data } = await this.$http.HallFunConfig.PutServerConfig({
          keys: this.keys,
          values: JSON.stringify(this.resData),
          id: this.id
        });
        console.log(data);
        if (data.code === 1 && data.msg === "ok") {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        }
      } else if (type === 2) {
        //发送post
        this.loading = true;

        let { data } = await this.$http.HallFunConfig.PostServerConfig({
          keys: this.keys,
          values: JSON.stringify(this.allData),
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
    }
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

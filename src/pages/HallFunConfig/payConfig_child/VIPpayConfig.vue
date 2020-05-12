<template>
  <div id="VIPpayConfig">
    <div class="title">
      <div class="VIP">VIP充值配置</div>
    </div>
    <div class="contain">
      <div class="botton">
        <span class="add" @click="add">添加</span>
        <span v-has="'vip_deposit_config_save'" class="save" @click="saveData">保存</span>
      </div>
      <div class="table" v-for="(item, index) in list" :key="index" v-has="'vip_deposit_config_detail'">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-select style="width:100%" v-model="item.type">
              <el-option label="QQ" value="qq"></el-option>
              <el-option label="微信" value="wechat"></el-option> </el-select
          ></el-col>
          <el-col :span="5">
            <el-input v-model="item.name" placeholder="名称"></el-input
          ></el-col>
          <el-col :span="5">
            <el-input v-model="item.wx" placeholder="微信/QQ"></el-input
          ></el-col>
          <el-col :span="8">
            <el-input v-model="item.desc" placeholder="备注"></el-input
          ></el-col>
          <el-col :span="2"
            ><span class="dele" @click="del(index)">删除</span></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vip_deposit_config",
  data() {
    return {
      id: 0,
      keys: "",
      type: "QQ",
      name: "",
      wx: "",
      desc: "",
      list: []
    };
  },
  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.GetRechargeConfig({
      key: "recharge_config"
    });
    // console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    this.list = res;
  },
  methods: {
    //添加
    add() {
      this.list.push({type:'',undefined:'',name:'',wx:'',desc:'',});
    },

    // 保存
    async saveData() {
      this.list.forEach(item => {
        if (item.type === "qq") {
          item.undefined = "QQ";
        } else if (item.type === "wechat") {
          item.undefined = "微信";
        }
      });
      // console.log(this.list);
      for(var i = 0; i < this.list.length; i++){
        if(this.list[i].type === '' || this.list[i].undefined === '' || this.list[i].name === '' || this.list[i].wx === '' || this.list[i].desc === ''){
           this.$message({
            type: "warning",
            message: "必填项不可以为空"
          });
           return false
        }
      }

      let { data } = await this.$http.HallFunConfig.PatchRechargeConfig({
        keys: this.keys,
        id: this.id,
        values: JSON.stringify(this.list)
      });
      // console.log(data);
      if (data.code === 1 && data.msg === "ok") {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
      } else {
        this.$message({
          type: "warning",
          message: "保存失败"
        });
      }
    },

    //删除
    del(index) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.list.splice(index, 1);
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
    }
  }
};
</script>

<style lang="less" scoped>
#VIPpayConfig {
  // height: 500px;
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
    .botton {
      display: flex;
      span {
        margin-right: 10px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #009688;
        color: #fff;
        border-radius: 3px;
        &:hover {
          background-color: #30a89d;
        }
      }
    }
    .table {
      padding: 10px 0px;
      box-sizing: border-box;
      /deep/.el-row .el-col-2 .dele {
        display: inline-block;
        width: 50px;
        height: 100%;
        border-radius: 3px;
        background-color: #009688;
        &:hover {
          background-color: #30a89d;
        }
      }
    }
    span {
      width: 50px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      margin-top: 5px;
      background-color: #009688;
      &:hover {
        background-color: #30a89d;
      }
    }
  }
}
</style>

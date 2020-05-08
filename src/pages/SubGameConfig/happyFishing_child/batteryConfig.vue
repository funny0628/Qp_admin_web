<template>
  <div
    id="batteryConfig"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <!-- title -->
    <div class="title">
      <div class="VIP">扑鱼VIP炮台配置</div>
    </div>
    <!-- 主体 -->
    <div class="contain">
      <div class="botton">
        <el-button type="primary" @click="add">添加</el-button>
        <el-button v-has="'hl_fish_fire_config_save'" type="primary" @click="submit(1)">保存</el-button>
        <el-button v-has="'hl_fish_fire_config_send'" type="primary" @click="submit(2)"
          >发送给服务器配置</el-button
        >
      </div>
      <div class="table" v-has="'hl_fish_fire_config_detail'" v-for="(item, index) in list" :key="index">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-input v-model="item.id" placeholder="id"></el-input
          ></el-col>
          <el-col :span="5">
            <el-input v-model="item.vip_level" placeholder="vip等级"></el-input
          ></el-col>
          <el-col :span="5">
            <el-input v-model="item.name" placeholder="名称"></el-input
          ></el-col>
          <el-col :span="5">
            <el-input v-model="item.power" placeholder="power"></el-input
          ></el-col>
          <el-col :span="2"
            ><el-button type="danger" @click="del(index)"
              >删除</el-button
            ></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'hl_fish_fire_config',
  data() {
    return {
      list: [],
      id: 0,
      keys: "",
      loading: false,
      allData:{},
    };
  },
  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.Getfishing_guns({
      key: "fishing_guns.lua"
    });
    // console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    // console.log(res);
    this.allData = JSON.parse(JSON.stringify(res))
    // this.list = res;
    this.list = Object.values((res))
  },
  methods: {
    //添加
    add() {
      this.list.push({
        vip_level:'',
        name:'',
        id:'',
        power:'',
      });
    },

    //保存和服务器配置
    async submit(type) {
        for(var i = 0; i < this.list.length; i++){
        if(this.list[i].vip_level === '' || this.list[i].name === '' || this.list[i].id === '' || this.list[i].power === '' || isNaN(this.list[i].vip_level) || isNaN(this.list[i].id)){
          this.$message({
            type: "warning",
            message: "输入正确格式的数字,必填项不能为空!!"
          });
          return false
        }else {
          this.list[i].vip_level = +this.list[i].vip_level
          this.list[i].id = +this.list[i].id
        }
      }
      // console.log(this.list);
      let resObj = {}
      this.list.forEach((item,index)=>{
        resObj[index + 1] = item
      })
      // console.log(resObj);
      if (type === 1) {
        let { data } = await this.$http.HallFunConfig.Putfishing_guns({
          keys: this.keys,
          values: JSON.stringify(resObj),
          id: this.id
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
            message: "保存失败!"
          });
        }
      } else if (type === 2) {
        this.loading = true;
        // console.log(this.list);

        let { data } = await this.$http.HallFunConfig.Postfishing_guns({
          keys: this.keys,
          values: JSON.stringify(resObj),
          id: this.id
        });
        // console.log(data);
        if (data.code === 1 && data.msg === "ok") {
          this.loading = false;
          this.$message({
            type: "success",
            message: "发送到服务器配置成功!"
          });
        } else {
          this.loading = false;
          this.$message({
            type: "warning",
            message: "发送服务器配置失败!"
          });
        }
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
#batteryConfig {
  background-color: #f2f2f2;
  border: 1px solid #efefef;
  box-shadow: 1px 1px 2px #efefef;
  /deep/.el-loading-spinner {
    top: 30% !important;
  }
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

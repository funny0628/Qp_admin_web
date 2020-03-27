<template>
  <div id="VIPpayConfig">
    <div class="title">
      <div class="VIP">VIP充值配置</div>
    </div>
    <div class="contain">
      <div class="botton">
        <span class="add" @click="add">添加</span>
        <span class="save" @click="saveData">保存</span>
      </div>
      <div class="table" v-for="(it, idx) in list" :key="idx">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-select style="width:100%" v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-col>
          <el-col :span="5">
            <el-input v-model="name" placeholder="名称"></el-input
          ></el-col>
          <el-col :span="5">
            <el-input v-model="contact" placeholder="微信/QQ"></el-input
          ></el-col>
          <el-col :span="8">
            <el-input v-model="remark" placeholder="备注"></el-input
          ></el-col>
          <el-col :span="2"><span class="dele">删除</span></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VIPpayConfig",
  data() {
    return {
      value: "QQ",
      name:"",
      contact:"",
      remark:"",
      list:1,
      options: [
        {
          value: "选项1",
          label: "QQ"
        },
        {
          value: "选项2",
          label: "微信"
        }
      ]
    };
  },
  created() {
    //获取数据
    this.getdata()

  },
  methods: {
    add(){
      console.log('add新增一行,使列表数组加1');
      this.list += 1
    },
    saveData(){
      console.log('拿到数据,saveData');
      
    },
    getdata(){console.log('获取数据');
    }
  },
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

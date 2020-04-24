<template>
  <div id="F_Control"   v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)">
    <!-- 头部 -->
    <div class="title">
      <el-button style="margin:0px 10px 10px 0px" type="primary" @click="submit(1)"
        >保存</el-button
      >
      <el-button type="primary" @click="submit(2)">发送给服务器配置</el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="水果机-低倍场" :name="namelist[0]"></el-tab-pane>
        <el-tab-pane label="水果机-中倍场" :name="namelist[1]"></el-tab-pane>
        <el-tab-pane label="水果机-高倍场" :name="namelist[2]"></el-tab-pane>
        <el-tab-pane label="水果机-土豪场" :name="namelist[3]"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- tabale -->
    <div class="table">
      <div class="item">
        <div class="item_div left">
          抽水
        </div>
        <div class="item_div right">
          <p>
            实时抽水(元):<el-input
              style="width:200px"
              v-model="value"
            ></el-input>
          </p>
          <p>
            基础库存抽水比率(万分比):<el-input
              style="width:100px;margin-top:10px"
              v-model="value"
            ></el-input>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="item_div left">
          基础库存
        </div>
        <div class="item_div right">
         
          <p>
           实时基础库存:<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
          <p>
           实时吃分控制率(百分比):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
          <p>
           库存下限值(元):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
          <p>
          库存上限值(元):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
          <p>
           正常值(元):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
          <p>
           吃分控制率(万分比):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
          <p>
           放分控制率(万分比):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
          <p>
           警戒控制率(万分比):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="item_div left">
          奖励库存
        </div>
          <div class="item_div right">
         <p>
          实时奖励库存:<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
         <p>
           基础库存抽水比率(万分比):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
         <p>
           库存下限值(元):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
         <p>
           库存上限值(元):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
         <p>
           触发概率下限(万分比):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
          </p>
         <p>
          触发概率上限(万分比):<el-input style="width:200px;margin-top:10px" v-model="value"></el-input>
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
      namelist:['fishing_normal','','',''],
      activeName: "fishing_normal",
      //三个场次总数据
      resData: {

      },
      //默认为最低的场次
      Data:{},
      id:0,
      keys:'',
     loading:false,
     value:"",
    };
  },
  async created() {
    //获取数据
    // let { data } = await this.$http.HallFunConfig.GetServerConfig({
    //   key: "fishing_robot.lua"
    // });
    // console.log(data);
    // this.id = data.data[0].id;
    // this.keys = data.data[0].sys_key;
    // let res = JSON.parse(data.data[0].sys_val);
    // console.log(res);
    // this.resData = res
    // this.namelist = Object.keys(res)
    // this.Data = res[this.namelist[0]]
    
  },
  methods: {
    //保存和服务器配置
    async submit(type){
    //   if(type === 1){
    //       let { data } = await this.$http.HallFunConfig.PutServerConfig({
    //      keys:this.keys,
    //      values:JSON.stringify(this.resData),
    //      id:this.id,
    //    });
    // // console.log(data);
    // if(data.code === 1 && data.msg === 'ok'){
    //   this.$message({
    //     type: "success",
    //     message: "保存成功!"
    //   });
    // }
    //   }else if(type === 2){
    //     this.loading = true
     
    //    let { data } = await this.$http.HallFunConfig.PostServerConfig({
    //      keys:this.keys,
    //      values:JSON.stringify(this.resData),
    //      id:this.id,
    //    });
    //   // console.log(data);
    //   if(data.code === 1 && data.msg === 'ok'){
    //     this.loading = false
    //   this.$message({
    //     type: "success",
    //     message: "发送服务器配置成功!"
    //   });
    // }

    //   }
    },


    //tap栏切换
    handleClick(tab, event) {
    //   Object.keys(this.resData).forEach((item)=>{
    //     if(item === tab.name){
    //       this.Data = this.resData[item]
    //     }
    //   })
      
    }
  }
};
</script>

<style lang="less" scoped>
#F_Control {
  background-color: #f2f2f2;
 /deep/.el-loading-spinner {
    top: 20% !important;
}
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

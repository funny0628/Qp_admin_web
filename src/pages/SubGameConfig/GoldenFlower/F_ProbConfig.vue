<template>
  <div id="F_ProbConfig">
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="submit(1)">保存</el-button
      ><el-button type="primary" @click="submit(2)">发送到服务器配置</el-button>
      <p><el-button>牌型概率配置</el-button></p>
    </div>
    <!-- table  -->
    <div class="table">
      <div class="item">
        <div class="item_div left">
          牌型
        </div>
        <div class="item_div right">
          <p>
            概率(百分比)
          </p>
        </div>
      </div>
      <div class="item" v-for="(item,index) in list">
        <div class="item_div left">
          {{ item.title }}
        </div>
        <div class="item_div right">
          <p>
            <el-input style="width:200px" v-model="item.val"></el-input>
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
      Data:{
        gaopaibudaiA:"高牌不带A",
        gaopaidaiA:"高牌带A",
        duizi2_9:"对子2-9",
        duizi10_A:"对子10-A",
        shunzi:"顺子",
        jinhua:"金花",
        shunjin:"顺金",
        baozi:"豹子",
      },
      id: 0,
      keys: "",
      loading: false,
      input: "",
      list: []
    };
  },

  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.GetServerConfig({
      key: "card_type_general.lua"
    });
    console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    Object.keys(res.card_type_general).forEach(item => {
      this.list.push({title:item,val:res.card_type_general[item]})
    });
    console.log(this.list);
    Object.keys(this.Data).forEach((item)=>{
      this.list.forEach((it)=>{
        if(item === it.title){
          it.title = this.Data[item]
        }
      })
    })
  },

  methods: {
    async submit(type) {
    if(type === 1){

 console.log(this.Data,this.list);
      Object.keys(this.Data).forEach((item)=>{
        this.list.forEach((it)=>{
          if(it.title === this.Data[item]){
            console.log("=============");
            
           this.Data[item] = it.val
            
          }
        })
      })
       console.log(this.Data,this.list);
      
      let resData = {
        card_type_general:this.Data
      }
      console.log(resData);
      
    //       let { data } = await this.$http.HallFunConfig.PutServerConfig({
    //      keys:this.keys,
    //      values:JSON.stringify(this.resData),
    //      id:this.id,
    //    });
    // console.log(data);
    // if(data.code === 1 && data.msg === 'ok'){
    //   this.$message({
    //     type: "success",
    //     message: "保存成功!"
    //   });
    // }
      }else if(type === 2){
        this.loading = true
     
       let { data } = await this.$http.HallFunConfig.PostServerConfig({
         keys:this.keys,
         values:JSON.stringify(this.resData),
         id:this.id,
       });
      console.log(data);
    //   if(data.code === 1 && data.msg === 'ok'){
    //     this.loading = false
    //   this.$message({
    //     type: "success",
    //     message: "发送服务器配置成功!"
    //   });
    // }

      }
    },
    
  }
};
</script>

<style lang="less" scoped>
#F_ProbConfig {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    border-bottom: 1px solid #ccc;
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

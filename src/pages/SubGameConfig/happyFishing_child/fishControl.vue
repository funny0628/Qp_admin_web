<template>
  <div id="fishControl"   v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)">
    <!-- 头部 -->
    <div class="title">
      <el-button v-has="'hl_fish_robot_config_save'" style="margin:0px 10px 10px 0px" type="primary" @click="submit(1)"
        >保存</el-button
      >
      <el-button v-has="'hl_fish_robot_config_send'" type="primary" @click="submit(2)">发送给服务器配置</el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="捕鱼-低倍场" :name="namelist[0]"></el-tab-pane>
        <el-tab-pane label="捕鱼-中倍场" :name="namelist[1]"></el-tab-pane>
        <el-tab-pane label="捕鱼-高倍场" :name="namelist[2]"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- tabale -->
    <div class="table" v-has="'hl_fish_robot_config_detail'">
      <div class="item">
        <div class="item_div left">
          机器人命中系数
        </div>
        <div class="item_div right">
          <p>
            命中系数:<el-input
            type='number'
              style="width:200px"
              v-model="Data.hit_arg"
            ></el-input>
          </p>
          <p>
            机器人携带金币范围（元）:<el-input
              style="width:100px;margin-top:10px"
              v-model="Data.min_coin"
            ></el-input
            >&nbsp;&nbsp;~&nbsp;&nbsp;<el-input
              style="width:100px"
              v-model="Data.max_coin"
            ></el-input>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="item_div left">
          机器人退出房间
        </div>
        <div class="item_div right" v-if="Data.robot_leave">
          <p>
           退出时间（秒）:<el-input style="width:100px" v-model="Data.robot_leave.interval_time[1]"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="Data.robot_leave.interval_time[2]"></el-input>
          </p>
          <p>
           退出概率(百分比):<el-input style="width:200px;margin-top:10px" v-model="Data.robot_leave.rate"></el-input>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="item_div left">
          机器人加入房间
        </div>
        <div class="item_div right" v-if="Data.robot_leave">
          <p>
          加入时间（秒):<el-input style="width:100px" v-model="Data.robot_join.interval_time[1]"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="Data.robot_join.interval_time[2]"></el-input>
          </p>
          <p>
            人数设定(百分比): <el-button type="primary" @click="addRobot(Data.robot_join.player_num_setting)">添加</el-button><br>
             <div v-for="(itemRobot,indexRobot) in Data.robot_join.player_num_setting" :key="indexRobot">
                  <el-input style="width:100px;margin-top:10px" v-model="itemRobot.player_num"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="itemRobot.rate"></el-input><el-button type="primary" @click="delRobot(Data.robot_join.player_num_setting,indexRobot)">删除</el-button>
            </div>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="item_div left">
          子弹切换
        </div>
        <div class="item_div right" v-if="Data.robot_leave">
          <p>
          切换时间（秒）:<el-input style="width:100px" v-model="Data.fire_change.interval_time[1]"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="Data.fire_change.interval_time[2]"></el-input>
          </p>
          <p>
            炮台倍数(百分比): <el-button type="primary" @click="addFire(Data.fire_change.gun_rate)">添加</el-button><br>
             <div v-for="(itemFire,indexFire) in Data.fire_change.gun_rate" :key="indexFire">
                  <el-input style="width:100px;margin-top:10px" v-model="itemFire.power_rate"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="itemFire.trigger_rate"></el-input><el-button type="primary" @click="delFire(Data.fire_change.gun_rate,indexFire)">删除</el-button>
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
           鱼的倍数: <el-button type="primary" @click="addLock(Data.fire_lock)">添加</el-button><br>
             <div v-for="(itemLock,indexLock) in Data.fire_lock" :key="indexLock">
                  <el-input style="width:100px;margin-top:10px" v-model="itemLock.score_rate"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="itemLock.trigger_rate"></el-input><el-button type="primary" @click="delLock(Data.fire_lock,indexLock)">删除</el-button>
            </div>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'hl_fish_robot_config',
  data() {
    return {
      namelist:['fishing_normal','fishing_junior','fishing_senior'],
      activeName: "fishing_normal",
      //三个场次总数据
      resData: {},
      //默认为最低的场次
      Data:{},
      id:0,
      keys:'',
     loading:false,
     //所有机器人的数据
     allData:{}
    };
  },
  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.Getfishing_robot({
      key: "robot.lua"
    });
    // console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    //所有机器人数据
     this.allData = JSON.parse(JSON.stringify(res))
    //捕鱼的所有数据
    let ResData = {};
    this.namelist.forEach((item)=>{
      Object.keys(res).forEach((it)=>{
        if(item === it){
          ResData[it] = res[it]
        }
      })
    })
    this.resData = ResData
    console.log(this.resData);
    
    this.activeName = this.namelist[0];
    this.Data = this.resData[this.namelist[0]]
  },
  methods: {
    set(ssl){
      let returnData = true
      let ss = Object.keys(ssl)
        for(var i = 0; i < ss.length; i++){
          if(ssl[ss[i]].constructor === Object){//是i
            this.set(ssl[ss[i]])
          }else {
            if(ssl[ss[i]] === '' || isNaN(ssl[ss[i]])){
              this.$message({
                  type: "warning",
                  message: "输入正确格式的数字,必填项不能为空!!"
                });
                returnData = false
                console.log("&&&&&",returnData);
                // break
                return false
            }else if(!isNaN(ssl[ss[i]])){
              ssl[ss[i]] = +ssl[ss[i]]
              returnData = true
                return true
              // console.log(+ssl[ss[i]]);
            }
          }
        }
        console.log('+++',returnData);
        
        // if(returnData){
        //   return true
        // }else{
        //   return false
        // }
    },


    //保存和服务器配置
    async submit(type){
      this.set(this.resData)
      console.log( this.set(this.resData));
      
      
      // Object.keys(this.resData).forEach((item)=>{
      //   Object.keys(this.allData).forEach((it)=>{
      //     if(item === it){
      //       this.allData[it] = this.resData[item]
      //     }
      //   })
      // })
      // console.log(this.resData,this.allData);
      // if(type === 1){
      //     let { data } = await this.$http.HallFunConfig.Putfishing_robot({
      //         keys:this.keys,
      //         values:JSON.stringify(this.allData),
      //         id:this.id,
      //     });
      //     // console.log(data);
      //     if(data.code === 1 && data.msg === 'ok'){
      //       this.$message({
      //         type: "success",
      //         message: "保存成功!"
      //       });
      //     }else{
      //       this.$message({
      //         type: "warning",
      //         message: "保存失败!"
      //       });
      //     }
      // }else if(type === 2){
      //     this.loading = true
      
      //   let { data } = await this.$http.HallFunConfig.Postfishing_robot({
      //     keys:this.keys,
      //     values:JSON.stringify(this.allData),
      //     id:this.id,
      //   });
      //   // console.log(data);
      //   if(data.code === 1 && data.msg === 'ok'){
      //     this.loading = false
      //     this.$message({
      //       type: "success",
      //       message: "发送服务器配置成功!"
      //     });
      //   }else {
      //       this.loading = false
      //     this.$message({
      //       type: "warning",
      //       message: "发送服务器配置失败!"
      //     });
      //   }

      // }
    },

    
    
    //加入房间的添加
    addRobot(row) {
      console.log(row);
      let item = Object.keys(row).length + 1
      this.$set(row,item,{player_num: '',rate: ''})
    },

    //子弹切换的添加
    addFire(row) {

      let item = Object.keys(row).length + 1
      this.$set(row,item,{power_rate: '',trigger_rate: ''})

    },

    //锁定概率添加
    addLock(row) {
      let item = Object.keys(row).length + 1
      this.$set(row,item,{score_rate: '',trigger_rate: ''})
    },

    //加入房间删除
    delRobot(row,index) {
       this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$delete(row,index)
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

    //子弹切换删除
    delFire(row,index) {
       this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$delete(row,index)
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

    //锁定概率删除
    delLock(row,index) {
         this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$delete(row,index)
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

    //tap栏切换
    handleClick(tab, event) {
      Object.keys(this.resData).forEach((item)=>{
        if(item === tab.name){
          this.Data = this.resData[item]
        }
      })
      
    }
  }
};
</script>

<style lang="less" scoped>
#fishControl {
  padding: 20px;
  box-sizing: border-box;
  background-color: #f2f2f2;
 /deep/.el-loading-spinner {
    top: 20% !important;
}
  .table {
    

    .item {
      border: 1px solid #e6e6e6;
      border-bottom: none;
      border-right: none;
      display: flex;
     min-height: 100px;
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
          min-height: 100px;
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

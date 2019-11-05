<!--排行榜数据-->
<template>
  <div id="LeaderBoard">
    <div class="tab-btns">
      <div
        class="btn"
        :class="{active : index === num}"
        @click="btnShow(index)"
        v-for="(item,index) in btnList"
        :key="index"
        style="width: 140px; line-height:36px; height: 36px; display: inline-block; padding: 0;"
      >{{item}}
      </div>
      <div class="tab-Right">
        <el-button style="width: 120px; background:#0079f1; color: #fff;" @click="openDialog">排行榜设置</el-button>
      </div>
    </div>
    <div class="tb">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="rank" label="排名" align="center" width></el-table-column>
        <el-table-column prop="nickname" align="center" label="玩家昵称"></el-table-column>
        <el-table-column prop="player_id" align="center" label="玩家ID"></el-table-column>
        <el-table-column prop="earn" align="center" v-if="tabIndex === 0" label="今日盈利（元）"></el-table-column>
        <el-table-column prop="result" align="center" v-if="tabIndex === 1" label="今日业绩（元）"></el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog center title="排行榜配置" :visible.sync="dialogVisible" width="40%">
        <el-form label-width="120px" :model="formData">
          <el-form-item label="排行榜显示：">
            <div style="display: flex;  flex-wrap:nowrap;">
              <div class="earn">
                <el-button :type="tabIndex === 0 ? 'success' : ''" style="border-radius: 0;" @click="tabIndex = 0">今日盈利排行 <i class="el-icon-arrow-right el-icon-check"></i></el-button>
              </div>
              <div class="result" style="padding-left: 10px;">
                <el-button :type="tabIndex === 1 ? 'success' : ''" style="border-radius: 0;" @click="tabIndex = 1">个人业绩排行 <i class="el-icon-arrow-right el-icon-check"></i></el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="金币上榜条件：" style="display: inline-block;">
            <el-input v-model="formData.money" style="width: 200px;" placeholder="上榜条件（元）"></el-input>
          </el-form-item>
          <el-form-item label="业绩上榜条件：" style="display: inline-block; padding-left: 10px;">
            <el-input v-model="formData.performance" style="width: 200px;" placeholder="上榜条件（元）"></el-input>
          </el-form-item>
          <el-form-item label="刷新时间：">
            <el-input v-model="formData.refresh" style="width: 200px;" placeholder="分钟"></el-input>
          </el-form-item>
          <el-form-item label="盈利排行奖励：">
            <el-input v-model="formData.profit_reward" style="width: 180px;" placeholder="第一名"></el-input>
            <el-input v-model="formData.profit_reward" style="width: 180px;" placeholder="第二名"></el-input>
            <el-input v-model="formData.profit_reward" style="width: 180px;" placeholder="第三名"></el-input>
          </el-form-item>
          <el-form-item label="业绩排行奖励：">
            <el-input v-model="formData.performance_reward" style="width: 180px;" placeholder="第一名"></el-input>
            <el-input v-model="formData.performance_reward" style="width: 180px;" placeholder="第二名"></el-input>
            <el-input v-model="formData.performance_reward" style="width: 180px;" placeholder="第三名"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handelList">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import UserHandeler from '../../script/handlers/UserHandler'
  export default {
    name: "LeaderBoard",
    data() {
      return {
        btnList: ["今日盈利排行", "个人业绩排行"],
        num: 0,
        tabIndex: 0,
        /*表格数据*/
        tableData: [
          {
            rank: "1",
            nickname: "职业玩家",
            player_id: "10001",
            earn: "1000000.00",
            result: "1238.00"
          }
        ],
        dialogVisible: false,
        formData: {
          money: "",
          performance:'',
          refresh:'',
          profit_reward:'',
          performance_reward:''
        }
      };
    },
    methods: {
      btnShow(index) {
        this.tabIndex = index;
        this.num = index;
      },
      openDialog() {
        this.dialogVisible = true;
      },
      /*获取排行榜数据*/
      rankList(){
        let data = {
          platform_id : 1000
        };
        UserHandeler.rank_list(data).promise.then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
      },
      /*排行榜配置*/
      handelList(){
        let data = {};
        UserHandeler.rank_set(data).promise.then(res=>{
          console.log(res);
          this.dialogVisible = false;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.rankList()
    }
  };
</script>

<style scoped>
  #LeaderBoard .tab-btns {
    padding: 30px 20px 10px 20px;
  }

  #LeaderBoard .tab-btns .btn {
    line-height: 1.5;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #d9d9d9;
    white-space: nowrap;
    padding: 0 15px;
    font-size: 14px;
    height: 50px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -o-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
  }

  #LeaderBoard .tab-btns .active {
    background-color: #0079f1;
    color: #fff;
  }

  #LeaderBoard .tab-btns .tab-Right {
    float: right;
  }

  #LeaderBoard .tb {
    padding: 30px 20px 10px 20px;
  }
</style>


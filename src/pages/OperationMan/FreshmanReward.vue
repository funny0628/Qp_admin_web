<template>
  <div id="FreshmanReward-main">
    <input-area>
      <!-- <el-button type="primary" size="medium" @click="dialogFormVisible=true">添加奖励</el-button> -->
      <el-button v-has="'modify_fresher_award'" type="primary" size="medium" @click="save(currentIndex)">保存</el-button>
      <el-button type="primary" size="medium" @click="sendConfigFile">发送到服务器配置</el-button>
    </input-area>
    <div class="bd">
      <div class="nav">
        <div
          :class="{active : index === currentIndex}"
          class="nav-item"
          v-for="(item,index) in tabItem"
          :key="index"
          @click="showTab(index)"
        >{{item}}</div>
      </div>
      <div style="margin-top:10px;margin-bottom:10px;">
        <!-- <el-button type="success" size="medium" @click="add">添加</el-button> -->
      </div>
      <!-- <div style="width:50%;margin-bottom:10px;" v-for="(item,index) in counter" :key="index"> -->
        <el-row :gutter="20" v-if="currentIndex == 0">
          <el-col :span="10">
            <el-row>
              <el-col :span="20">
                <el-select size="small" v-model="value" placeholder="请选择" style="width:100%;">
                  <el-option label="金币" value="1001"></el-option>
                  <!-- <el-option label="现金" value="money"></el-option> -->
                </el-select>
              </el-col>
              <el-col
                :span="4"
                style="height:36px;line-height:36px;color:#6c6c6c;padding-left:5px;"
              >
                <span>(元)</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="14">
            <el-row>
              <el-col :span="20" style="height:36px;">
                <el-input
                  size="small"
                  v-model="newbie_award.count"
                  autocomplete="off"
                  placeholder
                  style="height:100%;"
                ></el-input>
              </el-col>
              <el-col :span="4" style="padding-left:5px;">
                <!-- <el-button type="danger" size="small" @click="deleteItem(index)">删除</el-button> -->
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="currentIndex == 1">
          <el-col :span="10">
            <el-row>
              <el-col :span="20">
                <el-select size="small" v-model="value" placeholder="请选择" style="width:100%;">
                  <el-option label="金币" value="1001"></el-option>
                  <!-- <el-option label="现金" value="money"></el-option> -->
                </el-select>
              </el-col>
              <el-col
                :span="4"
                style="height:36px;line-height:36px;color:#6c6c6c;padding-left:5px;"
              >
                <span>(元)</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="14">
            <el-row>
              <el-col :span="20" style="height:36px;">
                <el-input
                  size="small"
                  v-model="bind_phone_award.count"
                  autocomplete="off"
                  placeholder
                  style="height:100%;"
                ></el-input>
              </el-col>
              <el-col :span="4" style="padding-left:5px;">
                <!-- <el-button type="danger" size="small" @click="deleteItem(index)">删除</el-button> -->
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      <!-- </div> -->
    </div>
    <!-- <el-dialog title="奖励添加" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="奖励id" :label-width="formLabelWidth">
          <el-input v-model="form.reward_id" autocomplete="off" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="奖励名" :label-width="formLabelWidth">
          <el-input v-model="form.reward_name" autocomplete="off" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
         

<script>
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InputArea from "../../plugin/components/InputArea";
export default {
  name: "fresher_awards",
  extends: BaseIframe,
  components: {
    InputArea,
  },
  data() {
    return {
      value:'1001',
      formLabelWidth: "120px",
      tabItem: ["新人奖励","绑定手机奖励"],
      currentIndex: 0,
      // gold: "",
      // money: "",
      // counter: [
      //   {
      //    newbie_award: 999,
      //    bind_phone_award: 10
      //   }
      // ],
      bind_phone_award: {},
      newbie_award: {}
      // dialogFormVisible: false,
      // form: {
      //   reward_id: "",
      //   reward_name: "",
      // }
    };
  },
  created() {
    this.initData()
  },
  methods: {
    showTab(index) {
      this.currentIndex = index;
    },
    async save(type){        
      let {data} = await this.$http.allAgency.PostfresherAward({
        newbie_award: Number(this.newbie_award.count),
        bind_phone_award: Number(this.bind_phone_award.count)
      });
      console.log(data);
      if(data.code == 200) {
        this.$message({
          type: 'success',
          message: data.msg
        })
      }
    },
    sendConfigFile() {
      this.$http.put('v1/backend/operation/fresher-award').then(res => {
        console.log(res)
        if(res.data.code == 200) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        }
      })
    },

    //添加
    // add() {
    //   this.counter.push({item_id:'',count:''});
    // },

    //删除
    // deleteItem(index) {
    //   this.counter = this.counter.filter((item, n) => {
    //     return index !== n;
    //   });
    // },

    //发送到服务器配置
    // sendConfigFile() {
    //   console.log(this.counter);
      
    // },

    async initData(params){
      let {data} = await this.$http.allAgency.GetfresherAward(params)
      console.log(data);
      this.newbie_award = data.data.newbie_award[0]
      this.bind_phone_award = data.data.bind_phone_award[0]
      // this.counter = data.data
      // console.log(this.counter)
    },
  },
 
};
</script>

<style scoped>
#FreshmanReward-main .bd {
  padding-left: 20px;
}
#FreshmanReward-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#FreshmanReward-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#FreshmanReward-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
.nav {
  height: 40px;
  width: 100%;
}
.nav-item {
  width: 100px;
  height: 100%;
  float: left;
  text-align: center;
  background-color: #f2f2f2;
  line-height: 40px;
  border: 1px solid #e7e7e7;
  cursor: pointer;
  color: #737373;
}
.active {
  background-color: #fff;
  color: #000;
}
</style>

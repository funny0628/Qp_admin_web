<template>
  <div id="UserList-main">
    <!-- title -->
    <div class="title">
      UID<el-input
        v-model="UID"
        style="margin-top:10px;width:200px"
      ></el-input>
      手机号码<el-input
        v-model="phone"
        style="margin-top:10px;width:200px"
      ></el-input>
      IP
      <el-input v-model="IP" style="margin-top:10px;width:200px"></el-input>
      渠道<el-select v-model="avator_nameO" style="margin-top:10px;width:200px">
        <el-option
          v-for="item in optionchannels"
          :key="item.levelO"
          :label="item.avator_nameO"
          :value="item.avator_nameO"
        >
        </el-option>
      </el-select>
      状态<el-select v-model="value" placeholder="请选择">
        <el-option label="所有" :value="0"></el-option>
        <el-option label="封号" :value="1"></el-option>
      </el-select>
      vip等级<el-select
        v-model="level"
        placeholder="请选择"
        style="margin-top:10px;width:200px"
      >
        <el-option
          v-for="item in optionData"
          :key="item.level"
          :label="item.avator_name"
          :value="item.level"
        >
        </el-option>
      </el-select>
      日期
      <el-date-picker
        style="margin-top:10px;width:200px"
        v-model="start_time"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="timestamp"
      >
      </el-date-picker>
      -
      <el-date-picker
        style="margin-top:10px;width:200px"
        v-model="end_time"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="timestamp"
      >
      </el-date-picker>
      <el-button type="primary" @click="search">查找</el-button>
    </div>

    <!-- table -->
    <div class="table">
      <el-table
        :data="tableData"
        highlight-current-row
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="uid"
          label="玩家Id"
          align="center"
          width="120"
          show-overflow-tooltip
        >

        </el-table-column>
        <el-table-column
          prop="nickname"
          label="玩家昵称"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="accountType"
          label="账号类型"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="vip等级"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="total_deposit"
          label="累计充值"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="channel" label="渠道" align="center" width="120">
        </el-table-column>
        <el-table-column
          prop="created_time"
          label="注册时间"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="ip" label="创建IP" align="center" width="120">
        </el-table-column>
        <el-table-column
          prop="modified_time"
          label="最后登录时间"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="last_deposit_time"
          label="最后充值时间"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="last_ip"
          label="最后登陆IP"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="bank_info"
          label="银行卡信息"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="alipay"
          label="支付宝信息"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="client_version"
          label="客户端版本"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="device_id"
          label="机器码"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- 正式用户才有 -->
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small"
              >修改登陆密码</el-button
            > -->
            <el-button
              size="mini"
              type="danger"
              @click="handleClick(scope.row,scope.row.status)"
              >{{ scope.row.status }}</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="total > 5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- dialog -->
    <div class="dialog">
      <el-dialog title="用户详情" :visible.sync="visible" width="50%">
        <div class="msg">
          <div class="left">
            <p class="image">
              <img :src="formData.icon_border" alt="" />
            </p>
            <p>{{ formData.nickname }}</p>
            <p>状态:{{ formData.status }}</p>
          </div>
          <div class="right">
            <p class="title">基本信息</p>
            <div class="item">
              <div class="i-f">
                <p>uid/昵称:{{ formData.uid + "/" + formData.nickname }}</p>
                <p>注册时间:{{ formData.created_time }}</p>
                <p>最后登陆时间:{{ formData.modified_time }}</p>
                <p>手机号:{{ formData.phone }}</p>
                <p>渠道:{{ formData.channel }}</p>
              </div>
              <div class="i-r">
                <p>性别:{{ formData.sex }}</p>
                <p>注册IP:{{ formData.ip }}</p>
                <p>最后登陆IP:{{ formData.last_ip }}</p>
                <p>设备号:{{ formData.device_id }}</p>
                <p>客户端版本号:{{ formData.client_version }}</p>
              </div>
            </div>
            <p class="title">高级信息</p>
            <div class="item">
              <div class="i-f">
                <p>首次充值时间:{{ formData.first_buy_time }}</p>
                <p>金币余额:{{ formData.total_coins }}</p>
                <p>最后充值时间:{{ formData.last_deposit_time }}</p>
                <p>累积赢金币:{{ formData.total_win_coins }}</p>
                <p>累积充值次数:{{ formData.total_count }}</p>
                <p>累积押注:{{ formData.total_lose_coins }}</p>
              </div>
              <div class="i-r">
                <p>VIP等级:{{ formData.vip_level }}</p>
                <p>今日流水:{{ formData.today_cash_flow }}</p>
                <p>累积充值:{{ formData.total_deposit }}</p>
                <p>累积兑换:{{ formData.buycount }}</p>
                <p>累积扣台费:{{ formData.total_fee_coins }}</p>
                <p>今日充值:{{ formData.today_depoist_amount }}</p>
                <p>今日兑换:{{ formData.today_exchange_coins }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="visibiTable">
          <el-table
            :data="formTable"
            highlight-current-row
            tooltip-effect="dark"
            border
            style="width: 100%"
          >
            <el-table-column prop="uid" label="uid" align="center" width="120">
            </el-table-column>
            <el-table-column
              prop="lock_status"
              label="	封号状态"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="reason"
              label="原因"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="endtime"
              label="结束时间"
              align="center"
              width="130"
            >
            </el-table-column>
            <el-table-column
              prop="op_name"
              label="最后修改的操作人"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="op_time"
              label="操作时间"
              align="center"
              width="130"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
      <!-- form表单 -->
    <div class="dialog">
      <el-dialog
        title="封号"
        :visible.sync="visibleF"
        :destroy-on-close="true"
      >
        <el-form ref="formF"  :model="formF" label-width="120px">
          <el-form-item label="ID" prop="user_id">
            <el-input placeholder="ID" v-model="formF.user_id"></el-input>
          </el-form-item>
          <el-form-item label="原因" prop="reason	">
            <el-input placeholder="原因" v-model="formF.reason	"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" prop="end_time">
            <el-date-picker
          v-model="formF.end_time"
          type="date"
          placeholder="结束时间"
          format="yyyy-MM-dd"
          value-format="timestamp"
        >
        </el-date-picker>
            <!-- <el-input placeholder="结束时间" v-model="formF.end_time"></el-input> -->
          </el-form-item>
         
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('formF')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BaseIframe from "../../plugin/script/common/BaseIframe";
import DeepData from "../../assets/js/formate.js";
export default {
  name: "users",
  extends: BaseIframe,

  data() {
    return {
      visible: false,
      visibleF:false,
      input: "",
      total: "",
      currentPage: 1,
      limit: 10,
      accountType: "",
      //所有数据表格
      tableData: [],
      visibiTable: false,
      //详情中的表格
      formTable: [],
      // 详情数据
      formData: {},
      optionData: [],
      optionchannels: [],
      avator_nameO: '所有渠道',
       value: 0,
      level: -1,
      UID:'',
      IP:'',
      phone:'',
      start_time:'',
      end_time:'',

      formF: {
        user_id:'',
        reason:'',
        end_time:'',
      },
     
    };
  },

  async created() {
    this.initdata({ page: this.currentPage, limit: this.limit });
    this.initVIP();
  },

  methods: {

    //筛查
    search() {
      // console.log(this.value,this.level,this.avator_nameO,this.phone,this.UID,this.IP,this.start_time,this.end_time,);
      if(this.avator_nameO === '所有渠道'){
        this.avator_nameO = ''
      }

      this.initdata({ page: this.currentPage, limit: this.limit, uid:this.UID || 0, last_ip:this.IP, phone:this.phone, channel:this.avator_nameO, status:this.value, vip_level:this.level, start_time:this.start_time/1000 || 0, end_time:this.end_time/1000 || 0,});
      this.avator_nameO = '所有渠道'
      
    },
    //封号
    async handleClick( row,status) {
      console.log(row,status);
      if(status === '封号'){
        this.visibleF = true
        this.formF.user_id = row.uid
      }else if(status === '解封'){

        //1,发送解封的请求,2.最新的数据的请求PostUserUnlock
        let { data } = await this.$http.OperationMan.PostUserUnlock({user_id:row.uid});
        console.log(data);
         this.initdata({ page: this.currentPage, limit: this.limit });
      }


    },

    //表单确认封号
    async onSubmit(formName){
        if (this.formF.user_id === '' || this.formF.reason === '' || this.formF.end_time === ''){
          this.$message({
            type: "info",
            message: "请完整填写信息"
          });
        }else{
          let Time =( this.formF.end_time + 60* 60*24 *1000) / 1000
          // console.log(Time);
          let resData = {
            user_id: +this.formF.user_id,
            reason:this.formF.reason,
            end_time:Time
          }
          // console.log(resData);
          let { data } = await this.$http.OperationMan.PostUserLock(resData);
          // console.log(data);
          if(data.code === 200){
            this.initdata({ page: this.currentPage, limit: this.limit });
          }
          this.visibleF = false
          this.formF = {}
        
      }
           
        
      
    },
    //表格详情
    handleEdit(index, row) {
      // console.log(index, row);
      this.visible = true;
      this.formTable = []
      //用户详情
      this.iniDetail({ user_id: row.uid });
      this.initUserLock({ user_id: row.uid });
    },

    //页容量发生变化
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;
      this.initdata({ page: this.currentPage, limit: this.limit });
    },
    //页码发生变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.initdata({ page: this.currentPage, limit: this.limit });
    },

    //十位时间戳转格式日期
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },

    formateData(res) {
      res.forEach(item => {
        item.accountType =
          item.phone === "" || item.phone === undefined ? "游客" : "正式用户";
        item.nickname =
          item.nickname === "" || item.nickname === undefined
            ? item.uid
            : item.nickname;
        item.status = item.status === 1 ? "解封" : "封号";
    
      });
      return res;
    },

    data(time) {
      let long1 = Date.parse(time);
      let long2 = new Date(long1).getTime();
      return long2;
    },

    formateNum(item) {
      item.status = item.status === 1 ? "解封" : "封号";
      item.sex = item.sex === 1 ? "男" : "女";
      item.nickname =
        item.nickname === "" || item.nickname === undefined
          ? item.uid
          : item.nickname;

      return item;
    },

    //获取用户列表
    async initdata(params) {
      let { data } = await this.$http.OperationMan.GetUsers(params);
      let fres = this.formateData(DeepData(data.data));
      // console.log(fres);
      this.tableData = fres;
      this.total = data.total;
      // console.log(data);
    },
    //VIP记录列表 / 渠道列表
    async initVIP(params) {
      let { data } = await this.$http.OperationMan.GetVips(params);
      // console.log(data);
      
      this.optionData = DeepData(data.data);
      this.optionData.unshift({avator_name: '所有', level: -1})
      let Channelsdata = await this.$http.OperationMan.GetChannels(params);
      // console.log(Channelsdata);
      let changeData = [];
      Channelsdata.data.data.forEach(item => {
        changeData.push(item.name);
      });
      // console.log(changeData);
      changeData.forEach((item, index) => {
        this.optionchannels.push({ avator_nameO: item, levelO: index });
      });
       this.optionchannels.unshift({avator_nameO: '所有渠道', levelO: -1})
      // console.log(this.optionchannels);
    },

    //获取用户详情
    async iniDetail(params) {
      let { data } = await this.$http.OperationMan.GetUserDetail(params);
      // console.log(data.data);
      this.formData = this.formateNum(data.data);
      this.formData.icon_border = this.$baseUrl + this.formData.icon_border
      // console.log(this.formData);
    },

    //获取用户封号信息
    async initUserLock(params) {
      let { data } = await this.$http.OperationMan.GetUserLock(params);
      // console.log(data.data);
      if (Object.keys(data.data || {}).length !== 0) {
        // console.log(data.data);
        let resData = data.dada;
        // console.log(timestampToTime);
        resData.endtime = this.timestampToTime(resData.endtime)
        resData.op_time = this.timestampToTime(resData.op_time)
        this.visibiTable = true;
        this.formTable.push(resData);
      } else {
        return false;
      }
      // console.log(this.formTable);
    }
  }
};
</script>

<style scoped lang="less">
#UserList-main {
  background-color: #f2f2f2;
  .title {
    padding: 10px;
    box-sizing: border-box;
    p {
      margin: 0;
      padding: 0;
    }
  }
  .table {
    margin-top: 10px;
  }
  .dialog {
    .msg {
      display: flex;
      justify-content: space-between;
      align-items: top;
      .left {
        flex: 1;
        .image {
          width: 100px;
          height: 100px;
          border: 1px solid red;
          background-color: red;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .right {
        flex: 3;
        .title {
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: #eee;
          height: 30px;
          line-height: 30px;
        }
        .item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .i-f{
            flex: 1;
          }
          .i-r{
            flex: 1;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="ChannelsReport">
    <!-- title -->
    <div class="title">
      <el-select
        v-model="avator_nameO"
        placeholder="请选择渠道"
        style="margin-top:10px;width:200px"
      >
        <el-option
          v-for="item in optionchannels"
          :key="item.levelO"
          :label="item.avator_nameO"
          :value="item.avator_nameO"
        >
        </el-option>
      </el-select>

      <el-date-picker
        style="margin-top:10px;width:200px"
        v-model="start_time"
        type="date"
        placeholder="选择日期"
        format="yyyyMMdd"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-button type="primary" @click="search">查找</el-button>
    </div>
    <!-- table -->
    <div class="table">
      <el-table
        :default-sort="{ prop: 'date', order: 'descending' }"
        :data="tableData"
        highlight-current-row
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="channel"
          label="渠道"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="new_user"
          label="新增用户"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="new_bind_user"
          label="新增绑卡用户"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="old_active_user"
          label="老用户活跃人数"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="active_user"
          label="活跃用户"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="recharge_money"
          label="充值金额"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="recharge_user"
          label="充值人数"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="withdraw_money"
          label="兑换金额"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="withdraw_user"
          label="兑换人数"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="agent_withdraw_money"
          label="代理提现金额"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="day_recover"
          label="当日回收"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="new_user_recharge_money"
          label="新用户充值金额"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="new_user_recharge_counts"
          label="新用户充值人数"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="old_user_recharge_money"
          label="老用户充值金额"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="old_user_recharge_counts"
          label="老用户充值人数"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="new_user_recharge_rate"
          label="新用户付费率"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="active_user_recharge_rate"
          label="活跃付费率"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="active_user_arpu"
          label="活跃ARPU值"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="new_user_arpu"
          label="新增ARPU值"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="old_user_arpu"
          label="老用户ARPU值"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="recharge_arpu"
          label="付费ARPU值"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="next_day_rate"
          label="次日存留"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="total > 5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import LoginVue from "../login/Login.vue";
import DeepData from "../../assets/js/formate.js";
export default {
  name:'daily_channel_report',
  data() {
    return {
      start_time: "",
      todayTime: "",
      avator_nameO: "",
      optionchannels: [],
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: ""
    };
  },

  created() {
    this.start_time = this.initTime();
    this.initChannel();
    this.getData();
  },

  methods: {
    search() {
      // console.log(this.start_time, this.avator_nameO);
      this.getData();
    },

    //页容量变化
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;

      this.getData();
    },

    //页码变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.getData();
    },

    //获取当天是时间
    initTime() {
      let myDate = new Date();
      let yestoday =  Date.parse(myDate) - 60*60*24*1000;
      let yesObj = new Date(yestoday);
      let year = yesObj.getFullYear();
      let month = (yesObj.getMonth() + 1) < 10 ? '0' + (yesObj.getMonth() + 1) : (yesObj.getMonth() + 1);
      let day = yesObj.getDate() < 10 ? '0' + yesObj.getDate() : yesObj.getDate();
      return `${year}-${month}-${day}`;
    },

    getData() {
      this.todayTime = this.start_time;
      this.todayTime = DeepData(this.todayTime).replace(/[-]/g, "");
      this.initData({
        page: this.currentPage,
        limit: this.limit,
        date: +this.todayTime,
        channel_name: this.avator_nameO === "所有渠道" ? "" : this.avator_nameO
      });
    },

    //获取所有渠道
    async initChannel() {
      let Channelsdata = await this.$http.OperationMan.GetChannels();;
      let changeData = [];
      Channelsdata.data.data.forEach(item => {
        changeData.push(item.name);
      });
      changeData.forEach((item, index) => {
        this.optionchannels.push({ avator_nameO: item, levelO: index });
      });
      this.optionchannels.unshift({ avator_nameO: "所有渠道", levelO: -1 });
    },

    //获取表格数据
    async initData(params) {
      let { data } = await this.$http.DataAnalysis.GetrReportEveryday(params);
      this.tableData = data.data;
      this.total = data.total;
    }
  }
};
</script>

<style lang="less" scoped>
#ChannelsReport {
  .table {
    margin-top: 20px;
  }
}
</style>

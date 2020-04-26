<template>
  <div id="Channels">
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
        v-model="end_time"
        type="date"
        placeholder="选择日期"
        format="yyyyMMdd"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      -
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
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="new_user"
          label="新增用户"
          align="center"
         width="150"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          sortable
          prop="new_bind_user"
          label="新增绑卡用户"
          align="center"
         width="150"
          show-overflow-tooltip
        >
        </el-table-column>
       
        <el-table-column
          sortable
          prop="recharge_money"
          label="充值金额"
          align="center"
         width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="recharge_user"
          label="充值人数"
          align="center"
         width="150"
        >
        </el-table-column>
        
        <el-table-column
          sortable
          prop="withdraw_money"
          label="兑换金额"
          align="center"
         width="150"
          show-overflow-tooltip
        >
        </el-table-column>
         <el-table-column
          sortable
          prop="new_user_recharge_money"
          label="新用户充值金额"
          align="center"
         width="150"
          show-overflow-tooltip
        >
        </el-table-column>
       
        <el-table-column
          sortable
          prop="agent_withdraw_money"
          label="代理提现金额"
          align="center"
         width="150"
          show-overflow-tooltip
        >
        </el-table-column>
         <el-table-column
          prop="recharge_arpu"
          label="付费ARPU值"
          align="center"
         width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="day_recover"
          label="当日回收"
          align="center"
         width="150"
          show-overflow-tooltip
        >
        </el-table-column>
       
        <el-table-column
          sortable
          prop="new_user_recharge_counts"
          label="新用户充值人数"
          align="center"
         width="150"
          show-overflow-tooltip
        >
        </el-table-column>
      
       
        <el-table-column
          sortable
          prop="new_user_recharge_rate"
          label="新用户付费率"
          align="center"
         width="150"
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
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'channel_report',
  data() {
    return {
      avator_nameO: "",
      optionchannels: [],
      end_time: "",
      start_time: "",
      currentPage: 1,
      limit: 10,
      total: "",
      tableData: []
    };
  },
  created() {
    let today = new Date().getTime();
    this.start_time = this.initTime(today);
    this.end_time = this.initTime(today - 60 * 60 * 24 * 7 * 1000);

    this.initChannel();
    this.getData();
  },
  methods: {
    search() {
        this.getData();
    },

    //页容量变化
    handleSizeChange(num) {
        this.limit = num;
        this.currentPage = 1
        this.getData()
    },

    //页码变化
    handleCurrentChange(pagenum) {
        this.currentPage = pagenum
        this.getData()
    },

    //获取时间格式
    initTime(today) {
      let myDate = new Date(today);
      let year = myDate.getFullYear();
      let month = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
      let day = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
      return `${year}-${month}-${day}`;
    },

      getData() {
      this.startDate = (this.start_time).replace(/[-]/g, "");
      this.endDate = (this.end_time).replace(/[-]/g, "");
      this.initData({
        page: this.currentPage,
        limit: this.limit,
        start_date:  +this.endDate,
        end_data:+this.startDate,
        channel_name: this.avator_nameO === "所有渠道" ? "" : this.avator_nameO
      });
    },

    //获取所有渠道
    async initChannel() {
      let Channelsdata = await this.$http.OperationMan.GetChannels();
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
      let { data } = await this.$http.DataAnalysis.GetrReport(params);
      this.tableData = data.data;
      this.total = data.total;
    }
  }
};
</script>

<style scoped lang="less">
#Channels {
  .table {
    margin-top: 20px;
  }
}
</style>

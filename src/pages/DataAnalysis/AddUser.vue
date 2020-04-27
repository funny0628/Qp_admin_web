<template>
  <div id="AddUser">
    <div class="top">
      <p>新增用户总览</p>
    </div>
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
        value-format="timestamp"
      >
      </el-date-picker>
      -
      <el-date-picker
        style="margin-top:10px;width:200px"
        v-model="start_time"
        type="date"
        placeholder="选择日期"
        format="yyyyMMdd"
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
          prop="date"
          label="新增当日日期"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="add_count"
          label="当日新增人数"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="game_count"
          label="新增玩牌人数"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="game_count_cost"
          label="注册玩牌转化率"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="pay_count"
          label="新增付费用户数"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_num"
          label="新增用户付费次数"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_count_cost"
          label="新增付费率"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="money_into"
          label="新增用户充值额度"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="money_out"
          label="新增用户兑换额度"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="game_board_count"
          label="新增用户牌局数"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="system_out"
          label="新增系统总赢金"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="system_into"
          label="新增系统总输金"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="system_jxh"
          label="净消耗"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="bankruptcy_count"
          label="当日新增用户破产数"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="bankruptcy_count_cost"
          label="当日新增破产率"
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
import DeepData from "../../assets/js/formate.js";
export default {
  data() {
    return {
      avator_nameO: "",
      end_time: "",
      start_time: "",
      optionchannels: [],
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: ""
    };
  },
  created() {
    let today = new Date().getTime();
    this.start_time = today;
    this.end_time = today - 60 * 60 * 24 * 7 * 1000;
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
      this.currentPage = 1;
      this.getData();
    },

    //页码变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.getData();
    },

    getData() {
      this.startDate = Math.ceil(this.start_time / 1000);
      this.endDate = Math.ceil(this.end_time / 1000);

      this.initData({
        page: this.currentPage,
        limit: this.limit,
        end_date: +this.startDate,
        start_date: +this.endDate,
        channel_name: this.avator_nameO === "所有渠道" ? "" : this.avator_nameO
      });
    },

    // 获取时间格式
    initTime(today) {
      let myDate = new Date(today);
      let year = myDate.getFullYear();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      return `${year}-${month}-${day}`;
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
      let { data } = await this.$http.DataAnalysis.GetrNewUsers(params);
        let resData = data.data;
      resData.forEach(item => {
        item.date = this.initTime(item.date * 1000);
      });
      this.tableData = data.data;
      this.total = data.total;
    }
  }
};
</script>

<style lang="less" scoped>
#AddUser {
  .top {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ccc;
    p {
      font-size: 14px;
      width: 120px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
      border: 1px solid #ccc;
      border-bottom: none;
    }
  }
  .table {
    margin-top: 20px;
  }
}
</style>

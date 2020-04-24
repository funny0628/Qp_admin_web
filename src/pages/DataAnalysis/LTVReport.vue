<template>
  <div id="LTVReport">
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
          prop="date"
          label="新增日"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="add_count"
          label="新增用户"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="avg_cost"
          label="平均价值"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_1"
          label="第1天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="pay_2"
          label="第2天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="pay_3" label="第3天" align="center" width="120">
        </el-table-column>
        <el-table-column
          prop="pay_4"
          label="第4天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_5"
          label="第5天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="pay_6" label="第6天" align="center" width="120">
        </el-table-column>
        <el-table-column
          prop="pay_7"
          label="第7天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="pay_8" label="第8天" align="center" width="120">
        </el-table-column>
        <el-table-column
          prop="pay_9"
          label="第9天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_10"
          label="第10天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_11"
          label="第11天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_12"
          label="第12天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_13"
          label="第13天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_14"
          label="第14天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_15"
          label="第15天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_30"
          label="第30天"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_45"
          label="第45天"
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
import DeepData from "../../assets/js/formate.js";
export default {
  data() {
    return {
      avator_nameO: "",
      optionchannels: [],
      start_time: "",
      end_time: "",
      tableData: [],
      currentPage: 1,
      limit: 10,
      total: "",
      startDate: "",
      endDate: ""
    };
  },
  created() {
    let today = new Date().getTime();
    this.start_time = this.initTime(today);
    this.end_time = this.initTime(today - 60 * 60 * 24 * 7 * 1000);
    console.log(this.start_time, this.end_time);

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
      this.current = 1;
      this.getData();
    },

    //页码变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.getData();
    },

    //获取时间格式
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

    //
    getData() {
      this.startDate = this.start_time;
      this.startDate = DeepData(this.startDate).replace(/[-]/g, "");
      this.endDate = this.end_time;
      this.endDate = DeepData(this.endDate).replace(/[-]/g, "");

      this.initData({
        page: this.currentPage,
        limit: this.limit,
        start_date: +this.startDate,
        end_data: +this.endDate,
        channel_name: this.avator_nameO === "所有渠道" ? "" : this.avator_nameO
      });
    },

    //获取表格数据
    async initData(params) {
      let { data } = await this.$http.DataAnalysis.GetrReportLtv(params);
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
#LTVReport {
  .table {
    margin-top: 20px;
  }
}
</style>

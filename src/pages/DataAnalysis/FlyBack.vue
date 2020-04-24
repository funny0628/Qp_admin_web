<template>
  <div id="FlyBack">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="流失用户" name="1"></el-tab-pane>
      <el-tab-pane label="回归用户" name="2"></el-tab-pane>
    </el-tabs>
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
        :data="tableData"
        highlight-current-row
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <p v-if="activeName === '1'">
          <el-table-column
            fixed="left"
            prop="date"
            label="日期"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_lost"
            label="流失用户"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_lost_bingding"
            label="流失绑卡用户"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_lost_ay"
            label="付费流失用户"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="user_lost_rate"
            label="用户流失率"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="user_lost_bingding_rate"
            label="绑定流失率"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_lost_pay_rate"
            label="付费流失率"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
        </p>
        <p v-if="activeName === '2'">
          <el-table-column
            fixed="left"
            prop="date"
            label="日期"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_return"
            label="回归用户"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_natural_return"
            label="自然回归用户"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_activity_return"
            label="主动招回用户"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_return_bingding"
            label="回归绑卡用户"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_natural_return_bingding"
            label="自然回归绑卡"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="user_activity_return_bingding"
            label="主动招回绑卡"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_return_rate"
            label="用户回率"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="user_return_bingding_rate"
            label="绑卡回率"
            align="center"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
        </p>
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
  data() {
    return {
      avator_nameO: "",
      optionchannels: [],
      end_time: "",
      start_time: "",
      tableData: [],
      limit: 10,
      currentPage: 1,
      total: "",
      activeName: '1'
    };
  },
  created() {
    let today = new Date().getTime();
    this.start_time = this.initTime(today);
    this.end_time = this.initTime(today - 60 * 60 * 24 * 7 * 1000);
    // console.log(this.start_time, this.end_time);
    this.initChannel();
    this.getData();
  },
  methods: {
    search() {
      this.getData();
    },

    handleClick(tab) {
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

    //获取时间格式
    initTime(today) {
      let myDate = new Date(today);
      let year = myDate.getFullYear();
      let month =
        myDate.getMonth() + 1 < 10
          ? "0" + (myDate.getMonth() + 1)
          : myDate.getMonth() + 1;
      let day =
        myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate();
      return `${year}-${month}-${day}`;
    },

    getData() {
      this.startDate = this.start_time.replace(/[-]/g, "");
      this.endDate = this.end_time.replace(/[-]/g, "");
      this.initData({
        page: this.currentPage,
        limit: this.limit,
        start_date: +this.endDate,
        end_data: +this.startDate,
        channel_name: this.avator_nameO === "所有渠道" ? "" : this.avator_nameO,
        type_id: +this.activeName
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
      let { data } = await this.$http.DataAnalysis.GetrLoss(params);
    //   console.log(data);
      this.tableData = data.data;
      this.total = data.total;
    }
  }
};
</script>

<style lang="less" scoped>
#FlyBack {
  .title {
    margin-top: 20px;
  }
  .table {
    margin-top: 20px;
  }
}
</style>

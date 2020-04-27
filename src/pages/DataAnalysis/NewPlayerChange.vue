<template>
  <div id="NewPlayerChange">
    <div class="top">
      <p>支付转化</p>
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
          
          prop="days"
          label="日期"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          
          prop="user_reg"
          label="新增账号个数"
          align="center"
         width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          
          prop="pay_user_d"
          label="首日付费账号个数"
          align="center"
         width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="day_change"
          label="首日付费率"
          align="center"
         width="260"
          show-overflow-tooltip
        >
        </el-table-column>


        <el-table-column
          prop="pay_user_w"
          label="首周付费账号个数"
          align="center"
         width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="week_change"
          label="首周付费率"
          align="center"
         width="260"
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
export default {
  name:'pay_switch',
  data() {
    return {
      avator_nameO: "",
      optionchannels: [],
      tableData: [],
      currentPage:1,
      limit:10,
      total:'',
    };
  },
  created() {
      this.initChannel();
      this.getData();
  },
  methods: {
    search() {
        this.getData();
    },

    //页容量变化
    handleSizeChange(num) {
        this.limit = num
        this.currentPage = 1
        this.getData()
    },

    //页码变化
    handleCurrentChange(pagenum) {
        this.currentPage = pagenum
        this.getData()
    },


     getData() {

      this.initData({
        page: this.currentPage,
        limit: this.limit,
        channel_name: this.avator_nameO === "所有渠道" ? "" : this.avator_nameO,
       
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
      let { data } = await this.$http.DataAnalysis.GetrPaySwitch(params);
    //   let resData = data.data;
    //   resData.forEach(item => {
    //     item.days = this.initTime(item.days * 1000);
    //   });
      this.tableData = data.data;
      this.total = data.total;
    }
  }
};
</script>

<style lang="less" scoped>
#NewPlayerChange {
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

  .title {
    margin-top: 20px;
  }
  .table {
    margin-top: 20px;
  }
}
</style>

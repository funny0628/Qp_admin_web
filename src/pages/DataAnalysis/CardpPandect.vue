<template>
  <div id="CardpPandect">
    <div class="top">
      <p>牌局总览</p>
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
        <el-table-column
          v-for="(item,index) in titleData"
          :key="index"
          :prop="item.prop"
          :label="item.label"
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
      total: "",
      titleData:[
        {
          prop:"day",
          label:"日期"
        },
        {
          prop:"reg_user",
          label:"新增账号"
        },
        {
          prop:"active_user",
          label:"活跃账户"
        },
        {
          prop:"reg_user_game",
          label:"新增玩牌人数"
        },
        {
          prop:"active_user_game",
          label:"活跃玩牌人数"
        },
        {
          prop:"reg_ratio",
          label:"注册玩牌率"
        },
        {
          prop:"active_ratio",
          label:"活跃玩牌率"
        },
        {
          prop:"game_user",
          label:"玩牌人次"
        },
        {
          prop:"game_num",
          label:"牌局数"
        },
        {
          prop:"win_num",
          label:"赢局数"
        },
        {
          prop:"lost_num",
          label:"输局数"
        },
        {
          prop:"win",
          label:"系统总赢金"
        },
        {
          prop:"lost",
          label:"系统总输金"
        },
        {
          prop:"consume",
          label:"总消耗"
        },
        {
          prop:"bankrupt_user",
          label:"破产用户数"
        },
        {
          prop:"bankrupt_ratio",
          label:"破产率"
        },
      ]
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
        this.getData()
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

    //获取表格数据
    async initData(params) {
      let { data } = await this.$http.DataAnalysis.GetrMatchOverview(params);
      this.tableData = data.data;
      this.total = data.total;
    }
  }
};
</script>

<style lang="less" scoped>
#CardpPandect {
  padding: 20px;
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

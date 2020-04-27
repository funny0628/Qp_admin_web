<template>
  <div id="lastAnalysis">
    <!-- title -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="新增留存" name="1"></el-tab-pane>
      <el-tab-pane label="活跃留存" name="2"></el-tab-pane>
      <el-tab-pane label=" 付费留存" name="3"></el-tab-pane>
      <el-tab-pane label="回流用户留存" name="4"></el-tab-pane>
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
        <el-table-column
          v-for="(itme,index) in titleData"
          :key="index"
          :prop="itme.prop"
          :label="itme.label"
          align="center"
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
  name:'retained_analysis',
  data() {
    return {
      activeName: '1',
      avator_nameO: "",
      optionchannels: [],
      tableData: [],
      end_time: "",
      start_time: "",
      currentPage: 1,
      limit: 10,
      total: "",
       titleData:[
        {
          prop:'date',
          label:'日期'
        },
        {
          prop:'add_count',
          label:'新增用户数',
        },
        {
          prop:'reserved_1',
          label:'次日留存',
        },
        {
          prop:'reserved_3',
          label:'3留',
        },
        {
          prop:'reserved_4',
          label:'4留',
        },
        {
          prop:'reserved_5',
          label:'5留',
        },
        {
          prop:'reserved_6',
          label:'6留',
        },
        {
          prop:'reserved_7',
          label:'7留',
        },
        {
          prop:'reserved_15',
          label:'15留',
        },
        {
          prop:'reserved_30',
          label:'30留',
        },
        {
          prop:'reserved_45',
          label:'45留',
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

    //tab切换
    handleClick(tab) {
        // console.log(tab.name);
        this.activeName  = tab.name
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

    //获取时间格式
    initTime(today) {
      let myDate = new Date(today);
      let year = myDate.getFullYear();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      return `${year}-${month}-${day}`;
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
      let { data } = await this.$http.DataAnalysis.GetrAnalysis(params);
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
#lastAnalysis {
  padding: 20px;

  .table {
    margin-top: 20px;
  }
}
</style>

<template>
  <div id="Statistics">
    <!-- title -->
    <div class="title">
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
          :prop="item.prop + ''"
          :label="item.lable"
          align="center"
          width="120"
          show-overflow-tooltip
          :fixed="item.lable === '统计' ? 'right' : false"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import DeepData from "../../assets/js/formate.js";
export default {
  data() {
    return {
      end_time: "",
      start_time: "",
      tableData: [],
      titleData:[]
    };
  },
  created() {
    let today = new Date().getTime();
    this.start_time = this.initTime(today);
    this.end_time = this.initTime(today - 60 * 60 * 24 * 7 * 1000);
    // console.log(this.start_time, this.end_time);

    this.getData();
  },
  methods: {
    search() {
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

    getData() {
      this.startDate = this.start_time;
      this.startDate = DeepData(this.startDate).replace(/[-]/g, "");
      this.endDate = this.end_time;
      this.endDate = DeepData(this.endDate).replace(/[-]/g, "");

      this.initData({
        start_date:+this.endDate,
        end_data: +this.startDate, 
      });
    },

    async initData(params) {
      let {data} = await this.$http.DataAnalysis.GetStatistical(params);
      // console.log(data);
      this.tableData = data.data.list1
      this.titleData = data.data.list2
    }
  }
};
</script>

<style lang="less" scoped>
#Statistics {
  .title {
    margin-top: 20px;
  }
  .table {
    margin-top: 20px;
  }
}
</style>

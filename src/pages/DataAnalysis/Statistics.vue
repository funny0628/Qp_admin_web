<template>
  <div id="Statistics">
    <!-- title -->
    <div class="title">
      <el-date-picker
        style="margin-top:10px;width:200px"
        v-model="start_time"
        type="date"
        placeholder="选择日期"
        format="yyyyMMdd"
        value-format="timestamp"
      >
      </el-date-picker>
      -
      <el-date-picker
        style="margin-top:10px;width:200px"
        v-model="end_time"
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
  name:'fee_statistical',
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
    this.end_time = today;
    this.start_time = (today - 60 * 60 * 24 * 7 * 1000);
    this.getData();
  },
  methods: {
    search() {
      this.getData();
    },


    getData() {
      // console.log(this.start_time,this.end_time);
      this.initData({
        start_date:Math.ceil(this.start_time/1000),
        end_data:Math.ceil(this.end_time/1000), 
      });
    },

    async initData(params) {
      let {data} = await this.$http.DataAnalysis.GetStatistical(params);
      this.tableData = data.data.list1
      this.titleData = data.data.list2
    }
  }
};
</script>

<style lang="less" scoped>
#Statistics {
  padding: 20px;
  .table {
    margin-top: 20px;
  }
}
</style>

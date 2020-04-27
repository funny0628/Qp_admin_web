<template>
  <div id="GMdata-main">

      <el-select
        v-model="format.widthdraw_status"
        placeholder="GM库存控制"
        clearable
        size="medium"
      >
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" size="medium">查找</el-button>

    <!-- table -->
    <div class="table">
      <el-table
        border
        highlight-current-row
        :default-sort="{ prop: 'ID', order: 'ascending' }"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column sortable prop="date" label="日期" align="center">
        </el-table-column>
        <el-table-column prop="gm_coins" label="实时库存值" align="center">
        </el-table-column>
        <el-table-column
          prop="base_change"
          label="实时库存变化值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="gm_add_coins"
          label="添加库存值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="add_change"
          label="添加库存变化值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="fee_store"
          label="回收值"
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

import DeepData from "../../../assets/js/formate.js";
export default {
  name: "GMdata",

  data() {
    return {
      // orderlist: ["ascending", "descending"],
      tableData: [],
      total: "",
      currentPage: 1,
      limit: 10,
      platforms:[{
        value:'GM库存控制',lable:1
      }],
      format: {
        widthdraw_status: "GM库存控制"
      }
    };
  },
  created() {
    this.getData()
  },
  methods: {
    /**搜索*/
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

    getData(){
      this.initData({
        page:this.currentPage,
        limit:this.limit,
        grade:'gm_coins'
      })
    },

   async initData(params){
      let {data} = await this.$http.OperationMan.GetInvenData(params)
      // console.log(data);
      // let res = DeepData(data.data)
      // console.log(res);
      
      this.tableData = data.data;
      this.total = data.total
      
    },
  },
};
</script>

<style scoped lang="less">
#GMdata-main .table {
  margin-top: 20px;
}
</style>

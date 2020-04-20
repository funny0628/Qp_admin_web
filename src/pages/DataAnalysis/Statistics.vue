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
          
          prop="date"
          label="日期"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          
          prop="add_count"
          label="新增用户数"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          
          prop="reserved_1"
          label="次日留存"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="reserved_3"
          label="3留"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="reserved_4"
          label="4留"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="reserved_5"
          label="5留"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="reserved_6"
          label="6留"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
      
        <el-table-column
          prop="reserved_7"
          label="7留"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
       
        <el-table-column
          prop="reserved_15"
          label="15留"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="reserved_30"
          label="30留"
          align="center"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="reserved_45"
          label="45留"
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
export default {
    data() {
        return {
            end_time:'',
            start_time:'',
        }
    },
    methods: {
        search(){},
    },
}
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
<template>
  <div id="GFlowerWater">
    <el-select
      v-model="format.order_status"
      placeholder="房间选择"
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
    <el-button type="primary" @click="search">查找</el-button>
    <!-- table -->
    <div class="table">
      <el-table
        border
        highlight-current-row
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column sortable prop="id" label="日期" align="center">
        </el-table-column>
        <el-table-column prop="sort_num" label="基础库存值" align="center">
        </el-table-column>
        <el-table-column
          prop="pay_name"
          label="基础库存变化值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_channel"
          label="奖励库存值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_way"
          label="奖励库存变化值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="money_num"
          label="抽水"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="money_num"
          label="抽水变化值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="money_num"
          label="回收金币值"
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
export default {
  data() {
    return {
      order_status: "",
      format:{
          order_status:'',
          order_status:'',
      },
      platforms: [
        { value: 1, label: "金花-低倍场" },
        { value: 2, label: "金花-中倍场" },
        { value: 3, label: "金花-高倍场" },
        { value: 4, label: "金花-土豪场" }
      ],
      tableData:[],
      total:'',
      currentPage:1,
      limit:10,
    };
  },
  methods: {
    //查找
    search() {},

    //页容量变化
    handleSizeChange() {},

    //页码变化
    handleCurrentChange() {},
  }
};
</script>

<style scoped lang="less">
#GFlowerWater {
    .table{
        margin-top: 20px;
    }
}
</style>

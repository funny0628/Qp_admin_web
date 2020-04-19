<template>
  <div id="GMdata-main">

      <el-select
        v-model="format.widthdraw_status"
        placeholder="请选择"
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
        :default-sort="{ prop: 'ID', order: orderlist[0] }"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column sortable prop="id" label="日期" align="center">
        </el-table-column>
        <el-table-column prop="sort_num" label="实时库存值" align="center">
        </el-table-column>
        <el-table-column
          prop="pay_name"
          label="实时库存变化值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_channel"
          label="添加库存值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_way"
          label="添加库存变化值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="money_num"
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
  name: "GMdata",

  data() {
    return {
      orderlist: ["ascending", "descending"],
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
  methods: {
    /**搜索*/
    search() {},

    //页容量变化
    handleSizeChange(num) {
      console.log(num);
    },

    //页码变化
    handleCurrentChange(pagenum) {
      console.log(pagenum);
    },

    // handleDelete(index, row) {
    //   console.log(row);
    //   const ids = row.id.toString();
    //   console.log(ids);
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(
    //       this.$message({
    //         type: "success",
    //         message: res.data.msg
    //       })
    //     )
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: res.data.msg
    //       });
    //     });
    // }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
#GMdata-main .table {
  margin-top: 20px;
}
</style>

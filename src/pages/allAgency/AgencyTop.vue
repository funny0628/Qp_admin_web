<template>
  <div id="AgencyTop">
      <div class="title">
          <el-button type="primary" @click="Pnum">按直属下级人数排序</el-button>
          <el-button type="primary" @click="Mearn">按累计佣金收益排序</el-button>
      </div>
        <!-- table -->
    <div>
      <el-table
        border
        highlight-current-row
        :default-sort="{ prop: 'ID', order: orderlist[0] }"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column sortable prop="id" label="玩家ID" align="center">
        </el-table-column>

        <el-table-column
          prop="title"
          label="注册时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="info"
          label="所属渠道"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="inscribe"
          label="直属下级人数"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="notice_time"
          label="累计佣金收益"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="start_time"
          label="累计已提佣金"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
     
      

        <el-table-column
          prop="change"
          label=""
          align="center"
          show-overflow-tooltip
          width="200px"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    
      <!-- <el-pagination
        v-if="total > 5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            orderlist: ["ascending", "descending"],
            tableData:[],
        }
    },
    methods: {
        Pnum(){},
        Mearn(){},
        handleEdit(){},
        handleDelete(){},
    },
}
</script>

<style lang="less" scoped>

</style>
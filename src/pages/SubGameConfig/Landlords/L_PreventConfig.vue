<template>
  <div id="L_PreventConfig">
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="save">添加</el-button
      ><el-button type="primary" @click="send">发送配置</el-button>
    </div>
    <!-- tabale -->
    <div class="table">
      <el-table
        :default-sort="{ prop: 'date', order: 'descending' }"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column  sortable align="center" prop="date" label="编号" width="180">
        </el-table-column>
        <el-table-column align="center" prop="name" label="渠道" width="180">
        </el-table-column>
        <el-table-column align="center" prop="address" label="有效时间">
        </el-table-column>
        <el-table-column align="center" prop="address" label="最后操作时间">
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作者">
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // order: "descending",
      tableData: [
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-04-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-03-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
      ]
    };
  },
  methods: {
    save(){},
    send(){},
    handleEdit(){},
  },
};
</script>

<style lang="less" scoped>
#L_PreventConfig {
  background-color: #f2f2f2;
  .title {
    padding: 10px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
}
</style>

<template>
  <div id="GMdata-main">
    <input-area>
    <el-select v-model="format.widthdraw_status" placeholder="请选择" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" size="medium">查找</el-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop === 'action'">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
  </div>
</template>
         

<script>
import InfoTable from "../../../plugin/components/InfoTable";
import PageInfo from "../../../plugin/script/common/PageInfo";
import InputArea from "../../../plugin/components/InputArea";
import InfoTableItem from "../../../plugin/components/InfoTableItem";

export default {
  name: "GMdata",
  components: {
    InfoTableItem,
    InputArea,
    InfoTable,
  },
  data() {
    return {
      platforms: [
        { value: 1, label: "全部" },
        { value: 2, label: "审核中" },
        { value: 3, label: "已拒绝" },
        { value: 4, label: "已关闭" },
        { value: 5, label: "已完成" },
        { value: 6, label: "申请中" }
      ],
      format: {
        widthdraw_status: "",
      },
      tableStyle: [
        { label: "日期", prop: "order_id", width: "" },
        { label: "实时库存值", prop: "channel_name", width: "" },
        { label: "实时库存变化值", prop: "channel_name", width: "" },
        { label: "添加库存值", prop: "fun_1", width: "" },
        { label: "添加库存变化值", prop: "fun_2", width: "" },
        { label: "回收值", prop: "fun_5", width: "" },
      ],
      records: [
        {
          order_id: "10012",
          channel_name: "主包",
          fun_1: "备份",
          fun_2: "排行榜",
          fun_3: "邮箱",
          fun_4: "客服",
          fun_5: "未设定",
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
    };
  },
  methods: {
    /**搜索*/
    search() {},
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(row);
      const ids = row.id.toString();
      console.log(ids);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(
          this.$message({
            type: "success",
            message: res.data.msg
          })
        )
        .catch(() => {
          this.$message({
            type: "info",
            message: res.data.msg
          });
        });
    }
  },
  mounted() {}
};
</script>

<style scoped>
#GMdata-main .bd {
  padding-left: 20px;
}
#GMdata-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#GMdata-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#GMdata-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
table {
  border-collapse: collapse;
}
</style>

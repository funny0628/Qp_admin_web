<template>
  <div id="GMcontrol-main">
    <input-area>
      <div>
        <el-button type="primary" size="medium" @click="dialogFormVisible=true">添加</el-button>
      </div>
      <el-input v-model="format.play_id" placeholder="请输入玩家id" size="medium" clearable></el-input>
      <el-select v-model="format.status" placeholder="请选择" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="format.control_money" placeholder="请选择" clearable size="medium">
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
    <el-dialog title="添加控制名单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="控制金额" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权重值" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="输钱概率(%)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="赢钱概率(%)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
         

<script>
import InfoTable from "../../../plugin/components/InfoTable";
import PageInfo from "../../../plugin/script/common/PageInfo";
import InputArea from "../../../plugin/components/InputArea";
import InfoTableItem from "../../../plugin/components/InfoTableItem";

export default {
  name: "GMcontrol",
  components: {
    InfoTableItem,
    InputArea,
    InfoTable
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      platforms: [
        { value: 1, label: "全部" },
        { value: 2, label: "审核中" },
        { value: 3, label: "已拒绝" },
        { value: 4, label: "已关闭" },
        { value: 5, label: "已完成" },
        { value: 6, label: "申请中" }
      ],
      format: {
        play_id: "",
        status: "",
        control_money: ""
      },
      tableStyle: [
        { label: "玩家昵称", prop: "order_id", width: "" },
        { label: "玩家id", prop: "channel_name", width: "" },
        { label: "控制金额", prop: "channel_name", width: "" },
        { label: "当前个人库存值", prop: "fun_1", width: "" },
        { label: "状态", prop: "fun_2", width: "" },
        { label: "权重值", prop: "fun_5", width: "" },
        { label: "输钱概率(%)", prop: "fun_5", width: "" },
        { label: "赢钱概率(%)", prop: "fun_5", width: "" },
        { label: "创建类型", prop: "fun_5", width: "" },
        { label: "创建时间", prop: "fun_5", width: "" },
        { label: "最后修改人员", prop: "fun_5", width: "" },
        { label: "操作", prop: "action", width: "150" }
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
          fun_6: "未设定",
          fun_7: "未设定",
          fun_8: "设定",
          operator: "json",
          create_time: "2020-02-10 12:00:00",
          action: ""
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      form: {
        name: ""
      }
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
#GMcontrol-main .bd {
  padding-left: 20px;
}
#GMcontrol-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#GMcontrol-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#GMcontrol-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
table {
  border-collapse: collapse;
}
</style>

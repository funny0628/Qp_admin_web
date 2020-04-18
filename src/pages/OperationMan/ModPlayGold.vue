<template>
  <div id="ModPlayGold-main">
    <input-area>
      <span>玩家ID</span>
      <el-input v-model="format.play_id" placeholder="请输入玩家id" size="medium" clearable></el-input>
      <el-button type="primary" size="medium">查找</el-button>
      <el-button type="primary" size="medium" @click="dialogFormVisible=true">修改金币</el-button>
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
    <el-dialog title="修改玩家金币" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="玩家id" :label-width="formLabelWidth">
          <el-input v-model="form.play_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改类型" :label-width="formLabelWidth">
          <el-select v-model="form.mod_type" placeholder="请选择" style="width:100%;">
            <el-option label="减金币" value="shanghai"></el-option>
            <el-option label="加金币" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改途径" :label-width="formLabelWidth">
          <el-select v-model="form.mod_path" placeholder="请选择" style="width:100%;">
            <el-option label="普通" value="shanghai"></el-option>
            <el-option label="流水" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改数量" :label-width="formLabelWidth">
          <el-input v-model="form.mod_num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modPlayGold">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
         

<script>
import SelectTime from "../../plugin/components/SelectTime";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import UserHandler from "../../script/handlers/UserHandler";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "ModPlayGold",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      format: {
        play_id: ""
      },
      tableStyle: [
        { label: "ID", prop: "order_id", width: "" },
        { label: "玩家ID", prop: "channel_name", width: "" },
        { label: "修改类型", prop: "channel_name", width: "" },
        { label: "修改途径", prop: "fun_1", width: "" },
        { label: "修改数量", prop: "fun_2", width: "" },
        { label: "备注", prop: "fun_5", width: "" },
        { label: "操作者", prop: "fun_5", width: "" },
        { label: "操作时间", prop: "fun_5", width: "" },
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
      form: {
        play_id: "",
        mod_type: "",
        mod_path: "",
        mod_num: "",
        remark: ""
      },
      pageInfo: new PageInfo(0, [5, 10, 15], 5)
    };
  },
  methods: {
    getModGoldList() {
      this.$http.get('v1/backend/operation/coin-modify').then(res=>{
        console.log(res)
      })
    },
    modPlayGold() {

    },
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
  mounted() {
    this.getModGoldList()
  }
};
</script>

<style scoped>
#ModPlayGold-main .bd {
  padding-left: 20px;
}
#ModPlayGold-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#ModPlayGold-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#ModPlayGold-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
table {
  border-collapse: collapse;
}
</style>

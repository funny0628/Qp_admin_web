<template>
  <div id="ModPlayGold-main">
    <input-area>
      <span>玩家ID</span>
      <el-input v-model="format.play_id" placeholder="请输入玩家id" size="medium" clearable></el-input>
      <el-button
        v-loading.fullscreen="searchLoading"
        element-loading-text="资源加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        type="primary"
        size="medium"
        @click="searchData"
      >查找</el-button>
      <el-button type="primary" size="medium" @click="dialogFormVisible=true">修改金币</el-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hide-page="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'type'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  === 1">加金币</span>
              <span v-if="scope.row[scope.prop]  === 2">减金币</span>
            </template>
            <template v-if="'path'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  === 1">普通</span>
              <span v-if="scope.row[scope.prop]  === 2">流水</span>
            </template>
            <template v-if="'updated_at'.indexOf(scope.prop) >= 0">
              <span>{{scope.row.updated_at | dateFormat}}</span>
            </template>
            <template
              v-if="['action','type','path','updated_at'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
      <el-pagination
        style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="修改玩家金币" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="玩家id" :label-width="formLabelWidth">
          <el-input v-model="form.play_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改类型" :label-width="formLabelWidth">
          <el-select v-model="form.mod_type" placeholder="请选择" style="width:100%;">
            <!-- <el-option label="加金币" value="1"></el-option> -->
            <el-option label="减金币" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改途径" :label-width="formLabelWidth">
          <el-select v-model="form.mod_path" placeholder="请选择" style="width:100%;">
            <el-option label="普通" value="1"></el-option>
            <el-option label="流水" value="2"></el-option>
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
        <el-button type="primary" @click="modPlayGoldFn">确 定</el-button>
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
  name: "change_coins",
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
      searchLoading: false,
      pagesize: 10,
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      format: {
        play_id: ""
      },
      tableStyle: [
        { label: "玩家ID", prop: "uid", width: "" },
        { label: "修改类型", prop: "type", width: "" },
        { label: "修改途径", prop: "path", width: "" },
        { label: "修改数量", prop: "value", width: "" },
        { label: "备注", prop: "remarks", width: "" },
        { label: "操作者", prop: "auth", width: "" },
        { label: "操作时间", prop: "updated_at", width: "" }
      ],
      records: [],
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
      this.searchLoading = true
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        user_id: Number(this.format.play_id)
      };
      this.$http
        .get("v1/backend/operation/coin-modify", {
          params
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.searchLoading = false
            this.records = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    searchData() {
      this.getModGoldList();
    },
    modPlayGoldFn() {
      let data = {
        user_id: Number(this.form.play_id),
        modify_type: Number(this.form.mod_type),
        modify_path: Number(this.form.mod_path),
        modify_value: Number(this.form.mod_num),
        remarks: this.form.remark
      };
      this.$http.post("v1/backend/operation/coin-modify", data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.dialogFormVisible = false;
          this.getModGoldList();
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
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
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getModGoldList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getModGoldList();
    }
  },
  mounted() {
    this.getModGoldList();
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

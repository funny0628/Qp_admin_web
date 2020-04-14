<template>
  <div id="GameList-main">
    <el-button
      v-if="!showReturn"
      type="primary"
      @click="openAdd"
      style="margin-top: 10px;margin-bottom: 10px;"
    >添加</el-button>
    <el-button
      v-if="showReturn"
      type="primary"
      @click="returnSupClass"
      style="margin-top: 10px;margin-bottom: 10px;"
    >返回</el-button>
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
            <template v-if="scope.prop === 'action'">
              <el-button
                v-if="!showReturn"
                size="mini"
                type="primary"
                @click="checkSubGame(scope.row)"
              >子游戏</el-button>
              <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
      <el-pagination
        style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!--添加 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="上级游戏" :label-width="formLabelWidth">
          <el-select v-model="form.sup_game" ref="supGame">
            <el-option
              v-for="(item,index) in records"
              :key="index"
              :value="item.game_name"
            >{{item.game_name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏名称" :label-width="formLabelWidth">
          <el-input v-model="form.game_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏id" :label-width="formLabelWidth">
          <el-input v-model="form.game_id" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="机器人类型" :label-width="formLabelWidth">
          <el-input v-model="form.robot_type" disabled autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div>{{form}}</div>
      <div>{{records}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGame">确 定</el-button>
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
  name: "GameList",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  data() {
    /*校验手机号*/
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        if (/^[1][345789]\d{9}$/.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      pagesize: 5,
      currentPage: 1,
      total: 0,
      formLabelWidth: "120px",
      showReturn: false,
      value: true,
      labelPosition: "left", //左对齐
      tableStyle: [
        { label: "游戏名称", prop: "game_name", width: "" },
        { label: "游戏类型", prop: "game_id", width: "" },
        { label: "创建时间", prop: "create_time", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(1, [5, 10, 15, 20], 6),
      dialogFormVisible: false,
      dialogTitle: "",
      form: {
        classOneAddOrEditRemark: 1, //1为新增 2 为编辑
        classTwoEditRemark: 1, //1为新增 2 为编辑
        parent_id: 0,
        sup_game: "大厅",
        game_name: "",
        game_id: "",
        robot_type: ""
      },
      game_name: "", //点击子游戏按钮时保存游戏名
      fileList: []
    };
  },
  methods: {
    getGameList() {
      this.$http
        .get("/v1/backend/lobby/game_list", {
          params: {
            page: 1,
            limit: 10,
            parent_id: this.form.parent_id
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.records = res.data.data;
            this.total = res.data.total
            // this.gameOpts = res.data.data
          }
        });
    },
    resetForm() {
      this.form = {
        classOneAddOrEditRemark: 1,
        classTwoEditRemark: 1,
        id: -1,
        parent_id: 0,
        sup_game: "",
        game_name: "",
        game_id: "",
        robot_type: ""
      };
    },
    openAdd() {
      this.dialogTitle = "记录";
      this.dialogFormVisible = true;
      this.resetForm();
      console.log(this.form.parent_id);
    },
    addGame() {
      if (
        this.form.parent_id === 0 &&
        this.form.classOneAddOrEditRemark === 1
      ) {
        //新增一级游戏
        let data = {
          parent_id: 0,
          game_name: this.form.game_name,
          robot_type: this.form.robot_type,
          game_id: Number(this.form.game_id)
        };
        this.$http.post("/v1/backend/lobby/game_list", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getGameList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      }
      //编辑一级游戏
      if (
        this.form.parent_id === 0 &&
        this.form.classOneAddOrEditRemark === 2
      ) {
        console.log("我进来了？");
        let data = {
          id: this.form.id,
          game_name: this.form.game_name
        };
        this.$http.patch("v1/backend/lobby/game_list", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getGameList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      }
      //编辑二级游戏
      if (this.form.parent_id !== 0 && this.form.classTwoEditRemark === 2) {
        let data = {
          id: this.form.id,
          game_name: this.form.game_name
        };
        this.$http.patch("v1/backend/lobby/game_list", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getGameList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      }
    },
    handleEdit(row) {
      console.log(row);
      this.dialogTitle = "编辑";
      this.dialogFormVisible = true;
      if (row.parent_id === 0) {
        this.form.classOneAddOrEditRemark = 2;
        this.form.id = row.id;
        this.form.parent_id = row.parent_id;
        this.form.sup_game = "大厅";
        this.form.game_name = row.game_name;
        this.form.game_id = row.game_id;
        this.form.robot_type = row.robot_type;
        this.$nextTick(() => {
          this.$refs.supGame.disabled = true;
        });
      } else {
        this.form.classTwoEditRemark = 2;
        this.form.id = row.id;
        this.form.parent_id = row.parent_id;
        this.form.sup_game = this.game_name; //保存的上级游戏名
        this.form.game_name = row.game_name;
        this.form.game_id = row.game_id;
        this.form.robot_type = row.robot_type;
        this.$nextTick(() => {
          this.$refs.supGame.disabled = true;
        });
        console.log(this.form);
      }
    },
    checkSubGame(row) {
      console.log(row);
      this.showReturn = true;
      this.game_name = row.game_name;
      let pid = row.game_id;
      this.$http
        .get("v1/backend/lobby/game_list", {
          params: {
            page: this.currentPage,
            limit: this.pagesize,
            parent_id: pid
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.records = res.data.data;
            this.total = res.data.total
            // this.gameOpts = res.data.data
          }
        });
    },
    returnSupClass() {
      this.showReturn = false;
      this.resetForm();
      this.getGameList();
    },
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getGameList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGameList();
    }
  },
  watch: {
    "form.sup_game": function(newVal, oldVal) {
      console.log(newVal, oldVal);
      this.records.forEach((item, index) => {
        if (item.game_name === newVal) {
          this.form.game_id = item.next_id;
          this.form.robot_type = item.robot_type;
          this.form.parent_id = item.game_id;
        }
      });
    }
  },
  mounted() {
    this.getGameList();
  }
};
</script>

<style scoped>
#GameList-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#GameList-main .bd p {
  margin: 0;
}
#GameList-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
</style>

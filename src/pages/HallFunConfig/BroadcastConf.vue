<template>
  <div id="BroadcastConf-main">
    <input-area>
      <div>
        <!-- <el-button type="danger">删除</el-button> -->
        <el-button v-has="'add_broadcast_config'" type="primary" @click="openAdd">添加</el-button>
        <el-button type="primary" @click="sendDataToServer">发送到服务端配置</el-button>
      </div>
    </input-area>
    <div class="bd">
      <info-table
        v-has="'broadcast_config_list'"
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hide-page="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop === 'type'">
              <span v-if="scope.row[scope.prop]  === 1">对局广播</span>
              <span v-if="scope.row[scope.prop]  === 2">vip上线广播</span>
              <span v-if="scope.row[scope.prop]  === 3">引导弹窗广播</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <el-button v-has="'modify_broadcast_config'" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button v-has="'delete_broadcast_config'" size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
            <template v-if="['action','type'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
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
    <div>
      <!-- 添加系统广播 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="120px">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="form.mid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="请选择" style="width:100%;">
              <el-option label="对局广播" value="1"></el-option>
              <el-option label="VIP上线广播" value="2"></el-option>
              <el-option label="引导弹窗广播" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏名称" :label-width="formLabelWidth">
            <el-input v-model="form.game_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公告信息" :label-width="formLabelWidth">
            <el-input v-model="form.info" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="广播保留时间" :label-width="formLabelWidth">
            <el-input v-model="form.exit_time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="金币范围" :label-width="formLabelWidth">
            <el-row>
              <el-col :span="10">
                <el-input v-model="form.coins_range[0]" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="4" style="text-align:center;">-</el-col>
              <el-col :span="10">
                <el-input v-model="form.coins_range[1]" autocomplete="off"></el-input>
              </el-col>
            </el-row>
            <span>生成的金币范围格式: 100,5000</span>
          </el-form-item>
          <el-form-item label="时间范围" :label-width="formLabelWidth">
            <el-row>
              <el-col :span="10">
                <el-input v-model="form.time_range[0]" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="4" style="text-align:center;">-</el-col>
              <el-col :span="10">
                <el-input v-model="form.time_range[1]" autocomplete="off"></el-input>
              </el-col>
            </el-row>
            <span>生成的时间范围格式: 600,1200</span>
          </el-form-item>
          <el-form-item label="触发金额" :label-width="formLabelWidth">
            <el-input v-model="form.target_coins" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时间间隔" :label-width="formLabelWidth">
            <el-input v-model="form.interval_time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否MOCK数据" :label-width="formLabelWidth">
            <el-select v-model="form.is_need_fake" placeholder="请选择" style="width:100%;">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBroadcast">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
import Qs from "qs";
export default {
  name: "broadcast_config",
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
      dialogTitle: "",
      value: true,
      labelPosition: "left", //左对齐
      dialogFormVisible: false,
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: ""
      },
      funOpts: [
        { value: "1", label: "留空" },
        { value: "2", label: "活动" },
        { value: "3", label: "邮件" },
        { value: "4", label: "排行榜" },
        { value: "5", label: "设置" },
        { value: "6", label: "保险箱" },
        { value: "7", label: "广播" },
        { value: "8", label: "财神" }
      ],
      tableStyle: [
        { label: "ID", prop: "id", width: "" },
        { label: "广播类型", prop: "type", width: "" },
        { label: "游戏名称", prop: "game_name", width: "" },
        { label: "信息", prop: "info", width: "" },
        { label: "保留时间(秒)", prop: "exit_time", width: "" },
        { label: "生成金币范围", prop: "coins_range", width: "" },
        { label: "生成时间范围", prop: "time_range", width: "" },
        { label: "触发金额", prop: "target_coins", width: "" },
        { label: "操作", prop: "action", width: "150" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        mid: "",
        type: "",
        game_name: "",
        info: "",
        exit_time: "",
        coins_range: ["", ""],
        time_range: ["", ""],
        target_coins: "",
        interval_time: "",
        is_need_fake: ""
      }
    };
  },
  methods: {
    sendDataToServer() {
      let data = {
        type_id: 5
      };
      this.$http.post("v1/backend/lobby/server_config_two", data).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    getBroadcastList() {
      this.$http
        .get("v1/backend/lobby/play_broadcast", {
          params: {
            page: this.currentPage,
            limit: this.pagesize
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.records = res.data.data;
            this.total = res.data.total
          }
        });
    },
    //添加编辑
    addBroadcast() {
      if (!this.form.id) {
        let data = {
          mid: Number(this.form.mid),
          type: Number(this.form.type),
          game_name: this.form.game_name,
          info: this.form.info,
          exit_time: Number(this.form.exit_time),
          coins_range: JSON.stringify(this.form.coins_range),
          time_range: JSON.stringify(this.form.time_range),
          target_coins: this.form.target_coins,
          interval_time: this.form.interval_time,
          is_need_fake: this.form.is_need_fake
        };
        this.$http.post("v1/backend/lobby/play_broadcast", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getBroadcastList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      } else {
        let data = {
          id: this.form.id,
          mid: Number(this.form.mid),
          type: Number(this.form.type),
          game_name: this.form.game_name,
          info: this.form.info,
          exit_time: Number(this.form.exit_time),
          coins_range: JSON.stringify(this.form.coins_range),
          time_range: JSON.stringify(this.form.time_range),
          target_coins: this.form.target_coins,
          interval_time: this.form.interval_time,
          is_need_fake: this.form.is_need_fake
        };
        this.$http.put("v1/backend/lobby/play_broadcast", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getBroadcastList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      }
    },
    //充值form表单
    resetForm() {
      this.form = {
        mid: "",
        type: "",
        game_name: "",
        info: "",
        exit_time: "",
        coins_range: ["", ""],
        time_range: ["", ""],
        target_coins: "",
        interval_time: "",
        is_need_fake: ""
      };
    },
    handleEdit(row) {
      console.log(row);
      this.dialogTitle = "编辑系统广播";
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.mid = row.mid;
      this.form.type = String(row.type);
      this.form.game_name = row.game_name;
      this.form.info = row.info;
      this.form.exit_time = String(row.exit_time);
      this.form.coins_range[0] = JSON.parse(row.coins_range)[0];
      this.form.coins_range[1] = JSON.parse(row.coins_range)[1];
      this.form.time_range[0] = JSON.parse(row.time_range)[0];
      this.form.time_range[1] = JSON.parse(row.time_range)[1];
      this.form.target_coins = row.target_coins;
      this.form.interval_time = row.interval_time;
      this.form.is_need_fake = String(row.is_need_fake);
    },
    handleDelete(row) {
      console.log(row);
      let id = row.id;
      this.$confirm("此操作将删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http
            .delete("v1/backend/lobby/play_broadcast", {
              params: {
                id: id
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 1) {
                this.getBroadcastList()
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getBroadcastList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBroadcastList();
    },
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    /** 添加 */
    openAdd() {
      this.dialogTitle = "添加系统广播";
      this.dialogFormVisible = true;
      this.resetForm();
    },
  },
  mounted() {
    this.getBroadcastList();
  }
};
</script>

<style scoped>
#BroadcastConf-main .bd {
  padding-left: 20px;
}
#BroadcastConf-main .bd p {
  margin: 0;
}

.platformchoice {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}

.bankCard {
  width: 100%;
}
table {
  border-collapse: collapse;
}
.itemClass {
  width: 45%;
}
</style>

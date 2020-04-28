<template>
  <div id="VipClassConf-main">
    <input-area>
      <!-- <el-button type="danger" style="margin-top: 10px;margin-bottom: 10px;">删除</el-button> -->
      <el-button
        v-has="'add_vip_robot_config'"
        type="primary"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="openAddDialog"
      >添加</el-button>
      <el-button type="primary" @click="sendDataToServer">发送到服务端配置</el-button>
      <el-button
        v-has="'robot_random_probability'"
        type="danger"
        size="medium"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="dialogVisible=true"
      >排行榜机器人随机概率</el-button>
    </input-area>
    <div class="bd">
      <el-table
        v-has="'vip_robot_config_records'"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column label="机器人携带金币" align="center">
          <template slot-scope="scope">{{[scope.row.min_coins,scope.row.max_coins]}}</template>
        </el-table-column>
        <el-table-column prop="vip_rate" label="VIP级别+概率" align="center">
          <template slot-scope="scope">{{JSON.parse(scope.row.vip_rate)}}</template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.update_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <el-button v-has="'modify_vip_robot_config'" size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-has="'delete_vip_robot_config'" size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="携带金币" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.min_coins" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="4" style="text-align:center;">-</el-col>
            <el-col :span="10">
              <el-input v-model="form.max_coins" autocomplete="off"></el-input>
            </el-col>
          </el-row>
          <span>机器人携带金币(左闭右开)</span>
        </el-form-item>
        <el-form-item label="VIP_0" :label-width="formLabelWidth">
          <el-input v-model="form.vip_0" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_1" :label-width="formLabelWidth">
          <el-input v-model="form.vip_1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_2" :label-width="formLabelWidth">
          <el-input v-model="form.vip_2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_3" :label-width="formLabelWidth">
          <el-input v-model="form.vip_3" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_4" :label-width="formLabelWidth">
          <el-input v-model="form.vip_4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_5" :label-width="formLabelWidth">
          <el-input v-model="form.vip_5" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_6" :label-width="formLabelWidth">
          <el-input v-model="form.vip_6" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewRobotConf">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 排行榜机器人随机概率 -->
    <el-dialog title="排行榜机器人随机概率" :visible.sync="dialogVisible">
      <el-form :model="form">
        <div style="margin-bottom:20px;font-size:16px;">
          <span>排行榜机器人随机概率</span>
          <el-button type="primary" @click="send">发送到服务端配置</el-button>
        </div>
        <el-form-item label="VIP_0" :label-width="formLabelWidth">
          <el-input v-model="rankRobotProbList.vip_0" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_1" :label-width="formLabelWidth">
          <el-input v-model="rankRobotProbList.vip_1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_2" :label-width="formLabelWidth">
          <el-input v-model="rankRobotProbList.vip_2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_3" :label-width="formLabelWidth">
          <el-input v-model="rankRobotProbList.vip_3" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_4" :label-width="formLabelWidth">
          <el-input v-model="rankRobotProbList.vip_4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_5" :label-width="formLabelWidth">
          <el-input v-model="rankRobotProbList.vip_5" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_6" :label-width="formLabelWidth">
          <el-input v-model="rankRobotProbList.vip_6" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InfoTable from "../../../plugin/components/InfoTable";
import PageInfo from "../../../plugin/script/common/PageInfo";
import InfoTableItem from "../../../plugin/components/InfoTableItem";
import InputArea from "../../../plugin/components/InputArea";
export default {
  name: "vip_robot_config",
  components: {
    InfoTableItem,
    InfoTable,
    InputArea
  },
  data() {
    return {
      pagesize: 5,
      currentPage: 1,
      total: 0,
      tableData: [],
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "120px",
      form: {
        min_coins: "",
        max_coins: "",
        vip_0: "",
        vip_1: "",
        vip_2: "",
        vip_3: "",
        vip_4: "",
        vip_5: "",
        vip_6: ""
      },
      dialogTitle: "",
      rankRobotProbList: {},
      id: 0,
      keys: ""
    };
  },
  async created() {
    //获取数据
    let { data } = await this.$http.HallFunConfig.GetServerConfig({
      key: "robot_rank_vip.lua"
    });
    console.log(data);
    this.id = data.data[0].id;
    this.keys = data.data[0].sys_key;
    let res = JSON.parse(data.data[0].sys_val);
    console.log(res);
    this.rankRobotProbList = res;
  },
  methods: {
    sendDataToServer() {
      let data = {
        type_id: 3
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
    resetForm() {
      this.form = {
        min_coins: "",
        max_coins: "",
        vip_0: "",
        vip_1: "",
        vip_2: "",
        vip_3: "",
        vip_4: "",
        vip_5: "",
        vip_6: ""
      };
    },
    getRobotConfList() {
      this.$http
        .get("v1/backend/lobby/robot", {
          params: {
            page: this.currentPage,
            limit: this.pagesize
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.total;
        });
    },
    openAddDialog() {
      this.dialogFormVisible = true;
      this.dialogTitle = "添加信息";
      this.resetForm();
    },
    addNewRobotConf() {
      if (!this.form.robot_id) {
        let rate = {
          vip_0: this.form.vip_0,
          vip_1: this.form.vip_1,
          vip_2: this.form.vip_2,
          vip_3: this.form.vip_3,
          vip_4: this.form.vip_4,
          vip_5: this.form.vip_5,
          vip_6: this.form.vip_6
        };
        let data = {
          min_coins: Number(this.form.min_coins),
          max_coins: Number(this.form.max_coins),
          vip_rate: JSON.stringify(rate)
        };
        this.$http.post("v1/backend/lobby/robot", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getRobotConfList();
          }
        });
      } else {
        let rate = {
          vip_0: this.form.vip_0,
          vip_1: this.form.vip_1,
          vip_2: this.form.vip_2,
          vip_3: this.form.vip_3,
          vip_4: this.form.vip_4,
          vip_5: this.form.vip_5,
          vip_6: this.form.vip_6
        };
        let data = {
          min_coins: Number(this.form.min_coins),
          max_coins: Number(this.form.max_coins),
          vip_rate: JSON.stringify(rate),
          robot_id: this.form.robot_id
        };
        this.$http.put("v1/backend/lobby/robot", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getRobotConfList();
          }
        });
      }
    },
    handleEdit(row) {
      console.log(row);
      this.dialogTitle = "更新信息";
      this.dialogFormVisible = true;
      this.form.robot_id = row.id;
      this.form.min_coins = row.min_coins;
      this.form.max_coins = row.max_coins;
      this.form.vip_0 = JSON.parse(row.vip_rate).vip_0;
      this.form.vip_1 = JSON.parse(row.vip_rate).vip_1;
      this.form.vip_2 = JSON.parse(row.vip_rate).vip_2;
      this.form.vip_3 = JSON.parse(row.vip_rate).vip_3;
      this.form.vip_4 = JSON.parse(row.vip_rate).vip_4;
      this.form.vip_5 = JSON.parse(row.vip_rate).vip_5;
      this.form.vip_6 = JSON.parse(row.vip_rate).vip_6;
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("v1/backend/lobby/robot", {
              params: {
                robot_id: row.id
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 1) {
                this.getRobotConfList();
              }
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async send() {
      this.loading = true;

      let { data } = await this.$http.HallFunConfig.PostServerConfig({
        keys: this.keys,
        values: JSON.stringify(this.rankRobotProbList),
        id: this.id
      });
      console.log(data);
      if (data.code === 1 && data.msg === "ok") {
        this.loading = false;
        this.$message({
          type: "success",
          message: "发送服务器配置成功!"
        });
      }
    },
    async save() {
      let { data } = await this.$http.HallFunConfig.PutServerConfig({
        keys: this.keys,
        values: JSON.stringify(this.rankRobotProbList),
        id: this.id
      });
      // console.log(data);
      if (data.code === 1 && data.msg === "ok") {
        this.dialogVisible = false;
        this.$message({
          type: "success",
          message: "保存成功!"
        });
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getRobotConfList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRobotConfList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    open() {
      this.$confirm("确认发送吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "发送成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送"
          });
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  mounted() {
    this.getRobotConfList();
  }
};
</script>

<style scoped>
#VipClassConf-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#VipClassConf-main .bd p {
  margin: 0;
}
#VipClassConf-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
.el-pagination {
  margin-top: 20px;
}
</style>

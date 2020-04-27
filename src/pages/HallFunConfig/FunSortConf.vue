<template>
  <div id="FunSortConf-main">
    <input-area>
      <!-- <el-button type="danger">删除</el-button> -->
      <el-button type="primary" @click="openAddDialog">添加</el-button>
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
            <template v-if="scope.prop === 'action'">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
            <template
              v-if="['action','func_list'].indexOf(scope.prop) < 0"
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
    <div>
      <!-- 添加活动入口配置 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-position="top">
          <el-form-item label="渠道(可多选)">
            <el-checkbox-group v-model="form.checkList" :max="1">
              <el-checkbox
                v-for="(item,index) in channelOpts"
                :key="index"
                :label="item.channel_code"
              >{{item.channel_name}}</el-checkbox>
            </el-checkbox-group>
            <div>{{form.checkList}}</div>
          </el-form-item>
          <el-form-item label="活动1">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.active_1" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动2">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.active_2" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动3">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.active_3" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动4">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.active_4" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动5">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.active_5" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动6">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.active_6" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFunSortConf">确 定</el-button>
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

export default {
  name: "FunSortConf",
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
      pagesize: 5,
      currentPage: 1,
      total: 0,
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
      funOpts: [],
      channelOpts: [],
      tableStyle: [
        { label: "ID", prop: "id", width: "" },
        { label: "渠道名称", prop: "channel_name", width: "" },
        { label: "渠道KEY", prop: "channel_code", width: "" },
        { label: "活动1", prop: "func_1", width: "" },
        { label: "活动2", prop: "func_2", width: "" },
        { label: "活动3", prop: "func_3", width: "" },
        { label: "活动4", prop: "func_4", width: "" },
        { label: "活动5", prop: "func_5", width: "" },
        { label: "活动6", prop: "func_6", width: "" },
        { label: "操作者", prop: "auth", width: "" },
        { label: "创建时间", prop: "create_time", width: "160" },
        { label: "操作", prop: "action", width: "150" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        checkList: [],
        active_1: "留空",
        active_2: "留空",
        active_3: "留空",
        active_4: "留空",
        active_5: "留空",
        active_6: "留空"
      }
    };
  },
  methods: {
    resetForm() {
      this.form = {
        id: null,
        checkList: [],
        active_1: "留空",
        active_2: "留空",
        active_3: "留空",
        active_4: "留空",
        active_5: "留空",
        active_6: "留空"
      };
    },
    getFunSortList() {
      this.$http
        .get("v1/backend/lobby/bottom", {
          params: {
            page: this.currentPage,
            limit: this.pagesize,
            type: 2
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            // if(res.data.total === 0) {
            //   this.currentPage = 1
            //   this.getFunSortList()
            // }
            this.records = res.data.data;
            this.total = res.data.total;
            this.func_list_index();
            console.log(this.records);
          }
        });
    },
    func_list_index: function() {
      this.records.map((item1, index1) => {
        JSON.parse(item1.func_list).map((item2, index2) => {
          item1[`func_${index2 + 1}`] = item2;
        });
      });
    },
    /**搜索*/
    search() {},
    openAddDialog() {
      this.dialogTitle = "添加活动入口配置";
      this.dialogFormVisible = true;
      this.resetForm();
      this.getActiveOpts();
      this.getChannelList();
    },
    addFunSortConf() {
      if (!this.form.id) {
        let actStr =
          this.form.active_1 +
          "," +
          this.form.active_2 +
          "," +
          this.form.active_3 +
          "," +
          this.form.active_4 +
          "," +
          this.form.active_5 +
          "," +
          this.form.active_6;
        let actArr = actStr.split(",");
        let data = {
          name: this.form.checkList[0],
          code: this.form.checkList[0],
          list_id: JSON.stringify(actArr),
          type: 2
        };
        this.$http.post("v1/backend/lobby/bottom", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getFunSortList();
          }
        });
      } else {
        let actStr =
          this.form.active_1 +
          "," +
          this.form.active_2 +
          "," +
          this.form.active_3 +
          "," +
          this.form.active_4 +
          "," +
          this.form.active_5 +
          "," +
          this.form.active_6;
        let actArr = actStr.split(",");
        let data = {
          name: this.form.checkList[0],
          code: this.form.checkList[0],
          list_id: JSON.stringify(actArr),
          type: 2,
          banner_id: this.form.id
        };
        this.$http.put("v1/backend/lobby/bottom", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getFunSortList();
          }
        });
      }
    },
    handleEdit(row) {
      console.log(row);
      this.dialogTitle = "更新活动入口配置";
      this.dialogFormVisible = true;
      this.getActiveOpts();
      this.getChannelList();
      this.form.id = row.id;
      this.form.checkList = [row.channel_name]
      this.form.active_1 = JSON.parse(row.func_list)[0];
      this.form.active_2 = JSON.parse(row.func_list)[1];
      this.form.active_3 = JSON.parse(row.func_list)[2];
      this.form.active_4 = JSON.parse(row.func_list)[3];
      this.form.active_5 = JSON.parse(row.func_list)[4];
      this.form.active_6 = JSON.parse(row.func_list)[5];
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("确认删除吗？", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("v1/backend/lobby/bottom", {
              params: {
                id: row.id
              }
            })
            .then(res => {
              console.log(res)
              if (res.data.code === 1) {
                this.getFunSortList();
                this.$message({
                  type: "success",
                  message: res.data.msg
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
    getChannelList() {
      console.log('我调用了吗','getChannelList')
      this.$http
        .get("v1/backend/no_channel", {
          params: {
            type_id: 2
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.channelOpts = res.data.data;
          }
        });
    },
    getActiveOpts() {
      console.log('我调用了吗','getActiveOpts')
      this.$http
        .get("v1/backend/lobby/name_type", {
          params: {
            type_id: 3
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.funOpts = res.data.data;
          }
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.currentPage = 1
      this.getFunSortList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFunSortList();
    }
  },
  mounted() {
    this.getFunSortList();
  }
};
</script>

<style scoped>
#FunSortConf-main .bd {
  padding-left: 20px;
}
#FunSortConf-main .bd p {
  margin: 0;
}
#FunSortConf-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
</style>

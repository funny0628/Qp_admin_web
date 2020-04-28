<template>
  <div id="BottomMenu-main">
    <input-area>
      <!-- <el-button type="danger">删除</el-button> -->
      <el-button type="primary" @click="openAddDialog" v-has="'add_button_menu_config'">添加</el-button>
    </input-area>
    <div class="bd">
      <el-table :data="tableData" border style="width: 100%" v-has="'button_menu_config_list'">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="channel_name" label="渠道名称" align="center"></el-table-column>
        <el-table-column prop="channel_code" label="渠道KEY" align="center"></el-table-column>
        <el-table-column label="功能1" prop="func_1" align="center"></el-table-column>
        <el-table-column label="功能2" prop="func_2" align="center"></el-table-column>
        <el-table-column label="功能3" prop="func_3" align="center"></el-table-column>
        <el-table-column label="功能4" prop="func_4" align="center"></el-table-column>
        <el-table-column label="功能5" prop="func_5" align="center"></el-table-column>
        <el-table-column label="功能6" prop="func_6" align="center"></el-table-column>
        <el-table-column label="操作者" prop="auth" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
        <el-table-column label="请求时间" prop="update_time" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-has="'modify_button_menu_config'" size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-has="'delete_button_menu_config'" size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
                v-for="(item,index) in ChannelList"
                :key="index"
                :label="item.channel_name"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="功能1">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function1">
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
          <el-form-item label="功能2">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function2">
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
          <el-form-item label="功能3">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function3">
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
          <el-form-item label="功能4">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function4">
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
          <el-form-item label="功能5">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function5">
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
          <el-form-item label="功能6">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function6">
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
          <!-- <el-form-item label="功能7">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item> -->
          <!-- <el-form-item label="功能8">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addChannelFun">确 定</el-button>
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
  name: "button_menu_config",
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
      isEditCheckChannel: true,
      pagesize: 10,
      currentPage: 1,
      total: 0,
      player_id: "", // 玩家id
      labelPosition: "left", //左对齐
      dialogFormVisible: false,
      dialogTitle: "",
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: ""
      },
      ChannelList: [], //渠道列表
      checkChannelCode: "",
      channel_code: "",
      funOpts: [],
      tableData: [],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        id: null,
        checkList: [],
        function1: "留空",
        function2: "留空",
        function3: "留空",
        function4: "留空",
        function5: "留空",
        function6: "留空"
      }
    };
  },
  methods: {
    getBottomMenuList() {
      this.$http
        .get("v1/backend/lobby/bottom", {
          params: {
            page: this.currentPage,
            limit: this.pagesize,
            type: 1
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.tableData = res.data.data;
            this.total = res.data.total
            this.func_list_index();
          console.log(this.tableData)
          }
        });
    },
    func_list_index: function() {
      this.tableData.map((item1, index1) => {
        JSON.parse(item1.func_list).map((item2,index2) => {
          item1[`func_${index2+1}`] =  item2
        })
      });
    },
    resetForm() {
      this.form = {
        id: null,
        checkList: [],
        function1: "留空",
        function2: "留空",
        function3: "留空",
        function4: "留空",
        function5: "留空",
        function6: "留空"
      };
    },
    openAddDialog() {
      this.dialogFormVisible = true;
      this.dialogTitle = "添加活动入口配置";
      this.resetForm();
      this.getChannelList();
      this.getFunNameList();
    },
    //获取功能名字列表
    getFunNameList() {
      this.$http
        .get("v1/backend/lobby/name_type", {
          params: {
            type_id: 3
          }
        })
        .then(res => {
          console.log(res);
          this.funOpts = res.data.data;
        });
    },
    //获取渠道选项列表
    getChannelList() {
      let data = {
        type_id: 1,
          add_id: 3
      }
      this.$http.post("v1/backend/no_channel",data).then(res => {
        console.log(res);
        this.ChannelList = res.data.data;
      });
    },
    //得到选中的渠道的channel-code
    getChannleCode() {
      this.ChannelList.forEach((item, index) => {
        console.log(item);
        console.log(this.form.checkList);
        if (this.form.checkList[0] === item.channel_name) {
          this.checkChannelCode = item.channel_code;
          console.log(this.checkChannelCode);
        }
      });
    },
    addChannelFun() {
      if (!this.form.id) {
        let funStr =
          this.form.function1 +
          "," +
          this.form.function2 +
          "," +
          this.form.function3 +
          "," +
          this.form.function4 +
          "," +
          this.form.function5 +
          "," +
          this.form.function6;
        let funArr = funStr.split(",");
        let data = {
          name: this.form.checkList[0],
          code: this.checkChannelCode,
          list_id: JSON.stringify(funArr),
          type: 1
        };
        this.$http.post("v1/backend/lobby/bottom", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getBottomMenuList();
          }
        });
      } else {
        console.log("wojinlaile ");
        let funStr =
          this.form.function1 +
          "," +
          this.form.function2 +
          "," +
          this.form.function3 +
          "," +
          this.form.function4 +
          "," +
          this.form.function5 +
          "," +
          this.form.function6;
        let funArr = funStr.split(",");
        let data = {
          banner_id: this.form.id,
          name: this.form.checkList[0],
          code: this.form.checkList[0],
          list_id: JSON.stringify(funArr),
          type: 1
        };
        console.log(data);
        this.$http.put("v1/backend/lobby/bottom", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getBottomMenuList();
          }
        });
      }
    },
    handleEdit(row) {
      console.log(row);
      this.getChannelList();
      this.getFunNameList();
      this.dialogFormVisible = true;
      this.dialogTitle = "更新活动入口配置";
      this.form.checkList = [row.channel_name];
      this.form.id = row.id;
      this.form.function1 = JSON.parse(row.func_list)[0];
      this.form.function2 = JSON.parse(row.func_list)[1];
      this.form.function3 = JSON.parse(row.func_list)[2];
      this.form.function4 = JSON.parse(row.func_list)[3];
      this.form.function5 = JSON.parse(row.func_list)[4];
      this.form.function6 = JSON.parse(row.func_list)[5];
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
              if (res.data.code === 1) {
                this.getBottomMenuList();
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
      this.getBottomMenuList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBottomMenuList();
    },
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    /** 添加会员 */
    addUser() {
      this.dialogAddVisible = true;
    },
    handelClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogFormVisible = true;
      }
    }
  },
  watch: {
    "form.checkList": function(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (newVal) {
        this.getChannleCode();
      }
    }
  },
  mounted() {
    this.getBottomMenuList();
  }
};
</script>

<style scoped>
#BottomMenu-main .bd {
  padding-left: 20px;
}
#BottomMenu-main .bd p {
  margin: 0;
}
#BottomMenu-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
</style>

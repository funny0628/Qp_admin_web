<template>
  <div id="FunSortConf-main">
    <input-area>
      <el-button type="danger">删除</el-button>
      <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
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
            <template v-if="scope.prop === 'func_list'">
              <!-- <div v-for="(func, index) in JSON.parse(scope.row[scope.prop])" :key="index">
                <span>{{func}}</span>
              </div>-->
              <span>{{JSON.parse(scope.row[scope.prop])[0]}}</span>
              <span>{{JSON.parse(scope.row[scope.prop])[1]}}</span>
              <span>{{JSON.parse(scope.row[scope.prop])[2]}}</span>
              <span>{{JSON.parse(scope.row[scope.prop])[3]}}</span>
              <span>{{JSON.parse(scope.row[scope.prop])[4]}}</span>
              <span>{{JSON.parse(scope.row[scope.prop])[5]}}</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            <template
              v-if="['action','func_list'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div>
      <!-- 添加活动入口配置 -->
      <el-dialog title="添加活动入口配置" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-position="top">
          <el-form-item label="渠道(可多选)">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox label="0902代理01"></el-checkbox>
              <el-checkbox label="0902代理02"></el-checkbox>
              <el-checkbox label="0902代理03"></el-checkbox>
              <el-checkbox label="0902代理04"></el-checkbox>
              <el-checkbox label="0902代理05"></el-checkbox>
              <el-checkbox label="0902代理06"></el-checkbox>
              <el-checkbox label="0902代理07"></el-checkbox>
              <el-checkbox label="0902代理08"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="活动1">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动2">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动3">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动4">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动5">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动6">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动7">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动8">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">活动名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      value: true,
      player_id: "", // 玩家id
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
        { value: "2", label: "代理" },
        { value: "3", label: "客服" },
        { value: "4", label: "服务中心" }
      ],
      tableStyle: [
        { label: "ID", prop: "id", width: "" },
        { label: "渠道名称", prop: "channel_name", width: "" },
        { label: "渠道KEY", prop: "channel_code", width: "" },
        { label: "功能1", prop: "func_list", width: "" },
        { label: "功能2", prop: "func_list", width: "" },
        { label: "功能3", prop: "func_list", width: "" },
        { label: "功能4", prop: "func_list", width: "" },
        { label: "功能5", prop: "func_list", width: "" },
        { label: "功能6", prop: "func_list", width: "" },
        { label: "操作者", prop: "auth", width: "" },
        { label: "创建时间", prop: "create_time", width: "160" },
        { label: "操作", prop: "action", width: "150" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        checkList: ["0902代理01", "0902代理02"],
        function: "1",
        agent: 100,
        nickname: "",
        password: "",
        money_password: "",
        phone: "",
        user_type: "1"
      }
    };
  },
  methods: {
    getFunSortList() {
      this.$http
        .get("v1/backend/lobby/bottom", {
          params: {
            page: 1,
            limit: 10,
            type: 2
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.records = res.data.data;
          }
        });
    },
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    handleEdit(row) {},
    handleDelete(row) {
      this.$confirm("确认删除吗？", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
</style>

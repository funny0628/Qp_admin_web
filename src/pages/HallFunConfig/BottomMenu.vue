<template>
  <div id="BottomMenu-main">
    <input-area>
      <el-button type="danger">删除</el-button>
      <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
    </input-area>
    <div class="bd">
      <!-- <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handelClick(btn,scope.row)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="channel_name" label="渠道名称" align="center"></el-table-column>
        <el-table-column prop="channel_code" label="渠道KEY" align="center"></el-table-column>
        <el-table-column
          v-for="(item,index) in scope.row[scope.prop]"
          :key="index"
          :label="'功能'+(index+1)"
          align="center"
        >
        <template slot-scope="scope">
          <span>{{scope.row.func_list[index]}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="auth" label="操作者" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
        <el-table-column label="请求时间" align="center"></el-table-column>
      </el-table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>-->
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
          <el-form-item label="功能1">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
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
          <el-form-item label="功能2">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
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
          <el-form-item label="功能3">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
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
          <el-form-item label="功能4">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
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
          <el-form-item label="功能5">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
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
          <el-form-item label="功能6">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
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
          <el-form-item label="功能7">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
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
          <el-form-item label="功能8">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
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
  name: "BottomMenu",
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
        { value: "2", label: "活动" },
        { value: "3", label: "邮件" },
        { value: "4", label: "排行榜" },
        { value: "5", label: "设置" },
        { value: "6", label: "保险箱" },
        { value: "7", label: "广播" },
        { value: "8", label: "财神" }
      ],
      tableData: [],
      FunListOpts: [],
      tableStyle: [
        { label: "ID", prop: "channel_id", width: "" },
        { label: "渠道名称", prop: "channel_name", width: "" },
        { label: "渠道KEY", prop: "channel_name", width: "" },
        { label: "功能1", prop: "fun_1", width: "" },
        { label: "功能2", prop: "fun_2", width: "" },
        { label: "功能3", prop: "fun_3", width: "" },
        { label: "功能4", prop: "fun_4", width: "" },
        { label: "功能5", prop: "fun_5", width: "" },
        { label: "功能6", prop: "fun_6", width: "" },
        { label: "功能7", prop: "fun_7", width: "" },
        { label: "功能8", prop: "fun_8", width: "" },
        { label: "操作者", prop: "operator", width: "" },
        { label: "创建时间", prop: "create_time", width: "160" },
        { label: "操作", prop: "action", width: "120" }
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
    getBottomMenuList() {
      this.$http
        .get("lobby/bottom", {
          params: {
            page: 1,
            limit: 10,
            type: 1
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.tableData = res.data.data;
          }
        });
    },
    getFunListOpts() {
      this.tableData.forEach((item,index) => {
        if(item.func_list) {
          this.FunListOpts = item.func_list
        }
      })
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

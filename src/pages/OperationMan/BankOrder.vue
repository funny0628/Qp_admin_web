<template>
  <div id="BankOrder-main">
    <input-area>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-select v-model="format.order_status" placeholder="请选择" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button type="primary">搜索</el-button>
      <!-- <el-button type="primary" @click="dialogFormVisible=true">导出excel</el-button> -->
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
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','status','user_id'].indexOf(scope.prop) < 0"
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
  name: "bank_card",
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
      pagesize: 10,
      currentPage: 1,
      total: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      platforms: [
        { value: 1, label: "全部" },
        { value: 2, label: "审核中" },
        { value: 3, label: "已拒绝" },
        { value: 4, label: "已关闭" },
        { value: 5, label: "已完成" },
        { value: 6, label: "申请中" },
      ],
      format: {
        user_id: "",
        order_status: ""
      },
      tableStyle: [
        { label: "ID", prop: "order_id", width: "" },
        { label: "订单号", prop: "channel_name", width: "" },
        { label: "用户id", prop: "channel_name", width: "" },
        { label: "转账方式", prop: "fun_1", width: "" },
        { label: "姓名", prop: "fun_2", width: "" },
        { label: "账号", prop: "fun_3", width: "" },
        { label: "金额", prop: "fun_4", width: "" },
        { label: "赠送金额", prop: "fun_5", width: "" },
        { label: "状态", prop: "fun_6", width: "" },
        { label: "内部订单号", prop: "fun_7", width: "" },
        { label: "备注", prop: "fun_8", width: "" },
        { label: "操作者", prop: "operator", width: "" },
        { label: "操作时间", prop: "create_time", width: "160" },
        { label: "操作", prop: "action", width: "120" }
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
    getBankOrderList() {
      let params = {
        page: this.currentPage,
        limit: this.pagesize
      }
      this.$http.get('v1/backend/operation/credit-order',{
        params
      }).then(res => {
        console.log(res)
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
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getPlayList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPlayList();
    }
  },
  mounted() {}
};
</script>

<style scoped>
#BankOrder-main .bd {
  padding-left: 20px;
}
#BankOrder-main .bd p {
  margin: 0;
}
#BankOrder-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
table {
  border-collapse: collapse;
}
</style>

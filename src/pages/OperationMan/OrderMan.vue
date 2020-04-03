<template>
  <div id="OrderMan-main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="format.pay_type" placeholder="支付方式" clearable size="medium">
        <el-option v-for="item in operas" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="format.order_status" filterable placeholder="状态" size="medium" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-date-picker
        v-model="format.time_range"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button type="primary">查找</el-button>
      <el-button type="primary" @click="dialogFormVisible=true">添加人工订单</el-button>
      <el-button type="primary">导出excel</el-button>
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
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <el-dialog title="添加人工订单" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="用户id" :label-width="formLabelWidth">
          <el-input v-model="form.user_id" autocomplete="off" placeholder="请输入用户id"></el-input>
        </el-form-item>
        <el-form-item label="付款方式" :label-width="formLabelWidth">
          <el-input v-model="form.pay_type" autocomplete="off" placeholder="人工充值"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" :label-width="formLabelWidth">
          <el-select v-model="form.goods_type" placeholder="请选择" style="width:100%;">
            <el-option label="金币" value="gold"></el-option>
            <el-option label="现金" value="money"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="form.money" autocomplete="off" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="确认金额" :label-width="formLabelWidth">
          <el-input v-model="form.check_money" autocomplete="off" placeholder="请确认输入金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
  name: "OrderMan",
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
      formLabelWidth: "120px",
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
      platforms: [
        { value: 1, label: "全部" },
        { value: 2, label: "审核中" },
        { value: 3, label: "已拒绝" },
        { value: 4, label: "已关闭" },
        { value: 5, label: "已完成" },
        { value: 6, label: "申请中" }
      ],
      operas: [
        { value: 1, label: "渠道1" },
        { value: 2, label: "渠道2" }
      ],
      options: [
        { value: "1", label: "启用" },
        { value: "2", label: "在线" },
        { value: "3", label: "离线" },
        { value: "4", label: "冻结" }
      ],
      format: {
        platform: "",
        pay_type: "",
        order_status: "",
        user_id: "",
        time_range: ""
      },
      tableStyle: [
        { label: "ID", prop: "order_id", width: "" },
        { label: "昵称", prop: "channel_name", width: "" },
        { label: "订单号", prop: "channel_name", width: "" },
        { label: "付款方式", prop: "fun_1", width: "" },
        { label: "支付结果", prop: "fun_2", width: "" },
        { label: "异常原因", prop: "fun_3", width: "" },
        { label: "平台", prop: "fun_4", width: "" },
        { label: "商品名称", prop: "fun_5", width: "" },
        { label: "金额", prop: "fun_6", width: "" },
        { label: "赠送金额", prop: "fun_7", width: "" },
        { label: "购买时间", prop: "fun_8", width: "" },
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
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogFormVisible: false,
      form: {
        user_id: "",
        pay_type: "1",
        goods_type: 100,
        money: "",
        check_money: ""
      }
    };
  },
  methods: {
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    handelClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogFormVisible = true;
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
#OrderMan-main .bd {
  padding-left: 20px;
}
#OrderMan-main .bd p {
  margin: 0;
}
#OrderMan-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
table {
  border-collapse: collapse;
}
</style>

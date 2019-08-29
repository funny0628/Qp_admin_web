<!--充值记录查询-->
<template>
  <div id="prepaidRecord-main">
    <input-area>
      <el-input v-model="aresData.user_id" placeholder="请输入用户ID" size="medium"></el-input>
      <el-input v-model="aresData.account_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-input v-model="aresData.order_num" placeholder="订单编号" size="medium"></el-input>
      <el-select v-model="aresData.status" clearable placeholder="订单状态" size="medium">
        <el-option
          v-for="item in order_status"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="aresData.order_num" placeholder="支付商户" size="medium"></el-input>
      <el-select v-model="aresData.type" clearable placeholder="所属类型" size="medium">
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <select-time :date="date" :select-time.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
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
            <template v-if="['user_gold', 'money_change', 'submit_time'].indexOf(scope.prop) >= 0">
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handeClick(btn)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'money_change', 'submit_time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div class="dialog">
      <el-dialog title="充值审核" :visible.sync="DialogVisible" width="30%" center>
        <el-form
          :model="formData"
          :label-position="labelPosition"
          style="display: flex; justify-content: space-between;flex-wrap:wrap;padding:0 50px;"
        >
          <el-form-item label="订单号：" :label-width="formLabelWidth" style="width:100%;">
            <span>{{formData.order_num}}</span>
          </el-form-item>
          <el-form-item label="充值金额：" :label-width="formLabelWidth" style="width:100%;">
            <span>{{formData.up_money}}</span>
          </el-form-item>
          <el-form-item label="支付商户：" :label-width="formLabelWidth" style="width:50%;">
            <span>{{formData.pay_mer}}</span>
          </el-form-item>
          <el-form-item label="所属类型：" :label-width="formLabelWidth" style="width:50%;">
            <span>{{formData.type}}</span>
          </el-form-item>
          <el-form-item label="用户ID：" :label-width="formLabelWidth" style="width:50%;">
            <span>{{formData.user_id}}</span>
          </el-form-item>
          <el-form-item label="用户名：" :label-width="formLabelWidth" style="width:50%;">
            <span>{{formData.user_name}}</span>
          </el-form-item>
          <el-form-item label="渠道ID：" :label-width="formLabelWidth" style="width:50%;">
            <span>{{formData.platform_id}}</span>
          </el-form-item>
          <el-form-item label="平台ID：" :label-width="formLabelWidth" style="width:50%;">
            <span>{{formData.platformId}}</span>
          </el-form-item>
          <el-form-item label="备注：" :label-width="formLabelWidth" style="width:100%;">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="formData.note"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="DialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="DialogVisible = false">锁 定</el-button>
          <el-button type="primary" @click="DialogVisible = false">审核通过</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import SelectTime from "../../plugin/components/SelectTime";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PageInfo from "../../plugin/script/common/PageInfo";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "prepaidRecord",
  extends: BaseIframe,
  components: {
    InputArea,
    PermissionButton,
    InfoTable,
    SelectTime,
    InfoTableItem
  },
  data() {
    return {
      //搜索框数据
      aresData: {
        user_id: "",
        account_id: "",
        order_num: "",
        status: "", //订单状态
        type: ""
      },
      date: [],
      order_status: [
        {
          value: "1",
          label: "充值成功"
        },
        {
          value: "2",
          label: "代付款"
        },
        {
          value: "3",
          label: "启用"
        }
      ],
      types: [
        { value: "1", label: "银行收款" },
        { value: "2", label: "第三方充值" },
        { value: "3", label: "手工入款" },
        { value: "4", label: "北京支行" }
      ],
      //表格数据
      tableStyle: [
        { label: "订单编号", prop: "order_num", width: "160" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "用户名", prop: "user_name", width: "" },
        { label: "渠道ID", prop: "account_id", width: "" },
        { label: "支付商户", prop: "pay_merchant", width: "" },
        { label: "所属类型", prop: "type", width: "" },
        { label: "订单金额", prop: "order_money", width: "" },
        { label: "金额变动", prop: "money_change", width: "160" },
        { label: "订单状态", prop: "order_status", width: "160" },
        { label: "提交时间／到账时间", prop: "submit_time", width: "160" },
        { label: "操作用户", prop: "operation_user", width: "160" },
        { label: "订单备注", prop: "order_note", width: "160" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          order_num: "09287673429137",
          user_id: "1001001",
          user_name: "测试玩家",
          account_id: "10001",
          pay_merchant: "招商银行",
          type: "银行收款",
          order_money: "100",
          money_change: ["充值前：10000", "充值后：10100"],
          order_status: "充值成功",
          submit_time: ["2019-01-01 12:00:00", " 2019-01-01 12:00:59"],
          operation_user: "",
          order_note: "",
          action: [{ label: "审核", type: "edit" }]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      //弹窗数据
      DialogVisible: false,
      formLabelWidth: "100px",
      labelPosition: "left",
      formData: {
        order_num: "cz201908212008220701",
        up_money: "1000.00",
        pay_mer: "支付宝",
        type: "线上支付",
        user_id: "1001002",
        user_name: "张三",
        platform_id: "10000",
        platformId: "110",
        note: ""
      }
    };
  },
  methods: {
    search() {},
    /***修改、删除 */
    handeClick(btn) {
      if (btn.type === "edit") {
        this.DialogVisible = true;
      }
    }
  }
};
</script>

<style scoped>
#prepaidRecord-main .bd p {
  margin: 0;
}
</style>

<template>
  <div id="OrderMan-main">
    <input-area>
      <span>渠道名</span>
      <el-select v-model="format.channel" placeholder="渠道名" clearable size="medium">
        <el-option
          v-for="item in channelOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>订单号</span>
      <el-input v-model="format.order_id" placeholder="请输入订单号查询" size="medium" clearable></el-input>
      <span>支付方式</span>
      <el-select v-model="format.payment_method" placeholder="支付方式" clearable size="medium">
        <el-option
          v-for="item in payOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>订单状态</span>
      <el-select v-model="format.status" filterable placeholder="状态" size="medium" clearable>
        <el-option
          v-for="item in orderStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-date-picker
        v-model="format.dateArr"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        :clearable="false"
      ></el-date-picker>
      <el-button
        type="primary"
        v-loading.fullscreen="loading"
        element-loading-text="资源加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        @click="searchData"
      >查找</el-button>
      <el-button v-has="'add_order'" type="primary" @click="openPeopleDialog">添加人工订单</el-button>
      <!-- <el-button type="primary">导出excel</el-button> -->
    </input-area>
    <div class="bd">
      <info-table
        v-has="'order_list'"
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hide-page="true"
      >
        <info-table-item :table-style="tableStyle" :hide-mul="true">
          <template slot-scope="scope">
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row.status  === 0">已下单</span>
              <span v-if="scope.row.status  === 1">已支付未处理</span>
              <span v-if="scope.row.status  === 2">已支付已处理完成</span>
              <span v-if="scope.row.status  === 3">已废弃</span>
            </template>
            <template v-if="'payment_channel'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  == 'alipay'">支付宝</span>
              <span v-if="scope.row[scope.prop]  == 'wx'">微信支付</span>
              <span v-if="scope.row[scope.prop]  == 'qq'">QQ支付</span>
              <span v-if="scope.row[scope.prop]  == 'union'">银联</span>
              <span v-if="scope.row[scope.prop]  == 'gm'">人工订单</span>
            </template>
            <template v-if="'create_time'.indexOf(scope.prop) >= 0">
              <span>{{scope.row.create_time | dateFormat}}</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <el-button
                v-has="'order_forbidden'"
                style="background-color:#01c8ae;color:#fff;"
                size="mini"
                @click="abandon(scope.row)"
              >废弃</el-button>
              <el-button
                v-has="'order_detail'"
                style="background-color:#01c8ae;color:#fff;"
                size="mini"
                @click="handleDetail(scope.row)"
              >操作详情</el-button>
            </template>
            <template
              v-if="['action','status','payment_channel','create_time'].indexOf(scope.prop) < 0"
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
    <!-- 添加人工订单 -->
    <el-dialog title="添加人工订单" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="用户id" :label-width="formLabelWidth">
          <el-input v-model="form.user_id" autocomplete="off" placeholder="请输入用户id"></el-input>
        </el-form-item>
        <el-form-item label="付款方式" :label-width="formLabelWidth">
          <el-input v-model="form.pay_type" disabled autocomplete="off" placeholder="人工充值"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品类型" :label-width="formLabelWidth">
          <el-select v-model="form.goods_type" placeholder="请选择" style="width:100%;">
            <el-option label="金币" value="gold"></el-option>
            <el-option label="现金" value="money"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model.number="form.money"
            autocomplete="off"
            placeholder="请输入金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认金额" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model.number="form.check_money"
            autocomplete="off"
            placeholder="请确认输入金额"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPeopleOrder">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 订单废弃弹框 -->
    <el-dialog title="废弃原因" :visible.sync="dialogAbandonVisible" width="30%">
      <el-form :model="abandonForm" style="margin-bottom:20px;">
        <el-input type="textarea" :rows="4" v-model="abandonForm.reason" autocomplete="off"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAbandonVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDrop">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 操作详情界面 -->
    <el-dialog title="操作记录" :visible.sync="dialogOptRecordVisible">
      <el-table :data="optDetailTableData" style="width: 100%" border>
        <el-table-column prop="type" label="类型" width="160" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type  === 1">人工订单添加</span>
            <span v-if="scope.row.type  === 0">废弃</span>
          </template>
        </el-table-column>
        <el-table-column prop="uid" label="操作人" width="180" align="center"></el-table-column>
        <el-table-column prop="create_time" label="操作时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="ip" label="操作ip" align="center"></el-table-column>
        <el-table-column prop="city" label="地区" align="center"></el-table-column>
        <el-table-column prop="des" label="备注" align="center"></el-table-column>
      </el-table>
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
  name: "order_manage",
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
      loading:false,
      pagesize: 10,
      currentPage: 1,
      total: 0,
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
      channelOpts: [
        { value: "ios", label: "ios" },
        { value: "android", label: "安卓" },
        { value: "window", label: "测试专用" }
      ],
      orderStatus: [
        { value: "-1", label: "所有" },
        { value: "0", label: "已下单" },
        { value: "1", label: "已支付未处理" },
        { value: "2", label: "已支付已处理完成" },
        { value: "3", label: "已废弃" }
      ],
      payOpts: [
        { value: "alipay", label: "支付宝" },
        { value: "wx", label: "微信支付" },
        { value: "qq", label: "QQ支付" },
        { value: "union", label: "银联" },
        { value: "gm", label: "人工订单" }
      ],
      format: {
        channel: "",
        payment_method: "",
        order_id: "",
        status: "",
        user_id: "",
        dateArr: [
          new Date(
            new Date(new Date().toLocaleDateString()).getTime() -
              3600 * 1000 * 24 * 7 +
              24 * 60 * 60 * 1000
          ),
          new Date(
            new Date(new Date().toLocaleDateString()).getTime() +
              24 * 60 * 60 * 1000 -
              1
          )
        ]
      },
      tableStyle: [
        { label: "用户ID", prop: "uid", width: "" },
        { label: "订单号", prop: "order_id", width: "" },
        { label: "付款方式", prop: "payment_channel", width: "" },
        { label: "支付结果", prop: "status", width: "" },
        { label: "异常原因", prop: "err_code", width: "" },
        { label: "渠道", prop: "channel", width: "" },
        { label: "商品名称", prop: "product_id", width: "" },
        { label: "金额", prop: "amount", width: "" },
        { label: "赠送金额", prop: "ex_coins", width: "" },
        { label: "购买时间", prop: "create_time", width: "" },
        { label: "操作", prop: "action", width: "170" }
      ],
      records: [],
      optDetailTableData: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogFormVisible: false,
      dialogAbandonVisible: false,
      dialogOptRecordVisible: false,
      form: {
        user_id: "",
        pay_type: "人工充值",
        goods_type: 100,
        money: "",
        check_money: ""
      },
      abandonForm: {
        order_id: "",
        reason: ""
      }
    };
  },
  methods: {
    searchData() {
      this.getOrderList();
    },
    getOrderList() {
      this.loading = true
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        channel: this.format.channel,
        payment_method: this.format.payment_method,
        order_id: this.format.order_id,
        status: this.format.status ? Number(this.format.status) : -1,
        user_id: Number(this.format.user_id),
        start_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[0])).getTime() / 1000)
          : 0,
        end_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[1])).getTime() / 1000)
          : 0
      };
      console.log(params);
      this.$http
        .get("v1/backend/operation/orders", {
          params
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.loading = false
            this.records = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    openPeopleDialog() {
      this.dialogFormVisible = true;
      this.form = {
        user_id: "",
        pay_type: "人工充值",
        goods_type: 100,
        money: "",
        check_money: ""
      };
    },
    addPeopleOrder() {
      let data = {
        user_id: Number(this.form.user_id),
        amount: Number(this.form.money),
        confirmed_amount: Number(this.form.check_money)
      };
      this.$http.post("v1/backend/operation/orders", data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.dialogFormVisible = false;
          this.getOrderList();
        }
      });
    },
    abandon(row) {
      console.log(row);
      this.dialogAbandonVisible = true;
      this.abandonForm.order_id = row.order_id;
    },
    confirmDrop() {
      let data = {
        order_id: this.abandonForm.order_id,
        desc: this.abandonForm.reason
      };
      this.$http.post("v1/backend/operation/order/detail", data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.dialogAbandonVisible = false;
          this.abandonForm = {
            order_id: "",
            reason: ""
          };
          this.getOrderList();
          this.messages({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    handleDetail(row) {
      console.log(row);
      this.dialogOptRecordVisible = true;
      this.$http
        .get("v1/backend/operation/order/detail", {
          params: {
            order_id: row.order_id
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.optDetailTableData = res.data.data;
          }
        });
    },
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },

    handleSizeChange(val) {
      this.pagesize = val;
      this.getOrderList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderList();
    }
  },
  mounted() {
    this.getOrderList();
  }
};
</script>

<style scoped>
#OrderMan-main .bd {
  padding-left: 20px;
}
#OrderMan-main .bd p {
  margin: 0;
}
#OrderMan-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
#OrderMan-main >>> .el-range-editor .el-range-input {
  width: 150px;
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

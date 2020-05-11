<template>
  <div id="WithdrawRec-main">
    <input-area>
      <el-button
        type="primary"
        size="medium"
        style="background-color:#ffc75a;border:none;"
        @click="closeMusic"
      >关闭音乐提醒</el-button>
      <div style="display:none;">
        <audio controls loop id="play">
          <source src="../../../static/music/hint.mp3" type="audio/mpeg" />
        </audio>
      </div>
      <el-select v-model="format.withdraw_status" placeholder="请选择" clearable size="medium">
        <el-option
          v-for="item in orderStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.game_id" placeholder="请输入游戏id" size="medium" clearable></el-input>
      <el-date-picker
        v-model="format.dateArr"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button type="primary" size="medium" @click="searchData">搜索</el-button>
      <!-- <el-button type="primary" size="medium">导出excel</el-button> -->
    </input-area>
    <div class="bd">
      <info-table
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hide-page="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'WithdrawChannel'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row.WithdrawChannel==0">支付宝</span>
              <span v-if="scope.row.WithdrawChannel==1">银行卡</span>
              <span v-if="scope.row.WithdrawChannel==2">微信</span>
            </template>
            <template v-if="'Status'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row.Status==0">未处理</span>
              <span v-if="scope.row.Status==1">已处理</span>
              <span v-if="scope.row.Status==2">已驳回</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <span v-if="scope.row.Status == 0">
                <el-button size="mini" type="primary" @click="handlePass(scope.row)">通过</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  style="background-color:#ff5732;"
                  @click="handleReject(scope.row)"
                >驳回</el-button>
              </span>
              <el-button size="mini" type="primary" @click="handleDetail(scope.row)">详情</el-button>
            </template>
            <template
              v-if="['action',,'WithdrawChannel','Status'].indexOf(scope.prop) < 0"
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
    <el-dialog title="提现账号信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="支付宝账号" :label-width="formLabelWidth">
          <el-input disabled v-model="form.alipay_account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 订单审核 -->
    <el-dialog title="订单审核" :visible.sync="dialogVisible">
      <el-form :model="form2">
        <el-form-item label="订单id" :label-width="formLabelWidth">
          <el-input disabled v-model="form2.order_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form2.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkOrderStatus">确 定</el-button>
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
  name: "withdraw_records",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  props: {
    newOrder: {
      type: Number,
      default: 0
    }
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
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "120px",
      orderStatus: [
        { value: "0", label: "未处理" },
        { value: "1", label: "已处理" },
        { value: "2", label: "已拒绝" }
      ],
      format: {
        withdraw_status: "",
        game_id: "",
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
        { label: "编号", prop: "WithdrawId", width: "" },
        { label: "用户id", prop: "uid", width: "" },
        { label: "提现金额", prop: "Amount", width: "" },
        { label: "余额", prop: "Balance", width: "" },
        { label: "需转金额", prop: "transfer_amount", width: "" },
        { label: "手续费", prop: "fee", width: "" },
        { label: "兑换方式", prop: "WithdrawChannel", width: "" },
        { label: "申请时间", prop: "CreateAt", width: "180" },
        { label: "状态", prop: "Status", width: "" },
        { label: "风控提示", prop: "warn", width: "" },
        { label: "操作", prop: "action", width: "300" }
      ],
      records: [],
      form: {
        alipay_account: "",
        name: ""
      },
      form2: {
        pass: "",
        order_id: "",
        remark: ""
      },
    };
  },
  methods: {
    getWithdrawRec() {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        status: this.withdraw_status ? Number(this.format.withdraw_status) : -1,
        user_id: Number(this.format.game_id),
        start_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[0])).getTime() / 1000)
          : 0,
        end_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[1])).getTime() / 1000)
          : 0
      };
      this.$http
        .get("v1/backend/operation/withdraws", {
          params
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.records = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    /**搜索*/
    searchData() {
      this.getWithdrawRec();
    },
    handleDetail(row) {
      console.log(row);
      this.dialogFormVisible = true;
      let WithdrawInfo = JSON.parse(row.WithdrawInfo);
      this.form.alipay_account = WithdrawInfo.account;
      this.form.name = WithdrawInfo.Name;
    },
    handlePass(row) {
      console.log(row);
      this.dialogVisible = true;
      this.form2.pass = "通过";
      this.form2.order_id = row.WithdrawId;
      this.form2.remark = ""
    },
    handleReject(row) {
      console.log(row);
      this.dialogVisible = true;
      this.form2.order_id = row.WithdrawId;
      this.form2.remark = ""
    },
    checkOrderStatus() {
      let data = {
        order_id: Number(this.form2.order_id),
        action: this.form2.pass ? 1 : 2,
        remark: this.form2.remark
      };
      this.$http.post("v1/backend/operation/withdraws", data).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.dialogVisible = false;
          this.getWithdrawRec();
          this.closeMusic()
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getWithdrawRec();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getWithdrawRec();
    },
    // newMsgSearch() {
    //   this.$http.get("v1/backend/operation/withdraw/notice").then(res => {
    //     console.log(res)
    //     if (res.data.code == 200) {
    //       if (res.data.data.unread_total) {
    //         var audio = document.getElementById("play");
    //         audio.play(); //播放提示音
    //       }
    //     }
    //   });
    // },
    closeMusic() {
      var audio = document.getElementById("play");
      audio.pause(); //关闭提示音
      this.$http.post('v1/backend/operation/withdraw/notice').then(res => {
        console.log(res)
        if(res.data.code == 200) {
          
        }
      })
    },
    playMusic() {
      if (this.newOrder !== 0) {
        var audio = document.getElementById("play");
        audio.play(); //播放提示音
      }
    }
  },
  mounted() {
    this.getWithdrawRec();
    this.playMusic()
    // this.newMsgSearch();
    // this.intervalId = setInterval(() => {
    //   this.newMsgSearch();
    // }, 60000);
    // console.log(this.intervalId)
  }
  // beforeDestroy() {
  //   clearInterval(this.intervalId);
  // }
};
</script>

<style scoped>
#WithdrawRec-main .bd {
  padding-left: 20px;
}
#WithdrawRec-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#WithdrawRec-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#WithdrawRec-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
#WithdrawRec-main >>> .el-range-editor .el-range-input {
  width: 150px;
}
table {
  border-collapse: collapse;
}
</style>

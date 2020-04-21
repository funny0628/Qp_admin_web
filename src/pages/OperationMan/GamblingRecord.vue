<template>
  <div id="GamblingRecord-main">
    <input-area>
      <span>场次</span>
      <el-select v-model="format.session" placeholder="请选择" clearable size="medium">
        <el-option
          v-for="item in allGameType"
          :key="item.game_id"
          :label="item.game_name"
          :value="item.game_id"
        ></el-option>
      </el-select>
      <span>账号ID</span>
      <el-input v-model="format.id" placeholder="请输入账号id" style="width:20%;"></el-input>
      <span>时间范围</span>
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
      <el-button type="primary" @click="searchData">查找</el-button>
      <el-button type="primary">导出excel</el-button>
    </input-area>
    <div class="bd">
      <info-table
        v-has="'play_lists'"
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hide-page="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'begin_time'.indexOf(scope.prop) >= 0">
              <span>{{scope.row.begin_time | dateFormat}}</span>
            </template>
            <template v-if="'end_time'.indexOf(scope.prop) >= 0">
              <span>{{scope.row.end_time | dateFormat}}</span>
            </template>
            <template v-if="'all_user_count'.indexOf(scope.prop) >= 0">
              <span>{{scope.row.all_user_count + "/" + scope.row.true_user_count}}</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <el-button v-has="'play_detail'" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            </template>
            <template
              v-if="['action','all_user_count','begin_time','end_time'].indexOf(scope.prop) < 0"
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
  name: "paly_records",
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
      allGameType: [],
      format: {
        session: "",
        id: "",
        dateArr: [
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
          new Date()
        ]
      },
      tableStyle: [
        { label: "牌局号", prop: "table_gid", width: "" },
        { label: "房间类型", prop: "table_name", width: "" },
        { label: "游戏时间(开始)", prop: "begin_time", width: "" },
        { label: "游戏时间(结束)", prop: "end_time", width: "" },
        { label: "参与人数/机器人", prop: "all_user_count", width: "" },
        { label: "玩家总输赢", prop: "total_win", width: "" },
        { label: "台费", prop: "total_fee", width: "" },
        { label: "玩家id", prop: "true_user", width: "" },
        { label: "操作", prop: "action", width: "150" }
      ],
      records: [],
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
    getPlayList() {
      let params = {
        page: this.currentPage,
        limit: this.pagesize
      };
      this.$http
        .get("v1/backend/operation/play/records", {
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
    search() {},
    searchData() {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        table_type: Number(this.format.session),
        user_id: Number(this.format.id),
        start_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[0])).getTime() / 1000)
          : 0,
        end_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[1])).getTime() / 1000)
          : 0
      };
      this.$http
        .get("v1/backend/operation/play/records", {
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
    getAllGameType() {
      this.$http.get("v1/backend/operation/game-type").then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.allGameType = res.data.data;
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getPlayList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPlayList();
    },
  },
  mounted() {
    this.getPlayList();
    this.getAllGameType();
  }
};
</script>

<style scoped>
#GamblingRecord-main .bd {
  padding-left: 20px;
}
#GamblingRecord-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#GamblingRecord-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#GamblingRecord-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
table {
  border-collapse: collapse;
}
</style>

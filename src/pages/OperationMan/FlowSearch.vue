<template>
  <div id="FlowSearch-main">
    <input-area>
      <el-select v-model="format.change_reason" placeholder="变化原因选择" clearable size="medium">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="(val,num) in changeReason" :key="num" :label="val" :value="num">{{val}}</el-option>
      </el-select>
      <el-select v-model="format.room" placeholder="房间选择" clearable size="medium">
        <el-option
          v-for="item in allGameType"
          :key="item.game_id"
          :label="item.game_name"
          :value="item.game_id"
        ></el-option>
      </el-select>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <span>日期</span>
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
      <el-button type="primary" size="medium" @click="searchData">搜索</el-button>
      <!-- <el-button type="primary" size="medium">导出excel</el-button> -->
    </input-area>
    <div class="bd">
      <info-table
        v-has="'flow_list'"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hide-page="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'time'.indexOf(scope.prop) >= 0">
              <span>{{scope.row.time | dateFormat}}</span>
            </template>
            <template v-if="'value'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row.op == 1">{{'+' + scope.row.value}}</span>
              <span v-if="scope.row.op == 2">{{'-' + scope.row.value}}</span>
            </template>
            <template v-if="['time','value'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
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
    <!-- 渠道添加 -->
    <el-dialog title="渠道添加" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="渠道名" :label-width="formLabelWidth">
          <el-input v-model="form.channel_name" autocomplete="off" placeholder="请输入渠道名"></el-input>
        </el-form-item>
        <el-form-item label="渠道编号" :label-width="formLabelWidth">
          <el-input v-model="form.channel_id" autocomplete="off" placeholder="请输入渠道编号"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth">
          <el-select v-model="form.belong_company" placeholder="请选择" style="width:100%;">
            <el-option label="金币" value="gold"></el-option>
            <el-option label="现金" value="money"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加公司 -->
    <el-dialog title="添加公司" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="公司名" :label-width="formLabelWidth">
          <el-input v-model="form.company_name" autocomplete="off" placeholder="请输入公司名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
  name: "cash_flows",
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
      changeReason: {}, //变化原因
      allGameType: [], //所有游戏
      format: {
        change_reason: "",
        room: "",
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
        { label: "UID", prop: "uid", width: "" },
        { label: "变化后数量", prop: "curr", width: "" },
        { label: "变化数量", prop: "value", width: "" },
        { label: "变化原因", prop: "reason", width: "" },
        { label: "房间类型", prop: "game_type", width: "" },
        { label: "渠道号", prop: "channel", width: "" },
        { label: "操作时间", prop: "time", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogFormVisible: false,
      dialogVisible: false,
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
    getFlowWaterList() {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        reason: Number(this.format.change_reason),
        game_type: Number(this.format.room),
        user_id: Number(this.format.user_id),
        start_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[0])).getTime() / 1000)
          : 0,
        end_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[1])).getTime() / 1000)
          : 0
      };
      this.$http
        .get("v1/backend/operation/flows", {
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
      this.getFlowWaterList();
    },
    getModReason() {
      this.$http.get("v1/backend/operation/gold-modify-reason").then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.changeReason = res.data.data;
        }
      });
    },
    //获取所有游戏类型
    getAllGameType() {
      this.$http.get("v1/backend/operation/game-type").then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.allGameType = res.data.data;
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getFlowWaterList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFlowWaterList();
    }
  },
  mounted() {
    this.getFlowWaterList();
    this.getModReason();
    this.getAllGameType();
  }
};
</script>

<style scoped>
#FlowSearch-main .bd {
  padding-left: 20px;
}
#FlowSearch-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#FlowSearch-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#FlowSearch-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
table {
  border-collapse: collapse;
}
</style>

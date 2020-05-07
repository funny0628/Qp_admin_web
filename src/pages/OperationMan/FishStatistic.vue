<template>
  <div id="FishStatistic-main">
    <input-area>
      <el-input v-model="format.play_id" placeholder="请输入玩家id" size="medium" clearable></el-input>
      <!-- <el-input v-model="format.play_counter" placeholder="请输入玩家账号" size="medium" clearable></el-input> -->
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
      <el-button type="primary" size="medium" @click="searchData">查询</el-button>
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
            <template v-if="'payment'.indexOf(scope.prop) >= 0">
              <span>{{Number(Number(scope.row.fish_value) - Number(scope.row.bullet_value)).toFixed(2)}}</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <el-button size="mini" type="primary" @click="handleRecord(scope.row)">记录</el-button>
            </template>
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
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
    <el-dialog title="捕鱼记录" :visible.sync="dialogFormVisible">
      <el-table :data="recordTableData" style="width: 100%" border>
        <el-table-column prop="create_date" label="时间" width="180" align="center"></el-table-column>
        <el-table-column prop="bullet_value" label="子弹总价值" width="180" align="center"></el-table-column>
        <el-table-column prop="fish_value" label="鱼价值" align="center"></el-table-column>
        <el-table-column label="收支" align="center">
          <template slot-scope="scope">
            <span>{{Number(Number(scope.row.fish_value) - Number(scope.row.bullet_value)).toFixed(2)}}</span>
          </template>
        </el-table-column>
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
  name: "fish_statistic",
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
      dialogFormVisible: false,
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
      format: {
        play_id: "",
        // play_counter: "",
        dateArr: [
          // new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
          new Date(
            new Date(new Date().toLocaleDateString()).getTime() -
              3600 * 1000 * 24 * 7 +
              24 * 60 * 60 * 1000
          ),
          // new Date()
          new Date(
            new Date(new Date().toLocaleDateString()).getTime() +
              24 * 60 * 60 * 1000 -
              1
          )
        ]
      },
      tableStyle: [
        { label: "玩家id", prop: "uid", width: "" },
        { label: "子弹发送总量", prop: "total_bullet", width: "" },
        { label: "子弹价值", prop: "bullet_value", width: "" },
        { label: "鱼总价值", prop: "fish_value", width: "" },
        { label: "收支", prop: "payment", width: "" },
        { label: "操作", prop: "action", width: "150" }
      ],
      records: [],
      recordTableData: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5)
    };
  },
  methods: {
    getFishList() {
      let params = {
        user_id: Number(this.format.play_id),
        start_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[0])).getTime() / 1000)
          : 0,
        end_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[1])).getTime() / 1000)
          : 0
      };
      this.$http
        .get("v1/backend/operation/fishes", {
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
      this.getFishList();
    },
    handleRecord(row) {
      console.log(row);
      this.dialogFormVisible = true;
      let params = {
        user_id: Number(row.uid),
        start_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[0])).getTime() / 1000)
          : 0,
        end_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[1])).getTime() / 1000)
          : 0
      };
      this.$http
        .get("v1/backend/operation/fish-data", {
          params
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.recordTableData = res.data.data;
          }
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getFishList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFishList();
    }
  },
  mounted() {
    this.getFishList();
  }
};
</script>

<style scoped>
#FishStatistic-main .bd {
  padding-left: 20px;
}
#FishStatistic-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#FishStatistic-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#FishStatistic-main >>> .el-range-editor .el-range-input {
  width: 150px;
}
#FishStatistic-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
table {
  border-collapse: collapse;
}
</style>

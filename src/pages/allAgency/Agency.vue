<template>
  <div id="Agency">
    <!-- title -->
    <div class="title">
      用户ID
      <el-input style="margin-top:10px;width:200px" v-model="userID"></el-input>
      提取时间
      <el-date-picker
        v-model="start_time"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd"
        value-format="timestamp"
      >
      </el-date-picker>
      -
      <el-date-picker
        v-model="end_time"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd"
        value-format="timestamp"
      >
      </el-date-picker>
      <el-button type="primary" @click="search">查找</el-button>
    </div>
    <!-- table -->
    <div class="table">
      <el-table
        border
        highlight-current-row
        :default-sort="{ prop: 'ID', order: orderlist[0] }"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column sortable prop="uid" label="玩家ID" align="center">
        </el-table-column>

        <el-table-column
          prop="register_time"
          label="注册时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="channel"
          label="所属渠道"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="sub_num"
          label="直属下级人数"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="team_person"
          label="团队人数"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="team_recharge"
          label="团队充值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="team_water"
          label="团队流水"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="total_income"
          label="累计佣金收益"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="cash_income"
          label="累计已提佣金"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="wait_income"
          label="待提佣金"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="cash_time"
          label="最近提取时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="change"
          label=""
          align="center"
          show-overflow-tooltip
          width="200px"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetail(scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="nextLevel(scope.$index, scope.row)"
              >查看下级</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="total > 5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- dialog -->
    <div class="dialog">
      <el-dialog
        :title="title"
        :visible.sync="visible"
        :destroy-on-close="true"
      >
        用户ID
        <el-input
          style="margin-top:10px;width:100px"
          v-model="DuserID"
        ></el-input>
        {{ title === "详情" ? "时间" : "邀请时间" }}
        <!-- 时间 -->
        <el-date-picker
          v-model="Dstart_time"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="timestamp"
        >
        </el-date-picker>
        -
        <el-date-picker
          v-model="Dend_time"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="timestamp"
        >
        </el-date-picker>
        <el-button type="primary" @click="searchDetail(title)">查找</el-button>

        <el-table
          border
          highlight-current-row
          :default-sort="{ prop: 'ID', order: orderlist[0] }"
          ref="multipleTable"
          :data="DtableData"
          tooltip-effect="dark"
          style="width: 100%; margin-top:20px"
        >
          <p v-if="title === '详情'">
            <el-table-column
              sortable
              prop="uid"
              label="玩家ID"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="create_at"
              label="时间"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="water"
              label="个人流水"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="subwater"
              label="直属下级流水"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="rebate"
              label="佣金贡献"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </p>

          <p v-if="title === '下级'">
            <el-table-column
              sortable
              prop="uid"
              label="玩家ID"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="invite_time"
              label="邀请时间"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="subnum"
              label="直属下级人数"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="water"
              label="个人总流水"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="subwater"
              label="直属下级总流水"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="rebate"
              label="累计贡献佣金"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
          </p>
        </el-table>
        <el-pagination
          v-if="title === '详情' && Dtotal > 5"
          @size-change="DhandleSizeChange"
          @current-change="DhandleCurrentChange"
          :current-page="DcurrentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Dtotal"
        >
        </el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DeepData from "../../assets/js/formate.js";
export default {
  name:'agent',
  data() {
    return {
      orderlist: ["ascending", "descending"],
      //代理数据
      userID: "",
      start_time: "",
      end_time: "",
      currentPage: 1,
      limit: 10,
      total: "",
      tableData: [],
      //代理详情数据
      DuserID: "",
      Dstart_time: "",
      Dend_time: "",
      DcurrentPage: 1,
      Dlimit: 10,
      Dtotal: "",
      DtableData: [],
      //下级
      LcurrentPage: 1,
      Llimit: 10,
      title: "详情",
      visible: false
    };
  },
  created() {
    this.initdata({ page: this.currentPage, limit: this.limit });
  },
  methods: {
    //查找
    search() {
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        uid: parseInt(this.userID) || 0,
        start_time: this.start_time / 1000 || 0,
        end_time: this.end_time / 1000 || 0
      });
      this.userID = "";
      this.start_time = "";
      this.end_time = "";
    },

    //详情 / 下级 搜索
    searchDetail(type) {
      if (type === "详情") {
        this.initDetail({
          page: this.DcurrentPage,
          limit: this.Dlimit,
          pid: this.Pid,
          start_data: this.Dstart_data / 1000 || 0,
          end_data: this.Dend_data / 1000 || 0,
          uid: parseInt(this.DuserID) || 0
        });
      } else if (type === "下级") {
        this.initLevel({
          uid: parseInt(this.DuserID) || 0,
          pid: this.Pid,
          start_data: this.Dstart_data / 1000 || 0,
          end_data: this.Dend_data / 1000 || 0
        });
      }
      this.DuserID = "";
      this.Dstart_time = "";
      this.Dend_time = "";
    },

    //表格详情
    async handleDetail(row) {
      console.log(row);
      this.Pid = row.uid;
      this.visible = true;
      this.title = "详情";
      this.initDetail({
        page: this.DcurrentPage,
        limit: this.Dlimit,
        pid: row.uid
      });
    },

    //表格查看下级
    nextLevel(index, row) {
      this.Pid = row.uid;
      this.visible = true;
      this.title = "下级";
      this.initLevel({
        page: this.LcurrentPage,
        limit: this.Llimit,
        pid: row.uid
      });
    },

    //页容量变化
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;
      this.initdata({ page: this.currentPage, limit: this.limit });
    },

    //页码变化
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      this.initdata({ page: this.currentPage, limit: this.limit });
    },

    //详情页容量变化
    DhandleSizeChange(num) {
      this.Dlimit = num;
      this.DcurrentPage = 1;
      this.initDetail({
        page: this.DcurrentPage,
        limit: this.Dlimit,
        pid: this.Pid
      });
    },

    //详情页码变化
    DhandleCurrentChange(pageNum) {
      this.DcurrentPage = pageNum;
      this.initDetail({
        page: this.DcurrentPage,
        limit: this.Dlimit,
        pid: this.Pid
      });
    },

    
    formateData(res) {
      res.forEach(item => {
        // register_time / cash_time
        item.register_time = this.timestampToTime(item.register_time);
        item.cash_time = this.timestampToTime(item.cash_time);
        item.create_at = this.timestampToTime(item.create_at);
        item.invite_time = this.timestampToTime(item.invite_time);
      });
      return res;
    },

    //十位时间戳转格式日期
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },

    //下级数据获取
    async initLevel(params) {
      let { data } = await this.$http.allAgency.GetAgencyLevel(params);
      let fres = DeepData(data.data);
      this.DtableData = this.formateData(fres);
      this.Dtotal = data.total;
    //   console.log(data);
    },

    //详情数据获取
    async initDetail(params) {
      let { data } = await this.$http.allAgency.GetEarnings(params);
      let fres = DeepData(data.data);
      this.DtableData = this.formateData(fres);
      this.Dtotal = data.total;
    //   console.log(data);
    },

    //所有玩家数据获取
    async initdata(params) {
      let { data } = await this.$http.allAgency.GetAgency(params);
      let fres = DeepData(data.data);
      this.tableData = this.formateData(fres);
      this.total = data.total;
    //   console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
#Agency {
  .table {
    margin-top: 20px;
  }
}
</style>

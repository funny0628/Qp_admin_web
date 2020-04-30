<template>
  <div id="BankOrder-main">
    <!-- <input-area> -->
    <div class="title">
      <el-input
      style="width:200px"
        v-model="format.user_id"
        placeholder="请输入用户id"
        size="medium"
        clearable
      ></el-input>
      <el-select
        v-model="format.order_status"
        placeholder="请选择"
        clearable
        size="medium"
      >
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
      v-model="start"
      type="date"
      placeholder="选择日期"
      format="yyyy-MM-dd hh:mm:ss"
      value-format="timestamp">
    </el-date-picker>
     <el-date-picker
      v-model="end"
      type="date"
      placeholder="选择日期"
      format="yyyy-MM-dd hh:mm:ss"
      value-format="timestamp">
    </el-date-picker>
      <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <!-- <el-button type="primary" @click="dialogFormVisible=true">导出excel</el-button> -->
    <!-- </input-area> -->
    <!-- > -->
    <div class="table">
      <el-table
        :data="tableData"
        highlight-current-row
        tooltip-effect="dark"
        border
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          v-for="(item, index) in titleData"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.label === 'ID' ? true : false"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          show-overflow-tooltip
          width="250px"
        >
          <template slot-scope="scope">
            <el-button v-has="'modify_game_notice'" size="mini" type="primary" v-if="scope.row.o_status === '审核中'"
            @click="CheckOrder(1,scope.row)"
              >通过并发货</el-button
            >
            <el-button v-has="'delete_game_notice'" size="mini" type="danger" v-if="scope.row.o_status === '审核中'"
            @click="CheckOrder(2,scope.row)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="total > 5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InputArea from "../../plugin/components/InputArea";


export default {
  name: "bank_card",
  extends: BaseIframe,
  components: {
    InputArea
  },
  data() {
    return {
      limit: 10,
      currentPage: 1,
      total: 0,
      start:'',
      end:'',
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
        { value: -1, label: "全部" },
        { value: 0, label: "审核中" },
        { value: 1, label: "已拒绝" },
        { value: 3, label: "已完成" },
      ],
      format: {
        user_id: "",
        order_status: ""
      },
      titleData: [
        { label: "ID", prop: "id", width: "" },
        { label: "订单号", prop: "order_id", width: "" },
        { label: "用户id", prop: "uid", width: "" },
        { label: "转账方式", prop: "way", width: "" },
        { label: "姓名", prop: "bank_user_name", width: "" },
        { label: "账号", prop: "bank_account", width: "" },
        { label: "金额", prop: "money", width: "" },
        { label: "赠送金额", prop: "give_money", width: "" },
        { label: "状态", prop: "o_status", width: "" },
        { label: "内部订单号", prop: "inner_order_id", width: "" },
        { label: "备注", prop: "o_desc", width: "" },
        { label: "操作者", prop: "op_name", width: "" },
        { label: "操作时间", prop: "updated_at", width: "160" }
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
      },
      tableData: [],
      o_status: {
        0: "审核中",
        1: "已拒绝",
        3: "已完成"
      }
    };
  },
  async created() {
    let start = new Date().getTime()
    let end = (new Date().getTime()) - (60 * 60 * 24 * 1000 * 7);
    this.start = end
    this.end = start
    
    this.initData({
        page: this.currentPage,
        limit: this.limit
      });
  },
  methods: {
   
    /**搜索*/
    search() {
      console.log(this.format.user_id,this.format.order_status,this.start,this.end,);
      
      this.initData({
        page: this.currentPage,
        limit: this.limit,
        uid:+this.format.user_id || 0,
        status:this.format.order_status || -1,
        start_time:Math.ceil(this.start / 1000) || 0,
        end_time:Math.ceil(this.end / 1000) || 0,
      })
      
    },

    //页容量变化
    handleSizeChange(num) {
      this.currentPage = 1;
      this.limit = num;
      this.initData({
        page: this.currentPage,
        limit: this.limit
      });
    },

    //页码变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.initData({
        page: this.currentPage,
        limit: this.limit
      });
    },

    async CheckOrder(type,row){
      console.log(type,row.order_id);
      
      let {data} = await this.$http.allAgency.PostOrdercheck({
        order_id:row.order_id,
        action:type
      })
      console.log(data);
      if(data.code === 200){
        this.initData()
      }
      
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



    formatData(res) {
      res.forEach(item => {
        item.way = item.way === 0 ? "银行卡" : "支付宝";
        item.updated_at = this.timestampToTime(item.updated_at)
        Object.keys(this.o_status).forEach(it => {
          if (item.o_status === +it) {
            item.o_status = this.o_status[it];
          }
        });
      });
      return res;
    },

    async initData(params) {
      let { data } = await this.$http.allAgency.GetBankOrder(params);
      console.log(data);
      this.tableData = this.formatData(data.data);
      this.total = data.total;
    }
  },
  mounted() {}
};
</script>

<style scoped>
#BankOrder-main {
  padding: 20px;
}
#BankOrder-main .table {
  margin-top: 20px;
}
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

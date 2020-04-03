<template>
  <div id="SystemJournal-main">
    <input-area>
      <el-input v-model="format.man_id" placeholder="请输入管理ID或者名称" size="medium" clearable></el-input>
      <el-select v-model="format.req_way" placeholder="请选择请求方式" clearable size="medium">
        <el-option
          v-for="item in requestWay"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.router_name" placeholder="请输入路由名称" size="medium" clearable></el-input>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button type="primary" size="medium" @click="search">搜索</el-button>
    </input-area>
    <div class="bd">
      <!-- <info-table
        :search="search"
        :table-style="tableStyle"
        :records="tabeData"
        :page-info="pageInfo"
        @pageNumFn="pageNumFn"
        @pageSizeFn="pageSizeFn"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template>{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="user_id" label="操作者" align="center"></el-table-column>
        <el-table-column prop="req_method" label="请求方法" align="center"></el-table-column>
        <el-table-column prop="req_path" label="请求路由" align="center"></el-table-column>
        <el-table-column prop="req_params" label="请求参数" align="center"></el-table-column>
        <el-table-column prop="req_ip" label="请求ip" align="center"></el-table-column>
        <el-table-column prop="create_time" label="请求时间" align="center"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import UserHandler from "../../script/handlers/UserHandler";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";
export default {
  name: "SystemJournal",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    InfoTable
  },
  data() {
    return {
      pagesize: 5,
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
      requestWay: [
        { value: 1, label: "GET" },
        { value: 2, label: "POST" },
        { value: 3, label: "DELETE" },
        { value: 4, label: "PUT" }
      ],
      format: {
        man_id: "",
        req_way: "",
        router_name: ""
      },
      tableStyle: [
        { label: "ID", prop: "id", width: "" },
        { label: "操作者", prop: "user_id", width: "" },
        { label: "请求方法", prop: "req_method", width: "" },
        { label: "请求路由", prop: "req_path", width: "" },
        { label: "请求参数", prop: "req_params", width: "" },
        { label: "请求IP", prop: "req_ip", width: "" },
        { label: "请求时间", prop: "create_time", width: "" }
      ],
      tableData: [],
      records: [],
      pageInfo: new PageInfo(1, [5, 10, 15, 20],1),
      dialogAddVisible: false
    };
  },
  methods: {
    async getSystemOperationList() {
      const res = await this.$http.get("auth/operation-logs");
      console.log(res);
      if (res.data.code === 200) {
        this.tabelData = res.data.data;
        this.total = res.data.data.total;
      }
      console.log(res);
    },
    search() {},
    // pageNumFn(val) {
    //   console.log(val, this.pageSize, this.pageNum);
    //   this.pageNum = val;
    // },
    // pageSizeFn(val) {
    //   console.log(val);
    //   this.pageSize = val;
    // },
    handleSizeChange(val) {
      this.pagesize = val
      this.getSystemOperationList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSystemOperationList()
    },
  },
  mounted() {
    this.getSystemOperationList();
  }
};
</script>

<style scoped>
#SystemJournal-main .bd {
  padding-left: 20px;
  padding-right: 20px;
}
#SystemJournal-main .bd p {
  margin: 0;
}
.el-pagination {
  margin-top: 20px;
}
#SystemJournal-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}

</style>

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
        v-model="format.dateArr"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        :clearable="false"
      ></el-date-picker>
      <el-button type="primary" size="medium" @click="search">搜索</el-button>
    </input-area>
    <div class="bd">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="user_id" label="用户ID" align="center"></el-table-column>
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
import InputArea from "../../plugin/components/InputArea";
export default {
  name: "SystemJournal",
  components: {
    InputArea
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
      requestWay: [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" },
        { value: "DELETE", label: "DELETE" },
        { value: "PUT", label: "PUT" }
      ],
      format: {
        man_id: "",
        req_way: "",
        router_name: "",
        dateArr: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),new Date()]
      },
      tableData: []
    };
  },
  methods: {
    async getSystemOperationList() {
      const res = await this.$http.get("v1/backend/auth/operation-logs", {
        params: {
          user_id: Number(this.format.man_id),
          req_method: this.format.req_way,
          req_route: this.format.router_name,
          start_time: this.format.dateArr ? parseInt(new Date(Number(this.format.dateArr[0])).getTime()/1000) : 0,
          end_time: this.format.dateArr ? parseInt(new Date(Number(this.format.dateArr[1])).getTime()/1000) : 0,
          page: this.currentPage,
          limit: this.pagesize
        }
      });
      console.log(res);
      if (res.data.code === 200) {
        this.tableData = res.data.data;
        this.total = res.data.data.total;
      }
      console.log(res);
    },
    search() {
      this.getSystemOperationList();
    },
    // pageNumFn(val) {
    //   console.log(val, this.pageSize, this.pageNum);
    //   this.pageNum = val;
    // },
    // pageSizeFn(val) {
    //   console.log(val);
    //   this.pageSize = val;
    // },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getSystemOperationList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSystemOperationList();
    }
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
  width: 6%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
</style>

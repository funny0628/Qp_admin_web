<template>
  <div id="ChannelList-main">
    <input-area>
      <div style="margin-bottom:10px;">
        <el-button v-has="'add_channel'" type="primary" size="medium" @click="openAddDialog">添加</el-button>
        <el-button type="primary" size="medium" @click="openAddComDialog">添加公司</el-button>
      </div>
      <span>公司</span>
      <el-select v-model="format.company" clearable placeholder="请选择公司" size="medium">
        <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <span>渠道</span>
      <el-input
        v-model="format.searchChannel"
        autocomplete="off"
        placeholder="请输入渠道名"
        style="width:20%;"
      ></el-input>
      <el-button
        v-loading.fullscreen="loading"
        element-loading-text="资源加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        type="primary"
        size="medium"
        @click="searchData"
      >搜索</el-button>
    </input-area>
    <div class="bd">
      <info-table
        v-has="'channel_list'"
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hidePage="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop === 'action'">
              <el-button
                v-has="'modify_channel'"
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                v-has="'delete_channel'"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
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
    <!-- 渠道添加 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="渠道名" :label-width="formLabelWidth">
          <el-input v-model="form.channel_name" autocomplete="off" placeholder="请输入渠道名"></el-input>
        </el-form-item>
        <el-form-item label="渠道编号" :label-width="formLabelWidth">
          <el-input v-model="form.channel_id" autocomplete="off" placeholder="请输入渠道编号"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth">
          <el-select v-model="form.belong_company" clearable placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addChannel">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加公司 -->
    <el-dialog title="添加公司" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="公司名" :label-width="formLabelWidth">
          <el-input v-model="form1.company_name" autocomplete="off" placeholder="请输入公司名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCompany">确 定</el-button>
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
  name: "channels",
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
      loading: false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      dialogTitle: "",
      formLabelWidth: "120px",
      companyList: [],
      format: {
        company: "",
        searchChannel: ""
      },
      tableStyle: [
        { label: "ID", prop: "id", width: "" },
        { label: "渠道名", prop: "name", width: "" },
        { label: "代码", prop: "code", width: "" },
        { label: "关联总代id", prop: "uid", width: "" },
        { label: "隶属公司", prop: "cname", width: "" },
        { label: "创建时间", prop: "created_time", width: "" },
        { label: "修改时间", prop: "modified_time", width: "" },
        { label: "操作", prop: "action", width: "150" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        channel_name: "",
        channel_id: "",
        belong_company: ""
      },
      form1: {
        company_name: ""
      }
    };
  },
  methods: {
    resetForm() {
      this.form = {
        channel_name: "",
        channel_id: "",
        belong_company: ""
      };
    },
    getChannelList() {
      this.loading = true
      this.$http
        .get("v1/backend/operation/channels", {
          params: {
            page: this.currentPage,
            limit: this.pagesize,
            company: this.format.company,
            channel_name: this.format.searchChannel
          }
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
    searchData() {
      this.getChannelList();
    },
    //获取公司列表
    getCompanyList() {
      this.$http.get("v1/backend/operation/channel/company").then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.companyList = res.data.data;
        }
      });
    },
    openAddDialog() {
      this.resetForm();
      this.dialogTitle = "添加渠道";
      this.dialogFormVisible = true;
    },
    openAddComDialog() {
      this.dialogVisible = true;
      this.form1.company_name = "";
    },
    addCompany() {
      let data = {
        name: this.form1.company_name
      };
      this.$http
        .post("v1/backend/operation/channel/company", data)
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogVisible = false;
            this.getCompanyList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
    },
    addChannel() {
      if (!this.form.id) {
        let data = {
          channel_name: this.form.channel_name,
          channel_num: this.form.channel_id,
          company: this.form.belong_company
        };
        this.$http.post("v1/backend/operation/channels", data).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getChannelList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      } else {
        console.log("wojinolei");
        let data = {
          channel_name: this.form.channel_name,
          channel_num: this.form.channel_id,
          company: this.form.belong_company,
          channel_id: this.form.id
        };
        this.$http.put("v1/backend/operation/channels", data).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.dialogFormVisible = false;
            this.getChannelList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      }
    },
    /**搜索*/
    search() {},
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogTitle = "编辑渠道";
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.channel_name = row.name;
      this.form.channel_id = row.code;
      this.form.belong_company = row.cname;
    },
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("v1/backend/operation/channels", {
              params: {
                channel_id: row.id
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.getChannelList();
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.data.msg
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getChannelList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getChannelList();
    }
  },
  mounted() {
    this.getChannelList();
    this.getCompanyList();
  }
};
</script>

<style scoped>
#ChannelList-main .bd {
  padding-left: 20px;
}
#ChannelList-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#ChannelList-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#ChannelList-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
table {
  border-collapse: collapse;
}
</style>

<template>
  <div id="ExchangeConf-main">
    <input-area>
      <el-button
        type="danger"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="dialogFormVisible=true"
      >删除</el-button>
      <el-button
        type="primary"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="dialogFormVisible=true"
      >添加</el-button>
      <el-button type="primary" @click="open">保留金额设置</el-button>
    </input-area>
    <div class="bd">
      <info-table :table-style="tableStyle" :records="records" :page-info="pageInfo">
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop === 'action'">
              <el-button style="background-color:#30a99d;color:#fff;" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button style="background-color:#30a99d;color:#fff;" size="mini">下线</el-button>
            </template>
            <template
              v-if="['action'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!-- 添加配置信息 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="支付方式" :label-width="formLabelWidth">
          <el-select v-model="form.pay_type" style="width:100%;">
            <el-option label="支付宝" value="alipay"></el-option>
            <el-option label="银行卡" value="bank"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最小兑换金额" :label-width="formLabelWidth">
          <el-input v-model="form.exchange_min" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大兑换金额" :label-width="formLabelWidth">
          <el-input v-model="form.exchange_max" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" style="width:100%;">
            <el-option label="上线" value="online"></el-option>
            <el-option label="下线" value="offline"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角标" :label-width="formLabelWidth">
          <el-upload
            :limit="1"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
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
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import InputArea from "../../plugin/components/InputArea";
export default {
  name: "PayOrderRecord",
  components: {
    InfoTableItem,
    InfoTable,
    InputArea
  },
  data() {
    return {
      pagesize: 5,
      currentPage: 1,
      total: 0,
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "160px",
      dialogTitle: '添加配置信息',
      tableStyle: [
        { label: "ID", prop: "channel_id", width: "" },
        { label: "兑换方式", prop: "exchange_way", width: "" },
        { label: "当前状态", prop: "cur_status", width: "" },
        { label: "兑换最小额度(元)", prop: "exchange_min", width: "" },
        { label: "兑换最大额度(元)", prop: "exchange_max", width: "" },
        { label: "角标", prop: "corner_remark", width: "" },
        { label: "操作", prop: "action", width: "200" }
      ],
      records: [
        {
          channel_id: "10012",
          exchange_way: "银行卡",
          cur_status: "上线",
          exchange_min: "100",
          exchange_max: "200",
          corner_remark: "",
          action: ""
        }
      ],
      pageInfo: new PageInfo(1, [5, 10, 15], 0),
      form: {
        pay_type: "bank",
        exchange_min: "",
        exchange_max: "",
        status: "online"
      },
      keep_money: 1000.0,
      fileList: []
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    open() {
      this.$prompt("保留金额", "设置保留金额", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal:true,
        inputValue: this.keep_money,
        inputType: "number"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleEdit(row) {
        this.dialogFormVisible = true
    }
  },
  mounted() {}
};
</script>

<style scoped>
#ExchangeConf-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#ExchangeConf-main .bd p {
  margin: 0;
}
#ExchangeConf-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
.el-pagination {
  margin-top: 20px;
}
</style>

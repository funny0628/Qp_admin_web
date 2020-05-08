<template>
  <div id="ExchangeConf-main">
    <input-area>
      <!-- <el-button
        type="danger"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="dialogFormVisible=true"
      >删除</el-button>-->
      <el-button v-has="'add_withdraw_config'" type="primary" style="margin-top: 10px;margin-bottom: 10px;" @click="openAdd">添加</el-button>
      <el-button type="primary" @click="dialogVisible=true">保留金额设置</el-button>
    </input-area>
    <div class="bd">
      <info-table
        v-has="'withdraw_config_list'"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hide-page="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'method'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  === 1">支付宝</span>
              <span v-if="scope.row[scope.prop]  === 2">银行卡</span>
            </template>
            <template v-if="'online_status'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  === 1">上线</span>
              <span v-if="scope.row[scope.prop]  === 2">下线</span>
            </template>
            <template v-if="'thumb'.indexOf(scope.prop) >= 0">
              <img :src="scope.row[scope.prop]" width="50" height="50" alt="">
            </template>
            <template v-if="scope.prop === 'action'">
              <el-button
                v-has="'modify_withdraw_config'"
                style="background-color:#30a99d;color:#fff;"
                size="mini"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button v-has="'delete_withdraw_config'" size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              <el-button
                v-has="'offline_withdraw_config'"
                style="background-color:#30a99d;color:#fff;"
                size="mini"
                @click="updateStatus(scope.row)"
              >{{scope.row.online_status | formatStatus}}</el-button>
            </template>
            <template
              v-if="['action','method','thumb','online_status'].indexOf(scope.prop) < 0"
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
    <!-- 添加配置信息 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="支付方式" :label-width="formLabelWidth">
          <el-select v-model="form.pay_type" style="width:100%;" placeholder="请选择">
            <el-option label="支付宝" value="1"></el-option>
            <el-option label="银行卡" value="2"></el-option>
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
            <el-option label="上线" value="1"></el-option>
            <el-option label="下线" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角标" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action
            :fileList="fileList"
            accept="image/jpeg, image/png"
            :show-file-list="false"
            :on-change="handleChange"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :http-request="uploadFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfig">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 设置保留金额 -->
    <el-dialog title="设置保留金额" :visible.sync="dialogVisible" width="20%">
      <el-form :model="form2">
        <el-form-item label="保留金额" label-width="100px">
          <el-input v-model.number="form2.keep_money" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setKeepMoney">确 定</el-button>
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
  name: "withdraw_config",
  components: {
    InfoTableItem,
    InfoTable,
    InputArea
  },
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      total: 0,
      imageUrl: "",
      fileList: [],
      tableData: [],
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "160px",
      dialogTitle: "",
      tableStyle: [
        { label: "ID", prop: "id", width: "" },
        { label: "兑换方式", prop: "method", width: "" },
        { label: "当前状态", prop: "online_status", width: "" },
        { label: "兑换最小额度(元)", prop: "min_money", width: "" },
        { label: "兑换最大额度(元)", prop: "max_money", width: "" },
        { label: "角标", prop: "thumb", width: "" },
        { label: "操作", prop: "action", width: "200" }
      ],
      records: [],
      pageInfo: new PageInfo(1, [5, 10, 15], 0),
      form: {
        id: null,
        pay_type: "",
        exchange_min: "",
        exchange_max: "",
        status: ""
      },
      form2: {
        keep_money: 1000.0
      },
      fileList: []
    };
  },
  filters: {
    formatStatus: function(val) {
      return val === 1 ? "下线" : "上线";
    }
  },
  methods: {
    resetForm() {
      this.form = {
        id: null,
        pay_type: "",
        exchange_min: "",
        exchange_max: "",
        status: ""
      };
    },
    async getExchangeList() {
      const res = await this.$http.get("v1/backend/lobby/conversion", {
        params: {
          page: this.currentPage,
          limit: this.pagesize
        }
      });
      console.log(res);
      if (res.data.code === 1) {
        this.records = res.data.data;
        this.total = res.data.total;
      }
    },
    async addConfig() {
      if (!this.form.id) {
        let data = {
          method: Number(this.form.pay_type),
          keep_money: this.form2.keep_money,
          min_money: Number(this.form.exchange_min),
          max_money: Number(this.form.exchange_max),
          online_status: Number(this.form.status),
          thumb: this.imageUrl
        };
        console.log(data);
        const res = await this.$http.post("v1/backend/lobby/conversion", data);
        if (res.data.code === 1) {
          this.dialogFormVisible = false;
          this.getExchangeList();
        }
        console.log(res);
      } else {
        let data = {
          method: Number(this.form.pay_type),
          keep_money: this.form2.keep_money,
          min_money: Number(this.form.exchange_min),
          max_money: Number(this.form.exchange_max),
          online_status: Number(this.form.status),
          thumb: this.imageUrl,
          id: this.form.id
        };
        const res = await this.$http({
          method: "put",
          url: "v1/backend/lobby/conversion",
          data: data
        });
        console.log(res);
        if (res.data.code === 1) {
          this.dialogFormVisible = false;
          this.getExchangeList();
        }
      }
    },
    openAdd() {
      this.dialogFormVisible = true;
      this.dialogTitle = "添加配置信息";
      this.resetForm();
      (this.imageUrl = ""), (this.fileList = []);
    },
    handleEdit(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.dialogTitle = "编辑配置信息";
      this.form.id = row.id;
      this.form.pay_type = String(row.method);
      this.form.exchange_min = row.min_money;
      this.form.exchange_max = row.max_money;
      this.form.status = String(row.online_status);
      this.imageUrl = row.thumb;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("v1/backend/lobby/conversion", {
              params: {
                id: row.id
              }
            })
            .then(res => {
              if (res.data.code === 1) {
                this.getExchangeList();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    updateStatus(row) {
      this.$confirm("确认更新状态吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let data = {
          id: row.id,
          online_status: row.online_status === 1 ? 2 : 1
        };
        this.$http.patch("v1/backend/lobby/conversion", data).then(res => {
          if (res.data.code === 1) {
            this.getExchangeList();
          }
        });
      });
    },
    setKeepMoney() {
      this.dialogVisible = false;
      this.$message({
        type: "success",
        message: "设置成功"
      });
    },
    handleAvatarSuccess(res, file) {},
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    beforeUpload(file) {},
    uploadFile() {
      let formData = new FormData();
      this.fileList.forEach(item => {
        formData.append("filename", item.raw);
        formData.append("types", 1);
      });
      this.$http.post("v1/backend/upload", formData).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.imageUrl = res.data.path;
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getExchangeList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExchangeList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    open() {
      this.$prompt("保留金额", "设置保留金额", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: true,
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
    }
  },
  mounted() {
    this.getExchangeList();
  }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

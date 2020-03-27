<template>
  <div id="VipClassConf-main">
    <input-area>
      <el-button type="danger" style="margin-top: 10px;margin-bottom: 10px;">删除</el-button>
      <el-button
        type="primary"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="dialogFormVisible=true"
      >添加</el-button>
      <el-button type="primary" @click="open">发送到服务端配置</el-button>
      <el-button
        type="danger"
        size="medium"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="dialogVisible=true"
      >排行榜机器人随机概率</el-button>
    </input-area>
    <div class="bd">
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" label="机器人携带金币" align="center"></el-table-column>
        <el-table-column prop="email" label="VIP级别+概率" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.update_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" align="center" width="200">
          <template>
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
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
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="携带金币" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="4" style="text-align:center;">-</el-col>
            <el-col :span="10">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-col>
          </el-row>
          <span>机器人携带金币(左闭右开)</span>
        </el-form-item>
        <el-form-item label="VIP_0" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_1" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_2" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_3" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_4" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_5" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_6" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 排行榜机器人随机概率 -->
    <el-dialog title="排行榜机器人随机概率" :visible.sync="dialogVisible">
      <el-form :model="form">
        <div style="margin-bottom:20px;font-size:16px;">
          <span>排行榜机器人随机概率</span>
          <el-button type="primary" @click="open">发送到服务端配置</el-button>
        </div>
        <el-form-item label="VIP_0" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_1" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_2" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_3" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_4" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_5" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VIP_6" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
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
import InfoTable from "../../../plugin/components/InfoTable";
import PageInfo from "../../../plugin/script/common/PageInfo";
import InfoTableItem from "../../../plugin/components/InfoTableItem";
import InputArea from "../../../plugin/components/InputArea";
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
      dialogVisible: false,
      formLabelWidth: "120px",
      form: {
        name: ""
      },
      fileList: []
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    open() {
      this.$confirm("确认发送吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "发送成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送"
          });
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  mounted() {}
};
</script>

<style scoped>
#VipClassConf-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#VipClassConf-main .bd p {
  margin: 0;
}
#VipClassConf-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
.el-pagination {
  margin-top: 20px;
}
</style>

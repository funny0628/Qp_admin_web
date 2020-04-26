<template>
  <div id="AgencyConfig">
    <!-- title -->
    <div class="title">
      <div class="Config">全民代理配置</div>
    </div>
    <!-- search -->
    <div class="search">
      <h3>统一配置</h3>
      <!-- 推广链接域名配置:<el-input
        placeholder="推广链接域名配置"
        v-model="searchConfig"
        style="margin-top:10px;width:200px"
      ></el-input>
      <el-button type="primary" @click="save">保存</el-button> -->
      <p><el-button type="primary" @click="add">新增</el-button></p>
    </div>
    <div class="table">
      <!-- table -->
      <el-table
        border
        highlight-current-row
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          prop="lvl"
          label="代理级别"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="min"
          label="流水区间下限"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="max"
          label="流水区间上限"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="rebate"
          label="每万返佣额度"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          show-overflow-tooltip
          width="200px"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="代理级别：" prop="lvl">
            <el-input
              placeholder="代理级别"
              v-model="form.lvl"
              style="width:200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="流水区间下限：" prop="min">
            <p>
              <el-input
                placeholder="流水区间下限"
                v-model="form.min"
                style="width:200px"
              ></el-input
              >元
            </p>
          </el-form-item>
          <el-form-item label="流水区间上限：" prop="max">
            <p>
              <el-input
                placeholder="流水区间上限"
                v-model="form.max"
                style="width:200px"
              ></el-input
              >元
            </p>
          </el-form-item>

          <el-form-item label="每万返佣额度：" prop="rebate">
            <el-input
              placeholder="每万返佣额度"
              v-model="form.rebate"
              style="width:200px"
            ></el-input>
            <p>(元）注：每万返佣额度输入最大值不超过250。</p>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form', title)"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DeepData from "../../assets/js/formate.js";

export default {
  name: "agent_config",
  data() {
    return {
      searchConfig: "",
      title: "新增",
      visible: false,
      total: "",
      currentPage: 1,
      limit: 10,
      form: {
        lvl: "",
        min: "",
        max: "",
        rebate: ""
      },
      rules: {
        lvl: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
        min: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
        max: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
        rebate: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      tableData: []
    };
  },
  created() {
    this.initdata({ page: this.currentPage, limit: this.limit });
  },
  methods: {
    //保存
    // save() {},

    //添加
    add() {
      this.editForm("新增", true, {});
    },

    //表格编辑
    handleEdit(row) {
      // console.log("编辑", row);
      this.editForm("编辑", true, DeepData(row));
    },

    //表格删除
    handleDelete(index,row) {
       this.$confirm("确认删除吗？", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //2.发送请求在后台删除数据
          let { data } = await this.$http.allAgency.DeleteAllAgency({
            id: row.id
          });
          // console.log(data);
          if (data.code === 1 && data.msg === "ok") {
           this.initdata({ page: this.currentPage, limit: this.limit });
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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

    //提交
    onSubmit(formName, type) {
      // console.log(formName, type, this.form);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          Object.keys(this.form).forEach(item => {
            this.form[item] = parseInt(this.form[item]);
          });
          // console.log(this.form);
          if(type === '新增'){
            //发送post
            let { data } = await this.$http.allAgency.PostAllAgency(this.form);
            // console.log(data);
            if(data.code === 1 && data.msg === 'ok'){
              this.initdata({ page: this.currentPage, limit: this.limit });
            }
            

          }else if(type === '编辑'){
            //发送put
             let { data } = await this.$http.allAgency.PutAllAgency(this.form);
            // console.log(data);
            if(data.code === 1 && data.msg === 'ok'){
              this.initdata({ page: this.currentPage, limit: this.limit });
            }

          }
          this.editForm("新增", false, {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    editForm(title, visible, form) {
      this.title = title;
      this.visible = visible;
      this.form = form;
    },

    async initdata(params) {
      let { data } = await this.$http.allAgency.GetAllAgency(params);
      this.tableData = DeepData(data.data);
      this.total = data.total;
      // console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
#AgencyConfig {
  .title {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ccc;
    .Config {
      font-size: 14px;
      width: 120px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
      border: 1px solid #ccc;
      border-bottom: none;
    }
  }
  .table {
    margin-top: 10px;
  }
}
</style>

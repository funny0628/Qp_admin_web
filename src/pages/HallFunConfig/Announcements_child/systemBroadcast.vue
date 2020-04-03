<template>
  <div id="systemBroadcast">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <el-button type="danger" @click="del">删除</el-button>
        <el-button type="primary" @click="add('form')">添加</el-button>
        <el-button type="primary" @click="send">发送到服务器配置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        border
        highlight-current-row
        :default-sort="{ prop: 'ID', order: orderlist[0] }"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column sortable prop="id" label="ID" align="center">
        </el-table-column>

        <el-table-column
          prop="info"
          label="公告内容"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="num_times"
          label="时间间隔(秒)"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="circulation"
          label="循环"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="play_start_time"
          label="播放开始时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="play_end_time"
          label="播放结束时间"
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
            <el-button size="mini" @click="handleEdit(scope.row, 'form')"
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
        v-if="total > 10"
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
    <!-- form表单 -->
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="visible">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="公告内容" prop="info">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.info"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间间隔(秒)" prop="num_times">
            <el-input
              v-model="form.num_times"
              placeholder="请输入间隔时间xx秒"
            ></el-input>
          </el-form-item>
          <el-form-item label="循环" prop="circulation">
            <el-select v-model="form.circulation">
              <el-option label="按时间" :value="1"></el-option>
              <el-option label="按日期时间" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="播放开始" prop="play_start_time">
            <el-date-picker
              v-model="form.play_start_time"
              type="date"
              placeholder="请输入播放开始时间"
              format="yyyy-MM-dd"
              value-format="timestamp"
            >
            </el-date-picker>
            <span
              >格式：2018-09-19 00:00:00
              （注意：若使用按时间循环，所选日期会忽略，只对时间生效）</span
            >
          </el-form-item>

          <el-form-item label="播放结束" prop="play_end_time">
            <el-date-picker
              v-model="form.play_end_time"
              type="date"
              placeholder="请输入播放结束时间"
              format="yyyy-MM-dd"
              value-format="timestamp"
            >
            </el-date-picker>
            <span
              >格式：2018-09-19 00:00:00
              （注意：若使用按时间循环，所选日期会忽略，只对时间生效）</span
            >
          </el-form-item>
        </el-form>
        <div style="margin-top:20px" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form', title)"
            >确 定</el-button
          >
          <el-button type="primary" @click="back()">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DeepData from "../../../assets/js/formate.js";
export default {
  data() {
    return {
      orderlist: ["ascending", "descending"],
      tableData: [],
      form: {
        info: "",
        num_times: "",
        circulation: "",
        play_start_time: "",
        play_end_time: ""
      },
      rules: {
        info: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        num_times: [
          {
            required: true,
            message: "必填项不可以为空,需要填入数字",
            trigger: "blur"
          }
        ],
        circulation: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        play_start_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        play_end_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      total: 0,
      currentPage: 1,
      limit: 10,
      visible: false,
      title: "添加系统公告",
      selectList: []
    };
  },
  created() {
    this.initdata({ page: this.currentPage, limit: this.limit });
  },
  methods: {

    //批量删除
    async del() {
      //勾选需要删除的项目批量删除
      if (this.selectList.length != 0) {
        //###1.删除dom的数据
        let str = this.selectList.join();
        // console.log(str);
        let { data } = await this.$http.HallFunConfig.DeleteSysBroadcast({
          id_list: `(${str})`
        });
        console.log(data);
        if (data.code === 1 && data.msg === "ok") {
          this.initdata({ page: this.currentPage, limit: this.limit });
        }
      } else {
        this.$message("请选择需要删除的数据");
      }
    },

    //添加
    add(formName) {
      this.editForm("添加系统公告", true, {});

      this.$refs[formName].resetFields();
    },

    //发送给服务器配置
    send() {
      this.$confirm("确认发送吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.$message({
          type: "success",
          message: "发送配置成功!"
        });
      });
    },

    //表格多选
    handleSelectionChange(sel) {
      let idList = sel.map(item => item.id);
      // console.log(idList);

      this.selectList = idList;
    },

    //页容量发生变化
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;
      this.initdata({ page: this.currentPage, limit: this.limit });
    },

    //页码发生变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.initdata({ page: this.currentPage, limit: this.limit });
    },

    //表格编辑
    handleEdit(row, formName) {
      let rowform = DeepData(row);
      // console.log(rowform);
      function data(time) {
        let long1 = Date.parse(time);
        let long2 = new Date(long1).getTime();
        return long2;
      }
      rowform.play_start_time = data(row.play_start_time);
      rowform.play_end_time = data(row.play_end_time);
      // console.log(rowform);
      this.editForm("更新系统公告", true, rowform);

      this.$refs[formName].resetFields();
    },
    
    //表格删除
    handleDelete(x, row) {
      // console.log(x, row.id);

      this.$confirm("确认删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data } = await this.$http.HallFunConfig.DeleteSysBroadcast({
            id: row.id
          });
          // console.log(data);
          if (data.code === 1 && data.msg === "ok") {
            this.initdata({
              page: this.currentPage,
              limit: this.limit,
              title: this.searchinput
            });
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

    //表单提交 
    onSubmit(formName, type) {
      //表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (type === "添加系统公告") {

            // console.log(this.form);
            let { data } = await this.$http.HallFunConfig.PostSysBroadcast(
              this.form
            );
            if (data.code === 1 && data.msg === "ok") {
              this.initdata({ page: this.currentPage, limit: this.limit });
            }
            // console.log(data);

            // this.initdata({ page: this.currentPage, limit: this.limit })
          } else if (type === "更新系统公告") {


            let { data } = await this.$http.HallFunConfig.PutSysBroadcast(
              this.form
            );
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.initdata({ page: this.currentPage, limit: this.limit });
            }
          }
          this.editForm("添加系统公告", false, {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //表单返回
    back() {
      this.editForm("添加系统公告", false, {});
    },

    editForm(title, visible, form) {
      this.title = title;
      this.visible = visible;
      this.form = form;
    },

    formateData(res) {
      res.forEach(item => {
        item.circulation = item.circulation === 1 ? "按时间" : "按日期时间";
      });
      return res;
    },
    // formateNum(res) {
    //   res.circulation = res.circulation === "按时间" ? 1 : 2;

    //   return res;
    // },

    async initdata(params) {
      let { data } = await this.$http.HallFunConfig.GetSysBroadcast(params);
      // let deepData = DeepData(data.data)
      let localdata = this.formateData(DeepData(data.data));
      this.tableData = localdata;
      this.total = data.total;
      // console.log(localdata);
      // console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
#systemBroadcast {
  background-color: #f2f2f2;
  .title {
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
  .table {
    margin-top: 10px;
  }
}
</style>

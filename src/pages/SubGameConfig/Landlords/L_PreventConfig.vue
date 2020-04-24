<template>
  <div id="L_PreventConfig">
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="add">添加</el-button
      ><el-button type="primary" @click="send">发送配置</el-button>
    </div>
    <!-- tabale -->
    <div class="table">
      <el-table
        :default-sort="{ prop: 'date', order: 'descending' }"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          sortable
          align="center"
          prop="id"
          label="编号"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="channel" label="渠道">
        </el-table-column>
        <el-table-column
          align="center"
          prop="s_etime"
          label="有效时间"
          width="300"
        >
        </el-table-column>
        <el-table-column align="center" prop="op_time" label="最后操作时间">
        </el-table-column>
        <el-table-column align="center" prop="op_name" label="操作者">
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDel(scope.$index, scope.row)"
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

    <!-- form表单 -->
    <div class="dialog">
      <el-dialog
        :title="title"
        :visible.sync="visible"
        :destroy-on-close="true"
      >
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="渠道" prop="channel">
            <el-select
              v-model="form.channel"
              placeholder="请选择渠道"
              style="margin-top:10px;width:200px"
            >
              <el-option
                v-for="item in optionchannels"
                :key="item.levelO"
                :label="item.avator_nameO"
                :value="item.avator_nameO"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="有效时间 始" prop="stime">
            <el-date-picker
              v-model="form.stime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="有效时间 止" prop="etime">
            <el-date-picker
              v-model="form.etime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
            >
            </el-date-picker>
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
export default {
  data() {
    return {
      // order: "descending",
      tableData: [],
      title: "添加控制名单",
      visible: false,
      form: {
        channel: "",
        stime: "",
        etime: ""
      },
      rules: {},
      currentPage: 1,
      limit: 10,
      total: "",
      optionchannels: []
    };
  },
  created() {
    this.initChannel();
    this.getData();
  },
  methods: {
    //添加
    add() {
      this.initform(true, "添加控制名单", {});
    },

    //发送服务器配置
    async send() {
      let { data } = await this.$http.HallFunConfig.PostTableConfig({
        type_id: 8
      });
      console.log(data);
      if (data.code === 1 && data.data) {
        this.$message({
          type: "success",
          message: "发送配置成功!"
        });
      }
    },

    //表格编辑
    handleEdit(index, row) {
      let editform = {
        channel: row.channel,
        stime: row.stime * 1000,
        etime: row.etime * 1000,
        id: row.id
      };
      this.initform(true, "编辑", editform);
    },

    //表格删除
    handleDel(index, row) {
      this.$confirm("确认删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data } = await this.$http.DataAnalysis.DeleterDdz({
            id: row.id
          });
          this.getData();
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
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let resData = {
            channel: this.form.channel,
            stime: Math.ceil(this.form.stime / 1000),
            etime: Math.ceil(this.form.etime / 1000)
          };
          if (type === "添加控制名单") {
            let { data } = await this.$http.DataAnalysis.PostDdz(resData);
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.getData();
            }
          } else if (type === "编辑") {
            resData.id = this.form.id;
            let { data } = await this.$http.DataAnalysis.PutDdz(resData);
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.getData();
            }
          }
          this.initform(false, "添加控制名单", {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //页容量变化
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;
      this.getData();
    },

    //页码变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.getData();
    },

    initform(visible, title, form) {
      this.visible = visible;
      this.title = title;
      this.form = form;
    },

    //获取时间格式
    initTime(today) {
      let myDate = new Date(today);
      let year = myDate.getFullYear();
      let month =
        myDate.getMonth() + 1 < 10
          ? "0" + (myDate.getMonth() + 1)
          : myDate.getMonth() + 1;
      let day =
        myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate();
      let h =
        myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours();
      let mm =
        myDate.getMinutes() < 10
          ? "0" + myDate.getMinutes()
          : myDate.getMinutes();
      let s =
        myDate.getSeconds() < 10
          ? "0" + myDate.getSeconds()
          : myDate.getSeconds();
      return `${year}-${month}-${day} ${h}:${mm}:${s}`;
    },

    getData() {
      this.initData({
        page: this.currentPage,
        limit: this.limit
      });
    },

    async initData(params) {
      let { data } = await this.$http.DataAnalysis.GetDdz(params);
      console.log(data);
      data.data.forEach(item => {
        item.s_etime = `${this.initTime(item.stime * 1000)} - ${this.initTime(
          item.etime * 1000
        )}`;
        item.op_time = this.initTime(item.op_time * 1000);
      });
      console.log(data.data);
      this.tableData = data.data;
      this.total = data.total;
    },

    //获取所有渠道
    async initChannel() {
      let Channelsdata = await this.$http.OperationMan.GetChannels();
      let changeData = [];
      Channelsdata.data.data.forEach(item => {
        changeData.push(item.name);
      });
      changeData.forEach((item, index) => {
        this.optionchannels.push({ avator_nameO: item, levelO: index });
      });
      this.optionchannels.unshift({ avator_nameO: "所有渠道", levelO: -1 });
    }
  }
};
</script>

<style lang="less" scoped>
#L_PreventConfig {
  background-color: #f2f2f2;
  .title {
    padding: 10px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
}
</style>

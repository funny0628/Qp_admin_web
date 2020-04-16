<template>
  <div id="allServersEmail">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <!-- <span @click="writeEmail">写邮件</span> -->
        <el-button type="primary" @click="writeEmail">写邮件</el-button>
      </div>
      邮件ID
      <el-input style="margin-top:10px;width:200px;" v-model="ids"></el-input>

      标题
      <el-input style="margin-top:10px;width:200px;" v-model="Title"></el-input>
      状态
      <el-select
        style="margin-top:10px;width:200px;"
        v-model="type_id"
        placeholder="请选择"
      >
        <el-option label="生效中" :value="1"></el-option>
        <el-option label="未生效" :value="2"></el-option>
        <el-option label="已过期" :value="3"></el-option>
        <el-option label="作废" :value="4"></el-option>
      </el-select>

      <!-- <span class="search" @click="search">查找</span> -->
      <el-button type="primary" @click="search">查找</el-button>
    </div>
    <!-- table -->
    <div class="table">
      <el-table
        border
        highlight-current-row
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="邮件序号"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="send_name"
          label="发件人"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="title"
          label="邮件标题"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="coins"
          label="邮件道具(金币)"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="邮件生效时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="邮件过期时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="send_status"
          label="邮件状态"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop=""
          label="操作"
          align="center"
          show-overflow-tooltip
          width="300px"
        >
          <template slot-scope="scope">
            <el-button size="mini"  v-if="scope.row.send_status === '生效中' || scope.row.send_status === '未生效'"  @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="detail(scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              v-if="scope.row.send_status === '生效中'"
              type="danger"
              @click="del(scope.row)"
              >废弃</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
      <el-dialog :title="title" :visible.sync="visible" :destroy-on-close="true">
        <el-form
          :disabled="disabled"
          ref="form"
          :rules="rules"
          :model="form"
          label-width="120px"
        >
          <el-form-item label="发件人名称" prop="send_name">
            <el-input
              :disabled="disabledName"
              placeholder="发件人名称"
              v-model="form.send_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮件标题" prop="title">
            <el-input placeholder="邮件标题" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="邮件内容" prop="content">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.content"
            ></el-input>
          </el-form-item>
          <el-form-item label="金币" prop="coins">
            <el-input placeholder="金币" v-model="form.coins"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" prop="start_time">
            <el-date-picker
              v-model="form.start_time"
              type="date"
              placeholder="请输入结束时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="过期时间" prop="end_time">
            <el-date-picker
              v-model="form.end_time"
              type="date"
              placeholder="请输入结束时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div v-if="title != '邮件详情'" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form', title)"
            >确 定</el-button
          >
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
      Title: "",
      ids: "",
      type_id: "",
      tableData: [],
      value: "",
      currentPage: 1,
      limit: 10,
      total: 0,
      visible: false,
      rules: {
        send_name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        title: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        content: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        coins: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        end_time: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        start_time: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
      },
      form: {
        send_name: "",
        title: "",
        content: "",
        coins: "",
        uid: [],
        end_time: "",
        start_time: ""
      },
      title: "新增",
      disabled: false,
      disabledName: false
    };
  },
  created() {
    this.initdata({
      page: this.currentPage,
      limit: this.limit,
      mail_type: 1
    });
  },
  methods: {
    //写邮件
    writeEmail() {
      this.editForm("新增", true, false, false, {});
    },

    //搜索
    search() {
      if (this.ids === "") {
        this.ids = 0;
      } else if (this.type_id === "") {
        this.type_id = 0;
      }
      // console.log("chazhao", +this.type_id, +this.ids);
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        mail_type: 1,
        title: this.Title,
        ids: +this.ids,
        type_id: +this.type_id
      });
      this.ids = "";
      this.type_id = "";
      this.Title = "";
    },

    //表格编辑
    handleEdit(row) {
      // console.log(row);
      row = DeepData(row);
      row.start_time = this.data(row.start_time);
      row.end_time = this.data(row.end_time);
      this.editForm("编辑", true, false, true, row);
    },

    //表格详情
    detail(row) {
      row = DeepData(row);
      row.start_time = this.data(row.start_time);
      row.end_time = this.data(row.end_time);
      this.editForm("邮件详情", true, true, true, row);
    },

    //表格废弃邮件
    async del(row) {
      // console.log(row);
      row.send_status = "废弃";
      let resData = {
        mail_type: 1,
        send_status: 2,
        mail_id: row.id
      };
      let { data } = await this.$http.HallFunConfig.patchEmail(resData);
      // console.log(data);
      if (data.code === 1 && data.msg === "ok") {
        this.initdata({
          page: this.currentPage,
          limit: this.limit,
          mail_type: 1
        });
      }
    },

    //页容量变化
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        mail_type: 1
      });
    },

    //页码变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        mail_type: 1
      });
    },

    //表单提交
    onSubmit(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (type === "新增") {
            // console.log(this.form);
            let resData = DeepData(this.form);
            resData.mail_type = 1;
            let { data } = await this.$http.HallFunConfig.PostEmail(resData);
            // console.log(data);

            if (data.code === 1 && data.msg === "ok") {
              this.initdata({
                page: this.currentPage,
                limit: this.limit,
                mail_type: 1
              });
            }
          } else if (type === "编辑") {
            // console.log(this.form);

            let res = {
              send_name: this.form.send_name,
              title: this.form.title,
              content: this.form.content,
              coins: this.form.coins,
              uid: this.form.uid,
              mail_type: 1,
              mail_id: this.form.id,
              start_time: this.form.start_time,
              end_time: this.form.end_time
            };
            let { data } = await this.$http.HallFunConfig.PutEmail(res);
            // console.log(data);

            if (data.code === 1 && data.msg === "ok") {
              this.initdata({
                page: this.currentPage,
                limit: this.limit,
                mail_type: 1
              });
            }
          } else if (type === "邮件详情") {
          }

          this.editForm("新增", false, false, false, {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    editForm(title, visible, disabled, disabledName, form) {
      this.title = title;
      this.visible = visible;
      this.disabled = disabled;
      this.disabledName = disabledName;
      this.form = form;
    },

    formateData(res) {
      res.forEach(item => {
        let start_time = this.data(item.start_time);
        let end_time = this.data(item.end_time);
        let currentTime = Date.parse(new Date());
        // console.log(start_time, end_time, currentTime);

        if (currentTime < start_time) {
          item.send_status = "未生效";
        } else if (currentTime > start_time && currentTime < end_time) {
          item.send_status = "生效中";
        } else if (currentTime > end_time) {
          item.send_status = "已过期";
        }
      });
      return res;
    },

    data(time) {
      let long1 = Date.parse(time);
      let long2 = new Date(long1).getTime();
      return long2;
    },

    async initdata(params) {
      let { data } = await this.$http.HallFunConfig.GetEmail(params);
      let fres = this.formateData(data.data);
      this.tableData = fres;
      this.total = data.total;
     
      // console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
#allServersEmail {
  background-color: #f2f2f2;
  .title {
    padding: 20px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
  .table {
    margin-top: 10px;
  }
}
</style>

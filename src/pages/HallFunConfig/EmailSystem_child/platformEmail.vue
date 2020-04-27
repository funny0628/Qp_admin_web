<template>
  <div id="platformEmail">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <el-button type="primary" @click="writeEmail">写邮件</el-button>
      </div>
      邮件ID
      <el-input style="margin-top:10px;width:200px;" v-model="ids"></el-input>
      收件人
      <el-input style="margin-top:10px;width:200px;" v-model="uid"></el-input>
      标题
      <el-input style="margin-top:10px;width:200px;" v-model="Title"></el-input>
      状态
      <el-select
        style="margin-top:10px;width:200px;"
        v-model="type_id"
        placeholder="请选择"
      >
        <el-option label="已读" :value="1"></el-option>
        <el-option label="未读" :value="2"></el-option>
        <el-option label="已经领取" :value="3"></el-option>
        <el-option label="未领取" :value="4"></el-option>
        <el-option label="待发送" :value="5"></el-option>
      </el-select>

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
          label="ID"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
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
          prop="uid"
          label="收件人"
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
          prop="send_status"
          label="邮件状态"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="change"
          label="操作"
          align="center"
          show-overflow-tooltip
          width="300px"
        >
          <template slot-scope="scope">
            <el-button size="mini"  @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="detail(scope.row)"
              >详情</el-button
            >
            <el-button
              v-if="scope.row.send_status === '待发送'"
              size="mini"
              type="danger"
              @click="send(scope.row)"
              >发送邮件</el-button
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
        :page-sizes="[10, 15, 20]"
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
          <el-form-item label="收件人ID" prop="uid">
            <el-input
              placeholder="多个以逗号分隔 如: 1,2,3,4"
              v-model="form.uid"
              :disabled="disabledID"
            ></el-input>
          </el-form-item>
          <el-form-item label="发件人昵称" prop="send_name">
            <el-input
              placeholder="发件人昵称"
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
      uid: "",
      ids: "",
      type_id: "",
      Title: "",
      tableData: [],
      value: "",
      currentPage: 1,
      limit: 10,
      total: 0,
      visible: false,
      disabled: false,
      disabledID: false,
      rules: {
        send_name: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ],
        title: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        content: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ],
        coins: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        uid: [{ required: true, message: "必填项不能为空", trigger: "blur" }]
      },
      form: {
        send_name: "",
        title: "",
        content: "",
        coins: "",
        uid: []
      },
      title: "新增"
    };
  },
  created() {
    this.initdata({
      page: this.currentPage,
      limit: this.limit,
      mail_type: 2
    });
  },
  methods: {
    //写邮件
    writeEmail() {
      this.editForm("新增", true, false,false, {});
    },

    //按条件搜索
    search() {

      if (this.ids === "") {
        this.ids = 0;
      } else if (this.type_id === "") {
        this.type_id = 0;
      } else if (this.uid === "") {
        this.uid = 0;
      }
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        mail_type: 2,
        title: this.Title,
        uid: +this.uid,
        ids: +this.ids,
        type_id: +this.type_id
      });
      this.ids = "";
      this.type_id = "";
      this.uid = "";
      this.Title = "";
    },

    //表格编辑
    handleEdit(row) {
      // console.log(row);
      row.mail_id = row.id;
      this.editForm("编辑", true, false,true, DeepData(row));
    },

    //表格详情
    detail(row) {
      // console.log(row);
      this.editForm("邮件详情", true, true, true, DeepData(row));
    },

    //表格发送邮件
    async send(row) {
      // console.log(row);

      let resData = {
        mail_type: 2,
        send_status: 2,
        mail_id: row.id
      };
      let { data } = await this.$http.HallFunConfig.patchEmail(resData);
      // console.log(data);
      if (data.code === 1 && data.msg === "ok") {
        this.initdata({
          page: this.currentPage,
          limit: this.limit,
          mail_type: 2
        });
      }
    },

    //页容量改变
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        mail_type: 2
      });
    },

    //页码改变
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        mail_type: 2
      });
    },
    onSubmit(formName, type) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (type === "新增") {
            console.log(this.form);
            let resData = DeepData(this.form);
            resData.mail_type = 2;
            let { data } = await this.$http.HallFunConfig.PostEmail(resData);
            // console.log(data);

            if (data.code === 1 && data.msg === "ok") {
              this.initdata({
                page: this.currentPage,
                limit: this.limit,
                mail_type: 2
              });
            }
          } else if (type === "编辑") {
            // console.log(this.form);
            // this.form.mail_type = 2;

            let res = {
              send_name: this.form.send_name,
              title: this.form.title,
              content: this.form.content,
              coins: this.form.coins,
              uid: this.form.uid,
              mail_type: 2,
              mail_id: this.form.mail_id
            };
            let { data } = await this.$http.HallFunConfig.PutEmail(res);
            // console.log(data);

            if (data.code === 1 && data.msg === "ok") {
              this.initdata({
                page: this.currentPage,
                limit: this.limit,
                mail_type: 2
              });
            }
          } else if (type === "邮件详情") {
          }
          this.editForm("新增", false, false,false, {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    editForm(title, visible, disabled,disabledID, form) {
      this.title = title;
      this.visible = visible;
      this.disabled = disabled;
      this.disabledID = disabledID;
      this.form = form;
    },
    formateData(res) {
      res.forEach(item => {
        // item.send_status = item.send_status === 1 ? "待发送" : "已发送";
        if (item.send_status === 1) {
          item.send_status = "待发送";
          this.sendShow = true;
        } else if (item.send_status === 2) {
          item.send_status = item.read_status === 1 ? "未读" : "已读";
        }
      });
      return res;
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
#platformEmail {
  background-color: #f2f2f2;
  .title {
    padding: 20px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
    span {
      display: inline-block;
      color: #fff;
      width: 50px;
      height: 30px;
      margin-right: 5px;
      line-height: 30px;
      text-align: center;
      background-color: #009688;
      &:hover {
        background-color: #30a89d;
      }

      &.search {
        width: 50px;
      }
    }
  }
  .table {
    margin-top: 10px;
  }
}
</style>

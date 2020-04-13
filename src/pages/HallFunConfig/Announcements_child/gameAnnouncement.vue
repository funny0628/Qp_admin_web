<template>
  <div id="gameAnnouncement">
    <div class="title">
      <p><el-button type="primary" @click="add('form')">添加</el-button></p>
      标题
      <el-input
        style="margin-top:10px;width:200px"
        v-model="searchinput"
      ></el-input>
      <el-button type="primary" @click="search">查找</el-button>
    </div>
    <!-- 表格 -->
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
          prop="title"
          label="公告标题"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="公告开始时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="公告结束时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="type_id"
          label="公告类型"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="show_status"
          label="状态"
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
        :before-close="handleClose"
        :title="title"
        :visible.sync="visible"
      >
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="公告标题" prop="title">
            <el-input placeholder="邮件标题" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="公告类型" prop="type_id">
            <el-select v-model="form.type_id">
              <el-option label="文字" :value="1"></el-option>
              <el-option label="图片" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="form.type_id === 1"
            label="公告简介"
            prop="description"
          >
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="tag">
            <el-select v-model="form.tag">
              <el-option label="没有标签" :value="1"></el-option>
              <el-option label="新" :value="2"></el-option>
              <el-option label="热门" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间" prop="start_time">
            <el-date-picker
              v-model="form.start_time"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间" prop="end_time">
            <el-date-picker
              v-model="form.end_time"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort"></el-input>
            <span>排序只可以为数字</span>
          </el-form-item>
          <el-form-item label="状态" prop="show_status">
            <el-select v-model="form.show_status">
              <el-option label="展示" :value="1"></el-option>
              <el-option label="隐藏" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type_id === 2" label="公告图片">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="api/upload"
              :before-upload="beforeAvatarUpload"
              :limit="1"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
import DeepData from "../../../assets/js/formate.js";
export default {
  data() {
    return {
      title: "记录",
      searchinput: "",
      currentPage: 1,
      limit: 10,
      total: 0,
      visible: false,
      imageUrl: "",
      serveUrl: "",
      tableData: [],
      form: {
        id: -1,
        title: "",
        type_id: "",
        description: "",
        image_url: "",
        tag: "",
        start_time: "",
        end_time: "",
        sort: "",
        show_status: ""
      },
      rules: {
        title: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        type_id: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        start_time: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ],
        sort: [
          {
            required: true,
            message: "必填项不能为空,只能输入数字",
            trigger: "blur"
          }
        ],
        show_status: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.initdata({
      page: this.currentPage,
      limit: this.limit,
      title: this.searchinput
    });
  },

  methods: {
 

    //限制用户上传的图片格式和大小
    beforeAvatarUpload(file) {
      console.log(file);
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
      }

    },
    upLoad(file) {
      // console.log(file);
      const formData = new FormData();
      formData.append("filename", file.file);
      formData.append("types", 1);
      this.$http
        .post("api/upload", formData)
        .then(data => {
          // console.log(data);
          if (data.data.code === 1 && data.data.msg === "ok") {
            this.serveUrl = data.data.path;
          }
        });
    },

    handleClose() {
      this.imageUrl = "";
      this.editForm("记录", false, {});
    },

    //添加
    add(formName) {
      this.editForm("记录", true, {});

      this.$refs[formName].resetFields();
    },

    //搜索
    search() {
      if (this.searchinput === "") {
        this.$message({
          type: "warning",
          message: "请输入你要搜索的标题!"
        });
      }
      this.currentPage = 1;
      this.limit = 10;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        title: this.searchinput
      });
    },

    //页容量发生变化
    handleSizeChange(num) {
      // console.log(num);
      this.limit = num;
      this.currentPage = 1;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        title: this.searchinput
      });
    },

    //页码发生变化
    handleCurrentChange(pagenum) {
      // console.log(pagenum);
      this.currentPage = pagenum;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        title: this.searchinput
      });
    },

    //表格编辑
    handleEdit(row, formName) {
      // console.log(row);
      this.form =DeepData(row);
      // this.form = this.formateNum(row)
      this.form.start_time = this.data(row.start_time);
      this.form.end_time = this.data(row.end_time);

      this.editForm("编辑", true, this.form);
      this.$refs[formName].resetFields();
    },

    //表格删除
    handleDelete(y, row) {
      console.log(y, row.id);
      this.$confirm("确认删除吗？", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //2.发送请求在后台删除数据
          let { data } = await this.$http.HallFunConfig.DeleteGameNotice({
            id: row.id
          });
          console.log(data);
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
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (type === "记录") {
            console.log(this.form);

            this.form.image_url = this.serveUrl;
            let { data } = await this.$http.HallFunConfig.PostGameNotice(
              this.form
            );
            console.log(data);

            if (data.code === 1 && data.msg === "ok") {
              this.initdata({
                page: this.currentPage,
                limit: this.limit,
                title: this.searchinput
              });
            }
          } else if (type === "编辑") {
            // console.log(this.form);

            let resdata = this.formateNum(this.form);
            console.log(resdata);
            if (resdata.type_id === 2) {
              // resdata.image_url = "image_url";
              resdata.image_url = this.serveUrl;
            }
            console.log(resdata);
            let { data } = await this.$http.HallFunConfig.PutGameNotice(
              resdata
            );
            console.log(data);

            if (data.code === 1 && data.msg === "ok") {
              this.initdata({
                page: this.currentPage,
                limit: this.limit,
                title: this.searchinput
              });
            }
          }
          // this.visiblity = false;
          this.editForm("添加", false, {});
          this.imageUrl = "";
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

    formateData(res) {
      res.forEach(item => {
        item.type_id = item.type_id === 1 ? "文字" : "图片";
        item.show_status = item.show_status === 1 ? "展示" : "隐藏";
        if (item.tag === 1) {
          item.tag = "没有标签";
        } else if (item.tag === 2) {
          item.tag = "新";
        } else {
          item.tag = "热门";
        }
      });
      return res;
    },

    formateNum(item) {
      if (
        typeof item.type_id === "number" &&
        typeof item.tag === "number" &&
        typeof item.show_status === "number"
      )
        return;

      item.type_id = item.type_id === "文字" ? 1 : 2;
      item.show_status = item.show_status === "展示" ? 1 : 2;
      if (item.tag === "没有标签") {
        item.tag = 1;
      } else if (item.tag === "新") {
        item.tag = 2;
      } else {
        item.tag = 3;
      }

      return item;
    },

      data(time) {
        let long1 = Date.parse(time);
        let long2 = new Date(long1).getTime();
        return long2;
      },

    async initdata(params) {
      let { data } = await this.$http.HallFunConfig.GetGameNotice(params);
      let fres = this.formateData(data.data);
      this.tableData = fres;
      this.total = data.total;
      // console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
#gameAnnouncement {
  background-color: #f2f2f2;
  .title {
    padding: 10px;
    box-sizing: border-box;
    p {
      margin: 0;
      padding: 0;
    }
  }
  .table {
    margin-top: 10px;
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
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #ccc;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    border: 1px dashed #ccc;
  }
}
</style>

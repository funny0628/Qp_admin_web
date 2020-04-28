<template>
  <div id="gameAnnouncement">
    <div class="title">
      <p><el-button type="primary" @click="add">添加</el-button></p>
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
          v-for="(item,index) in titleData"
          :key="index"
          :prop="item.prop"
          :label="item.label"
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
        :page-sizes="[10, 15, 20]"
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
          <el-form-item label="公告标题" prop="title">
            <el-input placeholder="邮件标题" v-model="form.Title"></el-input>
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
            prop="Description"
          >
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.Description"
            ></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="Tag">
            <el-select v-model="form.Tag">
              <el-option label="没有标签" :value="1"></el-option>
              <el-option label="新" :value="2"></el-option>
              <el-option label="热门" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间" prop="StartTime">
            <el-date-picker
              v-model="form.StartTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间" prop="EndTime">
            <el-date-picker
              v-model="form.EndTime"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="排序" prop="Sort">
            <el-input v-model="form.Sort"></el-input>
            <span>排序只可以为数字</span>
          </el-form-item>
          <el-form-item label="状态" prop="Status">
            <el-select v-model="form.Status">
              <el-option label="展示" :value="1"></el-option>
              <el-option label="隐藏" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type_id === 2" label="公告图片">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="upLoad"
              :before-upload="beforeAvatarUpload"
              :limit="1"
            >
              <img v-if="form.ImageUrl" :src="form.ImageUrl" class="avatar" />
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
      title: "新增",
      searchinput: "",
      currentPage: 1,
      limit: 10,
      total: 0,
      visible: false,
      imageUrl: "",
      serveUrl: "",
      tableData: [],
      form: {
        Title: "",
        type_id: 1,
        Description: "",
        ImageUrl: "",
        Tag: 1,
        StartTime: "",
        EndTime: "",
        Sort: "",
        Status: 1
      },
      rules: {
        Title: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        Description: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        type_id: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        StartTime: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ],
        EndTime: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ],
        Sort: [
          {
            required: true,
            message: "必填项不能为空,只能输入数字",
            trigger: "blur"
          }
        ],
        Status: [
          { required: true, message: "必填项不能为空", trigger: "blur" }
        ]
      },
      initForm: {
        Title: "",
        Description: '',
        type_id: 1,
        ImageUrl: "",
        Tag: 1,
        StartTime: "",
        EndTime: "",
        Sort: "",
        Status: 1
      },
      titleData:[
        {
          prop:"AnnouncementId",
          label:"ID",
        },
        {
          prop:"Title",
          label:"公告标题",
        },
        {
          prop:"Tag",
          label:"标签",
        },
        {
          prop:"StartTime",
          label:"公告开始时间",
        },
        {
          prop:"EndTime",
          label:"公告结束时间",
        },
        {
          prop:"type_id",
          label:"公告类型",
        },
        {
          prop:"Sort",
          label:"排序",
        },
        {
          prop:"Status",
          label:"状态",
        },
      ]
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
      // console.log(file);
      if (file) {
        this.form.ImageUrl = URL.createObjectURL(file);
      }
    },
    upLoad(file) {
      // console.log(file);
      const formData = new FormData();
      formData.append("filename", file.file);
      formData.append("types", 1);
      this.$http.post("v1/backend/upload", formData).then(data => {
        // console.log(data);
        if (data.data.code === 1 && data.data.msg === "ok") {
          this.serveUrl = data.data.path;
          this.form.ImageUrl = URL.createObjectURL(file);
        }
      });
    },

    //添加
    add() {
      this.editForm("新增", true, DeepData(this.initForm));
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
    handleEdit(row) {
      // console.log(row);
      this.form = this.formateNum(DeepData(row));

      this.form.StartTime = this.data(row.StartTime);
      this.form.EndTime = this.data(row.EndTime);
      // console.log(this.form);
      this.editForm("编辑", true, this.form);
    },

    //表格删除
    handleDelete(y, row) {
      // console.log(y, row.id);
      this.$confirm("确认删除吗？", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //2.发送请求在后台删除数据
          let { data } = await this.$http.HallFunConfig.DeleteGameNotice({
            id: row.AnnouncementId
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
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.form.ImageUrl = this.serveUrl;
          // console.log(this.form);

          if (type === "新增") {
            // console.log(this.form);
            let { data } = await this.$http.HallFunConfig.PostGameNotice(
              this.form
            );
            // console.log(data);

            if (data.code === 1 && data.msg === "ok") {
              this.initdata({
                page: this.currentPage,
                limit: this.limit,
                title: this.searchinput
              });
            }
          } else if (type === "编辑") {
            // console.log(this.form);
            if (this.form.ImageUrl === "") {
              this.form.ImageUrl = "ImageUrl";
            }
            let { data } = await this.$http.HallFunConfig.PutGameNotice(
              this.form
            );
            // console.log(data);

            if (data.code === 1 && data.msg === "ok") {
              this.initdata({
                page: this.currentPage,
                limit: this.limit,
                title: this.searchinput
              });
            }
          }
          this.editForm("添加", false, {});
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
      // console.log(this.form);
    },

    formateData(res) {
      res.forEach(item => {
        item.type_id = item.Description  ? "文字" : "图片";
        item.Status = item.Status === 1 ? "展示" : "隐藏";
        if (item.Tag === 1) {
          item.Tag = "没有标签";
        } else if (item.Tag === 2) {
          item.Tag = "新";
        } else {
          item.Tag = "热门";
        }
      });
      return res;
    },

    formateNum(item) {
      if (
        typeof item.type_id === "number" &&
        typeof item.Tag === "number" &&
        typeof item.Status === "number"
      )
        return;

      item.type_id = item.type_id === "文字" ? 1 : 2;
      item.Status = item.Status === "展示" ? 1 : 2;
      if (item.Tag === "没有标签") {
        item.Tag = 1;
      } else if (item.Tag === "新") {
        item.Tag = 2;
      } else {
        item.Tag = 3;
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

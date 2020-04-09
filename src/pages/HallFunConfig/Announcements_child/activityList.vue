<template>
  <div id="activityList">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <el-button type="danger" @click="del">删除</el-button>
        <el-button type="primary" @click="add(form)">添加</el-button>
        <el-button type="primary" @click="send">发送到服务器配置</el-button>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <el-input
        style="margin-top:10px;width:200px;"
        v-model="searchinput"
        placeholder="请输入活动名称"
      ></el-input>
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
          prop="act_name"
          label="活动名称"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="act_type"
          label="活动类型"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="act_status"
          label="活动状态"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="活动开始时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="end_time"
          label="活结束时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="auth"
          label="操作者"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="操作时间"
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
            <el-button size="mini" @click="handleEdit(scope.row,form)"
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
      <el-dialog :title="title" :visible.sync="visible">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="活动类型" prop="type_id">
            <el-select v-model="form.type_id">
              <el-option label="普通" :value="1"></el-option>
              <el-option label="跳转" :value="2"></el-option>
              <el-option label="跳转网页" :value="3"></el-option>
              <el-option label="任务" :value="4"></el-option>
              <el-option label="首充活动" :value="5"></el-option>
              <el-option label="排行榜活动" :value="6"></el-option>
              <el-option label="绑定手机活动" :value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" prop="act_name">
            <el-input
              style="width:220px"
              v-model="form.act_name"
              placeholder="活动名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动状态" prop="status_id">
            <el-select v-model="form.status_id">
              <el-option label="待上线" :value="1"></el-option>
              <el-option label="生效中" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" prop="start_time">
            <el-date-picker
              v-model="form.start_time"
              type="date"
              placeholder="请输入开始时间"
              format="yyyy-MM-dd"
              value-format="timestamp"
            >
            </el-date-picker>
            -
            <el-date-picker
              v-model="form.end_time"
              type="date"
              placeholder="请输入结束时间"
              format="yyyy-MM-dd"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>

          <h2>普通-(额外配置)</h2>

          <el-form-item
            v-if="form.type_id === 1"
            label="背景图片"
            prop="act_info"
          >
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="onSuccess"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <div v-if="form.type_id === 2">
            <p>
              跳转地址:
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              按钮位置:
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </p>
            <p>
              活动图片:<el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </p>
            <p>
              按钮图片:
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </p>
          </div>
        </el-form>
        <div style="margin-top:20px" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit(form)">保 存</el-button>
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
      searchinput: "",
      orderlist: ["ascending", "descending"],
      tableData: [],
      total: 0,
      fileList: [],
      rules: {},
      form: {
        act_name: "",
        type_id: 1,
        status_id: "",
        act_info: "",
        start_time: "",
        end_time: "",
        auth: "root"
      },
      options: [
        {
          value: "选项1",
          label: "VIP"
        },
        {
          value: "选项2",
          label: "全民代理"
        },
        {
          value: "选项3",
          label: "客服"
        },
        {
          value: "选项4",
          label: "兑换"
        },
        {
          value: "选项5",
          label: "充值"
        },
        {
          value: "选项6",
          label: "活动"
        },
        {
          value: "选项7",
          label: "绑定手机"
        }
      ],
      options2: [
        {
          value: "选项8",
          label: "左下"
        },
        {
          value: "选项9",
          label: "中下"
        },
        {
          value: "选项10",
          label: "右下"
        }
      ],
      value: "",
      total: 0,
      currentPage: 1,
      limit: 10,
      visible: false,
      title: "添加系统公告",
      selectList: []
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
    //多选删除
    del() {
      //勾选需要删除的项目批量删除
      if (this.selectList.length != 0) {
        this.$confirm("确认删除吗?", "信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {

            let str = this.selectList.join();
            // console.log(str);
            let { data } = await this.$http.HallFunConfig.DeleteActivityList({
              id_list: `(${str})`
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
      } else {
        this.$message("请选择需要删除的数据");
      }
    },

    //添加
    add() {
      this.editForm("添加活动", true, {});
      this.$refs.formName.resetFields();
    },

    //发送到服务器配置
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

    //搜索
    search() {
      if (this.searchinput === "") {
        this.$message({
          type: "warning",
          message: "请输入你要搜索的活动名称!"
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

    //表格多选
    handleSelectionChange(sel) {
      let idList = sel.map(item => item.id);
      // console.log(idList);

      this.selectList = idList;
    },

    //页容量发生变化
    handleSizeChange(num) {
      // console.log(num);
      this.currentPage = 1;
      this.limit = num;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        title: this.searchinput
      });
    },

    //页码变化
    handleCurrentChange(pagenum) {
      // console.log(pagenum);

      this.currentPage = pagenum;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        title: this.searchinput
      });
    },
    handlePreview() {},
    handleRemove() {},
    onSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },

    //表格编辑
    handleEdit(row,formName) {
      // this.visiblity = true;
      // this.title = "更新系统公告";
      this.editForm("更新活动", true, {});
      this.$refs.formName.resetFields();
    },

    //表格删除
    handleDelete(x, row) {
      console.log(x, row.id);

      this.$confirm("确认删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async () => {
          let { data } = await this.$http.HallFunConfig.DeleteActivityList({
            id: row.id
          });
          if (data.code === 1 && data.msg === "ok") {
            this.initdata({
              page: this.currentPage,
              limit: this.limit,
              title: this.searchinput
            });
          }
          console.log(data);

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
    onSubmit() {
      //表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          //1.将form数据传递到paylist,新增到table中先显示一个dom
          console.log(this.form);
          // this.form.act_info =
          let { data } = await this.$http.HallFunConfig.PostActivityList(
            this.form
          );
          console.log(data);

          //2.发送请求追加数据到后台-------------------------------------------------------------

          // console.log("发送请求");

          //3.关闭新增的弹框
          this.editForm("添加活动", false, {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //表单返回
    back() {
      this.editForm("添加活动", false, {});
    },

    editForm(title, visible, form) {
      this.title = title;
      this.visible = visible;
      this.form = form;
    },

    formateData(res) {
      res.forEach(item => {
        item.act_status = item.act_status === 1 ? "待上线" : "生效中";

        switch (item.act_type) {
          case 1:
            item.act_type = "普通";
            break;
          case 2:
            item.act_type = "跳转";
            break;
          case 3:
            item.act_type = "跳转网页";
            break;
          case 4:
            item.act_type = "任务";
            break;
          case 5:
            item.act_type = "首充活动";
            break;
          case 6:
            item.act_type = "排行榜活动";
            break;
          case 7:
            item.act_type = "绑定手机活动";
            break;

          default:
            break;
        }
      });
      return res;
    },

    async initdata(params) {
      let { data } = await this.$http.HallFunConfig.GetActivityList(params);
      // console.log(data);
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
#activityList {
  background-color: #f2f2f2;
  .title {
    padding: 20px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
  .table {
    margin-top: 10px;
  }
  .form {
    p {
      margin-top: 20px;
    }
  }
  .upload-demo {
    margin-top: 10px;
  }
}
</style>

<template>
  <div id="stopNotice">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <el-button type="danger" @click="del">删除</el-button>
        <el-button v-has="'add_stop_notice'" type="primary" @click="add">添加</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div v-has="'stop_notice_records'">
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
        <el-table-column
          v-for="(item,index) in titleData"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          show-overflow-tooltip
          :sortable="item.label === 'ID' ? true : false"
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
            <el-button v-has="'modify_stop_notice'" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-has="'delete_stop_notice'"
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
            <el-input
              v-model="form.title"
              placeholder="请输入停服公告标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="公告内容" prop="info">
            <el-input
              type="textarea"
              placeholder="请输入公告内容"
              v-model="form.info"
            ></el-input>
          </el-form-item>
          <el-form-item label="公告落款" prop="inscribe">
            <el-input
              v-model="form.inscribe"
              placeholder="请输入公告落款"
            ></el-input>
          </el-form-item>
          <el-form-item label="通知时间" prop="notice_time">
            <el-date-picker
              v-model="form.notice_time"
              type="date"
              placeholder="请输入通知时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="开始时间" prop="start_time">
            <el-date-picker
              v-model="form.start_time"
              type="date"
              placeholder="请输入结束时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间" prop="end_time">
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
  name:'stop_notice',
  data() {
    return {
      orderlist: ["ascending", "descending"],
      tableData: [],
      total: 0,
      rules: {
        title: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        info: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        inscribe: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        notice_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        start_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      form: {
        title: "",
        info: "",
        inscribe: "",
        notice_time: "",
        start_time: "",
        end_time: "3",
        redactor: ""
      },

      currentPage: 1,
      limit: 10,
      visible: false,
      title: "添加停服公告",
      selectList: [],
      titleData:[
        {
          prop:"id",
          label:"ID",
        },
        {
          prop:"title",
          label:"公告标题",
        },
        {
          prop:"info",
          label:"公告内容",
        },
        {
          prop:"inscribe",
          label:"公告落款",
        },
        {
          prop:"notice_time",
          label:"通知时间",
        },
        {
          prop:"start_time",
          label:"公示开始时间",
        },
        {
          prop:"end_time",
          label:"公示结束时间",
        },
        {
          prop:"redactor",
          label:"操作者",
        },
      ]
    };
  },
  created() {
    this.initdata({ page: this.currentPage, limit: this.limit });
  },
  methods: {
    // 批量删除
    del() {
      //勾选需要删除的项目批量删除
      if (this.selectList.length != 0) {
        //###1.删除dom的数据
        //2.删除后台的数据
        console.log("已经有数据了");
        this.$confirm("确认删除吗?", "信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(async () => {
            let str = this.selectList.join();
            // console.log(str);
            let { data } = await this.$http.HallFunConfig.DeleteStopNotice({
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
      this.editForm("添加停服公告", true, {});
    },

    //表格选中
    handleSelectionChange(sel) {
      let idList = sel.map(item => item.id);
      this.selectList = idList;
    },

    //页容量改变
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;
      this.initdata({ page: this.currentPage, limit: this.limit });
    },

    //页码改变
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.initdata({ page: this.currentPage, limit: this.limit });
    },

    //表格编辑
    handleEdit(row) {
      console.log(row);
      let formData = DeepData(row);
      formData.start_time = this.data(row.start_time);
      formData.end_time = this.data(row.end_time);
      let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      formData.notice_time = formData.notice_time.replace(reg,"-")
      this.editForm("更新停服公告", true, formData);
    },

    //表格删除
    handleDelete(x, row) {
      // console.log(x,row.id);

      this.$confirm("确认删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async () => {
          // console.log(str);
          let { data } = await this.$http.HallFunConfig.DeleteStopNotice({
            id: row.id
          });
          // console.log(data);
          if (data.code === 1 && data.msg === "ok") {
            this.initdata({
              page: this.currentPage,
              limit: this.limit
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
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.form.start_time = Math.ceil(this.form.start_time / 1000);
          this.form.end_time = Math.ceil(this.form.end_time / 1000);
          if(this.form.notice_time[this.form.notice_time.length-1] !== '-'){
            this.form.notice_time += '-'
          }
          let arr = this.form.notice_time.split('')
          let arrl = []
          arr.forEach((item,index)=>{
            if(item === '-'){
              arrl.push(index)
            }
          })
          arr[arrl[0]] = '年'
          arr[arrl[1]] = '月'
          arr[arrl[2]] = '日'
          this.form.notice_time = arr.join('')
          console.log(this.form);
        

          if (type === "添加停服公告") {
            console.log(this.form);

            this.form.redactor = "redactor";
            let { data } = await this.$http.HallFunConfig.PostStopNotice(
              this.form
            );
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.initdata({ page: this.currentPage, limit: this.limit });
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            }else{
               this.$message({
                type: "warning",
                message: "保存失败"
              });
            }
          } else if (type === "更新停服公告") {
            console.log(this.form);

            let { data } = await this.$http.HallFunConfig.PutStopNotice(
              this.form
            );
            // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.initdata({ page: this.currentPage, limit: this.limit });
  
              this.loading = false;
              this.$message({
                type: "success",
                message: "编辑成功!"
              });
            } else {
              this.loading = false;
              this.$message({
                type: "warning",
                message: "编辑失败"
              });
            }
          }

          this.editForm("添加停服公告", false, {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //表单返回
    back() {
      this.editForm("添加停服公告", false, {});
    },

    editForm(title, visible, form) {
      this.title = title;
      this.visible = visible;
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
      let hours =
        myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours();
      let minutes =
        myDate.getMinutes() < 10
          ? "0" + myDate.getMinutes()
          : myDate.getMinutes();
      let seconds =
        myDate.getSeconds() < 10
          ? "0" + myDate.getSeconds()
          : myDate.getSeconds();
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    data(time) {
      let long1 = Date.parse(time);
      let long2 = new Date(long1).getTime();
      return long2;
    },

    async initdata(params) {
      let { data } = await this.$http.HallFunConfig.GetStopNotice(params);
      this.tableData = data.data;
      this.total = data.total;
      this.tableData.forEach(item => {
        item.start_time = this.initTime(item.start_time * 1000);
        item.end_time = this.initTime(item.end_time * 1000);
      });
      // console.log(localdata);
      console.log(data.data);
    }
  }
};
</script>

<style lang="less" scoped>
#stopNotice {
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

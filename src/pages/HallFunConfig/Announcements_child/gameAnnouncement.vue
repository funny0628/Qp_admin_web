<template>
  <div id="gameAnnouncement">
    <div class="title">
      <div class="botton">
        <span @click="add">添加</span>
      </div>
      标题 <el-input style="width:200px" v-model="input"></el-input>
      <span @click="search">查找</span>
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
          prop="topuptype"
          label="id"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="maxamount"
          label="公告标题"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="minamount"
          label="标签"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="paynode"
          label="公告开始时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="effect"
          label="公告结束时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="recommend"
          label="触发类型"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="operation"
          label="触发内容"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="operationtime"
          label="状态"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="change"
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <!-- form表单 -->
    <div class="dialog">
      <el-dialog title="记录" :visible.sync="visiblity">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="公告标题" prop="sort">
            <el-input placeholder="邮件标题" v-model="form.sort"></el-input>
          </el-form-item>
          <el-form-item label="公告类型" :label-width="formLabelWidth">
            <el-select v-model="form.aa">
              <el-option label="文字" value="wenzi"></el-option>
              <el-option label="图片" value="tupian"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.aa === '文字'" label="公告简介" prop="name">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.jianjie"
            ></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="channel">
            <el-select v-model="form.bb">
              <el-option label="没有标签" value="meiyoubaioqian"></el-option>
              <el-option label="新" value="xin"></el-option>
              <el-option label="热门" value="remen"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间" prop="common">
            <el-input v-model="form.common"></el-input>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="form.paixun"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.zhuangtai">
              <el-option label="展示" value="zhangshi"></el-option>
              <el-option label="隐藏" value="yincang"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.aa === '图片'" label="公告图片">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit(form)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      currentPage4: 1,
      visiblity: false,
      tableData: [
        {
          topuptype: "充值类型",
          maxamount: "自定义最大金额",
          minamount: "可自定义最小金额",
          paynode: "支付备注",
          effect: "是否生效",
          recommend: "是否推荐",
          operation: "操作者",
          operationtime: "操作时间"
        },
        {
          topuptype: "充值类型",
          maxamount: "自定义最大金额",
          minamount: "可自定义最小金额",
          paynode: "支付备注",
          effect: "是否生效",
          recommend: "是否推荐",
          operation: "操作者",
          operationtime: "操作时间"
        }
      ],
      form: {
        sort: "",
        jianjie:"",
        aa: "文字",
        bb: "没有标签",
        paixun: "",
        zhuangtai: "展示",
        name: "",
        channel: "",
        type: "支付宝",
        custom: "固定金额",
        common: "",
        remark: "0",
        maxcustom: "0",
        mincustom: "0",
        recommend: "不推荐",
        operant: "不生效"
      },
      rules: {
        sort: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        channel: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        common: [{ required: true, message: "充值金额不合法", trigger: "blur" }]
      }
    };
  },
  methods: {
    add() {
      this.visiblity = true;
    },
    search() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    onSubmitO() {},
    dialogFormVisible() {
      this.visiblity = false;
    },

    handleEdit(x) {
      // console.log(x);
      this.$store.commit("EDIT_ITEM", x);
      this.$store.commit("SHOW_FORM", {
        show: true,
        type: 1
      });
    },
    Change() {
      this.$store.commit("SHOW_FORM", {
        show: false,
        type: 0
      });
    },
    handleDelete(y) {
      // console.log(y);
      this.$confirm("确认删除吗？", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //###--------------------------------------------------------------------
          //1.只作为把页面的数据删除
          this.tableData.splice(y, 1);
          //2.发送请求在后台删除数据

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          // console.log('点击了取消');

          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
#gameAnnouncement {
  background-color: #f2f2f2;
  .title {
    padding: 20px 10px;
    box-sizing: border-box;
    span {
      display: inline-block;
      color: #fff;
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #009688;
      &:hover {
        background-color: #30a89d;
      }
    }
  }
  .table {
    margin-top: 10px;
  }
}
</style>

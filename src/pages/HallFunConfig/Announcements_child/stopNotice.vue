<template>
  <div id="stopNotice">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <span class="del" @click="del">删除</span>
        <span @click="add">添加</span>
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
        <el-table-column sortable prop="ID" label="ID" align="center">
        </el-table-column>

        <el-table-column
          prop="payname"
          label="支付名称"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="channel"
          label="支付渠道"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="paytype"
          label="支付方式"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="amount"
          label="固定金额"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="amount"
          label="固定金额"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="change"
          label="XX"
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
      <el-dialog :title="title" :visible.sync="visiblity">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="公告标题">
            <el-input
              v-model="form.paixun"
              placeholder="请输入停服公告标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="公告内容" prop="sort">
            <el-input
              type="textarea"
              placeholder="请输入公告内容"
              v-model="form.sort"
            ></el-input>
          </el-form-item>
           <el-form-item label="公告落款">
            <el-input
              v-model="form.paixun"
              placeholder="请输入公告落款"
            ></el-input>
          </el-form-item>
           <el-form-item label="通知时间">
            <el-input
              v-model="form.paixun"
              placeholder="请输入通知时间"
            ></el-input>
            <span>格式：2018年10月20日</span>
          </el-form-item>
          <el-form-item label="时间间隔(秒)">
            <el-input
              v-model="form.paixun"
              placeholder="请输入间隔时间xx秒"
            ></el-input>
          </el-form-item>
          <el-form-item label="循环" prop="name">
            <el-select v-model="form.name">
              <el-option label="按时间" value="按时间"></el-option>
              <el-option label="按日期时间" value="按日期时间"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="channel">
            <el-input
              v-model="form.channel"
              placeholder="请输入播放开始时间"
            ></el-input>
          </el-form-item>

          <el-form-item label="结束时间" prop="channel">
            <el-input
              v-model="form.channel"
              placeholder="请输入播放结束时间"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-top:20px" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit(form)">确 定</el-button>
          <el-button type="primary" @click="back(form)">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderlist: ["ascending", "descending"],
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
        }
      ],
      rules: {},
      form: {
        sort: "",
        jianjie: "",
        aa: "文字",
        bb: "没有标签",
        paixun: "",
        zhuangtai: "展示",
        name: "按时间",
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

      currentPage4: 1,
      visiblity: false,
      title: "添加停服公告",
      selList:[],
    };
  },
  methods: {
    del() {
      //勾选需要删除的项目批量删除
      if (this.selList.length != 0) {
        //###1.删除dom的数据
        //2.删除后台的数据
        console.log("已经有数据了");
      } else {
        this.$message("请选择需要删除的数据");
      }
    },
    add() {
      this.visiblity = true;
      this.title = "添加停服公告";
    },

    handleSelectionChange(sel) {
      this.selList = sel
      console.log(sel);
      
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleEdit() {
      this.visiblity = true;
      this.title = "更新停服公告";
    },
    handleDelete() {
      this.$confirm("确认删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    onSubmit() {
      //表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          //1.将form数据传递到paylist,新增到table中先显示一个dom
          this.$store.commit("ADD_PAYITEM", this.form);
          //2.发送请求追加数据到后台-------------------------------------------------------------

          // console.log("发送请求");

          //3.关闭新增的弹框
          this.forminit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    back() {
      this.forminit();
    },
    forminit() {
      this.visiblity = false;
      //重置form表单的数据
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
      &.del {
        background-color: #ff5722;
        &:hover {
          background-color: #ff794e;
        }
      }
      &.send {
        width: 140px;
      }
    }
  }
  .table {
    margin-top: 10px;
  }
}
</style>

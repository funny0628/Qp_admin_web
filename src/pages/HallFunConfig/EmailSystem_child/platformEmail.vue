<template>
  <div id="platformEmail">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <span @click="writeEmail">写邮件</span>
      </div>
      ID
      <el-input style="margin-top:10px;width:200px;" v-model="input"></el-input>
      收件人
      <el-input style="margin-top:10px;width:200px;" v-model="input"></el-input>
      标题
      <el-input style="margin-top:10px;width:200px;" v-model="input"></el-input>
      状态
      <el-select
        style="margin-top:10px;width:200px;"
        v-model="value"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span class="search" @click="search">查找</span>
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
          prop="topuptype"
          label="日记序号"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="maxamount"
          label="时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="minamount"
          label="操作人"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="paynode"
          label="收件人"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="effect"
          label="邮件标题"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="recommend"
          label="邮件道具(金币)"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="operation"
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
          width="200px"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="detail(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="send(scope.$index, scope.row)"
              >发送邮件</el-button
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
        <el-form
          :disabled="disabled"
          ref="form"
          :rules="rules"
          :model="form"
          label-width="120px"
        >
          <el-form-item label="收件人ID" prop="common">
            <el-input
              placeholder="多个以逗号分隔 如: 1,2,3,4"
              v-model="form.common"
            ></el-input>
          </el-form-item>
          <el-form-item label="发件人昵称" prop="common">
            <el-input placeholder="发件人昵称" v-model="form.common"></el-input>
          </el-form-item>
          <el-form-item label="邮件标题" prop="common">
            <el-input placeholder="邮件标题" v-model="form.common"></el-input>
          </el-form-item>
          <el-form-item label="邮件内容" prop="name">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.jianjie"
            ></el-input>
          </el-form-item>
          <el-form-item label="金币" prop="common">
            <el-input placeholder="金币" v-model="form.common"></el-input>
          </el-form-item>
        </el-form>
        <div v-if="title != '邮件详情'" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
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
      options: [
        {
          value: "选项1",
          label: "已读"
        },
        {
          value: "选项2",
          label: "未读"
        },
        {
          value: "选项3",
          label: "已经领取"
        },
        {
          value: "选项4",
          label: "未领取"
        },
        {
          value: "选项5",
          label: "待发送"
        }
      ],
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
      value: "",
      currentPage4: 1,
      visiblity: false,
      rules: {
        common: [{ required: true, message: "充值金额不合法", trigger: "blur" }]
      },
      form: {},
      title: "记录",
      disabled: false
    };
  },
  methods: {
    writeEmail() {
      this.init("记录", false);
    },
    search() {},
    handleEdit() {
      this.init("编辑", false);
    },
    detail() {
      (this.rules = {}), this.init("邮件详情", true);
    },
    send() {},
    init(title, disabled) {
      this.visiblity = true;
      this.disabled = disabled;
      this.title = title;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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

<template>
  <div id="payList">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <span @click="del" class="del">删除</span>
        <span @click="add">添加</span>
        <span @click="search">搜索</span>
      </div>
      <el-input
        style="width:200px"
        v-model="input"
        placeholder="请输入支付名称"
        class="el_input"
      ></el-input>
    </div>
    <!-- table -->
    <div class="table">
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
        <el-table-column prop="sort_num" label="排序" align="center">
        </el-table-column>
        <el-table-column
          prop="pay_name"
          label="支付名称"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_channel"
          label="支付渠道"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_way"
          label="支付方式"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="money_num"
          label="固定金额"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="is_diy"
          label="充值类型"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="diy_max"
          label="自定义最大金额"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="diy_min"
          label="可自定义最小金额"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_desc"
          label="支付备注"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="o_status"
          label="是否生效"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="o_activity"
          label="是否推荐"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="op_name"
          label="操作者"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="操作时间"
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
    <!-- form -->
    <div class="form">
      <el-dialog :title="title" :visible.sync="visible">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="显示排序" prop="sort">
            <el-input placeholder="显示排序" v-model="form.sort"></el-input>
          </el-form-item>
          <el-form-item label="支付名称" prop="name">
            <el-input placeholder="支付名称" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="支付渠道(小类)" prop="channel">
            <el-input
              placeholder="支付渠道名称"
              v-model="form.channel"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付方式(大类)">
            <el-select v-model="form.type">
              <el-option label="支付宝" value="zhifubao"></el-option>
              <el-option label="微信" value="weixin"></el-option>
              <el-option label="银联" value="yinlian"></el-option>
              <el-option label="银行卡转账" value="yinhangka"></el-option>
              <el-option label="VIP充值" value="chongzhi"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自定义金额">
            <el-radio-group v-model="form.custom">
              <el-radio label="固定金额"></el-radio>
              <el-radio label="自定义金额"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="form.custom === '自定义金额'"
            label="最大自定义金额"
          >
            <el-input v-model="form.maxcustom"></el-input>
          </el-form-item>
          <el-form-item
            v-if="form.custom === '自定义金额'"
            label="最小自定义金额"
          >
            <el-input v-model="form.mincustom"></el-input>
          </el-form-item>
          <el-form-item label="常用充值金额" prop="common">
            <el-input
              placeholder="请输入充值金额"
              v-model="form.common"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-radio-group v-model="form.recommend">
              <el-radio label="不推荐"></el-radio>
              <el-radio label="推荐"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否生效">
            <el-radio-group v-model="form.operant">
              <el-radio label="不生效"></el-radio>
              <el-radio label="生效中"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
          <el-button @click="dialogFormVisible">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "payList",

  data() {
    return {
      orderlist: ["ascending", "descending"],
      tableData: [
        {
          id: 4,
          pay_name: "pay_name",
          pay_channel: "pay_channel",
          pay_way: 1,
          is_diy: 1,
          money_num: 123,
          diy_max: 20,
          diy_min: 2,
          sort_num: 1,
          pay_desc: "desc",
          o_status: 1,
          o_activity: 12,
          op_name: "op_name",
          status: 1,
          create_time: "2020-03-30 16:05:00",
          update_time: "2020-03-30 16:05:00"
        }
      ],
      currentPage4: 1,
      visible: false,
      title: "添加",
      input: "",
      selectList: [],
      form: {
        sort: "",
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
    handleSelectionChange(sel) {
      this.selectList = sel;
    },
    handleEdit(x) {
      this.editForm("更新", true, x);
    },
    handleDelete() {
      this.$confirm("确认删除吗？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    onSubmit(formName) {
      this.$refs[formName].validate((valid, x) => {
        if (valid) {
          //1.将form数据传递到paylist,新增到table中先显示一个dom
          // console.log(this.form);

          //2.发送请求追加数据到后台-------------------------------------------------------------

          // console.log("发送请求");

          //3.关闭新增的弹框
          this.editForm("添加", false, {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dialogFormVisible() {
      this.editForm("添加", false, {});
    },

    add() {
      this.editForm("添加", true, {});
    },
    del() {
      //勾选需要删除的项目批量删除
      if (this.selectList.length != 0) {
        //###1.删除dom的数据
        //2.删除后台的数据
        console.log("已经有数据了");
      } else {
        this.$message("请选择需要删除的数据");
      }
    },
    search() {
      //获取表格中的支付名称,点击搜索
    },

    editForm(title, visible, form) {
      this.title = title;
      this.visible = visible;
      this.form = form;
    }
  }
};
</script>

<style lang="less" scoped>
#payList {
  background-color: #f2f2f2;

  .title {
    height: 120px;
    padding: 20px 10px 0px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .botton {
      display: flex;
      span {
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-right: 2px;
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
      }
    }
    .el_input {
      margin-top: 10px;
    }
  }
  .table {
    padding: 5px 10px;
    box-sizing: border-box;
  }
}
</style>

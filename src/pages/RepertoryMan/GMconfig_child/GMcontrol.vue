<template>
  <div id="GMcontrol-main">
    <div>
      <el-button type="primary" size="medium" @click="add">添加</el-button>
    </div>
    玩家id<el-input
      v-model="format.play_id"
      placeholder="请输入玩家id"
      size="medium"
      clearable
      style="width:200px;margin-top:20px"
    ></el-input>
    状态<el-select
      v-model="format.status"
      placeholder="请选择"
      clearable
      size="medium"
    >
      <el-option
        v-for="item in platforms"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    控制金额<el-select
      v-model="format.control_money"
      placeholder="请选择"
      clearable
      size="medium"
    >
      <el-option
        v-for="item in platforms"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-button type="primary" size="medium" @click="search">查找</el-button>

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
      >
        <el-table-column sortable prop="id" label="玩家昵称" align="center">
        </el-table-column>
        <el-table-column prop="sort_num" label="玩家Id" align="center">
        </el-table-column>
        <el-table-column
          prop="pay_name"
          label="控制金额"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_channel"
          label="当前个人库存值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_way"
          label="状态"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="money_num"
          label="权重值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="is_diy"
          label="输钱概率(%)"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="diy_max"
          label="赢钱概率(%)"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="diy_min"
          label="创建类型"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_desc"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="o_status"
          label="最后修人员"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="change"
          label="操作"
          align="center"
          show-overflow-tooltip
          width="230px"
        >
          <template slot-scope="scope">
            <el-button size="mini"   type="danger" @click="handleStop(scope.row, 'form')"
              >停止</el-button
            >
            <el-button size="mini" @click="handleEdit(scope.row, 'form')"
              >编辑</el-button
            >
            <el-button
              size="mini"
            
              @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="total > 10"
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

<!-- 添加和编辑 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth"  prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="控制金额" :label-width="formLabelWidth"  prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权重值" :label-width="formLabelWidth"  prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="输钱概率(%)" :label-width="formLabelWidth"  prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="赢钱概率(%)" :label-width="formLabelWidth"  prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog title="邮件详情" :visible.sync="visible">
      <el-table
        border
        highlight-current-row
        ref="multipleTable"
        :data="tableDialog"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column  prop="id" label="时间" align="center">
        </el-table-column>
        <el-table-column prop="sort_num" label="创建类型" align="center">
        </el-table-column>
        <el-table-column
          prop="pay_name"
          label="个人库存变化量"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_channel"
          label="变化前个人库存值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_way"
          label="变化后个人库存值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          
          prop="money_num"
          label="变化前权重值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          
          prop="is_diy"
          label="变化后权重值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

      </el-table>
    
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "GMcontrol",

  data() {
    return {
      orderlist: ["ascending", "descending"],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      tableData: [1],
      currentPage: 1,
      limit: 10,
      total: "",
      title: "添加控制名单",
      platforms: [
        { value: 1, label: "全部" },
        { value: 2, label: "审核中" },
        { value: 3, label: "已拒绝" },
        { value: 4, label: "已关闭" },
        { value: 5, label: "已完成" },
        { value: 6, label: "申请中" }
      ],
      format: {
        play_id: "",
        status: "",
        control_money: ""
      },

      form: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "必填项不可以为空,只能输入数字",
            trigger: "blur"
          }
        ]
      },
      tableDialog:[],
      visible:false,
    };
  },
  methods: {
    /**搜索*/
    add() {
      this.dialogFormVisible = true;
      this.title = "添加控制名单";
    },
    search() {},

    //表格停止
    handleStop() {

      //停止接口
    },

    //表格编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.title = "编辑";
    },

    //表格详情
    handleDetail() {
      this.visible = true
    },

    //页容量变化
    handleSizeChange() {},

    //页码变化
    handleCurrentChange() {},

    //表单提交
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid, x) => {
        if (valid) {
          //提交请求
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }

    // handleDelete(index, row) {
    //   console.log(row);
    //   const ids = row.id.toString();
    //   console.log(ids);
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(
    //       this.$message({
    //         type: "success",
    //         message: res.data.msg
    //       })
    //     )
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: res.data.msg
    //       });
    //     });
    // }
  }
};
</script>

<style scoped lang="less">
#GMcontrol-main .table {
  margin-top: 20px;
}

</style>

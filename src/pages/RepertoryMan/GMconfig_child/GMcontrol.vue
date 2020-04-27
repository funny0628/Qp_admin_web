<template>
  <div id="GMcontrol-main">
    <div>
      <el-button type="primary" size="medium" @click="add">添加</el-button>
    </div>
    <el-input
      v-model="format.play_id"
      placeholder="请输入玩家id"
      size="medium"
      clearable
      style="width:200px;margin-top:20px"
    ></el-input>
    <el-select
      v-model="format.status"
      placeholder="请选择状态"
      clearable
      size="medium"
    >
      <el-option
        v-for="item in opationStatus"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-select
      v-model="format.control_money"
      placeholder="请选择控制金额"
      clearable
      size="medium"
    >
      <el-option
        v-for="item in opationAmount"
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
        <el-table-column  prop="id" label="玩家昵称" align="center">
        </el-table-column>
        <el-table-column prop="uid" label="玩家Id" align="center">
        </el-table-column>
        <el-table-column
          prop="control_amount"
          label="控制金额(分)"
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
          prop="curr_status"
          label="状态"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="weights"
          label="权重值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="lose_rate"
          label="输钱概率(%)"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          sortable
          prop="win_rate"
          label="赢钱概率(%)"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="creation_type"
          label="创建类型"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="create_at"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="editor"
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
import DeepData from "../../../assets/js/formate.js";
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
      opationStatus: [
        { value: 2, label: "全部" },
        { value: 0, label: "终止" },
        { value: 1, label: "执行" },
      ],
      opationAmount: [
        { value: 1, label: "全部" },
        { value: 2, label: "正数" },
        { value: 3, label: "负数" },
      ],
      format: {
        play_id: "",
        status: "全部",
        control_money: "全部"
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
  created() {
    this.initData()
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
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;
      this.initData()
    },

    //页码变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum
      this.initData()
    },

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
    },

    GetData(){
      this.initData({
        page:this.currentPage,
        limit:this.limit,
        uid:this.format.play_id,
        status:this.format.status,
        amount	:this.format.control_money,
      })
    },

    formatData(res){
      res.forEach((item)=>{
        item.curr_status = item.curr_status === 1 ? '启用' : '终止'
      })
      return res
    },

    async initData(params){
      let {data} = await this.$http.OperationMan.GetGameControl(params)
      console.log(data);
      let res = DeepData(data.data)
      console.log(res);
      
      this.tableData =this.formatData(res);
      this.total = data.total
      
    },

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

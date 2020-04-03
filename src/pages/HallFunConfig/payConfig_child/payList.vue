<template>
  <div id="payList">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <el-button type="danger" @click="del">删除</el-button>
        <el-button type="primary" @click="add">添加</el-button>
        <el-button type="primary" @click="search">搜索</el-button>
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
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- form -->
    <div class="form">
      <el-dialog :title="title" :visible.sync="visible">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="显示排序" prop="sort_num">
            <el-input placeholder="显示排序" v-model="form.sort_num"></el-input>
          </el-form-item>
          <el-form-item label="支付名称" prop="pay_name">
            <el-input placeholder="支付名称" v-model="form.pay_name"></el-input>
          </el-form-item>
          <el-form-item label="支付渠道(小类)" prop="pay_channel">
            <el-input
              placeholder="支付渠道名称"
              v-model="form.pay_channel"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付方式(大类)" prop="pay_way">
            <el-select v-model="form.pay_way">
              <el-option label="支付宝" :value="1"></el-option>
              <el-option label="微信" :value="2"></el-option>
              <el-option label="银联" :value="3"></el-option>
              <el-option label="银行卡转账" :value="4"></el-option>
              <el-option label="VIP充值" :value="5"1</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自定义金额" prop="is_diy">

             <el-radio-group v-model="form.is_diy">
              <el-radio :label='1' >固定金额</el-radio>
              <el-radio :label='2' >自定义金额</el-radio>
            </el-radio-group>

          </el-form-item>
          <p  v-if="form.is_diy === 2">
            <el-form-item
           
            label="最大自定义金额"
            prop="diy_max"
          >
            <el-input v-model="form.diy_max"></el-input>
          </el-form-item>
          <el-form-item
           
            label="最小自定义金额"
            prop="diy_min"
          >
            <el-input v-model="form.diy_min"></el-input>
          </el-form-item>
          </p>
     
          <el-form-item label="常用充值金额" prop="money_num">
            <el-input
              placeholder="请输入充值金额"
              v-model="form.money_num"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="pay_desc">
            <el-input v-model="form.pay_desc"></el-input>
          </el-form-item>
          <el-form-item label="是否推荐" prop="o_activity">
            <el-radio-group v-model="form.o_activity">
              <el-radio label="不推荐" :value='1'></el-radio>
              <el-radio label="推荐" :value='2'></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否生效" prop="o_status">
            <el-radio-group v-model="form.o_status">
              <el-radio label="不生效" :value='1'></el-radio>
              <el-radio label="生效中" :value='2'></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form', title)"
            >确 定</el-button
          >
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
        id: '',
        pay_name: "名称",
        pay_channel: "渠道",
        pay_way: '支付宝',
        is_diy: 1 ,
        money_num: '金额',
        diy_max: '最大',
        diy_min: '最小',
        sort_num: '排序',
        pay_desc: "备注",
        o_status: '不生效',
        o_activity: '推荐',
        op_name: "xx",

      },
      ],
      total: 0,
      currentPage: 1,
      limit: 10,
      visible: false,
      title: "添加",
      input: "",
      selectList: [],
      form: {
        id: '',
        pay_name: "",
        pay_channel: "",
        pay_way: '',
        is_diy: '',
        money_num: '',
        diy_max: '',
        diy_min: '',
        sort_num: '',
        pay_desc: "",
        o_status: '',
        o_activity: '',
        op_name: "",

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
  created() {
    this.initdata({ page: this.currentPage, limit: this.limit });
  },

  methods: {
    handleSelectionChange(sel) {
      this.selectList = sel;
    },
    handleEdit(x) {
      console.log(x);
      this.editForm("更新", true, {...x});
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
    onSubmit(formName, type) {
      this.$refs[formName].validate(async (valid, x) => {
        if (valid) {
          if (type === "添加") {

             let { data } = await this.$http.HallFunConfig.PostPaylist(
              this.form
            );
            console.log(data);
            
            //  let fres = this.formateData(data.data);
            // this.tableData = this.tableData.concat(fres);

          } else if (type === "更新") {
            console.log(this.form);
             let resdata = this.formateNum(this.form);
             console.log(resdata);
             
             //发送请求到后台-------------------------------------------------------
              let { data } = await this.$http.HallFunConfig.PutPaylist(
              resdata
            );
            console.log(data);
            
            // let fres = this.formateData(data.data);

             //把this.form数据追加到table中,视觉欺骗添加到dom
            // let newtable = [];
            // this.tableData.forEach(item => {
            //   if (item.id === fres[0].id) {
            //     item = { ...fres[0] };
            //   }
            //   newtable.push(item);
            // });
            // this.tableData = newtable;
            

          }
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
      this.initForm();
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
    },
    formateData(res) {
      res.forEach(item => {
        item.is_diy = item.is_diy === 1 ? "固定" : "可自定义";
        item.o_status = item.o_status === 1 ? "不生效" : "生效";
        item.o_activity = item.o_activity === 1 ? "不推荐" : "推荐";
        switch (item.pay_way) {
          case 1:
            item.pay_way = "支付宝";
            break;
          case 2:
            item.pay_way = "微信";
            break;
          case 3:
            item.pay_way = "银联";
            break;
          case 4:
            item.pay_way = "银行转账";
            break;
          case 5:
            item.pay_way = "VIP充值";
            break;
          default:
            break;
        }
      });
      return res;
    },
    formateNum(item) {
      if (
        typeof item.is_diy === "number" &&
        typeof item.o_status === "number" &&
        typeof item.o_activity === "number" &&
        typeof item.pay_way === "number"
      )
        return;

      item.is_diy = item.is_diy === "固定" ? 1 : 2;
      item.o_status = item.o_status === "不生效" ? 1 : 2;
      item.o_activity = item.o_activity === "不推荐" ? 1 : 2;
      switch (item.pay_way) {
        case "支付宝":
          item.pay_way = 1;
          break;
        case "微信":
          item.pay_way = 2;
          break;
        case "银联":
          item.pay_way = 3;
          break;
        case "银行转账":
          item.pay_way = 4;
          break;
        case "VIP充值":
          item.pay_way = 5;
          break;
        default:
          break;
      }
    },
    async initdata(params) {
      let { data } = await this.$http.HallFunConfig.GetPaylist(params);
      let localdata = this.formateData(data.data);
      this.tableData = localdata;
      this.total = data.total;
      // console.log(localdata);
      console.log(data);
    },
    initForm() {
      this.form = {
        sort: "",
        name: "",
        channel: "",
        type: "",
        custom: 1,
        common: "",
        remark: "",
        maxcustom: "",
        mincustom: "",
        recommend: "",
        operant: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
#payList {
  background-color: #f2f2f2;

  .title {
    height: 120px;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;

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

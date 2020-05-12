<template>
  <div id="payList">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <el-button type="danger" @click="del">删除</el-button>
        <el-button v-has="'add_pay_record'" type="primary" @click="add('form')">添加</el-button>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <el-input
        style="width:200px"
        v-model="searchinput"
        placeholder="请输入支付名称"
        class="el_input"
      ></el-input>
    </div>
    <!-- table -->
    <div class="table" v-has="'pay_records'">
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
            <el-button v-has="'modify_pay_record'" size="mini" @click="handleEdit(scope.row,'form')"
              >编辑</el-button
            >
            <el-button
            v-has="'delete_pay_record'"
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
        v-if="total > 10"
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
    <!-- form -->
    <div class="form">
      <el-dialog :title="title" :visible.sync="visible" :destroy-on-close="true">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="显示排序" prop="sort_id">
            <el-input placeholder="显示排序" v-model="form.sort_id"></el-input>
            <span>排序只可以为数字</span>
          </el-form-item>
          <el-form-item label="支付名称" prop="pay_name">
            <el-input maxlength="5" placeholder="支付名称" v-model="form.pay_name"></el-input>
          </el-form-item>
          <el-form-item label="支付渠道(小类)" prop="pay_channel"> 
             <el-select v-model="form.pay_channel">
               <el-option
                  v-for="item in SmopaObj"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式(大类)" prop="pay_way">
            <el-select v-model="form.pay_way">
               <el-option
                  v-for="item in opaObj"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
            </el-select>
          </el-form-item>
           <el-form-item v-if="form.pay_way === 'unioncard'" label="转账银行卡配置" prop="">
                <el-row>
                  <el-col :span="12"> 
                    收款人: <el-input
                              style="width:200px;margin-top:20px"
                              v-model="pay_info.rece_name"
                              placeholder="收款人"
                              class="el_input"
                            ></el-input>
                  </el-col>
                  <el-col :span="12"> 
                    卡号: <el-input
                            style="width:200px;margin-top:20px"
                            v-model="pay_info.rece_card_id"
                            placeholder="卡号"
                            class="el_input"
                          ></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"> 
                     银行名称: <el-input
                                style="width:200px;margin-top:20px"
                                v-model="pay_info.rece_bank_name"
                                placeholder="银行名称"
                                class="el_input"
                              ></el-input>
                  </el-col>
                  <el-col :span="12"> 
                     银行支行: <el-input
                                style="width:200px;margin-top:20px"
                                v-model="pay_info.rece_bank_subname"
                                placeholder="银行支行"
                                class="el_input"
                              ></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"> 
                     付款时限: <el-input
                                style="width:200px;margin-top:20px"
                                v-model="pay_info.rece_time_limit"
                                placeholder="付款时限"
                                class="el_input"
                              ></el-input>
                  </el-col>
                  <el-col :span="12"> 
                  </el-col>
                </el-row>
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
            <span>金额只可以为数字</span>
          </el-form-item>
          <el-form-item
           
            label="最小自定义金额"
            prop="diy_min"
          >
            <el-input v-model="form.diy_min"></el-input>
             <span>金额只可以为数字</span>
          </el-form-item>
          </p>
     
          <el-form-item label="常用充值金额" prop="money_list">
            <el-input
              placeholder="请输入充值金额"
              v-model="form.money_list"
            ></el-input>
             <span>金额只可以为数字</span>
          </el-form-item>
          <el-form-item label="备注" prop="pay_desc">
            <el-input v-model="form.pay_desc"></el-input>
          </el-form-item>
          <el-form-item label="是否推荐" prop="o_activity">
            <el-radio-group v-model="form.o_activity">
              <el-radio :label="1">不推荐</el-radio>
              <el-radio :label="2" >推荐</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否生效" prop="o_status">
            <el-radio-group v-model="form.o_status">
              <el-radio :label="1" >不生效</el-radio>
              <el-radio :label="2" >生效中</el-radio>
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
import DeepData from '../../../assets/js/formate.js'
export default {
  name: "pay_list",
  data() {
    return {
      orderlist: ["ascending", "descending"],
      tableData: [],
      total: 0,
      currentPage: 1,
      limit: 10,
      visible: false,
      title: "添加",
      searchinput: "",
      selectList: [],
      form: {
        id: '',
        pay_name: "",
        pay_channel: "",
        pay_way: '',
        is_diy: '',
        money_list: '',
        diy_max: '',
        diy_min: '',
        sort_id: '',
        pay_desc: "",
        o_status: '',
        o_activity: '',
        op_name: "op_name",
        pay_info:{},
      },
      rules: {
        sort_id: [
          { required: true, message: "必填项不可以为空,只能输入数字", trigger: "blur" }
        ],
        pay_name: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        pay_channel: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        pay_way: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
        pay_info: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
        is_diy: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
        diy_max: [{ required: true, message: "必填项不可以为空,只能输入数字", trigger: "blur" }],
        diy_min: [{ required: true, message: "必填项不可以为空,只能输入数字", trigger: "blur" }],
        money_list: [{ required: true, message: "必填项不可以为空,只能输入数字", trigger: "blur" }],
        pay_desc: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
        o_activity: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
        o_status: [{ required: true, message: "必填项不可以为空", trigger: "blur" }],
     
      },
      opaObj:[],
      SmopaObj:[],
      pay_info:{
        rece_name:'',
        rece_card_id:'',
        rece_bank_name:'',
        rece_bank_subname:'',
        rece_time_limit:'',
      },
      titleData:[
        {
          prop:"id",
          label:"ID",
        },
        {
          prop:"sort_id",
          label:"排序",
        },
        {
          prop:"pay_name",
          label:"支付名称",
        },
        {
          prop:"pay_channel",
          label:"支付渠道",
        },
        {
          prop:"pay_way",
          label:"支付方式",
        },
        {
          prop:"money_list",
          label:"固定充值金额",
        },
        {
          prop:"is_diy",
          label:"充值类型",
        },
        {
          prop:"diy_max",
          label:"自定义最大金额",
        },
        {
          prop:"diy_min",
          label:"可自定义最小金额",
        },
        {
          prop:"pay_desc",
          label:"支付备注",
        },
        {
          prop:"o_status",
          label:"是否生效",
        },
        {
          prop:"o_activity",
          label:"是否推荐",
        },
        {
          prop:"op_name",
          label:"操作者",
        },
        {
          prop:"created_at",
          label:"操作时间",
        },
      ]
    };
  },
  created() {
    this.initdata({ page: this.currentPage, limit: this.limit,title:this.searchinput });
    this.initopa()
    this.initSopa()
  },

  methods: {
    //表格选中项
    handleSelectionChange(sel) {
      let idList = sel.map(item => item.id)
      this.selectList = idList;
    },

    // 表格编辑
    handleEdit(row,formName) {
      
      if(row.pay_way === 'unioncard'){
        this.pay_info = JSON.parse(row.pay_info)
      }
      let reg = /[\u4e00-\u9fa5]/
      if(reg.test(row.pay_channel)){
        this.SmopaObj.forEach((item)=>{
          if(item.label === row.pay_channel){
            row.pay_channel = item.value
          }
        })
      }
      if(reg.test(row.pay_way)){
        this.opaObj.forEach((item)=>{
          if(item.label === row.pay_way){
            row.pay_way = item.value
          }
        })
      }
      this.editForm("更新", true,this.formateNum(DeepData(row)));
    },

    //表格删除
    handleDelete(x,row) {
     this.$confirm("确认删除吗？", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data } = await this.$http.HallFunConfig.DeletePaylist({
            id: row.id
          });
          if(data.code === 1){
            this.currentPage = 1;
            this.limit = 10
            this.initdata({ page: this.currentPage, limit: this.limit, title:this.searchinput });
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //页容量发生变化
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;
      this.initdata({ page: this.currentPage, limit: this.limit, title:this.searchinput });
    },

    //页码改变
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.initdata({ page: this.currentPage, limit: this.limit, title:this.searchinput });
    },


    //表单提交
    onSubmit(formName, type) {
      this.$refs[formName].validate(async (valid, x) => {
        if (valid) {
            this.form.op_name = "op_name"
            this.form.pay_info = JSON.stringify(this.pay_info)
          if (type === "添加") {
            let { data } = await this.$http.HallFunConfig.PostPaylist(
              this.form
            );
            console.log(data);
            
            if(data.code === 1 && data.msg === 'ok'){
              this.initdata({ page: this.currentPage, limit: this.limit, title: this.searchinput });
              this.$message({
                type: "success",
                message: "新增成功!"
              });
            }else{
               this.$message({
                type: "warning",
                message: "新增失败!"
              });
            }
          } else if (type === "更新") {
            delete this.form.created_at
            delete this.form.updated_at
            console.log(this.form);
             //发送请求到后台-------------------------------------------------------
              let { data } = await this.$http.HallFunConfig.PutPaylist(
              this.form
            );
            if(data.code === 1 && data.msg === 'ok'){
              this.initdata({ page: this.currentPage, limit: this.limit, title: this.searchinput });
               this.$message({
                type: "success",
                message: "更新成功!"
              });
            }else{
               this.$message({
                type: "warning",
                message: "更新失败!"
              });
            }
          }
           this.pay_info = {
              rece_name:'',
              rece_card_id:'',
              rece_bank_name:'',
              rece_bank_subname:'',
              rece_time_limit:'',
           }
          this.editForm("添加", false, {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //表单关闭
    dialogFormVisible() {
      this.editForm("添加", false, {});
    },

    //添加
    add(formName) {
      this.editForm("添加", true, {});
    },

    //表格批量删除
    async del() {
      //勾选需要删除的项目批量删除
      if (this.selectList.length != 0) {
         let str = this.selectList.join();
         this.$confirm("确认删除吗？", "信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          let { data } = await this.$http.HallFunConfig.DeletePaylist({id_list:`(${str})`});
          if(data.code === 1 && data.msg === 'ok'){
            this.initdata({ page: this.currentPage, limit: this.limit , title:this.searchinput});
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

    //搜索
    search() {
      //获取表格中的支付名称,点击搜索
       if (this.searchinput === "") {
        this.$message({
          type: "warning",
          message: "请输入你要搜索的支付名称!"
        });
      }
        this.currentPage = 1;
        this.limit = 10;
       this.initdata({ page: this.currentPage, limit: this.limit , title:this.searchinput});
    },

    editForm(title, visible, form) {
      this.title = title;
      this.visible = visible;
      this.form = form;
    },

    formateData(res) {
      if(Array.isArray(res)){
        res.forEach(item => {
          this.formate(item)
        });
      }else{
        this.formate(res)
      }
      return res;
    },

    //十位时间戳转格式事件
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },

    formate(item){
        item.is_diy = item.is_diy === 1 ? "固定" : "可自定义";
        item.o_status = item.o_status === 1 ? "不生效" : "生效";
        item.o_activity = item.o_activity === 1 ? "不推荐" : "推荐";
        item.created_at  = this.timestampToTime(item.created_at)
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
      return item;
    },

    async initdata(params) {
      //列表数据
      let { data } = await this.$http.HallFunConfig.GetPaylist(params);
      let localdata = this.formateData(DeepData(data.data));
      this.tableData = localdata;
      this.total = data.total;
    },
    
    async initopa(){
        //支付方式数据
      let resdata = await this.$http.HallFunConfig.GetNameLiat({type_id:2});
      let opation = resdata.data.data[0]
      let opaObj =[]
      Object.keys(opation).forEach((item)=>{
        opaObj.push({label:opation[item],value:item})
      })
      this.opaObj = opaObj
      console.log(this.opaObj);
    },
    async initSopa(){
      //支付小类数据
      let Smdata = await this.$http.HallFunConfig.GetNameLiat({type_id:9});
      let Smopation = Smdata.data.data[0]
      let SmopaObj =[]
      Object.keys(Smopation).forEach((item)=>{
        SmopaObj.push({label:Smopation[item],value:item})
      })
      this.SmopaObj = SmopaObj
      console.log(this.SmopaObj);
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

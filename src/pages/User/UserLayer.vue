<template>
  <div id="UserLayer-main">
    <input-area>
      <permission-button :action="ActionType.ADD" @click="handelAddClick()">
        <el-button type="primary" size="medium">添加条件</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template
              v-if="['user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(scope.prop) >= 0"
            >
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handeClick(btn,scope.row)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!-- 新增、修改 -->
    <el-dialog :title="dialogTitleType" :visible.sync="dialogVisible" width="30%">
      <el-form :model="dataForm" ref="dataForm">
        <el-form-item label="层级名称" :label-width="labelWidth" prop="hierarchy_name">
          <el-input autocomplete="off" v-model="dataForm.hierarchy_name"></el-input>
        </el-form-item>
        <el-form-item label="充值金额" :label-width="labelWidth" prop="up_amount">
          <el-input autocomplete="off" v-model="dataForm.up_amount"></el-input>
        </el-form-item>
        <el-form-item label="充值笔数" :label-width="labelWidth" prop="up_number">
          <el-input autocomplete="off" v-model="dataForm.up_number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAddClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PageInfo from "../../plugin/script/common/PageInfo";
import UserHandler from '../../script/handlers/UserHandler'
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "UserLayer",
  extends: BaseIframe,
  components: {InfoTableItem, InputArea, PermissionButton, InfoTable },
  data() {
    return {
      /* table */
      tableStyle: [
        { label: "层级ID", prop: "vip", width: "" },
        { label: "层级名称", prop: "vipname", width: "" },
        { label: "充值金额", prop: "pay_sum", width: "" },
        { label: "充值笔数", prop: "pay_count", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      //弹窗数据
      dialogTitleType: "",
      dialogVisible: false,
      labelWidth: "70px",
      dataForm: {
        vipname: "", //层级名称
        pay_sum: "", //充值金额
        pay_count: "" //充值笔数
      }
    };
  },
  methods: {
    search() {},
    handelAddClick() {
      this.dialogTitleType = "新增用户分层";
      this.dialogVisible = true;
    },
    /* edit */
    handeClick(btn,row) {
      if (btn.type === "edit") {
        this.dialogTitleType = "修改用户分层";
        this.dialogVisible = true;
        this.dataForm.vipname = row.vipname;
        this.dataForm.pay_sum = row.pay_sum;
        this.dataForm.pay_count = row.pay_count;
      }
    },
    vip_list(){
      UserHandler.vip_list().promise.then(res=>{
        console.log(res);
        if(Number(res.code) === 200){
          this.records = res.data
        }
        //数据处理
        this.records.map((item)=>{
          item.action = [
            { label: "修改", type: "edit" }
          ]
        })
      })
    },
    //新增、修改
    editAddClick(){
      /*this.$refs.dataForm.validate(valid => {
        if (valid) {
          if (!this.dataForm.tier){
            let data = {
              "tier_name": this.dataForm.hierarchy_name,
              "tier_alias": this.dataForm.alias
            };
            UserHandler.vip_add(data).promise.then(res => {
              // console.log(res)
              if (Number(res.code) === 200) {
                this.$message.success(res.msg)
              }
              this.dialogVisible = false;
              this.getList();
              this.$refs["dataForm"].resetFields();// 失效
            }).catch(e => {
              // 打印一下错误
              console.log(e)
            })
          } else{
            //修改代理分层
            let data = {
              "tier": this.dataForm.tier,
              "tier_name": this.dataForm.hierarchy_name,
              "tier_alias": this.dataForm.alias
            };
            // console.log(data);
            UserHandler.set(data).promise.then(res => {
              if (Number(res.code) === 200) {
                this.$message.success(res.msg)
              }
              this.dialogVisible = false;
              this.$refs["dataForm"].resetFields();// 失效
              this.getList();
            }).catch(e => {
              console.log(e);
            })
          }
        }
      })*/
    }
  },
  mounted() {
    this.vip_list();
  }
};
</script>

<style scoped>
</style>

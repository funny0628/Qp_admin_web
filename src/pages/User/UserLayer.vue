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
        <el-form-item label="层级名称" :label-width="labelWidth" prop="vip_name">
          <el-input autocomplete="off" v-model="dataForm.vip_name"></el-input>
        </el-form-item>
        <el-form-item label="充值金额" :label-width="labelWidth" prop="pay_sum">
          <el-input autocomplete="off" v-model="dataForm.pay_sum"></el-input>
        </el-form-item>
        <el-form-item label="充值笔数" :label-width="labelWidth" prop="pay_count">
          <el-input autocomplete="off" v-model="dataForm.pay_count"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
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
import UserHandler from "../../script/handlers/UserHandler";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "UserLayer",
  extends: BaseIframe,
  components: { InfoTableItem, InputArea, PermissionButton, InfoTable },
  data() {
    return {
      /* table */
      tableStyle: [
        { label: "层级ID", prop: "vip", width: "" },
        { label: "层级名称", prop: "vip_name", width: "" },
        { label: "充值金额", prop: "pay_sum", width: "" },
        { label: "充值笔数", prop: "pay_count", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          vip: "1",
          vip_name: "VIP0",
          pay_sum: "0",
          pay_count: "0",
          action: [{ label: "修改", type: "edit" }]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      //弹窗数据
      dialogTitleType: "",
      dialogVisible: false,
      labelWidth: "70px",
      dataForm: {
        vip: "",
        vip_name: "",
        pay_sum: "",
        pay_count: ""
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
    handeClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogTitleType = "修改用户分层";
        this.dialogVisible = true;
        this.dataForm.vip = row.vip;
        this.dataForm.vip_name = row.vip_name;
        this.dataForm.pay_sum = row.pay_sum;
        this.dataForm.pay_count = row.pay_count;
      }
    },
    //重置表单
    reset(){
      this.$refs["dataForm"].resetFields();
      this.dialogVisible = false;
    },
    //获取用户分层列表
    getVipList() {
      let data = {
        platform_id: 1000
      };
      UserHandler.vip_list(data).promise.then(res => {
        if (Number(res.code) === 200) {
          this.records = res.data;
        }
        //数据处理
        this.records.map(item => {
          item.action = [{ label: "修改", type: "edit" }];
        });
      });
    },
    //新增、修改
    editAddClick() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          console.log(this.dataForm.vip);
          if (!this.dataForm.vip) {
            //通过vip是否为真判断现在是新增还是修改
            let data = {
              platform_id: 1000,
              vip_name: this.dataForm.vip_name,
              pay_count: this.dataForm.pay_count,
              pay_sum: this.dataForm.pay_sum
            };
            this.handelAdd(data);
            this.dialogVisible = false;
            this.getVipList();
            this.$refs["dataForm"].resetFields(); // 失效
            console.log(dataForm)
          } else {
            let data = {
              platform_id: 1000,
              vip: this.dataForm.vip,
              vip_name: this.dataForm.vip_name,
              pay_count: this.dataForm.pay_count,
              pay_sum: this.dataForm.pay_sum
            };
            this.handelEdit(data);
              this.dialogVisible = false;
              this.$refs["dataForm"].resetFields(); // 失效
              this.getVipList();
          }
        }
      });
    },
    //新增方法
    handelAdd(data) {
      UserHandler.vip_add(data)
        .promise.then(rs => {
          if (Number(rs.code) === 200) {
            this.$message.success(rs.msg);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //修改方法
    handelEdit() {
      UserHandler.vip_set(data)
        .promise.then(rs => {
          if (Number(rs.code) === 200) {
            this.$message.success(rs.msg);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getVipList();
  }
};
</script>

<style scoped>
</style>

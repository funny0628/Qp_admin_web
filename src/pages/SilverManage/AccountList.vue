<template>
  <div id="accountlist">
    <div class="input-area">
      <el-input v-model="user_id" placeholder="请输入用户id" style="width:159px;"></el-input>
      <el-input v-model="substage_id" placeholder="请输入子后台ID" style="width:145px;"></el-input>
      <el-input v-model="order_status" placeholder="订单状态" style="width:145px;"></el-input>
      <select-time :date="date" :select-date.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="addsilver=true">
        <el-button type="primary" size="medium">新增</el-button>
      </permission-button>
    </div>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      ></info-table>
    </div>
    <el-dialog :visible.sync="addsilver" width="50%" title="新增银商账号">
      <div class="checkbox">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="用户名" prop="username" class="formleft">
                <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="子后台ID" prop="substageid">
                <el-input v-model="ruleForm.substageid" placeholder="请输入子后台ID"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="密码" prop="password" class="formleft">
                <el-input v-model.number="ruleForm.password" placeholder="（6-8位数字）"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户昵称" prop="nickname">
                <el-input v-model="ruleForm.nickname" placeholder="请输入用户昵称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
            <el-form-item label="银商描述" prop="silverdescribe" class="silvertextarea">
              <el-input  type="textarea" v-model="ruleForm.silverdescribe" placeholder="请输入描述"></el-input>
            </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addsilver = false" class="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="addsilver = false,submitForm('ruleForm')"
          class="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import SelectTime from "../../plugin/components/SelectTime";

export default {
  extends: BaseIframe,
  components: { SelectTime, InfoTable, PermissionButton },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error("密码为纯数字"));
      } else if (value.toString().length < 6 || value.toString().length > 8) {
        return callback(new Error("密码位数为6-8位"));
      } else {
        callback();
      }
    };
    return {
      user_id: "",
      substage_id: "",
      order_status: "",
      addsilver: false,
      date: [],
      ruleForm: {
        username: "",
        substageid: "",
        password: "",
        nickname: "",
        silverdescribe: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        substageid: [
          { required: true, message: "请输入子后台ID", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }]
      },
      tableStyle: [
        { label: "用户ID", prop: "userid", width: "" },
        { label: "用户名", prop: "username", width: "" },
        { label: "子后台ID", prop: "substageid", width: "" },
        { label: "昵称", prop: "nickname", width: "" },
        { label: "用户类型", prop: "usertype", width: "" },
        { label: "银商描述", prop: "silverdescribe", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "operate", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [10, 15, 20], 0)
    };
  },
  methods: {
    search() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin: 10px 0 30px;
}

.silvertextarea {
  width: 90%;
}
.cancel,
.confirm {
  width: 160px !important;
  color: #fff !important;
  font-size: 15px !important;
  font-weight: 650 !important;
}
.cancel {
  background-color: #ccc;
  border: transparent;
    margin-right: 100px;
}
.confirm{
  margin-left: 100px;
}
.checkbox{
  margin-bottom: 20px;
}
.select-time{
  margin-right: 20px !important;
}
#accountlist .el-button.el-button--primary.el-button--medium{
margin-left: 0px!important;
  margin-right: 20px !important;
}
</style>

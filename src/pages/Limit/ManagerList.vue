<template>
  <div id="managerlist">
    <div class="input-area">
      <el-input v-model="id" placeholder="请输入ID" style="width:159px;"></el-input>
      <el-input v-model="username" placeholder="请输入用户名" style="width:145px;"></el-input>
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
    <el-dialog :visible.sync="addsilver" width="50%" title="新增管理员">
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
              <el-form-item label="管理员名称" prop="admin" class="formleft">
                <el-input v-model="ruleForm.admin" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码" prop="password">
                <el-input v-model.number="ruleForm.password" placeholder="(6-8位数字)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="真实姓名" prop="realname" class="formleft">
                <el-input v-model="ruleForm.realname" placeholder="请输入昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属角色" prop="belongrole">
                <el-select v-model="ruleForm.belongrole" placeholder="用户角色">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="手机号" prop="phone" class="managerlist-tel">
                <el-input v-model.number="ruleForm.phone" placeholder="请输入11位手机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="tips" class="managerlist-tips">
                <el-input v-model="ruleForm.tips" placeholder="请输入邮箱号"></el-input>
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
    var validatephone = (rule, value, callback) => {
      if (value == "") {
        return callback();
      } else if (!Number.isInteger(value)) {
        return callback(new Error("请输入数字"));
      } else if (value.toString().length !== 11) {
        return callback(new Error("手机号应为11位"));
      } else {
        callback();
      }
    };
    return {
      id: "",
      username: "",
      addsilver: false,
      date: [],
      ruleForm: {
        admin: "",
        password: "",
        realname: "",
        belongrole: "",
        phone: "",
        tips: ""
      },
      rules: {
        admin: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        realname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        belongrole: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        phone: [{ validator: validatephone, trigger: "blur" }]
      },
      tableStyle: [
        { label: "ID", prop: "id", width: "" },
        { label: "管理员名称", prop: "admin", width: "" },
        { label: "手机号", prop: "tel", width: "" },
        { label: "角色名", prop: "role", width: "" },
        { label: "备注", prop: "tip", width: "" },
        { label: "登录时间", prop: "logintime", width: "" },
        { label: "登录IP", prop: "loginip", width: "" },
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
.checkbox {
  margin-bottom: 20px;
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
</style>

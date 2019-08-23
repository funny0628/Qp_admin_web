<template>
  <div id="subaccount">
    <input-area>
      <el-input v-model="sub_id" placeholder="子后台ID" size="medium"></el-input>
      <el-input v-model="sub_name" placeholder="子后台名称" size="medium"></el-input>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="addsub=true">
        <el-button type="primary" size="medium">新增</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      ></info-table>
    </div>
    <el-dialog :visible.sync="addsub" width="50%" title="新增子后台账号">
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
              <el-form-item label="子后台名称" prop="substage" class="formleft">
                <el-input v-model="ruleForm.substage" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="子后台账号" prop="subaccount">
                <el-input v-model="ruleForm.subaccount" placeholder="请输入昵称"></el-input>
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
              <el-form-item label="所属角色" prop="belongrole">
                <el-select v-model="ruleForm.belongrole" placeholder="用户角色">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="子后台描述" prop="subdescribe" class="subtextarea">
                <el-input type="textarea" v-model="ruleForm.subdescribe" placeholder="请输入描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addsub = false" class="cancel">取 消</el-button>
            <el-button
              type="primary"
              @click="addsub = false,submitForm('ruleForm')"
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
import InputArea from "../../plugin/components/InputArea";

export default {
  extends: BaseIframe,
  components: {InputArea, InfoTable, PermissionButton },
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
      sub_id: "",
      sub_name: "",
      date: [],
      addsub: false,
      ruleForm: {
        substage: "",
        subaccount: "",
        password: "",
        belongrole: "",
        subdescribe: ""
      },
      rules: {
        substage: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        subaccount: [
          { required: true, message: "请输入昵称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        belongrole: [
          { required: true, message: "请选择角色", trigger: "change" }
        ]
      },
      tableStyle: [
        { label: "子后台ID", prop: "substageid", width: "" },
        { label: "子后台名称", prop: "substagename", width: "" },
        { label: "子后台账号", prop: "substageaccount", width: "" },
        { label: "下级后台数", prop: "lowerstage", width: "" },
        { label: "用户类型", prop: "usertype", width: "" },
        { label: "子后台描述", prop: "substagedescribe", width: "" },
        { label: "操作", prop: "operate", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [10, 15, 20], 0)
    };
  },
  methods: {
    search() {}
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
.subtextarea {
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
</style>

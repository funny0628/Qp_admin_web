<template>
  <div id="packagemanage">
    <div class="input-area">
      <el-input v-model="package_id" placeholder="请输入包id" size="medium"></el-input>
      <el-input v-model="mark" placeholder="标示" size="medium" class="w-160"></el-input>
      <el-input v-model="package_status" placeholder="包状态" size="medium"></el-input>
      <select-time :date="date" :select-date.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="addpackage=true">
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
    <el-dialog :visible.sync="addpackage" width="50%" title="新增包设置">
      <div class="checkbox">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <p>
            <el-form-item label="平台名称" prop="platform" class="formleft">
              <el-input v-model="ruleForm.platform" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="唯一标识" prop="mark">
              <el-input v-model="ruleForm.mark" placeholder="请输入标识"></el-input>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="绑定用户" prop="user" class="formleft">
              <el-input v-model.number="ruleForm.user" placeholder="（6-8位数字）"></el-input>
            </el-form-item>
            <el-form-item label="下载地址" prop="url">
              <el-input v-model="ruleForm.url" placeholder="请输入下载地址"></el-input>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="大厅热更" prop="lobbyupdate" class="lobbyupdate">
              <el-switch v-model="ruleForm.lobbyupdate"></el-switch>
            </el-form-item>
            <el-form-item label="包状态" prop="packagestatus">
              <el-switch v-model="ruleForm.packagestatus"></el-switch>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="游戏开放" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="游戏1" name="type"></el-checkbox>
                <el-checkbox label="游戏2" name="type"></el-checkbox>
                <el-checkbox label="游戏3" name="type"></el-checkbox>
                <el-checkbox label="游戏4" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </p>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addpackage = false" class="cancel">取 消</el-button>
        <el-button type="primary" @click="addpackage = false,submitForm('ruleForm')" class="confirm">确 定</el-button>
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
       var validateid=(rule, value, callback)=>{
          if(!Number.isInteger(value)){
              return callback(new Error('密码为纯数字'))
          }else if(value.toString().length<6||value.toString().length>8){
               return callback(new Error('密码位数为6-8位'))
           }else{
             callback()
           }
      };
    return {
      package_id: "",
      mark: "",
      package_status:"",
      date: [],
      addpackage: false,
      ruleForm: {
        platform: "",
        mark: "",
        user: "",
        url: "",
        lobbyupdate: true,
        packagestatus: true,
        type:[]
      },
      rules: {
        platform: [
          { required: true, message: "请输入平台名称", trigger: "blur" }
        ],
        mark: [{ required: true, message: "请输入唯一标识", trigger: "blur" }],
        user: [{ required: true, message: "请输入用户id", trigger: "blur" },
                 { validator: validateid, trigger: 'blur' }],
        type:[{type: 'array', required: true, message: '请至少选择一个游戏', trigger: 'change'}]
      },
      tableStyle: [
        { label: "包ID", prop: "packageid", width: "279px" },
        { label: "标识", prop: "mark", width: "279px" },
        { label: "平台名称", prop: "platform", width: "279px" },
        { label: "包所属用户", prop: "belong", width: "279px" },
        { label: "下载地址", prop: "download", width: "279px" },
        { label: "大厅热更新", prop: "update", width: "279px" },
        { label: "游戏开放", prop: "open", width: "279px" },
        { label: "扣费", prop: "deduction", width: "279px" },
        { label: "下级玩家总数", prop: "lowerplayernum", width: "279px" },
        { label: "状态", prop: "status", width: "279px" },
        { label: "创建时间", prop: "createtime", width: "279px" },
        { label: "操作", prop: "operate", width: "279px" }
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
.formleft {
  margin-right: 100px;
}
p {
  margin-bottom: 30px;
}
.lobbyupdate {
  margin-right: 266px;
}
.cancel,
.confirm{
  width: 160px!important;
  margin: 0 100px;
  color: #fff!important;
  font-size: 15px!important;
  font-weight: 650!important
}
.cancel{
    background-color: #ccc;
        border:transparent
}
</style>

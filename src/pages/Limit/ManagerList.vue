<template>
  <div id="managerlist">
    <input-area>
      <el-input v-model="id" placeholder="请输入ID" style="width:159px;"></el-input>
      <el-input v-model="username" placeholder="请输入用户名" style="width:145px;"></el-input>
      <select-time :date="date" :select-date.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="flag=false, addsilver=true">
        <el-button type="primary" size="medium">新增</el-button>
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
            <template v-if="scope.prop==='status'">{{scope.row.status==1?'禁用':'启用'}}</template>
            <template v-if="scope.prop==='operate'">
              <el-button type="text" v-if="scope.row.role_name=='超级管理员'">禁止编辑</el-button>
              <span v-else>
                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button type="text" @click="delet(scope.row)">删除</el-button>
                <el-button type="text" @click="runstop(scope.row)">{{scope.row.status==1?'启用':'禁用'}}</el-button>
              </span>
            </template>
            <template v-if="['operate','status'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <el-dialog
      :visible.sync="addsilver"
      width="50%"
      :title="flag?'编辑管理员':'新增管理员'"
      @closed="closed()"
    >
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
              <el-form-item label="管理员名称" prop="user_name" class="formleft">
                <el-input
                  v-model="ruleForm.user_name"
                  placeholder="请输入名称"
                  :disabled="flag?true:false"
                ></el-input>
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
              <el-form-item label="真实姓名" prop="display_name" class="formleft">
                <el-input v-model="ruleForm.display_name" placeholder="请输入昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属角色" prop="role_id">
                <el-select v-model="ruleForm.role_id" placeholder="用户角色" class="changewidth">
                  <el-option v-for="item in rolelist" :key="item.role_id" :label="item.role_name" :value="item.role_id"></el-option>
                  <!-- <el-option label="角色2" value="1022"></el-option> -->
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
              <el-form-item label="备注" prop="remark" class="managerlist-tips">
                <el-input v-model="ruleForm.remark" placeholder="请输入邮箱号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addsilver = false" class="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="addsilver = false,flag?editconfirm('ruleForm'):submitForm('ruleForm')"
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
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import AdminUserHandler from "../../script/handlers/AdminUserHandler";
import AdminRoleHandler from "../../script/handlers/AdminRoleHandler";

export default {
  extends: BaseIframe,
  name:'ManagerList',
  components: {
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton,
    InfoTableItem
  },
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
      user_id: 2000,
      flag: "",
      editid: "",
      ruleForm: {
        user_name: "",
        password: "",
        display_name: "",
        role_id: "",
        phone: "",
        remark: ""
      },
      rolelist:[],
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        display_name: [
          { required: true, message: "请输入昵称", trigger: "blur" }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "change" }],
        phone: [{ validator: validatephone, trigger: "blur" }]
      },
      tableStyle: [
        { label: "ID", prop: "user_id", width: "" },
        { label: "管理员名称", prop: "user_name", width: "" },
        { label: "手机号", prop: "phone", width: "" },
        { label: "角色名", prop: "role_name", width: "" },
        { label: "备注", prop: "remark", width: "" },
        { label: "登录时间", prop: "login_at", width: "" },
        { label: "登录IP", prop: "login_ip", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "operate", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(1, [10, 15, 20], 0)
    };
  },
  methods: {
    search(val) {
      val = val || this.pageInfo.page;
      let data = {
        admin_id: this.id,
        admin_name: this.username,
        start_date: this.date[0] || "",
        stop_date: this.date[1] || "",
        page_index: val
      };
      AdminUserHandler.limit_manager(data, this.user_id).promise.then(res => {
        console.log(res)
        const { data, msg, code } = res;
        if (Number(code) == 200) {
          if (Number(data.total_count)>0) {
            this.records = data.ls;
            this.pageInfo = new PageInfo(
              1,
              [5, 10, 15],
              Number(data.total_count)
            );
          } else {
            this.records=[];
            return;
          }
        } else {
          return this.$message.error(msg);
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            user_name: this.ruleForm.user_name,
            password: this.ruleForm.password,
            display_name: this.ruleForm.display_name,
            role_id: this.ruleForm.role_id,
            phone: this.ruleForm.phone,
            remark: this.ruleForm.remark
          };
          AdminUserHandler.new_manager(data, this.user_id).promise.then(res => {
            const { data, msg, code } = res;
            if (Number(code) == 200) {
              this.search();
              this.$message.success(msg);
              this.closed();
              return;
            } else {
              this.closed();
              return this.$message.error(msg);
            }
          });
        } else {
          this.$message.error("提交失败");
          this.closed();
          return false;
        }
      });
    },
    editconfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            admin_id: Number(this.editid),
            user_name: this.ruleForm.user_name,
            password: this.ruleForm.password,
            display_name: this.ruleForm.display_name,
            role_id: this.ruleForm.role_id,
            phone: this.ruleForm.phone,
            remark: this.ruleForm.remark
          };
          AdminUserHandler.edit_manager_sure(data, this.user_id).promise.then(
            res => {
              const { data, msg, code } = res;
              if (Number(code) == 200) {
                this.search();
                this.$message.success(msg);
              } else {
                this.$message.error(msg);
              }
              this.closed();
            }
          );
        } else {
          this.$message.error("提交失败");
          this.closed();
          return false;
        }
      });
    },
    closed() {
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    edit(row) {
      this.addsilver = true;
      this.flag = true;
      this.editid = row.user_id;
      let data = { admin_id: row.user_id };
      AdminUserHandler.edit_manager(data, this.user_id).promise.then(res => {
        const { data, msg, code } = res;
        if (Number(code) == 200) {
          Object.assign(this.ruleForm, data);
          this.ruleForm.password = Number(data.password);
          this.ruleForm.phone = Number(data.phone);
        } else {
          this.addsilver = false;
          this.$message.error(msg);
        }
      });
    },
    delet(row) {
      console.log(row);
      this.$confirm("是否删除该文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let data = { admin_id: row.user_id };
          AdminRoleHandler.del_managerList(data, this.user_id).promise.then(res => {
            const { data, msg, code } = res;
            if (Number(code) == 200) {
              this.search();
              if (row.role_name === "超级管理员") {
                this.$message.error(msg);
              } else {
                this.$message.success(msg);
              }
            }
          });
        })
        .catch(() => {
          return;
        });
    },
    runstop(row) {
      let changestatus;
      if (Number(row.status) === 1) {
        changestatus = 2;
      } else {
        changestatus = 1;
      }
      let data = { admin_id: row.user_id, status: changestatus };
      AdminRoleHandler.runstop_manager(data, this.user_id).promise.then(res => {
        const { data, msg, code } = res;
        if (Number(code) == 200) {
          this.search();
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      });
    },
    getrole(){
      let data = {};
      AdminRoleHandler.getmanagerrole(data, this.user_id).promise.then(res=>{
        const { data, msg, code } = res;
        this.rolelist=data;
      })
    }
  },
  created() {
    this.search();
    this.getrole();
  }
};
</script>

<style scoped>
.bd {
  margin: 0 20px;
}
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
.confirm {
  margin-left: 100px;
}
.changewidth {
  width: 100%;
}
.select-time {
  margin-right: 20px !important;
}
#managerlist .el-button.el-button--primary.el-button--medium {
  margin-left: 0px !important;
  margin-right: 20px !important;
}
</style>

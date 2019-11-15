<template>
  <div id="subaccount">
    <input-area>
      <el-input v-model="sub_id" placeholder="运营后台ID" size="medium"></el-input>
      <el-input v-model="sub_name" placeholder="运营后台名称" size="medium"></el-input>
      <!-- root用户显示所属公司下拉框 -->
      <el-select
        v-model="belongcompany"
        placeholder="所属公司"
        style="width:170px;margin-right:10px"
        v-if="user_id===1000"
      >
        <el-option label="腾讯" value="1"></el-option>
        <el-option label="阿里" value="2"></el-option>
      </el-select>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="getcompanylist()">
        <el-button type="primary" size="medium">新增</el-button>
      </permission-button>
    </input-area>
    <div class="checkpage">
      <span
        v-for="(item,index) in breadlist"
        :key="index"
        @click="getmsg(item.id,index)"
        style="color:#409EFF;cursor: pointer;"
      >{{item.name}}</span>
    </div>
    <div class="bd">
      <info-table
        ref="infoTable"
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop=='display_name'">
              <span @click="fn(scope.row)" class="platformchoice">{{scope.row[scope.prop]}}</span>
            </template>
            <template v-if="scope.prop==='status'">
              <span
                :class="{'runcolor':scope.row.status==1,'stopcolor':scope.row.status!=1}"
              >{{scope.row.status==1?'启用':'禁用'}}</span>
            </template>
            <template v-if="scope.prop==='operate'">
              <span>
                <el-button type="text" @click="getgamelist(scope.row)">游戏管理</el-button>
                <el-button type="text" @click="forward('setpermission',scope.row)">授权</el-button>
                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button type="text" @click="runstop()">{{scope.row.status==1?'禁用':'启用'}}</el-button>
                <!-- <el-button type="text">结算</el-button> -->
              </span>
            </template>
            <template
              v-if="['operate','display_name','status'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!-- 新增/编辑运营后台账号 -->
    <el-dialog
      :visible.sync="addsub"
      width="50%"
      :title="flag?'新增运营后台账号':'编辑运营后台账号'"
      @closed="closed()"
    >
      <div class="checkbox">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="运营后台名称" prop="display_name" class="formleft">
                <el-input
                  v-model="ruleForm.display_name"
                  placeholder="请输入名称"
                  :disabled="flag?false:true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="运营后台账号" prop="user_name">
                <el-input
                  v-model="ruleForm.user_name"
                  placeholder="请输入账号"
                  :disabled="flag?false:true"
                ></el-input>
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
              <el-form-item label="所属公司" prop="company_id" class="reducewidth">
                <el-select
                  v-model="ruleForm.company_id"
                  placeholder="用户角色"
                  class="changewidth"
                  v-if="user_id==1000"
                  :disabled="flag?false:true"
                >
                  <el-option
                    :label="item.company_name"
                    :value="item.company_id"
                    v-for="item in companylist"
                    :key="item.company_id"
                  ></el-option>
                </el-select>
                <!-- 非root用户登录，获取该用户登录时后台给的所属公司，非root用户无法更改所属公司 -->
                <!-- <el-input v-model="ruleForm.notrootlogin" disabled v-else></el-input> -->
                <el-select v-model="ruleForm.company_id" class="changewidth" disabled v-else>
                  <el-option label="测试" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="子后台描述" prop="remark" class="subtextarea">
                <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addsub = false" class="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="flag?submitForm('ruleForm'):editForm('ruleForm')"
          class="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 游戏管理设置 -->
    <el-dialog title="游戏管理" :visible.sync="gamemanage" width="30%">
      <div class="checkbox">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#f2f2f2'}"
          :border="true"
        >
          <el-table-column type="selection" align="center" min-width="50"></el-table-column>
          <el-table-column label="游戏名称" align="center">
            <template slot-scope="scope">{{scope.row.subgame_name}}</template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gamemanage = false">取 消</el-button>
        <el-button type="primary" @click="confirmgame()">确 定</el-button>
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
import InfoTableItem from "../../plugin/components/InfoTableItem";
import AdminUserHandler from "../../script/handlers/AdminUserHandler";
import { constants } from "crypto";
import { log } from "util";

export default {
  extends: BaseIframe,
  name: "Subaccount",
  components: { InputArea, InfoTable, PermissionButton, InfoTableItem },
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
      breadlist: [{ name: "游戏平台", id: "" }],
      sub_id: "",
      sub_name: "",
      gameplateform: "",
      belongcompany: "",
      user_id: 1000,
      date: [],
      addsub: false,
      gamemanage: false,
      companylist: [],
      newestlevel: [{ name: "游戏平台", id: "" }],
      newestlevelid: "",
      ruleForm: {
        display_name: "",
        user_name: "",
        password: "",
        company_id: "",
        position: "",
        remark: ""
      },
      rules: {
        display_name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        user_name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        company_id: [
          { required: true, message: "请选择角色", trigger: "change" }
        ]
      },
      tableStyle: [
        { label: "运营后台ID", prop: "user_id", width: "" },
        { label: "运营后台名称", prop: "display_name", width: "" },
        { label: "所属公司", prop: "company_name", width: "" },
        { label: "运营后台账号", prop: "user_name", width: "" },
        { label: "下级后台数", prop: "sub_user_count", width: "" },
        { label: "用户类型", prop: "user_role", width: "" },
        { label: "运营后台描述", prop: "remark", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "operate", width: "260" }
      ],
      records: [],
      pageInfo: new PageInfo(1, [10, 15, 20], 0),
      tableData: [],
      multipleSelection: [],
      confirmgameid: "",
      gameresult: "",
      flag: "",
      editid:''
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search(val) {
      console.log(val)
      val = val || this.pageInfo.page;
      let data = {
        base_superadmin_id: this.gameplateform,
        superadmin_id: this.sub_id,
        superadmin_name: this.sub_name,
        company_name: this.belongcompany,
        page_index: val
      };
      AdminUserHandler.admin_list(data, this.user_id).promise.then(res => {
        const { data, msg, code } = res;
        if (Number(code) == 200) {
          if (Number(data.total_count) > 0) {
            this.records = data.ls;
            this.pageInfo = new PageInfo(
              Number(data.page_index),
              [5, 10, 15],
              Number(data.total_count)
            );
          } else {
            this.records = [];  
          }
        } else {
          this.$message.error(msg);
        }
        this.$refs.infoTable.refresh_page()
      });
    },
    // 实现面包屑，存入需要的数据
    fn(row) {
      if (row.sub_user_count > 0) {
        this.gameplateform = row.user_id;
        this.search();
        let obj = {};
        obj.name = `/${row.display_name}`;
        obj.id = `${row.user_id}`;
        this.breadlist.push(obj);
      } else {
        return;
      }
    },
    // 实现面包屑反选，将存入的数据传入
    getmsg(id, index) {
      //  裁剪面包屑列表
      this.breadlist.splice(index + 1, this.breadlist.length - 1);
      this.gameplateform = id;
      this.search();
    },
    runstop() {},
    edit(row) {
      this.flag = false;
      this.addsub = true;
      this.editid=row.user_id
      let data = {
        superadmin_id: row.user_id
      };
      AdminUserHandler.edit_superadmin_init(data, this.user_id).promise.then(
        res => {
          const { data, msg, code } = res;
          if (Number(code) == 200) {
            Object.assign(this.ruleForm, data);
            this.ruleForm.password = Number(data.password);
          } else {
            this.addsub = false;
            this.$message.error(msg);
          }
        }
      );
    },
    submitForm(ruleForm) {
      this.addsub = false;
      this.newestlevelid = this.newestlevel.slice(
        this.newestlevel.length - 1,
        this.newestlevel.length
      )[0].id;
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          let data = {
            company_id: this.ruleForm.company_id,
            parent: this.newestlevelid,
            platform_name: this.ruleForm.display_name,
            user_name: this.ruleForm.user_name,
            password: this.ruleForm.password,
            remark: this.ruleForm.remark
          };
          AdminUserHandler.sureeditcompany(data, this.user_id).promise.then(
            res => {
              const { data, msg, code } = res;
              if (Number(code) == 200) {
                this.search(2);
                return this.$message.success(msg);
              } else {
                return this.$message.error(msg);
              }
            }
          );
        } else {
          this.$message.error("提交失败");
          return false;
        }
      });
    },
    getcompanylist() {
      this.flag = true;
      this.addsub = true;
      if (this.user_id == 1000) {
        let data = {};
        AdminUserHandler.getcompanylist(data, this.user_id).promise.then(
          res => {
            const { data, msg, code } = res;
            if (Number(code) == 200) {
              this.companylist = data;
            } else {
              return this.$message.error(msg);
            }
          }
        );
      } else {
        //非root用户，登录时后台会给一个所属公司，在此处赋值给this.ruleForm.company_id;
        return;
      }
    },
    closed() {
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    getgamelist(row) {
      this.gamemanage = true;
      this.confirmgameid = row.user_id;
      let data = {
        superadmin_id: row.user_id
      };
      AdminUserHandler.platformgames(data, this.user_id).promise.then(res => {
        const { data, msg, code } = res;
        if (Number(code) == 200) {
          this.tableData = data;
          let arr = [];
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].status == 1) {
              arr.push(this.tableData[i]);
            }
          }
          this.toggleSelection(arr);
        } else {
          return this.$message.error(msg);
        }
      });
    },
    toggleSelection(rows) {
      this.$nextTick(() => {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      });
    },
    confirmgame() {
      this.gamemanage = false;
      var arr = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        arr.push(this.multipleSelection[i].subgame);
      }
      this.gameresult = arr.join(",");
      let data = {
        superadmin_id: this.confirmgameid,
        subgames: this.gameresult
      };
      AdminUserHandler.platform_games_set(data, this.user_id).promise.then(
        res => {
          const { data, msg, code } = res;
          if (Number(code) == 200) {
            return this.$message.success(msg);
          } else {
            return this.$message.error(msg);
          }
        }
      );
    },
    editForm(ruleForm){
      this.addsub = false;
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          let data = {
            superadmin_id: Number(this.editid),
            password: this.ruleForm.password,
            remark: this.ruleForm.remark
          };
          AdminUserHandler.edit_superadmin(data, this.user_id).promise.then(
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
    }
  },
  mounted() {
    this.search();
  },
  watch: {
    breadlist: {
      handler(newval) {
        this.newestlevel = newval;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.bd {
  margin: 0 20px;
}
.checkpage {
  margin-left: 20px;
  margin-bottom: 20px;
}
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
.confirm {
  margin-left: 100px;
}
.changewidth {
  width: 100%;
}

#subaccount .el-button.el-button--primary.el-button--medium {
  margin-left: 0px !important;
  margin-right: 20px !important;
}
.platformchoice {
  cursor: pointer;
  color: #409eff;
}
.stopcolor {
  color: #ff3300;
}
.runcolor {
  color: #6bdab5;
}
</style>

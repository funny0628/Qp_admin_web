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
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop==='operate'">
              <el-button
                type="text"
                v-for="(btn,i) in scope.row[scope.prop]"
                :key="i"
                @click="handeClick(btn)"
              >{{btn.label}}</el-button>
            </template>
            <template v-if="['operate'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!-- 新增运营后台账号 -->
    <el-dialog :visible.sync="addsub" width="50%" title="新增运营后台账号">
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
              <el-form-item label="所属角色" prop="belongrole" class="reducewidth">
                <el-select v-model="ruleForm.belongrole" placeholder="用户角色" class="changewidth">
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
        <el-button type="primary" @click="addsub = false,submitForm('ruleForm')" class="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 游戏管理设置 -->
    <el-dialog
  title="游戏管理"
  :visible.sync="gamemanage"
  width="30%">
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
      <el-table-column type="selection" align="center" min-width="50">
      </el-table-column>
      <el-table-column label="游戏名称" align="center">
        <template slot-scope="scope" >{{ scope.row.game }}</template>
      </el-table-column>
    </el-table>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="gamemanage = false">取 消</el-button>
    <el-button type="primary" @click="gamemanage = false">确 定</el-button>
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

export default {
  extends: BaseIframe,
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
      sub_id: "",
      sub_name: "",
      date: [],
      addsub: false,
      gamemanage:false,
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
        { label: "运营后台描述", prop: "substagedescribe", width: "" },
        { label: "操作", prop: "operate", width: "" }
      ],
      records: [
        {
          substageid: 111,
          substagename: "游戏平台1",
          substageaccount: "a-admin",
          lowerstage: 10,
          usertype: "超级管理员",
          substagedescribe: "-",
          operate: [
            {
              label: "游戏管理",
              type: "gamemanage"
            },
            {
              label: "授权",
              type: "authorization"
            },
            {
              label: "编辑",
              type: "edit"
            },
            {
              label: "禁用",
              type: "ban"
            },
            {
              label: "结算",
              type: "settlement"
            }
          ]
        }
      ],
      pageInfo: new PageInfo(0, [10, 15, 20], 0),
      tableData: [
        { game: "游戏1" },
        { game: "游戏2" },
        { game: "游戏3" },
        { game: "游戏4" },
        { game: "游戏5" }
      ],
      multipleTable: []
    };
  },
  methods: {
    search() {},
    handeClick(btn) {
      if (btn.type === "gamemanage") {
        this.gamemanage = true;
      }
      if (btn.type === "edit") {
        this.forward("setpermission");
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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

#subaccount .el-button.el-button--primary.el-button--medium{
margin-left: 0px!important;
  margin-right: 20px !important;
}
</style>

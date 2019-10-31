<template>
  <div id="subaccount">
    <input-area>
      <el-input v-model="sub_id" placeholder="运营后台ID" size="medium"></el-input>
      <el-input v-model="sub_name" placeholder="运营后台名称" size="medium"></el-input>
      <!-- root用户显示所属公司下拉框 -->
      <el-select v-model="belongcompany" placeholder="所属公司" style="width:170px;margin-right:10px" v-if="user_id===1000">
        <el-option label="腾讯" value="1"></el-option>
        <el-option label="阿里" value="2"></el-option>
      </el-select>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="addsub=true">
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
                :class="{'runcolor':scope.row.status!=1,'stopcolor':scope.row.status==1}"
              >{{scope.row.status==1?'启用':'禁用'}}</span>
            </template>
            <template v-if="scope.prop==='operate'">
              <span @click="handeClick($event)">
                <el-button type="text">游戏管理</el-button>
                <el-button type="text">授权</el-button>
                <el-button type="text">编辑</el-button>
                <el-button type="text" @click="runstop()">{{scope.row.status==1?'禁用':'启用'}}</el-button>
                <el-button type="text">结算</el-button>
              </span>
            </template>
            <template
              v-if="['operate','display_name','status'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
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
              <el-form-item label="所属公司" prop="belongrole" class="reducewidth">
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
            <template slot-scope="scope">{{ scope.row.game }}</template>
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
import AdminUserHandler from "../../script/handlers/AdminUserHandler";
import { constants } from "crypto";

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
      breadlist: [{ name: "游戏平台" ,id:''}],
      sub_id: "",
      sub_name: "",
      gameplateform:'',
      belongcompany: "",
      user_id: 2000,
      date: [],
      addsub: false,
      gamemanage: false,
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
      records: [
        // {
        //   substageid: 111,
        //   display_name: "游戏平台1",
        //   substageaccount: "a-admin",
        //   lowerstage: 10,
        //   usertype: "超级管理员",
        //   substagedescribe: "-",
        //   statu:0,
        //    status:'禁用'
        // },
        // {
        //   substageid: 111,
        //   display_name: "游戏平台2",
        //   substageaccount: "a-admin",
        //   lowerstage: 15,
        //   usertype: "管理员",
        //   substagedescribe: "-",
        //       statu:1,
        //    status:'启用'
        // }
      ],
      // childrenrecords: [
      //   {
      //     substageid: 111,
      //     display_name: "游戏平台1-1",
      //     substageaccount: "a-admin",
      //     lowerstage: 10,
      //     usertype: "超级管理员",
      //     substagedescribe: "-",
      //   },
      //   {
      //     substageid: 111,
      //     display_name: "游戏平台1-2",
      //     substageaccount: "a-admin",
      //     lowerstage: 15,
      //     usertype: "管理员",
      //     substagedescribe: "-",
      //   }
      // ],
      pageInfo: new PageInfo(1, [10, 15, 20], 0),
      tableData: [
        { game: "游戏1" },
        { game: "游戏2" },
        { game: "游戏3" },
        { game: "游戏4" },
        { game: "游戏5" }
      ],
      multipleSelection: []
    };
  },
  methods: {
    handeClick(event) {
      //  console.log(event)
      if (event.target.innerText === "游戏管理") {
        this.gamemanage = true;
      }
      if (event.target.innerText === "授权") {
        this.forward("setpermission");
      }
      if (event.target.innerText === "编辑") {
        this.addsub = true;
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    search(val) {
      val = val || this.pageInfo.page;
      let data = { 
        base_superadmin_id:this.gameplateform,
        superadmin_id:this.sub_id,
        superadmin_name:this.sub_name,
        company_name:this.belongcompany,
        page_index: val 
        };
      AdminUserHandler.admin_list(data, this.user_id).promise.then(res => {
        console.log(res);
        const { data, msg, code } = res;
        if (Number(code) == 200) {
          if (Number(data.total_count) > 0) {
            this.records = data.ls;
            this.pageInfo = new PageInfo(
              1,
              [5, 10, 15],
              Number(data.total_count)
            );
          } else {
            this.records = [];
            return;
          }
        } else {
          return this.$message.error(msg);
        }
      });
    },
    // 实现面包屑，存入需要的数据
    fn(row) {
      // console.log(row)
      this.gameplateform=row.user_id
      this.search();
      let obj = {};
      obj.name = `/${row.display_name}`;
      obj.id=`${row.user_id}`
      this.breadlist.push(obj);
      // console.log(this.breadlist)
    },
    // 实现面包屑反选，将存入的数据传入
    getmsg(id, index) {
      //  裁剪面包屑列表
      this.breadlist.splice(index + 1, this.breadlist.length - 1);
      this.gameplateform=id;
      this.search()
    },
    runstop() {}
  },
  mounted() {
    this.search();
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

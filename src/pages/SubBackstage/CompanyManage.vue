<template>
  <div id="companymanage">
    <input-area>
      <el-input v-model="companyid" placeholder="公司ID" style="width:159px;"></el-input>
      <el-input v-model="companyname" placeholder="公司名称" style="width:145px;"></el-input>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="newadd=true">
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
            <template v-if="scope.prop==='status'">
              <span
                :class="{'runcolor':scope.row.status!=1,'stopcolor':scope.row.status==1}"
              >{{scope.row.status==1?'禁用':'启用'}}</span>
            </template>
            <template v-if="scope.prop==='time'">
              <p>{{scope.row.created_at}}</p>
              <p>{{scope.row.updated_at}}</p>
            </template>
            <template v-if="scope.prop==='operate'">
              <span>
                <el-button type="text" @click="editdia=true">编辑</el-button>
                <el-button type="text" @click="gamemanage=true">游戏管理</el-button>
              </span>
            </template>
            <template
              v-if="['operate','status','time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
      <!-- 公司管理新增弹框 -->
      <el-dialog :visible.sync="newadd" width="50%" title="新增公司名称" @closed="closed()">
        <div class="checkbox">
          <el-form
            :model="ruleFormnew"
            :rules="rulesnew"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleFormnew"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="公司名称" prop="company_name" class="formleft">
                  <el-input v-model="ruleFormnew.company_name" placeholder="请输入名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="平台标识" prop="mark">
                  <el-input v-model.number="ruleFormnew.mark" placeholder="请输入平台标识"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="充值兑换比例" prop="newproportion" class="formleft">
                  <el-input v-model="ruleFormnew.newproportion" placeholder="直接填写数字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态" prop="newaddstatus">
                  <el-select v-model="ruleFormnew.newaddstatus" class="changewidth">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="newadd = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="newadd = false" class="confirm">确 定</el-button>
        </span>
        <!-- 公司管理编辑弹框 -->
      </el-dialog>
      <el-dialog :visible.sync="editdia" width="50%" title="新增公司名称" @closed="closed()">
        <div class="checkbox">
          <el-form
            :model="ruleFormedit"
            :rules="rulesedit"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleFormedit"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="充值兑换比例" prop="editproportion" class="formleft">
                  <el-input v-model="ruleFormedit.editproportion" placeholder="直接填写数字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态" prop="editstatus">
                  <el-select v-model="ruleFormedit.editstatus" class="changewidth">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdia = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="editdia = false" class="confirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 游戏管理 -->
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

export default {
  extends: BaseIframe,
  name: "CompanyManage",
  components: {
    InputArea,
    InfoTable,
    PermissionButton,
    InfoTableItem
  },
  data() {
    return {
      companyid: "",
      companyname: "",
      user_id: 1000,
      tableStyle: [
        { label: "公司ID", prop: "company_id", width: "" },
        { label: "公司名称", prop: "company_name", width: "" },
        { label: "平台标识", prop: "token", width: "" },
        { label: "充值比例兑换", prop: "exchange", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "创建时间/修改时间", prop: "time", width: "" },
        { label: "操作", prop: "operate", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(1, [10, 15, 20], 0),
      newadd: false,
      editdia: false,
      gamemanage: false,
      multipleSelection: [],
      tableData: [
        { game: "游戏1" },
        { game: "游戏2" },
        { game: "游戏3" },
        { game: "游戏4" },
        { game: "游戏5" }
      ],
      ruleFormnew: {
        company_name: "",
        mark: "",
        newproportion: "",
        newaddstatus: ""
      },
      ruleFormedit: {
        editproportion: "",
        editstatus: ""
      },
      rulesnew: {
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        mark: [{ required: true, message: "请输入平台标识", trigger: "blur" }],
        newproportion: [
          { required: true, message: "请输入充值兑换比例", trigger: "blur" }
        ],
        newaddstatus: [
          { required: true, message: "请选择状态", trigger: "change" }
        ]
      },
      rulesedit: {
        editproportion: [
          { required: true, message: "请输入充值兑换比例", trigger: "blur" }
        ],
        editstatus: [
          { required: true, message: "请选择状态", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    search(val) {
      val = val || this.pageInfo.page;
      let data = {
        company_id: this.companyid,
        company_name: this.companyname,
        page_index: val
      };
      AdminUserHandler.company_list(data, this.user_id).promise.then(res => {
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
    closed() {
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    }
  },
  created() {
    this.search();
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
.el-input {
  margin-right: 10px;
}
#companymanage .el-button.el-button--primary.el-button--medium {
  margin-left: 0px !important;
  margin-right: 20px !important;
}
.changewidth {
  width: 100%;
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
</style>
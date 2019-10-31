<!--代理返佣设置-->
<template>
  <div id="Commission-main">
    <input-area>
      <permission-button :action="ActionType.ADD" @click="handelAddClick()">
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
                @click="handeClick(btn)"
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
    <el-dialog :title="dialogTitleType" :visible.sync="dialogVisible" width="25%">
      <el-form :model="formData">
        <el-form-item label="代理层级" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="formData.level"></el-input>
        </el-form-item>
        <el-form-item label="最小业绩" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="formData.min_results"></el-input>
        </el-form-item>
        <el-form-item label="最大业绩" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="formData.max_results"></el-input>
        </el-form-item>
        <el-form-item label="返佣比例" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="formData.commission_col"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PageInfo from "../../plugin/script/common/PageInfo";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "Commission",
  extends: BaseIframe,
  components: { InputArea, PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      // 表格数据
      tableStyle: [
        { label: "代理层级", prop: "level", width: "" },
        { label: "最小业绩", prop: "min_results", width: "" },
        { label: "最大业绩", prop: "max_results", width: "" },
        { label: "返佣比例（%）", prop: "commission_col", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          level: "第一级代理",
          min_results: "0",
          max_results: "10000",
          commission_col: "0.2",
          action: [{ label: "修改", type: "edit" }]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      // 弹框数据
      dialogTitleType: "",
      dialogVisible: false,
      labelWidth: "70px",
      formData: {
        level: "",
        min_results: "",
        max_results: "",
        commission_col: ""
      }
    };
  },
  methods: {
    search() {},
    // 新增代理分层
    handelAddClick() {
      this.dialogTitleType = "新增代理分层";
      this.dialogVisible = true;
    },
    // 修改代理分层
    handeClick(btn) {
      if (btn.type === "edit") {
        this.dialogTitleType = "修改代理分层";
        this.dialogVisible = true;
      }
    }
  }
};
</script>

<style scoped>
</style>

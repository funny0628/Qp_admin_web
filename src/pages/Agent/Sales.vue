<!--业绩返佣-->
<template>
  <div id="Sales-main">
    <input-area>
      <permission-button :action="ActionType.ADD" @click="handelAddClick">
        <el-button type="primary" size="medium">新增</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hidePage="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handelClick(btn,scope.row)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div class="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="25%">
        <el-form :model="dataForm" ref="dataForm">
          <el-form-item label="最小业绩" :label-width="labelWidth" prop="min_pre">
            <el-input autocomplete="off" v-model="dataForm.min_pre"></el-input>
          </el-form-item>
          <el-form-item label="最大业绩" :label-width="labelWidth" prop="max_pre">
            <el-input autocomplete="off" v-model="dataForm.max_pre"></el-input>
          </el-form-item>
          <el-form-item label="返佣比例" :label-width="labelWidth" prop="column">
            <el-input placeholder="请输入内容" v-model="dataForm.column">
              <template slot="prepend">万分之</template>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddEditClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InputArea from "../../plugin/components/InputArea";
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "Sales",
  extends: BaseIframe,
  components: { InputArea, PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      //表格数据
      tableStyle: [
        { label: "业绩区间", prop: "min_result", width: "" },
        { label: "业绩区间", prop: "max_result", width: "" },
        { label: "业绩返佣比例", prop: "rate_result", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          min_result: "1.00",
          max_result: "10000.00",
          rate_result: "1",
          action: [{ label: "修改", type: "edit" }]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0), // page pageSizes total
      //弹窗数据
      dialogTitle: "",
      dialogVisible: false,
      labelWidth: "70px",
      dataForm: {
        // level: "",
        min_pre: "0",
        max_pre: "10000.00",
        column: "1"
      }
    };
  },
  methods: {
    search() {},
    //打开新增的弹窗方法
    handelAddClick() {
      this.dialogVisible = true;
      this.dialogTitle = "业绩返佣新增";
    },
    //表单操作
    // handelClick
    handelClick(btn, row) {
      this.dialogVisible = true;
      this.dialogTitle = "业绩返佣修改";
    },
    //新增方法
    AddEditClick() {
      // 通过层级id是否为真来判断是新增还是修改
    }
  }
};
</script>

<style scoped>
</style>

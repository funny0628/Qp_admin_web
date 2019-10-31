<!--全民返佣-->
<template>
  <div id="Universal">
    <input-area>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium"></el-input>
      <select-time :date="date" :select-time.sync="date"></select-time>
      <permission-button :action="ActionType.ADD" @click="search()">
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
            <template
              v-if="['user_gold', 'alipay_account', 'account_person'].indexOf(scope.prop) >= 0"
            >
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  == 1">启用</span>
              <span v-else>冻结</span>
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
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','status'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div class="dialog">
      <el-dialog title="全民返佣设置" :visible.sync="dialogVisible" width="30%" center>
        <el-form :model="formData" ref="formData">
          <el-form-item label="返佣模式：" label-width="140px" prop="mode">
            <el-input v-model="formData.mode" autocomplete="off" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="返佣比例：" label-width="140px" prop="ratio">
            <el-input
              v-model="formData.ratio"
              autocomplete="off"
              style="width: 80%;"
              placeholder="请输入充值金额"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import InputArea from "../../plugin/components/InputArea";
import SelectTime from "../../plugin/components/SelectTime";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import { truncate } from "fs";

export default {
  name: "Universal",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  data() {
    return {
      format: {
        user_id: ""
      },
      date: [],
      tableStyle: [
        { label: "发放时间", prop: "time", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "用户昵称", prop: "user_desc", width: "" },
        { label: "下级产生税收", prop: "tax", width: "" },
        { label: "获得返佣", prop: "getCom", width: "" }
      ],
      records: [
        {
          time: "2019-09-01 12:00:00",
          user_id: "100012",
          user_desc: "这边是昵称",
          tax: "100.00",
          getCom: "50.00"
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      dialogVisible: false,
      formData: {
        mode: "税收",
        ratio: ""
      }
    };
  },
  methods: {
    search() {
      this.dialogVisible = true;
    },
    handeClick(btn) {}
  }
};
</script>

<style scoped>
</style>
<!--全民返佣-->

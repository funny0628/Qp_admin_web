<!--风控列表-->
<template>
  <div id="RiskList">
    <input-area>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">添加条件</el-button>
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
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}
            </template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div class="dialog">
      <el-dialog title="风控条件" :visible.sync="dialogVisible" width="30%" center>
        <el-form :model="formData">
          <el-form-item label="盈亏大于：" label-width="110px">
            <el-input v-model="formData.greater" autocomplete="off" placeholder="单位(元) "></el-input>
          </el-form-item>
          <el-form-item label="输赢局数大于：" label-width="110px">
            <el-input v-model="formData.greater_num" autocomplete="off" placeholder="单位(局)"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
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
  import InfoTableItem from "../../plugin/components/InfoTableItem";

  export default {
    name: "RiskList",
    extends: BaseIframe,
    components: {InfoTableItem, InputArea, InfoTable, PermissionButton},
    data() {
      return {
        tableStyle: [
          {label: "渠道ID", prop: "channel_id"},
          {label: "用户ID", prop: "user_id"},
          {label: "用户昵称", prop: "user_name"},
          {label: "盈亏", prop: "loss"},
          {label: "用户输赢局数", prop: "win_num"}
        ],
        records: [
          {
            channel_id: "100",
            user_id: "1001100",
            user_name: "测试玩家1",
            loss: "300000.000",
            win_num: "6"
          }
        ],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        dialogVisible: false,
        formData: {
          greater: "",
          greater_num: ""
        }
      };
    },
    methods: {
      /**添加条件*/
      search() {
        this.dialogVisible = true;
      },
    }
  };
</script>

<style scoped>
</style>

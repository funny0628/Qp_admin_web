<!--赠送记录-->
<template>
  <div id="Record-main">
    <input-area>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium"></el-input>
      <el-input v-model="format.nickname" placeholder="用户昵称" size="medium"></el-input>
      <el-input v-model="format.ip" placeholder="IP地址" size="medium"></el-input>
      <select-time :date="date" :select-time.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hide-page="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'user_type'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  == 1">代理</span>
              <span v-else>普通用户</span>
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
            <template v-if="['action', 'user_type'].indexOf(scope.prop) < 0" >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
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

  export default {
    name: "Record",
    extends: BaseIframe,
    components: {
      InfoTableItem,
      InputArea,
      InfoTable,
      PermissionButton,
      SelectTime
    },
    data() {
      return {
        format: {
          user_id: "",
          nickname: "",
          ip: ""
        },
        date: [],
        tableStyle: [
          { label: "编号", prop: "id", width: "" },
          { label: "用户ID", prop: "user_id", width: "" },
          { label: "用户昵称", prop: "nickname", width: "" },
          { label: "赠送前金额", prop: "before_money", width: "" },
          { label: "赠送金额", prop: "giv_money", width: "" },
          { label: "赠送后金额", prop: "after_money", width: "" },
          { label: "IP地址", prop: "ip", width: "" },
          { label: "赠送时间", prop: "giv_time", width: "" },
          { label: "赠送原因", prop: "reason", width: "" }
        ],
        records: [
          {
            id: "09287673429137",
            user_id: "1001001",
            nickname: "测试玩家",
            before_money: "100.00",
            giv_money: "2.00",
            after_money: "102.00",
            ip: "192.168.0.0",
            giv_time: "2019-01-01 12:00:00",
            reason: "充值赠送"
          }
        ],
        pageInfo: new PageInfo(0, [5, 10, 15], 0)
      };
    },
    methods: {
      search() {}
    }
  };
</script>

<style scoped>
</style>

<!--在线统计-->
<template>
  <div class="OnlineSta-main">
    <div class="top-tb" style="padding: 30px 20px 0 20px;">
      <el-table
        :data="tableData1"
        style="width: 100%"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="online_total" label="在线总人数" width align="center"></el-table-column>
        <el-table-column prop="online_andriod" label="andriod在线" width align="center"></el-table-column>
        <el-table-column prop="online_ios" label="ios在线" width align="center"></el-table-column>
        <el-table-column prop="totals" label="总大厅人数" width align="center"></el-table-column>
        <el-table-column prop="online_res" label="当天注册在线" width align="center"></el-table-column>
        <el-table-column prop="game_pep" label="正在游戏房间人数" width align="center"></el-table-column>
      </el-table>
    </div>
    <input-area style="text-align: center;">
      <el-input v-model="areaData.channel_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-select v-model="areaData.type" clearable placeholder="游戏类型" size="medium">
        <el-option
          v-for="item in gameTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="['user_gold', 'money_change', 'submit_time'].indexOf(scope.prop) >= 0">
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
              v-if="['action', 'user_gold', 'money_change', 'submit_time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PageInfo from "../../plugin/script/common/PageInfo";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "OnlineSta",
  extends: BaseIframe,
  components: { InputArea, PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      /*top-tab*/
      tableData1: [
        {
          online_total: "100",
          online_andriod: "30",
          online_ios: "70",
          totals: "12",
          online_res: "9",
          game_pep: "88"
        }
      ],
      /*area-data*/
      areaData: {
        channel_id: "", //请输入渠道id
        type: "" //游戏类型
      },
      gameTypes: [
        { value: "1", label: "游戏1" },
        { value: "2", label: "游戏2" }
      ],
      /*table*/
      tableStyle: [
        { label: "渠道ID", prop: "channel_id", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "终端", prop: "terminal", width: "" },
        { label: "身份", prop: "identity", width: "" },
        { label: "游戏类型", prop: "game_type", width: "" },
        { label: "游戏房间", prop: "game_room", width: "" },
        { label: "桌号", prop: "ramadhin", width: "" },
        { label: "金额", prop: "money", width: "" }
      ],
      records: [
        {
          channel_id: "100",
          user_id: "980821",
          terminal: "android",
          identity: "第四级代理",
          game_type: "游戏一",
          game_room: "房间一",
          ramadhin: "120397",
          money: "10000.00"
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

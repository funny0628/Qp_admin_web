<!-- 游戏记录 -->
<template>
  <div id="GameRec-main">
    <input-area>
      <el-select v-model="format.platform" clearable placeholder="平台" size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="format.platform_id" clearable placeholder="渠道ID" size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.gambling_party" placeholder="牌局号" size="medium"></el-input>
      <el-input v-model="format.user_id" placeholder="请输入用户ID" size="medium"></el-input>
      <el-select v-model="format.room_type" clearable placeholder="房间类型" size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
            <template v-if="scope.prop === 'action'">
              <permission-button
                style="cursor: pointer; padding-left: 5px;">
                <span>查看</span>
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
  import SelectTime from "../../plugin/components/SelectTime";
  import BaseIframe from "../../plugin/script/common/BaseIframe";
  import PageInfo from "../../plugin/script/common/PageInfo";
  import InfoTableItem from "../../plugin/components/InfoTableItem";
  import InputArea from "../../plugin/components/InputArea";

  export default {
    name: "GameRec",
    extends: BaseIframe,
    components: {
      InputArea,
      PermissionButton,
      InfoTable,
      SelectTime,
      InfoTableItem
    },
    data() {
      return {
        //搜索条件数据
        platforms: [
          { value: "1", label: "平台1" },
          { value: "2", label: "平台2" }
        ],
        games: [{ value: "1", label: "游戏1" }, { value: "2", label: "游戏2" }],
        format: {
          platform: "1",
          platform_id: "",
          gambling_party: "",
          user_id: "",
          room_type: ""
        },
        date: [],
        //表格数据
        tableStyle: [
          { label: "牌局号", prop: "gambling_party", width: "" },
          { label: "用户ID", prop: "user_id", width: "" },
          { label: "玩家昵称", prop: "user_desc", width: "" },
          { label: "房间类型", prop: "room_type", width: "" },
          { label: "游戏开始时间", prop: "begin_time", width: "160" },
          { label: "游戏结束时间", prop: "end_time", width: "" },
          { label: "参与人数/机器人", prop: "join_persons", width: "" },
          { label: "玩家总输赢", prop: "player_total_win_or_lose", width: "" },
          { label: "台费", prop: "stage_spend", width: "" },
          { label: "操作", prop: "action", width: "" }
        ],
        records: [
          {
            gambling_party: "14589756423145",
            user_id: "100045",
            user_desc: "展示夹雪",
            room_type: "斗地主初级场",
            begin_time: "20190203120000",
            end_time: "20190203120056",
            join_persons: "20/2",
            player_total_win_or_lose: "+100.00",
            stage_spend: "5.00",
            action: "查看"
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

<template>
  <div id="gold_rec">
    <input-area>
      <el-select v-model="format.platform" clearable placeholder="平台" size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.user_id" clearable placeholder="请输入用户ID" size="medium"></el-input>
      <el-input v-model="format.nickname" clearable placeholder="用户昵称" size="medium"></el-input>
      <el-input v-model="format.channe_id" clearable placeholder="渠道ID" size="medium"></el-input>
      <el-input v-model="format.game" clearable placeholder="游戏" size="medium"></el-input>
      <el-input v-model="format.room" clearable placeholder="房间号" size="medium"></el-input>
      <select-time :date="date" :select-time.sync="date" size="medium"></select-time>
      <permission-button :action="ActionType.READ" @click="search">
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
import SelectTime from "../../plugin/components/SelectTime";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PageInfo from "../../plugin/script/common/PageInfo";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "gold_rec",
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
      format: {
        platform: "",
        user_id: "",
        nickname: "",
        channe_id: "",
        game: "",
        room: ""
      },
      date: [],
      platforms: [],
      tableStyle: [
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "渠道ID", prop: "platfrom_id", width: "" },
        { label: "玩家昵称", prop: "player_name", width: "" },
        { label: "游戏", prop: "game", width: "" },
        { label: "进入游戏前金额", prop: "pre_game", width: "" },
        { label: "推出游戏后金额", prop: "aft_game", width: "" },
        { label: "充值金额", prop: "credit", width: "" },
        { label: "时间", prop: "time", width: "" }
      ],
      records: [
        {
          user_id: "100045",
          platfrom_id: "01",
          player_name: "玩雪楼",
          game: "游戏1",
          pre_game: "0.000",
          aft_game: "10000.000",
          credit: "0.000",
          time: "2019-09-14 12:00:00"
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
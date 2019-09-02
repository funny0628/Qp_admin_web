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
      <el-input v-model="format.user_id" placeholder="请输入用户ID" size="medium"></el-input>
      <el-input v-model="format.nickname" placeholder="用户昵称" size="medium"></el-input>
      <el-input v-model="format.platform_id" placeholder="渠道ID" size="medium"></el-input>
      <el-select v-model="format.game" clearable placeholder="游戏" size="medium">
        <el-option v-for="item in games" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input v-model="format.room" placeholder="房间号" size="medium"></el-input>
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
        user_id: "",
        nickname: "",
        platform_id: "",
        room:''
      },
      date:[],
      //表格数据
      tableStyle: [
        { label: "游戏开始时间", prop: "begin_time", width: "160" },
        { label: "游戏结束时间", prop: "end_time", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "渠道ID", prop: "platform_id", width: "" },
        { label: "玩家昵称", prop: "user_desc", width: "" },
        { label: "游戏", prop: "game", width: "" },
        { label: "房间号", prop: "room", width: "" },
        { label: "开始金币", prop: "start_gold", width: "" },
        { label: "下注金币", prop: "bet_gold", width: "" },
        { label: "返还金币", prop: "return_gold", width: "" },
        { label: "抽水金币", prop: "pump_gold", width: "" },
        { label: "结束金币", prop: "end_gold", width: "" },
        { label: "输赢值", prop: "value", width: "" }
      ],
      records: [
        {
          begin_time: "20190203120000",
          end_time: "20190203120056",
          user_id: "100045",
          platform_id: "01",
          user_desc: "展示夹雪",
          game: "魔兽世界",
          room: "12318397",
          start_gold: '100.00',
          bet_gold: "1.00",
          return_gold: '0.00',
          pump_gold: "0.00",
          end_gold: "101.00",
          value:'+1.00'
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0)
    };
  },
  methods:{
    search(){

    }
  }
};
</script>

<style scoped>
</style>

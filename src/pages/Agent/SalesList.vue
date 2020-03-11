<!--业绩返佣列表-->
<template>
  <div id="SalesList">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="format.Registration_time"
        value-format="yyyy-MM-dd"
        align="right"
        type="date"
        size="medium"
        clearable
        placeholder="请输入注册时间"
        :picker-options="pickerOptions"
        style="width: 180px"
      ></el-date-picker>
      <permission-button :action="ActionType.ADD">
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
  </div>
</template>

<script>
import InfoTable from "../../plugin/components/InfoTable";
import PermissionButton from "../../plugin/components/PermissionButton";
import InputArea from "../../plugin/components/InputArea";
import SelectTime from "../../plugin/components/SelectTime";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "SalesList",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InfoTable,
    PermissionButton,
    InputArea,
    SelectTime
  },
  data() {
    return {
      format:{
        platform:'',
      },
      platforms: [
        { label: "平台一", value: "1" },
        { label: "平台二", value: "2" }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      date:[],
      tableStyle: [
        { label: "时间", prop: "time", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "用户昵称", prop: "user_name", width: "" },
        { label: "所属渠道", prop: "team_result", width: "" },
        { label: "团队人数", prop: "ratio", width: "" },
        { label: "直属下级人数", prop: "team_ratio", width: "" },
        { label: "直属下级流水", prop: "obtain_ratio", width: "" },
        { label: "团队流水", prop: "obtain_ratio", width: "" },
        { label: "直属佣金", prop: "obtain_ratio", width: "" },
        { label: "代理佣金", prop: "obtain_ratio", width: "" },
        { label: "操作", prop: "action", width: "" },
      ],
      //表数据
      records: [
        {
          time: "2019-09-01 12:00:00",
          user_id: "1001100",
          user_name: "武广",
          team_result: "1000000.00",
          ratio: "6",
          team_ratio: "600.00",
          obtain_ratio: "100.00",
          action: ""
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
<!--业绩返佣列表-->

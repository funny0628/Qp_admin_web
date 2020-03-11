<template>
  <div id="UserJournal-main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-select v-model="format.operation_module" placeholder="操作模块" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.operate_ip" placeholder="操作IP" size="medium" clearable></el-input>
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
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="tabeData"
        :page-info="pageInfo"
      >
        item.state = 'input/disabled'
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template>{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import SelectTime from "../../plugin/components/SelectTime";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import UserHandler from "../../script/handlers/UserHandler";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "UserJournal",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  data() {
    /*校验手机号*/
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        if (/^[1][345789]\d{9}$/.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      labelPosition: "left", //左对齐
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: "",
        user_id: "",
        operation_module: "",
        operate_ip: "",
        Registration_time: ""
      },
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
      tableStyle: [
        { label: "日志编号", prop: "journal_num", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "操作模块", prop: "operation_module", width: "" },
        { label: "操作详情", prop: "operation_detail", width: "" },
        { label: "操作IP", prop: "operation_ip", width: "" },
        { label: "操作时间", prop: "operation_time", width: "" },
      ],
      tabeData: [
        {
          journal_num: "1001001",
          user_id: "10006",
          operation_module: "推广中心",
          operation_detail: "分享推广链接",
          operation_ip: "192.168.0.0",
          operation_time: "2019-10-10 13:00:00",
        },
        {
          journal_num: "1001001",
          user_id: "10006",
          operation_module: "推广中心",
          operation_detail: "分享推广链接",
          operation_ip: "192.168.0.0",
          operation_time: "2019-10-10 13:00:00",
        },
        {
          journal_num: "1001001",
          user_id: "10006",
          operation_module: "推广中心",
          operation_detail: "分享推广链接",
          operation_ip: "192.168.0.0",
          operation_time: "2019-10-10 13:00:00",
        }
      ],
      records: [],
      pageInfo: new PageInfo(1, [5, 10, 15], 6),
      dialogAddVisible: false,
    };
  },
  methods: {
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    /** 添加会员 */
    addUser() {
      this.dialogAddVisible = true;
    }
  },
  mounted() {
    // this.getUserPlatform()
  }
};
</script>

<style scoped>
#UserJournal-main .bd {
  padding-left: 20px;
  padding-right: 20px;
}
#UserJournal-main .bd p {
  margin: 0;
}


.bankCard {
  width: 100%;
}

.itemClass {
  width: 45%;
}
</style>

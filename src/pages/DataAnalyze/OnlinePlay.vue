<template>
  <div id="OnlinePlay-main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="format.channel_id" placeholder="渠道ID" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
    </input-area>
    <div id="myChart" style="width: 90%;height: 400px;padding-left: 20px;padding-right: 20px;padding-bottom:20px;"></div>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="tableData"
        :page-info="pageInfo"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template>{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
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
  name: "OnlinePlay",
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
        channel_id: ""
      },
      tableStyle: [
        { label: "人数类别", prop: "user_id", width: "" },
        { label: "andriod在线", prop: "nickname", width: "" },
        { label: "ios在线", prop: "before_gold", width: "" },
        { label: "总大厅人数", prop: "enter_room", width: "" },
        { label: "当天注册在线", prop: "enter_time", width: "" },
        { label: "正在游戏房间人数", prop: "win_or_lose_gold", width: "" },
        { label: "当天人数峰值", prop: "leave_time", width: "" },
        { label: "昨天人数峰值", prop: "leave_time", width: "" },
        { label: "历史在线峰值", prop: "leave_time", width: "" }
      ],
      tableData: [
        {
          user_id: "1000100",
          nickname: "测试线",
          before_gold: "100.00",
          enter_room: "捕鱼-初级场",
          enter_time: "2019-10-10 13:00:00",
          win_or_lose_gold: +50,
          leave_time: "2019-12-10 13:00:00"
        },
        {
          user_id: "1000100",
          nickname: "测试线",
          before_gold: "100.00",
          enter_room: "捕鱼-初级场",
          enter_time: "2019-10-10 13:00:00",
          win_or_lose_gold: +50,
          leave_time: "2019-12-10 13:00:00"
        }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false
    };
  },
  methods: {
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [100, 270, 130, 260, 90, 300, 150]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [80, 240, 120, 210, 110, 320, 130]
          }
        ]
      });
    },
    /**获取用户列表接口 */
    userList(data, user_id) {
      UserHandler.list(data, user_id).promise.then(res => {
        if (Number(res.code) === 200) {
          this.records = res.data.list;
          /**数据处理*/
          let goldArr = [];
          let top_up_amount = "";
          let change_amount = "";
          let alipay_account = [];
          let personArr = [];
          this.records.map(item => {
            goldArr.push("总金额：" + item.money);
            goldArr.push("理财：" + item.fanancial);
            top_up_amount = item.pay_sum + "/" + item.pay_count;
            change_amount = item.draw_sum + "/" + item.draw_count;
            if (item.bank_info.length > 0) {
              item.bank_info.map(bank => {
                if (Number(bank.bank_id) !== 1) {
                  /** 支付宝 **/
                  personArr.push("开户人：" + bank.bank_user);
                  personArr.push("卡号：" + bank.bank_card);
                  personArr.push("开户行：" + bank.subbranch);
                } else {
                  alipay_account.push("账号：" + bank.bank_card);
                  alipay_account.push("名称：" + bank.bank_name);
                }
              });
            }
            item.action = [
              {
                label: "修改",
                type: "edit"
              },
              {
                label: "冻结",
                type: "freeze"
              },
              {
                label: "强制下线",
                type: "light"
              }
            ];
            item.user_gold = goldArr;
            item.top_up_amount = top_up_amount;
            item.change_amount = change_amount;
            item.alipay_account = alipay_account;
            item.account_person = personArr;
          });
        }
      });
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>

<style scoped>
#OnlinePlay-main .bd {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
}
#OnlinePlay-main .bd p {
  margin: 0;
}

.platformchoice {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}

.bankCard {
  width: 100%;
}

.itemClass {
  width: 45%;
}
</style>

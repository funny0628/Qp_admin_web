<template>
  <div id="OnlinePlay-main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium" style="float: left">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="nav" style="float: left;margin-left: 200px;">
          <div class="nav-item" :class="{active: currentIndex === index}" v-for="(item,index) in navData" :key="index" @click="showTab(item,index)">{{item}}</div>
      </div>
    </input-area>
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
      currentIndex: 0,
      currentItem: "新增留存",
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: "",
      },
      navData: ["新增留存","活跃留存","付费留存","回流用户留存"],
      tableStyle: [
        { label: "日期", prop: "user_id", width: "" },
        { label: "新增用户", prop: "nickname", width: "" },
        { label: "次日留存", prop: "before_gold", width: "" },
        { label: "2天", prop: "enter_room", width: "" },
        { label: "3天", prop: "enter_time", width: "" },
        { label: "4天", prop: "win_or_lose_gold", width: "" },
        { label: "5天", prop: "leave_time", width: "" },
        { label: "6天", prop: "leave_time", width: "" },
        { label: "7天", prop: "leave_time", width: "" },
        { label: "15天", prop: "leave_time", width: "" },
        { label: "30天", prop: "leave_time", width: "" },
        { label: "45天", prop: "leave_time", width: "" },
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
    showTab(item,index) {
        this.currentIndex = index
        this.currentItem = item
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
  }
};
</script>

<style scoped>
#OnlinePlay-main .bd {
    padding-left: 20px;
    padding-right: 20px;
}
#OnlinePlay-main .bd p {
  margin: 0;
}
.nav-item {
    width: 130px;
    height: 50px;
    border: 1px solid #d7d7d7;
    line-height: 30px;
    font-weight: normal;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    float: left;
    cursor: pointer;
}
.active {
    background-color: #6298fb;
    color: #fff;
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

<template>
  <div id="userList—main">
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
      <el-input v-model="format.order_num" placeholder="订单编号" size="medium" clearable></el-input>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-select v-model="format.order_status" placeholder="订单状态" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="format.pay_type" placeholder="付款方式" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="format.belong_type" placeholder="所属类型" clearable size="medium">
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
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
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
            <template v-if="scope.prop === 'action'">
              <permission-button @click="handelClick" style="cursor: pointer; padding-left: 5px;">
                <span>{{scope.prop}}</span>
              </permission-button>
            </template>
            <template>{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!--充值审核 -->
    <div>
      <el-dialog title="订单-xxxxxxxx" :visible.sync="dialogModifyVisible" width="30%" center>
        <table
          border="1"
          style="border-color: #c0c4cc;width: 80%;"
          cellspacing="0"
          cellpadding="10"
        >
          <tr>
            <td style="width: 100px;text-align: center">用户ID</td>
            <td style="text-align: center">100000125</td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">渠道ID</td>
            <td style="text-align: center">10001</td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">用户昵称</td>
            <td style="text-align: center">时来运转</td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">付款金额</td>
            <td style="text-align: center">1000.00</td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">付款人</td>
            <td style="text-align: center">阿牛</td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">付款方式</td>
            <td style="text-align: center">阿里支付</td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">所属类型</td>
            <td style="text-align: center">第三方支付</td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">申请时间</td>
            <td style="text-align: center">2019-12-20</td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">备注</td>
            <td style="text-align: center">
              <el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
            </td>
          </tr>
        </table>
        <div slot="footer" class="dialog-footer" style="margin-top: 10px;">
          <el-button
            style="background-color: #ff6624;color: #fff;"
            @click="dialogAddVisible = false"
          >订单不通过</el-button>
          <el-button type="primary">审核通过</el-button>
        </div>
      </el-dialog>
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
  name: "PayOrderRecord",
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
      dialogModifyVisible: false,
      labelPosition: "left", //左对齐
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: "",
        channel_id: "",
        order_num: "",
        user_id: "",
        order_status: "",
        pay_type: "",
        belong_type: "",
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
        { label: "订单号", prop: "user_id", width: "" },
        { label: "用户ID", prop: "nickname", width: "" },
        { label: "玩家昵称", prop: "channel_id", width: "" },
        { label: "渠道ID", prop: "change_num", width: "" },
        { label: "付款方式", prop: "change_after_num", width: "" },
        { label: "所属类型", prop: "change_type", width: "" },
        { label: "订单金额", prop: "room_type", width: "" },
        { label: "金额变动", prop: "operation_person", width: "" },
        { label: "赠送金额", prop: "operation_time", width: "" },
        { label: "订单状态", prop: "operation_time", width: "" },
        { label: "提交时间/到账时间", prop: "operation_time", width: "" },
        { label: "操作用户", prop: "operation_time", width: "" },
        { label: "订单备注", prop: "operation_time", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tableData: [
        {
          user_id: "1000100",
          nickname: "测试线",
          channel_id: "10001",
          change_num: "-5.0",
          change_after_num: "100.00",
          change_type: "100.00",
          room_type: "捕鱼-初级场",
          operation_person: "--",
          operation_time: "2020-01-01 12:00:00",
          action: "查看"
        },
        {
          user_id: "1000100",
          nickname: "测试线",
          channel_id: "10001",
          change_num: "-5.0",
          change_after_num: "100.00",
          change_type: "100.00",
          room_type: "捕鱼-初级场",
          operation_person: "--",
          action: "审核"
        }
      ],
      userTypes: [
        {
          value: "1",
          label: "代理"
        },
        {
          value: "2",
          label: "普通用户"
        },
        {
          value: "3",
          label: "游客"
        },
        {
          value: "4",
          label: "试玩"
        },
        {
          value: "5",
          label: "测试号"
        }
      ],
      vips: [
        {
          value: "0",
          label: "VIP1"
        },
        {
          value: "1",
          label: "VIP2"
        }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        agent: 100,
        nickname: "",
        password: "",
        money_password: "",
        phone: "",
        user_type: "1"
      }
    };
  },
  methods: {
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    handelClick() {
      this.dialogModifyVisible = true;
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
  mounted() {}
};
</script>

<style scoped>
#userList—main .bd p {
  margin: 0;
}

.platformchoice {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
table {
  border-collapse: collapse;
  margin: 0 auto;
}
.bankCard {
  width: 100%;
}

.itemClass {
  width: 45%;
}
</style>

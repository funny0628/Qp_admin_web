<template>
  <div id="payConfig-main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.channel_name" placeholder="通道名称" size="medium" clearable></el-input>
      <el-select v-model="format.pay_type" placeholder="支付类型" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="format.state" filterable placeholder="状态" size="medium" clearable>
        <el-option
          v-for="item in options"
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
      <permission-button :action="ActionType.ADD" @click="addUser()">
        <el-button type="primary" size="medium">新增</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        item.state = 'input/disabled'
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span style="color: #11d076;" v-if="scope.row[scope.prop]  == 1">启用</span>
              <span style="color: #ff001e;" v-else>禁用</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handelClick(btn,scope.row)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','status','user_id'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div>
      <!-- 新增支付配置 -->
      <el-dialog title="新增支付配置" :visible.sync="dialogAddVisible" width="40%" center>
        <el-form :model="form">
          <el-form-item label-width="80px">
            <table cellspacing="0" cellpadding="10" width="80%">
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">绑定分层</td>
                <td>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="vip1"></el-checkbox>
                    <el-checkbox label="vip2"></el-checkbox>
                    <el-checkbox label="vip3"></el-checkbox>
                    <el-checkbox label="vip4"></el-checkbox>
                    <el-checkbox label="vip5"></el-checkbox>
                    <el-checkbox label="vip6"></el-checkbox>
                  </el-checkbox-group>
                </td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">商户号</td>
                <td style="text-align: center">90212515458</td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">商户密钥</td>
                <td style="text-align: center">*******</td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">支付类型</td>
                <td style="text-align: center">
                  <el-select placeholder="请选择支付类型" style="width: 100%;">
                    <el-option label="阿里支付" value="ali-pay"></el-option>
                    <el-option label="微信支付" value="weixin-pay"></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">通道名称</td>
                <td style="text-align: center">---</td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">支付别名</td>
                <td style="text-align: center">阿里支付</td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">单笔最小金额</td>
                <td style="text-align: center">0.00</td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">单笔最大金额</td>
                <td style="text-align: center">10000.00</td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">金额模式</td>
                <td style="text-align: center">
                  <el-select placeholder="固定金额">
                    <el-option label="100" value="ali-pay"></el-option>
                    <el-option label="200" value="weixin-pay"></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">自定义金额</td>
                <td>
                  <el-input
                    style="margin-bottom: 10px;"
                    autocomplete="off"
                    placeholder="请输入预设金额,最多支持8个定义金额"
                  ></el-input>
                  <el-tag style="margin-right: 10px;" v-for="n in 3" :key="n" closable>100元</el-tag>
                </td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">状态</td>
                <td style="text-align: center">
                  <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center;background-color:#f2f2f2;">备注</td>
                <td style="text-align: center">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: 10px;">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
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
  name: "payConfig",
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
      value: true,
      player_id: "", // 玩家id
      labelPosition: "left", //左对齐
      checkList: ['vip1','vip2'],
      options: [
        { value: "1", label: "冻结" },
        { value: "2", label: "启用" }
      ],
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: "",
        channel_name: "",
        pay_type: "",
        state: "",
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
        { label: "ID编号", prop: "platform_id", width: "" },
        { label: "通道名称", prop: "channel_name", width: "" },
        { label: "支付别名", prop: "pay_alias", width: "" },
        { label: "支付类型", prop: "pay_type", width: "" },
        { label: "单笔最小额度", prop: "single_min_money", width: "" },
        { label: "单笔最大额度", prop: "single_max_money", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "备注说明", prop: "remark", width: "" },
        { label: "添加时间", prop: "add_time", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          platform_id: "1",
          channel_name: "阿里支付",
          pay_alias: "银联通道",
          pay_type: "银联",
          single_min_money: "100",
          single_max_money: "100000",
          status: "0",
          remark: "",
          add_time: "2019-01-01 12:00",
          action: [
            { label: "修改", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        },
        {
          platform_id: "1",
          channel_name: "阿里支付",
          pay_alias: "银联通道",
          pay_type: "银联",
          single_min_money: "100",
          single_max_money: "100000",
          status: "1",
          remark: "",
          add_time: "2019-01-01 12:00",
          action: [
            { label: "修改", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        agent: 100,
        nickname: "",
        password: "",
        money_password: "",
        phone: "",
        user_type: "1"
      },
      //修改会员信
      activeName: "first",
      dialogModifyVisible: false //模态框
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
    },
    handelClick(btn, row) {
      if (btn.type === "edit") {
      }
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
#payConfig-main .bd {
  padding-left: 20px;
}
#payConfig-main .bd p {
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
table {
  border-collapse: collapse;
}
table,
table tr td {
  border: 1px solid #e4e4e4;
}
.itemClass {
  width: 45%;
}
</style>

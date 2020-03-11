<template>
  <div id="ChannelPayConf-main">
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
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  == 1">启用</span>
              <span v-else>冻结</span>
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
            >{{scope.row[scope.prop]}}
            </template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <el-dialog title="渠道支付编辑" :visible.sync="dialogModifyVisible" width="30%" center>
      <el-form :model="form">
        <el-form-item>
          <table
            border="1"
            style="border-color: #c0c4cc;width: 80%;"
            cellspacing="0"
            cellpadding="10"
          >
            <tr>
              <td style="width: 100px;text-align: center">渠道ID</td>
              <td style="text-align: center">
                <el-input v-model="form.channel_id" autocomplete="off"></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 100px;text-align: center">渠道名称</td>
              <td style="text-align: center">
                <el-input v-model="form.channel_name" autocomplete="off" placeholder="请输入渠道名称"></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 100px;text-align: center">专享支付</td>
              <td style="text-align: center">
                <el-checkbox>全部</el-checkbox>
              </td>
            </tr>
            <tr>
              <td style="width: 100px;text-align: center">支付宝</td>
              <td style="text-align: center">
                <el-checkbox>全部</el-checkbox>
              </td>
            </tr>
            <tr>
              <td style="width: 100px;text-align: center">微信</td>
              <td style="text-align: center">
                <el-checkbox>全部</el-checkbox>
              </td>
            </tr>
            <tr>
              <td style="width: 100px;text-align: center">云闪付</td>
              <td style="text-align: center">
                <el-checkbox>全部</el-checkbox>
              </td>
            </tr>
            <tr>
              <td style="width: 100px;text-align: center">银行卡</td>
              <td style="text-align: center">
                <el-checkbox>全部</el-checkbox>
              </td>
            </tr>
            <tr>
              <td style="width: 100px;text-align: center">QQ</td>
              <td style="text-align: center">
                <el-checkbox>全部</el-checkbox>
              </td>
            </tr>
          </table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top: 10px;">
        <el-button
          style="background-color: #d7d7d7;color: #fff;"
          @click="dialogModifyVisible = false"
        >取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </el-dialog>
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
  name: "ChannelPayConf",
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
      dialogModifyVisible: false,
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: "",
        channel_id: "",
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
        { label: "渠道ID", prop: "user_id", width: "" },
        { label: "渠道名称", prop: "nickname", width: "" },
        { label: "渠道支付配置", prop: "before_gold", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tableData: [
        {
          user_id: "1000100",
          nickname: "测试线",
          before_gold: "100.00",
          action: [
            { label: "编辑", type: "edit" },
            { label: "禁用", type: "ban" },
          ]
        },
        {
          user_id: "1000100",
          nickname: "测试线",
          before_gold: "100.00",
          action: [
            { label: "编辑", type: "edit" },
            { label: "禁用", type: "ban" },
          ]
        }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      form: {
          channel_id: "",
          channel_name: ""
      },
    };
  },
  methods: {
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    handelClick(btn,row) {
      if(btn.type === 'edit') {
        this.dialogModifyVisible = true
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
#ChannelPayConf-main .bd {
  padding-left: 20px;
  padding-right: 20px;
}
#ChannelPayConf-main .bd p {
  margin: 0;
}

.platformchoice {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
table {
  border-collapse: collapse;
}
table,table tr td {
  border: 1px solid #e4e4e4;
}
.bankCard {
  width: 100%;
}

.itemClass {
  width: 45%;
}
</style>

<template>
  <div id="PushFunction-main">
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
      <el-input v-model="format.user_nickname" placeholder="请输入用户昵称" size="medium" clearable></el-input>
      <el-select v-model="format.active_type" placeholder="活动类型" clearable size="medium">
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
      <el-button type="primary" size="medium" @click="dialogFormVisible=true">推送设置</el-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="tableData"
        :page-info="pageInfo"
        :hide-page="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'push_status'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  == 1" style="color: #0077f9;">成功</span>
              <span v-if="scope.row[scope.prop]  == 2" style="color: #ff9a2c;">待推送</span>
              <span v-if="scope.row[scope.prop]  == 0" style="color: #ff001e;">失败</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="dialogVisible = true"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template v-if="['action','push_status'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <el-dialog title="新增推送" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="form">
        <el-form-item label-width="100px">
          <table
            style="width: 80%;border-collapse: collapse;"
            cellspacing="0"
            cellpadding="10"
          >
            <tr>
              <td style="width: 120px;text-align: center;background-color: #f2f2f2;">通知标题</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 120px;text-align: center;background-color: #f2f2f2;">通知内容</td>
              <td style="text-align: center">
                <el-input
                  type="textarea"
                  row="4"
                  v-model="form2.name"
                  autocomplete="off"
                  placeholder
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 120px;text-align: center;background-color: #f2f2f2;">推送平台</td>
              <td style="text-align: center">
                <el-select v-model="form.region" placeholder="请选择推送平台" style="width:100%;">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="个人" value=""></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td style="width: 120px;text-align: center;background-color: #f2f2f2;">发送方式</td>
              <td style="text-align: center">
                <el-select v-model="form.region" placeholder="请选择发送方式" style="width:100%;">
                  <el-option label="定时发送" value=""></el-option>
                  <el-option label="每隔一段时间发送一次" value=""></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td style="width: 120px;text-align: center;background-color: #f2f2f2;">发送时间</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
              </td>
            </tr>
          </table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
  name: "PushFunction",
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
      player_id: "", // 玩家id
      labelPosition: "left", //左对齐
      dialogFormVisible: false,
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: "",
        user_id: "",
        user_nickname: "",
        active_type: "",
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
        { label: "通知ID", prop: "notice_id", width: "" },
        { label: "标题", prop: "title", width: "" },
        { label: "内容", prop: "content", width: "" },
        { label: "推送平台", prop: "push_platform", width: "" },
        { label: "发送方式", prop: "send_way", width: "" },
        { label: "开始推送时间", prop: "start_push_time", width: "" },
        { label: "推送状态", prop: "push_status", width: "" },
        { label: "操作人", prop: "operator", width: "" },
        { label: "操作", prop: "operation", width: "" }
      ],
      tableData: [
        {
          notice_id: "01",
          title: "新游上线",
          content: "",
          push_platform: "ios",
          send_way: "立即发送",
          start_push_time: "2019-10-10 13:00:00",
          push_status: "0",
          operator: "",
          operation: ""
        },
        {
          notice_id: "01",
          title: "新游上线",
          content: "",
          push_platform: "ios",
          send_way: "立即发送",
          start_push_time: "2019-10-10 13:00:00",
          push_status: "1",
          operator: "",
          operation: ""
        },
        {
          notice_id: "01",
          title: "新游上线",
          content: "",
          push_platform: "ios",
          send_way: "立即发送",
          start_push_time: "2019-10-10 13:00:00",
          push_status: "2",
          operator: "",
          operation: ""
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
      },
      form2: {
          name: ""
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
#PushFunction-main .bd {
  padding: 0 20px;
}
#PushFunction-main .bd p {
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
table,table tr th, table tr td {
  border: 1px solid #e9e9e9;
}
</style>

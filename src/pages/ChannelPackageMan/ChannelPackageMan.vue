<template>
  <div id="ChannelPackageMan-main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.package_id" placeholder="请输入包id" clearable size="medium"></el-input>
      <el-input v-model="format.package_name" placeholder="包名" clearable size="medium"></el-input>
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
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium" @click="dialogAddVisible=true">新增</el-button>
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
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','status'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!-- 新增包 -->
    <el-dialog title="新增包" :visible.sync="dialogAddVisible" width="30%" center>
      <el-form :model="form">
        <table cellspacing="0" cellpadding="10">
          <tr>
            <td style="width: 100px;text-align: center">渠道号</td>
            <td style="text-align: center">
              <el-input placeholder="请输入渠道号"></el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">包名</td>
            <td style="text-align: center">
              <el-input placeholder="请输入包名"></el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">唯一标识</td>
            <td style="text-align: center">
              <el-input placeholder></el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">所属代理</td>
            <td style="text-align: center">
              <el-input placeholder="请输入代理ID"></el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">下载地址</td>
            <td style="text-align: center">
              <el-input placeholder></el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">设备类型</td>
            <td style="text-align: center">
              <el-select placeholder="请选择设备类型" style="width: 100%;">
                <el-option label="设备一" value></el-option>
                <el-option label="设备二" value></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">游戏开放</td>
            <td>
              <el-checkbox-group v-model="checkGameList">
                <el-checkbox label="游戏1"></el-checkbox>
                <el-checkbox label="游戏2"></el-checkbox>
                <el-checkbox label="游戏3"></el-checkbox>
                <el-checkbox label="游戏4"></el-checkbox>
                <el-checkbox label="游戏5"></el-checkbox>
                <el-checkbox label="游戏6"></el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <tr>
            <td style="width: 100px;text-align: center">皮肤选择</td>
            <td>
              <el-checkbox-group v-model="checkSkinList">
                <el-checkbox label="皮肤1"></el-checkbox>
                <el-checkbox label="皮肤2"></el-checkbox>
                <el-checkbox label="皮肤3"></el-checkbox>
                <el-checkbox label="皮肤4"></el-checkbox>
                <el-checkbox label="皮肤5"></el-checkbox>
                <el-checkbox label="皮肤6"></el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top: 10px;">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary">保 存</el-button>
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
  name: "ChannelPackageMan",
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
      checkGameList: ["游戏1", "游戏2"],
      checkSkinList: ["皮肤1", "皮肤2"],
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: "",
        package_id: "",
        package_name: "",
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
        { label: "包名", prop: "nickname", width: "" },
        { label: "唯一标识", prop: "before_gold", width: "" },
        { label: "包所属用户", prop: "enter_room", width: "" },
        { label: "下载地址", prop: "enter_time", width: "" },
        { label: "设备类型", prop: "win_or_lose_gold", width: "" },
        { label: "游戏开放", prop: "leave_time", width: "" },
        { label: "开关状态", prop: "leave_time", width: "" },
        { label: "创建时间", prop: "leave_time", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tableData: [
        {
          user_id: "1000100",
          nickname: "测试线",
          before_gold: "100.00",
          enter_room: "捕鱼-初级场",
          enter_time: "2019-10-10 13:00:00",
          win_or_lose_gold: +50,
          leave_time: "2019-12-10 13:00:00",
          action: [
            { label: "编辑", type: "edit" },
            { label: "禁用", type: "ban" }
          ]
        },
        {
          user_id: "1000100",
          nickname: "测试线",
          before_gold: "100.00",
          enter_room: "捕鱼-初级场",
          enter_time: "2019-10-10 13:00:00",
          win_or_lose_gold: +50,
          leave_time: "2019-12-10 13:00:00",
          action: [
            { label: "编辑", type: "edit" },
            { label: "禁用", type: "ban" }
          ]
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
    handelClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogFormVisible = true;
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
#ChannelPackageMan-main .bd {
  padding: 0 20px;
}
#ChannelPackageMan-main .bd p {
  margin: 0;
}
table {
  border-collapse: collapse;
}
table,
table tr td {
  border: 1px solid #c0c4cc;
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

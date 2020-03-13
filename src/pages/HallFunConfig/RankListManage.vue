<template>
  <div id="rankListManage-main">
    <div class="tab-btns">
      <div
        class="btn"
        :class="{active : index === num}"
        @click="btnShow(index)"
        v-for="(item,index) in btnList"
        :key="index"
        style="width: 140px; line-height:36px; height: 36px; display: inline-block; padding: 0;"
      >{{item}}</div>
    </div>
    <div class="tb">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="sort" label="排名" align="center" width></el-table-column>
        <el-table-column prop="user_id" align="center" label="用户ID"></el-table-column>
        <el-table-column prop="nickname" align="center" label="玩家昵称"></el-table-column>
        <el-table-column prop="user_wallet" align="center" label="用户钱包"></el-table-column>
        <el-table-column prop="today_profit" align="center" v-if="tabIndex === 0" label="今日盈利（元）"></el-table-column>
        <el-table-column
          prop="today_performance"
          align="center"
          v-if="tabIndex === 1"
          label="今日业绩（元）"
        ></el-table-column>
      </el-table>
    </div>
    <el-button
      type="primary"
      style="position: absolute;top: 136px;right: 20px;"
      @click="dialogFormVisible=true"
    >排行榜配置</el-button>
    <el-button
      type="primary"
      style="position: absolute;top: 136px;right: 150px;"
      @click="dialogVisible=true"
    >排行榜配置2</el-button>
    <!--排行榜配置1 -->
    <div>
      <el-dialog title="排行榜配置" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-form-item label="排行榜显示" :label-width="formLabelWidth">
            <div style="display: flex;  flex-wrap:nowrap;">
              <div class="earn">
                <el-button
                  :type="tabIndex === 0 ? 'success' : ''"
                  style="border-radius: 0;"
                  @click="tabIndex = 0"
                >
                  今日盈利排行
                  <i class="el-icon-arrow-right el-icon-check"></i>
                </el-button>
              </div>
              <div class="result" style="padding-left: 10px;">
                <el-button
                  :type="tabIndex === 1 ? 'success' : ''"
                  style="border-radius: 0;"
                  @click="tabIndex = 1"
                >
                  个人业绩排行
                  <i class="el-icon-arrow-right el-icon-check"></i>
                </el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="金币上榜条件" :label-width="formLabelWidth" style="display: inline-block;">
            <el-input v-model="form.name" autocomplete="off" placeholder="上榜条件(元)"></el-input>
          </el-form-item>
          <el-form-item label="业绩上榜条件" :label-width="formLabelWidth" style="display: inline-block;">
            <el-input v-model="form.name" autocomplete="off" placeholder="上榜条件(元)"></el-input>
          </el-form-item>
          <el-form-item label="刷新时间" :label-width="formLabelWidth" style="width: 45%;">
            <el-input v-model="form.name" autocomplete="off" placeholder="分钟"></el-input>
          </el-form-item>
          <el-form-item label="盈利排行奖励" :label-width="formLabelWidth">
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="第一名"
              style="width: 30%;margin-right: 10px;"
            ></el-input>
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="第二名"
              style="width: 30%;margin-right: 10px;"
            ></el-input>
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="第三名"
              style="width: 30%;margin-right: 10px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="业绩排行奖励" :label-width="formLabelWidth">
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="第一名"
              style="width: 30%;margin-right: 10px;"
            ></el-input>
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="第二名"
              style="width: 30%;margin-right: 10px;"
            ></el-input>
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="第三名"
              style="width: 30%;margin-right: 10px;"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <!-- 排行榜配置2 -->
      <el-dialog title="排行榜配置" :visible.sync="dialogVisible" width="40%" center>
        <el-form :model="form2">
          <el-form-item>
            <table width="80%" cellspacing="0" cellpadding="10">
              <tr>
                <td style="width: 150px;text-align: center">排行榜显示</td>
                <td style="text-align: center">
                  <el-checkbox v-model="checked">今日盈利排行</el-checkbox>
                  <el-checkbox v-model="checked">个人业绩排行</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 100px;text-align: center">排行榜刷新时间</td>
                <td style="text-align: center">10min</td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <table
              border="1"
              style="border-color: #c0c4cc;width: 80%;"
              cellspacing="0"
              cellpadding="10"
            >
              <tr>
                <td style="width: 150px;text-align: center">盈利上榜条件</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="(元)"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">第一名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="300"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">第二名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="200"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">第三名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="100"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">第四名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="50"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">第五名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="0"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <table style="width: 80%;" cellspacing="0" cellpadding="10">
              <tr>
                <td style="width: 150px;text-align: center">业绩上榜条件</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="(元)"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">第一名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="300"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">第二名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="200"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">第三名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="100"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">第四名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="50"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">第五名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder="0"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      value: true,
      dialogModifyVisible: false,
      dialogVisible: false,
      labelPosition: "left", //左对齐
      btnList: ["今日盈利排行", "个人业绩排行"],
      num: 0,
      tabIndex: 0, //切换tab
      tableData: [
        {
          sort: "1",
          user_id: "10002",
          nickname: "职业玩家",
          user_wallet: "1000000.00",
          today_profit: "1000000.00",
          today_performance: "1238.00"
        },
        {
          sort: "2",
          user_id: "10002",
          nickname: "职业玩家",
          user_wallet: "1000000.00",
          today_profit: "1000000.00",
          today_performance: "1238.00"
        },
        {
          sort: "3",
          user_id: "10002",
          nickname: "职业玩家",
          user_wallet: "1000000.00",
          today_profit: "1000000.00",
          today_performance: "1238.00"
        }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogFormVisible: false,
      form: {
        name: ""
      },
      form2: {
        name: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    btnShow(index) {
      this.tabIndex = index;
      this.num = index;
    },
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    handelClick() {
      this.dialogModifyVisible = true;
    },
    switchTabs(tab, event) {
      console.log(tab, event);
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
table {
  border-collapse: collapse;
  margin: 0 auto;
}
table,
table tr td {
  border: 1px solid #c0c4cc;
}

#rankListManage-main .tab-btns {
  padding: 30px 20px 10px 20px;
}

#rankListManage-main .tab-btns .btn {
  line-height: 1.5;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid #d9d9d9;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  height: 50px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
}

#rankListManage-main .tab-btns .active {
  background-color: #0079f1;
  color: #fff;
}

#rankListManage-main .tab-btns .tab-Right {
  float: right;
}

#rankListManage-main .tb {
  padding: 30px 20px 10px 20px;
}
</style>

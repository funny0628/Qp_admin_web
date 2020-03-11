<template>
  <div id="SetBackgroundMusic-main">
    <el-button
      type="primary"
      style="margin-top: 10px;margin-bottom: 10px;"
      @click="dialogFormVisible=true"
    >添加条件</el-button>
    <el-button
      type="primary"
      style="margin-top: 10px;margin-bottom: 10px;"
      @click="dialogVisible=true"
    >添加背景音乐</el-button>
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
    <!--添加音乐 -->
    <div>
      <el-dialog title="新增用户分层" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="form">
          <el-form-item label="层级名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入层级名称"></el-input>
          </el-form-item>
          <el-form-item label="充值金额" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入充值金额"></el-input>
          </el-form-item>
          <el-form-item label="充值笔数" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入充值笔数"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <!-- 添加音乐 -->
      <el-dialog title="添加音乐" :visible.sync="dialogVisible" width="40%">
        <el-form :model="form2">
          <el-form-item>
            <table style="width: 80%;" cellspacing="0" cellpadding="10">
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">音乐名称</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">添加音乐链接</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">备注</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off"></el-input>
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
  name: "SetBackgroundMusic",
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
      activeName: "first",
      tableStyle: [
        { label: "音乐编号", prop: "mus_num", width: "" },
        { label: "音乐名称", prop: "mus_name", width: "" },
        { label: "音乐链接", prop: "mus_link", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "备注", prop: "remark", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tableData: [
        {
          mus_num: "1",
          mus_name: "黄昏",
          mus_link: "www.qqmusic.com",
          status: "启用",
          remark: "",
          action: [
            { label: "停用", type: "stop" },
            { label: "删除", type: "delete" },
          ]
        },
        {
          mus_num: "1",
          mus_name: "黄昏",
          mus_link: "www.qqmusic.com",
          status: "启用",
          remark: "",
          action: [
            { label: "停用", type: "stop" },
            { label: "删除", type: "delete" },
          ]
        },
        {
          mus_num: "1",
          mus_name: "黄昏",
          mus_link: "www.qqmusic.com",
          status: "启用",
          remark: "",
          action: [
            { label: "停用", type: "stop" },
            { label: "删除", type: "delete" },
          ]
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
#SetBackgroundMusic-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#SetBackgroundMusic-main .bd p {
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
table,
table tr td {
  border: 1px solid #c0c4cc;
}
.bankCard {
  width: 100%;
}

.itemClass {
  width: 45%;
}
</style>

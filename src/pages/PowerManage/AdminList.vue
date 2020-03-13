<template>
  <div id="adminList-main">
    <input-area>
      <el-input v-model="format.admin_name" placeholder="请输入管理员名称" size="medium" clearable></el-input>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <el-button type="primary" size="medium" @click="dialogFormVisible=true">新增</el-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="tableData"
        :page-info="pageInfo"
        :hide-page="false"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span style="color: #00cd9b;" v-if="scope.row[scope.prop]  == 1">开启</span>
              <span style="color: #ff321f;" v-else>禁用</span>
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
            <template v-if="['action','status'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" width="40%" center>
      <div class="title" style="background-color: #f2f2f2;">新增管理员</div>
      <div class="content">
        <el-form :model="form">
          <el-form-item label-width="120px">
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr>
                <td style="width: 150px;text-align: center;background-color: #f2f2f2;">用户名</td>
                <td style="text-align: center">
                  <el-input v-model="form.user_name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color: #f2f2f2;">密码</td>
                <td style="text-align: center">
                  <el-input type="password" v-model="form.password" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color: #f2f2f2;">所属角色</td>
                <td style="text-align: center">
                  <el-select v-model="form.role" placeholder="请选择角色" style="width: 100%;">
                    <el-option label="管理员" value=""></el-option>
                    <el-option label="游客" value=""></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color: #f2f2f2;">备注</td>
                <td style="text-align: center">
                  <el-input v-model="form.remark" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color: #f2f2f2;">渠道</td>
                <td style="text-align: center">
                  <el-checkbox>复选框</el-checkbox>
                  <el-checkbox>复选框</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
        </div>
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
  name: "adminList",
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
      format: {
        admin_name: ""
      },
      tableStyle: [
        { label: "ID", prop: "id", width: "" },
        { label: "管理员名称", prop: "admin_name", width: "" },
        { label: "所属角色", prop: "belong_role", width: "" },
        { label: "渠道", prop: "channel", width: "" },
        { label: "创建时间", prop: "create_time", width: "" },
        { label: "更新时间", prop: "update_time", width: "" },
        { label: "备注", prop: "remark", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tableData: [
        {
          id: "01",
          admin_name: "新游上线",
          belong_role: "",
          channel: "www.baidu.com",
          create_time: "2019-10-10 13:00:00",
          update_time: "2019-10-10 13:00:00",
          create_time: "2019-10-10 13:00:00",
          remark: "",
          status: "1",
          action: [
            { label: "编辑", type: "edit" },
            { label: "禁用", type: "ban" },
            { label: "删除", type: "delete" }
          ]
        },
        {
          id: "01",
          admin_name: "新游上线",
          belong_role: "",
          channel: "www.baidu.com",
          create_time: "2019-10-10 13:00:00",
          update_time: "2019-10-10 13:00:00",
          create_time: "2019-10-10 13:00:00",
          remark: "",
          status: "0",
          action: [
            { label: "编辑", type: "edit" },
            { label: "禁用", type: "ban" },
            { label: "删除", type: "delete" }
          ]
        }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        user_name: 100,
        password: "",
        role: "",
        remark: "",
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
#adminList-main .bd {
  padding: 0 20px;
}
#adminList-main .bd p {
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
table,
table tr th,
table tr td {
  border: 1px solid #e9e9e9;
}
.title {
  height: 35px;
  line-height: 35px;
  padding-left: 20px;
  font-weight: bold;
  border: 1px solid #e4e4e4;
}
.content {
  padding: 20px;
  border: 1px solid #e4e4e4;
  border-top: none;
  text-align: center;
}
</style>

<template>
  <div id="EmailSystem-main">
    <el-button
      type="primary"
      style="margin-top: 10px;margin-bottom: 10px;"
      @click="dialogFormVisible=true"
    >新增</el-button>
    <el-button
      type="primary"
      style="margin-top: 10px;margin-bottom: 10px;"
      @click="dialogVisible=true"
    >添加宣传页</el-button>
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
    <!--新增内部邮件 -->
    <div>
      <el-dialog title="新增内部邮件" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="form">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="form.email_title" autocomplete="off" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="发送时间" :label-width="formLabelWidth">
            <el-input v-model="form.send_time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input type="textarea" row="4" v-model="form.email_content" autocomplete="off" placeholder="请输入内部邮件内容"></el-input>
          </el-form-item>
          <el-form-item label="接收人" :label-width="formLabelWidth">
            <el-input v-model="form.receive" autocomplete="off" placeholder="请输入接收人"></el-input>
          </el-form-item>
          <el-form-item label="接收层级" :label-width="formLabelWidth">
            <el-checkbox>vip1</el-checkbox>
            <el-checkbox>vip1</el-checkbox>
            <el-checkbox>vip1</el-checkbox>
            <el-checkbox>vip1</el-checkbox>
            <el-checkbox>vip1</el-checkbox>
            <el-checkbox>vip1</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <!-- 新增邮件 -->
      <el-dialog title="新增邮件" :visible.sync="dialogVisible" width="40%">
        <el-form :model="form2">
          <el-form-item>
            <table
              style="width: 80%;"
              cellspacing="0"
              cellpadding="10"
            >
              <tr>
                <td style="width: 150px;text-align: center">是否全服收邮件</td>
                <td style="text-align: center">
                  <el-select v-model="form2.all_receive" placeholder="请选择">
                    <el-option label="是" value></el-option>
                    <el-option label="否" value></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">邮件类型</td>
                <td style="text-align: center">
                  <el-select v-model="form2.email_type" placeholder="请选择">
                    <el-option label="个人" value></el-option>
                    <el-option label="系统邮件" value></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">收件人ID</td>
                <td style="text-align: center">
                  <el-input v-model="form2.receive_id" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">发件人昵称</td>
                <td style="text-align: center">
                  <el-input v-model="form2.sender_nickname" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">邮件标题</td>
                <td style="text-align: center">
                  <el-input v-model="form2.email_title" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">邮件内容</td>
                <td style="text-align: center">
                  <el-input type="textarea" row="4" v-model="form2.email_content" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">邮件道具</td>
                <td style="text-align: center">
                  <el-select v-model="form2.email_prop" placeholder="请选择">
                    <el-option label="金币" value></el-option>
                    <el-option label="人命币" value></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">奖励数量</td>
                <td style="text-align: center">
                  <el-input type="textarea" row="4" v-model="form2.award_num" autocomplete="off" placeholder></el-input>
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
  name: "EmailSystem",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  data() {
    // /*校验手机号*/
    // let checkPhone = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("手机号不能为空"));
    //   } else {
    //     if (/^[1][345789]\d{9}$/.test(value)) {
    //       callback();
    //     } else {
    //       return callback(new Error("请输入正确的手机号"));
    //     }
    //   }
    // };
    return {
      value: true,
      dialogModifyVisible: false,
      dialogVisible: false,
      labelPosition: "left", //左对齐
      activeName: "first",
      tableStyle: [
        { label: "编号", prop: "serial_num", width: "" },
        { label: "邮件标题", prop: "email_title", width: "" },
        { label: "邮件类型", prop: "email_type", width: "" },
        { label: "渠道ID", prop: "channel_id", width: "" },
        { label: "消息内容", prop: "news_content", width: "" },
        { label: "推送时间", prop: "push_time", width: "" },
        { label: "收件人", prop: "receiver", width: "" },
        { label: "邮件道具", prop: "email_prop", width: "" },
        { label: "邮件状态", prop: "email_status", width: "" },
        { label: "发送人", prop: "sender", width: "" },
        { label: "发送时间", prop: "send_time", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tableData: [
        {
          serial_num: "",
          email_title: "金币兑换通知",
          email_type: "",
          channel_id: "",
          news_content: "我是消息",
          push_time: "",
          receiver: "张三",
          email_prop: "",
          email_status: "",
          sender: "admin",
          sender_time: "2020-01-01 12:00:00",
          action: [{label: "删除",type: "delete"}]
        },
        {
          serial_num: "",
          email_title: "金币兑换通知",
          email_type: "",
          channel_id: "",
          news_content: "我是消息",
          push_time: "",
          receiver: "张三",
          email_prop: "",
          email_status: "",
          sender: "admin",
          sender_time: "2020-01-01 12:00:00",
          action: [{label: "删除",type: "delete"}]
        }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogFormVisible: false,
      form: {
        email_title: "",
        send_time: "",
        email_content: "",
        receive: "",
      },
      form2: {
        all_receive: "",
        email_type: "",
        receive_id: "",
        sender_nickname: "",
        email_title: "",
        email_content: "",
        email_prop: "",
        award_num: ""
      },
      formLabelWidth: "100px"
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
#EmailSystem-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#EmailSystem-main .bd p {
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
table,table tr td {
  border: 1px solid #c0c4cc;;
}
.bankCard {
  width: 100%;
}

.itemClass {
  width: 45%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

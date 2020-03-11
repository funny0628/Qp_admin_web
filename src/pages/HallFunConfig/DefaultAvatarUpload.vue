<template>
  <div id="DefaultAvatarUpload-main">
    <div
      style="background-color: #0077f9;height: 30px;color: #fff;margin: 20px 20px 0 20px;line-height: 30px;padding-left: 10px;"
    >默认头像</div>
    <div class="bd">
      <div class="img-container">
        <div class="img-item" v-for="n in 8" :key="n">
          <img src="../../assets/img/default.png" alt/>
          <el-button type="primary" style="margin-top: 10px;" @click="dialogVisible=true">上传头像</el-button>
        </div>
      </div>
    </div>
      <!-- 上传头像 -->
      <el-dialog title="添加音乐" :visible.sync="dialogVisible" width="40%">
        <el-form :model="form2">
          <el-form-item>
            <table
              style="width: 80%;"
              cellspacing="0"
              cellpadding="10"
            >
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
  name: "DefaultAvatarUpload",
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
        { label: "等级ID", prop: "class_id", width: "" },
        { label: "VIP等级", prop: "vip_class", width: "" },
        { label: "充值金额", prop: "change_money", width: "" },
        { label: "VIP特权", prop: "vip_privilege", width: "" },
        { label: "头像", prop: "avatar", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tableData: [
        {
          class_id: "1",
          vip_class: "vip0",
          change_money: "0",
          vip_privilege: "0",
          avatar: "",
          action: "修改"
        },
        {
          class_id: "2",
          vip_class: "vip0",
          change_money: "0",
          vip_privilege: "0",
          avatar: "",
          action: "修改"
        },
        {
          class_id: "3",
          vip_class: "vip0",
          change_money: "0",
          vip_privilege: "0",
          avatar: "",
          action: "修改"
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
#DefaultAvatarUpload-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#DefaultAvatarUpload-main .bd p {
  margin: 0;
}
.img-container {
    padding: 20px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    margin: auto;
}
.img-item {
    width: 130px;
    height: 180px;
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
</style>

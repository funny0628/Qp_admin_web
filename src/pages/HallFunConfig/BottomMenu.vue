<template>
  <div id="BottomMenu-main">
    <input-area>
      <el-button type="danger">删除</el-button>
      <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
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
    <div>
      <!-- 添加活动入口配置 -->
      <el-dialog title="添加活动入口配置" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-position="top">
          <el-form-item label="渠道(可多选)">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox label="0902代理01"></el-checkbox>
              <el-checkbox label="0902代理02"></el-checkbox>
              <el-checkbox label="0902代理03"></el-checkbox>
              <el-checkbox label="0902代理04"></el-checkbox>
              <el-checkbox label="0902代理05"></el-checkbox>
              <el-checkbox label="0902代理06"></el-checkbox>
              <el-checkbox label="0902代理07"></el-checkbox>
              <el-checkbox label="0902代理08"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="功能1">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option v-for="(item,index) in funOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="功能2">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option v-for="(item,index) in funOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="功能3">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option v-for="(item,index) in funOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="功能4">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option v-for="(item,index) in funOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="功能5">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option v-for="(item,index) in funOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="功能6">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option v-for="(item,index) in funOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="功能7">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option v-for="(item,index) in funOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="功能8">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">功能名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option v-for="(item,index) in funOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
  name: "BottomMenu",
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
      dialogFormVisible: false,
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: ""
      },
      funOpts: [
        { value: "1", label: "留空" },
        { value: "2", label: "活动" },
        { value: "3", label: "邮件" },
        { value: "4", label: "排行榜" },
        { value: "5", label: "设置" },
        { value: "6", label: "保险箱" },
        { value: "7", label: "广播" },
        { value: "8", label: "财神" }
      ],
      tableData: [
        {
          channel_id: "10012",
          channel_name: "主包",
          fun_1: "备份",
          fun_2: "排行榜",
          fun_3: "邮箱",
          fun_4: "客服",
          fun_5: "未设定",
          fun_6: "未设定",
          fun_7: "未设定",
          action: "修改 删除"
        }
      ],
      tableStyle: [
        { label: "ID", prop: "channel_id", width: "" },
        { label: "渠道名称", prop: "channel_name", width: "" },
        { label: "渠道KEY", prop: "channel_name", width: "" },
        { label: "功能1", prop: "fun_1", width: "" },
        { label: "功能2", prop: "fun_2", width: "" },
        { label: "功能3", prop: "fun_3", width: "" },
        { label: "功能4", prop: "fun_4", width: "" },
        { label: "功能5", prop: "fun_5", width: "" },
        { label: "功能6", prop: "fun_6", width: "" },
        { label: "功能7", prop: "fun_7", width: "" },
        { label: "功能8", prop: "fun_8", width: "" },
        { label: "操作者", prop: "operator", width: "" },
        { label: "创建时间", prop: "create_time", width: "160" },
        { label: "操作", prop: "action", width: "120" }
      ],
      records: [
        {
          channel_id: "10012",
          channel_name: "主包",
          fun_1: "备份",
          fun_2: "排行榜",
          fun_3: "邮箱",
          fun_4: "客服",
          fun_5: "未设定",
          fun_6: "未设定",
          fun_7: "未设定",
          fun_8: "设定",
          operator: "json",
          create_time: "2020-02-10 12:00:00",
          action: [
            { label: "编辑", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        checkList: ["0902代理01", "0902代理02"],
        function: '1',
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
    /** 添加会员 */
    addUser() {
      this.dialogAddVisible = true;
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
#BottomMenu-main .bd {
  padding-left: 20px;
}
#BottomMenu-main .bd p {
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
.itemClass {
  width: 45%;
}
</style>

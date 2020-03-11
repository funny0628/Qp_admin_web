<template>
  <div id="FunSortConf-main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
      <!-- 修改配置 -->
      <el-dialog title="修改配置" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-form-item>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="channel_id" label="渠道ID"></el-table-column>
              <el-table-column prop="channel_name" label="渠道名称"></el-table-column>
              <el-table-column prop="fun_1" label="功能1">
                <template slot-scope="scope">
                  <el-select size="medium" v-model="scope.row.fun_1">
                    <el-option
                      v-for="item in fun_1_list"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="fun_2" label="功能2">
                <template slot-scope="scope">
                  <el-select size="medium" v-model="scope.row.fun_1">
                    <el-option
                      v-for="item in fun_1_list"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="fun_3" label="功能3">
                <template slot-scope="scope">
                  <el-select size="medium" v-model="scope.row.fun_1">
                    <el-option
                      v-for="item in fun_1_list"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="fun_4" label="功能4">
                <template slot-scope="scope">
                  <el-select size="medium" v-model="scope.row.fun_1">
                    <el-option
                      v-for="item in fun_1_list"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="fun_5" label="功能5">
                <template slot-scope="scope">
                  <el-select size="medium" v-model="scope.row.fun_1">
                    <el-option
                      v-for="item in fun_1_list"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="fun_6" label="功能6">
                <template slot-scope="scope">
                  <el-select size="medium" v-model="scope.row.fun_1">
                    <el-option
                      v-for="item in fun_1_list"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="fun_7" label="功能7">
                <template slot-scope="scope">
                  <el-select size="medium" v-model="scope.row.fun_1">
                    <el-option
                      v-for="item in fun_1_list"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
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
  name: "FunSortConf",
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
      fun_1_list: [
        { value: 1, label: "彩金客服" },
        { value: 2, label: "分享彩金" },
        { value: 3, label: "活动公告" },
        { value: 4, label: "推广中心" },
        { value: 5, label: "未设定" }
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
        { label: "渠道ID", prop: "channel_id", width: "" },
        { label: "渠道名称", prop: "channel_name", width: "" },
        { label: "功能1", prop: "fun_1", width: "" },
        { label: "功能2", prop: "fun_2", width: "" },
        { label: "功能3", prop: "fun_3", width: "" },
        { label: "功能4", prop: "fun_4", width: "" },
        { label: "功能5", prop: "fun_5", width: "" },
        { label: "功能6", prop: "fun_6", width: "" },
        { label: "功能7", prop: "fun_7", width: "" },
        { label: "操作", prop: "action", width: "" }
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
          action: [
            { label: "修改", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        },
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
    handelClick(btn,row) {
      if(btn.type === 'edit') {
        this.dialogFormVisible = true
      }
    },
    /** 添加会员 */
    addUser() {
      this.dialogAddVisible = true;
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
#FunSortConf-main .bd {
  padding-left: 20px;
}
#FunSortConf-main .bd p {
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

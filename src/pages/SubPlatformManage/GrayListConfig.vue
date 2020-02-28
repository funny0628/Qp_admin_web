<template>
  <div id="GrayListConfig-main">
    <input-area>
      <el-input v-model="format.sub_platform_name" placeholder="子平台名称" clearable size="medium">
      </el-input>
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
      <permission-button @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button @click="addUser()">
        <el-button type="primary" size="medium">新增</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="tabeData"
        :page-info="pageInfo"
      >
        item.state = 'input/disabled'
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span class="start" v-if="scope.row[scope.prop]  == 1">启用</span>
              <span class="freeze" v-else>冻结</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                style="cursor: pointer; padding-left: 5px;">
                <span></span>
              </permission-button>
            </template>
            <template>{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div>
      <!-- 新增灰度名单 -->
      <el-dialog title="新增灰度名单" :visible.sync="dialogAddVisible" width="30%" center>
        <el-form :model="form" ref="form">
            <el-form-item label="平台选择" label-width="200px" style="display: inline-block;">
            <el-select v-model="form.platform" placeholder="请选择平台" style="width: 200px;">
              <el-option
                v-for="item in idents"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="用户ID"
            label-width="200px"
            style="display: inline-block;"
          >
            <el-input
              v-model="form.user_id"
              autocomplete="off"
              style="width: 200px;"
              placeholder="请输入用户ID"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="名单备注"
            label-width="200px"
            style="display: inline-block;"
          >
            <el-input
              v-model="form.list_remark"
              autocomplete="off"
              style="width: 200px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="灰度状态" label-width="200px" style="display: inline-block;">
            <el-select v-model="form.gray_status" placeholder="请选择" style="width: 200px;">
              <el-option
                v-for="item in idents"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
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
  name: "UserList",
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
      format: {
        sub_platform_name: "",
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
        { label: "会员ID", prop: "vip_id", width: "" },
        { label: "会员昵称", prop: "vip_nickname", width: "" },
        { label: "所属平台", prop: "platform", width: "" },
        { label: "名单备注", prop: "list_remark", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "创建时间", prop: "created_time", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tabeData: [
        {
          vip_id: "100021",
          vip_nickname: "王大陆",
          platform: "完美世界",
          list_remark: "",
          status: "1",
          remark: "",
          created_time: "2019-01-01 12:00:00",
          action: "修改  禁用"
        },
        {
          vip_id: "100021",
          vip_nickname: "王大陆",
          platform: "完美世界",
          list_remark: "",
          status: "1",
          remark: "",
          created_time: "2019-01-01 12:00:00",
          action: "修改  禁用"
        },
        {
          vip_id: "100021",
          vip_nickname: "王大陆",
          platform: "完美世界",
          list_remark: "",
          status: "0",
          remark: "",
          created_time: "2019-01-01 12:00:00",
          action: "修改  禁用"
        },
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        platform: "",
        user_id: "",
        password: "",
        list_remark: "",
        gray_status: ""
      },
      idents: [
        { value: "1", label: "代理" },
        { value: "2", label: "普通用户" },
        { value: "3", label: "游客" },
        { value: "4", label: "试玩" },
        { value: "5", label: "测试号" }
      ],
      //修改会员信
      activeName: "first",
      dialogModifyVisible: false, //模态框
      userData: {},
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
  mounted() {
    // this.getUserPlatform()
  }
};
</script>

<style scoped>
#GrayListConfig-main .bd {
  padding-left: 20px;
}
#GrayListConfig-main .bd p {
  margin: 0;
}

.platformchoice {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
.start {
    display: inline-block;
    width: 50px;
    height: 30px;
    line-height: 30px;
    background-color: #0077f9;
    color: #ffffff;
}
.freeze {
    display: inline-block;
    width: 50px;
    height: 30px;
    line-height: 30px;
    background-color: #ff001e;
    color: #ffffff;
}
.bankCard {
  width: 100%;
}

.itemClass {
  width: 45%;
}
</style>

<template>
  <div id="userList—main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="format.channel_id" placeholder="渠道ID" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-select v-model="format.change_type" placeholder="变动类型" clearable size="medium">
        <el-option v-for="item in operas" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
      <permission-button :action="ActionType.ADD" @click="addUser()">
        <el-button type="primary" size="medium">用户加减币</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="tableData"
        :page-info="pageInfo"
      >
        item.state = 'input/disabled'
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template>{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div>
      <!-- 手动上下分 -->
      <el-dialog title="手动上下分" :visible.sync="dialogAddVisible" width="40%" center>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item
            label="用户ID"
            label-width="200px"
            style="display: inline-block;"
          >
            <el-input
              type="textarea"
              v-model="form.user_id"
              autocomplete="off"
              style="width: 300px;"
              placeholder="批量用户用;隔开"
            ></el-input>
          </el-form-item>
          <el-form-item label="金额" label-width="200px" style="display: inline-block;">
            <el-input v-model="form.money" autocomplete="off" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="类型" label-width="200px" style="display: inline-block;">
            <el-select v-model="form.type" placeholder clearable size="medium" style="width: 300px;">
              <el-option
                v-for="item in platforms"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label= "备注"
            label-width="200px"
            style="display: inline-block;"
          >
            <el-input
              v-model="form.remark"
              autocomplete="off"
              type="password"
              style="width: 300px;"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handelAdd">确 定</el-button>
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
      options: [
        { value: "1", label: "冻结" },
        { value: "2", label: "启用" }
      ],
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      operas: [
        { value: 1, label: "运营1" },
        { value: 2, label: "运营2" }
      ],
      agents: [
        { id: 1, label: "一级代理" },
        { id: 2, label: "二级代理" }
      ],
      format: {
        platform: "",
        channel_id: "",
        user_id: "",
        change_type: "",
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
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "渠道ID", prop: "channel_id", width: "" },
        { label: "操作前金币数", prop: "operate_before_gold", width: "" },
        { label: "操作金币数", prop: "operate_gold", width: "" },
        { label: "操作后金币数", prop: "operate_after_gold", width: "" },
        { label: "变动类型", prop: "change_type", width: "" },
        { label: "操作者ID", prop: "operate_id", width: "" },
        { label: "操作时间", prop: "operate_time", width: "" },
        { label: "操作说明", prop: "operate_state", width: "" }
      ],
      records: [],
      tableData: [
        {
          user_id: "10001151",
          channel_id: "",
          operate_before_gold: "1000.00",
          operate_gold: "+100.00",
          operate_after_gold: "1100.00",
          change_type: "增加-人工入款",
          operate_id: "1001",
          operate_time: "2019-8-10 13:00:00",
          operate_state: "手动入款"
        },
        {
          user_id: "10001151",
          channel_id: "",
          operate_before_gold: "1000.00",
          operate_gold: "+100.00",
          operate_after_gold: "1100.00",
          change_type: "增加-人工入款",
          operate_id: "1001",
          operate_time: "2019-8-10 13:00:00",
          operate_state: "手动入款"
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
      userTypes: [
        {
          value: "1",
          label: "代理"
        },
        {
          value: "2",
          label: "普通用户"
        },
        {
          value: "3",
          label: "游客"
        },
        {
          value: "4",
          label: "试玩"
        },
        {
          value: "5",
          label: "测试号"
        }
      ],
      vips: [
        {
          value: "0",
          label: "VIP1"
        },
        {
          value: "1",
          label: "VIP2"
        }
      ],
      collectionData: {},
      passwordData: {
        loginPassword: "",
        loginSure: "",
        moneyPassword: "",
        moneySure: ""
      },
      gameData: { game1: "", game2: "", game3: "", game4: "" },
      banks: [],
      provinces: [],
      citys: [],
      //校验
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8个字符" },
          { pattern: /^(\w){6,8}$/, message: "只能输入6-8个数字" }
        ],
        id: [{ required: true, message: "请输入用户id", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }]
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
    /**点击id进入代理下级 */
    handelAgent(row) {
      console.log(row);
    },
    /** 添加会员 */
    addUser() {
      this.dialogAddVisible = true;
    },
    handelAdd() {
      let data = {
          platform_id: 1000,
          nickname: this.form.nickname,
          money_password: this.form.money_password,
          phone: this.form.phone,
          agent: 100, //上级代理编号（根据用户身份来判断）
          password: this.form.password,
          user_type: this.form.user_type
        },
        id = 1000;
      UserHandler.add(data, id).promise.then(res => {
        if (Number(res.code) === 200) {
          this.$message(res.msg);
          this.dialogAddVisible = false;
          this.$refs["form"].resetFields(); //重置表单
        }
      });
    },
    /**修改会员信息*/
    handelClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogModifyVisible = true;
        this.player_id = row.uid;
        let data = {
            player_id: this.player_id
          },
          user_id = 1000;
        UserHandler.user_info(data, user_id)
          .promise.then(res => {
            if (Number(res.code) === 200) {
              this.userData = res.data;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    /** 修改弹框信息*/
    handelEdit(user_id) {
      if (this.activeName === "first") {
        let data = {
            player_id: this.player_id,
            nickname: this.userData.nickname,
            phone: this.userData.phone,
            vip: this.userData.vip,
            user_type: this.userData.user_type
          },
          user_id = 1000;
        UserHandler.info_set(data, user_id)
          .promise.then(res => {
            if (Number(res.code) === 200) {
              this.$message.success(res.msg);
              this.getUserList();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.activeName === "second") {
        let data = {
            platform_id: 1000,
            uid: this.collectionData.uid,
            bank_id: this.collectionData.bank_id,
            bank_user: this.collectionData.bank_user,
            bank_name: this.collectionData.bank_name,
            bank_card: this.collectionData.bank_card,
            country: this.collectionData.country || 1,
            province: this.collectionData.province || 1,
            city: this.collectionData.city || 1,
            subbranch: this.collectionData.subbranch || 1
          },
          user_id = 1000;
        UserHandler.bank_set(data, user_id)
          .promise.then(res => {
            if (Number(res.code) === 200) {
              this.$message.success(res.msg);
              this.getUserList();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.activeName === "third") {
        if (this.passwordData.loginPassword !== this.passwordData.loginSure) {
          this.$message.error("登录密码两次密码不一致请重新输入");
        } else if (
          this.passwordData.moneyPassword !== this.passwordData.moneySure
        ) {
          this.$message.error("资金密码两次密码不一致请重新输入");
        } else {
          let data = {
              player_id: this.player_id,
              password: this.passwordData.loginPassword,
              money_password: this.passwordData.moneyPassword
            },
            user_id = 1000;
          UserHandler.password_set(data, user_id)
            .promise.then(res => {
              console.log(res);
              if (Number(res.code) === 200) {
                this.$message.success(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        UserHandler.rebate_set(data, user_id).promise.then(res => {
          console.log(res);
        });
      }
    },
    /**切换不同的tab进行修改*/
    handleClick(tab) {
      /** 第二个tab*/
      if (Number(tab.index) === 1) {
        if (Object.keys(this.collectionData).length !== 0) {
          return;
        } else {
          let data = {
              player_id: this.player_id
            },
            user_id = 1000;
          UserHandler.bank_info(data, user_id)
            .promise.then(res => {
              console.log(res);
              if (Number(res.code) === 200) {
                this.collectionData = res.data;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else if (Number(tab.index) === 3) {
        /** 第四个返点设置*/
        let data = {
            player_id: this.player_id
          },
          user_id = 1000;
        UserHandler.rebate_info(data, user_id)
          .promise.then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    /**获取用户列表*/
    getUserList() {
      let data = {
          platform_id: 1000,
          user_id: "",
          created_at: "",
          status: "",
          time_min: "",
          time_max: "",
          page_index: 1,
          page_size: ""
        },
        user_id = 1000;
      this.userList(data, user_id);
    },
    /**获取用户列表页中平台筛选框*/
    getUserPlatform() {
      let data = {
          company_id: "", //公司编号
          platform_id: "" //平台编号
        },
        id = 1000;
      UserHandler.platform_menu(data, id)
        .promise.then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
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
    this.getUserList();
    // this.getUserPlatform()
  }
};
</script>

<style scoped>
#userList—main .bd p {
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

.el-textarea .el-textarea__inner {
  resize: none;
}
.itemClass {
  width: 45%;
}
</style>

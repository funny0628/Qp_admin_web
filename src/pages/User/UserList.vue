<template>
  <div id="userList—main">
    <input-area>
      <el-select v-model="format.operating" placeholder="运营" size="medium">
        <el-option v-for="item in operas" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="format.platform" placeholder="平台" size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium"></el-input>
      <el-input v-model="format.channel_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-date-picker
        v-model="format.Registration_time"
        value-format="yyyy-MM-dd"
        align="right"
        type="date"
        size="medium"
        placeholder="请输入注册时间"
        :picker-options="pickerOptions"
        style="width: 180px"
      ></el-date-picker>
      <el-select v-model="format.user_state" filterable placeholder="用户状态" size="medium">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="addUser()">
        <el-button type="primary" size="medium">新增</el-button>
      </permission-button>
    </input-area>
    <el-breadcrumb separator="/" style="padding-left:20px;padding-bottom:10px;">
      <el-breadcrumb-item :to="{ path: '/' }" v-for="(item,index) in agents" :key="index">{{item.label}}</el-breadcrumb-item>
    </el-breadcrumb>
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
            <template
              v-if="['user_gold', 'alipay_account', 'account_person'].indexOf(scope.prop) >= 0"
            >
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="scope.prop=='user_id'">
              <span @click="handelAgent(scope.row)" class="platformchoice">{{scope.row[scope.prop]}}</span>
            </template>
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  == 1">启用</span>
              <span v-else>冻结</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handelClick(btn)"
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
      <!-- 添加会员 -->
      <el-dialog title="添加会员" :visible.sync="dialogAddVisible" width="40%" center>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item
            label="昵称"
            label-width="100px"
            style="display: inline-block;"
            prop="nickname"
          >
            <el-input
              v-model="form.nickname"
              autocomplete="off"
              style="width: 200px;"
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="上级用户"
            label-width="100px"
            style="display: inline-block;"
            prop="agent"
          >
            <el-input v-model="form.agent" autocomplete="off" style="width: 200px;" disabled></el-input>
          </el-form-item>
          <el-form-item
            label="资金密码"
            label-width="100px"
            style="display: inline-block;"
            porp="money_password"
          >
            <el-input
              v-model="form.money_password"
              autocomplete="off"
              type="password"
              style="width: 200px;"
              placeholder="（6-8位数字）"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="登录密码"
            label-width="100px"
            style="display: inline-block;"
            prop="password"
          >
            <el-input
              v-model="form.password"
              autocomplete="off"
              type="password"
              style="width: 200px;"
              placeholder="（6-8位数字）"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="会员身份"
            label-width="100px"
            style="display: inline-block;"
            prop="identity"
          >
            <el-select v-model="form.identity" placeholder="请选择" style="width: 200px;">
              <el-option
                v-for="item in idents"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="手机号"
            required
            label-width="100px"
            style="display: inline-block;"
            porp="phone"
          >
            <el-input
              v-model="form.phone"
              autocomplete="off"
              style="width: 200px;"
              maxlength="11"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handelAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--修改会员信息 -->
    <div>
      <el-dialog title="修改会员信息" :visible.sync="dialogModifyVisible" width="40%">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户信息" name="first">
            <el-form
              :model="userData"
              style="display: flex; justify-content: space-between;flex-wrap:wrap ;"
              label-width="80px"
              :rules="rules"
            >
              <el-form-item label="用户ID" style="width: 50%;" prop="id">
                <el-input v-model="userData.player_id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="昵称" style="width: 50%;">
                <el-input v-model="userData.nickname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" style="width: 50%;" prop="phone">
                <el-input v-model="userData.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户身份" style="width: 50%;">
                <el-input v-model="userData.vip" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="会员分层" style="width: 50%;">
                <el-input v-model="userData.user_type" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="收款信息" name="second">
            <el-form
              :model="collectionData"
              style="display: flex; justify-content: space-between;flex-wrap:wrap ;"
              label-width="80px"
            >
              <el-form-item label="银行卡" style="width: 50%;"></el-form-item>
              <el-form-item label="支付宝" style="width: 50%;"></el-form-item>
              <el-form-item label="卡号" style="width: 50%;">
                <el-input v-model="collectionData.card" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="账户" style="width: 50%;">
                <el-input v-model="collectionData.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="开户行" style="width: 50%;">
                <el-input v-model="collectionData.bank" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" style="width: 50%;">
                <el-input v-model="collectionData.bank_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" style="width: 50%;">
                <el-input v-model="collectionData.alipay_name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="登录密码" name="third">
            <el-form
              :model="passwordData"
              style="display: flex; justify-content: space-between;flex-wrap:wrap ;"
              label-width="80px"
            >
              <el-form-item label="登录密码" style="width: 50%;"></el-form-item>
              <el-form-item label="资金密码" style="width: 50%;"></el-form-item>
              <el-form-item label="新密码" style="width: 50%;">
                <el-input v-model="passwordData.loginPassword" type="password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" style="width: 50%;">
                <el-input v-model="passwordData.moneyPassword" type="password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确定密码" style="width: 50%;">
                <el-input v-model="passwordData.loginSure" type="password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确定密码" style="width: 50%;">
                <el-input v-model="passwordData.moneySure" type="password" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="返点设置" name="fourth">
            <el-form
              :model="gameData"
              style="display: flex; justify-content: space-between;flex-wrap:wrap ;"
              label-width="80px"
            >
              <el-form-item label="游戏返点" style="width: 50%;"></el-form-item>
              <el-form-item label style="width: 50%;"></el-form-item>
              <el-form-item label="游戏1" style="width: 50%;">
                <el-input v-model="gameData.game1" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="游戏2" style="width: 50%;">
                <el-input v-model="gameData.game2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="游戏3" style="width: 50%;">
                <el-input v-model="gameData.game3" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="游戏4" style="width: 50%;">
                <el-input v-model="gameData.game4" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogModifyVisible = false">取 消</el-button>
          <el-button type="primary" @click="handelEdit">确 定</el-button>
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
      options: [{ value: "1", label: "冻结" }, { value: "2", label: "启用" }],
      platforms: [
        {
          value: 1,
          label: "平台1"
        },
        {
          value: 2,
          label: "平台2"
        }
      ],
      operas: [
        {
          value: 1,
          label: "运营1"
        },
        {
          value: 2,
          label: "运营2"
        }
      ],
      agents:[{id:1,label:'一级代理'},{id:2,label:'二级代理'}],
      format: {
        operating: "", //运营
        platform: "", //平台
        user_id: "", //用户id
        channel_id: "", //渠道id
        Registration_time: "", //注册时间选择
        user_state: "" //用户状态
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
        { label: "渠道ID", prop: "platform_id", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "用户昵称", prop: "user_name", width: "" },
        { label: "用户身份", prop: "tier", width: "" },
        { label: "VIP等级", prop: "vip", width: "" },
        { label: "手机号", prop: "phone", width: "120" },
        { label: "用户金币", prop: "user_gold", width: "140" },
        { label: "充值金额／笔数", prop: "top_up_amount", width: "150" },
        { label: "兑换金额／笔数", prop: "change_amount", width: "150" },
        { label: "支付宝账号/名称", prop: "alipay_account", width: "260" },
        { label: "开户人/卡号/开户行", prop: "account_person", width: "260" },
        { label: "下级人数", prop: "lower_count", width: "" },
        { label: "注册时间", prop: "created_at", width: "180" },
        { label: "客户端类型", prop: "reg_os", width: "150" },
        { label: "最后登陆IP", prop: "login_ip", width: "150" },
        { label: "状态", prop: "status", width: "" },
        { label: "备注", prop: "remark", width: "200" },
        { label: "操作", prop: "action", width: "200" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      //添加会员弹框
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
      //修改会员信息
      activeName: "first",
      dialogModifyVisible: false, //模态框
      //用户信息
      userData: {
        player_id: "",
        nickname: "",
        phone: "",
        vip: "",
        user_type: ""
      },
      //收款
      collectionData: {
        card: "",
        account: "",
        bank: "",
        bank_name: "",
        alipay_name: ""
      },
      //密码
      passwordData: {
        loginPassword: "",
        loginSure: "",
        moneyPassword: "",
        moneySure: ""
      },
      //游戏
      gameData: {
        game1: "",
        game2: "",
        game3: "",
        game4: ""
      },
      //校验
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8个字符" },
          { pattern: /^(\w){6,8}$/, message: "只能输入6-8个数字" }],
        id: [{ required: true, message: "请输入用户id", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  methods: {
    /*搜索*/
    search() {
      let data = this.format,user_id=1000;
      console.log(data);
      this.userList(data,user_id)
    },
    /**点击id进入代理下级 */
    handelAgent(row){
      console.log(row)
    },
    /*添加会员*/
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
    /*修改会员信息*/
    handelClick(btn) {
      if (btn.type === "edit") {
        this.dialogModifyVisible = true;
      }
    },
    handelEdit(user_id) {
      if (this.activeName === "first") {
        UserHandler.info_set(data, user_id).promise.then(res => {
          // console.log(res);
        });
      } else if (this.activeName === "second") {
        UserHandler.bank_set(data, user_id).promise.then(res => {
          // console.log(res);
        });
      } else if (this.activeName === "third") {
        UserHandler.password_set(data, user_id).promise.then(res => {
          // console.log(res);
        });
      } else {
        UserHandler.rebate_set(data, user_id).promise.then(res => {
          // console.log(res);
        });
      }
    },
    /*切换不同的tab进行修改*/
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    /*获取用户列表*/
    getUserList() {
      let data = {
        platform_id: 1000, //平台编号
        user_id: "", //用户id
        created_at: "", //创建时间
        status: "", //用户状态
        time_min: "", //开始时间
        time_max: "", //结束时间
        page_index: 1, //页码
        page_size: "" //分页大小
      },user_id = 1000;
      this.userList(data,user_id)
    },
    /*获取用户列表页中平台筛选框*/
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
    userList(data,user_id) {
      UserHandler.list(data, user_id).promise.then(res => {
        if (Number(res.code) === 200) {
          this.records = res.data.list;
          /**数据处理*/
          let goldArr = []; //用户金币
          let top_up_amount = ""; //充值金额/笔数
          let change_amount = ""; //兑换金额/笔数
          let alipay_account = []; //支付宝账号/名称
          let personArr = []; //开户人/卡号/开户行
          this.records.map(item => {
            goldArr.push("总金额：" + item.money);
            goldArr.push("理财：" + item.fanancial);
            top_up_amount = item.pay_sum + "/" + item.pay_count;
            change_amount = item.draw_sum + "/" + item.draw_count;
            // console.log(item.bank_info.length);
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
.platformchoice{
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
</style>

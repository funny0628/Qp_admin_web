<template>
  <div id="userList—main">
    <div class="input-area">
      <el-input v-model="format.child_id" placeholder="子后台ID" size="medium"></el-input>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium"></el-input>
      <el-input v-model="format.channel_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-date-picker
        v-model="format.value2"
        align="right"
        type="date"
        size="medium"
        placeholder="请输入注册时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-select v-model="value" filterable placeholder="用户状态" size="medium">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="addUser()">
        <el-button type="primary" size="medium">新增</el-button>
      </permission-button>
    </div>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        <el-table-column v-for="(item,index) in tableStyle" :key="index" :prop="item.prop" :label="item.label"
                         :width="item.width"
                         align="center">
          <template slot-scope="scope">
            <template
              v-if="['user_gold', 'alipay_account', 'account_person'].indexOf(item.prop) >= 0">
              <p v-for="(label, ind) in scope.row[item.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="'status'.indexOf(item.prop) >= 0">
              <span v-if="scope.row[item.prop]  == 1">启用</span>
              <span v-else>冻结</span>
            </template>
            <template v-if="item.prop === 'action'">
              <permission-button :action="btn.type" v-for="(btn,index) in scope.row[item.prop]" :key="index"
                                 @click="handeClick(btn)" style="cursor: pointer; padding-left: 5px;">
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','status'].indexOf(item.prop) < 0">
              {{scope.row[item.prop]}}
            </template>
          </template>
        </el-table-column>
      </info-table>
    </div>
    <div>
      <!-- 添加会员 -->
      <el-dialog title="添加会员" :visible.sync="dialogAddVisible" width="40%" center>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="用户名" label-width="100px" style="display: inline-block;" prop="name">
            <el-input v-model="form.name" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="上级用户" label-width="100px" style="display: inline-block;">
            <el-input v-model="form.higher_user" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="昵称" label-width="100px" style="display: inline-block;">
            <el-input v-model="form.desc" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" label-width="100px" style="display: inline-block;" prop="login_password">
            <el-input v-model="form.login_password" autocomplete="off" type="password"
                      style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="资金密码" label-width="100px" style="display: inline-block;">
            <el-input v-model="form.password" autocomplete="off" type="password" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="手机号" label-width="100px" style="display: inline-block;" prop="tel">
            <el-input v-model="form.tel" autocomplete="off" style="width: 200px;" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="会员身份" label-width="100px" style="display: inline-block;">
            <el-radio-group v-model="form.identity">
              <el-radio :label="1">测试用户</el-radio>
              <el-radio :label="2">代理用户</el-radio>
              <el-radio :label="3">普通玩家</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogAddVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--修改会员信息 -->
    <div>
      <el-dialog title="修改会员信息" :visible.sync="dialogModifyVisible">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户信息" name="first">
            <el-form :model="userData" style="display: flex; justify-content: space-between;flex-wrap:wrap ;">
              <el-form-item label="用户ID" label-width="70px" style="width: 50%;">
                <el-input v-model="userData.id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="昵称" label-width="70px" style="width: 50%;">
                <el-input v-model="userData.desc" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" label-width="70px" style="width: 50%;">
                <el-input v-model="userData.tel" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户身份" label-width="70px" style="width: 50%;">
                <el-input v-model="userData.ide" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="会员分层" label-width="70px" style="width: 50%;">
                <el-input v-model="userData.lay" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="收款信息" name="second">
            <el-form :model="collectionData" style="display: flex; justify-content: space-between;flex-wrap:wrap ;">
              <el-form-item label="银行卡" label-width="70px" style="width: 50%;">
              </el-form-item>
              <el-form-item label="支付宝" label-width="70px" style="width: 50%;">
              </el-form-item>
              <el-form-item label="卡号" label-width="70px" style="width: 50%;">
                <el-input v-model="collectionData.card" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="账户" label-width="70px" style="width: 50%;">
                <el-input v-model="collectionData.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="开户行" label-width="70px" style="width: 50%;">
                <el-input v-model="collectionData.bank" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" label-width="70px" style="width: 50%;">
                <el-input v-model="collectionData.bank_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名" label-width="70px" style="width: 50%;">
                <el-input v-model="collectionData.alipay_name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="登录密码" name="third">
            <el-form :model="passwordData" style="display: flex; justify-content: space-between;flex-wrap:wrap ;">
              <el-form-item label="登录密码" label-width="70px" style="width: 50%;">
                <!--                <el-input v-model="formDate.id" autocomplete="off"></el-input>-->
              </el-form-item>
              <el-form-item label="资金密码" label-width="70px" style="width: 50%;">
                <!--                <el-input v-model="formDate.desc" autocomplete="off"></el-input>-->
              </el-form-item>
              <el-form-item label="新密码" label-width="70px" style="width: 50%;">
                <el-input v-model="passwordData.loginPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" label-width="70px" style="width: 50%;">
                <el-input v-model="passwordData.moneyPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确定密码" label-width="70px" style="width: 50%;">
                <el-input v-model="passwordData.loginSure" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确定密码" label-width="70px" style="width: 50%;">
                <el-input v-model="passwordData.moneySure" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="返点设置" name="fourth">
            <el-form :model="gameData" style="display: flex; justify-content: space-between;flex-wrap:wrap ;">
              <el-form-item label="游戏返点" label-width="70px" style="width: 50%;">
              </el-form-item>
              <el-form-item label="" label-width="70px" style="width: 50%;">
              </el-form-item>
              <el-form-item label="游戏1" label-width="70px" style="width: 50%;">
                <el-input v-model="gameData.game1" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="游戏2" label-width="70px" style="width: 50%;">
                <el-input v-model="gameData.game2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="游戏3" label-width="70px" style="width: 50%;">
                <el-input v-model="gameData.game3" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="游戏4" label-width="70px" style="width: 50%;">
                <el-input v-model="gameData.game4" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogModifyVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogModifyVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import SelectTime from '../../plugin/components/SelectTime'
  import InfoTable from '../../plugin/components/InfoTable'
  import PageInfo from "../../plugin/script/common/PageInfo"
  import BaseIframe from "../../plugin/script/common/BaseIframe"
  import PermissionButton from "../../plugin/components/PermissionButton"
  import UserHandler from "../../script/handlers/UserHandler";

  export default {
    name: "UserList",
    extends: BaseIframe,
    components: {SelectTime, InfoTable, PermissionButton},
    data() {
      //校验手机号
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          if (/^[1][345789]\d{9}$/.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      return {
        options: [
          {
            value: '1',
            label: '冻结'
          },
          {
            value: '2',
            label: '启用'
          }
        ],
        value: "",//用户状态
        // date: [],
        format: {
          child_id: '', //子后台id
          user_id: '', //用户id
          channel_id: '',//渠道id
          value2: '', //注册时间选择
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        tableStyle: [
          {label: '渠道ID', prop: 'platform_id', width: ''},
          {label: '用户ID', prop: 'user_id', width: ''},
          {label: '用户昵称', prop: 'user_name', width: ''},
          {label: '用户身份', prop: 'tier', width: ''},
          {label: 'VIP等级', prop: 'vip', width: ''},
          {label: '手机号', prop: 'phone', width: '120'},
          {label: '用户金币', prop: 'user_gold', width: '140'},
          {label: '充值金额／笔数', prop: 'top_up_amount', width: '150'},
          {label: '兑换金额／笔数', prop: 'change_amount', width: '150'},
          {label: '支付宝账号/名称', prop: 'alipay_account', width: '260'},
          {label: '开户人/卡号/开户行', prop: 'account_person', width: '260'},
          {label: '下级人数', prop: 'lower_count', width: ''},
          {label: '注册时间', prop: 'created_at', width: '180'},
          {label: '客户端类型', prop: 'reg_os', width: '150'},
          {label: '最后登陆IP', prop: 'login_ip', width: '150'},
          {label: '状态', prop: 'status', width: ''},
          {label: '备注', prop: 'remark', width: ''},
          {label: '操作', prop: 'action', width: '200'},
        ],
        records: [{
          platform_id: 1,
          user_id: '111',
          user_name: '昵称',
          tier: '一级代理',
          vip: 'vip0',
          phone: '13000000000',
          user_gold: ['总金额：5000.00', '理财：3000.00'],
          top_up_amount: '10000/2',
          change_amount: "10000/1",
          alipay_account: ["账号：13000000000", "名称：王毅"],
          account_person: ["开户人：王毅", "卡号：62279983881900", "开户行：中国银行"],
          lower_count: '0',
          created_at: '2019-03-06 12:00:00',
          reg_os: 'iOS',
          login_ip: '192.168.0.0',
          status: '启用',
          remark: '-',
          action: [
            {
              label: '修改', type: 'edit'
            },
            {
              label: '冻结', type: 'freeze'
            },
            {
              label: '强制下线', type: 'light_off'

            }
          ],
        }],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        //添加会员弹框
        dialogAddVisible: false,
        form: {
          name: '',
          higher_user: '',
          desc: '',
          login_password: '',
          password: '',
          tel: '',
          identity: 1,
        },
        //修改会员信息
        activeName: 'first',
        dialogModifyVisible: false,
        userData: {
          id: '',
          desc: '',
          tel: '',
          ide: '',
          lay: '',
        },
        //收款
        collectionData: {
          card: '',
          account: '',
          bank: '',
          bank_name: '',
          alipay_name: '',
        },
        //密码
        passwordData: {
          loginPassword: '',
          loginSure: '',
          moneyPassword: '',
          moneySure: ''
        },
        //游戏
        gameData: {
          game1: '',
          game2: '',
          game3: '',
          game4: '',
        },
        //校验
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          login_password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 8, message: '长度在 6 到 8个字符'},
            {pattern: /^(\w){6,8}$/, message: '只能输入6-8个数字'}
          ],
          tel: [{required: true, validator: checkPhone, trigger: 'blur'}],
        },
      }
    },
    methods: {
      search() {
      },
      addUser() {
        this.dialogAddVisible = true;
      },
      handeClick(btn) {
        if (btn.type === 'edit') {
          this.dialogModifyVisible = true;
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //获取用户列表
      getUserList() {
        let data = {
          "platform_id": 1000, //平台编号
          "user_id": "", //用户id
          "sub_id": 1000, //子平台id
          "created_at": "",//创建时间
          "status": "", //用户状态
          "time_min": "",//开始时间
          "time_max": "",//结束时间
          "page_index": "",//页码
          "page_size": "" //分页大小
        };
        //查询用户列表
        UserHandler.list(data).promise.then(res => {
          // console.log(res);
          if(Number(res.code) === 200){
            this.records = [...res.data.list,...this.records];
            //数据处理
            /*let bankArr = [];
            res.data.list.map((item)=>{
              console.log(item);
              bankArr.push('开户人'+ item.bank_user);
              bankArr.push('卡号'+item.bank_card);
              bankArr.push('开户行'+item.subbranch)
            });
            console.log(bankArr)*/
            this.records.map((item)=>{
              item.action =[
                {
                  label: '修改', type: 'edit'
                },
                {
                  label: '冻结', type: 'freeze'
                },
                {
                  label: '强制下线', type: 'light_off'

                }
              ]
            })
          }
          console.log(this.records);
        });
        //银行卡列表
      }
    },
    mounted() {
      this.getUserList()

    }
  }
</script>

<style scoped>

  #userList—main {
  }

  #userList—main .bd p {
    margin: 0;
  }
</style>

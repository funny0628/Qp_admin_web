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
      <!--      <el-input v-model="format.user_status" placeholder="用户状态" size="medium"></el-input>-->
      <!--      <select-time :date="date" :select-date.sync="date"/>-->
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
        <el-table-column v-for="item in tableStyle" :prop="item.prop" :label="item.label" :width="item.width"
                         align="center">
          <template slot-scope="scope">
            <template
              v-if="['user_gold', 'alipay_account', 'account_person'].indexOf(item.prop) >= 0">
              <p v-for="(label, ind) in scope.row[item.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="item.prop === 'action'">
              <permission-button :action="btn.type" v-for="btn in scope.row[item.prop]" @click="handeClick(btn)" style="cursor: pointer; padding-left: 5px;">
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person'].indexOf(item.prop) < 0">
              {{scope.row[item.prop]}}
            </template>
          </template>
        </el-table-column>
      </info-table>
    </div>
    <div>
      <!-- 添加会员 -->
      <el-dialog title="添加会员" :visible.sync="dialogAddVisible" width="30%" center>
        <el-form :model="form">
          <el-form-item label="同户名" label-width="70px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="昵称" label-width="70px">
            <el-input v-model="form.desc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="资金密码" label-width="70px">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" label-width="70px">
            <el-input v-model="form.tel" autocomplete="off"></el-input>
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
<!--                <el-input v-model="formDate.id" autocomplete="off"></el-input>-->
              </el-form-item>
              <el-form-item label="支付宝" label-width="70px" style="width: 50%;">
<!--                <el-input v-model="formDate.desc" autocomplete="off"></el-input>-->
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
                <!--                <el-input v-model="formDate.id" autocomplete="off"></el-input>-->
              </el-form-item>
              <el-form-item label="" label-width="70px" style="width: 50%;">
                <!--                <el-input v-model="formDate.id" autocomplete="off"></el-input>-->
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
        <div slot="footer" class="dialog-footer" style="text-align: center;">
          <el-button @click="dialogModifyVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogModifyVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import SelectTime from '../../../plugin/components/SelectTime'
  import InfoTable from '../../../plugin/components/InfoTable'
  import PageInfo from "../../../plugin/script/common/PageInfo"
  import BaseIframe from "../../../plugin/script/common/BaseIframe"
  import PermissionButton from "../../../plugin/components/PermissionButton"

  export default {
    name: "UserList",
    extends: BaseIframe,
    components: {SelectTime, InfoTable, PermissionButton},
    data() {
      let $this = this;
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
          {label: '渠道ID', prop: 'channel_id', width: ''},
          {label: '用户ID', prop: 'user_id', width: ''},
          {label: '用户昵称', prop: 'user_name', width: ''},
          {label: '用户身份', prop: 'user_identity', width: ''},
          {label: 'VIP等级', prop: 'vip_level', width: ''},
          {label: '手机号', prop: 'mobile', width: '120'},
          {label: '用户金币', prop: 'user_gold', width: '140'},
          {label: '充值金额／笔数', prop: 'top_up_amount', width: '150'},
          {label: '兑换金额／笔数', prop: 'change_amount', width: '150'},
          {label: '支付宝账号/名称', prop: 'alipay_account', width: '260'},
          {label: '开户人/卡号/开户行', prop: 'account_person', width: '260'},
          {label: '下级人数', prop: 'low_num', width: ''},
          {label: '注册时间', prop: 'registration_time', width: '180'},
          {label: '客户端类型', prop: 'client_type', width: '150'},
          {label: '最后登陆IP', prop: 'finally_login', width: '150'},
          {label: '状态', prop: 'status', width: ''},
          {label: '备注', prop: 'note', width: ''},
          {label: '操作', prop: 'action', width: '200'},
        ],
        records: [{
          channel_id: 1,
          user_id: '111',
          user_name: '昵称',
          user_identity: '一级代理',
          vip_level: 'vip0',
          mobile: '13000000000',
          user_gold: ['总金额：5000.00', '理财：3000.00'],
          top_up_amount: '10000/2',
          change_amount: "10000/1",
          alipay_account: ["账号：13000000000", "名称：王毅"],
          account_person: ["开户人：王毅", "卡号：62279983881900", "开户行：中国银行"],
          low_num: '0',
          registration_time: '2019-03-06 12:00:00',
          client_type: 'iOS',
          finally_login: '192.168.0.0',
          status: '启用',
          note: '-',
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
          desc: '',
          password: '',
          tel: ''
        },
        //修改会员信息
        activeName:'first',
        dialogModifyVisible:false,
        userData: {
          id:'',
          desc: '',
          tel: '',
          ide:'',
          lay:'',
        },
        //收款
        collectionData:{
          card:'',
          account:'',
          bank:'',
          bank_name:'',
          alipay_name:'',
        },
        //密码
        passwordData:{
          loginPassword:'',
          loginSure:'',
          moneyPassword:'',
          moneySure:''
        },
        //游戏
        gameData:{
          game1:'',
          game2:'',
          game3:'',
          game4:'',
        }
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
      }
    }
  }
</script>

<style scoped>
  @import "./../../../assets/styles/common.css";

  #userList—main {
  }

  #userList—main .bd p {
    margin: 0;
  }
</style>

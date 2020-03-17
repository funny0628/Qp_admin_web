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
        <el-option v-for="item in operas" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-input v-model="format.phone" placeholder="请输入手机号" size="medium" clearable></el-input>
      <el-select v-model="format.user_state" filterable placeholder="用户状态" size="medium" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        v-model="format.client_type"
        filterable
        placeholder="请选择客户端类型"
        size="medium"
        clearable
      >
        <el-option
          v-for="item in clientOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
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
        <el-button type="primary" size="medium" @click="handleAddUser">新增</el-button>
      </permission-button>
    </input-area>
    <el-breadcrumb separator="/" style="padding-left:20px;padding-bottom:10px;">
      <el-breadcrumb-item
        :to="{ path: '/' }"
        v-for="(item,index) in agents"
        :key="index"
      >{{item.label}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="paginationData"
        :page-info="pageInfo"
        @pageNumFn="pageNumFn"
        @pageSizeFn="pageSizeFn"
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
              <span class="start" v-if="scope.row[scope.prop]  == 1">启用</span>
              <span class="freeze" v-if="scope.row[scope.prop]  == 2">冻结</span>
              <span class="online" v-if="scope.row[scope.prop]  == 3">在线</span>
              <span class="offline" v-if="scope.row[scope.prop]  == 4">离线</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="dialogVisible=true"
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
      <!-- 新增用户 -->
      <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="30%" center>
        <!-- <div class="title" style="background-color: #f2f2f2;">新增用户</div>
        <div class="content">-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="user_name" label="用户账户" :label-width="formLabelWidth">
            <el-input v-model.number="ruleForm.user_name" autocomplete="off" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="玩家昵称" :label-width="formLabelWidth">
            <el-input v-model="ruleForm.nickname" autocomplete="off" maxlength="7"></el-input>
          </el-form-item>
          <el-form-item prop="psd" label="登录密码" :label-width="formLabelWidth">
            <el-input type="password" v-model="ruleForm.psd" maxlength="14" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" :label-width="formLabelWidth">
            <el-select v-model="ruleForm.user_type" placeholder="请选择用户类型" style="width: 100%;">
              <el-option label="正式用户" value="1"></el-option>
              <el-option label="测试用户" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="capital_psd" label="资金密码" :label-width="formLabelWidth">
            <el-input
              type="password"
              maxlength="6"
              v-model="ruleForm.capital_psd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label-width="120px">
              <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
                <tr>
                  <td style="width: 120px;text-align: center;background-color: #f2f2f2;">用户账号</td>
                  <td style="text-align: center">
                    <el-input v-model="form.user_name" autocomplete="off" placeholder></el-input>
                  </td>
                </tr>
                <tr>
                  <td style="width: 120px;text-align: center;background-color: #f2f2f2;">玩家昵称</td>
                  <td style="text-align: center">
                    <el-input v-model="form.nickname" maxlength="7" autocomplete="off" placeholder></el-input>
                  </td>
                </tr>
                <tr>
                  <td style="width: 120px;text-align: center;background-color: #f2f2f2;">登录密码</td>
                  <td style="text-align: center">
                    <el-input
                      type="password"
                      v-model="form.psd"
                      maxlength=14
                      minlength=6
                      autocomplete="off"
                      placeholder
                    ></el-input>
                  </td>
                </tr>
                <tr>
                  <td style="width: 120px;text-align: center;background-color: #f2f2f2;">用户类型</td>
                  <td style="text-align: center">
                    <el-select v-model="form.user_type" placeholder="请选择用户类型" style="width: 100%;">
                      <el-option label="正式用户" value="1"></el-option>
                      <el-option label="测试用户" value="0"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td style="width: 120px;text-align: center;background-color: #f2f2f2;">资金密码</td>
                  <td style="text-align: center">
                    <el-input v-model="form.capital_psd" autocomplete="off" placeholder></el-input>
                  </td>
                </tr>
              </table>
          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
        </div>
        <!-- </div> -->
      </el-dialog>
    </div>
    <!--修改会员信息 -->
    <el-dialog :visible.sync="dialogVisible" width="60%" center>
      <div class="title" style="background-color: #f2f2f2;">修改会员信息</div>
      <div class="content">
        <el-form :model="form2">
          <el-form-item>
            <div style="text-align: left;">用户信息</div>
            <table
              style="width: 100%;border-collapse: collapse;border-color: #e9e9e9"
              cellspacing="0"
              cellpadding="5"
            >
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">用户ID</td>
                <td style="text-align: center">
                  <el-input v-model="form2.user_id" autocomplete="off" disabled></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">玩家昵称</td>
                <td style="text-align: center">
                  <el-input v-model="form2.nickname" autocomplete="off"></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">注册时间</td>
                <td style="text-align: center">
                  <el-input v-model="form2.created_time" autocomplete="off" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">注册IP</td>
                <td style="text-align: center">
                  <el-input v-model="form2.created_ip" autocomplete="off" disabled></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">最后登录时间</td>
                <td style="text-align: center">
                  <el-input v-model="form2.last_login_time" autocomplete="off" disabled></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">最后登录IP</td>
                <td style="text-align: center">
                  <el-input v-model="form2.last_login_ip" autocomplete="off" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">手机号</td>
                <td style="text-align: center">
                  <el-input v-model="form2.phone" autocomplete="off" disabled></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">机器码</td>
                <td style="text-align: center">
                  <el-input v-model="form2.machine_num" autocomplete="off" disabled></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">所属渠道</td>
                <td style="text-align: center">
                  <el-input v-model="form2.belong_channel" autocomplete="off" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">客户端版本</td>
                <td style="text-align: center;">
                  <el-input v-model="form2.client_version" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">上级代理</td>
                <td style="text-align: center;display: flex;">
                  <div style="float: left;flex: 1;">
                    <span v-if="show">{{form2.superior_agent || "--"}}</span>
                    <el-input v-else v-model="form2.superior_agent" autocomplete="off" placeholder></el-input>
                  </div>
                  <span
                    v-if="show"
                    style="float: right; width: 50px;color: #1381f9;cursor: pointer;"
                    @click="show=false"
                  >修改</span>
                  <span
                    v-else
                    style="float: right; width: 50px;color: #1381f9;cursor: pointer;"
                    @click="confirmEdit"
                  >确认</span>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">用户类型</td>
                <td style="text-align: center;">
                  <el-input v-model="form2.user_type" autocomplete="off"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">用户推广码</td>
                <td style="text-align: center">
                  <el-input v-model="form2.user_push_code" autocomplete="off"></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">VIP等级</td>
                <td style="text-align: center">
                  <el-input v-model="form2.vip_class" autocomplete="off"></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;"></td>
                <td style="text-align: center">
                  <el-input autocomplete="off"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <div style="text-align: left;">资金信息</div>
            <table
              style="width: 100%;border-collapse: collapse;border-color: #e9e9e9"
              cellspacing="0"
              cellpadding="5"
            >
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">银行卡号</td>
                <!-- <td style="text-align: center;display: flex;">
                  <div style="float: left;flex: 1;">
                    <span v-if="show">{{form2.bank_card || "--"}}</span>
                    <el-input v-else v-model="form2.bank_card" autocomplete="off" placeholder></el-input>
                  </div>
                  <span
                    v-if="show"
                    style="float: right; width: 50px;color: #1381f9;cursor: pointer;"
                    @click="show=false"
                  >修改</span>
                  <span
                    v-else
                    style="float: right; width: 50px;color: #1381f9;cursor: pointer;"
                    @click="confirmEdit"
                  >确认</span>
                </td> -->
                <td style="text-align: center">
                  <el-input v-model="form2.bank_card" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">持卡人姓名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.bank_card_user" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">支行名称</td>
                <td style="text-align: center">
                  <el-input v-model="form2.sub_branch" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">支付宝账号</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">实名制姓名</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">登录密码</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">资金密码</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">钱包余额</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">保险箱金币</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">累计充值</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">累计兑换</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">累计扣除台费</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <div style="text-align: left;">返点信息</div>
            <table
              style="width: 100%;border-collapse: collapse;border-color: #e9e9e9"
              cellspacing="0"
              cellpadding="5"
            >
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">游戏一</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">游戏二</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">游戏三</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">游戏四</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">游戏五</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
                <td style="width: 120px;text-align: center;background-color: #f2f2f2;">游戏六</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </el-form>
        <div class="footer" style="text-align:center;">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary">确定</el-button>
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
      pageNum: 1,
      pageSize: 5,
      show: true,
      dialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      labelPosition: "left", //左对齐
      options: [
        { value: "1", label: "启用" },
        { value: "2", label: "在线" },
        { value: "3", label: "离线" },
        { value: "4", label: "冻结" }
      ],
      clientOptions: [
        { value: "1", label: "ios" },
        { value: "2", label: "android" }
      ],
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      operas: [
        { value: 1, label: "渠道1" },
        { value: 2, label: "渠道2" }
      ],
      agents: [
        { id: 1, label: "一级代理" },
        { id: 2, label: "二级代理" }
      ],
      format: {
        platform: "",
        channel_id: "",
        user_id: "",
        phone: "",
        user_status: "",
        client_type: "",
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
        { label: "玩家昵称", prop: "nickname", width: "" },
        { label: "用户类型", prop: "user_type", width: "" },
        { label: "VIP等级", prop: "vip_class", width: "" },
        { label: "手机号", prop: "phone", width: "120" },
        { label: "所属渠道号", prop: "belong_channel", width: "120" },
        { label: "钱包/保险柜", prop: "wallet", width: "120" },
        { label: "充值金额／笔数", prop: "recharge_money", width: "120" },
        { label: "兑换金额/笔数", prop: "exchange_money", width: "120" },
        { label: "下级人数", prop: "lower_count", width: "" },
        { label: "上级代理ID", prop: "superior_agent_id", width: "100" },
        { label: "注册时间", prop: "created_time", width: "160" },
        { label: "客户端类型/版本", prop: "client_type", width: "130" },
        { label: "最后登陆时间", prop: "last_login_time", width: "160" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "action", width: "150" }
      ],
      tableData: [
        {
          user_id: "1001001",
          nickname: "测试线",
          user_type: "测试用户",
          vip_class: "vip6",
          phone: "13000000000",
          belong_channel: "1001",
          wallet: "5000.00",
          recharge_money: "100000/2",
          exchange_money: "41111/2",
          lower_count: "0",
          superior_agent_id: "-",
          created_time: "2020-10-12 12:00:00",
          client_type: "ios",
          last_login_time: "2020-10-12 12:00:00",
          status: "1",
          action: [
            { label: "修改", type: "edit" },
            { label: "封号", type: "ban" },
            { label: "踢出房间", type: "kick_room" },
            { label: "踢出大厅", type: "kick_hall" },
            { label: "用户返点", type: "user_return" }
          ]
        },
        {
          user_id: "1001001",
          nickname: "测试线",
          user_type: "测试用户",
          vip_class: "vip6",
          phone: "13000000000",
          belong_channel: "1001",
          wallet: "5000.00",
          recharge_money: "100000/2",
          exchange_money: "41111/2",
          lower_count: "0",
          superior_agent_id: "-",
          created_time: "2020-10-12 12:00:00",
          client_type: "ios",
          last_login_time: "2020-10-12 12:00:00",
          status: "2",
          action: [
            { label: "修改", type: "edit" },
            { label: "封号", type: "ban" },
            { label: "踢出房间", type: "kick_room" },
            { label: "踢出大厅", type: "kick_hall" },
            { label: "用户返点", type: "user_return" }
          ]
        },
        {
          user_id: "1001001",
          nickname: "测试线",
          user_type: "测试用户",
          vip_class: "vip6",
          phone: "13000000000",
          belong_channel: "1001",
          wallet: "5000.00",
          recharge_money: "100000/2",
          exchange_money: "41111/2",
          lower_count: "0",
          superior_agent_id: "-",
          created_time: "2020-10-12 12:00:00",
          client_type: "ios",
          last_login_time: "2020-10-12 12:00:00",
          status: "3",
          action: [
            { label: "修改", type: "edit" },
            { label: "封号", type: "ban" },
            { label: "踢出房间", type: "kick_room" },
            { label: "踢出大厅", type: "kick_hall" },
            { label: "用户返点", type: "user_return" }
          ]
        },
        {
          user_id: "1001001",
          nickname: "测试线",
          user_type: "测试用户",
          vip_class: "vip6",
          phone: "13000000000",
          belong_channel: "1001",
          wallet: "5000.00",
          recharge_money: "100000/2",
          exchange_money: "41111/2",
          lower_count: "0",
          superior_agent_id: "-",
          created_time: "2020-10-12 12:00:00",
          client_type: "ios",
          last_login_time: "2020-10-12 12:00:00",
          status: "4",
          action: [
            { label: "修改", type: "edit" },
            { label: "封号", type: "ban" },
            { label: "踢出房间", type: "kick_room" },
            { label: "踢出大厅", type: "kick_hall" },
            { label: "用户返点", type: "user_return" }
          ]
        },
        {
          user_id: "1001001",
          nickname: "测试线",
          user_type: "测试用户",
          vip_class: "vip6",
          phone: "13000000000",
          belong_channel: "1001",
          wallet: "5000.00",
          recharge_money: "100000/2",
          exchange_money: "41111/2",
          lower_count: "0",
          superior_agent_id: "-",
          created_time: "2020-10-12 12:00:00",
          client_type: "ios",
          last_login_time: "2020-10-12 12:00:00",
          status: "1",
          action: [
            { label: "修改", type: "edit" },
            { label: "封号", type: "ban" },
            { label: "踢出房间", type: "kick_room" },
            { label: "踢出大厅", type: "kick_hall" },
            { label: "用户返点", type: "user_return" }
          ]
        },
        {
          user_id: "1001001",
          nickname: "测试线",
          user_type: "测试用户",
          vip_class: "vip6",
          phone: "13000000000",
          belong_channel: "1001",
          wallet: "5000.00",
          recharge_money: "100000/2",
          exchange_money: "41111/2",
          lower_count: "0",
          superior_agent_id: "-",
          created_time: "2020-10-12 12:00:00",
          client_type: "ios",
          last_login_time: "2020-10-12 12:00:00",
          status: "1",
          action: [
            { label: "修改", type: "edit" },
            { label: "封号", type: "ban" },
            { label: "踢出房间", type: "kick_room" },
            { label: "踢出大厅", type: "kick_hall" },
            { label: "用户返点", type: "user_return" }
          ]
        }
      ],
      paginationData: [],
      records: [],
      pageInfo: new PageInfo(1, [5, 10, 15], 6),
      dialogAddVisible: false,
      ruleForm: {
        user_name: "",
        nickname: "",
        psd: "",
        user_type: "",
        capital_psd: ""
      },
      form2: {
        user_id: "1001001",
        nickname: "测试用户",
        created_time: "2020-01-20 12:00:00",
        created_ip: "",
        last_login_time: "2020-02-02 21:00:00",
        last_login_ip: "192.168.0.0",
        phone: "13800138000",
        machine_num: "mac 12756565456",
        belong_channel: "10001",
        client_type: "v1.0.0",
        superior_agent: "",
        user_type: "测试号",
        user_push_code: "7863j",
        vip_class: "vip0"
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
        user_name: [{ required: true, validator: checkPhone, trigger: "blur" }],
        psd: [
          {
            required: true,
            message: "请输入密码,默认密码为123456",
            trigger: "blur"
          },
          { min: 6, max: 14, message: "长度在 6 到 14个字符" }
        ],
        capital_psd: [
          { required: true, message: "请输入资金密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    pageNumFn(val) {
      console.log(val, this.pageSize, this.pageNum);
      this.pageNum = val;
      this.getPaginationData();
    },
    pageSizeFn(val) {
      console.log(val);
      this.pageSize = val;
      this.getPaginationData();
    },
    getPaginationData() {
      this.paginationData = this.tableData.slice(
        (this.pageNum - 1) * this.pageSize,
        (this.pageNum - 1) * this.pageSize + this.pageSize
      );
      console.log("我被调用了", this.paginationData);
    },
    handleAddUser() {
      this.dialogFormVisible = true;
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields();
      }
    },
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    // editSupAgent() {
    //   this.show = false;
    // },
    confirmEdit() {
      this.$confirm("此操作将修改该值, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.show = true;
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        })
        .catch(() => {
          this.show = true;
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    /**点击id进入代理下级 */
    handelAgent(row) {
      console.log(row);
    },
    /** 添加会员 */
    addUser() {
      this.dialogAddVisible = true;
    },
    /**修改会员信息*/
    // handelClick(btn, row) {
    //   if (btn.type === "edit") {
    //     this.dialogVisible = true;
    //   }
    // },
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
          console.log(res);
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
    this.getPaginationData();
    // this.getUserPlatform()
  },
  updated() {
    // this.getPaginationData()
  }
};
</script>

<style scoped>
#userList—main .bd {
  padding-left: 20px;
  padding-right: 20px;
}
#userList—main .bd p {
  margin: 0;
}
.start,
.freeze,
.online,
.offline {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
  background-color: #0077f9;
  color: #ffffff;
}
.freeze {
  background-color: #ff001e;
}
.offline {
  background-color: #aeaeae;
}
.online {
  background-color: #5acd9b;
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
table,
table tr th,
table tr td {
  border: 1px solid #e9e9e9;
}
.el-dialog {
  width: 100% !important;
}
</style>

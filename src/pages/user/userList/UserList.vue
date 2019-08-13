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
      <el-select v-model="value" filterable placeholder="请选择" size="medium">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
<!--      <el-input v-model="format.user_status" placeholder="用户状态" size="medium"></el-input>-->
<!--      <select-time :date="date" :select-date.sync="date"/>-->
      <permission-button action="read" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button action="add" @click="addUser()">
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
        <el-table-column v-for="item in tableStyle" :prop="item.prop" :label="item.label" :width="item.width" align="center">
          <template slot-scope="scope">
            <template v-if="item.prop === 'action'">
              <permission-button action="edit" v-for="btn in scope.row[item.prop]" @click="btn.click()">
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template v-if="item.prop !== 'action'">{{scope.row[item.prop]}}</template>
          </template>
        </el-table-column>
      </info-table>
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
    extends:BaseIframe,
    components: {SelectTime, InfoTable,PermissionButton},
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
        value:"",//用户状态
        // date: [],
        format:{
          child_id:'', //子后台id
          user_id:'', //用户id
          channel_id:'',//渠道id
          value2:'', //注册时间选择
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
          {label: '手机号', prop: 'mobile', width: ''},
          {label: '用户金币', prop: 'user_gold', width: ''},
          {label: '充值金额／笔数', prop: 'top_up_amount', width: '150'},
          {label: '兑换金额／笔数', prop: 'change_amount', width: '150'},
          {label: '支付宝账号/名称', prop: 'alipay_account', width: '150'},
          {label: '开户人/卡号/开户行', prop: 'account_person', width: '150'},
          {label: '下级人数', prop: 'low_num', width: ''},
          {label: '注册时间', prop: 'registration_time', width: '150'},
          {label: '客户端类型', prop: 'client_type', width: '150'},
          {label: '最后登陆IP', prop: 'finally_login', width: '150'},
          {label: '状态', prop: 'status', width: ''},
          {label: '备注', prop: 'note', width: ''},
          {label: '操作', prop: 'action', width: '200'},
        ],
        records: [{
          channel_id:1,
          user_id: '111',
          user_name: '昵称',
          user_identity: '微信号',
          vip_level: 'alipay',
          mobile: '111',
          user_gold: '类型',
          top_up_amount: '',
          change_amount:"",
          alipay_account:"",
          account_person:'',
          low_num:'',
          action: [
            {label: '修改', click(params){ $this.forward('deposit', params); }},
            {label: '冻结', click(params){ $this.forward('accountEdit', {type: 'edit'}); }},
            {label: '强制下线', click(params){ $this.forward('')}}
          ]
        }],
        pageInfo: new PageInfo(0, [5, 10, 15], 0)
      }
    },
    methods: {
      search() {
      },
      addUser() {
      }
    }
  }
</script>

<style scoped>
  @import "./../../../assets/styles/common.css";
</style>

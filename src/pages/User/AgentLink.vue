<template>
  <div id="AgentLink—main">
    <input-area>
      <el-input v-model="format.child_id" placeholder="子后台ID" size="medium"></el-input>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium"></el-input>
      <el-input v-model="format.channel_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-input v-model="format.agent_link" placeholder="代理链接" size="medium"></el-input>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
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
            <template
              v-if="['user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(scope.prop) >= 0">
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button :action="btn.type" v-for="(btn,index) in scope.row[scope.prop]" :key="index" @click="handeClick(btn)"
                                 style="cursor: pointer; padding-left: 5px;">
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(scope.prop) < 0">
              {{scope.row[scope.prop]}}
            </template>
          </template>
        </info-table-item>
      </info-table>
    </div>
  </div>
</template>

<script>
  import InfoTable from '../../plugin/components/InfoTable';
  import PageInfo from "../../plugin/script/common/PageInfo";
  import BaseIframe from "../../plugin/script/common/BaseIframe";
  import PermissionButton from "../../plugin/components/PermissionButton";
  import InputArea from "../../plugin/components/InputArea";
  import InfoTableItem from "../../plugin/components/InfoTableItem";

  export default {
    name: "AgentLink",
    extends: BaseIframe,
    components: {InfoTableItem, InputArea, InfoTable, PermissionButton},
    data(){
      return{
        format:{
          child_id:'',
          user_id:'',
          channel_id:'',
          agent_link:''
        },
        /*表格*/
        tableStyle: [
          {label: '渠道ID', prop: 'channel_id', width: ''},
          {label: '用户ID', prop: 'user_id', width: ''},
          {label: '用户昵称', prop: 'user_desc', width: ''},
          {label: '用户身份', prop: 'user_ide', width: ''},
          {label: '代理链接', prop: 'agent_link', width: ''},
          {label: '注册人数', prop: 'register_number', width: ''},
          {label: '操作', prop: 'action', width: '200'},
        ],
        records: [{
          channel_id: '01',
          user_id: '1001100',
          user_desc:'大牛比较懒',
          user_ide:'第一级代理',
          agent_link:'t.cn/auidna',
          register_number:'10',
          action: [
            {
              label: '查看链接', type: 'search'
            }
          ],
        }],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
      }
    },
    methods:{
      /***查询搜索 */
      search(){},
      /***查看链接 */
      handeClick(btn){}
    }
  }
</script>

<style scoped>
</style>

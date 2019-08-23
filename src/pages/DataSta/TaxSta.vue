<template>
  <div id="TaxSta-main">
    <input-area>
      <select-time :date="date" :select-time.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size='medium'>查询</el-button>
      </permission-button>
    </input-area>
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
              v-if="['user_gold', 'money_change', 'submit_time'].indexOf(item.prop) >= 0">
              <p v-for="(label, ind) in scope.row[item.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="item.prop === 'action'">
              <permission-button :action="btn.type" v-for="(btn,index) in scope.row[item.prop]" :key="index"
                                 @click="handeClick(btn)"
                                 style="cursor: pointer; padding-left: 5px;">
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'money_change', 'submit_time'].indexOf(item.prop) < 0">
              {{scope.row[item.prop]}}
            </template>
          </template>
        </el-table-column>
      </info-table>
    </div>
  </div>
</template>

<script>
  import PermissionButton from "../../plugin/components/PermissionButton";
  import InfoTable from '../../plugin/components/InfoTable';
  import SelectTime from "../../plugin/components/SelectTime";
  import BaseIframe from '../../plugin/script/common/BaseIframe';
  import PageInfo from '../../plugin/script/common/PageInfo';
  import InputArea from "../../plugin/components/InputArea";

  export default {
    name: "TaxSta",
    extends: BaseIframe,
    components: {InputArea, PermissionButton, InfoTable,SelectTime},
    data(){
      return{
        date:[],
        /*table*/
        tableStyle:
          [
            {label: '创建时间', prop: 'create_time', width: ''},
            {label: '渠道ID', prop: 'channel_id', width: ''},
            {label: '用户ID', prop: 'user_id', width: ''},
            {label: '游戏', prop: 'game', width: ''},
            {label: '税收值', prop: 'tax_val', width: ''},
            {label: '系统抽成值', prop: 'system_val', width: ''},
            {label: '渠道分成值', prop: 'channel_val', width: ''},
            {label: '系统抽税比率', prop: 'system_rate', width: ''},
          ],
        records: [
          {
            create_time:'2019-07-28',
            channel_id:'980822',
            user_id:'10086',
            game:'游戏三',
            tax_val:'100.00',
            system_val:'100.00',
            channel_val:'10.0',
            system_rate:'99%'
          }
        ],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
      }
    },
    methods:{
      search(){}
    }
  }
</script>

<style scoped>

</style>
<!--税收统计表-->

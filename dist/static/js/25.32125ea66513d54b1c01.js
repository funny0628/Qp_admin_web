webpackJsonp([25],{AYnB:function(e,t){},Sptt:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("iVUn"),n=a("fftp"),i=a("zhQY"),o=a("Z/hU"),r=a("2u00"),s=a("y35B"),c=a("22Zk"),p=a("06fe"),u=(o.a,p.a,c.a,l.a,n.a,r.a,{name:"PlatformRep",extends:o.a,components:{InfoTableItem:p.a,InputArea:c.a,SelectTime:l.a,InfoTable:n.a,PermissionButton:r.a},data:function(){return{labelPosition:"left",platforms:[{value:1,label:"平台1"},{value:2,label:"平台2"}],format:{platform:"",channel_id:"",Registration_time:""},pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",new Date)}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"一周前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",t)}}]},tableStyle:[{label:"日期",prop:"user_id",width:""},{label:"充值",prop:"nickname",width:""},{label:"兑换",prop:"before_gold",width:""},{label:"税收",prop:"enter_room",width:""},{label:"台费",prop:"enter_time",width:""},{label:"流水",prop:"win_or_lose_gold",width:""},{label:"返水",prop:"leave_time",width:""},{label:"活动赠送",prop:"leave_time",width:""},{label:"代理收益",prop:"leave_time",width:""},{label:"游戏输赢",prop:"leave_time",width:""},{label:"实际盈亏",prop:"leave_time",width:""}],tableData:[{user_id:"1000100",nickname:"测试线",before_gold:"100.00",enter_room:"捕鱼-初级场",enter_time:"2019-10-10 13:00:00",win_or_lose_gold:50,leave_time:"2019-12-10 13:00:00"},{user_id:"1000100",nickname:"测试线",before_gold:"100.00",enter_room:"捕鱼-初级场",enter_time:"2019-10-10 13:00:00",win_or_lose_gold:50,leave_time:"2019-12-10 13:00:00"}],records:[],pageInfo:new i.a(0,[5,10,15],5),dialogAddVisible:!1}},methods:{search:function(){var e=this.format;this.userList(e,1e3)},userList:function(e,t){var a=this;s.a.list(e,t).promise.then(function(e){if(200===Number(e.code)){a.records=e.data.list;var t=[],l="",n="",i=[],o=[];a.records.map(function(e){t.push("总金额："+e.money),t.push("理财："+e.fanancial),l=e.pay_sum+"/"+e.pay_count,n=e.draw_sum+"/"+e.draw_count,e.bank_info.length>0&&e.bank_info.map(function(e){1!==Number(e.bank_id)?(o.push("开户人："+e.bank_user),o.push("卡号："+e.bank_card),o.push("开户行："+e.subbranch)):(i.push("账号："+e.bank_card),i.push("名称："+e.bank_name))}),e.action=[{label:"修改",type:"edit"},{label:"冻结",type:"freeze"},{label:"强制下线",type:"light"}],e.user_gold=t,e.top_up_amount=l,e.change_amount=n,e.alipay_account=i,e.account_person=o})}})}},mounted:function(){}}),m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"PlatformRep-main"}},[a("input-area",[a("el-select",{attrs:{placeholder:"平台",clearable:"",size:"medium"},model:{value:e.format.platform,callback:function(t){e.$set(e.format,"platform",t)},expression:"format.platform"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-select",{attrs:{placeholder:"渠道ID",clearable:"",size:"medium"},model:{value:e.format.channel_id,callback:function(t){e.$set(e.format,"channel_id",t)},expression:"format.channel_id"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-date-picker",{staticStyle:{width:"180px"},attrs:{"value-format":"yyyy-MM-dd",align:"right",type:"date",size:"medium",clearable:"",placeholder:"请输入注册时间","picker-options":e.pickerOptions},model:{value:e.format.Registration_time,callback:function(t){e.$set(e.format,"Registration_time",t)},expression:"format.Registration_time"}}),e._v(" "),a("permission-button",{attrs:{action:e.ActionType.READ},on:{click:function(t){return e.search()}}},[a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.tableData,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return[[e._v(e._s(t.row[t.prop]))]]}}])})],1)],1)],1)},staticRenderFns:[]};var d=a("C7Lr")(u,m,!1,function(e){a("AYnB")},"data-v-a7441278",null);t.default=d.exports}});
//# sourceMappingURL=25.32125ea66513d54b1c01.js.map
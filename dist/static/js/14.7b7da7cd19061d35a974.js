webpackJsonp([14],{"+jzi":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("iVUn"),n=a("fftp"),r=a("zhQY"),o=a("Z/hU"),i=a("2u00"),s=a("y35B"),u=a("22Zk"),c=a("06fe"),p=(o.a,c.a,u.a,l.a,n.a,i.a,{name:"OnlinePlay",extends:o.a,components:{InfoTableItem:c.a,InputArea:u.a,SelectTime:l.a,InfoTable:n.a,PermissionButton:i.a},data:function(){return{labelPosition:"left",currentIndex:0,currentItem:"新增留存",platforms:[{value:1,label:"平台1"},{value:2,label:"平台2"}],format:{platform:""},navData:["新增留存","活跃留存","付费留存","回流用户留存"],tableStyle:[{label:"日期",prop:"user_id",width:""},{label:"新增用户",prop:"nickname",width:""},{label:"次日留存",prop:"before_gold",width:""},{label:"2天",prop:"enter_room",width:""},{label:"3天",prop:"enter_time",width:""},{label:"4天",prop:"win_or_lose_gold",width:""},{label:"5天",prop:"leave_time",width:""},{label:"6天",prop:"leave_time",width:""},{label:"7天",prop:"leave_time",width:""},{label:"15天",prop:"leave_time",width:""},{label:"30天",prop:"leave_time",width:""},{label:"45天",prop:"leave_time",width:""}],tableData:[{user_id:"1000100",nickname:"测试线",before_gold:"100.00",enter_room:"捕鱼-初级场",enter_time:"2019-10-10 13:00:00",win_or_lose_gold:50,leave_time:"2019-12-10 13:00:00"},{user_id:"1000100",nickname:"测试线",before_gold:"100.00",enter_room:"捕鱼-初级场",enter_time:"2019-10-10 13:00:00",win_or_lose_gold:50,leave_time:"2019-12-10 13:00:00"}],records:[],pageInfo:new r.a(0,[5,10,15],5),dialogAddVisible:!1}},methods:{search:function(){var e=this.format;this.userList(e,1e3)},showTab:function(e){this.currentIndex=e},userList:function(e,t){var a=this;s.a.list(e,t).promise.then(function(e){if(200===Number(e.code)){a.records=e.data.list;var t=[],l="",n="",r=[],o=[];a.records.map(function(e){t.push("总金额："+e.money),t.push("理财："+e.fanancial),l=e.pay_sum+"/"+e.pay_count,n=e.draw_sum+"/"+e.draw_count,e.bank_info.length>0&&e.bank_info.map(function(e){1!==Number(e.bank_id)?(o.push("开户人："+e.bank_user),o.push("卡号："+e.bank_card),o.push("开户行："+e.subbranch)):(r.push("账号："+e.bank_card),r.push("名称："+e.bank_name))}),e.action=[{label:"修改",type:"edit"},{label:"冻结",type:"freeze"},{label:"强制下线",type:"light"}],e.user_gold=t,e.top_up_amount=l,e.change_amount=n,e.alipay_account=r,e.account_person=o})}})}},mounted:function(){}}),d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"OnlinePlay-main"}},[a("input-area",[a("el-select",{staticStyle:{float:"left"},attrs:{placeholder:"平台",clearable:"",size:"medium"},model:{value:e.format.platform,callback:function(t){e.$set(e.format,"platform",t)},expression:"format.platform"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("div",{staticClass:"nav",staticStyle:{float:"left","margin-left":"200px"}},e._l(e.navData,function(t,l){return a("div",{key:l,staticClass:"nav-item",class:{active:e.currentIndex===l},on:{click:function(t){return e.showTab(l)}}},[e._v(e._s(t))])}),0)],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.tableData,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return[[e._v(e._s(t.row[t.prop]))]]}}])})],1)],1)],1)},staticRenderFns:[]};var _=a("C7Lr")(p,d,!1,function(e){a("rV6I")},"data-v-e7b7bb20",null);t.default=_.exports},rV6I:function(e,t){}});
//# sourceMappingURL=14.7b7da7cd19061d35a974.js.map
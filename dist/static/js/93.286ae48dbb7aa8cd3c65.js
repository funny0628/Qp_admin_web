webpackJsonp([93],{mTi2:function(e,t){},zDIp:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("iVUn"),n=a("fftp"),o=a("zhQY"),r=a("Z/hU"),l=a("2u00"),s=a("y35B"),c=a("22Zk"),p=a("06fe"),u=(r.a,p.a,c.a,i.a,n.a,l.a,{name:"AgentAddProfit",extends:r.a,components:{InfoTableItem:p.a,InputArea:c.a,SelectTime:i.a,InfoTable:n.a,PermissionButton:l.a},data:function(){return{labelPosition:"left",platforms:[{value:1,label:"平台1"},{value:2,label:"平台2"}],format:{Registration_time:""},pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",new Date)}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"一周前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",t)}}]},tableStyle:[{label:"日期",prop:"user_id",width:""},{label:"用户ID",prop:"nickname",width:""},{label:"昵称",prop:"before_gold",width:""},{label:"渠道ID",prop:"enter_room",width:""},{label:"代理等级",prop:"enter_time",width:""},{label:"推广码",prop:"win_or_lose_gold",width:""},{label:"新增人数",prop:"leave_time",width:""},{label:"当日收益",prop:"leave_time",width:""},{label:"代理返水",prop:"leave_time",width:""}],tableData:[{user_id:"1000100",nickname:"测试线",before_gold:"100.00",enter_room:"捕鱼-初级场",enter_time:"2019-10-10 13:00:00",win_or_lose_gold:50,leave_time:"2019-12-10 13:00:00"},{user_id:"1000100",nickname:"测试线",before_gold:"100.00",enter_room:"捕鱼-初级场",enter_time:"2019-10-10 13:00:00",win_or_lose_gold:50,leave_time:"2019-12-10 13:00:00"}],records:[],pageInfo:new o.a(0,[5,10,15],5),dialogAddVisible:!1}},methods:{search:function(){var e=this.format;this.userList(e,1e3)},userList:function(e,t){var a=this;s.a.list(e,t).promise.then(function(e){if(200===Number(e.code)){a.records=e.data.list;var t=[],i="",n="",o=[],r=[];a.records.map(function(e){t.push("总金额："+e.money),t.push("理财："+e.fanancial),i=e.pay_sum+"/"+e.pay_count,n=e.draw_sum+"/"+e.draw_count,e.bank_info.length>0&&e.bank_info.map(function(e){1!==Number(e.bank_id)?(r.push("开户人："+e.bank_user),r.push("卡号："+e.bank_card),r.push("开户行："+e.subbranch)):(o.push("账号："+e.bank_card),o.push("名称："+e.bank_name))}),e.action=[{label:"修改",type:"edit"},{label:"冻结",type:"freeze"},{label:"强制下线",type:"light"}],e.user_gold=t,e.top_up_amount=i,e.change_amount=n,e.alipay_account=o,e.account_person=r})}})}},mounted:function(){}}),d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"AgentAddProfit-main"}},[a("input-area",[a("el-date-picker",{staticStyle:{width:"180px"},attrs:{"value-format":"yyyy-MM-dd",align:"right",type:"date",size:"medium",clearable:"",placeholder:"请输入注册时间","picker-options":e.pickerOptions},model:{value:e.format.Registration_time,callback:function(t){e.$set(e.format,"Registration_time",t)},expression:"format.Registration_time"}}),e._v(" "),a("permission-button",{attrs:{action:e.ActionType.READ},on:{click:function(t){return e.search()}}},[a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.tableData,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return[[e._v(e._s(t.row[t.prop]))]]}}])})],1)],1)],1)},staticRenderFns:[]};var m=a("C7Lr")(u,d,!1,function(e){a("mTi2")},"data-v-1178903e",null);t.default=m.exports}});
//# sourceMappingURL=93.286ae48dbb7aa8cd3c65.js.map
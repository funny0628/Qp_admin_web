webpackJsonp([25],{"8Ed7":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("fftp"),r=a("zhQY"),l=a("22Zk"),o=a("06fe"),i=(o.a,l.a,n.a,{name:"GMrepFlow",components:{InfoTableItem:o.a,InputArea:l.a,InfoTable:n.a},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},value2:"",platforms:[{value:1,label:"全部"},{value:2,label:"审核中"},{value:3,label:"已拒绝"},{value:4,label:"已关闭"},{value:5,label:"已完成"},{value:6,label:"申请中"}],format:{user_id:"",order_status:""},tableStyle:[{label:"UID",prop:"order_id",width:""},{label:"房间类型",prop:"channel_name",width:""},{label:"金币变化值",prop:"channel_name",width:""},{label:"是否后台添加",prop:"fun_1",width:""},{label:"实时库存",prop:"fun_2",width:""},{label:"后台添加GM总值",prop:"fun_3",width:""},{label:"时间",prop:"fun_4",width:""}],records:[{order_id:"10012",channel_name:"主包",fun_1:"备份",fun_2:"排行榜",fun_3:"邮箱",fun_4:"客服",fun_5:"未设定",fun_6:"未设定",fun_7:"未设定",fun_8:"设定",operator:"json",create_time:"2020-02-10 12:00:00",action:""}],pageInfo:new r.a(0,[5,10,15],5),dialogAddVisible:!1,form:{checkList:["0902代理01","0902代理02"],function:"1",agent:100,nickname:"",password:"",money_password:"",phone:"",user_type:"1"}}},methods:{search:function(){var e=this.format;this.userList(e,1e3)},addUser:function(){this.dialogAddVisible=!0},handelClick:function(e,t){"edit"===e.type&&(this.dialogFormVisible=!0)},userList:function(e,t){var a=this;UserHandler.list(e,t).promise.then(function(e){if(200===Number(e.code)){a.records=e.data.list;var t=[],n="",r="",l=[],o=[];a.records.map(function(e){t.push("总金额："+e.money),t.push("理财："+e.fanancial),n=e.pay_sum+"/"+e.pay_count,r=e.draw_sum+"/"+e.draw_count,e.bank_info.length>0&&e.bank_info.map(function(e){1!==Number(e.bank_id)?(o.push("开户人："+e.bank_user),o.push("卡号："+e.bank_card),o.push("开户行："+e.subbranch)):(l.push("账号："+e.bank_card),l.push("名称："+e.bank_name))}),e.action=[{label:"修改",type:"edit"},{label:"冻结",type:"freeze"},{label:"强制下线",type:"light"}],e.user_gold=t,e.top_up_amount=n,e.change_amount=r,e.alipay_account=l,e.account_person=o})}})}},mounted:function(){}}),s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"GMrepFlow-main"}},[a("input-area",[a("el-input",{attrs:{placeholder:"请输入用户id",size:"medium",clearable:""},model:{value:e.format.user_id,callback:function(t){e.$set(e.format,"user_id",t)},expression:"format.user_id"}}),e._v(" "),a("el-select",{attrs:{placeholder:"房间选择",clearable:"",size:"medium"},model:{value:e.format.order_status,callback:function(t){e.$set(e.format,"order_status",t)},expression:"format.order_status"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}}),e._v(" "),a("el-button",{attrs:{type:"primary"}},[e._v("搜索")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("导出excel")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["action"===t.prop?e._l(t.row[t.prop],function(n,r){return a("permission-button",{key:r,staticStyle:{cursor:"pointer","padding-left":"5px"},attrs:{action:n.type},on:{click:function(a){return e.handelClick(n,t.row)}}},[a("span",[e._v(e._s(n.label))])])}):e._e(),e._v(" "),["action","user_gold","alipay_account","account_person","status","user_id"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1)],1)],1)},staticRenderFns:[]};var u=a("VU/8")(i,s,!1,function(e){a("8ypF")},"data-v-a7b50ca0",null);t.default=u.exports},"8ypF":function(e,t){}});
//# sourceMappingURL=25.b45d0570596a84474c54.js.map
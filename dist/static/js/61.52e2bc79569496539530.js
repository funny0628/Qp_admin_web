webpackJsonp([61],{"8A2G":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("iVUn"),n=a("fftp"),o=a("zhQY"),r=a("Z/hU"),l=a("2u00"),s=a("y35B"),p=a("22Zk"),u=a("06fe"),d=(r.a,u.a,p.a,i.a,n.a,l.a,{name:"SystemHandleLog",extends:r.a,components:{InfoTableItem:u.a,InputArea:p.a,SelectTime:i.a,InfoTable:n.a,PermissionButton:l.a},data:function(){return{player_id:"",labelPosition:"left",dialogFormVisible:!1,format:{user_id:"",operation_module:"",Registration_time:""},pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",new Date)}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"一周前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",t)}}]},tableStyle:[{label:"日志编号",prop:"journal_num",width:""},{label:"管理员ID",prop:"admin_id",width:""},{label:"管理员名称",prop:"admin_name",width:""},{label:"操作模块",prop:"operation_module",width:""},{label:"操作详情",prop:"operation_detail",width:""},{label:"操作IP",prop:"operation_ip",width:""},{label:"操作时间",prop:"operation_time",width:""}],tableData:[{journal_num:"16515615615",admin_id:"1",admin_name:"admin",operation_module:"权限管理-管理员新增",operation_detail:"新增成功",operation_ip:"192.168.0.0",operation_time:"2019-10-10 13:00:00"},{journal_num:"16515615615",admin_id:"1",admin_name:"admin",operation_module:"权限管理-管理员新增",operation_detail:"新增成功",operation_ip:"192.168.0.0",operation_time:"2019-10-10 13:00:00"}],records:[],pageInfo:new o.a(0,[5,10,15],5),dialogAddVisible:!1,form:{agent:100,nickname:"",password:"",money_password:"",phone:"",user_type:"1"},form2:{name:""}}},methods:{search:function(){var e=this.format;this.userList(e,1e3)},userList:function(e,t){var a=this;s.a.list(e,t).promise.then(function(e){if(200===Number(e.code)){a.records=e.data.list;var t=[],i="",n="",o=[],r=[];a.records.map(function(e){t.push("总金额："+e.money),t.push("理财："+e.fanancial),i=e.pay_sum+"/"+e.pay_count,n=e.draw_sum+"/"+e.draw_count,e.bank_info.length>0&&e.bank_info.map(function(e){1!==Number(e.bank_id)?(r.push("开户人："+e.bank_user),r.push("卡号："+e.bank_card),r.push("开户行："+e.subbranch)):(o.push("账号："+e.bank_card),o.push("名称："+e.bank_name))}),e.action=[{label:"修改",type:"edit"},{label:"冻结",type:"freeze"},{label:"强制下线",type:"light"}],e.user_gold=t,e.top_up_amount=i,e.change_amount=n,e.alipay_account=o,e.account_person=r})}})}},mounted:function(){}}),m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"SystemHandleLog-main"}},[a("input-area",[a("el-input",{attrs:{placeholder:"请输入用户id",size:"medium",clearable:""},model:{value:e.format.user_id,callback:function(t){e.$set(e.format,"user_id",t)},expression:"format.user_id"}}),e._v(" "),a("el-input",{attrs:{placeholder:"操作模块",size:"medium",clearable:""},model:{value:e.format.operation_module,callback:function(t){e.$set(e.format,"operation_module",t)},expression:"format.operation_module"}}),e._v(" "),a("el-date-picker",{staticStyle:{width:"180px"},attrs:{"value-format":"yyyy-MM-dd",align:"right",type:"date",size:"medium",clearable:"",placeholder:"请输入注册时间","picker-options":e.pickerOptions},model:{value:e.format.Registration_time,callback:function(t){e.$set(e.format,"Registration_time",t)},expression:"format.Registration_time"}}),e._v(" "),a("permission-button",{attrs:{action:e.ActionType.READ},on:{click:function(t){return e.search()}}},[a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.tableData,"page-info":e.pageInfo,"hide-page":!0}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["action"===t.prop?e._l(t.row[t.prop],function(t,i){return a("permission-button",{key:i,staticStyle:{cursor:"pointer","padding-left":"5px"},attrs:{action:t.type},on:{click:function(t){e.dialogVisible=!0}}},[a("span",[e._v(e._s(t.label))])])}):e._e(),e._v(" "),["action"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(d,m,!1,function(e){a("s9FS")},"data-v-3f8e836d",null);t.default=c.exports},s9FS:function(e,t){}});
//# sourceMappingURL=61.52e2bc79569496539530.js.map
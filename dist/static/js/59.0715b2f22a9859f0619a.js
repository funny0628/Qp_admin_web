webpackJsonp([59],{UGiz:function(e,t){},yGAx:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("iVUn"),i=a("fftp"),n=a("zhQY"),o=a("Z/hU"),r=a("2u00"),c=a("y35B"),s=a("22Zk"),p=a("06fe"),d=(o.a,p.a,s.a,l.a,i.a,r.a,{name:"ChannelPackageMan",extends:o.a,components:{InfoTableItem:p.a,InputArea:s.a,SelectTime:l.a,InfoTable:i.a,PermissionButton:r.a},data:function(){return{labelPosition:"left",checkGameList:["游戏1","游戏2"],checkSkinList:["皮肤1","皮肤2"],platforms:[{value:1,label:"平台1"},{value:2,label:"平台2"}],format:{platform:"",package_id:"",package_name:"",Registration_time:""},pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",new Date)}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"一周前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",t)}}]},tableStyle:[{label:"渠道ID",prop:"user_id",width:""},{label:"包名",prop:"nickname",width:""},{label:"唯一标识",prop:"before_gold",width:""},{label:"包所属用户",prop:"enter_room",width:""},{label:"下载地址",prop:"enter_time",width:""},{label:"设备类型",prop:"win_or_lose_gold",width:""},{label:"游戏开放",prop:"leave_time",width:""},{label:"开关状态",prop:"leave_time",width:""},{label:"创建时间",prop:"leave_time",width:""},{label:"操作",prop:"action",width:""}],tableData:[{user_id:"1000100",nickname:"测试线",before_gold:"100.00",enter_room:"捕鱼-初级场",enter_time:"2019-10-10 13:00:00",win_or_lose_gold:50,leave_time:"2019-12-10 13:00:00",action:[{label:"编辑",type:"edit"},{label:"禁用",type:"ban"}]},{user_id:"1000100",nickname:"测试线",before_gold:"100.00",enter_room:"捕鱼-初级场",enter_time:"2019-10-10 13:00:00",win_or_lose_gold:50,leave_time:"2019-12-10 13:00:00",action:[{label:"编辑",type:"edit"},{label:"禁用",type:"ban"}]}],records:[],pageInfo:new n.a(0,[5,10,15],5),dialogAddVisible:!1}},methods:{search:function(){var e=this.format;this.userList(e,1e3)},handelClick:function(e,t){"edit"===e.type&&(this.dialogFormVisible=!0)},userList:function(e,t){var a=this;c.a.list(e,t).promise.then(function(e){if(200===Number(e.code)){a.records=e.data.list;var t=[],l="",i="",n=[],o=[];a.records.map(function(e){t.push("总金额："+e.money),t.push("理财："+e.fanancial),l=e.pay_sum+"/"+e.pay_count,i=e.draw_sum+"/"+e.draw_count,e.bank_info.length>0&&e.bank_info.map(function(e){1!==Number(e.bank_id)?(o.push("开户人："+e.bank_user),o.push("卡号："+e.bank_card),o.push("开户行："+e.subbranch)):(n.push("账号："+e.bank_card),n.push("名称："+e.bank_name))}),e.action=[{label:"修改",type:"edit"},{label:"冻结",type:"freeze"},{label:"强制下线",type:"light"}],e.user_gold=t,e.top_up_amount=l,e.change_amount=i,e.alipay_account=n,e.account_person=o})}})}},mounted:function(){}}),_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"ChannelPackageMan-main"}},[a("input-area",[a("el-select",{attrs:{placeholder:"平台",clearable:"",size:"medium"},model:{value:e.format.platform,callback:function(t){e.$set(e.format,"platform",t)},expression:"format.platform"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-input",{attrs:{placeholder:"请输入包id",clearable:"",size:"medium"},model:{value:e.format.package_id,callback:function(t){e.$set(e.format,"package_id",t)},expression:"format.package_id"}}),e._v(" "),a("el-input",{attrs:{placeholder:"包名",clearable:"",size:"medium"},model:{value:e.format.package_name,callback:function(t){e.$set(e.format,"package_name",t)},expression:"format.package_name"}}),e._v(" "),a("el-date-picker",{staticStyle:{width:"180px"},attrs:{"value-format":"yyyy-MM-dd",align:"right",type:"date",size:"medium",clearable:"",placeholder:"请输入注册时间","picker-options":e.pickerOptions},model:{value:e.format.Registration_time,callback:function(t){e.$set(e.format,"Registration_time",t)},expression:"format.Registration_time"}}),e._v(" "),a("permission-button",{attrs:{action:e.ActionType.READ},on:{click:function(t){return e.search()}}},[a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("查询")])],1),e._v(" "),a("permission-button",{attrs:{action:e.ActionType.READ},on:{click:function(t){return e.search()}}},[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){e.dialogAddVisible=!0}}},[e._v("新增")])],1)],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.tableData,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["status".indexOf(t.prop)>=0?[1==t.row[t.prop]?a("span",[e._v("启用")]):a("span",[e._v("冻结")])]:e._e(),e._v(" "),"action"===t.prop?e._l(t.row[t.prop],function(l,i){return a("permission-button",{key:i,staticStyle:{cursor:"pointer","padding-left":"5px"},attrs:{action:l.type},on:{click:function(a){return e.handelClick(l,t.row)}}},[a("span",[e._v(e._s(l.label))])])}):e._e(),e._v(" "),["action","user_gold","alipay_account","account_person","status"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增包",visible:e.dialogAddVisible,width:"30%",center:""},on:{"update:visible":function(t){e.dialogAddVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("table",{attrs:{cellspacing:"0",cellpadding:"10"}},[a("tr",[a("td",{staticStyle:{width:"100px","text-align":"center"}},[e._v("渠道号")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("el-input",{attrs:{placeholder:"请输入渠道号"}})],1)]),e._v(" "),a("tr",[a("td",{staticStyle:{width:"100px","text-align":"center"}},[e._v("包名")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("el-input",{attrs:{placeholder:"请输入包名"}})],1)]),e._v(" "),a("tr",[a("td",{staticStyle:{width:"100px","text-align":"center"}},[e._v("唯一标识")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("el-input",{attrs:{placeholder:""}})],1)]),e._v(" "),a("tr",[a("td",{staticStyle:{width:"100px","text-align":"center"}},[e._v("所属代理")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("el-input",{attrs:{placeholder:"请输入代理ID"}})],1)]),e._v(" "),a("tr",[a("td",{staticStyle:{width:"100px","text-align":"center"}},[e._v("下载地址")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("el-input",{attrs:{placeholder:""}})],1)]),e._v(" "),a("tr",[a("td",{staticStyle:{width:"100px","text-align":"center"}},[e._v("设备类型")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择设备类型"}},[a("el-option",{attrs:{label:"设备一",value:""}}),e._v(" "),a("el-option",{attrs:{label:"设备二",value:""}})],1)],1)]),e._v(" "),a("tr",[a("td",{staticStyle:{width:"100px","text-align":"center"}},[e._v("游戏开放")]),e._v(" "),a("td",[a("el-checkbox-group",{model:{value:e.checkGameList,callback:function(t){e.checkGameList=t},expression:"checkGameList"}},[a("el-checkbox",{attrs:{label:"游戏1"}}),e._v(" "),a("el-checkbox",{attrs:{label:"游戏2"}}),e._v(" "),a("el-checkbox",{attrs:{label:"游戏3"}}),e._v(" "),a("el-checkbox",{attrs:{label:"游戏4"}}),e._v(" "),a("el-checkbox",{attrs:{label:"游戏5"}}),e._v(" "),a("el-checkbox",{attrs:{label:"游戏6"}})],1)],1)]),e._v(" "),a("tr",[a("td",{staticStyle:{width:"100px","text-align":"center"}},[e._v("皮肤选择")]),e._v(" "),a("td",[a("el-checkbox-group",{model:{value:e.checkSkinList,callback:function(t){e.checkSkinList=t},expression:"checkSkinList"}},[a("el-checkbox",{attrs:{label:"皮肤1"}}),e._v(" "),a("el-checkbox",{attrs:{label:"皮肤2"}}),e._v(" "),a("el-checkbox",{attrs:{label:"皮肤3"}}),e._v(" "),a("el-checkbox",{attrs:{label:"皮肤4"}}),e._v(" "),a("el-checkbox",{attrs:{label:"皮肤5"}}),e._v(" "),a("el-checkbox",{attrs:{label:"皮肤6"}})],1)],1)])])]),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"10px"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogAddVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"}},[e._v("保 存")])],1)],1)],1)},staticRenderFns:[]};var u=a("VU/8")(d,_,!1,function(e){a("UGiz")},"data-v-44d74cb8",null);t.default=u.exports}});
//# sourceMappingURL=59.0715b2f22a9859f0619a.js.map
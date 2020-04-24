webpackJsonp([22],{ISgH:function(e,t){},ybfJ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("iVUn"),o=a("fftp"),r=a("zhQY"),i=a("Z/hU"),n=a("2u00"),s=(a("y35B"),a("22Zk")),p=a("06fe"),u=(i.a,p.a,s.a,l.a,o.a,n.a,{name:"OrderMan",extends:i.a,components:{InfoTableItem:p.a,InputArea:s.a,SelectTime:l.a,InfoTable:o.a,PermissionButton:n.a},data:function(){return{formLabelWidth:"120px",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},platforms:[{value:1,label:"全部"},{value:2,label:"审核中"},{value:3,label:"已拒绝"},{value:4,label:"已关闭"},{value:5,label:"已完成"},{value:6,label:"申请中"}],operas:[{value:1,label:"渠道1"},{value:2,label:"渠道2"}],options:[{value:"1",label:"启用"},{value:"2",label:"在线"},{value:"3",label:"离线"},{value:"4",label:"冻结"}],format:{platform:"",pay_type:"",order_status:"",user_id:"",time_range:""},tableStyle:[{label:"ID",prop:"order_id",width:""},{label:"昵称",prop:"channel_name",width:""},{label:"订单号",prop:"channel_name",width:""},{label:"付款方式",prop:"fun_1",width:""},{label:"支付结果",prop:"fun_2",width:""},{label:"异常原因",prop:"fun_3",width:""},{label:"平台",prop:"fun_4",width:""},{label:"商品名称",prop:"fun_5",width:""},{label:"金额",prop:"fun_6",width:""},{label:"赠送金额",prop:"fun_7",width:""},{label:"购买时间",prop:"fun_8",width:""},{label:"操作",prop:"action",width:"120"}],records:[{order_id:"10012",channel_name:"主包",fun_1:"备份",fun_2:"排行榜",fun_3:"邮箱",fun_4:"客服",fun_5:"未设定",fun_6:"未设定",fun_7:"未设定",fun_8:"设定",operator:"json",create_time:"2020-02-10 12:00:00",action:""}],pageInfo:new r.a(0,[5,10,15],5),dialogFormVisible:!1,form:{user_id:"",pay_type:"1",goods_type:100,money:"",check_money:""}}},methods:{search:function(){var e=this.format;this.userList(e,1e3)},handelClick:function(e,t){"edit"===e.type&&(this.dialogFormVisible=!0)}},mounted:function(){}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"OrderMan-main"}},[a("input-area",[a("el-select",{attrs:{placeholder:"平台",clearable:"",size:"medium"},model:{value:e.format.platform,callback:function(t){e.$set(e.format,"platform",t)},expression:"format.platform"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-select",{attrs:{placeholder:"支付方式",clearable:"",size:"medium"},model:{value:e.format.pay_type,callback:function(t){e.$set(e.format,"pay_type",t)},expression:"format.pay_type"}},e._l(e.operas,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-select",{attrs:{filterable:"",placeholder:"状态",size:"medium",clearable:""},model:{value:e.format.order_status,callback:function(t){e.$set(e.format,"order_status",t)},expression:"format.order_status"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-input",{attrs:{placeholder:"请输入用户id",size:"medium",clearable:""},model:{value:e.format.user_id,callback:function(t){e.$set(e.format,"user_id",t)},expression:"format.user_id"}}),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:e.format.time_range,callback:function(t){e.$set(e.format,"time_range",t)},expression:"format.time_range"}}),e._v(" "),a("el-button",{attrs:{type:"primary"}},[e._v("查找")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("添加人工订单")]),e._v(" "),a("el-button",{attrs:{type:"primary"}},[e._v("导出excel")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["action"===t.prop?e._l(t.row[t.prop],function(l,o){return a("permission-button",{key:o,staticStyle:{cursor:"pointer","padding-left":"5px"},attrs:{action:l.type},on:{click:function(a){return e.handelClick(l,t.row)}}},[a("span",[e._v(e._s(l.label))])])}):e._e(),e._v(" "),["action"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"添加人工订单",visible:e.dialogFormVisible,width:"30%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"用户id","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入用户id"},model:{value:e.form.user_id,callback:function(t){e.$set(e.form,"user_id",t)},expression:"form.user_id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"付款方式","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"人工充值"},model:{value:e.form.pay_type,callback:function(t){e.$set(e.form,"pay_type",t)},expression:"form.pay_type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商品类型","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.form.goods_type,callback:function(t){e.$set(e.form,"goods_type",t)},expression:"form.goods_type"}},[a("el-option",{attrs:{label:"金币",value:"gold"}}),e._v(" "),a("el-option",{attrs:{label:"现金",value:"money"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"金额","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入金额"},model:{value:e.form.money,callback:function(t){e.$set(e.form,"money",t)},expression:"form.money"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"确认金额","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请确认输入金额"},model:{value:e.form.check_money,callback:function(t){e.$set(e.form,"check_money",t)},expression:"form.check_money"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var f=a("C7Lr")(u,c,!1,function(e){a("ISgH")},"data-v-9f712ee0",null);t.default=f.exports}});
//# sourceMappingURL=22.99c2dc1a6c397b2b63dc.js.map
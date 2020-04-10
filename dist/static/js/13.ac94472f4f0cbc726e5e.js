webpackJsonp([13],{L31j:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("iVUn"),o=a("fftp"),n=a("zhQY"),i=a("Z/hU"),r=a("2u00"),s=(a("y35B"),a("22Zk")),c=a("06fe"),m=(i.a,c.a,s.a,l.a,o.a,r.a,{name:"FlowSearch",extends:i.a,components:{InfoTableItem:c.a,InputArea:s.a,SelectTime:l.a,InfoTable:o.a,PermissionButton:r.a},data:function(){return{formLabelWidth:"120px",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},platforms:[{value:1,label:"全部"},{value:2,label:"审核中"},{value:3,label:"已拒绝"},{value:4,label:"已关闭"},{value:5,label:"已完成"},{value:6,label:"申请中"}],format:{change_reason:"",room:"",user_id:"",time_range:""},tableStyle:[{label:"UID",prop:"order_id",width:""},{label:"变化后数量",prop:"channel_name",width:""},{label:"变化数量",prop:"channel_name",width:""},{label:"变化原因",prop:"fun_1",width:""},{label:"房间类型",prop:"fun_2",width:""},{label:"渠道号",prop:"fun_5",width:""},{label:"操作时间",prop:"fun_6",width:""},{label:"操作",prop:"action",width:"150"}],records:[{order_id:"10012",channel_name:"主包",fun_1:"备份",fun_2:"排行榜",fun_3:"邮箱",fun_4:"客服",fun_5:"未设定",fun_6:"未设定",fun_7:"未设定",fun_8:"设定",operator:"json",create_time:"2020-02-10 12:00:00",action:""}],pageInfo:new n.a(0,[5,10,15],5),dialogFormVisible:!1,dialogVisible:!1,form:{user_id:"",pay_type:"1",goods_type:100,money:"",check_money:""}}},methods:{search:function(){},handelClick:function(e,t){"edit"===e.type&&(this.dialogFormVisible=!0)},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){var a=this;console.log(t);var l=t.id.toString();console.log(l),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(this.$message({type:"success",message:res.data.msg})).catch(function(){a.$message({type:"info",message:res.data.msg})})}},mounted:function(){}}),f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"FlowSearch-main"}},[a("input-area",[a("el-select",{attrs:{placeholder:"变化原因选择",clearable:"",size:"medium"},model:{value:e.format.change_reason,callback:function(t){e.$set(e.format,"change_reason",t)},expression:"format.change_reason"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-select",{attrs:{placeholder:"房间选择",clearable:"",size:"medium"},model:{value:e.format.room,callback:function(t){e.$set(e.format,"room",t)},expression:"format.room"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-input",{attrs:{placeholder:"请输入用户id",size:"medium",clearable:""},model:{value:e.format.user_id,callback:function(t){e.$set(e.format,"user_id",t)},expression:"format.user_id"}}),e._v(" "),a("span",[e._v("日期")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:e.format.time_range,callback:function(t){e.$set(e.format,"time_range",t)},expression:"format.time_range"}}),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("搜索")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("导出excel")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["action"===t.prop?[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]:e._e(),e._v(" "),["action"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"渠道添加",visible:e.dialogFormVisible,width:"30%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"渠道名","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入渠道名"},model:{value:e.form.channel_name,callback:function(t){e.$set(e.form,"channel_name",t)},expression:"form.channel_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"渠道编号","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入渠道编号"},model:{value:e.form.channel_id,callback:function(t){e.$set(e.form,"channel_id",t)},expression:"form.channel_id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属公司","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.form.belong_company,callback:function(t){e.$set(e.form,"belong_company",t)},expression:"form.belong_company"}},[a("el-option",{attrs:{label:"金币",value:"gold"}}),e._v(" "),a("el-option",{attrs:{label:"现金",value:"money"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"添加公司",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"公司名","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入公司名"},model:{value:e.form.company_name,callback:function(t){e.$set(e.form,"company_name",t)},expression:"form.company_name"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=a("VU/8")(m,f,!1,function(e){a("xcvw")},"data-v-f1167be4",null);t.default=u.exports},xcvw:function(e,t){}});
//# sourceMappingURL=13.ac94472f4f0cbc726e5e.js.map
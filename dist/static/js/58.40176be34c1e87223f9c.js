webpackJsonp([58],{"3iG9":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("iVUn"),i=a("fftp"),r=a("zhQY"),l=a("Z/hU"),o=a("2u00"),s=(a("y35B"),a("22Zk")),c=a("06fe"),d=(l.a,c.a,s.a,n.a,i.a,o.a,{name:"withdraw_records",extends:l.a,components:{InfoTableItem:c.a,InputArea:s.a,SelectTime:n.a,InfoTable:i.a,PermissionButton:o.a},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},platforms:[{value:1,label:"全部"},{value:2,label:"审核中"},{value:3,label:"已拒绝"},{value:4,label:"已关闭"},{value:5,label:"已完成"},{value:6,label:"申请中"}],format:{widthdraw_status:"",game_id:"",time_range:""},tableStyle:[{label:"编号",prop:"order_id",width:""},{label:"游戏id",prop:"channel_name",width:""},{label:"提现金额",prop:"channel_name",width:""},{label:"余额",prop:"fun_1",width:""},{label:"需转金额",prop:"fun_2",width:""},{label:"手续费",prop:"fun_5",width:""},{label:"兑换方式",prop:"fun_5",width:""},{label:"申请时间",prop:"fun_5",width:""},{label:"状态",prop:"fun_5",width:""},{label:"风控提示",prop:"fun_5",width:""},{label:"备注",prop:"fun_5",width:""},{label:"操作",prop:"action",width:"150"}],records:[{order_id:"10012",channel_name:"主包",fun_1:"备份",fun_2:"排行榜",fun_3:"邮箱",fun_4:"客服",fun_5:"未设定",fun_6:"未设定",fun_7:"未设定",fun_8:"设定",operator:"json",create_time:"2020-02-10 12:00:00",action:""}],pageInfo:new r.a(0,[5,10,15],5)}},methods:{getWithdrawRec:function(){this.$http.get("v1/backend/operation/withdraws").then(function(e){console.log(e)})},search:function(){},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){var a=this;console.log(t);var n=t.id.toString();console.log(n),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(this.$message({type:"success",message:res.data.msg})).catch(function(){a.$message({type:"info",message:res.data.msg})})}},mounted:function(){this.getWithdrawRec()}}),u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"WithdrawRec-main"}},[a("input-area",[a("el-button",{staticStyle:{"background-color":"#ffc75a",border:"none"},attrs:{type:"primary",size:"medium"}},[e._v("关闭音乐提醒")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择",clearable:"",size:"medium"},model:{value:e.format.widthdraw_status,callback:function(t){e.$set(e.format,"widthdraw_status",t)},expression:"format.widthdraw_status"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-input",{attrs:{placeholder:"请输入游戏id",size:"medium",clearable:""},model:{value:e.format.game_id,callback:function(t){e.$set(e.format,"game_id",t)},expression:"format.game_id"}}),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:e.format.time_range,callback:function(t){e.$set(e.format,"time_range",t)},expression:"format.time_range"}}),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("搜索")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("导出excel")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["action"===t.prop?[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]:e._e(),e._v(" "),["action"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1)],1)],1)},staticRenderFns:[]};var p=a("C7Lr")(d,u,!1,function(e){a("TDdj")},"data-v-4a52a55e",null);t.default=p.exports},TDdj:function(e,t){}});
//# sourceMappingURL=58.40176be34c1e87223f9c.js.map
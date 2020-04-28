webpackJsonp([55],{KtGe:function(e,t){},L31j:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("iVUn"),l=a("fftp"),i=a("zhQY"),r=a("Z/hU"),n=a("2u00"),s=(a("y35B"),a("22Zk")),c=a("06fe"),m=(r.a,c.a,s.a,o.a,l.a,n.a,{name:"cash_flows",extends:r.a,components:{InfoTableItem:c.a,InputArea:s.a,SelectTime:o.a,InfoTable:l.a,PermissionButton:n.a},data:function(){return{pagesize:10,currentPage:1,total:0,formLabelWidth:"120px",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},changeReason:{},allGameType:[],format:{change_reason:"",room:"",user_id:"",dateArr:[new Date((new Date).getTime()-6048e5),new Date]},tableStyle:[{label:"UID",prop:"uid",width:""},{label:"变化后数量",prop:"curr",width:""},{label:"变化数量",prop:"value",width:""},{label:"变化原因",prop:"reason",width:""},{label:"房间类型",prop:"game_type",width:""},{label:"渠道号",prop:"channel",width:""},{label:"操作时间",prop:"time",width:""}],records:[],pageInfo:new i.a(0,[5,10,15],5),dialogFormVisible:!1,dialogVisible:!1,form:{user_id:"",pay_type:"1",goods_type:100,money:"",check_money:""}}},methods:{getFlowWaterList:function(){var e=this,t={page:this.currentPage,limit:this.pagesize};this.$http.get("v1/backend/operation/flows",{params:t}).then(function(t){console.log(t),200===t.data.code&&(e.records=t.data.data,e.total=t.data.total)})},searchData:function(){var e=this,t={page:this.currentPage,limit:this.pagesize,reason:Number(this.format.change_reason),game_type:Number(this.format.room),user_id:Number(this.format.user_id),start_time:this.format.dateArr?parseInt(new Date(Number(this.format.dateArr[0])).getTime()/1e3):0,end_time:this.format.dateArr?parseInt(new Date(Number(this.format.dateArr[1])).getTime()/1e3):0};this.$http.get("v1/backend/operation/flows",{params:t}).then(function(t){console.log(t),200===t.data.code&&(e.records=t.data.data,e.total=t.data.total)})},getModReason:function(){var e=this;this.$http.get("v1/backend/operation/gold-modify-reason").then(function(t){console.log(t),200===t.data.code&&(e.changeReason=t.data.data)})},getAllGameType:function(){var e=this;this.$http.get("v1/backend/operation/game-type").then(function(t){console.log(t),200===t.data.code&&(e.allGameType=t.data.data)})},handleSizeChange:function(e){this.pagesize=e,this.getFlowWaterList()},handleCurrentChange:function(e){this.currentPage=e,this.getFlowWaterList()}},mounted:function(){this.getFlowWaterList(),this.getModReason(),this.getAllGameType()}}),d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"FlowSearch-main"}},[a("input-area",[a("el-select",{attrs:{placeholder:"变化原因选择",clearable:"",size:"medium"},model:{value:e.format.change_reason,callback:function(t){e.$set(e.format,"change_reason",t)},expression:"format.change_reason"}},e._l(e.changeReason,function(t,o){return a("el-option",{key:o,attrs:{label:t,value:o}},[e._v(e._s(t))])}),1),e._v(" "),a("el-select",{attrs:{placeholder:"房间选择",clearable:"",size:"medium"},model:{value:e.format.room,callback:function(t){e.$set(e.format,"room",t)},expression:"format.room"}},e._l(e.allGameType,function(e){return a("el-option",{key:e.game_id,attrs:{label:e.game_name,value:e.game_id}})}),1),e._v(" "),a("el-input",{attrs:{placeholder:"请输入用户id",size:"medium",clearable:""},model:{value:e.format.user_id,callback:function(t){e.$set(e.format,"user_id",t)},expression:"format.user_id"}}),e._v(" "),a("span",[e._v("日期")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right",clearable:!1},model:{value:e.format.dateArr,callback:function(t){e.$set(e.format,"dateArr",t)},expression:"format.dateArr"}}),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.searchData}},[e._v("搜索")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("导出excel")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{directives:[{name:"has",rawName:"v-has",value:"flow_list",expression:"'flow_list'"}],attrs:{"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo,"hide-page":!0}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["time".indexOf(t.prop)>=0?[a("span",[e._v(e._s(e._f("dateFormat")(t.row.time)))])]:e._e(),e._v(" "),["time"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"渠道添加",visible:e.dialogFormVisible,width:"30%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"渠道名","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入渠道名"},model:{value:e.form.channel_name,callback:function(t){e.$set(e.form,"channel_name",t)},expression:"form.channel_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"渠道编号","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入渠道编号"},model:{value:e.form.channel_id,callback:function(t){e.$set(e.form,"channel_id",t)},expression:"form.channel_id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属公司","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.form.belong_company,callback:function(t){e.$set(e.form,"belong_company",t)},expression:"form.belong_company"}},[a("el-option",{attrs:{label:"金币",value:"gold"}}),e._v(" "),a("el-option",{attrs:{label:"现金",value:"money"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"添加公司",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"公司名","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入公司名"},model:{value:e.form.company_name,callback:function(t){e.$set(e.form,"company_name",t)},expression:"form.company_name"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var p=a("C7Lr")(m,d,!1,function(e){a("KtGe")},"data-v-5f9ed332",null);t.default=p.exports}});
//# sourceMappingURL=55.f079fd6a29e6092aed66.js.map
webpackJsonp([96],{SasV:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("lC5x"),n=a.n(r),l=a("J0Oq"),i=a.n(l),o=a("22Zk"),s=(o.a,{name:"operation_logs",components:{InputArea:o.a},data:function(){return{pagesize:10,currentPage:1,total:0,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},requestWay:[{value:"GET",label:"GET"},{value:"POST",label:"POST"},{value:"DELETE",label:"DELETE"},{value:"PUT",label:"PUT"}],format:{man_id:"",req_way:"",router_name:"",dateArr:[new Date((new Date).getTime()-6048e5),new Date]},tableData:[]}},methods:{getSystemOperationList:function(){var e=this;return i()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("v1/backend/auth/operation-logs",{params:{user_id:Number(e.format.man_id),req_method:e.format.req_way,req_route:e.format.router_name,start_time:e.format.dateArr?parseInt(new Date(Number(e.format.dateArr[0])).getTime()/1e3):0,end_time:e.format.dateArr?parseInt(new Date(Number(e.format.dateArr[1])).getTime()/1e3):0,page:e.currentPage,limit:e.pagesize}});case 2:a=t.sent,console.log(a),200===a.data.code&&(e.tableData=a.data.data,e.total=a.data.total),console.log(a);case 6:case"end":return t.stop()}},t,e)}))()},search:function(){this.getSystemOperationList()},handleSizeChange:function(e){this.pagesize=e,this.getSystemOperationList()},handleCurrentChange:function(e){this.currentPage=e,this.getSystemOperationList()}},mounted:function(){this.getSystemOperationList()}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"SystemJournal-main"}},[a("input-area",[a("el-input",{attrs:{placeholder:"请输入管理ID或者名称",size:"medium",clearable:""},model:{value:e.format.man_id,callback:function(t){e.$set(e.format,"man_id",t)},expression:"format.man_id"}}),e._v(" "),a("el-select",{attrs:{placeholder:"请选择请求方式",clearable:"",size:"medium"},model:{value:e.format.req_way,callback:function(t){e.$set(e.format,"req_way",t)},expression:"format.req_way"}},e._l(e.requestWay,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-input",{attrs:{placeholder:"请输入路由名称",size:"medium",clearable:""},model:{value:e.format.router_name,callback:function(t){e.$set(e.format,"router_name",t)},expression:"format.router_name"}}),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right",clearable:!1},model:{value:e.format.dateArr,callback:function(t){e.$set(e.format,"dateArr",t)},expression:"format.dateArr"}}),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.search}},[e._v("搜索")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"user_id",label:"用户ID",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"user_id",label:"操作者",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"req_method",label:"请求方法",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"req_path",label:"请求路由",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"req_params",label:"请求参数",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"req_ip",label:"请求ip",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"请求时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("dateFormat")(t.row.create_time))+"\n        ")]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var u=a("C7Lr")(s,c,!1,function(e){a("wt03")},"data-v-14273b46",null);t.default=u.exports},wt03:function(e,t){}});
//# sourceMappingURL=96.b48fb11c7b09dc46a635.js.map
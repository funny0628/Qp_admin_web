webpackJsonp([95],{"+qCQ":function(e,t){},npNf:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("a3Yh"),r=a.n(l),o={data:function(){return{order_status:"",format:r()({order_status:""},"order_status",""),platforms:[{value:1,label:"金花-低倍场"},{value:2,label:"金花-中倍场"},{value:3,label:"金花-高倍场"},{value:4,label:"金花-土豪场"}],tableData:[],total:"",currentPage:1,limit:10}},methods:{search:function(){},handleSizeChange:function(){},handleCurrentChange:function(){}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"GFlowerWater"}},[a("el-select",{attrs:{placeholder:"房间选择",clearable:"",size:"medium"},model:{value:e.format.order_status,callback:function(t){e.$set(e.format,"order_status",t)},expression:"format.order_status"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查找")]),e._v(" "),a("div",{staticClass:"table"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"",data:e.tableData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{sortable:"",prop:"id",label:"日期",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sort_num",label:"基础库存值",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_name",label:"基础库存变化值",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_channel",label:"奖励库存值",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_way",label:"奖励库存变化值",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"money_num",label:"抽水",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"money_num",label:"抽水变化值",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"money_num",label:"回收金币值",align:"center","show-overflow-tooltip":""}})],1),e._v(" "),e.total>5?a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[5,10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1)],1)},staticRenderFns:[]};var s=a("C7Lr")(o,n,!1,function(e){a("+qCQ")},"data-v-215aee66",null);t.default=s.exports}});
//# sourceMappingURL=95.653d84f5ed7687daa413.js.map
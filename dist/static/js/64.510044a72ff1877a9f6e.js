webpackJsonp([64],{PziM:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("lC5x"),n=a.n(r),l=a("J0Oq"),i=a.n(l),o=(a("EuRQ"),{name:"GMdata",data:function(){return{tableData:[],total:"",currentPage:1,limit:10,platforms:[{value:"GM库存控制",lable:1}],format:{widthdraw_status:"GM库存控制"}}},created:function(){this.getData()},methods:{search:function(){this.getData()},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()},getData:function(){this.initData({page:this.currentPage,limit:this.limit,grade:"gm_coins"})},initData:function(t){var e=this;return i()(n.a.mark(function a(){var r,l;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.OperationMan.GetInvenData(t);case 2:r=a.sent,l=r.data,e.tableData=l.data,e.total=l.total;case 6:case"end":return a.stop()}},a,e)}))()}}}),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"GMdata-main"}},[a("el-select",{attrs:{placeholder:"GM库存控制",clearable:"",size:"medium"},model:{value:t.format.widthdraw_status,callback:function(e){t.$set(t.format,"widthdraw_status",e)},expression:"format.widthdraw_status"}},t._l(t.platforms,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[t._v("查找")]),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"","default-sort":{prop:"ID",order:"ascending"},data:t.tableData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{sortable:"",prop:"date",label:"日期",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"gm_coins",label:"实时库存值",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"base_change",label:"实时库存变化值",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"gm_add_coins",label:"添加库存值",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"add_change",label:"添加库存变化值",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"fee_store",label:"回收值",align:"center","show-overflow-tooltip":""}})],1),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1)],1)},staticRenderFns:[]};var c=a("C7Lr")(o,s,!1,function(t){a("VPU+")},"data-v-3b181888",null);e.default=c.exports},"VPU+":function(t,e){}});
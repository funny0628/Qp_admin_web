webpackJsonp([25],{"7Iov":function(t,e){},"8Ed7":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("lC5x"),n=a.n(i),r=a("J0Oq"),l=a.n(r),o={name:"GMrepFlow",data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},value2:[],tableData:[],platforms:[],user_id:"",room_status:"",currentPage:1,limit:10,total:""}},created:function(){var t=(new Date).getTime();this.value2[this.value2.length]=t-6048e5,this.value2[this.value2.length]=t,this.initGame(),this.getData()},methods:{search:function(){this.getData()},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()},getData:function(){this.initData({page:this.currentPage,limit:this.limit,start_time:Math.ceil(this.value2[0]/1e3),end_time:Math.ceil(this.value2[1]/1e3),uid:""===this.user_id?0:+this.user_id,table_type:""===this.room_status?0:this.room_status})},initData:function(t){var e=this;return l()(n.a.mark(function a(){var i,r;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.OperationMan.GetGameWater(t);case 2:i=a.sent,r=i.data,e.total=r.total,r.data.forEach(function(t){t.by_web=1===t.by_web?"是":"不是"}),e.tableData=r.data;case 7:case"end":return a.stop()}},a,e)}))()},initGame:function(t){var e=this;return l()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.OperationMan.GetSonGame({type_id:5});case 2:a=t.sent,a.data.data.forEach(function(t){e.platforms.push({value:t.game_id,label:t.game_name})}),e.platforms.unshift({value:"",label:"房间选择"});case 6:case"end":return t.stop()}},t,e)}))()}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"GMrepFlow-main"}},[a("div",{staticClass:"title"},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入用户id",size:"medium",clearable:""},model:{value:t.user_id,callback:function(e){t.user_id=e},expression:"user_id"}}),t._v(" "),a("el-select",{attrs:{placeholder:"房间选择",clearable:"",size:"medium"},model:{value:t.room_status,callback:function(e){t.room_status=e},expression:"room_status"}},t._l(t.platforms,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":t.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right","value-format":"timestamp"},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("搜索")])],1),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"",data:t.tableData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"uid",label:"uid",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"table_type",label:"房间类型",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"add_coins",label:"金币变化值",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"by_web",label:"是否后台添加",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"gm_add_coins",label:"后台添加GM总值",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"时间",align:"center","show-overflow-tooltip":""}})],1),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[5,10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1)])},staticRenderFns:[]};var c=a("C7Lr")(o,s,!1,function(t){a("7Iov")},"data-v-9c242f3c",null);e.default=c.exports}});
//# sourceMappingURL=25.5362909b0d8f5296b51a.js.map
webpackJsonp([30],{"8Ed7":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("lC5x"),i=a.n(n),r=a("J0Oq"),l=a.n(r),o={name:"GMrepFlow",data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},value2:[],tableData:[],platforms:[],user_id:"",room_status:"",currentPage:1,limit:10,total:""}},created:function(){var e=(new Date).getTime();this.value2[this.value2.length]=e-6048e5,this.value2[this.value2.length]=e,this.initGame(),this.getData()},methods:{search:function(){this.getData()},handleSizeChange:function(e){this.limit=e,this.currentPage=1,this.getData()},handleCurrentChange:function(e){this.currentPage=e,this.getData()},getData:function(){this.initData({page:this.currentPage,limit:this.limit,start_time:Math.ceil(this.value2[0]/1e3),end_time:Math.ceil(this.value2[1]/1e3),uid:""===this.user_id?0:+this.user_id,table_type:""===this.room_status?0:this.room_status})},initData:function(e){var t=this;return l()(i.a.mark(function a(){var n,r;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$http.OperationMan.GetGameWater(e);case 2:n=a.sent,r=n.data,t.total=r.total,r.data.forEach(function(e){e.by_web=1===e.by_web?"是":"不是"}),t.tableData=r.data;case 7:case"end":return a.stop()}},a,t)}))()},initGame:function(e){var t=this;return l()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.OperationMan.GetSonGame({type_id:5});case 2:a=e.sent,a.data.data.forEach(function(e){t.platforms.push({value:e.game_id,label:e.game_name})}),t.platforms.unshift({value:"",label:"房间选择"});case 6:case"end":return e.stop()}},e,t)}))()}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"GMrepFlow-main"}},[a("div",{staticClass:"title"},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入用户id",size:"medium",clearable:""},model:{value:e.user_id,callback:function(t){e.user_id=t},expression:"user_id"}}),e._v(" "),a("el-select",{attrs:{placeholder:"房间选择",clearable:"",size:"medium"},model:{value:e.room_status,callback:function(t){e.room_status=t},expression:"room_status"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right","value-format":"timestamp"},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}}),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")])],1),e._v(" "),a("div",{staticClass:"table"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"",data:e.tableData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"uid",label:"uid",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"table_type",label:"房间类型",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"add_coins",label:"金币变化值",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"by_web",label:"是否后台添加",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"gm_add_coins",label:"后台添加GM总值",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"date",label:"时间",align:"center","show-overflow-tooltip":""}})],1),e._v(" "),e.total>5?a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1)])},staticRenderFns:[]};var c=a("C7Lr")(o,s,!1,function(e){a("n4Ie")},"data-v-74f56751",null);t.default=c.exports},n4Ie:function(e,t){}});
webpackJsonp([91],{KmoA:function(t,e){},ph2C:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("lC5x"),n=a.n(i),l=a("J0Oq"),r=a.n(l),o={name:"data_analysis",data:function(){return{uid:"",start_time:"",end_time:"",max:"",min:"",currentPage:1,limit:10,total:0,tableData:[],titleData:[{prop:"uid",label:"用户名ID"},{prop:"nickname",label:"\t用户昵称"},{prop:"recharge",label:"\t充值"},{prop:"exchange",label:"\t兑换"},{prop:"water",label:"流水"},{prop:"diff",label:"充值兑换差额"},{prop:"gold",label:"总金币"},{prop:"subnum",label:"下级用户与代理"},{prop:"team_recharge",label:"\t团队充值"},{prop:"team_exchange",label:"\t团队兑换"},{prop:"team_agent_withdraw",label:"团队代理提现"},{prop:"award",label:"\t活动奖励"},{prop:"agent_rebate",label:"代理收益"},{prop:"game_winlose",label:"\t游戏输赢"},{prop:"ative_winlose",label:"\t实际输赢"}]}},created:function(){var t=(new Date).getTime();this.start_time=t,this.end_time=t,this.initData()},methods:{search:function(){this.initData()},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.initData()},handleCurrentChange:function(t){this.currentPage=t,this.initData()},initTime:function(t){var e=new Date(t);return""+e.getFullYear()+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+(e.getDate()<10?"0"+e.getDate():e.getDate())},initData:function(){var t=this;return r()(n.a.mark(function e(){var a,i;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.DataAnalysis.GetStatisticsDay({page:t.currentPage,limit:t.limit,start_date:+t.initTime(t.start_time-1728e5),end_data:+t.initTime(t.end_time-1728e5),winlose_max:+t.max,winlose_min:+t.min,uid:+t.uid});case 2:a=e.sent,i=a.data,t.tableData=i.data,t.total=i.total,0===i.data.length&&console.log("没有数据");case 7:case"end":return e.stop()}},e,t)}))()}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"playerSys"}},[a("div",{staticClass:"title"},[a("el-input",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{placeholder:"用户ID"},model:{value:t.uid,callback:function(e){t.uid=e},expression:"uid"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyyMMdd","value-format":"timestamp"},model:{value:t.start_time,callback:function(e){t.start_time=e},expression:"start_time"}}),t._v("\n    -\n    "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyyMMdd","value-format":"timestamp"},model:{value:t.end_time,callback:function(e){t.end_time=e},expression:"end_time"}}),t._v("\n    实际盈亏 "),a("el-input",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{placeholder:"0"},model:{value:t.max,callback:function(e){t.max=e},expression:"max"}}),t._v("- "),a("el-input",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{placeholder:"0"},model:{value:t.min,callback:function(e){t.min=e},expression:"min"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查找")])],1),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{"default-sort":{prop:"date",order:"descending"},data:t.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},t._l(t.titleData,function(t,e){return a("el-table-column",{key:e,attrs:{fixed:("新增日"===t.label||"新增用户"===t.label||"平均价值"===t.label)&&"left",prop:t.prop,label:t.label,align:"center",width:"120","show-overflow-tooltip":""}})}),1),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1)])},staticRenderFns:[]};var s=a("C7Lr")(o,p,!1,function(t){a("KmoA")},"data-v-10d79294",null);e.default=s.exports}});
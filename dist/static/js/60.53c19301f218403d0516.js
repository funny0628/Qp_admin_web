webpackJsonp([60],{IeiY:function(t,e){},kICx:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("lC5x"),l=a.n(i),r=a("J0Oq"),n=a.n(r),o=a("EuRQ"),s={name:"agent",data:function(){return{orderlist:["ascending","descending"],userID:"",start_time:"",end_time:"",currentPage:1,limit:10,total:"",tableData:[],DuserID:"",Dstart_time:"",Dend_time:"",DcurrentPage:1,Dlimit:10,Dtotal:"",DtableData:[],LcurrentPage:1,Llimit:10,title:"详情",visible:!1}},created:function(){this.initdata({page:this.currentPage,limit:this.limit})},methods:{search:function(){this.initdata({page:this.currentPage,limit:this.limit,uid:parseInt(this.userID)||0,start_time:this.start_time/1e3||0,end_time:this.end_time/1e3||0}),this.userID="",this.start_time="",this.end_time=""},searchDetail:function(t){"详情"===t?this.initDetail({page:this.DcurrentPage,limit:this.Dlimit,pid:this.Pid,start_data:this.Dstart_data/1e3||0,end_data:this.Dend_data/1e3||0,uid:parseInt(this.DuserID)||0}):"下级"===t&&this.initLevel({uid:parseInt(this.DuserID)||0,pid:this.Pid,start_data:this.Dstart_data/1e3||0,end_data:this.Dend_data/1e3||0}),this.DuserID="",this.Dstart_time="",this.Dend_time=""},handleDetail:function(t){var e=this;return n()(l.a.mark(function a(){return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:console.log(t),e.Pid=t.uid,e.visible=!0,e.title="详情",e.initDetail({page:e.DcurrentPage,limit:e.Dlimit,pid:t.uid});case 5:case"end":return a.stop()}},a,e)}))()},nextLevel:function(t,e){this.Pid=e.uid,this.visible=!0,this.title="下级",this.initLevel({page:this.LcurrentPage,limit:this.Llimit,pid:e.uid})},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.initdata({page:this.currentPage,limit:this.limit})},handleCurrentChange:function(t){this.currentPage=t,this.initdata({page:this.currentPage,limit:this.limit})},DhandleSizeChange:function(t){this.Dlimit=t,this.DcurrentPage=1,this.initDetail({page:this.DcurrentPage,limit:this.Dlimit,pid:this.Pid})},DhandleCurrentChange:function(t){this.DcurrentPage=t,this.initDetail({page:this.DcurrentPage,limit:this.Dlimit,pid:this.Pid})},formateData:function(t){var e=this;return t.forEach(function(t){t.register_time=e.timestampToTime(t.register_time),t.cash_time=e.timestampToTime(t.cash_time),t.create_at=e.timestampToTime(t.create_at),t.invite_time=e.timestampToTime(t.invite_time)}),t},timestampToTime:function(t){var e=new Date(1e3*t);return e.getFullYear()+"-"+((e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+(e.getDate()+" ")+(e.getHours()+":")+(e.getMinutes()+":")+e.getSeconds()},initLevel:function(t){var e=this;return n()(l.a.mark(function a(){var i,r,n;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.allAgency.GetAgencyLevel(t);case 2:i=a.sent,r=i.data,n=Object(o.a)(r.data),e.DtableData=e.formateData(n),e.Dtotal=r.total;case 7:case"end":return a.stop()}},a,e)}))()},initDetail:function(t){var e=this;return n()(l.a.mark(function a(){var i,r,n;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.allAgency.GetEarnings(t);case 2:i=a.sent,r=i.data,n=Object(o.a)(r.data),e.DtableData=e.formateData(n),e.Dtotal=r.total;case 7:case"end":return a.stop()}},a,e)}))()},initdata:function(t){var e=this;return n()(l.a.mark(function a(){var i,r,n;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.allAgency.GetAgency(t);case 2:i=a.sent,r=i.data,n=Object(o.a)(r.data),e.tableData=e.formateData(n),e.total=r.total;case 7:case"end":return a.stop()}},a,e)}))()}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"Agency"}},[a("div",{staticClass:"title"},[t._v("\n    用户ID\n    "),a("el-input",{staticStyle:{"margin-top":"10px",width:"200px"},model:{value:t.userID,callback:function(e){t.userID=e},expression:"userID"}}),t._v("\n    提取时间\n    "),a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"timestamp"},model:{value:t.start_time,callback:function(e){t.start_time=e},expression:"start_time"}}),t._v("\n    -\n    "),a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"timestamp"},model:{value:t.end_time,callback:function(e){t.end_time=e},expression:"end_time"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查找")])],1),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"","default-sort":{prop:"ID",order:t.orderlist[0]},data:t.tableData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{sortable:"",prop:"uid",label:"玩家ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"register_time",label:"注册时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"channel",label:"所属渠道",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"sub_num",label:"直属下级人数",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"team_person",label:"团队人数",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"team_recharge",label:"团队充值",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"team_water",label:"团队流水",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"total_income",label:"累计佣金收益",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cash_income",label:"累计已提佣金",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"wait_income",label:"待提佣金",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cash_time",label:"最近提取时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"change",label:"",align:"center","show-overflow-tooltip":"",width:"200px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleDetail(e.row)}}},[t._v("详情")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.nextLevel(e.$index,e.row)}}},[t._v("查看下级")])]}}])})],1),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1),t._v(" "),a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{title:t.title,visible:t.visible,"destroy-on-close":!0},on:{"update:visible":function(e){t.visible=e}}},[t._v("\n      用户ID\n      "),a("el-input",{staticStyle:{"margin-top":"10px",width:"100px"},model:{value:t.DuserID,callback:function(e){t.DuserID=e},expression:"DuserID"}}),t._v("\n      "+t._s("详情"===t.title?"时间":"邀请时间")+"\n      "),t._v(" "),a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"timestamp"},model:{value:t.Dstart_time,callback:function(e){t.Dstart_time=e},expression:"Dstart_time"}}),t._v("\n      -\n      "),a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"timestamp"},model:{value:t.Dend_time,callback:function(e){t.Dend_time=e},expression:"Dend_time"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.searchDetail(t.title)}}},[t._v("查找")]),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-top":"20px"},attrs:{border:"","highlight-current-row":"","default-sort":{prop:"ID",order:t.orderlist[0]},data:t.DtableData,"tooltip-effect":"dark"}},["详情"===t.title?a("p",[a("el-table-column",{attrs:{sortable:"",prop:"uid",label:"玩家ID",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"create_at",label:"时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"water",label:"个人流水",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"subwater",label:"直属下级流水",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"rebate",label:"佣金贡献",align:"center","show-overflow-tooltip":""}})],1):t._e(),t._v(" "),"下级"===t.title?a("p",[a("el-table-column",{attrs:{sortable:"",prop:"uid",label:"玩家ID",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"invite_time",label:"邀请时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"subnum",label:"直属下级人数",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"water",label:"个人总流水",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"subwater",label:"直属下级总流水",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"rebate",label:"累计贡献佣金",align:"center","show-overflow-tooltip":""}})],1):t._e()]),t._v(" "),"详情"===t.title&&t.Dtotal>5?a("el-pagination",{attrs:{"current-page":t.DcurrentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.Dtotal},on:{"size-change":t.DhandleSizeChange,"current-change":t.DhandleCurrentChange}}):t._e()],1)],1)])},staticRenderFns:[]};var u=a("C7Lr")(s,c,!1,function(t){a("IeiY")},"data-v-57277c56",null);e.default=u.exports}});
//# sourceMappingURL=60.53c19301f218403d0516.js.map
webpackJsonp([100],{Bowp:function(t,e){},aVLu:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("lC5x"),r=a.n(n),l=a("J0Oq"),o=a.n(l),i={data:function(){return{avator_nameO:"",optionchannels:[],end_time:"",start_time:"",currentPage:1,limit:10,total:"",tableData:[]}},created:function(){var t=(new Date).getTime();this.start_time=this.initTime(t),this.end_time=this.initTime(t-6048e5),this.initChannel(),this.getData()},methods:{search:function(){this.getData()},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()},initTime:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())},getData:function(){this.startDate=this.start_time.replace(/[-]/g,""),this.endDate=this.end_time.replace(/[-]/g,""),this.initData({page:this.currentPage,limit:this.limit,start_date:+this.endDate,end_data:+this.startDate,channel_name:"所有渠道"===this.avator_nameO?"":this.avator_nameO})},initChannel:function(){var t=this;return o()(r.a.mark(function e(){var a,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.OperationMan.GetChannels();case 2:a=e.sent,n=[],a.data.data.forEach(function(t){n.push(t.name)}),n.forEach(function(e,a){t.optionchannels.push({avator_nameO:e,levelO:a})}),t.optionchannels.unshift({avator_nameO:"所有渠道",levelO:-1});case 7:case"end":return e.stop()}},e,t)}))()},initData:function(t){var e=this;return o()(r.a.mark(function a(){var n,l;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.DataAnalysis.GetrReport(t);case 2:n=a.sent,l=n.data,e.tableData=l.data,e.total=l.total;case 6:case"end":return a.stop()}},a,e)}))()}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"Channels"}},[a("div",{staticClass:"title"},[a("el-select",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{placeholder:"请选择渠道"},model:{value:t.avator_nameO,callback:function(e){t.avator_nameO=e},expression:"avator_nameO"}},t._l(t.optionchannels,function(t){return a("el-option",{key:t.levelO,attrs:{label:t.avator_nameO,value:t.avator_nameO}})}),1),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyyMMdd","value-format":"yyyy-MM-dd"},model:{value:t.end_time,callback:function(e){t.end_time=e},expression:"end_time"}}),t._v("\n    -\n    "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyyMMdd","value-format":"yyyy-MM-dd"},model:{value:t.start_time,callback:function(e){t.start_time=e},expression:"start_time"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查找")])],1),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{"default-sort":{prop:"date",order:"descending"},data:t.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},[a("el-table-column",{attrs:{fixed:"",prop:"channel",label:"渠道",align:"center",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_user",label:"新增用户",align:"center",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_bind_user",label:"新增绑卡用户",align:"center",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"recharge_money",label:"充值金额",align:"center",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"recharge_user",label:"充值人数",align:"center",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"withdraw_money",label:"兑换金额",align:"center",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_user_recharge_money",label:"新用户充值金额",align:"center",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"agent_withdraw_money",label:"代理提现金额",align:"center",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"recharge_arpu",label:"付费ARPU值",align:"center",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"day_recover",label:"当日回收",align:"center",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_user_recharge_counts",label:"新用户充值人数",align:"center",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_user_recharge_rate",label:"新用户付费率",align:"center",width:"150","show-overflow-tooltip":""}})],1),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[5,10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1)])},staticRenderFns:[]};var c=a("C7Lr")(i,s,!1,function(t){a("Bowp")},"data-v-17d38efe",null);e.default=c.exports}});
//# sourceMappingURL=100.8daa8782ba074466dd5e.js.map
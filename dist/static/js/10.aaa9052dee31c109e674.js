webpackJsonp([10],{"SH+z":function(t,e){},lpkv:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("lC5x"),r=a.n(l),o=a("J0Oq"),n=a.n(o),i=(a("vdVF"),a("EuRQ")),s={name:"daily_channel_report",data:function(){return{start_time:"",todayTime:"",avator_nameO:"",optionchannels:[],tableData:[],currentPage:1,limit:10,total:""}},created:function(){var t=(new Date).getTime();this.start_time=this.initTime(t),this.initChannel(),this.getData()},methods:{search:function(){this.getData()},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()},initTime:function(){var t=new Date;return t.getFullYear()+"-"+(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(t.getDate()<10?"0"+t.getDate():t.getDate())},getData:function(){this.todayTime=this.start_time,this.todayTime=Object(i.a)(this.todayTime).replace(/[-]/g,""),this.initData({page:this.currentPage,limit:this.limit,date:+this.todayTime,channel_name:"所有渠道"===this.avator_nameO?"":this.avator_nameO})},initChannel:function(){var t=this;return n()(r.a.mark(function e(){var a,l;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.OperationMan.GetChannels();case 2:a=e.sent,l=[],a.data.data.forEach(function(t){l.push(t.name)}),l.forEach(function(e,a){t.optionchannels.push({avator_nameO:e,levelO:a})}),t.optionchannels.unshift({avator_nameO:"所有渠道",levelO:-1});case 8:case"end":return e.stop()}},e,t)}))()},initData:function(t){var e=this;return n()(r.a.mark(function a(){var l,o;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.DataAnalysis.GetrReportEveryday(t);case 2:l=a.sent,o=l.data,e.tableData=o.data,e.total=o.total;case 6:case"end":return a.stop()}},a,e)}))()}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"ChannelsReport"}},[a("div",{staticClass:"title"},[a("el-select",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{placeholder:"请选择渠道"},model:{value:t.avator_nameO,callback:function(e){t.avator_nameO=e},expression:"avator_nameO"}},t._l(t.optionchannels,function(t){return a("el-option",{key:t.levelO,attrs:{label:t.avator_nameO,value:t.avator_nameO}})}),1),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyyMMdd","value-format":"yyyy-MM-dd"},model:{value:t.start_time,callback:function(e){t.start_time=e},expression:"start_time"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查找")])],1),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{"default-sort":{prop:"date",order:"descending"},data:t.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},[a("el-table-column",{attrs:{fixed:"",prop:"channel",label:"渠道",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_user",label:"新增用户",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_bind_user",label:"新增绑卡用户",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"old_active_user",label:"老用户活跃人数",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"active_user",label:"活跃用户",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"recharge_money",label:"充值金额",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"recharge_user",label:"充值人数",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"withdraw_money",label:"兑换金额",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"withdraw_user",label:"兑换人数",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"agent_withdraw_money",label:"代理提现金额",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"day_recover",label:"当日回收",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_user_recharge_money",label:"新用户充值金额",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_user_recharge_counts",label:"新用户充值人数",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"old_user_recharge_money",label:"老用户充值金额",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"old_user_recharge_counts",label:"老用户充值人数",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_user_recharge_rate",label:"新用户付费率",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"active_user_recharge_rate",label:"活跃付费率",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"active_user_arpu",label:"活跃ARPU值",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"new_user_arpu",label:"新增ARPU值",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"old_user_arpu",label:"老用户ARPU值",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"recharge_arpu",label:"付费ARPU值",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"next_day_rate",label:"次日存留",align:"center",width:"120","show-overflow-tooltip":""}})],1),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1)])},staticRenderFns:[]};var h=a("C7Lr")(s,c,!1,function(t){a("SH+z")},"data-v-bfd4604a",null);e.default=h.exports}});
//# sourceMappingURL=10.aaa9052dee31c109e674.js.map
webpackJsonp([47],{quZD:function(t,e){},ypOL:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("lC5x"),n=a.n(l),o=a("J0Oq"),r=a.n(o),i=a("EuRQ"),s={data:function(){return{avator_nameO:"",optionchannels:[],start_time:"",end_time:"",tableData:[],currentPage:1,limit:10,total:"",startDate:"",endDate:""}},created:function(){var t=(new Date).getTime();this.start_time=this.initTime(t),this.end_time=this.initTime(t-6048e5),console.log(this.start_time,this.end_time),this.initChannel(),this.getData()},methods:{search:function(){this.getData()},handleSizeChange:function(t){this.limit=t,this.current=1,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()},initTime:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()},initChannel:function(){var t=this;return r()(n.a.mark(function e(){var a,l;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.OperationMan.GetChannels();case 2:a=e.sent,l=[],a.data.data.forEach(function(t){l.push(t.name)}),l.forEach(function(e,a){t.optionchannels.push({avator_nameO:e,levelO:a})}),t.optionchannels.unshift({avator_nameO:"所有渠道",levelO:-1});case 7:case"end":return e.stop()}},e,t)}))()},getData:function(){this.startDate=this.start_time,this.startDate=Object(i.a)(this.startDate).replace(/[-]/g,""),this.endDate=this.end_time,this.endDate=Object(i.a)(this.endDate).replace(/[-]/g,""),this.initData({page:this.currentPage,limit:this.limit,start_date:+this.startDate,end_data:+this.endDate,channel_name:"所有渠道"===this.avator_nameO?"":this.avator_nameO})},initData:function(t){var e=this;return r()(n.a.mark(function a(){var l,o;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.DataAnalysis.GetrReportLtv(t);case 2:l=a.sent,o=l.data,o.data.forEach(function(t){t.date=e.initTime(1e3*t.date)}),e.tableData=o.data,e.total=o.total;case 8:case"end":return a.stop()}},a,e)}))()}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"LTVReport"}},[a("div",{staticClass:"title"},[a("el-select",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{placeholder:"请选择渠道"},model:{value:t.avator_nameO,callback:function(e){t.avator_nameO=e},expression:"avator_nameO"}},t._l(t.optionchannels,function(t){return a("el-option",{key:t.levelO,attrs:{label:t.avator_nameO,value:t.avator_nameO}})}),1),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyyMMdd","value-format":"yyyy-MM-dd"},model:{value:t.end_time,callback:function(e){t.end_time=e},expression:"end_time"}}),t._v("\n    -\n    "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyyMMdd","value-format":"yyyy-MM-dd"},model:{value:t.start_time,callback:function(e){t.start_time=e},expression:"start_time"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查找")])],1),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{"default-sort":{prop:"date",order:"descending"},data:t.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},[a("el-table-column",{attrs:{fixed:"",prop:"date",label:"新增日",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{fixed:"",prop:"add_count",label:"新增用户",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{fixed:"",prop:"avg_cost",label:"平均价值",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_1",label:"第1天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_2",label:"第2天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_3",label:"第3天",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_4",label:"第4天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_5",label:"第5天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_6",label:"第6天",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_7",label:"第7天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_8",label:"第8天",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_9",label:"第9天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_10",label:"第10天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_11",label:"第11天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_12",label:"第12天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_13",label:"第13天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_14",label:"第14天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_15",label:"第15天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_30",label:"第30天",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pay_45",label:"第45天",align:"center",width:"120","show-overflow-tooltip":""}})],1),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[5,10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1)])},staticRenderFns:[]};var c=a("C7Lr")(s,p,!1,function(t){a("quZD")},"data-v-607130b8",null);e.default=c.exports}});
//# sourceMappingURL=47.7f30f81cd042212bb4b2.js.map
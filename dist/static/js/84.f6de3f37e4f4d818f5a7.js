webpackJsonp([84],{Ft2d:function(t,e){},xg2C:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("lC5x"),r=a.n(n),i=a("J0Oq"),l=a.n(i),o={data:function(){return{avator_nameO:"",optionchannels:[],end_time:"",start_time:"",tableData:[],limit:10,currentPage:1,total:"",activeName:"1",titleData1:[{prop:"date",label:"日期"},{prop:"user_lost",label:"流失用户"},{prop:"user_lost_bingding",label:"流失绑卡用户"},{prop:"user_lost_ay",label:"付费流失用户"},{prop:"user_lost_rate",label:"用户流失率"},{prop:"user_lost_bingding_rate",label:"绑定流失率"},{prop:"user_lost_pay_rate",label:"付费流失率"}],titleData2:[{prop:"date",label:"日期"},{prop:"user_return",label:"回归用户"},{prop:"user_natural_return",label:"自然回归用户"},{prop:"user_activity_return",label:"主动招回用户"},{prop:"user_return_bingding",label:"回归绑卡用户"},{prop:"user_natural_return_bingding",label:"自然回归绑卡"},{prop:"user_activity_return_bingding",label:"主动招回绑卡"},{prop:"user_return_rate",label:"用户回率"},{prop:"user_return_bingding_rate",label:"绑卡回率"}]}},created:function(){var t=(new Date).getTime();this.start_time=this.initTime(t),this.end_time=this.initTime(t-6048e5),this.initChannel(),this.getData()},methods:{search:function(){this.getData()},handleClick:function(t){this.getData()},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()},initTime:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())},getData:function(){this.startDate=this.start_time.replace(/[-]/g,""),this.endDate=this.end_time.replace(/[-]/g,""),this.initData({page:this.currentPage,limit:this.limit,start_date:+this.endDate,end_data:+this.startDate,channel_name:"所有渠道"===this.avator_nameO?"":this.avator_nameO,type_id:+this.activeName})},initChannel:function(){var t=this;return l()(r.a.mark(function e(){var a,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.OperationMan.GetChannels();case 2:a=e.sent,n=[],a.data.data.forEach(function(t){n.push(t.name)}),n.forEach(function(e,a){t.optionchannels.push({avator_nameO:e,levelO:a})}),t.optionchannels.unshift({avator_nameO:"所有渠道",levelO:-1});case 7:case"end":return e.stop()}},e,t)}))()},initData:function(t){var e=this;return l()(r.a.mark(function a(){var n,i;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.DataAnalysis.GetrLoss(t);case 2:n=a.sent,i=n.data,e.tableData=i.data,e.total=i.total;case 6:case"end":return a.stop()}},a,e)}))()}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"FlyBack"}},[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"流失用户",name:"1"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"回归用户",name:"2"}})],1),t._v(" "),a("div",{staticClass:"title"},[a("el-select",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{placeholder:"请选择渠道"},model:{value:t.avator_nameO,callback:function(e){t.avator_nameO=e},expression:"avator_nameO"}},t._l(t.optionchannels,function(t){return a("el-option",{key:t.levelO,attrs:{label:t.avator_nameO,value:t.avator_nameO}})}),1),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyyMMdd","value-format":"yyyy-MM-dd"},model:{value:t.end_time,callback:function(e){t.end_time=e},expression:"end_time"}}),t._v("\n    -\n    "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyyMMdd","value-format":"yyyy-MM-dd"},model:{value:t.start_time,callback:function(e){t.start_time=e},expression:"start_time"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查找")])],1),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},["1"===t.activeName?a("p",t._l(t.titleData1,function(t,e){return a("el-table-column",{key:e,attrs:{prop:t.prop,label:t.label,align:"center","show-overflow-tooltip":""}})}),1):t._e(),t._v(" "),"2"===t.activeName?a("p",t._l(t.titleData2,function(t,e){return a("el-table-column",{key:e,attrs:{prop:t.prop,label:t.label,align:"center","show-overflow-tooltip":""}})}),1):t._e()]),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1)],1)},staticRenderFns:[]};var c=a("C7Lr")(o,s,!1,function(t){a("Ft2d")},"data-v-1f51158a",null);e.default=c.exports}});
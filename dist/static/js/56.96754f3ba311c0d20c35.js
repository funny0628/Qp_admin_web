webpackJsonp([56],{KLyU:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("lC5x"),r=e.n(n),i=e("J0Oq"),l=e.n(i),o={name:"pay_switch",data:function(){return{avator_nameO:"",optionchannels:[],tableData:[],currentPage:1,limit:10,total:"",titleData:[{prop:"days",label:"日期"},{prop:"user_reg",label:"新增账号个数"},{prop:"pay_user_d",label:"首日付费账号个数"},{prop:"day_change",label:"首日付费率"},{prop:"pay_user_w",label:"首周付费账号个数"},{prop:"week_change",label:"首周付费率"}]}},created:function(){this.initChannel(),this.getData()},methods:{search:function(){this.getData()},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()},getData:function(){this.initData({page:this.currentPage,limit:this.limit,channel_name:"所有渠道"===this.avator_nameO?"":this.avator_nameO})},initChannel:function(){var t=this;return l()(r.a.mark(function a(){var e,n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$http.OperationMan.GetChannels();case 2:e=a.sent,n=[],e.data.data.forEach(function(t){n.push(t.name)}),n.forEach(function(a,e){t.optionchannels.push({avator_nameO:a,levelO:e})}),t.optionchannels.unshift({avator_nameO:"所有渠道",levelO:-1});case 7:case"end":return a.stop()}},a,t)}))()},initData:function(t){var a=this;return l()(r.a.mark(function e(){var n,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.$http.DataAnalysis.GetrPaySwitch(t);case 2:n=e.sent,i=n.data,console.log(i),a.tableData=i.data,a.total=i.total;case 7:case"end":return e.stop()}},e,a)}))()}}},s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"NewPlayerChange"}},[t._m(0),t._v(" "),e("div",{staticClass:"title"},[e("el-select",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{placeholder:"请选择渠道"},model:{value:t.avator_nameO,callback:function(a){t.avator_nameO=a},expression:"avator_nameO"}},t._l(t.optionchannels,function(t){return e("el-option",{key:t.levelO,attrs:{label:t.avator_nameO,value:t.avator_nameO}})}),1),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查找")])],1),t._v(" "),e("div",{staticClass:"table"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},t._l(t.titleData,function(t,a){return e("el-table-column",{key:a,attrs:{prop:t.prop,label:t.label,align:"center","show-overflow-tooltip":""}})}),1),t._v(" "),t.total>5?e("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"top"},[a("p",[this._v("支付转化")])])}]};var c=e("C7Lr")(o,s,!1,function(t){e("ZXNi")},"data-v-47e03aea",null);a.default=c.exports},ZXNi:function(t,a){}});
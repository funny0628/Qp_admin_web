webpackJsonp([31],{IzSt:function(t,e){},OZJx:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("lC5x"),r=a.n(n),s=a("J0Oq"),c=a.n(s),l=a("Z/hU"),i=a("22Zk"),o=(l.a,i.a,{name:"fresher_awards",extends:l.a,components:{InputArea:i.a},data:function(){return{value:"金币",formLabelWidth:"120px",tabItem:["新人奖励"],currentIndex:0,gold:"",counter:[{newbie_award:999,bind_phone_award:10}]}},created:function(){this.initData()},methods:{showTab:function(t){this.currentIndex=t},save:function(t){var e=this;return c()(r.a.mark(function a(){var n,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log(e.counter),a.next=3,e.$http.allAgency.PostfresherAward({type:t+1,value:+e.counter.newbie_award});case 3:n=a.sent,s=n.data,console.log(s);case 6:case"end":return a.stop()}},a,e)}))()},initData:function(t){var e=this;return c()(r.a.mark(function a(){var n,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.allAgency.GetfresherAward(t);case 2:n=a.sent,s=n.data,console.log(s),e.counter=s.data;case 6:case"end":return a.stop()}},a,e)}))()}}}),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"FreshmanReward-main"}},[a("input-area",[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(e){return t.save(t.currentIndex)}}},[t._v("保存")])],1),t._v(" "),a("div",{staticClass:"bd"},[a("div",{staticClass:"nav"},t._l(t.tabItem,function(e,n){return a("div",{key:n,staticClass:"nav-item",class:{active:n===t.currentIndex},on:{click:function(e){return t.showTab(n)}}},[t._v(t._s(e))])}),0),t._v(" "),a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"}}),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:10}},[a("el-row",[a("el-col",{attrs:{span:20}},[a("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"请选择"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("el-option",{attrs:{label:"金币",value:"1001"}})],1)],1),t._v(" "),a("el-col",{staticStyle:{height:"36px","line-height":"36px",color:"#6c6c6c","padding-left":"5px"},attrs:{span:4}},[a("span",[t._v("(元)")])])],1)],1),t._v(" "),a("el-col",{attrs:{span:14}},[a("el-row",[a("el-col",{staticStyle:{height:"36px"},attrs:{span:20}},[a("el-input",{staticStyle:{height:"100%"},attrs:{size:"small",autocomplete:"off",placeholder:""},model:{value:t.counter.newbie_award,callback:function(e){t.$set(t.counter,"newbie_award",e)},expression:"counter.newbie_award"}})],1),t._v(" "),a("el-col",{staticStyle:{"padding-left":"5px"},attrs:{span:4}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var d=a("C7Lr")(o,u,!1,function(t){a("IzSt")},"data-v-7ba5025c",null);e.default=d.exports}});
//# sourceMappingURL=31.638f71955f6804e3c2e1.js.map
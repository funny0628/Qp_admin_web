webpackJsonp([25],{"1J5Z":function(e,t){},OZJx:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("lC5x"),r=a.n(n),s=a("J0Oq"),c=a.n(s),l=a("Z/hU"),i=a("22Zk"),o=(l.a,i.a,{name:"fresher_awards",extends:l.a,components:{InputArea:i.a},data:function(){return{value:"金币",formLabelWidth:"120px",tabItem:["新人奖励"],currentIndex:0,gold:"",counter:[{newbie_award:999,bind_phone_award:10}]}},created:function(){this.initData()},methods:{showTab:function(e){this.currentIndex=e},save:function(e){var t=this;return c()(r.a.mark(function a(){var n,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log(t.counter),a.next=3,t.$http.allAgency.PostfresherAward({type:e+1,value:+t.counter.newbie_award});case 3:n=a.sent,s=n.data,console.log(s);case 6:case"end":return a.stop()}},a,t)}))()},initData:function(e){var t=this;return c()(r.a.mark(function a(){var n,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$http.allAgency.GetfresherAward(e);case 2:n=a.sent,s=n.data,console.log(s),t.counter=s.data;case 6:case"end":return a.stop()}},a,t)}))()}}}),u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"FreshmanReward-main"}},[a("input-area",[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.save(e.currentIndex)}}},[e._v("保存")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("div",{staticClass:"nav"},e._l(e.tabItem,function(t,n){return a("div",{key:n,staticClass:"nav-item",class:{active:n===e.currentIndex},on:{click:function(t){return e.showTab(n)}}},[e._v(e._s(t))])}),0),e._v(" "),a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"}}),e._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:10}},[a("el-row",[a("el-col",{attrs:{span:20}},[a("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[a("el-option",{attrs:{label:"金币",value:"1001"}})],1)],1),e._v(" "),a("el-col",{staticStyle:{height:"36px","line-height":"36px",color:"#6c6c6c","padding-left":"5px"},attrs:{span:4}},[a("span",[e._v("(元)")])])],1)],1),e._v(" "),a("el-col",{attrs:{span:14}},[a("el-row",[a("el-col",{staticStyle:{height:"36px"},attrs:{span:20}},[a("el-input",{staticStyle:{height:"100%"},attrs:{size:"small",autocomplete:"off",placeholder:""},model:{value:e.counter.newbie_award,callback:function(t){e.$set(e.counter,"newbie_award",t)},expression:"counter.newbie_award"}})],1),e._v(" "),a("el-col",{staticStyle:{"padding-left":"5px"},attrs:{span:4}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var d=a("C7Lr")(o,u,!1,function(e){a("1J5Z")},"data-v-7ba5025c",null);t.default=d.exports}});
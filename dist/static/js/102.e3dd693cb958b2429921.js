webpackJsonp([102],{RpA8:function(e,t){},"c9e+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("lC5x"),i=a.n(l),n=a("J0Oq"),v=a.n(n),u={data:function(){return{namelist:["fishing_normal","","",""],activeName:"fishing_normal",resData:{},Data:{},id:0,keys:"",loading:!1,value:""}},created:function(){var e=this;return v()(i.a.mark(function t(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},t,e)}))()},methods:{submit:function(e){var t=this;return v()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,t)}))()},handleClick:function(e,t){}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"HNControl","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("el-button",{staticStyle:{margin:"0px 10px 10px 0px"},attrs:{type:"primary"},on:{click:function(t){return e.submit(1)}}},[e._v("保存")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submit(2)}}},[e._v("发送给服务器配置")]),e._v(" "),a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"百人牛牛-低倍场",name:e.namelist[0]}}),e._v(" "),a("el-tab-pane",{attrs:{label:"百人牛牛-中倍场",name:e.namelist[1]}}),e._v(" "),a("el-tab-pane",{attrs:{label:"百人牛牛-高倍场",name:e.namelist[2]}}),e._v(" "),a("el-tab-pane",{attrs:{label:"百人牛牛-土豪场",name:e.namelist[3]}})],1)],1),e._v(" "),a("div",{staticClass:"table"},[a("div",{staticClass:"item"},[a("div",{staticClass:"item_div left"},[e._v("\n        抽水\n      ")]),e._v(" "),a("div",{staticClass:"item_div right"},[a("p",[e._v("\n          实时抽水(元):"),a("el-input",{staticStyle:{width:"200px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n          基础库存抽水比率(万分比):"),a("el-input",{staticStyle:{width:"100px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)])]),e._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"item_div left"},[e._v("\n        基础库存\n      ")]),e._v(" "),a("div",{staticClass:"item_div right"},[a("p",[e._v("\n         实时基础库存:"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n         实时吃分控制率(百分比):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n         库存下限值(元):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n        库存上限值(元):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n         正常值(元):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n         吃分控制率(万分比):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n         放分控制率(万分比):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n         警戒控制率(万分比):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)])]),e._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"item_div left"},[e._v("\n        奖励库存\n      ")]),e._v(" "),a("div",{staticClass:"item_div right"},[a("p",[e._v("\n        实时奖励库存:"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n         基础库存抽水比率(万分比):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n         库存下限值(元):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n         库存上限值(元):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n         触发概率下限(万分比):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),a("p",[e._v("\n        触发概率上限(万分比):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)])])])])},staticRenderFns:[]};var c=a("C7Lr")(u,s,!1,function(e){a("RpA8")},"data-v-1733f8ef",null);t.default=c.exports}});
//# sourceMappingURL=102.e3dd693cb958b2429921.js.map
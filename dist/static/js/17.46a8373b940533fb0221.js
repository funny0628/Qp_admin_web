webpackJsonp([17],{R6E6:function(e,l,r){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var t={render:function(){var e=this,l=e.$createElement,r=e._self._c||l;return r("div",{attrs:{id:"L_RoomCofig"}},[r("div",{staticClass:"title"},[r("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(l){e.activeName=l},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"斗地主-低倍场",name:"first"}}),e._v(" "),r("el-tab-pane",{attrs:{label:"斗地主-中倍场",name:"second"}}),e._v(" "),r("el-tab-pane",{attrs:{label:"斗地主-高倍场 ",name:"third"}})],1)],1),e._v(" "),r("div",{staticClass:"form"},[r("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"success"},on:{click:e.send}},[e._v("发送到服务器配置")]),e._v(" "),r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[r("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"房间名称"},model:{value:e.ruleForm.room,callback:function(l){e.$set(e.ruleForm,"room",l)},expression:"ruleForm.room"}}),e._v("房间ID:103\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"场次开关",prop:"delivery"}},[r("el-switch",{model:{value:e.ruleForm.delivery,callback:function(l){e.$set(e.ruleForm,"delivery",l)},expression:"ruleForm.delivery"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否开放机器人",prop:"delivery"}},[r("el-switch",{model:{value:e.ruleForm.delivery,callback:function(l){e.$set(e.ruleForm,"delivery",l)},expression:"ruleForm.delivery"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"ip限制",prop:"delivery"}},[r("el-switch",{model:{value:e.ruleForm.delivery,callback:function(l){e.$set(e.ruleForm,"delivery",l)},expression:"ruleForm.delivery"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"底注",prop:"name"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"台费",prop:"name"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}}),e._v("(百分比)\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"携带上限",prop:"name"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"携带下限",prop:"name"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"初始倍率",prop:"name"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(l){return e.submitForm("ruleForm")}}},[e._v("立即提交")])],1)],1)],1)])},staticRenderFns:[]};var a=r("VU/8")({data:function(){return{activeName:"first",ruleForm:{delivery:!0},rules:{}}},methods:{send:function(){},handleClick:function(){},submitForm:function(){}}},t,!1,function(e){r("h45S")},"data-v-e2647e8c",null);l.default=a.exports},h45S:function(e,l){}});
//# sourceMappingURL=17.46a8373b940533fb0221.js.map
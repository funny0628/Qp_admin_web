webpackJsonp([41],{iUlP:function(e,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var r={render:function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("div",{attrs:{id:"W_RoomCofig"}},[t("div",{staticClass:"title"},[t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(l){e.activeName=l},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"传奇厅01",name:"first"}}),e._v(" "),t("el-tab-pane",{attrs:{label:"传奇厅02",name:"second"}}),e._v(" "),t("el-tab-pane",{attrs:{label:"荣耀厅01 ",name:"third"}}),e._v(" "),t("el-tab-pane",{attrs:{label:"荣耀厅02",name:"four"}}),e._v(" "),t("el-tab-pane",{attrs:{label:"聚龙厅01",name:"five"}}),e._v(" "),t("el-tab-pane",{attrs:{label:"聚龙厅02",name:"six"}})],1)],1),e._v(" "),t("div",{staticClass:"form"},[t("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"success"},on:{click:e.send}},[e._v("发送到服务器配置")]),e._v(" "),t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[t("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"房间名称"},model:{value:e.ruleForm.room,callback:function(l){e.$set(e.ruleForm,"room",l)},expression:"ruleForm.room"}}),e._v("房间ID:200004\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"场次开关",prop:"delivery"}},[t("el-switch",{model:{value:e.ruleForm.delivery,callback:function(l){e.$set(e.ruleForm,"delivery",l)},expression:"ruleForm.delivery"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"是否开放机器人",prop:"delivery"}},[t("el-switch",{model:{value:e.ruleForm.delivery,callback:function(l){e.$set(e.ruleForm,"delivery",l)},expression:"ruleForm.delivery"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"台费",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}}),e._v("(百分比)\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"携带上限",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"携带下限",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"上座金额",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"下注最低携带",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"个人限红",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}}),e._v("格式如1,10000\n   ")],1),e._v(" "),t("el-form-item",{attrs:{label:"个人区域限红（红）",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"个人区域限红（黑）",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"个人区域限红（幸运）",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"红黑区域差额限制",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"幸运区域总值限制",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.name,callback:function(l){e.$set(e.ruleForm,"name",l)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(l){return e.submitForm("ruleForm")}}},[e._v("立即提交")])],1)],1)],1)])},staticRenderFns:[]};var a=t("C7Lr")({data:function(){return{activeName:"first",ruleForm:{delivery:!0},rules:{}}},methods:{send:function(){},handleClick:function(){},submitForm:function(){}}},r,!1,function(e){t("qv1a")},"data-v-489887f9",null);l.default=a.exports},qv1a:function(e,l){}});
//# sourceMappingURL=41.0a53f17177d67dad1b59.js.map
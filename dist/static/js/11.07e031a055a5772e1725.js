webpackJsonp([11],{OZJx:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("iVUn"),o=a("fftp"),i=(a("zhQY"),a("Z/hU")),n=a("2u00"),r=(a("y35B"),a("22Zk")),s=a("06fe"),c=(i.a,s.a,r.a,l.a,o.a,n.a,{name:"FreshmanReward",extends:i.a,components:{InfoTableItem:s.a,InputArea:r.a,SelectTime:l.a,InfoTable:o.a,PermissionButton:n.a},data:function(){return{formLabelWidth:"120px",tabItem:["新人奖励","绑定手机奖励"],currentIndex:0,gold:"",money:"",counter:[1],dialogFormVisible:!1,form:{reward_id:"",reward_name:""}}},methods:{showTab:function(t){this.currentIndex=t},add:function(){this.counter.push(1)},deleteItem:function(t){this.counter=this.counter.filter(function(e,a){return t!==a})},sendConfigFile:function(){}},mounted:function(){}}),d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"FreshmanReward-main"}},[a("input-area",[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(e){t.dialogFormVisible=!0}}},[t._v("添加奖励")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[t._v("保存")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.sendConfigFile}},[t._v("发送到服务器配置")])],1),t._v(" "),a("div",{staticClass:"bd"},[a("div",{staticClass:"nav"},t._l(t.tabItem,function(e,l){return a("div",{key:l,staticClass:"nav-item",class:{active:l===t.currentIndex},on:{click:function(e){return t.showTab(l)}}},[t._v(t._s(e))])}),0),t._v(" "),a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"}},[a("el-button",{attrs:{type:"success",size:"medium"},on:{click:t.add}},[t._v("添加")])],1),t._v(" "),t._l(t.counter,function(e,l){return a("div",{key:l,staticStyle:{width:"50%","margin-bottom":"10px"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:10}},[a("el-row",[a("el-col",{attrs:{span:20}},[a("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"请选择"},model:{value:t.gold,callback:function(e){t.gold=e},expression:"gold"}},[a("el-option",{attrs:{label:"金币",value:"gold"}}),t._v(" "),a("el-option",{attrs:{label:"现金",value:"money"}})],1)],1),t._v(" "),a("el-col",{staticStyle:{height:"36px","line-height":"36px",color:"#6c6c6c","padding-left":"5px"},attrs:{span:4}},[a("span",[t._v("(元)")])])],1)],1),t._v(" "),a("el-col",{attrs:{span:14}},[a("el-row",[a("el-col",{staticStyle:{height:"36px"},attrs:{span:20}},[a("el-input",{staticStyle:{height:"100%"},attrs:{size:"small",autocomplete:"off",placeholder:""},model:{value:t.money,callback:function(e){t.money=e},expression:"money"}})],1),t._v(" "),a("el-col",{staticStyle:{"padding-left":"5px"},attrs:{span:4}},[a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(e){return t.deleteItem(l)}}},[t._v("删除")])],1)],1)],1)],1)],1)})],2),t._v(" "),a("el-dialog",{attrs:{title:"奖励添加",visible:t.dialogFormVisible,width:"30%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{attrs:{model:t.form}},[a("el-form-item",{attrs:{label:"奖励id","label-width":t.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:""},model:{value:t.form.reward_id,callback:function(e){t.$set(t.form,"reward_id",e)},expression:"form.reward_id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"奖励名","label-width":t.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:""},model:{value:t.form.reward_name,callback:function(e){t.$set(t.form,"reward_name",e)},expression:"form.reward_name"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=a("C7Lr")(c,d,!1,function(t){a("Xerk")},"data-v-f5a5e276",null);e.default=m.exports},Xerk:function(t,e){}});
//# sourceMappingURL=11.07e031a055a5772e1725.js.map
webpackJsonp([70],{cdRp:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Z/hU"),o=a("2u00"),i=a("fftp"),s=a("zhQY"),r=a("06fe"),n=(l.a,o.a,i.a,r.a,{name:"SetAward",extends:l.a,components:{PermissionButton:o.a,InfoTable:i.a,InfoTableItem:r.a},data:function(){return{format:{active:!1,begin_time:""},form:{name:""},tableStyle:[{label:"ID",prop:"user_id",width:""},{label:"金额",prop:"money",width:""},{label:"概率",prop:"chance",width:""},{label:"操作",prop:"action",width:""}],records:[{user_id:"0131561",money:"10000.00",chance:"1",action:[{label:"修改",type:"edit"},{label:"删除",type:"delete"}]}],pageInfo:new s.a(0,[5,10,15],0),dialogTitleType:"每日签到设置",dialogVisible:!1,userLevels:[],labelWidth:"100px",formDates:{level:"",day1:"",day2:"",day3:"",day4:"",day5:"",day6:"",day7:""}}},methods:{search:function(){},confirm:function(){}}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"SetAward-main"}},[a("div",{staticClass:"title"},[e._v("抽奖设置")]),e._v(" "),a("div",{staticClass:"content"},[a("el-form",{ref:"form",staticStyle:{padding:"30px 0 30px 30px"},attrs:{model:e.format,"label-width":"120px","label-position":"left"}},[a("el-form-item",{attrs:{label:"活动开启/关闭"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.format.active,callback:function(t){e.$set(e.format,"active",t)},expression:"format.active"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动持续时间"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.format.begin_time,callback:function(t){e.$set(e.format,"begin_time",t)},expression:"format.begin_time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"转盘次数条件"}},[a("el-checkbox",[e._v("新用户首次进入")]),e._v(" "),a("el-checkbox",[e._v("每日充值任意金额")]),e._v(" "),a("el-checkbox",[e._v("每日登陆")])],1),e._v(" "),a("el-form-item",{attrs:{label:"获得次数"}},[a("el-input",{staticStyle:{width:"30%"},attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"奖励配置"}},[a("div",{staticClass:"bd",staticStyle:{"padding-right":"15px"}},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo,"hide-page":!0}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["action"===t.prop?e._l(t.row[t.prop],function(t,l){return a("permission-button",{key:l,staticStyle:{cursor:"pointer","padding-left":"5px"},attrs:{action:t.type},on:{click:function(t){e.dialogVisible=!0}}},[a("span",[e._v(e._s(t.label))])])}):e._e(),e._v(" "),["action"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1)],1)]),e._v(" "),a("div",{staticClass:"footer",staticStyle:{"text-align":"center"}},[a("el-button",{on:{click:function(t){e.dialogVisible=!0}}},[a("i",{staticClass:"el-icon-plus"}),e._v(" 添 加\n        ")]),e._v(" "),a("el-button",{attrs:{type:"primary"}},[e._v("保 存")])],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitleType,center:"",visible:e.dialogVisible,width:"25%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.formDates}},[a("el-form-item",{staticClass:"el-item",attrs:{label:"用户层级","label-width":e.labelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"请选择用户层级"},model:{value:e.formDates.level,callback:function(t){e.$set(e.formDates,"level",t)},expression:"formDates.level"}},e._l(e.userLevels,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{staticClass:"el-item",attrs:{label:"第一天","label-width":e.labelWidth}},[a("el-input",{attrs:{autocomplete:"off",clearable:""},model:{value:e.formDates.day1,callback:function(t){e.$set(e.formDates,"day1",t)},expression:"formDates.day1"}})],1),e._v(" "),a("el-form-item",{staticClass:"el-item",attrs:{label:"第二天","label-width":e.labelWidth}},[a("el-input",{attrs:{autocomplete:"off",clearable:""},model:{value:e.formDates.day2,callback:function(t){e.$set(e.formDates,"day2",t)},expression:"formDates.day2"}})],1),e._v(" "),a("el-form-item",{staticClass:"el-item",attrs:{label:"第三天","label-width":e.labelWidth}},[a("el-input",{attrs:{autocomplete:"off",clearable:""},model:{value:e.formDates.day3,callback:function(t){e.$set(e.formDates,"day3",t)},expression:"formDates.day3"}})],1),e._v(" "),a("el-form-item",{staticClass:"el-item",attrs:{label:"第四天","label-width":e.labelWidth}},[a("el-input",{attrs:{autocomplete:"off",clearable:""},model:{value:e.formDates.day4,callback:function(t){e.$set(e.formDates,"day4",t)},expression:"formDates.day4"}})],1),e._v(" "),a("el-form-item",{staticClass:"el-item",attrs:{label:"第五天","label-width":e.labelWidth}},[a("el-input",{attrs:{autocomplete:"off",clearable:""},model:{value:e.formDates.day5,callback:function(t){e.$set(e.formDates,"day5",t)},expression:"formDates.day5"}})],1),e._v(" "),a("el-form-item",{staticClass:"el-item",attrs:{label:"第六天","label-width":e.labelWidth}},[a("el-input",{attrs:{autocomplete:"off",clearable:""},model:{value:e.formDates.day6,callback:function(t){e.$set(e.formDates,"day6",t)},expression:"formDates.day6"}})],1),e._v(" "),a("el-form-item",{staticClass:"el-item",attrs:{label:"第七天","label-width":e.labelWidth}},[a("el-input",{attrs:{autocomplete:"off",clearable:""},model:{value:e.formDates.day7,callback:function(t){e.$set(e.formDates,"day7",t)},expression:"formDates.day7"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.confirm}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var f=a("C7Lr")(n,c,!1,function(e){a("ePC9")},"data-v-3282312a",null);t.default=f.exports},ePC9:function(e,t){}});
//# sourceMappingURL=70.485108d7bf29217d0a1c.js.map
webpackJsonp([71],{"24gA":function(e,t){},"2STE":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("MgeX"),l=a.n(r),i=a("ZLEe"),o=a.n(i),n=a("4YfN"),s=a.n(n),c=a("lC5x"),u=a.n(c),d=a("3cXf"),f=a.n(d),p=a("J0Oq"),m=a.n(p),b={name:"rainmaker_job_config",data:function(){return{tableData:[],title:"新增任务",visible:!1,form:{task_type:"",task_describe:"",task_target:"",fertilizers:"",is_draw:!1,task_guide:""},rules:{task_type:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],task_describe:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],task_target:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],fertilizers:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],is_draw:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],task_guide:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},optiontype:[{value:1,label:"登录游戏大厅"},{value:2,label:"分享微信朋友"},{value:3,label:"分享微信朋友圈"},{value:4,label:"游戏流水达到特定值"},{value:5,label:"发展下级数量达到特定值"}],optionguide:[{value:1,label:"无指引"},{value:2,label:"跳转分享微信朋友圈"},{value:3,label:"跳转分享微信朋友"}],keys:"",id:"",allData:{},currentData:{},currentIndex:"",loading:!1}},created:function(){this.initData()},methods:{add:function(){this.editForm(!0,"新增",this.form)},send:function(){var e=this;return m()(u.a.mark(function t(){var a,r,l;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,a={},e.tableData.forEach(function(e,t){a[t+1]=e}),e.currentData.ac_content.task=a,t.next=6,e.$http.HallFunConfig.PostActivityNew32({keys:e.keys,values:f()(e.allData),id:e.id});case 6:r=t.sent,1===(l=r.data).code&&"ok"===l.msg?(e.loading=!1,e.$message({type:"success",message:"发送服务器配置成功!"})):(e.loading=!1,e.$message({type:"warning",message:"发送服务器配置失败!"}));case 9:case"end":return t.stop()}},t,e)}))()},handleEdit:function(e,t){this.currentIndex=e,this.editForm(!0,"编辑",s()({},t))},handleDelete:function(e,t){this.tableData=this.tableData.filter(function(t,a){return e!==a})},onSubmit:function(e,t){var a,r=this;this.$refs[e].validate((a=m()(u.a.mark(function e(a){var l;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=5;break}"新增"===t?r.tableData.push(r.form):"编辑"===t&&(l=[],r.tableData.forEach(function(e,t){l.push(e),r.currentIndex===t&&(l[t]=r.form)}),r.tableData=l),r.editForm(!1,"新增",r.form),e.next=7;break;case 5:return r.$message({type:"warning",message:"必填的项不可以为空!"}),e.abrupt("return",!1);case 7:case"end":return e.stop()}},e,r)})),function(e){return a.apply(this,arguments)}))},back:function(){},editForm:function(e,t,a){this.visible=e,this.title=t,this.form=a},initData:function(){var e=this;return m()(u.a.mark(function t(){var a,r,i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetActivityNew32({key:"activity_new.lua"});case 2:a=t.sent,r=a.data,e.keys=r.data[0].sys_key,e.id=r.data[0].id,i=r.data[0].sys_val,e.allData=JSON.parse(i),o()(e.allData).forEach(function(t){"10003"===e.allData[t].ac_type&&(e.currentData=e.allData[t],e.tableData=l()(e.allData[t].ac_content.task),e.total=e.tableData.length)});case 9:case"end":return t.stop()}},t,e)}))()}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"MT_TaskConfig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("添加")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"rainmaker_job_config_send",expression:"'rainmaker_job_config_send'"}],attrs:{type:"primary"},on:{click:e.send}},[e._v("发送服务器配置")])],1),e._v(" "),a("div",{directives:[{name:"has",rawName:"v-has",value:"rainmaker_job_config_detail",expression:"'rainmaker_job_config_detail'"}],staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},[a("el-table-column",{attrs:{prop:"task_type",label:"任务类型",align:"center",width:"300px","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"task_describe",label:"任务描述",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"fertilizers",label:"任务奖励肥料数量",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"task_target",label:"任务目标数量",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"is_draw",label:"是否摇奖次数必须",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.row.is_draw,callback:function(a){e.$set(t.row,"is_draw",a)},expression:"scope.row.is_draw"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"task_guide",label:"任务指引",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"week_change",label:"操作",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"form"},[a("el-dialog",{attrs:{title:e.title,visible:e.visible,"destroy-on-close":!0,width:"60%"},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"form",staticStyle:{"margin-top":"20px"},attrs:{rules:e.rules,model:e.form,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"任务类型",prop:"task_type"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.task_type,callback:function(t){e.$set(e.form,"task_type",t)},expression:"form.task_type"}},e._l(e.optiontype,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"任务描述",prop:"task_describe"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"任务描述"},model:{value:e.form.task_describe,callback:function(t){e.$set(e.form,"task_describe",t)},expression:"form.task_describe"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务目标数量",prop:"task_target"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"0"},model:{value:e.form.task_target,callback:function(t){e.$set(e.form,"task_target",t)},expression:"form.task_target"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"肥料奖励数量",prop:"fertilizers"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"0"},model:{value:e.form.fertilizers,callback:function(t){e.$set(e.form,"fertilizers",t)},expression:"form.fertilizers"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否摇奖次数必须",prop:"fertilizers"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.form.is_draw,callback:function(t){e.$set(e.form,"is_draw",t)},expression:"form.is_draw"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务指引",prop:"task_guide"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.task_guide,callback:function(t){e.$set(e.form,"task_guide",t)},expression:"form.task_guide"}},e._l(e.optionguide,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"rainmaker_job_config_save",expression:"'rainmaker_job_config_save'"}],attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("form",e.title)}}},[e._v("确认")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.back()}}},[e._v("返 回")])],1)],1)],1)])},staticRenderFns:[]};var _=a("C7Lr")(b,v,!1,function(e){a("24gA")},"data-v-3cf2fd6a",null);t.default=_.exports}});
//# sourceMappingURL=71.40c2c88608644c739a20.js.map
webpackJsonp([64],{"2STE":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("MgeX"),i=a.n(r),l=a("4YfN"),s=a.n(l),n=a("lC5x"),o=a.n(n),c=a("3cXf"),u=a.n(c),f=a("ZLEe"),d=a.n(f),p=a("J0Oq"),m=a.n(p),v={name:"rainmaker_job_config",data:function(){return{tableData:[],title:"新增任务",visible:!1,form:{task_type:"",task_describe:"",task_target:"",fertilizers:"",is_draw:!1,task_guide:""},initform:{task_type:"",task_describe:"",task_target:"",fertilizers:"",is_draw:!1,task_guide:""},rules:{task_type:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],task_describe:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],task_target:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],fertilizers:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],task_guide:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},optiontype:[{value:1,label:"登录游戏大厅"},{value:2,label:"分享微信朋友"},{value:3,label:"分享微信朋友圈"},{value:4,label:"游戏流水达到特定值"},{value:5,label:"发展下级数量达到特定值"}],optionguide:[{value:1,label:"无指引"},{value:2,label:"跳转分享微信朋友圈"},{value:3,label:"跳转分享微信朋友"}],keys:"",id:"",allData:{},currentData:{},currentIndex:"",loading:!1,ResData:{}}},created:function(){this.initData()},methods:{add:function(){this.editForm(!0,"新增",this.initform)},send:function(){var e=this;return m()(o.a.mark(function t(){var a,r,i;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,a={},e.tableData.forEach(function(e,t){a[t+1]=e}),d()(e.ResData).forEach(function(t){"112"===t&&(e.ResData[t].ac_content.task=a)}),t.next=6,e.$http.HallFunConfig.PostActivityNew32({keys:e.keys,values:u()(e.ResData),id:e.id});case 6:r=t.sent,1===(i=r.data).code&&"ok"===i.msg?(e.loading=!1,e.$message({type:"success",message:"发送服务器配置成功!"})):(e.loading=!1,e.$message({type:"warning",message:"发送服务器配置失败!"}));case 9:case"end":return t.stop()}},t,e)}))()},handleEdit:function(e,t){this.currentIndex=e,this.editForm(!0,"编辑",s()({},t))},handleDelete:function(e,t){var a=this;this.$confirm("确认永久删除？").then(function(t){a.tableData=a.tableData.filter(function(t,a){return e!==a}),a.initBackData(a.tableData)}).catch(function(e){a.$message({type:"info",message:"取消删除!"})})},onSubmit:function(e,t){var a=this;this.$refs[e].validate(function(e){if(!e)return a.$message({type:"warning",message:"必填的项不可以为空!"}),!1;if("新增"===t)a.tableData.push(a.form);else if("编辑"===t){var r=[];a.tableData.forEach(function(e,t){r.push(e),a.currentIndex===t&&(r[t]=a.form)}),a.tableData=r}a.initBackData(a.tableData),a.editForm(!1,"新增",a.initform)})},back:function(){},initBackData:function(e){var t=this;return m()(o.a.mark(function a(){var r,i,l,s;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.forEach(function(e){e.fertilizers=+e.fertilizers,e.task_target=+e.task_target}),r=JSON.parse(u()(e)),i={},r.forEach(function(e,t){i[t+1]=e}),d()(t.ResData).forEach(function(e){"112"===e&&(t.ResData[e].ac_content.task=i)}),a.next=7,t.$http.HallFunConfig.PutActivityNew32({keys:t.keys,values:u()(t.ResData),id:t.id});case 7:l=a.sent,1===(s=l.data).code&&"ok"===s.msg?(t.initData(),t.$message({type:"success",message:"保存成功!"})):t.$message({type:"warning",message:"保存失败!"});case 10:case"end":return a.stop()}},a,t)}))()},editForm:function(e,t,a){this.visible=e,this.title=t,this.form=a},initData:function(){var e=this;return m()(o.a.mark(function t(){var a,r,l;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetActivityNew32({key:"activity_new.lua"});case 2:a=t.sent,r=a.data,e.keys=r.data[0].sys_key,e.id=r.data[0].id,l=r.data[0].sys_val,e.allData=JSON.parse(l),e.ResData=JSON.parse(u()(e.allData)),d()(e.allData).forEach(function(t){"112"===t&&(e.tableData=i()(e.allData[t].ac_content.task),e.total=e.tableData.length)});case 10:case"end":return t.stop()}},t,e)}))()}}},_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"MT_TaskConfig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("添加")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"rainmaker_job_config_send",expression:"'rainmaker_job_config_send'"}],attrs:{type:"primary"},on:{click:e.send}},[e._v("发送服务器配置")])],1),e._v(" "),a("div",{directives:[{name:"has",rawName:"v-has",value:"rainmaker_job_config_detail",expression:"'rainmaker_job_config_detail'"}],staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},[a("el-table-column",{attrs:{prop:"task_type",label:"任务类型",align:"center",width:"300px","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"task_describe",label:"任务描述",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"fertilizers",label:"任务奖励肥料数量",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"task_target",label:"任务目标数量",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"is_draw",label:"是否摇奖次数必须",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.row.is_draw,callback:function(a){e.$set(t.row,"is_draw",a)},expression:"scope.row.is_draw"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"task_guide",label:"任务指引",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"week_change",label:"操作",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"form"},[a("el-dialog",{attrs:{title:e.title,visible:e.visible,"destroy-on-close":!0,width:"60%"},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"form",staticStyle:{"margin-top":"20px"},attrs:{rules:e.rules,model:e.form,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"任务类型",prop:"task_type"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.task_type,callback:function(t){e.$set(e.form,"task_type",t)},expression:"form.task_type"}},e._l(e.optiontype,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"任务描述",prop:"task_describe"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"任务描述"},model:{value:e.form.task_describe,callback:function(t){e.$set(e.form,"task_describe",t)},expression:"form.task_describe"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务目标数量",prop:"task_target"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{type:"number",placeholder:"0"},model:{value:e.form.task_target,callback:function(t){e.$set(e.form,"task_target",t)},expression:"form.task_target"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"肥料奖励数量",prop:"fertilizers"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{type:"number",placeholder:"0"},model:{value:e.form.fertilizers,callback:function(t){e.$set(e.form,"fertilizers",t)},expression:"form.fertilizers"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否摇奖次数必须"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.form.is_draw,callback:function(t){e.$set(e.form,"is_draw",t)},expression:"form.is_draw"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务指引",prop:"task_guide"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.task_guide,callback:function(t){e.$set(e.form,"task_guide",t)},expression:"form.task_guide"}},e._l(e.optionguide,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"rainmaker_job_config_save",expression:"'rainmaker_job_config_save'"}],attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("form",e.title)}}},[e._v("确认")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.back()}}},[e._v("返 回")])],1)],1)],1)])},staticRenderFns:[]};var b=a("C7Lr")(v,_,!1,function(e){a("xlJD")},"data-v-3fbfc457",null);t.default=b.exports},xlJD:function(e,t){}});
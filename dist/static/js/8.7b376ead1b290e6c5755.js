webpackJsonp([8],{BRu6:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("3cXf"),l=a.n(r),i=a("lC5x"),n=a.n(i),o=a("MgeX"),s=a.n(o),m=a("ZLEe"),c=a.n(m),u=a("J0Oq"),d=a.n(u),p=a("EuRQ"),b={name:"qz_room_config",data:function(){var e=function(e,t,a){if(""===t)return a(new Error("必填项不可以为空!!"));a()};return{activeName:"",ruleForm:{dizhu:"",cost:"",max:"",min:"",grab_banker_times:"",type_id:"",name:"",ip_limit:"",open_game:"",open_robot:"",robot_type:"",is_hundred_game:""},rules:{dizhu:[{required:!0,validator:e,trigger:"blur"}],cost:[{required:!0,validator:e,trigger:"blur"}],max:[{required:!0,validator:e,trigger:"blur"}],min:[{required:!0,validator:e,trigger:"blur"}],grab_banker_times:[{required:!0,validator:function(e,t,a){if(""===t)return a(new Error("必填项不可以为空!!"));a()},trigger:"blur"}]},allData:{},currentlist:{},namelist:["200","201","202","203"],labellist:[],id:0,keys:"",loading:!1}},created:function(){this.getData()},methods:{handleClick:function(e){var t=this;this.namelist.forEach(function(a){a===e.name&&(t.ruleForm=t.currentlist[a])})},getData:function(){var e=this;return d()(n.a.mark(function t(){var a,r,l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.Getroomdata2({key:"roomdata.lua"});case 2:a=t.sent,r=a.data,e.id=r.data[0].id,e.keys=r.data[0].sys_key,l=JSON.parse(r.data[0].sys_val),console.log(l),e.allData=l,e.namelist.forEach(function(t,a){c()(l).forEach(function(r){t===r&&(e.currentlist[t]=l[t],e.currentlist[t].grab_banker_times=s()(l[t].grab_banker_times).join("|")),0===a&&(e.ruleForm=l[t],e.activeName=t)}),e.labellist.push(l[t].name)});case 10:case"end":return t.stop()}},t,e)}))()},submitForm:function(e,t){var a,r=this;this.$refs[e].validate((a=d()(n.a.mark(function e(a){var i,o,s,m,u;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=20;break}if(i=Object(p.a)(r.allData),r.namelist.forEach(function(e){c()(i).forEach(function(t,a){if(e===t){var r={};i[t].grab_banker_times.split("|").forEach(function(e,t){r[t+1]=e}),i[e].grab_banker_times=r,i[t].dizhu=+i[t].dizhu,i[t].cost=+i[t].cost,i[t].max=+i[t].max,i[t].min=+i[t].min}})}),1!==t){e.next=11;break}return e.next=6,r.$http.HallFunConfig.Putroomdata2({keys:r.keys,values:l()(i),id:r.id});case 6:o=e.sent,1===(s=o.data).code&&"ok"===s.msg?(r.getData(),r.$message({type:"success",message:"保存成功!"})):r.$message({type:"warning",message:"保存失败!"}),e.next=18;break;case 11:if(2!==t){e.next=18;break}return r.loading=!0,e.next=15,r.$http.HallFunConfig.Postroomdata2({keys:r.keys,values:l()(i),id:r.id});case 15:m=e.sent,1===(u=m.data).code&&"ok"===u.msg?(r.getData(),r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败!"}));case 18:e.next=22;break;case 20:return r.$message({type:"warning",message:"输入正确格式的数字,必填项不能为空!"}),e.abrupt("return",!1);case 22:case"end":return e.stop()}},e,r)})),function(e){return a.apply(this,arguments)}))}}},_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"RoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:e.labellist[0],name:e.namelist[0]}}),e._v(" "),a("el-tab-pane",{attrs:{label:e.labellist[1],name:e.namelist[1]}}),e._v(" "),a("el-tab-pane",{attrs:{label:e.labellist[2],name:e.namelist[2]}}),e._v(" "),a("el-tab-pane",{attrs:{label:e.labellist[3],name:e.namelist[3]}})],1)],1),e._v(" "),a("div",{staticClass:"form"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qz_room_config_send",expression:"'qz_room_config_send'"}],staticStyle:{"margin-bottom":"10px"},attrs:{type:"success"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"qz_room_config_save",expression:"'qz_room_config_save'"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("立即提交")]),e._v(" "),a("el-form",{directives:[{name:"has",rawName:"v-has",value:"qz_room_config_detail",expression:"'qz_room_config_detail'"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{disabled:"",placeholder:"房间名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v("房间ID:"+e._s(e.ruleForm.type_id)+"\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(t){e.$set(e.ruleForm,"open_game",t)},expression:"ruleForm.open_game"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否开放机器人",prop:"open_robot"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_robot,callback:function(t){e.$set(e.ruleForm,"open_robot",t)},expression:"ruleForm.open_robot"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"ip限制",prop:"ip_limit"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.ip_limit,callback:function(t){e.$set(e.ruleForm,"ip_limit",t)},expression:"ruleForm.ip_limit"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"底注",prop:"dizhu"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",placeholder:"0"},model:{value:e.ruleForm.dizhu,callback:function(t){e.$set(e.ruleForm,"dizhu",t)},expression:"ruleForm.dizhu"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"台费",prop:"cost"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",placeholder:"0"},model:{value:e.ruleForm.cost,callback:function(t){e.$set(e.ruleForm,"cost",t)},expression:"ruleForm.cost"}}),e._v("(百分比)\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",placeholder:"0"},model:{value:e.ruleForm.max,callback:function(t){e.$set(e.ruleForm,"max",t)},expression:"ruleForm.max"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",placeholder:"0"},model:{value:e.ruleForm.min,callback:function(t){e.$set(e.ruleForm,"min",t)},expression:"ruleForm.min"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"抢庄区间设置",prop:"grab_banker_times"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"1,2|2,3|3,4"},model:{value:e.ruleForm.grab_banker_times,callback:function(t){e.$set(e.ruleForm,"grab_banker_times",t)},expression:"ruleForm.grab_banker_times"}}),e._v(" 1,2|2,3|3,4 或者1,2;2,3;3;4 多个数字用逗号分隔,多个配置用;号或者|分隔\n      ")],1)],1)],1)])},staticRenderFns:[]};var f=a("C7Lr")(b,_,!1,function(e){a("L9sw")},"data-v-bed2cac6",null);t.default=f.exports},L9sw:function(e,t){}});
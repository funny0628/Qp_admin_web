webpackJsonp([24],{Fq1Q:function(e,t){},R6E6:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("3cXf"),l=a.n(r),o=a("lC5x"),i=a.n(o),n=a("ZLEe"),s=a.n(n),m=a("J0Oq"),c=a.n(m),u=a("EuRQ"),d={name:"ddz_room_config",data:function(){var e=function(e,t,a){if(""===t)return a(new Error("必填项不可以为空!!"));a()};return{activeName:"",ruleForm:{dizhu:"",cost:"",max:"",min:"",rate:"",type_id:"",name:"",open_game:"",open_robot:"",ip_limit:"",robot_type:"",is_hundred_game:""},rules:{dizhu:[{required:!0,validator:e,trigger:"blur"}],cost:[{required:!0,validator:e,trigger:"blur"}],max:[{required:!0,validator:e,trigger:"blur"}],min:[{required:!0,validator:e,trigger:"blur"}],rate:[{required:!0,validator:e,trigger:"blur"}]},allData:{},currentlist:{},namelist:["300","301","302"],labellist:[],id:0,keys:"",loading:!1}},created:function(){var e=this;return c()(i.a.mark(function t(){var a,r,l;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.Getroomdata3({key:"roomdata.lua"});case 2:a=t.sent,r=a.data,e.id=r.data[0].id,e.keys=r.data[0].sys_key,l=JSON.parse(r.data[0].sys_val),e.allData=l,e.namelist.forEach(function(t,a){s()(l).forEach(function(r){t===r&&(e.currentlist[t]=l[r],e.labellist.push(l[r].name)),0===a&&(e.activeName=t,e.ruleForm=l[t])})});case 9:case"end":return t.stop()}},t,e)}))()},methods:{handleClick:function(e){var t=this;this.namelist.forEach(function(a){a===e.name&&(t.ruleForm=t.currentlist[a])})},submitForm:function(e,t){var a,r=this;this.$refs[e].validate((a=c()(i.a.mark(function e(a){var o,n,m,c,d;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=20;break}if(o=Object(u.a)(r.allData),r.namelist.forEach(function(e){s()(r.allData).forEach(function(t){e===t&&(o[t].dizhu=+o[t].dizhu,o[t].cost=+o[t].cost,o[t].max=+o[t].max,o[t].min=+o[t].min,o[t].rate=+o[t].rate)})}),1!==t){e.next=11;break}return e.next=6,r.$http.HallFunConfig.Putroomdata3({keys:r.keys,values:l()(o),id:r.id});case 6:n=e.sent,1===(m=n.data).code&&"ok"===m.msg?r.$message({type:"success",message:"保存成功!"}):r.$message({type:"warning",message:"保存失败!"}),e.next=18;break;case 11:if(2!==t){e.next=18;break}return r.loading=!0,e.next=15,r.$http.HallFunConfig.Postroomdata3({keys:r.keys,values:l()(o),id:r.id});case 15:c=e.sent,1===(d=c.data).code&&"ok"===d.msg?(r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败!"}));case 18:e.next=22;break;case 20:return r.$message({type:"warning",message:"输入正确格式的数字,必填项不能为空!"}),e.abrupt("return",!1);case 22:case"end":return e.stop()}},e,r)})),function(e){return a.apply(this,arguments)}))}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"L_RoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:e.labellist[0],name:e.namelist[0]}}),e._v(" "),a("el-tab-pane",{attrs:{label:e.labellist[1],name:e.namelist[1]}}),e._v(" "),a("el-tab-pane",{attrs:{label:e.labellist[2],name:e.namelist[2]}})],1)],1),e._v(" "),a("div",{directives:[{name:"has",rawName:"v-has",value:"ddz_room_config_detail",expression:"'ddz_room_config_detail'"}],staticClass:"form"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"ddz_room_config_send",expression:"'ddz_room_config_send'"}],staticStyle:{"margin-bottom":"10px"},attrs:{type:"success"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{disabled:"",placeholder:"房间名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v("房间ID:"+e._s(e.ruleForm.type_id)+"\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(t){e.$set(e.ruleForm,"open_game",t)},expression:"ruleForm.open_game"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否开放机器人",prop:"open_robot"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_robot,callback:function(t){e.$set(e.ruleForm,"open_robot",t)},expression:"ruleForm.open_robot"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"ip限制",prop:"ip_limit"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.ip_limit,callback:function(t){e.$set(e.ruleForm,"ip_limit",t)},expression:"ruleForm.ip_limit"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"底注",prop:"dizhu"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",placeholder:"0"},model:{value:e.ruleForm.dizhu,callback:function(t){e.$set(e.ruleForm,"dizhu",t)},expression:"ruleForm.dizhu"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"台费",prop:"cost"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",placeholder:"0"},model:{value:e.ruleForm.cost,callback:function(t){e.$set(e.ruleForm,"cost",t)},expression:"ruleForm.cost"}}),e._v("(百分比)\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",placeholder:"0"},model:{value:e.ruleForm.max,callback:function(t){e.$set(e.ruleForm,"max",t)},expression:"ruleForm.max"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",placeholder:"0"},model:{value:e.ruleForm.min,callback:function(t){e.$set(e.ruleForm,"min",t)},expression:"ruleForm.min"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"初始倍率",prop:"rate"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{type:"number",placeholder:"0"},model:{value:e.ruleForm.rate,callback:function(t){e.$set(e.ruleForm,"rate",t)},expression:"ruleForm.rate"}})],1),e._v(" "),a("el-form-item",[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"ddz_room_config_save",expression:"'ddz_room_config_save'"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("立即提交")])],1)],1)],1)])},staticRenderFns:[]};var f=a("C7Lr")(d,p,!1,function(e){a("Fq1Q")},"data-v-753b2da4",null);t.default=f.exports}});
webpackJsonp([52],{"k9k/":function(e,t){},sAZr:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("3cXf"),l=r.n(a),s=r("lC5x"),n=r.n(s),o=r("ZLEe"),i=r.n(o),m=r("J0Oq"),u=r.n(m),_={name:"bjl_robot_config",data:function(){return{activeName:"first",ruleForm:{count_range:"",coins_range:"",leave_rate:"",system_bet_min:"",system_last_bet_rate:"",system_bet_area:"",bet_area_float:"",vip_seat_rate:""},rules:{count_range:[{required:!0,message:"不可以为空",trigger:"blur"}],coins_range:[{required:!0,message:"不可以为空",trigger:"blur"}],leave_rate:[{required:!0,message:"不可以为空",trigger:"blur"}],system_bet_min:[{required:!0,message:"不可以为空",trigger:"blur"}],system_last_bet_rate:[{required:!0,message:"不可以为空",trigger:"blur"}],system_bet_area:[{required:!0,message:"不可以为空",trigger:"blur"}],bet_area_float:[{required:!0,message:"不可以为空",trigger:"blur"}],vip_seat_rate:[{required:!0,message:"不可以为空",trigger:"blur"}]},currentlist:{},namelist:[],id:0,keys:"",loading:!1}},created:function(){var e=this;return u()(n.a.mark(function t(){var r,a,l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.Getbjl_robot_control({key:"bjl_robot_control.lua"});case 2:r=t.sent,a=r.data,e.id=a.data[0].id,e.keys=a.data[0].sys_key,l=JSON.parse(a.data[0].sys_val),e.currentlist=l.bjl_normal.robot_type_list,e.namelist=i()(e.currentlist),e.activeName=e.namelist[0],e.ruleForm=e.currentlist[e.namelist[0]],console.log(e.ruleForm,e.currentlist,e.namelist);case 12:case"end":return t.stop()}},t,e)}))()},methods:{handleClick:function(e){var t=this;this.namelist.forEach(function(r){r===e.name&&(t.ruleForm=t.currentlist[r])})},submitForm:function(e,t){var r,a=this;this.$refs[e].validate((r=u()(n.a.mark(function e(r){var s,o,i,m;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=19;break}if(console.log(a.ruleForm,a.currentlist),1!==t){e.next=10;break}return e.next=5,a.$http.HallFunConfig.Putbjl_robot_control({keys:a.keys,values:l()({bjl_normal:{robot_type_list:a.currentlist}}),id:a.id});case 5:s=e.sent,1===(o=s.data).code&&"ok"===o.msg?a.$message({type:"success",message:"保存成功!"}):a.$message({type:"warning",message:"保存失败!"}),e.next=17;break;case 10:if(2!==t){e.next=17;break}return a.loading=!0,e.next=14,a.$http.HallFunConfig.Postbjl_robot_control({keys:a.keys,values:l()({bjl_normal:{robot_type_list:a.currentlist}}),id:a.id});case 14:i=e.sent,1===(m=i.data).code&&"ok"===m.msg?(a.loading=!1,a.$message({type:"success",message:"发送服务器配置成功!"})):(a.loading=!1,a.$message({type:"warning",message:"发送服务器配置失败!"}));case 17:e.next=21;break;case 19:return console.log("error submit!!"),e.abrupt("return",!1);case 21:case"end":return e.stop()}},e,a)})),function(e){return r.apply(this,arguments)}))}}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"H_RobotControl","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[r("div",{directives:[{name:"has",rawName:"v-has",value:"bjl_robot_config_detail",expression:"'bjl_robot_config_detail'"}]},[r("el-button",{directives:[{name:"has",rawName:"v-has",value:"bjl_robot_config_save",expression:"'bjl_robot_config_save'"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("保存")]),r("el-button",{directives:[{name:"has",rawName:"v-has",value:"bjl_robot_config_send",expression:"'bjl_robot_config_send'"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),r("div",{staticClass:"title"},[r("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"非R",name:e.namelist[0]}}),e._v(" "),r("el-tab-pane",{attrs:{label:"小R",name:e.namelist[1]}}),e._v(" "),r("el-tab-pane",{attrs:{label:"中R",name:e.namelist[2]}}),e._v(" "),r("el-tab-pane",{attrs:{label:"大R",name:e.namelist[3]}}),e._v(" "),r("el-tab-pane",{attrs:{label:"土豪",name:e.namelist[4]}})],1)],1),e._v(" "),r("div",{staticClass:"form"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[r("el-form-item",{attrs:{label:"人数范围",prop:"count_range"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.count_range,callback:function(t){e.$set(e.ruleForm,"count_range",t)},expression:"ruleForm.count_range"}}),e._v("（格式如：1,2）\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"携带金币范围(元)",prop:"coins_range"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.coins_range,callback:function(t){e.$set(e.ruleForm,"coins_range",t)},expression:"ruleForm.coins_range"}}),e._v("\n        (格式如：1,2）\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"机器人离桌率(百分比)",prop:"leave_rate"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.leave_rate,callback:function(t){e.$set(e.ruleForm,"leave_rate",t)},expression:"ruleForm.leave_rate"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"机器人下注下限(元)",prop:"system_bet_min"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.system_bet_min,callback:function(t){e.$set(e.ruleForm,"system_bet_min",t)},expression:"ruleForm.system_bet_min"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"上局下注选用比例",prop:"system_last_bet_rate"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.system_last_bet_rate,callback:function(t){e.$set(e.ruleForm,"system_last_bet_rate",t)},expression:"ruleForm.system_last_bet_rate"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"庄对、闲对、和下注区域浮动值",prop:"system_bet_area"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.system_bet_area,callback:function(t){e.$set(e.ruleForm,"system_bet_area",t)},expression:"ruleForm.system_bet_area"}}),e._v("\n        (1,5) 表示机器人有百分之1到百分之5的概率会下注特殊牌型区域)\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"区域下注浮动值(百分比)",prop:"bet_area_float"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bet_area_float,callback:function(t){e.$set(e.ruleForm,"bet_area_float",t)},expression:"ruleForm.bet_area_float"}}),e._v("（格式如：80-20）\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"Vip座位上座率(百分比)",prop:"vip_seat_rate"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.vip_seat_rate,callback:function(t){e.$set(e.ruleForm,"vip_seat_rate",t)},expression:"ruleForm.vip_seat_rate"}})],1)],1)],1)],1)])},staticRenderFns:[]};var b=r("C7Lr")(_,c,!1,function(e){r("k9k/")},"data-v-62b83c47",null);t.default=b.exports}});
//# sourceMappingURL=52.61af0b52aad4cd67f9b7.js.map
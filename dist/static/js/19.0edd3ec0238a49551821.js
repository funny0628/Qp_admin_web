webpackJsonp([19],{EtYc:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("3cXf"),l=a.n(r),s=a("lC5x"),n=a.n(s),o=a("ZLEe"),i=a.n(o),_=a("J0Oq"),m=a.n(_),c={name:"ten_robot_config",data:function(){return{activeName:"1",ruleForm:{count_range:"",coins_range:"",leave_rate:"",system_bet_min:"",system_last_bet_rate:"",system_bet_area:"",player_bet_min:"",player_last_bet_rate:"",player_bet_area:"",bet_area_float:"",vip_seat_rate:""},rules:{count_range:[{required:!0,message:"不可以为空",trigger:"blur"}],coins_range:[{required:!0,message:"不可以为空",trigger:"blur"}],leave_rate:[{required:!0,message:"不可以为空",trigger:"blur"}],system_bet_min:[{required:!0,message:"不可以为空",trigger:"blur"}],system_last_bet_rate:[{required:!0,message:"不可以为空",trigger:"blur"}],system_bet_area:[{required:!0,message:"不可以为空",trigger:"blur"}],player_bet_min:[{required:!0,message:"不可以为空",trigger:"blur"}],player_last_bet_rate:[{required:!0,message:"不可以为空",trigger:"blur"}],player_bet_area:[{required:!0,message:"不可以为空",trigger:"blur"}],bet_area_float:[{required:!0,message:"不可以为空",trigger:"blur"}],vip_seat_rate:[{required:!0,message:"不可以为空",trigger:"blur"}]},resData:{},id:0,keys:"",loading:!1,card_compare_value:"",namelist:[]}},created:function(){var e=this;return m()(n.a.mark(function t(){var a,r,l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.Getbrnn_ten_robot_control({key:"brnn_ten_robot_control.lua"});case 2:a=t.sent,r=a.data,console.log(r),e.id=r.data[0].id,e.keys=r.data[0].sys_key,l=JSON.parse(r.data[0].sys_val),console.log(l),e.resData=l.brnn_ten_normal.robot_type_list,e.card_compare_value=l.brnn_ten_normal.card_compare_value,i()(e.resData).forEach(function(t,a){e.namelist.push(t),0===a&&(e.ruleForm=e.resData[t])}),console.log(e.resData,e.ruleForm);case 13:case"end":return t.stop()}},t,e)}))()},methods:{handleClick:function(e){var t=this;i()(this.resData).forEach(function(a){a===e.name&&(t.ruleForm=t.resData[a])})},submitForm:function(e,t){var a,r=this;this.$refs[e].validate((a=m()(n.a.mark(function e(a){var s,o,i,_,m;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a||""===r.card_compare_value){e.next=18;break}if(console.log(r.ruleForm,t),s={brnn_ten_normal:{card_compare_value:r.card_compare_value,robot_type_list:r.resData}},1!==t){e.next=11;break}return e.next=6,r.$http.HallFunConfig.Putbrnn_ten_robot_control({keys:r.keys,values:l()(s),id:r.id});case 6:o=e.sent,1===(i=o.data).code&&"ok"===i.msg?r.$message({type:"success",message:"保存成功!"}):r.$message({type:"warning",message:"保存失败!"}),e.next=18;break;case 11:if(2!==t){e.next=18;break}return r.loading=!0,e.next=15,r.$http.HallFunConfig.Postbrnn_ten_robot_control({keys:r.keys,values:l()(s),id:r.id});case 15:_=e.sent,1===(m=_.data).code&&"ok"===m.msg?(r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败!"}));case 18:case"end":return e.stop()}},e,r)})),function(e){return a.apply(this,arguments)}))}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"decupleRobotControl","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"ten_robot_config_save",expression:"'ten_robot_config_save'"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("保存")]),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"ten_robot_config_send",expression:"'ten_robot_config_send'"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),a("div",{directives:[{name:"has",rawName:"v-has",value:"ten_robot_config_detail",expression:"'ten_robot_config_detail'"}]},[a("div",{staticClass:"title"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"非R",name:e.namelist[0]}}),e._v(" "),a("el-tab-pane",{attrs:{label:"小R",name:e.namelist[1]}}),e._v(" "),a("el-tab-pane",{attrs:{label:"中R",name:e.namelist[2]}}),e._v(" "),a("el-tab-pane",{attrs:{label:"大R",name:e.namelist[3]}}),e._v(" "),a("el-tab-pane",{attrs:{label:"土豪",name:e.namelist[4]}}),e._v(" "),a("el-tab-pane",{attrs:{label:"上庄",name:e.namelist[5]}})],1)],1),e._v(" "),a("div",{staticClass:"form"},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"牌型大小界定值"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.card_compare_value,callback:function(t){e.card_compare_value=t},expression:"card_compare_value"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"人数范围",prop:"count_range"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.count_range,callback:function(t){e.$set(e.ruleForm,"count_range",t)},expression:"ruleForm.count_range"}}),e._v("（格式如：1,2）\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"携带金币范围(元)",prop:"coins_range"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.coins_range,callback:function(t){e.$set(e.ruleForm,"coins_range",t)},expression:"ruleForm.coins_range"}}),e._v("\n        (格式如：1,2）\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"机器人离桌率(百分比)",prop:"leave_rate"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.leave_rate,callback:function(t){e.$set(e.ruleForm,"leave_rate",t)},expression:"ruleForm.leave_rate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"系统坐庄机器人下注下限(元)",prop:"system_bet_min"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.system_bet_min,callback:function(t){e.$set(e.ruleForm,"system_bet_min",t)},expression:"ruleForm.system_bet_min"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"系统坐庄上局下注选用比例",prop:"system_last_bet_rate"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.system_last_bet_rate,callback:function(t){e.$set(e.ruleForm,"system_last_bet_rate",t)},expression:"ruleForm.system_last_bet_rate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机器人坐庄各下注区域比例",prop:"system_bet_area"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.system_bet_area,callback:function(t){e.$set(e.ruleForm,"system_bet_area",t)},expression:"ruleForm.system_bet_area"}}),e._v("\n        （格式如：1，2，2，1 按顺序代表 黑桃,红桃,梅花,方块）\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"玩家坐庄机器人下注下限(元)",prop:"player_bet_min"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.player_bet_min,callback:function(t){e.$set(e.ruleForm,"player_bet_min",t)},expression:"ruleForm.player_bet_min"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"玩家坐庄上局下注选用比例",prop:"player_last_bet_rate"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.player_last_bet_rate,callback:function(t){e.$set(e.ruleForm,"player_last_bet_rate",t)},expression:"ruleForm.player_last_bet_rate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"玩家坐庄各下注区域比例",prop:"player_bet_area"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.player_bet_area,callback:function(t){e.$set(e.ruleForm,"player_bet_area",t)},expression:"ruleForm.player_bet_area"}}),e._v("\n        （（格式如：1，2，2，1 按顺序代表 黑桃,红桃,梅花,方块）\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"区域下注浮动值(百分比)",prop:"bet_area_float"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bet_area_float,callback:function(t){e.$set(e.ruleForm,"bet_area_float",t)},expression:"ruleForm.bet_area_float"}}),e._v("（格式如：80-20）\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"Vip座位上座率(百分比)",prop:"vip_seat_rate"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.vip_seat_rate,callback:function(t){e.$set(e.ruleForm,"vip_seat_rate",t)},expression:"ruleForm.vip_seat_rate"}})],1)],1)],1)])],1)},staticRenderFns:[]};var p=a("C7Lr")(c,u,!1,function(e){a("WlG0")},"data-v-9c12733e",null);t.default=p.exports},WlG0:function(e,t){}});
//# sourceMappingURL=19.0edd3ec0238a49551821.js.map
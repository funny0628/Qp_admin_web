webpackJsonp([42],{Y0aU:function(e,t){},iUlP:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l("3cXf"),a=l.n(r),i=l("lC5x"),o=l.n(i),s=l("ZLEe"),n=l.n(s),m=l("J0Oq"),c=l.n(m),u=l("EuRQ"),p={name:"hhdz_room_config",data:function(){var e=this,t=function(t,l,r){Object(u.a)(e.ruleForm,t,l,r)};return{activeName:"first",ruleForm:{cost:"",max:"",min:"",sit_coins_limit:"",min_bet:"",person_limit:"",red_limit:"",black_limit:"",special_limit:"",difference_limit:"",all_special_limit:"",type_id:"",name:"",open_game:"",open_robot:"",robot_type:"",is_hundred_game:""},rules:{cost:[{required:!0,validator:t,trigger:"blur"}],max:[{required:!0,validator:t,trigger:"blur"}],min:[{required:!0,validator:t,trigger:"blur"}],sit_coins_limit:[{required:!0,validator:t,trigger:"blur"}],min_bet:[{required:!0,validator:t,trigger:"blur"}],person_limit:[{required:!0,validator:t,trigger:"blur"}],red_limit:[{required:!0,validator:t,trigger:"blur"}],black_limit:[{required:!0,validator:t,trigger:"blur"}],special_limit:[{required:!0,validator:t,trigger:"blur"}],difference_limit:[{required:!0,validator:t,trigger:"blur"}],all_special_limit:[{required:!0,validator:t,trigger:"blur"}]},allData:{},currentlist:{},namelist:["200000","200001","200002","200003","200004","200005"],labellist:[],id:0,keys:"",loading:!1}},created:function(){var e=this;return c()(o.a.mark(function t(){var l,r,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.Getroomdata2000({key:"roomdata.lua"});case 2:l=t.sent,r=l.data,e.id=r.data[0].id,e.keys=r.data[0].sys_key,a=JSON.parse(r.data[0].sys_val),e.allData=a,e.namelist.forEach(function(t,l){n()(a).forEach(function(r){t===r&&(e.currentlist[t]=a[r],e.currentlist[t].person_limit=a[r].person_limit[1]+","+a[r].person_limit[2],e.labellist.push(a[r].name)),0===l&&(e.activeName=t,e.ruleForm=a[t])})});case 9:case"end":return t.stop()}},t,e)}))()},methods:{handleClick:function(e){var t=this;this.namelist.forEach(function(l){l===e.name&&(t.ruleForm=t.currentlist[l])})},submitForm:function(e,t){var l,r=this;this.$refs[e].validate((l=c()(o.a.mark(function e(l){var i,s,m,c,p;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!l){e.next=20;break}if(i=Object(u.b)(r.allData),r.namelist.forEach(function(e){n()(r.allData).forEach(function(t){if(e===t){var l={};r.allData[t].person_limit.split(",").forEach(function(e,t){l[t+1]=+e}),i[t].person_limit=l}})}),1!==t){e.next=11;break}return e.next=6,r.$http.HallFunConfig.Putroomdata2000({keys:r.keys,values:a()(i),id:r.id});case 6:s=e.sent,1===(m=s.data).code&&"ok"===m.msg?r.$message({type:"success",message:"保存成功!"}):r.$message({type:"warning",message:"保存失败!"}),e.next=18;break;case 11:if(2!==t){e.next=18;break}return r.loading=!0,e.next=15,r.$http.HallFunConfig.Postroomdata2000({keys:r.keys,values:a()(i),id:r.id});case 15:c=e.sent,1===(p=c.data).code&&"ok"===p.msg?(r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败!"}));case 18:e.next=22;break;case 20:return r.$message({type:"warning",message:"输入正确格式的数字,必填项不能为空!"}),e.abrupt("return",!1);case 22:case"end":return e.stop()}},e,r)})),function(e){return l.apply(this,arguments)}))}}},d={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"W_RoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[l("div",{directives:[{name:"has",rawName:"v-has",value:"hhdz_room_config_detail",expression:"'hhdz_room_config_detail'"}]},[l("div",{staticClass:"title"},[l("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[l("el-tab-pane",{attrs:{label:e.labellist[0],name:e.namelist[0]}}),e._v(" "),l("el-tab-pane",{attrs:{label:e.labellist[1],name:e.namelist[1]}}),e._v(" "),l("el-tab-pane",{attrs:{label:e.labellist[2],name:e.namelist[2]}}),e._v(" "),l("el-tab-pane",{attrs:{label:e.labellist[3],name:e.namelist[3]}}),e._v(" "),l("el-tab-pane",{attrs:{label:e.labellist[4],name:e.namelist[4]}}),e._v(" "),l("el-tab-pane",{attrs:{label:e.labellist[5],name:e.namelist[5]}})],1)],1),e._v(" "),l("div",{staticClass:"form"},[l("el-button",{directives:[{name:"has",rawName:"v-has",value:"hhdz_room_config_send",expression:"'hhdz_room_config_send'"}],staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[l("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{disabled:"",placeholder:"房间名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v("房间ID:"+e._s(e.ruleForm.type_id)+"\n      ")],1),e._v(" "),l("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[l("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(t){e.$set(e.ruleForm,"open_game",t)},expression:"ruleForm.open_game"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"是否开放机器人",prop:"open_robot"}},[l("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_robot,callback:function(t){e.$set(e.ruleForm,"open_robot",t)},expression:"ruleForm.open_robot"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"台费",prop:"cost"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.cost,callback:function(t){e.$set(e.ruleForm,"cost",t)},expression:"ruleForm.cost"}}),e._v("(百分比)\n      ")],1),e._v(" "),l("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.max,callback:function(t){e.$set(e.ruleForm,"max",t)},expression:"ruleForm.max"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min,callback:function(t){e.$set(e.ruleForm,"min",t)},expression:"ruleForm.min"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"上座金额",prop:"sit_coins_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.sit_coins_limit,callback:function(t){e.$set(e.ruleForm,"sit_coins_limit",t)},expression:"ruleForm.sit_coins_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"下注最低携带",prop:"min_bet"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min_bet,callback:function(t){e.$set(e.ruleForm,"min_bet",t)},expression:"ruleForm.min_bet"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人限红",prop:"person_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.person_limit,callback:function(t){e.$set(e.ruleForm,"person_limit",t)},expression:"ruleForm.person_limit"}}),e._v("格式如1,10000\n   ")],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红（红）",prop:"red_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.red_limit,callback:function(t){e.$set(e.ruleForm,"red_limit",t)},expression:"ruleForm.red_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红（黑）",prop:"black_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.black_limit,callback:function(t){e.$set(e.ruleForm,"black_limit",t)},expression:"ruleForm.black_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红（幸运）",prop:"special_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.special_limit,callback:function(t){e.$set(e.ruleForm,"special_limit",t)},expression:"ruleForm.special_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"红黑区域差额限制",prop:"difference_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.difference_limit,callback:function(t){e.$set(e.ruleForm,"difference_limit",t)},expression:"ruleForm.difference_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"幸运区域总值限制",prop:"all_special_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.all_special_limit,callback:function(t){e.$set(e.ruleForm,"all_special_limit",t)},expression:"ruleForm.all_special_limit"}})],1),e._v(" "),l("el-form-item",[l("el-button",{directives:[{name:"has",rawName:"v-has",value:"hhdz_room_config_save",expression:"'hhdz_room_config_save'"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("立即提交")])],1)],1)],1)])])},staticRenderFns:[]};var _=l("C7Lr")(p,d,!1,function(e){l("Y0aU")},"data-v-5821fe27",null);t.default=_.exports}});
webpackJsonp([11],{XgMV:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=l("3cXf"),r=l.n(i),a=l("lC5x"),o=l.n(a),s=l("ZLEe"),m=l.n(s),n=l("J0Oq"),u=l.n(n),_=l("EuRQ"),p={name:"bjl_room_config",data:function(){return{id:0,keys:"",activeName:"",ruleForm:{cost:"",max:"",min:"",sit_coins_limit:"",min_bet:"",person_limit:"",times_5_limit:"",times_10_limit:"",times_20_limit:"",times_30_limit:"",times_40_limit:"",all_times_5_limit:"",all_times_10_limit:"",all_times_20_limit:"",all_times_30_limit:"",all_times_40_limit:"",type_id:"",name:"",open_game:"",open_robot:"",robot_type:"",is_hundred_game:""},rules:{name:[{required:!0,message:"不可以为空",trigger:"blur"}],open_game:[{required:!0,message:"不可以为空",trigger:"blur"}],open_robot:[{required:!0,message:"不可以为空",trigger:"blur"}],cost:[{required:!0,message:"不可以为空",trigger:"blur"}],max:[{required:!0,message:"不可以为空",trigger:"blur"}],min:[{required:!0,message:"不可以为空",trigger:"blur"}],sit_coins_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],min_bet:[{required:!0,message:"不可以为空",trigger:"blur"}],person_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],times_5_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],times_10_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],times_20_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],times_30_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],times_40_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],all_times_5_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],all_times_10_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],all_times_20_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],all_times_30_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],all_times_40_limit:[{required:!0,message:"不可以为空",trigger:"blur"}]},allData:{},currentlist:{},namelist:["200600","200601","200602","200603","200604","200605"],labellist:[],loading:!1}},created:function(){var e=this;return u()(o.a.mark(function t(){var l,i,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.Getroomdata2006({key:"roomdata.lua"});case 2:l=t.sent,i=l.data,e.id=i.data[0].id,e.keys=i.data[0].sys_key,r=JSON.parse(i.data[0].sys_val),e.allData=r,e.namelist.forEach(function(t,l){m()(r).forEach(function(i){t===i&&(e.currentlist[t]=r[i],e.currentlist[t].person_limit=r[i].person_limit.replace(/\{|}/g,""),e.labellist.push(r[i].name)),0===l&&(e.activeName=t,e.ruleForm=r[t])})});case 9:case"end":return t.stop()}},t,e)}))()},methods:{handleClick:function(e){var t=this;this.namelist.forEach(function(l){l===e.name&&(t.ruleForm=t.currentlist[l])})},submitForm:function(e,t){var l,i=this;this.$refs[e].validate((l=u()(o.a.mark(function e(l){var a,s,n,u,p;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!l){e.next=20;break}if(a=Object(_.a)(i.allData),i.namelist.forEach(function(e){m()(a).forEach(function(t){e===t&&(a[t].person_limit="{"+a[e].person_limit+"}")})}),1!==t){e.next=11;break}return e.next=6,i.$http.HallFunConfig.Putroomdata2006({keys:i.keys,values:r()(a),id:i.id});case 6:s=e.sent,1===(n=s.data).code&&"ok"===n.msg?i.$message({type:"success",message:"保存成功!"}):i.$message({type:"warning",message:"保存失败!"}),e.next=18;break;case 11:if(2!==t){e.next=18;break}return i.loading=!0,e.next=15,i.$http.HallFunConfig.Postroomdata2006({keys:i.keys,values:r()(a),id:i.id});case 15:u=e.sent,1===(p=u.data).code&&"ok"===p.msg?(i.loading=!1,i.$message({type:"success",message:"发送服务器配置成功!"})):(i.loading=!1,i.$message({type:"warning",message:"发送服务器配置失败!"}));case 18:e.next=22;break;case 20:return console.log("error submit!!"),e.abrupt("return",!1);case 22:case"end":return e.stop()}},e,i)})),function(e){return l.apply(this,arguments)}))}}},c={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"H_RoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[l("div",{directives:[{name:"has",rawName:"v-has",value:"bjl_room_config_detail",expression:"'bjl_room_config_detail'"}]},[l("div",{staticClass:"title"},[l("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[l("el-tab-pane",{attrs:{label:e.labellist[0],name:e.namelist[0]}}),e._v(" "),l("el-tab-pane",{attrs:{label:e.labellist[1],name:e.namelist[1]}}),e._v(" "),l("el-tab-pane",{attrs:{label:e.labellist[2],name:e.namelist[2]}}),e._v(" "),l("el-tab-pane",{attrs:{label:e.labellist[3],name:e.namelist[3]}}),e._v(" "),l("el-tab-pane",{attrs:{label:e.labellist[4],name:e.namelist[4]}}),e._v(" "),l("el-tab-pane",{attrs:{label:e.labellist[5],name:e.namelist[5]}})],1)],1),e._v(" "),l("div",{staticClass:"form"},[l("el-button",{directives:[{name:"has",rawName:"v-has",value:"bjl_room_config_send",expression:"'bjl_room_config_send'"}],staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[l("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"房间名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v("房间ID:"+e._s(e.ruleForm.type_id)+"\n      ")],1),e._v(" "),l("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[l("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(t){e.$set(e.ruleForm,"open_game",t)},expression:"ruleForm.open_game"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"是否开放机器人",prop:"open_robot"}},[l("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_robot,callback:function(t){e.$set(e.ruleForm,"open_robot",t)},expression:"ruleForm.open_robot"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.max,callback:function(t){e.$set(e.ruleForm,"max",t)},expression:"ruleForm.max"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min,callback:function(t){e.$set(e.ruleForm,"min",t)},expression:"ruleForm.min"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"上座金额",prop:"sit_coins_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.sit_coins_limit,callback:function(t){e.$set(e.ruleForm,"sit_coins_limit",t)},expression:"ruleForm.sit_coins_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"下注最低携带",prop:"min_bet"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min_bet,callback:function(t){e.$set(e.ruleForm,"min_bet",t)},expression:"ruleForm.min_bet"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人限红",prop:"person_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.person_limit,callback:function(t){e.$set(e.ruleForm,"person_limit",t)},expression:"ruleForm.person_limit"}}),e._v("格式如1,10000\n   ")],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红（闲)",prop:"play_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.play_limit,callback:function(t){e.$set(e.ruleForm,"play_limit",t)},expression:"ruleForm.play_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红 (庄)",prop:"bank_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bank_limit,callback:function(t){e.$set(e.ruleForm,"bank_limit",t)},expression:"ruleForm.bank_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红 (和)",prop:"tie_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.tie_limit,callback:function(t){e.$set(e.ruleForm,"tie_limit",t)},expression:"ruleForm.tie_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红 (闲对)",prop:"play_pair_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.play_pair_limit,callback:function(t){e.$set(e.ruleForm,"play_pair_limit",t)},expression:"ruleForm.play_pair_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红 (庄对)",prop:"bank_pair_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bank_pair_limit,callback:function(t){e.$set(e.ruleForm,"bank_pair_limit",t)},expression:"ruleForm.bank_pair_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"区域限红 (庄、闲差)",prop:"bank_play_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bank_play_limit,callback:function(t){e.$set(e.ruleForm,"bank_play_limit",t)},expression:"ruleForm.bank_play_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"和总值",prop:"tie_total_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.tie_total_limit,callback:function(t){e.$set(e.ruleForm,"tie_total_limit",t)},expression:"ruleForm.tie_total_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"庄对总值",prop:"bank_pair_total_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bank_pair_total_limit,callback:function(t){e.$set(e.ruleForm,"bank_pair_total_limit",t)},expression:"ruleForm.bank_pair_total_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"闲对总值",prop:"play_pair_total_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.play_pair_total_limit,callback:function(t){e.$set(e.ruleForm,"play_pair_total_limit",t)},expression:"ruleForm.play_pair_total_limit"}})],1),e._v(" "),l("el-form-item",[l("el-button",{directives:[{name:"has",rawName:"v-has",value:"bjl_room_config_save",expression:"'bjl_room_config_save'"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("立即提交")])],1)],1)],1)])])},staticRenderFns:[]};var d=l("C7Lr")(p,c,!1,function(e){l("aOpp")},"data-v-bc47a59c",null);t.default=d.exports},aOpp:function(e,t){}});
//# sourceMappingURL=11.bc27bdadbf7cf15c5255.js.map
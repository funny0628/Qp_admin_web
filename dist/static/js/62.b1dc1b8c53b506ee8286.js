webpackJsonp([62],{FTwz:function(e,t){},xFes:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l("3cXf"),a=l.n(r),i=l("lC5x"),o=l.n(i),s=l("ZLEe"),n=l.n(s),m=l("J0Oq"),u=l.n(m),c={data:function(){return{ruleForm:{cost:"",max:"",min:"",sit_coins_limit:"",min_banker_coins:"",min_bet:"",person_limit:"",spade_limit:"",heart_limit:"",club_limit:"",diamond_limit:"",all_spade_limit:"",all_heart_limit:"",all_club_limit:"",all_diamond_limit:"",type_id:"",name:"",open_game:"",open_robot:"",robot_type:"",is_hundred_game:""},rules:{cost:[{required:!0,message:"不可以为空",trigger:"blur"}],max:[{required:!0,message:"不可以为空",trigger:"blur"}],min:[{required:!0,message:"不可以为空",trigger:"blur"}],sit_coins_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],min_banker_coins:[{required:!0,message:"不可以为空",trigger:"blur"}],min_bet:[{required:!0,message:"不可以为空",trigger:"blur"}],person_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],spade_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],heart_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],club_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],diamond_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],all_spade_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],all_heart_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],all_club_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],all_diamond_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],name:[{required:!0,message:"不可以为空",trigger:"blur"}],open_game:[{required:!0,message:"不可以为空",trigger:"blur"}],open_robot:[{required:!0,message:"不可以为空",trigger:"blur"}]},activeName:"",id:0,keys:"",loading:!1,allData:"",namelist:["200200","200201","200202"],currentlist:{}}},created:function(){var e=this;return u()(o.a.mark(function t(){var l,r,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.Getroomdata2002({key:"roomdata.lua"});case 2:l=t.sent,r=l.data,console.log(r),e.id=r.data[0].id,e.keys=r.data[0].sys_key,a=JSON.parse(r.data[0].sys_val),console.log(a),e.allData=a,e.namelist.forEach(function(t,l){n()(a).forEach(function(r){r===t&&(e.currentlist[r]=a[r]),0===l&&(e.ruleForm=a[t],e.activeName=t)})}),console.log(e.ruleForm,e.currentlist);case 12:case"end":return t.stop()}},t,e)}))()},methods:{handleClick:function(e){var t=this;this.namelist.forEach(function(l){l===e.name&&(t.ruleForm=t.currentlist[l])})},submit:function(e,t){var l,r=this;this.$refs[e].validate((l=u()(o.a.mark(function e(l){var i,s,m,u;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!l){e.next=22;break}if(n()(r.currentlist).forEach(function(e){e===r.ruleForm.type_id&&(r.currentlist[e]=r.ruleForm)}),console.log(r.ruleForm,r.currentlist),n()(r.currentlist).forEach(function(e){n()(r.allData).forEach(function(t){e===t&&(r.allData[t]=r.currentlist[e])})}),console.log(r.allData,r.currentlist),1!==t){e.next=13;break}return e.next=8,r.$http.HallFunConfig.Putroomdata2002({keys:r.keys,values:a()(r.allData),id:r.id});case 8:i=e.sent,1===(s=i.data).code&&"ok"===s.msg?r.$message({type:"success",message:"保存成功!"}):r.$message({type:"warning",message:"保存失败!"}),e.next=20;break;case 13:if(2!==t){e.next=20;break}return r.loading=!0,e.next=17,r.$http.HallFunConfig.Postroomdata2002({keys:r.keys,values:a()(r.allData),id:r.id});case 17:m=e.sent,1===(u=m.data).code&&"ok"===u.msg?(r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败!"}));case 20:e.next=24;break;case 22:return console.log("error submit!!"),e.abrupt("return",!1);case 24:case"end":return e.stop()}},e,r)})),function(e){return l.apply(this,arguments)}))}}},p={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"decupleRoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[l("div",{staticClass:"title"},[l("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[l("el-tab-pane",{attrs:{label:"荣耀厅01",name:e.namelist[0]}}),e._v(" "),l("el-tab-pane",{attrs:{label:"荣耀厅02",name:e.namelist[1]}}),e._v(" "),l("el-tab-pane",{attrs:{label:"荣耀厅03",name:e.namelist[2]}})],1)],1),e._v(" "),l("div",{staticClass:"form"},[l("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary"},on:{click:function(t){return e.submit("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submit("ruleForm",1)}}},[e._v("立即提交")]),e._v(" "),l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[l("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"房间名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v("房间ID:"+e._s(e.ruleForm.type_id)+"\n      ")],1),e._v(" "),l("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[l("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(t){e.$set(e.ruleForm,"open_game",t)},expression:"ruleForm.open_game"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"是否开放机器人",prop:"open_robot"}},[l("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_robot,callback:function(t){e.$set(e.ruleForm,"open_robot",t)},expression:"ruleForm.open_robot"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"台费",prop:"cost"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.cost,callback:function(t){e.$set(e.ruleForm,"cost",t)},expression:"ruleForm.cost"}}),e._v("(百分比)\n      ")],1),e._v(" "),l("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.max,callback:function(t){e.$set(e.ruleForm,"max",t)},expression:"ruleForm.max"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min,callback:function(t){e.$set(e.ruleForm,"min",t)},expression:"ruleForm.min"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"上座金额",prop:"sit_coins_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.sit_coins_limit,callback:function(t){e.$set(e.ruleForm,"sit_coins_limit",t)},expression:"ruleForm.sit_coins_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"上庄最低携带",prop:"min_banker_coins"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min_banker_coins,callback:function(t){e.$set(e.ruleForm,"min_banker_coins",t)},expression:"ruleForm.min_banker_coins"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"下注最低携带",prop:"min_bet"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min_bet,callback:function(t){e.$set(e.ruleForm,"min_bet",t)},expression:"ruleForm.min_bet"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人限红",prop:"person_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.person_limit,callback:function(t){e.$set(e.ruleForm,"person_limit",t)},expression:"ruleForm.person_limit"}}),e._v("格式如1,10000\n      ")],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红（黑桃）",prop:"spade_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.spade_limit,callback:function(t){e.$set(e.ruleForm,"spade_limit",t)},expression:"ruleForm.spade_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红（红桃）",prop:"heart_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.heart_limit,callback:function(t){e.$set(e.ruleForm,"heart_limit",t)},expression:"ruleForm.heart_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红（梅花）",prop:"club_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.club_limit,callback:function(t){e.$set(e.ruleForm,"club_limit",t)},expression:"ruleForm.club_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"个人区域限红（方块）",prop:"diamond_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.diamond_limit,callback:function(t){e.$set(e.ruleForm,"diamond_limit",t)},expression:"ruleForm.diamond_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"区域总限红（黑桃）",prop:"all_spade_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.all_spade_limit,callback:function(t){e.$set(e.ruleForm,"all_spade_limit",t)},expression:"ruleForm.all_spade_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"区域总限红（红桃））",prop:"all_heart_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.all_heart_limit,callback:function(t){e.$set(e.ruleForm,"all_heart_limit",t)},expression:"ruleForm.all_heart_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"区域总限红（梅花）",prop:"all_club_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.all_club_limit,callback:function(t){e.$set(e.ruleForm,"all_club_limit",t)},expression:"ruleForm.all_club_limit"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"区域总限红（方块）",prop:"all_diamond_limit"}},[l("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.all_diamond_limit,callback:function(t){e.$set(e.ruleForm,"all_diamond_limit",t)},expression:"ruleForm.all_diamond_limit"}})],1)],1)],1)])},staticRenderFns:[]};var d=l("C7Lr")(c,p,!1,function(e){l("FTwz")},"data-v-5238ef02",null);t.default=d.exports}});
//# sourceMappingURL=62.b1dc1b8c53b506ee8286.js.map
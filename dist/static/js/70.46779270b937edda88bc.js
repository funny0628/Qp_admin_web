webpackJsonp([70],{clSp:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=t("3cXf"),l=t.n(a),o=t("lC5x"),i=t.n(o),n=t("ZLEe"),s=t.n(n),m=t("J0Oq"),u=t.n(m),c={data:function(){return{activeName:"",ruleForm:{dizhu:"",dingzhu:"",cost:"",max:"",min:"",max_look_round:"",comparable_bet_round:"",max_bet_round:"",type_id:"",name:"",ip_limit:"",open_game:"",open_robot:"",robot_type:"",is_hundred_game:""},rules:{dizhu:[{required:!0,message:"不可以为空",trigger:"blur"}],dingzhu:[{required:!0,message:"不可以为空",trigger:"blur"}],cost:[{required:!0,message:"不可以为空",trigger:"blur"}],max:[{required:!0,message:"不可以为空",trigger:"blur"}],min:[{required:!0,message:"不可以为空",trigger:"blur"}],max_look_round:[{required:!0,message:"不可以为空",trigger:"blur"}],comparable_bet_round:[{required:!0,message:"不可以为空",trigger:"blur"}],max_bet_round:[{required:!0,message:"不可以为空",trigger:"blur"}],name:[{required:!0,message:"不可以为空",trigger:"blur"}],ip_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],open_game:[{required:!0,message:"不可以为空",trigger:"blur"}],open_robot:[{required:!0,message:"不可以为空",trigger:"blur"}]},allData:{},currentlist:{},namelist:["100","101","102","103"],labellist:[],id:0,keys:"",loading:!1}},created:function(){var e=this;return u()(i.a.mark(function r(){var t,a,l;return i.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.$http.HallFunConfig.Getroomdata1({key:"roomdata.lua"});case 2:t=r.sent,a=t.data,e.id=a.data[0].id,e.keys=a.data[0].sys_key,l=JSON.parse(a.data[0].sys_val),e.allData=l,e.namelist.forEach(function(r,t){s()(l).forEach(function(a){r===a&&(e.currentlist[r]=l[a],e.labellist.push(l[a].name)),0===t&&(e.activeName=r,e.ruleForm=l[r])})});case 9:case"end":return r.stop()}},r,e)}))()},methods:{handleClick:function(e){var r=this;this.namelist.forEach(function(t){t===e.name&&(r.ruleForm=r.currentlist[t])})},submitForm:function(e,r){var t,a=this;this.$refs[e].validate((t=u()(i.a.mark(function e(t){var o,n,s,m;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=18;break}if(1!==r){e.next=9;break}return e.next=4,a.$http.HallFunConfig.Putroomdata1({keys:a.keys,values:l()(a.allData),id:a.id});case 4:o=e.sent,1===(n=o.data).code&&"ok"===n.msg?a.$message({type:"success",message:"保存成功!"}):a.$message({type:"warning",message:"保存失败!"}),e.next=16;break;case 9:if(2!==r){e.next=16;break}return a.loading=!0,e.next=13,a.$http.HallFunConfig.Postroomdata1({keys:a.keys,values:l()(a.allData),id:a.id});case 13:s=e.sent,1===(m=s.data).code&&"ok"===m.msg?(a.loading=!1,a.$message({type:"success",message:"发送服务器配置成功!"})):(a.loading=!1,a.$message({type:"warning",message:"发送服务器配置失败!"}));case 16:e.next=20;break;case 18:return console.log("error submit!!"),e.abrupt("return",!1);case 20:case"end":return e.stop()}},e,a)})),function(e){return t.apply(this,arguments)}))}}},d={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"F_RoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[t("div",{staticClass:"title"},[t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(r){e.activeName=r},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:e.labellist[0],name:e.namelist[0]}}),e._v(" "),t("el-tab-pane",{attrs:{label:e.labellist[1],name:e.namelist[1]}}),e._v(" "),t("el-tab-pane",{attrs:{label:e.labellist[2],name:e.namelist[2]}}),e._v(" "),t("el-tab-pane",{attrs:{label:e.labellist[3],name:e.namelist[3]}})],1)],1),e._v(" "),t("div",{staticClass:"form"},[t("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"success"},on:{click:function(r){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm",1)}}},[e._v("立即提交")]),e._v(" "),t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[t("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"房间名称"},model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}}),e._v("房间ID:"+e._s(e.ruleForm.type_id)+"\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[t("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(r){e.$set(e.ruleForm,"open_game",r)},expression:"ruleForm.open_game"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"是否开放机器人",prop:"open_robot"}},[t("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_robot,callback:function(r){e.$set(e.ruleForm,"open_robot",r)},expression:"ruleForm.open_robot"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"ip限制",prop:"ip_limit"}},[t("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.ip_limit,callback:function(r){e.$set(e.ruleForm,"ip_limit",r)},expression:"ruleForm.ip_limit"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"底注",prop:"dizhu"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.dizhu,callback:function(r){e.$set(e.ruleForm,"dizhu",r)},expression:"ruleForm.dizhu"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"顶注",prop:"dingzhu"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.dingzhu,callback:function(r){e.$set(e.ruleForm,"dingzhu",r)},expression:"ruleForm.dingzhu"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"台费",prop:"cost"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.cost,callback:function(r){e.$set(e.ruleForm,"cost",r)},expression:"ruleForm.cost"}}),e._v("(百分比)\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.max,callback:function(r){e.$set(e.ruleForm,"max",r)},expression:"ruleForm.max"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min,callback:function(r){e.$set(e.ruleForm,"min",r)},expression:"ruleForm.min"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"最大看牌轮数",prop:"max_look_round"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.max_look_round,callback:function(r){e.$set(e.ruleForm,"max_look_round",r)},expression:"ruleForm.max_look_round"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"最大可比轮数",prop:"max_bet_round"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.max_bet_round,callback:function(r){e.$set(e.ruleForm,"max_bet_round",r)},expression:"ruleForm.max_bet_round"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"最小可比轮数",prop:"comparable_bet_round"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.comparable_bet_round,callback:function(r){e.$set(e.ruleForm,"comparable_bet_round",r)},expression:"ruleForm.comparable_bet_round"}})],1)],1)],1)])},staticRenderFns:[]};var p=t("C7Lr")(c,d,!1,function(e){t("vUiE")},"data-v-3f1312c5",null);r.default=p.exports},vUiE:function(e,r){}});
//# sourceMappingURL=70.46779270b937edda88bc.js.map
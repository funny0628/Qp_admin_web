webpackJsonp([30],{"KA+Q":function(e,a){},LlVw:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("3cXf"),n=t.n(r),s=t("lC5x"),l=t.n(s),o=t("ZLEe"),i=t.n(o),m=t("J0Oq"),c=t.n(m),u={name:"sgj_room_config",data:function(){return{activeName:"first",ruleForm:{cost:"",max:"",min:"",type_id:"",name:"",open_game:"",is_hundred_game:""},rules:{},allData:{},currentlist:{},namelist:["2004"],labellist:[],id:0,keys:"",loading:!1}},created:function(){var e=this;return c()(l.a.mark(function a(){var t,r,n;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.HallFunConfig.Getroomdata2004({key:"roomdata.lua"});case 2:t=a.sent,r=t.data,e.id=r.data[0].id,e.keys=r.data[0].sys_key,n=JSON.parse(r.data[0].sys_val),e.allData=n,e.namelist.forEach(function(a,t){i()(n).forEach(function(r){a===r&&(e.currentlist[a]=n[r],e.labellist.push(n[r].name)),0===t&&(e.activeName=a,e.ruleForm=n[a])})});case 9:case"end":return a.stop()}},a,e)}))()},methods:{handleClick:function(e){},submitForm:function(e,a){var t,r=this;this.$refs[e].validate((t=c()(l.a.mark(function e(t){var s,o,i,m;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=18;break}if(1!==a){e.next=9;break}return e.next=4,r.$http.HallFunConfig.Putroomdata2004({keys:r.keys,values:n()(r.allData),id:r.id});case 4:s=e.sent,1===(o=s.data).code&&"ok"===o.msg?r.$message({type:"success",message:"保存成功!"}):r.$message({type:"warning",message:"保存失败!"}),e.next=16;break;case 9:if(2!==a){e.next=16;break}return r.loading=!0,e.next=13,r.$http.HallFunConfig.Postroomdata2004({keys:r.keys,values:n()(r.allData),id:r.id});case 13:i=e.sent,1===(m=i.data).code&&"ok"===m.msg?(r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败!"}));case 16:e.next=20;break;case 18:return console.log("error submit!!"),e.abrupt("return",!1);case 20:case"end":return e.stop()}},e,r)})),function(e){return t.apply(this,arguments)}))}}},d={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"S_RoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[t("div",{staticClass:"title"},[t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(a){e.activeName=a},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:e.labellist[0],name:e.namelist[0]}})],1)],1),e._v(" "),t("div",{directives:[{name:"has",rawName:"v-has",value:"sgj_room_config_detail",expression:"'sgj_room_config_detail'"}],staticClass:"form"},[t("el-button",{directives:[{name:"has",rawName:"v-has",value:"sgj_room_config_send",expression:"'sgj_room_config_send'"}],staticStyle:{"margin-bottom":"10px"},attrs:{type:"success"},on:{click:function(a){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[t("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"房间名称"},model:{value:e.ruleForm.name,callback:function(a){e.$set(e.ruleForm,"name",a)},expression:"ruleForm.name"}}),e._v("房间ID:"+e._s(e.ruleForm.type_id)+"\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[t("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(a){e.$set(e.ruleForm,"open_game",a)},expression:"ruleForm.open_game"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"台费",prop:"cost"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.cost,callback:function(a){e.$set(e.ruleForm,"cost",a)},expression:"ruleForm.cost"}}),e._v("(百分比)\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.max,callback:function(a){e.$set(e.ruleForm,"max",a)},expression:"ruleForm.max"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min,callback:function(a){e.$set(e.ruleForm,"min",a)},expression:"ruleForm.min"}})],1),e._v(" "),t("el-form-item",[t("el-button",{directives:[{name:"has",rawName:"v-has",value:"sgj_room_config_save",expression:"'sgj_room_config_save'"}],attrs:{type:"primary"},on:{click:function(a){return e.submitForm("ruleForm",1)}}},[e._v("立即提交")])],1)],1)],1)])},staticRenderFns:[]};var p=t("C7Lr")(u,d,!1,function(e){t("KA+Q")},"data-v-7bc54fc7",null);a.default=p.exports}});
//# sourceMappingURL=30.69dc3f33ae9cec222f15.js.map
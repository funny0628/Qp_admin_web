webpackJsonp([23],{SWVw:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("3cXf"),n=a.n(r),o=a("lC5x"),l=a.n(o),s=a("ZLEe"),i=a.n(s),c=a("J0Oq"),u=a.n(c),m={data:function(){return{activeName:"",ruleForm:{count:"",coins_range:"",total_coin:""},rules:{count:[{required:!0,message:"不可以为空",trigger:"blur"}],coins_range:[{required:!0,message:"不可以为空",trigger:"blur"}],total_coin:[{required:!0,message:"不可以为空",trigger:"blur"}]},namelist:[],id:0,keys:"",resData:{},loading:!1}},created:function(){var e=this;return u()(l.a.mark(function t(){var a,r,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.Getddz_robot_control({key:"ddz_robot_control.lua"});case 2:a=t.sent,r=a.data,e.id=r.data[0].id,e.keys=r.data[0].sys_key,n=JSON.parse(r.data[0].sys_val),e.resData=n,e.namelist=i()(n),e.ruleForm=n[e.namelist[0]],e.activeName=e.namelist[0];case 11:case"end":return t.stop()}},t,e)}))()},methods:{handleClick:function(e){var t=this;this.namelist.forEach(function(a){a===e.name&&(t.ruleForm=t.resData[a])})},submitForm:function(e,t){var a,r=this;this.$refs[e].validate((a=u()(l.a.mark(function e(a){var o,s,i,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=19;break}if(console.log(r.resData,r.ruleForm),1!==t){e.next=10;break}return e.next=5,r.$http.HallFunConfig.Putddz_robot_control({keys:r.keys,values:n()(r.resData),id:r.id});case 5:o=e.sent,1===(s=o.data).code&&"ok"===s.msg?r.$message({type:"success",message:"保存成功!"}):r.$message({type:"warning",message:"保存失败!"}),e.next=17;break;case 10:if(2!==t){e.next=17;break}return r.loading=!0,e.next=14,r.$http.HallFunConfig.Postddz_robot_control({keys:r.keys,values:n()(r.list),id:r.id});case 14:i=e.sent,1===(c=i.data).code&&"ok"===c.msg?(r.loading=!1,r.$message({type:"success",message:"发送到服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败!"}));case 17:e.next=21;break;case 19:return console.log("error"),e.abrupt("return",!1);case 21:case"end":return e.stop()}},e,r)})),function(e){return a.apply(this,arguments)}))}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"L_RobotControl","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("保存")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),a("div",{staticClass:"title"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"斗地主-低倍场",name:e.namelist[0]}}),e._v(" "),a("el-tab-pane",{attrs:{label:"斗地主-中倍场",name:e.namelist[1]}}),e._v(" "),a("el-tab-pane",{attrs:{label:"斗地主-高倍场",name:e.namelist[2]}})],1)],1),e._v(" "),a("div",{staticClass:"form"},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"机器人总数",prop:"count"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.count,callback:function(t){e.$set(e.ruleForm,"count",t)},expression:"ruleForm.count"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"携带范围",prop:"coins_range"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.coins_range,callback:function(t){e.$set(e.ruleForm,"coins_range",t)},expression:"ruleForm.coins_range"}}),e._v("\n        (格式如：1,2）\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"携带金币总额(元)",prop:"total_coin"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.total_coin,callback:function(t){e.$set(e.ruleForm,"total_coin",t)},expression:"ruleForm.total_coin"}})],1)],1)],1)],1)},staticRenderFns:[]};var p=a("C7Lr")(m,d,!1,function(e){a("j8Kr")},"data-v-7ccbb290",null);t.default=p.exports},j8Kr:function(e,t){}});
//# sourceMappingURL=23.fb82527e6e7abac0ac67.js.map
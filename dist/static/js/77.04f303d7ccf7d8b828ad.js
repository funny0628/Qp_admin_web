webpackJsonp([77],{Gx0D:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("3cXf"),n=r.n(a),l=r("lC5x"),s=r.n(l),o=r("ZLEe"),i=r.n(o),u=r("J0Oq"),c=r.n(u),m={data:function(){return{activeName:"",ruleForm:{count:"",num_rate:"",coins_range:"",total_coin:"",exit_rate:""},rules:{count:[{required:!0,message:"不可以为空",trigger:"blur"}],num_rate:[{required:!0,message:"不可以为空",trigger:"blur"}],coins_range:[{required:!0,message:"不可以为空",trigger:"blur"}],total_coin:[{required:!0,message:"不可以为空",trigger:"blur"}],exit_rate:[{required:!0,message:"不可以为空",trigger:"blur"}]},id:0,keys:"",loading:!1,resData:{},namelist:[]}},created:function(){var e=this;return c()(s.a.mark(function t(){var r,a,n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetServerConfig({key:"zjh_robot_control.lua"});case 2:r=t.sent,a=r.data,e.id=a.data[0].id,e.keys=a.data[0].sys_key,n=JSON.parse(a.data[0].sys_val),e.resData=n,e.namelist=i()(n),e.ruleForm=n[e.namelist[0]],e.activeName=e.namelist[0];case 11:case"end":return t.stop()}},t,e)}))()},methods:{handleClick:function(e){var t=this;i()(this.resData).forEach(function(r){r===e.name&&(t.ruleForm=t.resData[r])})},submitForm:function(e,t){var r,a=this;this.$refs[e].validate((r=c()(s.a.mark(function e(r){var l,o,i,u;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=18;break}if(1!=t){e.next=9;break}return e.next=4,a.$http.HallFunConfig.PutServerConfig({keys:a.keys,values:n()(a.resData),id:a.id});case 4:l=e.sent,1===(o=l.data).code&&"ok"===o.msg&&a.$message({type:"success",message:"保存成功!"}),e.next=16;break;case 9:if(2!==t){e.next=16;break}return a.loading=!0,e.next=13,a.$http.HallFunConfig.PostServerConfig({keys:a.keys,values:n()(a.list),id:a.id});case 13:i=e.sent,1===(u=i.data).code&&"ok"===u.msg&&(a.loading=!1,a.$message({type:"success",message:"发送到服务器配置成功!"}));case 16:e.next=20;break;case 18:return console.log("error"),e.abrupt("return",!1);case 20:case"end":return e.stop()}},e,a)})),function(e){return r.apply(this,arguments)}))}}},d={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"F_RobotControl","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("保存")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),r("div",{staticClass:"title"},[r("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"金花-低倍场",name:e.namelist[0]}}),e._v(" "),r("el-tab-pane",{attrs:{label:"金花-中倍场",name:e.namelist[1]}}),e._v(" "),r("el-tab-pane",{attrs:{label:"金花-高倍场",name:e.namelist[2]}}),e._v(" "),r("el-tab-pane",{attrs:{label:"金花-土豪场",name:e.namelist[3]}})],1)],1),e._v(" "),r("div",{staticClass:"form"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[r("el-form-item",{attrs:{label:"机器人总数",prop:"count"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.count,callback:function(t){e.$set(e.ruleForm,"count",t)},expression:"ruleForm.count"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"单场机器人的数量及概率",prop:"num_rate"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.num_rate,callback:function(t){e.$set(e.ruleForm,"num_rate",t)},expression:"ruleForm.num_rate"}}),e._v("（格式如：3=40,4=40,5=20）\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"携带范围",prop:"coins_range"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.coins_range,callback:function(t){e.$set(e.ruleForm,"coins_range",t)},expression:"ruleForm.coins_range"}}),e._v("\n        (格式如：1,2）\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"携带金币总额(元)",prop:"total_coin"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.total_coin,callback:function(t){e.$set(e.ruleForm,"total_coin",t)},expression:"ruleForm.total_coin"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"离桌率(百分比)",prop:"exit_rate"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.exit_rate,callback:function(t){e.$set(e.ruleForm,"exit_rate",t)},expression:"ruleForm.exit_rate"}})],1)],1)],1)],1)},staticRenderFns:[]};var p=r("C7Lr")(m,d,!1,function(e){r("RXKl")},"data-v-33e63f6e",null);t.default=p.exports},RXKl:function(e,t){}});
//# sourceMappingURL=77.04f303d7ccf7d8b828ad.js.map
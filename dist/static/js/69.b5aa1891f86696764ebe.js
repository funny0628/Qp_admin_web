webpackJsonp([69],{CseT:function(e,t){},xnFa:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("3cXf"),r=a.n(n),s=a("lC5x"),o=a.n(s),i=a("J0Oq"),c=a.n(i),l={name:"inform_config",data:function(){return{wx:"",money:"",id:"",keys:"",form:{wx:"",money:""},rules:{wx:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],money:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]}}},created:function(){var e=this;return c()(o.a.mark(function t(){var a,n,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetComplaintConfig({key:"complaint_config.lua"});case 2:a=t.sent,n=a.data,e.id=n.data[0].id,e.keys=n.data[0].sys_key,r=JSON.parse(n.data[0].sys_val),console.log(r),e.form.wx=r[0].wx,e.form.money=r[0].money;case 10:case"end":return t.stop()}},t,e)}))()},methods:{save:function(){var e=this;return c()(o.a.mark(function t(){var a,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(""!==e.form.wx&&""!==e.form.money){t.next=3;break}return e.$message({type:"warning",message:"请完整填写信息!"}),t.abrupt("return",!1);case 3:return t.next=5,e.$http.HallFunConfig.PutComplaintConfig({keys:e.keys,id:e.id,values:r()([e.form])});case 5:a=t.sent,1===(n=a.data).code&&"ok"===n.msg?e.$message({type:"success",message:"保存成功!"}):e.$message({type:"warning",message:"保存失败!"});case 8:case"end":return t.stop()}},t,e)}))()}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"reportWayConfig"}},[a("div",{staticClass:"title"},[a("p",{directives:[{name:"has",rawName:"v-has",value:"inform_config_save",expression:"'inform_config_save'"}],on:{click:e.save}},[e._v("保存")]),e._v(" "),a("div",{staticClass:"repor"},[e._v("举报功能配置")])]),e._v(" "),a("div",{directives:[{name:"has",rawName:"v-has",value:"inform_config_detail",expression:"'inform_config_detail'"}],staticClass:"contain"},[a("el-form",{attrs:{model:e.form,"status-icon":"",rules:e.rules,"label-width":"100px","label-position":"right"}},[a("el-form-item",{attrs:{label:"微信号",prop:"wx"}},[a("el-input",{staticStyle:{width:"150px"},model:{value:e.form.wx,callback:function(t){e.$set(e.form,"wx",t)},expression:"form.wx"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"金额",prop:"money"}},[a("el-input",{staticStyle:{width:"150px"},model:{value:e.form.money,callback:function(t){e.$set(e.form,"money",t)},expression:"form.money"}})],1)],1)],1)])},staticRenderFns:[]};var f=a("C7Lr")(l,m,!1,function(e){a("CseT")},"data-v-39f3390c",null);t.default=f.exports}});
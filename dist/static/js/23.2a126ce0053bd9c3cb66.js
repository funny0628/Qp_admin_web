webpackJsonp([23],{QXbR:function(e,t){},xnFa:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("3cXf"),n=r.n(a),s=r("lC5x"),o=r.n(s),i=r("J0Oq"),c=r.n(i),l={name:"reportWayConfig",data:function(){return{wx:"",money:"",id:"",keys:"",form:{wx:"",money:""},rules:{wx:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],money:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]}}},created:function(){var e=this;return c()(o.a.mark(function t(){var r,a,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetServerConfig({key:"complaint_config.lua"});case 2:r=t.sent,a=r.data,e.id=a.data[0].id,e.keys=a.data[0].sys_key,n=JSON.parse(a.data[0].sys_val),e.form.wx=n.wx,e.form.money=n.money;case 9:case"end":return t.stop()}},t,e)}))()},methods:{save:function(){var e=this;return c()(o.a.mark(function t(){var r,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(""!==e.form.wx&&""!==e.form.money){t.next=3;break}return e.$message({type:"warning",message:"请完整填写信息!"}),t.abrupt("return",!1);case 3:return t.next=5,e.$http.HallFunConfig.PutServerConfig({keys:e.keys,id:e.id,values:n()(e.form)});case 5:r=t.sent,1===(a=r.data).code&&"ok"===a.msg&&e.$message({type:"success",message:"保存成功!"});case 8:case"end":return t.stop()}},t,e)}))()}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"reportWayConfig"}},[r("div",{staticClass:"title"},[r("p",{on:{click:e.save}},[e._v("保存")]),e._v(" "),r("div",{staticClass:"repor"},[e._v("举报功能配置")])]),e._v(" "),r("div",{staticClass:"contain"},[r("el-form",{attrs:{model:e.form,"status-icon":"",rules:e.rules,"label-width":"100px","label-position":"right"}},[r("el-form-item",{attrs:{label:"微信号",prop:"wx"}},[r("el-input",{staticStyle:{width:"150px"},model:{value:e.form.wx,callback:function(t){e.$set(e.form,"wx",t)},expression:"form.wx"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"金额",prop:"money"}},[r("el-input",{staticStyle:{width:"150px"},model:{value:e.form.money,callback:function(t){e.$set(e.form,"money",t)},expression:"form.money"}})],1)],1)],1)])},staticRenderFns:[]};var m=r("C7Lr")(l,u,!1,function(e){r("QXbR")},"data-v-a147cdde",null);t.default=m.exports}});
//# sourceMappingURL=23.2a126ce0053bd9c3cb66.js.map
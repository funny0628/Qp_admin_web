webpackJsonp([47],{"9ucc":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("3cXf"),n=r.n(a),i=r("lC5x"),l=r.n(i),s=r("J0Oq"),o=r.n(s),c={data:function(){return{ruleForm:{caijin_rate:[],bet_range:""},rules:{},id:0,keys:"",loading:!1}},created:function(){var e=this;return o()(l.a.mark(function t(){var r,a,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetServerConfig({key:"tiger_rate.lua"});case 2:r=t.sent,a=r.data,e.id=a.data[0].id,e.keys=a.data[0].sys_key,n=JSON.parse(a.data[0].sys_val),e.ruleForm=n.bet_caijin;case 8:case"end":return t.stop()}},t,e)}))()},methods:{submitForm:function(e,t){var r,a=this;this.$refs[e].validate((r=o()(l.a.mark(function e(r){var i,s,o,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=18;break}if(1!==t){e.next=9;break}return e.next=4,a.$http.HallFunConfig.PutServerConfig({keys:a.keys,values:n()({bet_caijin:a.ruleForm}),id:a.id});case 4:i=e.sent,1===(s=i.data).code&&"ok"===s.msg&&a.$message({type:"success",message:"保存成功!"}),e.next=16;break;case 9:if(2!==t){e.next=16;break}return a.loading=!0,e.next=13,a.$http.HallFunConfig.PostServerConfig({keys:a.keys,values:n()({bet_caijin:a.ruleForm}),id:a.id});case 13:o=e.sent,1===(c=o.data).code&&"ok"===c.msg&&(a.loading=!1,a.$message({type:"success",message:"发送服务器配置成功!"}));case 16:e.next=20;break;case 18:return console.log("error submit!!"),e.abrupt("return",!1);case 20:case"end":return e.stop()}},e,a)})),function(e){return r.apply(this,arguments)}))}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"S_BasicDeploy","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[r("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("保存")]),e._v(" "),r("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),r("div",{staticClass:"form"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[r("el-form-item",{attrs:{label:"单线下注金额",prop:"bet_range"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"房间名称"},model:{value:e.ruleForm.bet_range,callback:function(t){e.$set(e.ruleForm,"bet_range",t)},expression:"ruleForm.bet_range"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"获得彩金比例",prop:"caijin_rate"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"3=5"},model:{value:e.ruleForm.caijin_rate[0],callback:function(t){e.$set(e.ruleForm.caijin_rate,0,t)},expression:"ruleForm.caijin_rate[0]"}}),e._v("\n        -\n        "),r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"3=5"},model:{value:e.ruleForm.caijin_rate[1],callback:function(t){e.$set(e.ruleForm.caijin_rate,1,t)},expression:"ruleForm.caijin_rate[1]"}}),e._v("\n        -\n        "),r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"3=5"},model:{value:e.ruleForm.caijin_rate[2],callback:function(t){e.$set(e.ruleForm.caijin_rate,2,t)},expression:"ruleForm.caijin_rate[2]"}}),e._v(" "),r("p",[e._v("\n          3=50，三个777连线获得奖金占奖池的50%，4，四个777连线。。。，5，5个777连线\n        ")])],1)],1)],1)],1)},staticRenderFns:[]};var m=r("C7Lr")(c,u,!1,function(e){r("h0+P")},null,null);t.default=m.exports},"h0+P":function(e,t){}});
//# sourceMappingURL=47.6dfa6c98a7c72bed7c33.js.map
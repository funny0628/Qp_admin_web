webpackJsonp([61],{"98+Q":function(e,a){},"T+Ee":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("ZLEe"),r=t.n(n),s=t("lC5x"),i=t.n(s),l=t("3cXf"),o=t.n(l),c=t("MgeX"),d=t.n(c),u=t("J0Oq"),f=t.n(u),m={data:function(){return{form:{need_coin:"",award_coin:"",salary_days:""},rules:{need_coin:[{required:!0,message:"不可以为空",trigger:"blur"}],award_coin:[{required:!0,message:"不可以为空",trigger:"blur"}],salary_days:[{required:!0,message:"不可以为空",trigger:"blur"}]},keys:"",id:"",allData:{},loading:!1}},created:function(){this.initData()},methods:{send:function(e,a){var t,n=this;this.$refs[e].validate((t=f()(i.a.mark(function e(t){var r,s,l,c,u;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=25;break}if(r=!0,d()(n.form).forEach(function(e){r=!isNaN(e)}),!r){e.next=21;break}if(1!==a){e.next=12;break}return e.next=7,n.$http.HallFunConfig.PutActivityNew5({keys:n.keys,values:o()(n.allData),id:n.id});case 7:s=e.sent,1===(l=s.data).code&&"ok"===l.msg?n.$message({type:"success",message:"保存成功!"}):n.$message({type:"warning",message:"保存失败!"}),e.next=19;break;case 12:if(2!==a){e.next=19;break}return n.loading=!0,e.next=16,n.$http.HallFunConfig.PostActivityNew5({keys:n.keys,values:o()(n.allData),id:n.id});case 16:c=e.sent,1===(u=c.data).code&&"ok"===u.msg?(n.loading=!1,n.$message({type:"success",message:"发送服务器配置成功!"})):(n.loading=!1,n.$message({type:"warning",message:"发送服务器配置失败!"}));case 19:e.next=23;break;case 21:return n.$message({type:"warning",message:"所有项都必须是数字!"}),e.abrupt("return",!1);case 23:e.next=27;break;case 25:return n.$message({type:"warning",message:"必填的项不可以为空!"}),e.abrupt("return",!1);case 27:case"end":return e.stop()}},e,n)})),function(e){return t.apply(this,arguments)}))},initData:function(){var e=this;return f()(i.a.mark(function a(){var t,n,s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.HallFunConfig.GetActivityNew5({key:"activity_new.lua"});case 2:t=a.sent,n=t.data,e.keys=n.data[0].sys_key,e.id=n.data[0].id,s=n.data[0].sys_val,e.allData=JSON.parse(s),r()(e.allData).forEach(function(a){"10005"===e.allData[a].ac_type&&(e.form=e.allData[a].ac_content)});case 9:case"end":return a.stop()}},a,e)}))()}}},p={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"SignUp","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[e._m(0),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.send("form",1)}}},[e._v("保存")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.send("form",2)}}},[e._v("发送到服务器")]),e._v(" "),t("div",{staticClass:"contain"},[t("el-form",{ref:"form",attrs:{model:e.form,"status-icon":"",rules:e.rules,"label-width":"150px","label-position":"right"}},[t("el-form-item",{attrs:{label:"签到门槛",prop:"need_coin"}},[t("el-input",{staticStyle:{width:"200px"},model:{value:e.form.need_coin,callback:function(a){e.$set(e.form,"need_coin",a)},expression:"form.need_coin"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"签到奖励",prop:"award_coin"}},[t("el-input",{staticStyle:{width:"200px"},model:{value:e.form.award_coin,callback:function(a){e.$set(e.form,"award_coin",a)},expression:"form.award_coin"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"月俸禄领取门槛",prop:"salary_days"}},[t("el-input",{staticStyle:{width:"200px"},model:{value:e.form.salary_days,callback:function(a){e.$set(e.form,"salary_days",a)},expression:"form.salary_days"}})],1)],1)],1)],1)},staticRenderFns:[function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"title"},[a("div",{staticClass:"VIP"},[this._v("签到配置")])])}]};var g=t("C7Lr")(m,p,!1,function(e){t("98+Q")},"data-v-54f5521a",null);a.default=g.exports}});
//# sourceMappingURL=61.d1c3a342137cb2712e07.js.map
webpackJsonp([57],{RoxJ:function(e,r){},yuQq:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=t("3cXf"),a=t.n(o),n=t("lC5x"),s=t.n(n),l=t("ZLEe"),i=t.n(l),u=t("J0Oq"),c=t.n(u),m={data:function(){return{showList:[],id:0,keys:"",loading:!1,ruleForm:{show:{},coins:"",fech:"",time:"",refresh_time:"",robot_change_rate:"",robot_change_min:"",robot_change_max:""},rules:{coins:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],fech:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],time:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],refresh_time:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],robot_change_rate:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],robot_change_min:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],robot_change_max:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]}}},created:function(){var e=this;return c()(s.a.mark(function r(){var t,o,a;return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.$http.HallFunConfig.GetServerConfig({key:"rank_control.lua"});case 2:t=r.sent,o=t.data,a=JSON.parse(o.data[0].sys_val),console.log(a),e.id=o.data[0].id,e.keys=o.data[0].sys_key,e.ruleForm=a,i()(a.show).forEach(function(r){console.log(r,a.show[r]),"on"===a.show[r]&&e.showList.push(+r)});case 10:case"end":return r.stop()}},r,e)}))()},methods:{send:function(){var e=this;return c()(s.a.mark(function r(){var t,o,n;return s.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return e.loading=!0,t={},e.showList.forEach(function(e){t[e]="on"}),e.ruleForm.show=t,r.next=6,e.$http.HallFunConfig.PostServerConfig({keys:e.keys,id:e.id,values:a()(e.ruleForm)});case 6:o=r.sent,1===(n=o.data).code&&"ok"===n.msg&&(e.loading=!1,e.$message({type:"success",message:"配置到服务器成功!"}));case 9:case"end":return r.stop()}},r,e)}))()},submitForm:function(e){var r,t=this;this.$refs[e].validate((r=c()(s.a.mark(function e(r){var o,n,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=11;break}return o={},t.showList.forEach(function(e){o[e]="on"}),t.ruleForm.show=o,e.next=6,t.$http.HallFunConfig.PutServerConfig({keys:t.keys,id:t.id,values:a()(t.ruleForm)});case 6:n=e.sent,1===(l=n.data).code&&"ok"===l.msg&&t.$message({type:"success",message:"保存成功!"}),e.next=13;break;case 11:return console.log("error submit!!"),e.abrupt("return",!1);case 13:case"end":return e.stop()}},e,t)})),function(e){return r.apply(this,arguments)}))}}},_={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{attrs:{id:"RankListManageConf"}},[t("div",{staticClass:"title"},[e._v("\n    排行榜配置\n    "),t("span",{staticClass:"send",on:{click:e.send}},[e._v("发送到服务器配置")])]),e._v(" "),t("div",{staticClass:"form"},[t("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"element-loading-text":"正在发送中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)",model:e.ruleForm,"label-width":"150px"}},[t("el-form-item",{attrs:{label:"排行榜显示配置"}},[t("el-checkbox-group",{model:{value:e.showList,callback:function(r){e.showList=r},expression:"showList"}},[t("el-checkbox",{attrs:{label:1}},[e._v("今日赚钱排行")]),e._v(" "),t("el-checkbox",{attrs:{label:2}},[e._v("今日提现排行")]),e._v(" "),t("el-checkbox",{attrs:{label:3}},[e._v("在线时长排行")])],1),e._v(" "),t("span",[e._v(" 排行榜显示设置")])],1),e._v(" "),t("el-form-item",{attrs:{label:"金币上榜条件",prop:"coins"}},[t("el-input",{model:{value:e.ruleForm.coins,callback:function(r){e.$set(e.ruleForm,"coins",r)},expression:"ruleForm.coins"}}),e._v(" "),t("span",[e._v("金币上榜条件（元）")])],1),e._v(" "),t("el-form-item",{attrs:{label:"提现上榜条件",prop:"fech"}},[t("el-input",{model:{value:e.ruleForm.fech,callback:function(r){e.$set(e.ruleForm,"fech",r)},expression:"ruleForm.fech"}}),e._v(" "),t("span",[e._v("提现上榜条件（元）")])],1),e._v(" "),t("el-form-item",{attrs:{label:"在线时长",prop:"time"}},[t("el-input",{model:{value:e.ruleForm.time,callback:function(r){e.$set(e.ruleForm,"time",r)},expression:"ruleForm.time"}}),e._v(" "),t("span",[e._v("在线时长 上榜条件(秒)")])],1),e._v(" "),t("el-form-item",{attrs:{label:"刷新时间",prop:"refresh_time"}},[t("el-input",{model:{value:e.ruleForm.refresh_time,callback:function(r){e.$set(e.ruleForm,"refresh_time",r)},expression:"ruleForm.refresh_time"}}),e._v(" "),t("span",[e._v("刷新时间(分)")])],1),e._v(" "),t("el-form-item",{attrs:{label:"机器人数值改变概率",prop:"robot_change_rate"}},[t("el-input",{model:{value:e.ruleForm.robot_change_rate,callback:function(r){e.$set(e.ruleForm,"robot_change_rate",r)},expression:"ruleForm.robot_change_rate"}}),e._v(" "),t("span",[e._v("机器人数值改变概率(0 - 100数字)")])],1),e._v(" "),t("el-form-item",{attrs:{label:"机器人数值改变范围倍数（小）"}},[t("el-input-number",{attrs:{size:"medium"},model:{value:e.ruleForm.robot_change_min,callback:function(r){e.$set(e.ruleForm,"robot_change_min",r)},expression:"ruleForm.robot_change_min"}}),e._v("   -   \n        "),t("el-input-number",{attrs:{size:"medium"},model:{value:e.ruleForm.robot_change_max,callback:function(r){e.$set(e.ruleForm,"robot_change_max",r)},expression:"ruleForm.robot_change_max"}}),e._v(" "),t("p",[e._v("机器人数值改变范围倍数{0,10000}")])],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("确认")])],1)],1)],1)])},staticRenderFns:[]};var f=t("C7Lr")(m,_,!1,function(e){t("RoxJ")},"data-v-47282eb4",null);r.default=f.exports}});
//# sourceMappingURL=57.df652a2f4cbe2d626e96.js.map
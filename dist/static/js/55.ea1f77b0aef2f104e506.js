webpackJsonp([55],{"7JXl":function(e,t){},LlVw:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("mvHQ"),l=a.n(r),n=a("Xxa5"),o=a.n(n),s=a("fZjL"),i=a.n(s),c=a("exGp"),m=a.n(c),u={data:function(){return{activeName:"first",ruleForm:{cost:"",max:"",min:"",type_id:"",name:"",open_game:"",is_hundred_game:""},rules:{},allData:{},currentlist:{},namelist:["2004"],labellist:[],id:0,keys:"",loading:!1}},created:function(){var e=this;return m()(o.a.mark(function t(){var a,r,l;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetServerConfig({key:"roomdata.lua"});case 2:a=t.sent,r=a.data,e.id=r.data[0].id,e.keys=r.data[0].sys_key,l=JSON.parse(r.data[0].sys_val),e.allData=l,e.namelist.forEach(function(t,a){i()(l).forEach(function(r){t===r&&(e.currentlist[t]=l[r],e.labellist.push(l[r].name)),0===a&&(e.activeName=t,e.ruleForm=l[t])})});case 9:case"end":return t.stop()}},t,e)}))()},methods:{handleClick:function(e){},submitForm:function(e,t){var a,r=this;this.$refs[e].validate((a=m()(o.a.mark(function e(a){var n,s,i,c;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=18;break}if(1!==t){e.next=9;break}return e.next=4,r.$http.HallFunConfig.PutServerConfig({keys:r.keys,values:l()(r.allData),id:r.id});case 4:n=e.sent,1===(s=n.data).code&&"ok"===s.msg&&r.$message({type:"success",message:"保存成功!"}),e.next=16;break;case 9:if(2!==t){e.next=16;break}return r.loading=!0,e.next=13,r.$http.HallFunConfig.PostServerConfig({keys:r.keys,values:l()(r.allData),id:r.id});case 13:i=e.sent,1===(c=i.data).code&&"ok"===c.msg&&(r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"}));case 16:e.next=20;break;case 18:return console.log("error submit!!"),e.abrupt("return",!1);case 20:case"end":return e.stop()}},e,r)})),function(e){return a.apply(this,arguments)}))}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"S_RoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:e.labellist[0],name:e.namelist[0]}})],1)],1),e._v(" "),a("div",{staticClass:"form"},[a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"success"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"房间名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v("房间ID:"+e._s(e.ruleForm.type_id)+"\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(t){e.$set(e.ruleForm,"open_game",t)},expression:"ruleForm.open_game"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"台费",prop:"cost"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.cost,callback:function(t){e.$set(e.ruleForm,"cost",t)},expression:"ruleForm.cost"}}),e._v("(百分比)\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.max,callback:function(t){e.$set(e.ruleForm,"max",t)},expression:"ruleForm.max"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min,callback:function(t){e.$set(e.ruleForm,"min",t)},expression:"ruleForm.min"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("立即提交")])],1)],1)],1)])},staticRenderFns:[]};var p=a("VU/8")(u,d,!1,function(e){a("7JXl")},"data-v-4b1934d6",null);t.default=p.exports}});
//# sourceMappingURL=55.ea1f77b0aef2f104e506.js.map
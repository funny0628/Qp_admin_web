webpackJsonp([103],{R6E6:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("3cXf"),l=r.n(a),o=r("lC5x"),i=r.n(o),s=r("ZLEe"),n=r.n(s),m=r("J0Oq"),u=r.n(m),c={data:function(){return{activeName:"",ruleForm:{dizhu:"",cost:"",max:"",min:"",rate:"",type_id:"",name:"",open_game:"",open_robot:"",ip_limit:"",robot_type:"",is_hundred_game:""},rules:{name:[{required:!0,message:"不可以为空",trigger:"blur"}],open_game:[{required:!0,message:"不可以为空",trigger:"blur"}],open_robot:[{required:!0,message:"不可以为空",trigger:"blur"}],ip_limit:[{required:!0,message:"不可以为空",trigger:"blur"}],dizhu:[{required:!0,message:"不可以为空",trigger:"blur"}],cost:[{required:!0,message:"不可以为空",trigger:"blur"}],max:[{required:!0,message:"不可以为空",trigger:"blur"}],min:[{required:!0,message:"不可以为空",trigger:"blur"}],rate:[{required:!0,message:"不可以为空",trigger:"blur"}]},allData:{},currentlist:{},namelist:["300","301","302"],labellist:[],id:0,keys:"",loading:!1}},created:function(){var e=this;return u()(i.a.mark(function t(){var r,a,l;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.Getroomdata3({key:"roomdata.lua"});case 2:r=t.sent,a=r.data,e.id=a.data[0].id,e.keys=a.data[0].sys_key,l=JSON.parse(a.data[0].sys_val),e.allData=l,e.namelist.forEach(function(t,r){n()(l).forEach(function(a){t===a&&(e.currentlist[t]=l[a],e.labellist.push(l[a].name)),0===r&&(e.activeName=t,e.ruleForm=l[t])})});case 9:case"end":return t.stop()}},t,e)}))()},methods:{handleClick:function(e){var t=this;this.namelist.forEach(function(r){r===e.name&&(t.ruleForm=t.currentlist[r])})},submitForm:function(e,t){var r,a=this;this.$refs[e].validate((r=u()(i.a.mark(function e(r){var o,s,n,m;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=19;break}if(console.log(a.ruleForm,a.currentlist,a.allData),1!==t){e.next=10;break}return e.next=5,a.$http.HallFunConfig.Putroomdata3({keys:a.keys,values:l()(a.allData),id:a.id});case 5:o=e.sent,1===(s=o.data).code&&"ok"===s.msg?a.$message({type:"success",message:"保存成功!"}):a.$message({type:"warning",message:"保存失败!"}),e.next=17;break;case 10:if(2!==t){e.next=17;break}return a.loading=!0,e.next=14,a.$http.HallFunConfig.Postroomdata3({keys:a.keys,values:l()(a.allData),id:a.id});case 14:n=e.sent,1===(m=n.data).code&&"ok"===m.msg?(a.loading=!1,a.$message({type:"success",message:"发送服务器配置成功!"})):(a.loading=!1,a.$message({type:"warning",message:"发送服务器配置失败!"}));case 17:e.next=21;break;case 19:return console.log("error submit!!"),e.abrupt("return",!1);case 21:case"end":return e.stop()}},e,a)})),function(e){return r.apply(this,arguments)}))}}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"L_RoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[r("div",{staticClass:"title"},[r("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:e.labellist[0],name:e.namelist[0]}}),e._v(" "),r("el-tab-pane",{attrs:{label:e.labellist[1],name:e.namelist[1]}}),e._v(" "),r("el-tab-pane",{attrs:{label:e.labellist[2],name:e.namelist[2]}})],1)],1),e._v(" "),r("div",{staticClass:"form"},[r("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"success"},on:{click:function(t){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[r("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"房间名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v("房间ID:"+e._s(e.ruleForm.type_id)+"\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[r("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(t){e.$set(e.ruleForm,"open_game",t)},expression:"ruleForm.open_game"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否开放机器人",prop:"open_robot"}},[r("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_robot,callback:function(t){e.$set(e.ruleForm,"open_robot",t)},expression:"ruleForm.open_robot"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"ip限制",prop:"ip_limit"}},[r("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.ip_limit,callback:function(t){e.$set(e.ruleForm,"ip_limit",t)},expression:"ruleForm.ip_limit"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"底注",prop:"dizhu"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.dizhu,callback:function(t){e.$set(e.ruleForm,"dizhu",t)},expression:"ruleForm.dizhu"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"台费",prop:"cost"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.cost,callback:function(t){e.$set(e.ruleForm,"cost",t)},expression:"ruleForm.cost"}}),e._v("(百分比)\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.max,callback:function(t){e.$set(e.ruleForm,"max",t)},expression:"ruleForm.max"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.min,callback:function(t){e.$set(e.ruleForm,"min",t)},expression:"ruleForm.min"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"初始倍率",prop:"rate"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.rate,callback:function(t){e.$set(e.ruleForm,"rate",t)},expression:"ruleForm.rate"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm",1)}}},[e._v("立即提交")])],1)],1)],1)])},staticRenderFns:[]};var d=r("C7Lr")(c,p,!1,function(e){r("hLFl")},"data-v-151fa816",null);t.default=d.exports},hLFl:function(e,t){}});
//# sourceMappingURL=103.cd0c5cdb04a35021c54b.js.map
webpackJsonp([51],{"6RvF":function(e,t){},uPKo:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("3cXf"),l=a.n(r),i=a("lC5x"),n=a.n(i),o=a("ZLEe"),s=a.n(o),m=a("J0Oq"),u=a.n(m),c={name:"hl_fish_room_config",data:function(){return{ruleForm:{type_id:"",open_game:"",open_robot:"",ip_limit:"",max:"",min:"",multiple:"",name:"",robot_type:"",is_hundred_game:""},rules:{name:[{required:!0,message:"请填写活动形式",trigger:"blur"}],open_game:[{required:!0,message:"请填写活动形式",trigger:"blur"}],open_robot:[{required:!0,message:"请填写活动形式",trigger:"blur"}],ip_limit:[{required:!0,message:"请填写活动形式",trigger:"blur"}],max:[{required:!0,message:"请填写活动形式",trigger:"blur"}],multiple:[{required:!0,message:"请填写活动形式",trigger:"blur"}]},activeName:"",id:0,keys:"",loading:!1,allData:"",namelist:["600","601","602"],currentlist:{},labellist:[]}},created:function(){var e=this;return u()(n.a.mark(function t(){var a,r,l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.Getroomdata6({key:"roomdata.lua"});case 2:a=t.sent,r=a.data,e.id=r.data[0].id,e.keys=r.data[0].sys_key,l=JSON.parse(r.data[0].sys_val),e.allData=l,e.namelist.forEach(function(t,a){s()(l).forEach(function(r){r===t&&(e.currentlist[r]=l[r],e.labellist.push(l[t].name)),0===a&&(e.ruleForm=l[t],e.activeName=t)})});case 9:case"end":return t.stop()}},t,e)}))()},methods:{submit:function(e,t){var a,r=this;this.$refs[e].validate((a=u()(n.a.mark(function e(a){var i,o,s,m;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=18;break}if(1!==t){e.next=9;break}return e.next=4,r.$http.HallFunConfig.Putroomdata6({keys:r.keys,values:l()(r.allData),id:r.id});case 4:i=e.sent,1===(o=i.data).code&&"ok"===o.msg?r.$message({type:"success",message:"保存成功!"}):r.$message({type:"warning",message:"保存失败!"}),e.next=16;break;case 9:if(2!==t){e.next=16;break}return r.loading=!0,e.next=13,r.$http.HallFunConfig.Postroomdata6({keys:r.keys,values:l()(r.allData),id:r.id});case 13:s=e.sent,1===(m=s.data).code&&"ok"===m.msg?(r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败!"}));case 16:e.next=20;break;case 18:return console.log("error submit!!"),e.abrupt("return",!1);case 20:case"end":return e.stop()}},e,r)})),function(e){return a.apply(this,arguments)}))},handleClick:function(e,t){var a=this;this.namelist.forEach(function(t){e.name===t&&(a.ruleForm=a.currentlist[t])})}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"fishRoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:e.labellist[0],name:e.namelist[0]}}),e._v(" "),a("el-tab-pane",{attrs:{label:e.labellist[1],name:e.namelist[1]}}),e._v(" "),a("el-tab-pane",{attrs:{label:e.labellist[2],name:e.namelist[2]}})],1)],1),e._v(" "),a("div",{staticClass:"form"},[a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary"},on:{click:function(t){return e.submit("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v(" "),a("span",[e._v("房间ID:"+e._s(e.ruleForm.type_id))])],1),e._v(" "),a("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(t){e.$set(e.ruleForm,"open_game",t)},expression:"ruleForm.open_game"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否开放机器人",prop:"open_robot"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_robot,callback:function(t){e.$set(e.ruleForm,"open_robot",t)},expression:"ruleForm.open_robot"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"ip限制",prop:"ip_limit"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.ip_limit,callback:function(t){e.$set(e.ruleForm,"ip_limit",t)},expression:"ruleForm.ip_limit"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[a("el-input",{model:{value:e.ruleForm.max,callback:function(t){e.$set(e.ruleForm,"max",t)},expression:"ruleForm.max"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[a("el-input",{model:{value:e.ruleForm.min,callback:function(t){e.$set(e.ruleForm,"min",t)},expression:"ruleForm.min"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"子弹倍数",prop:"multiple"}},[a("el-input",{model:{value:e.ruleForm.multiple,callback:function(t){e.$set(e.ruleForm,"multiple",t)},expression:"ruleForm.multiple"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submit("ruleForm",1)}}},[e._v("立即提交")])],1)],1)],1)])},staticRenderFns:[]};var d=a("C7Lr")(c,p,!1,function(e){a("6RvF")},"data-v-62b7db5c",null);t.default=d.exports}});
//# sourceMappingURL=51.c0a04882191e1ba37c5d.js.map
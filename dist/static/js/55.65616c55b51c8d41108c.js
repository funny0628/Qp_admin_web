webpackJsonp([55],{dHZS:function(e,a){},uPKo:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("MgeX"),l=t.n(r),i=t("lC5x"),n=t.n(i),o=t("ZLEe"),s=t.n(o),m=t("3cXf"),u=t.n(m),c=t("J0Oq"),p=t.n(c),f={name:"hl_fish_room_config",data:function(){var e=function(e,a,t){if(""===a)return t(new Error("必填项不可以为空!!"));t()};return{ruleForm:{type_id:"",open_game:"",open_robot:"",ip_limit:"",max:"",min:"",multiple:"",name:"",robot_type:"",is_hundred_game:""},rules:{max:[{required:!0,validator:e,trigger:"blur"}],min:[{required:!0,validator:e,trigger:"blur"}],multiple:[{required:!0,validator:e,trigger:"blur"}]},activeName:"",id:0,keys:"",loading:!1,allData:{},namelist:["600","601","602"],currentlist:{},labellist:[],ResData:{}}},created:function(){var e=this;return p()(n.a.mark(function a(){var t,r,l;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.HallFunConfig.Getroomdata6({key:"roomdata.lua"});case 2:t=a.sent,r=t.data,e.id=r.data[0].id,e.keys=r.data[0].sys_key,l=JSON.parse(r.data[0].sys_val),e.allData=l,e.ResData=JSON.parse(u()(l)),e.namelist.forEach(function(a,t){s()(l).forEach(function(r){r===a&&(e.currentlist[r]=l[r],e.labellist.push(l[a].name)),0===t&&(e.ruleForm=l[a],e.activeName=a)})});case 10:case"end":return a.stop()}},a,e)}))()},methods:{submit:function(e,a){var t,r=this;this.$refs[e].validate((t=p()(n.a.mark(function e(t){var i,o,m,c;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=20;break}if(l()(r.currentlist).forEach(function(e){e.max=+e.max,e.min=+e.min,e.multiple=+e.multiple}),s()(r.ResData).forEach(function(e){s()(r.currentlist).forEach(function(a){e===a&&(r.ResData[e]=r.currentlist[a])})}),1!==a){e.next=11;break}return e.next=6,r.$http.HallFunConfig.Putroomdata6({keys:r.keys,values:u()(r.ResData),id:r.id});case 6:i=e.sent,1===(o=i.data).code&&"ok"===o.msg?r.$message({type:"success",message:"保存成功!"}):r.$message({type:"warning",message:"保存失败!"}),e.next=18;break;case 11:if(2!==a){e.next=18;break}return r.loading=!0,e.next=15,r.$http.HallFunConfig.Postroomdata6({keys:r.keys,values:u()(r.ResData),id:r.id});case 15:m=e.sent,1===(c=m.data).code&&"ok"===c.msg?(r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败!"}));case 18:e.next=22;break;case 20:return r.$message({type:"warning",message:"输入正确格式的数字,必填项不能为空!!"}),e.abrupt("return",!1);case 22:case"end":return e.stop()}},e,r)})),function(e){return t.apply(this,arguments)}))},handleClick:function(e,a){var t=this;this.namelist.forEach(function(a){e.name===a&&(t.ruleForm=t.currentlist[a])})}}},d={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"fishRoomCofig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[t("div",{staticClass:"title"},[t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(a){e.activeName=a},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:e.labellist[0],name:e.namelist[0]}}),e._v(" "),t("el-tab-pane",{attrs:{label:e.labellist[1],name:e.namelist[1]}}),e._v(" "),t("el-tab-pane",{attrs:{label:e.labellist[2],name:e.namelist[2]}})],1)],1),e._v(" "),t("div",{staticClass:"form"},[t("el-button",{directives:[{name:"has",rawName:"v-has",value:"hl_fish_room_config_send",expression:"'hl_fish_room_config_send'"}],staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary"},on:{click:function(a){return e.submit("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),t("el-form",{directives:[{name:"has",rawName:"v-has",value:"hl_fish_room_config_detail",expression:"'hl_fish_room_config_detail'"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"150px"}},[t("el-form-item",{attrs:{label:"房间名称",prop:"name"}},[t("el-input",{attrs:{disabled:""},model:{value:e.ruleForm.name,callback:function(a){e.$set(e.ruleForm,"name",a)},expression:"ruleForm.name"}}),e._v(" "),t("span",[e._v("房间ID:"+e._s(e.ruleForm.type_id))])],1),e._v(" "),t("el-form-item",{attrs:{label:"场次开关",prop:"open_game"}},[t("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_game,callback:function(a){e.$set(e.ruleForm,"open_game",a)},expression:"ruleForm.open_game"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"是否开放机器人",prop:"open_robot"}},[t("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.open_robot,callback:function(a){e.$set(e.ruleForm,"open_robot",a)},expression:"ruleForm.open_robot"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"ip限制",prop:"ip_limit"}},[t("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.ruleForm.ip_limit,callback:function(a){e.$set(e.ruleForm,"ip_limit",a)},expression:"ruleForm.ip_limit"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"携带上限",prop:"max"}},[t("el-input",{attrs:{type:"number"},model:{value:e.ruleForm.max,callback:function(a){e.$set(e.ruleForm,"max",a)},expression:"ruleForm.max"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"携带下限",prop:"min"}},[t("el-input",{attrs:{type:"number"},model:{value:e.ruleForm.min,callback:function(a){e.$set(e.ruleForm,"min",a)},expression:"ruleForm.min"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"子弹倍数",prop:"multiple"}},[t("el-input",{attrs:{type:"number"},model:{value:e.ruleForm.multiple,callback:function(a){e.$set(e.ruleForm,"multiple",a)},expression:"ruleForm.multiple"}})],1),e._v(" "),t("el-form-item",[t("el-button",{directives:[{name:"has",rawName:"v-has",value:"hl_fish_room_config_save",expression:"'hl_fish_room_config_save'"}],attrs:{type:"primary"},on:{click:function(a){return e.submit("ruleForm",1)}}},[e._v("立即提交")])],1)],1)],1)])},staticRenderFns:[]};var v=t("C7Lr")(f,d,!1,function(e){t("dHZS")},"data-v-4aaf205b",null);a.default=v.exports}});
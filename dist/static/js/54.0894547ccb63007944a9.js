webpackJsonp([54],{acYj:function(e,t){},pxl1:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("ZLEe"),n=a.n(r),s=a("lC5x"),i=a.n(s),l=a("3cXf"),o=a.n(l),c=a("J0Oq"),u=a.n(c),p={data:function(){return{form:{experience:"",help:"",task_txt:""},rules:{experience:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],help:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],task_txt:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},keys:"",id:"",allData:{},loading:!1}},created:function(){this.initData()},methods:{send:function(e,t){var a,r=this;this.$refs[e].validate((a=u()(i.a.mark(function e(a){var n,s,l,c;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=18;break}if(1!==t){e.next=9;break}return e.next=4,r.$http.HallFunConfig.PutActivityNew3({keys:r.keys,values:o()(r.allData),id:r.id});case 4:n=e.sent,1===(s=n.data).code&&"ok"===s.msg?r.$message({type:"success",message:"保存成功!"}):r.$message({type:"warning",message:"保存失败!"}),e.next=16;break;case 9:if(2!==t){e.next=16;break}return r.loading=!0,e.next=13,r.$http.HallFunConfig.PostActivityNew3({keys:r.keys,values:o()(r.allData),id:r.id});case 13:l=e.sent,1===(c=l.data).code&&"ok"===c.msg?(r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败"}));case 16:e.next=20;break;case 18:return r.$message({type:"warning",message:"必填的项不可以为空"}),e.abrupt("return",!1);case 20:case"end":return e.stop()}},e,r)})),function(e){return a.apply(this,arguments)}))},initData:function(){var e=this;return u()(i.a.mark(function t(){var a,r,s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetActivityNew3({key:"activity_new.lua"});case 2:a=t.sent,r=a.data,e.keys=r.data[0].sys_key,e.id=r.data[0].id,s=r.data[0].sys_val,e.allData=JSON.parse(s),n()(e.allData).forEach(function(t){"10003"===e.allData[t].ac_type&&(e.form=e.allData[t].ac_content.other[0])});case 9:case"end":return t.stop()}},t,e)}))()}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"MT_OtherConfig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("h2",[e._v("其他配置")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.send("form",2)}}},[e._v("发送服务器配置")])],1),e._v(" "),a("div",{staticClass:"form"},[a("el-form",{ref:"form",staticStyle:{"margin-top":"20px"},attrs:{rules:e.rules,model:e.form,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"肥料",prop:"experience"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"0"},model:{value:e.form.experience,callback:function(t){e.$set(e.form,"experience",t)},expression:"form.experience"}}),e._v("(成长值)\n      ")],1),e._v(" "),a("el-form-item",{attrs:{label:"帮助说明文本内容",prop:"help"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容"},model:{value:e.form.help,callback:function(t){e.$set(e.form,"help",t)},expression:"form.help"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"摇奖次数特定任务文本提示内容",prop:"task_txt"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容"},model:{value:e.form.task_txt,callback:function(t){e.$set(e.form,"task_txt",t)},expression:"form.task_txt"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.send("form",1)}}},[e._v("保存")])],1)],1)])},staticRenderFns:[]};var f=a("C7Lr")(p,d,!1,function(e){a("acYj")},"data-v-5dd04908",null);t.default=f.exports}});
//# sourceMappingURL=54.0894547ccb63007944a9.js.map
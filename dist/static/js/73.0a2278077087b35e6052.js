webpackJsonp([73],{AWpS:function(e,t){},"Wb+b":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("MgeX"),r=a.n(n),s=a("lC5x"),i=a.n(s),o=a("ZLEe"),l=a.n(o),c=a("3cXf"),m=a.n(c),d=a("J0Oq"),u=a.n(d),_={name:"daily_rescue",data:function(){var e=function(e,t,a){if(null===t)return a(new Error("必填项不可以为空!!"));a()};return{form:{ac_type:"",ac_name:"",open_state:"",ac_begin_time:"",ac_end_time:"",ac_content:{level:[],prize_time:0,jump_position:0,bg_url:""}},rules:{ac_name:[{required:!0,message:"不可以为空",trigger:"blur"}],open_state:[{required:!0,message:"不可以为空",trigger:"blur"}],ac_begin_time:[{required:!0,validator:e,trigger:"blur"}],ac_end_time:[{required:!0,validator:e,trigger:"blur"}]},keys:"",id:"",allData:"",loading:!1,ResData:{}}},created:function(){this.initData()},methods:{add:function(){this.form.ac_content.level.push({lose_coin:"",award_coin:""})},del:function(e){var t=this;this.$confirm("确认永久删除？").then(function(a){t.form.ac_content.level=t.form.ac_content.level.filter(function(t,a){return e!==a}),t.$message({type:"success",message:"删除成功!"})}).catch(function(e){t.$message({type:"info",message:"取消删除!"})})},send:function(e,t){var a,n=this;this.$refs[e].validate((a=u()(i.a.mark(function e(a){var r,s,o,c,d,u;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=25;break}if(n.form.ac_content.level.forEach(function(e){if(""===e.award_coin||""===e.lose_coin)return n.$message({type:"warning",message:"必填的项不可以为空!"}),!1;e.award_coin=+e.award_coin,e.lose_coin=+e.lose_coin}),r=JSON.parse(m()(n.form)),s=r.ac_content.level,r.ac_content.level={},s.forEach(function(e,t){r.ac_content.level[t+1]=e}),l()(n.ResData).forEach(function(e){"111"===e&&(n.ResData[e]=r)}),1!==t){e.next=15;break}return e.next=10,n.$http.HallFunConfig.PutActivityNew2({keys:n.keys,values:m()(n.ResData),id:n.id});case 10:o=e.sent,1===(c=o.data).code&&"ok"===c.msg?n.$message({type:"success",message:"保存成功!"}):n.$message({type:"warning",message:"保存失败!"}),e.next=22;break;case 15:if(2!==t){e.next=22;break}return n.loading=!0,e.next=19,n.$http.HallFunConfig.PostActivityNew2({keys:n.keys,values:m()(n.ResData),id:n.id});case 19:d=e.sent,1===(u=d.data).code&&"ok"===u.msg?(n.loading=!1,n.$message({type:"success",message:"发送服务器配置成功!"})):(n.loading=!1,n.$message({type:"warning",message:"发送服务器配置失败!"}));case 22:n.initData(),e.next=27;break;case 25:return n.$message({type:"warning",message:"必填的项不可以为空!"}),e.abrupt("return",!1);case 27:case"end":return e.stop()}},e,n)})),function(e){return a.apply(this,arguments)}))},initData:function(){var e=this;return u()(i.a.mark(function t(){var a,n,s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetActivityNew2({key:"activity_new.lua"});case 2:a=t.sent,n=a.data,e.keys=n.data[0].sys_key,e.id=n.data[0].id,s=n.data[0].sys_val,e.allData=JSON.parse(s),e.ResData=JSON.parse(m()(e.allData)),l()(e.allData).forEach(function(t){"111"===t&&(e.form=e.allData[t])}),e.form.ac_content.level=r()(e.form.ac_content.level);case 11:case"end":return t.stop()}},t,e)}))()}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"SaveMoney","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",[a("h2",[e._v("每日救赎金")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"daily_rescue_send",expression:"'daily_rescue_send'"}],attrs:{type:"primary"},on:{click:function(t){return e.send("form",2)}}},[e._v("发送到服务器配置")])],1),e._v(" "),a("el-form",{ref:"form",staticStyle:{"margin-top":"20px","padding-bottom":"20px"},attrs:{rules:e.rules,model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"活动名称",prop:"ac_name"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:"",placeholder:"活动名称"},model:{value:e.form.ac_name,callback:function(t){e.$set(e.form,"ac_name",t)},expression:"form.ac_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动状态",prop:"open_state"}},[a("el-select",{model:{value:e.form.open_state+"",callback:function(t){e.$set(e.form,"open_state+''",t)},expression:"form.open_state+''"}},[a("el-option",{attrs:{label:"开启",value:"true"}}),e._v(" "),a("el-option",{attrs:{label:"关闭",value:"false"}})],1)],1),e._v(" "),a("div",{staticClass:"formTime"},[a("p",[a("el-form-item",{attrs:{label:"活动时间",prop:"ac_begin_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请输入开始时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.form.ac_begin_time,callback:function(t){e.$set(e.form,"ac_begin_time",t)},expression:"form.ac_begin_time"}})],1)],1),e._v(" "),a("span",{staticClass:"line"},[e._v("-")]),e._v(" "),a("p",[a("el-form-item",{attrs:{"label-width":"20px",prop:"ac_end_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请输入结束时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.form.ac_end_time,callback:function(t){e.$set(e.form,"ac_end_time",t)},expression:"form.ac_end_time"}})],1)],1)]),e._v(" "),e.form.ac_content?a("el-form-item",{attrs:{label:"救赎金",prop:"ac_content"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("添加")]),e._v(" "),e._l(e.form.ac_content.level,function(t,n){return a("div",{staticClass:"item"},[a("p",{staticStyle:{"margin-top":"10px"}},[e._v("\n          当日亏损金额(递增):\n          "),a("el-input",{staticStyle:{width:"220px"},attrs:{type:"number",placeholder:"当日亏损金额"},model:{value:t.lose_coin,callback:function(a){e.$set(t,"lose_coin",a)},expression:"item.lose_coin"}})],1),e._v(" "),a("p",{staticStyle:{"border-bottom":"1px solid #ccc"}},[e._v("\n          救赎金额:\n          "),a("span",[a("el-input",{staticStyle:{width:"220px"},attrs:{type:"number",placeholder:"救赎金额"},model:{value:t.award_coin,callback:function(a){e.$set(t,"award_coin",a)},expression:"item.award_coin"}}),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.del(n)}}},[e._v("删除")]),e._v(" "),a("p")],1)])])})],2):e._e(),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"daily_rescue_save",expression:"'daily_rescue_save'"}],attrs:{type:"primary"},on:{click:function(t){return e.send("form",1)}}},[e._v("保存")])],1)],1)},staticRenderFns:[]};var f=a("C7Lr")(_,p,!1,function(e){a("AWpS")},"data-v-346bbf78",null);t.default=f.exports}});
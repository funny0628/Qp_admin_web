webpackJsonp([64],{A0nw:function(e,t){},PsO3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("ZLEe"),n=a.n(r),i=a("MgeX"),l=a.n(i),s=a("lC5x"),o=a.n(s),c=a("3cXf"),m=a.n(c),d=a("J0Oq"),f=a.n(d),u={data:function(){return{form:{first_charge_coin:"",open_state:"",ac_begin_time:"",ac_end_time:"",level:[]},rules:{first_charge_coin:[{required:!0,message:"不可以为空",trigger:"blur"}],open_state:[{required:!0,message:"不可以为空",trigger:"blur"}],ac_begin_time:[{required:!0,message:"不可以为空",trigger:"blur"}],ac_end_time:[{required:!0,message:"不可以为空",trigger:"blur"}],level:[{required:!0,message:"不可以为空",trigger:"blur"}]},keys:"",id:"",allData:{},loading:!1}},created:function(){this.initData()},methods:{send:function(e,t){var a,r=this;this.$refs[e].validate((a=f()(o.a.mark(function e(a){var n,i,l,s,c;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=22;break}if(n=r.form.level,r.form.level={},n.forEach(function(e,t){r.form.level[t+1]=e}),1!==t){e.next=12;break}return e.next=7,r.$http.HallFunConfig.PutServerConfig({keys:r.keys,values:m()(r.allData),id:r.id});case 7:i=e.sent,1===(l=i.data).code&&"ok"===l.msg&&r.$message({type:"success",message:"保存成功!"}),e.next=19;break;case 12:if(2!==t){e.next=19;break}return r.loading=!0,e.next=16,r.$http.HallFunConfig.PostServerConfig({keys:r.keys,values:m()(r.allData),id:r.id});case 16:s=e.sent,1===(c=s.data).code&&"ok"===c.msg?(r.loading=!1,r.$message({type:"success",message:"发送服务器配置成功!"})):(r.loading=!1,r.$message({type:"warning",message:"发送服务器配置失败!"}));case 19:r.initData(),e.next=24;break;case 22:return r.$message({type:"warning",message:"必填的项不可以为空!"}),e.abrupt("return",!1);case 24:case"end":return e.stop()}},e,r)})),function(e){return a.apply(this,arguments)}))},add:function(){this.form.level=l()(this.form.level),this.form.level.push({})},del:function(e){this.form.level=this.form.level.filter(function(t,a){return a!==e})},initData:function(){var e=this;return f()(o.a.mark(function t(){var a,r,i;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetServerConfig({key:"activity_new.lua"});case 2:a=t.sent,r=a.data,e.keys=r.data[0].sys_key,e.id=r.data[0].id,i=r.data[0].sys_val,e.allData=JSON.parse(i),n()(e.allData).forEach(function(t){"10001"===e.allData[t].ac_type&&(e.form=e.allData[t])}),e.form.level=l()(e.form.level);case 10:case"end":return t.stop()}},t,e)}))()}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"FirstConfig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",[a("h2",[e._v("首冲配置")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.send("form",2)}}},[e._v("发送到服务器配置")])],1),e._v(" "),a("el-form",{ref:"form",staticStyle:{"margin-top":"20px"},attrs:{rules:e.rules,model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"活动名称",prop:"ac_name"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:"",placeholder:"活动名称"},model:{value:e.form.ac_name,callback:function(t){e.$set(e.form,"ac_name",t)},expression:"form.ac_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"首冲单笔金额",prop:"first_charge_coin"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"首冲单笔金额"},model:{value:e.form.first_charge_coin,callback:function(t){e.$set(e.form,"first_charge_coin",t)},expression:"form.first_charge_coin"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动状态",prop:"open_state"}},[a("el-select",{model:{value:e.form.open_state,callback:function(t){e.$set(e.form,"open_state",t)},expression:"form.open_state"}},[a("el-option",{attrs:{label:"开启",value:"true"}}),e._v(" "),a("el-option",{attrs:{label:"关闭",value:"false"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"活动时间",prop:"ac_begin_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请输入开始时间",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.form.ac_begin_time,callback:function(t){e.$set(e.form,"ac_begin_time",t)},expression:"form.ac_begin_time"}}),e._v("\n      -\n      "),a("el-date-picker",{attrs:{type:"date",placeholder:"请输入结束时间",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.form.ac_end_time,callback:function(t){e.$set(e.form,"ac_end_time",t)},expression:"form.ac_end_time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"档次",prop:"level"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("添加")]),e._v(" "),e._l(e.form.level,function(t,r){return a("div",{staticClass:"item"},[a("p",{staticStyle:{"margin-top":"10px"}},[e._v("\n          流水需求(递增):\n          "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"(多个以;分号隔开)"},model:{value:t.need_coin,callback:function(a){e.$set(t,"need_coin",a)},expression:"item.need_coin"}}),e._v("         首冲奖励:\n          "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"(多个以;分号隔开)"},model:{value:t.award_coin,callback:function(a){e.$set(t,"award_coin",a)},expression:"item.award_coin"}}),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.del(r)}}},[e._v("删除")])],1)])})],2)],1),e._v(" "),a("div",{staticStyle:{"margin-left":"20px"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.send("form",1)}}},[e._v("保存")])],1)],1)},staticRenderFns:[]};var _=a("C7Lr")(u,p,!1,function(e){a("A0nw")},null,null);t.default=_.exports}});
//# sourceMappingURL=64.b3ce7a5dfa29c21b43eb.js.map
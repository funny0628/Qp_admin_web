webpackJsonp([30],{"5Tte":function(e,t){},PsO3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("ZLEe"),r=a.n(n),i=a("MgeX"),l=a.n(i),o=a("lC5x"),c=a.n(o),s=a("3cXf"),m=a.n(s),d=a("J0Oq"),f=a.n(d),_={data:function(){return{form:{first_charge_coin:"",open_state:"",ac_begin_time:"",ac_end_time:"",ac_content:{level:[]}},rules:{first_charge_coin:[{required:!0,message:"不可以为空",trigger:"blur"}],open_state:[{required:!0,message:"不可以为空",trigger:"blur"}],ac_begin_time:[{required:!0,message:"不可以为空",trigger:"blur"}],ac_end_time:[{required:!0,message:"不可以为空",trigger:"blur"}]},keys:"",id:"",allData:{},loading:!1}},created:function(){this.initData()},methods:{send:function(e,t){var a,n=this;this.$refs[e].validate((a=f()(c.a.mark(function e(a){var r,i,l,o,s;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=22;break}if(r=n.form.ac_content.level,n.form.ac_content.level={},r.forEach(function(e,t){n.form.ac_content.level[t+1]=e}),1!==t){e.next=12;break}return e.next=7,n.$http.HallFunConfig.PutActivityNew1({keys:n.keys,values:m()(n.allData),id:n.id});case 7:i=e.sent,1===(l=i.data).code&&"ok"===l.msg?n.$message({type:"success",message:"保存成功!"}):n.$message({type:"warning",message:"保存失败!"}),e.next=19;break;case 12:if(2!==t){e.next=19;break}return n.loading=!0,e.next=16,n.$http.HallFunConfig.PostActivityNew1({keys:n.keys,values:m()(n.allData),id:n.id});case 16:o=e.sent,1===(s=o.data).code&&"ok"===s.msg?(n.loading=!1,n.$message({type:"success",message:"发送服务器配置成功!"})):(n.loading=!1,n.$message({type:"warning",message:"发送服务器配置失败!"}));case 19:n.initData(),e.next=24;break;case 22:return n.$message({type:"warning",message:"必填的项不可以为空!"}),e.abrupt("return",!1);case 24:case"end":return e.stop()}},e,n)})),function(e){return a.apply(this,arguments)}))},add:function(){this.form.ac_content.level=l()(this.form.ac_content.level),this.form.ac_content.level.push({})},del:function(e){this.form.ac_content.level=this.form.ac_content.level.filter(function(t,a){return a!==e})},initData:function(){var e=this;return f()(c.a.mark(function t(){var a,n,i;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetActivityNew1({key:"activity_new.lua"});case 2:a=t.sent,n=a.data,e.keys=n.data[0].sys_key,e.id=n.data[0].id,i=n.data[0].sys_val,e.allData=JSON.parse(i),r()(e.allData).forEach(function(t){"10001"===e.allData[t].ac_type&&(e.form=e.allData[t])}),e.form.ac_content.level=l()(e.form.ac_content.level);case 10:case"end":return t.stop()}},t,e)}))()}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"FirstConfig","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",[a("h2",[e._v("首冲配置")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.send("form",2)}}},[e._v("发送到服务器配置")])],1),e._v(" "),a("el-form",{ref:"form",staticStyle:{"margin-top":"20px"},attrs:{rules:e.rules,model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"活动名称",prop:"ac_name"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:"",placeholder:"活动名称"},model:{value:e.form.ac_name,callback:function(t){e.$set(e.form,"ac_name",t)},expression:"form.ac_name"}})],1),e._v(" "),e.form.ac_content?a("el-form-item",{attrs:{label:"首冲单笔金额",prop:"ac_content"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"首冲单笔金额"},model:{value:e.form.ac_content.first_charge_coin,callback:function(t){e.$set(e.form.ac_content,"first_charge_coin",t)},expression:"form.ac_content.first_charge_coin"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"活动状态",prop:"open_state"}},[a("el-select",{model:{value:e.form.open_state,callback:function(t){e.$set(e.form,"open_state",t)},expression:"form.open_state"}},[a("el-option",{attrs:{label:"开启",value:"true"}}),e._v(" "),a("el-option",{attrs:{label:"关闭",value:"false"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"活动时间",prop:"ac_begin_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请输入开始时间",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.form.ac_begin_time,callback:function(t){e.$set(e.form,"ac_begin_time",t)},expression:"form.ac_begin_time"}}),e._v("\n      -\n      "),a("el-date-picker",{attrs:{type:"date",placeholder:"请输入结束时间",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.form.ac_end_time,callback:function(t){e.$set(e.form,"ac_end_time",t)},expression:"form.ac_end_time"}})],1),e._v(" "),e.form.ac_content?a("el-form-item",{attrs:{label:"档次",prop:"ac_content"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("添加")]),e._v(" "),e._l(e.form.ac_content.level,function(t,n){return a("div",{staticClass:"item"},[a("p",{staticStyle:{"margin-top":"10px"}},[e._v("\n          流水需求(递增):\n          "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"(多个以;分号隔开)"},model:{value:t.need_coin,callback:function(a){e.$set(t,"need_coin",a)},expression:"item.need_coin"}}),e._v("         首冲奖励:\n          "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"(多个以;分号隔开)"},model:{value:t.award_coin,callback:function(a){e.$set(t,"award_coin",a)},expression:"item.award_coin"}}),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.del(n)}}},[e._v("删除")])],1)])})],2):e._e()],1),e._v(" "),a("div",{staticStyle:{"margin-left":"20px"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.send("form",1)}}},[e._v("保存")])],1)],1)},staticRenderFns:[]};var p=a("C7Lr")(_,u,!1,function(e){a("5Tte")},null,null);t.default=p.exports}});
//# sourceMappingURL=30.008cab627ebfd9683188.js.map
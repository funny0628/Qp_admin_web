webpackJsonp([24],{"/VVj":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("3cXf"),n=a.n(s),i=a("lC5x"),c=a.n(i),l=a("J0Oq"),r=a.n(l),o={name:"vip_deposit_config",data:function(){return{id:0,keys:"",type:"QQ",name:"",wx:"",desc:"",list:[]}},created:function(){var e=this;return r()(c.a.mark(function t(){var a,s,n;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetRechargeConfig({key:"recharge_config.lua"});case 2:a=t.sent,s=a.data,e.id=s.data[0].id,e.keys=s.data[0].sys_key,n=JSON.parse(s.data[0].sys_val),e.list=n;case 8:case"end":return t.stop()}},t,e)}))()},methods:{add:function(){this.list.push({})},saveData:function(){var e=this;return r()(c.a.mark(function t(){var a,s;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e.list),e.list.forEach(function(e){"QQ"===e.undefined?e.type="qq":"微信"===e.undefined&&(e.type="wechat")}),t.next=4,e.$http.HallFunConfig.PutRechargeConfig({keys:e.keys,id:e.id,values:n()(e.list)});case 4:a=t.sent,1===(s=a.data).code&&"ok"===s.msg?e.$message({type:"success",message:"保存成功!"}):e.$message({type:"warning",message:"保存失败"});case 7:case"end":return t.stop()}},t,e)}))()},del:function(e){var t=this;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.list.splice(e,1),t.$message({type:"success",message:"删除成功!"})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"VIPpayConfig"}},[e._m(0),e._v(" "),a("div",{staticClass:"contain"},[a("div",{staticClass:"botton"},[a("span",{staticClass:"add",on:{click:e.add}},[e._v("添加")]),e._v(" "),a("span",{directives:[{name:"has",rawName:"v-has",value:"vip_deposit_config_save",expression:"'vip_deposit_config_save'"}],staticClass:"save",on:{click:e.saveData}},[e._v("保存")])]),e._v(" "),e._l(e.list,function(t,s){return a("div",{directives:[{name:"has",rawName:"v-has",value:"vip_deposit_config_detail",expression:"'vip_deposit_config_detail'"}],key:s,staticClass:"table"},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:4}},[a("el-select",{staticStyle:{width:"100%"},model:{value:t.undefined,callback:function(a){e.$set(t,"undefined",a)},expression:"item.undefined"}},[a("el-option",{attrs:{label:"QQ",value:"QQ"}}),e._v(" "),a("el-option",{attrs:{label:"微信",value:"微信"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{placeholder:"名称"},model:{value:t.name,callback:function(a){e.$set(t,"name",a)},expression:"item.name"}})],1),e._v(" "),a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{placeholder:"微信/QQ"},model:{value:t.wx,callback:function(a){e.$set(t,"wx",a)},expression:"item.wx"}})],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"备注"},model:{value:t.desc,callback:function(a){e.$set(t,"desc",a)},expression:"item.desc"}})],1),e._v(" "),a("el-col",{attrs:{span:2}},[a("span",{staticClass:"dele",on:{click:function(t){return e.del(s)}}},[e._v("删除")])])],1)],1)})],2)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title"},[t("div",{staticClass:"VIP"},[this._v("VIP充值配置")])])}]};var u=a("C7Lr")(o,d,!1,function(e){a("bTqj")},"data-v-8bb3ce7a",null);t.default=u.exports},bTqj:function(e,t){}});
//# sourceMappingURL=24.13e3c231d09017855880.js.map
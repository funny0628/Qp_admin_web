webpackJsonp([66],{"9aFa":function(e,t){},j8hf:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("lC5x"),n=r.n(a),s=r("3cXf"),o=r.n(s),i=r("J0Oq"),l=r.n(i),c=r("22Zk"),m=(c.a,{name:"GMrepControl",components:{InputArea:c.a},data:function(){return{id:"",key:"",form:{gm_coins:"",warn_coins:"",gm_add_coins:"",add_store:""},rules:{gm_coins:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],warn_coins:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],gm_add_coins:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],add_store:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},formLabelWidth:"150px"}},created:function(){this.initData({key:"gm_control.lua"})},methods:{send:function(e,t){var r,a=this;this.$refs[e].validate((r=l()(n.a.mark(function e(r,s){var i,l,c,m;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=16;break}if(1!==t){e.next=9;break}return e.next=4,a.$http.HallFunConfig.PutServerConfig({keys:a.key,values:o()({gm_coins:a.form}),id:a.id});case 4:i=e.sent,1===(l=i.data).code&&l.msg&&a.$message({type:"success",message:"保存成功"}),e.next=14;break;case 9:return e.next=11,a.$http.HallFunConfig.PostServerConfig({keys:a.key,values:o()({gm_coins:a.form}),id:a.id});case 11:c=e.sent,1===(m=c.data).code&&m.msg&&a.$message({type:"success",message:"发送服务器配置成功"});case 14:e.next=18;break;case 16:return console.log("error submit!!"),e.abrupt("return",!1);case 18:case"end":return e.stop()}},e,a)})),function(e,t){return r.apply(this,arguments)}))},initData:function(e){var t=this;return l()(n.a.mark(function r(){var a,s;return n.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.$http.HallFunConfig.GetServerConfig(e);case 2:a=r.sent,s=a.data,t.key=s.data[0].sys_key,t.id=s.data[0].id,t.form=JSON.parse(s.data[0].sys_val).gm_coins;case 7:case"end":return r.stop()}},r,t)}))()}}}),d={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"GMrepControl-main"}},[r("input-area",[r("el-button",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{type:"primary"},on:{click:function(t){return e.send("form",1)}}},[e._v("保存")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.send("form",2)}}},[e._v("发送到服务器配置")]),e._v(" "),r("div",[r("div",{staticClass:"gm"},[e._v("GM库存控制")])])],1),e._v(" "),r("div",{staticClass:"bd"},[r("el-form",{staticStyle:{width:"30%"},attrs:{rules:e.rules,model:e.form}},[r("el-form-item",{attrs:{prop:"gm_coins",label:"实时库存值(元)","label-width":e.formLabelWidth}},[r("el-input",{staticStyle:{width:"200px"},attrs:{autocomplete:"off"},model:{value:e.form.gm_coins,callback:function(t){e.$set(e.form,"gm_coins",t)},expression:"form.gm_coins"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"warn_coins",label:"警报值(元)","label-width":e.formLabelWidth}},[r("el-input",{staticStyle:{width:"200px"},attrs:{autocomplete:"off"},model:{value:e.form.warn_coins,callback:function(t){e.$set(e.form,"warn_coins",t)},expression:"form.warn_coins"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"gm_add_coins",label:"库存累计添加值(元)","label-width":e.formLabelWidth}},[r("el-input",{staticStyle:{width:"200px"},attrs:{autocomplete:"off"},model:{value:e.form.gm_add_coins,callback:function(t){e.$set(e.form,"gm_add_coins",t)},expression:"form.gm_add_coins"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"add_store",label:"添加库存(元)","label-width":e.formLabelWidth}},[r("el-input",{staticStyle:{width:"200px"},attrs:{autocomplete:"off"},model:{value:e.form.add_store,callback:function(t){e.$set(e.form,"add_store",t)},expression:"form.add_store"}})],1),e._v(" "),r("el-button",{staticStyle:{"margin-top":"10px"},attrs:{type:"primary"}},[e._v("添加库存")])],1)],1)],1)},staticRenderFns:[]};var u=r("C7Lr")(m,d,!1,function(e){r("9aFa")},"data-v-3b4b7133",null);t.default=u.exports}});
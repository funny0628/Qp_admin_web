webpackJsonp([23],{"9qZA":function(e,t){},U1Qm:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("lC5x"),o=r.n(a),l=r("3cXf"),n=r.n(l),i=r("J0Oq"),s=r.n(i),c=(r("vdVF"),{name:"GMrepControl",data:function(){return{id:"",key:"",form:{control_rate:"",frist_charge_rate:"",frist_charge_weight:"",charge_rate:"",charge_weight:"",exchange_rate:"",exchange_weight:"",new_player_rate:"",new_player_weight:"",user_guide_rate:"",user_guide_weight:"",range_control_rate:[]},rules:{control_rate:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],frist_charge_rate:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],frist_charge_weight:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],charge_rate:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],charge_weight:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],exchange_rate:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],exchange_weight:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],new_player_rate:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],new_player_weight:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},formLabelWidth:"150px"}},created:function(){this.initData({key:"personal_control.lua"})},methods:{addItem:function(){this.form.range_control_rate.push({})},deleteItem:function(e){this.form.range_control_rate=this.form.range_control_rate.filter(function(t,r){return e!==r})},send:function(e,t){var r,a=this;this.$refs[e].validate((r=s()(o.a.mark(function e(r,l){var i,s,c,f;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=17;break}if(1!==t){e.next=9;break}return e.next=4,a.$http.HallFunConfig.PutServerConfig({keys:a.key,values:n()(a.form),id:a.id});case 4:i=e.sent,1===(s=i.data).code&&s.msg&&a.$message({type:"success",message:"保存成功"}),e.next=15;break;case 9:if(2!==t){e.next=15;break}return e.next=12,a.$http.HallFunConfig.PostServerConfig({keys:a.key,values:n()(a.form),id:a.id});case 12:c=e.sent,1===(f=c.data).code&&f.msg&&a.$message({type:"success",message:"发送服务器配置成功"});case 15:e.next=19;break;case 17:return console.log("error submit!!"),e.abrupt("return",!1);case 19:case"end":return e.stop()}},e,a)})),function(e,t){return r.apply(this,arguments)}))},initData:function(e){var t=this;return s()(o.a.mark(function r(){var a,l;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.$http.HallFunConfig.GetServerConfig(e);case 2:a=r.sent,l=a.data,t.key=l.data[0].sys_key,t.id=l.data[0].id,t.form=JSON.parse(l.data[0].sys_val);case 7:case"end":return r.stop()}},r,t)}))()}}}),f={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"GMrepControl-main"}},[r("input-area",[r("span",[e._v("GM配置")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.send("form",2)}}},[e._v("发送到服务器配置")])],1),e._v(" "),r("div",{staticClass:"bd"},[r("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form}},[r("el-form-item",{attrs:{prop:"control_rate",label:"控制概率(百分比)","label-width":e.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.control_rate,callback:function(t){e.$set(e.form,"control_rate",t)},expression:"form.control_rate"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"frist_charge_rate",label:"首冲返水率(百分比)","label-width":e.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.frist_charge_rate,callback:function(t){e.$set(e.form,"frist_charge_rate",t)},expression:"form.frist_charge_rate"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"frist_charge_rate",label:"首冲返水权重","label-width":e.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.frist_charge_rate,callback:function(t){e.$set(e.form,"frist_charge_rate",t)},expression:"form.frist_charge_rate"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"charge_rate",label:"充值返水率(百分比)","label-width":e.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.charge_rate,callback:function(t){e.$set(e.form,"charge_rate",t)},expression:"form.charge_rate"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"charge_weight",label:"充值返水权重","label-width":e.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.charge_weight,callback:function(t){e.$set(e.form,"charge_weight",t)},expression:"form.charge_weight"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"exchange_rate",label:"兑换返水率(百分比)","label-width":e.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.exchange_rate,callback:function(t){e.$set(e.form,"exchange_rate",t)},expression:"form.exchange_rate"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"exchange_rate",label:"兑换返水权重","label-width":e.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.exchange_rate,callback:function(t){e.$set(e.form,"exchange_rate",t)},expression:"form.exchange_rate"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"exchange_rate",label:"新增加返水率(百分比)","label-width":e.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.exchange_rate,callback:function(t){e.$set(e.form,"exchange_rate",t)},expression:"form.exchange_rate"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"new_player_weight",label:"新增加返水权重","label-width":e.formLabelWidth}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.new_player_weight,callback:function(t){e.$set(e.form,"new_player_weight",t)},expression:"form.new_player_weight"}})],1),e._v(" "),r("el-button",{staticStyle:{margin:"20px"},attrs:{type:"success",size:"mini"},on:{click:e.addItem}},[e._v("新增区间控制")]),e._v(" "),e._l(e.form.range_control_rate,function(t,a){return r("el-form-item",{key:a,attrs:{prop:"name",label:"个人库存区间","label-width":e.formLabelWidth}},[r("el-row",[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:t.min,callback:function(r){e.$set(t,"min",r)},expression:"item.min"}})],1),e._v(" "),r("el-col",{staticStyle:{"text-align":"center",color:"#6e7073"},attrs:{span:2}},[e._v("~")]),e._v(" "),r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:t.max,callback:function(r){e.$set(t,"max",r)},expression:"item.max"}})],1),e._v(" "),r("el-col",{staticStyle:{"text-align":"center",color:"#6e7073"},attrs:{span:2}},[e._v("概率(%):")]),e._v(" "),r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:t.rate,callback:function(r){e.$set(t,"rate",r)},expression:"item.rate"}})],1),e._v(" "),r("el-col",{staticStyle:{"padding-left":"10px"},attrs:{span:2}},[r("el-button",{attrs:{type:"success",size:"medium"},on:{click:function(t){return e.deleteItem(a)}}},[e._v("删除")])],1)],1)],1)}),e._v(" "),r("el-form-item",{attrs:{"label-width":e.formLabelWidth}},[r("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.send("form",1)}}},[e._v("确认")])],1)],2)],1)],1)},staticRenderFns:[]};var m=r("C7Lr")(c,f,!1,function(e){r("9qZA")},"data-v-7d05b606",null);t.default=m.exports}});
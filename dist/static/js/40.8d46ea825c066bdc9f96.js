webpackJsonp([40],{"3tj6":function(e,t){},U1Qm:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("22Zk"),l=(o.a,{name:"GMrepControl",components:{InputArea:o.a},data:function(){return{form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""},formLabelWidth:"150px",counter:[1]}},methods:{add:function(){this.counter.push(1)},deleteItem:function(e){this.counter=this.counter.filter(function(t,a){return e!==a})},open:function(){var e=this;this.$prompt("保留金额","设置保留金额",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!0,inputValue:this.keep_money,inputType:"number"}).then(function(t){t.value;e.$message({type:"success",message:"操作成功"})}).catch(function(){e.$message({type:"info",message:"取消输入"})})}},mounted:function(){this.getExchangeList()}}),n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"GMrepControl-main"}},[a("input-area",[a("span",[e._v("GM配置")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.open}},[e._v("发送到服务器配置")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"控制概率(百分比)","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"首冲返水率(百分比)","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"首冲返水权重","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"充值返水率(百分比)","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"充值返水权重","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"兑换返水率(百分比)","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"兑换返水权重","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"新增加返水率(百分比)","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"新增加返水权重","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":e.formLabelWidth}},[a("el-button",{attrs:{type:"success",size:"mini"},on:{click:e.add}},[e._v("新增区间控制")])],1),e._v(" "),e._l(e.counter,function(t,o){return a("el-form-item",{key:o,attrs:{label:"个人库存区间","label-width":e.formLabelWidth}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-col",{staticStyle:{"text-align":"center",color:"#6e7073"},attrs:{span:2}},[e._v("~")]),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-col",{staticStyle:{"text-align":"center",color:"#6e7073"},attrs:{span:2}},[e._v("概率(%):")]),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-col",{staticStyle:{"padding-left":"10px"},attrs:{span:2}},[a("el-button",{attrs:{type:"success",size:"medium"},on:{click:function(t){return e.deleteItem(o)}}},[e._v("删除")])],1)],1)],1)}),e._v(" "),a("el-form-item",{attrs:{"label-width":e.formLabelWidth}},[a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("确认")])],1)],2)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(l,n,!1,function(e){a("3tj6")},"data-v-66bc4102",null);t.default=m.exports}});
//# sourceMappingURL=40.8d46ea825c066bdc9f96.js.map
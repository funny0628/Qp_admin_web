webpackJsonp([50],{Z3Tb:function(e,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=a("3cXf"),r=a.n(t),s=a("lC5x"),i=a.n(s),o=a("J0Oq"),_=a.n(o),l={data:function(){return{id:0,keys:"",loading:!1,resData:{}}},created:function(){var e=this;return _()(i.a.mark(function n(){var a,t,r;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$http.HallFunConfig.Getrobot_ten_banker_control({key:"robot_banker_control.lua"});case 2:a=n.sent,t=a.data,e.id=t.data[0].id,e.keys=t.data[0].sys_key,r=JSON.parse(t.data[0].sys_val),e.resData=r;case 8:case"end":return n.stop()}},n,e)}))()},methods:{addpeople:function(){0===this.resData.banker_rate_people_min.length?(this.resData.banker_rate_people_min=[""],this.resData.banker_rate_people_max=[""],this.resData.banker_rate_rate_min=[""],this.resData.banker_rate_people_num_min=[""]):(this.resData.banker_rate_people_min.push(""),this.resData.banker_rate_people_max.push(""),this.resData.banker_rate_rate_min.push(""),this.resData.banker_rate_people_num_min.push(""))},addround:function(){0===this.resData.banker_round_coin_min.length?(this.resData.banker_round_coin_min=[""],this.resData.banker_round_coin_max=[""],this.resData.banker_round_round_range_min=[""],this.resData.banker_round_round_range_max=[""]):(this.resData.banker_round_coin_min.push(""),this.resData.banker_round_coin_max.push(""),this.resData.banker_round_round_range_min.push(""),this.resData.banker_round_round_range_max.push(""))},delpeople:function(e){var n=this;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.resData.banker_rate_people_min.splice(e,1),n.$message({type:"success",message:"删除成功!"})}).catch(function(){n.$message({type:"info",message:"已取消删除"})})},delround:function(e){var n=this;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.resData.banker_round_coin_min.splice(e,1),n.$message({type:"success",message:"删除成功!"})}).catch(function(){n.$message({type:"info",message:"已取消删除"})})},submit:function(e){var n=this;return _()(i.a.mark(function a(){var t,s,o,_;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(console.log(n.resData),1!==e){a.next=9;break}return a.next=4,n.$http.HallFunConfig.Putrobot_ten_banker_control({keys:n.keys,values:r()(n.resData),id:n.id});case 4:t=a.sent,1===(s=t.data).code&&"ok"===s.msg?n.$message({type:"success",message:"保存成功!"}):n.$message({type:"warning",message:"保存失败!"}),a.next=16;break;case 9:if(2!==e){a.next=16;break}return n.loading=!0,a.next=13,n.$http.HallFunConfig.Postrobot_ten_banker_control({keys:n.keys,values:r()(n.resData),id:n.id});case 13:o=a.sent,1===(_=o.data).code&&"ok"===_.msg?(n.loading=!1,n.$message({type:"success",message:"发送服务器配置成功!"})):(n.loading=!1,n.$message({type:"warning",message:"发送服务器配置失败!"}));case 16:case"end":return a.stop()}},a,n)}))()}}},c={render:function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"decupleBankerControl","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[e._v("\n    十倍场上庄机器人控制\n    "),a("el-button",{attrs:{type:"primary"},on:{click:function(n){return e.submit(2)}}},[e._v("发送到服务器配置")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(n){return e.submit(1)}}},[e._v("确定")])],1),e._v(" "),a("div",{staticClass:"conent"},[a("div",{staticClass:"title title-first"},[e._v("\n      牌局中的人数对应的概率和上庄人数设置\n      "),a("el-button",{attrs:{type:"primary"},on:{click:e.addpeople}},[e._v("添加")])],1),e._v(" "),e._l(e.resData.banker_rate_people_min,function(n,t){return a("div",{key:t,staticClass:"list1"},[e._v("\n      真实玩家人数范围:\n      "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.resData.banker_rate_people_min[t],callback:function(n){e.$set(e.resData.banker_rate_people_min,t,n)},expression:"resData.banker_rate_people_min[peopleindex]"}}),e._v("\n      -\n      "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.resData.banker_rate_people_max[t],callback:function(n){e.$set(e.resData.banker_rate_people_max,t,n)},expression:"resData.banker_rate_people_max[peopleindex]"}}),e._v("\n          概率值:\n      "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.resData.banker_rate_rate_min[t],callback:function(n){e.$set(e.resData.banker_rate_rate_min,t,n)},expression:"resData.banker_rate_rate_min[peopleindex]"}}),e._v("\n          上庄人数:\n      "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.resData.banker_rate_people_num_min[t],callback:function(n){e.$set(e.resData.banker_rate_people_num_min,t,n)},expression:"resData.banker_rate_people_num_min[peopleindex]"}}),e._v("\n         \n      "),a("el-button",{attrs:{type:"danger"},on:{click:function(n){return e.delpeople(t)}}},[e._v("删除")])],1)}),e._v(" "),a("div",{staticClass:"title title-second"},[e._v("\n      上庄机器人带的金币所对应的上庄局数设置\n      "),a("el-button",{attrs:{type:"primary"},on:{click:e.addround}},[e._v("添加")])],1),e._v(" "),e._l(e.resData.banker_round_coin_min,function(n,t){return a("div",{key:t+"only",staticClass:"list1"},[e._v("\n      金币范围:\n      "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.resData.banker_round_coin_min[t],callback:function(n){e.$set(e.resData.banker_round_coin_min,t,n)},expression:"resData.banker_round_coin_min[roundindex]"}}),e._v("\n      -\n      "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.resData.banker_round_coin_max[t],callback:function(n){e.$set(e.resData.banker_round_coin_max,t,n)},expression:"resData.banker_round_coin_max[roundindex]"}}),e._v("\n          上庄局数:\n      "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.resData.banker_round_round_range_min[t],callback:function(n){e.$set(e.resData.banker_round_round_range_min,t,n)},expression:"resData.banker_round_round_range_min[roundindex]"}}),e._v("\n      -\n      "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.resData.banker_round_round_range_max[t],callback:function(n){e.$set(e.resData.banker_round_round_range_max,t,n)},expression:"resData.banker_round_round_range_max[roundindex]"}}),e._v("\n         \n      "),a("el-button",{attrs:{type:"danger"},on:{click:function(n){return e.delround(t)}}},[e._v("删除")])],1)}),e._v(" "),a("div",{staticClass:"title title-third"},[e._v("\n      机器人上庄间隔设置\n    ")]),e._v(" "),a("div",{staticClass:"list1"},[e._v("\n      上庄间隔:\n      "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.resData.banker_interval,callback:function(n){e.$set(e.resData,"banker_interval",n)},expression:"resData.banker_interval"}}),e._v("\n      (秒)\n    ")],1),e._v(" "),a("div",{staticClass:"title title-four"},[e._v("\n      玩家上庄前面有机器人取消概率设置\n    ")]),e._v(" "),a("div",{staticClass:"list1"},[e._v("\n      取消概率:\n      "),a("el-input",{staticStyle:{width:"200px"},model:{value:e.resData.banker_cancel,callback:function(n){e.$set(e.resData,"banker_cancel",n)},expression:"resData.banker_cancel"}}),e._v("\n      (百分比)\n    ")],1)],2)])},staticRenderFns:[]};var u=a("C7Lr")(l,c,!1,function(e){a("imDz")},"data-v-636fc133",null);n.default=u.exports},imDz:function(e,n){}});
//# sourceMappingURL=50.8e507386633eed66acbd.js.map
webpackJsonp([27],{bkEe:function(t,e){},zjUI:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("3cXf"),n=a.n(i),r=a("lC5x"),s=a.n(r),l=a("ZLEe"),o=a.n(l),c=a("J0Oq"),u=a.n(c),v={data:function(){return{namelist:[],activeName:"fishing_normal",resData:{},Data:{},id:0,keys:"",loading:!1}},created:function(){var t=this;return u()(s.a.mark(function e(){var a,i,n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.HallFunConfig.GetServerConfig({key:"fishing_robot.lua"});case 2:a=e.sent,i=a.data,console.log(i),t.id=i.data[0].id,t.keys=i.data[0].sys_key,n=JSON.parse(i.data[0].sys_val),console.log(n),t.resData=n,t.namelist=o()(n),t.Data=n[t.namelist[0]];case 12:case"end":return e.stop()}},e,t)}))()},methods:{submit:function(t){var e=this;return u()(s.a.mark(function a(){var i,r,l,o;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(1!==t){a.next=8;break}return a.next=3,e.$http.HallFunConfig.PutServerConfig({keys:e.keys,values:n()(e.resData),id:e.id});case 3:i=a.sent,1===(r=i.data).code&&"ok"===r.msg&&e.$message({type:"success",message:"保存成功!"}),a.next=15;break;case 8:if(2!==t){a.next=15;break}return e.loading=!0,a.next=12,e.$http.HallFunConfig.PostServerConfig({keys:e.keys,values:n()(e.resData),id:e.id});case 12:l=a.sent,1===(o=l.data).code&&"ok"===o.msg&&(e.loading=!1,e.$message({type:"success",message:"发送服务器配置成功!"}));case 15:case"end":return a.stop()}},a,e)}))()},addRobot:function(t){t.push({})},addFire:function(t){t.push({})},addLock:function(t){t.push({})},delRobot:function(t,e){var a=this;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.splice(e,1),a.$message({type:"success",message:"删除成功!"})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},delFire:function(t,e){var a=this;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.splice(e,1),a.$message({type:"success",message:"删除成功!"})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},delLock:function(t,e){var a=this;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.splice(e,1),a.$message({type:"success",message:"删除成功!"})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},handleClick:function(t,e){var a=this;o()(this.resData).forEach(function(e){e===t.name&&(a.Data=a.resData[e])})}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{id:"fishControl","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("el-button",{staticStyle:{margin:"0px 10px 10px 0px"},attrs:{type:"primary"},on:{click:function(e){return t.submit(1)}}},[t._v("保存")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submit(2)}}},[t._v("发送给服务器配置")]),t._v(" "),a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"捕鱼-低倍场",name:t.namelist[0]}}),t._v(" "),a("el-tab-pane",{attrs:{label:"捕鱼-中倍场",name:t.namelist[1]}}),t._v(" "),a("el-tab-pane",{attrs:{label:"捕鱼-高倍场",name:t.namelist[2]}})],1)],1),t._v(" "),a("div",{staticClass:"table"},[a("div",{staticClass:"item"},[a("div",{staticClass:"item_div left"},[t._v("\n        机器人命中系数\n      ")]),t._v(" "),a("div",{staticClass:"item_div right"},[a("p",[t._v("\n          命中系数:"),a("el-input",{staticStyle:{width:"200px"},model:{value:t.Data.hit_arg,callback:function(e){t.$set(t.Data,"hit_arg",e)},expression:"Data.hit_arg"}})],1),t._v(" "),a("p",[t._v("\n          机器人携带金币范围（元）:"),a("el-input",{staticStyle:{width:"100px","margin-top":"10px"},model:{value:t.Data.min_coin,callback:function(e){t.$set(t.Data,"min_coin",e)},expression:"Data.min_coin"}}),t._v("  ~  "),a("el-input",{staticStyle:{width:"100px"},model:{value:t.Data.max_coin,callback:function(e){t.$set(t.Data,"max_coin",e)},expression:"Data.max_coin"}})],1)])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"item_div left"},[t._v("\n        机器人退出房间\n      ")]),t._v(" "),a("div",{staticClass:"item_div right"},[a("p",[t._v("\n         退出时间（秒）:"),a("el-input",{staticStyle:{width:"100px"},model:{value:t.Data.robot_leave.interval_time[0],callback:function(e){t.$set(t.Data.robot_leave.interval_time,0,e)},expression:"Data.robot_leave.interval_time[0]"}}),t._v("  ~  "),a("el-input",{staticStyle:{width:"100px"},model:{value:t.Data.robot_leave.interval_time[1],callback:function(e){t.$set(t.Data.robot_leave.interval_time,1,e)},expression:"Data.robot_leave.interval_time[1]"}})],1),t._v(" "),a("p",[t._v("\n         退出概率(百分比):"),a("el-input",{staticStyle:{width:"200px","margin-top":"10px"},model:{value:t.Data.robot_leave.rate,callback:function(e){t.$set(t.Data.robot_leave,"rate",e)},expression:"Data.robot_leave.rate"}})],1)])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"item_div left"},[t._v("\n        机器人加入房间\n      ")]),t._v(" "),a("div",{staticClass:"item_div right"},[a("p",[t._v("\n        加入时间（秒):"),a("el-input",{staticStyle:{width:"100px"},model:{value:t.Data.robot_join.interval_time[0],callback:function(e){t.$set(t.Data.robot_join.interval_time,0,e)},expression:"Data.robot_join.interval_time[0]"}}),t._v("  ~  "),a("el-input",{staticStyle:{width:"100px"},model:{value:t.Data.robot_join.interval_time[1],callback:function(e){t.$set(t.Data.robot_join.interval_time,1,e)},expression:"Data.robot_join.interval_time[1]"}})],1),t._v(" "),a("p",[t._v("\n          人数设定(百分比): "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addRobot(t.Data.robot_join.player_num_setting)}}},[t._v("添加")]),a("br")],1),t._l(t.Data.robot_join.player_num_setting,function(e,i){return a("div",{key:i},[a("el-input",{staticStyle:{width:"100px","margin-top":"10px"},model:{value:e.player_num,callback:function(a){t.$set(e,"player_num",a)},expression:"itemRobot.player_num"}}),t._v("  ~  "),a("el-input",{staticStyle:{width:"100px"},model:{value:e.rate,callback:function(a){t.$set(e,"rate",a)},expression:"itemRobot.rate"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.delRobot(t.Data.robot_join.player_num_setting,i)}}},[t._v("删除")])],1)}),t._v(" "),a("p")],2)]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"item_div left"},[t._v("\n        子弹切换\n      ")]),t._v(" "),a("div",{staticClass:"item_div right"},[a("p",[t._v("\n        切换时间（秒）:"),a("el-input",{staticStyle:{width:"100px"},model:{value:t.Data.fire_change.interval_time[0],callback:function(e){t.$set(t.Data.fire_change.interval_time,0,e)},expression:"Data.fire_change.interval_time[0]"}}),t._v("  ~  "),a("el-input",{staticStyle:{width:"100px"},model:{value:t.Data.fire_change.interval_time[1],callback:function(e){t.$set(t.Data.fire_change.interval_time,1,e)},expression:"Data.fire_change.interval_time[1]"}})],1),t._v(" "),a("p",[t._v("\n          炮台倍数(百分比): "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addFire(t.Data.fire_change.gun_rate)}}},[t._v("添加")]),a("br")],1),t._l(t.Data.fire_change.gun_rate,function(e,i){return a("div",{key:i},[a("el-input",{staticStyle:{width:"100px","margin-top":"10px"},model:{value:e.power_rate,callback:function(a){t.$set(e,"power_rate",a)},expression:"itemFire.power_rate"}}),t._v("  ~  "),a("el-input",{staticStyle:{width:"100px"},model:{value:e.trigger_rate,callback:function(a){t.$set(e,"trigger_rate",a)},expression:"itemFire.trigger_rate"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.delFire(t.Data.fire_change.gun_rate,i)}}},[t._v("删除")])],1)}),t._v(" "),a("p")],2)]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"item_div left"},[t._v("\n        锁定概率\n      ")]),t._v(" "),a("div",{staticClass:"item_div right"},[a("p",[t._v("\n         鱼的倍数: "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addLock(t.Data.fire_lock)}}},[t._v("添加")]),a("br")],1),t._l(t.Data.fire_lock,function(e,i){return a("div",{key:i},[a("el-input",{staticStyle:{width:"100px","margin-top":"10px"},model:{value:e.score_rate,callback:function(a){t.$set(e,"score_rate",a)},expression:"itemLock.score_rate"}}),t._v("  ~  "),a("el-input",{staticStyle:{width:"100px"},model:{value:e.trigger_rate,callback:function(a){t.$set(e,"trigger_rate",a)},expression:"itemLock.trigger_rate"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.delLock(t.Data.fire_lock,i)}}},[t._v("删除")])],1)}),t._v(" "),a("p")],2)])])])},staticRenderFns:[]};var p=a("C7Lr")(v,_,!1,function(t){a("bkEe")},"data-v-71276ea9",null);e.default=p.exports}});
//# sourceMappingURL=27.116eb7a6413a6d6fc02c.js.map
webpackJsonp([57],{"7nmj":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=t("3cXf"),l=t.n(o),a=t("lC5x"),n=t.n(a),i=t("ZLEe"),s=t.n(i),c=t("J0Oq"),u=t.n(c),_={data:function(){return{activeName:"",resData:{},ruleForm:{count:"",num_rate:"",coins_range:"",total_coin:"",exit_rate:"",rob_config_one:"",rob_config_two:"",rob_config_three:"",rob_config_four:"",rob_config_five:"",bet_config_one:"",bet_config_two:"",bet_config_three:"",bet_config_four:"",bet_config_five:""},rules:{count:[{required:!0,message:"不可以为空",trigger:"blur"}],num_rate:[{required:!0,message:"不可以为空",trigger:"blur"}],coins_range:[{required:!0,message:"不可以为空",trigger:"blur"}],total_coin:[{required:!0,message:"不可以为空",trigger:"blur"}],exit_rate:[{required:!0,message:"不可以为空",trigger:"blur"}],rob_config_one:[{required:!0,message:"不可以为空",trigger:"blur"}],rob_config_two:[{required:!0,message:"不可以为空",trigger:"blur"}],rob_config_three:[{required:!0,message:"不可以为空",trigger:"blur"}],rob_config_four:[{required:!0,message:"不可以为空",trigger:"blur"}],rob_config_five:[{required:!0,message:"不可以为空",trigger:"blur"}],bet_config_one:[{required:!0,message:"不可以为空",trigger:"blur"}],bet_config_two:[{required:!0,message:"不可以为空",trigger:"blur"}],bet_config_three:[{required:!0,message:"不可以为空",trigger:"blur"}],bet_config_four:[{required:!0,message:"不可以为空",trigger:"blur"}],bet_config_five:[{required:!0,message:"不可以为空",trigger:"blur"}]},id:0,keys:"",loading:!1,namelist:[]}},created:function(){var e=this;return u()(n.a.mark(function r(){var t,o,l;return n.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.$http.HallFunConfig.GetServerConfig({key:"qznn_robot_control.lua"});case 2:t=r.sent,o=t.data,e.id=o.data[0].id,e.keys=o.data[0].sys_key,l=JSON.parse(o.data[0].sys_val),e.resData=l,e.namelist=s()(l),e.activeName=e.namelist[0],e.ruleForm=l[e.namelist[0]];case 11:case"end":return r.stop()}},r,e)}))()},methods:{handleClick:function(e){var r=this;s()(this.resData).forEach(function(t){t===e.name&&(r.ruleForm=r.resData[t])})},submitForm:function(e,r){var t,o=this;this.$refs[e].validate((t=u()(n.a.mark(function e(t){var a,i,s,c;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=18;break}if(1!=r){e.next=9;break}return e.next=4,o.$http.HallFunConfig.PutServerConfig({keys:o.keys,values:l()(o.resData),id:o.id});case 4:a=e.sent,1===(i=a.data).code&&"ok"===i.msg&&o.$message({type:"success",message:"保存成功!"}),e.next=16;break;case 9:if(2!==r){e.next=16;break}return o.loading=!0,e.next=13,o.$http.HallFunConfig.PostServerConfig({keys:o.keys,values:l()(o.resData),id:o.id});case 13:s=e.sent,1===(c=s.data).code&&"ok"===c.msg&&(o.loading=!1,o.$message({type:"success",message:"发送服务器配置成功!"}));case 16:e.next=20;break;case 18:return console.log("error"),e.abrupt("return",!1);case 20:case"end":return e.stop()}},e,o)})),function(e){return t.apply(this,arguments)}))}}},m={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"RobotControl","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm",1)}}},[e._v("保存")]),t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm",2)}}},[e._v("发送到服务器配置")]),e._v(" "),t("div",{staticClass:"title"},[t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(r){e.activeName=r},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"抢庄牛牛-低倍场",name:e.namelist[0]}}),e._v(" "),t("el-tab-pane",{attrs:{label:"抢庄牛牛-中倍场",name:e.namelist[1]}}),e._v(" "),t("el-tab-pane",{attrs:{label:"抢庄牛牛-高倍场",name:e.namelist[2]}}),e._v(" "),t("el-tab-pane",{attrs:{label:"抢庄牛牛-土豪场",name:e.namelist[3]}})],1)],1),e._v(" "),t("div",{staticClass:"form"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[t("el-form-item",{attrs:{label:"机器人总数",prop:"count"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.count,callback:function(r){e.$set(e.ruleForm,"count",r)},expression:"ruleForm.count"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"单场机器人的数量及概率",prop:"num_rate"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.num_rate,callback:function(r){e.$set(e.ruleForm,"num_rate",r)},expression:"ruleForm.num_rate"}}),e._v("（格式如：3=40,4=40,5=20）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"携带范围",prop:"coins_range"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.coins_range,callback:function(r){e.$set(e.ruleForm,"coins_range",r)},expression:"ruleForm.coins_range"}}),e._v("\n        (格式如：1,2）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"携带金币总额(元)",prop:"total_coin"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.total_coin,callback:function(r){e.$set(e.ruleForm,"total_coin",r)},expression:"ruleForm.total_coin"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"离桌率(百分比)",prop:"exit_rate"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.exit_rate,callback:function(r){e.$set(e.ruleForm,"exit_rate",r)},expression:"ruleForm.exit_rate"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"无牛抢庄",prop:"rob_config_one"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.rob_config_one,callback:function(r){e.$set(e.ruleForm,"rob_config_one",r)},expression:"ruleForm.rob_config_one"}}),e._v("（格式如：90,10,0,0,0）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"剩余1,2,3抢庄",prop:"rob_config_two"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.rob_config_two,callback:function(r){e.$set(e.ruleForm,"rob_config_two",r)},expression:"ruleForm.rob_config_two"}}),e._v("\n        （格式如：90,10,0,0,0）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"剩余4,5,6抢庄",prop:"rob_config_three"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.rob_config_three,callback:function(r){e.$set(e.ruleForm,"rob_config_three",r)},expression:"ruleForm.rob_config_three"}}),e._v("（格式如：90,10,0,0,0）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"剩余7,8,9抢庄",prop:"rob_config_four"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.rob_config_four,callback:function(r){e.$set(e.ruleForm,"rob_config_four",r)},expression:"ruleForm.rob_config_four"}}),e._v("（格式如：90,10,0,0,0）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"剩余10抢庄",prop:"rob_config_five"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.rob_config_five,callback:function(r){e.$set(e.ruleForm,"rob_config_five",r)},expression:"ruleForm.rob_config_five"}}),e._v("\n        （格式如：90,10,0,0,0）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"无牛下注",prop:"bet_config_one"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bet_config_one,callback:function(r){e.$set(e.ruleForm,"bet_config_one",r)},expression:"ruleForm.bet_config_one"}}),e._v("（格式如：90,10,0,0,0）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"剩余1,2,3下注",prop:"bet_config_two"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bet_config_two,callback:function(r){e.$set(e.ruleForm,"bet_config_two",r)},expression:"ruleForm.bet_config_two"}}),e._v("（格式如：90,10,0,0,0）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"剩余4,5,6下注",prop:"bet_config_three"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bet_config_three,callback:function(r){e.$set(e.ruleForm,"bet_config_three",r)},expression:"ruleForm.bet_config_three"}}),e._v("（格式如：90,10,0,0,0）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"剩余7,8,9下注",prop:"bet_config_four"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bet_config_four,callback:function(r){e.$set(e.ruleForm,"bet_config_four",r)},expression:"ruleForm.bet_config_four"}}),e._v("（格式如：90,10,0,0,0）\n      ")],1),e._v(" "),t("el-form-item",{attrs:{label:"剩余10下注",prop:"bet_config_five"}},[t("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"0"},model:{value:e.ruleForm.bet_config_five,callback:function(r){e.$set(e.ruleForm,"bet_config_five",r)},expression:"ruleForm.bet_config_five"}}),e._v("（格式如：90,10,0,0,0）\n      ")],1)],1)],1)],1)},staticRenderFns:[]};var f=t("C7Lr")(_,m,!1,function(e){t("RzTz")},"data-v-2d1eb368",null);r.default=f.exports},RzTz:function(e,r){}});
//# sourceMappingURL=57.768cff1b834ac5719844.js.map
webpackJsonp([85],{O64Z:function(e,t){},"x+7F":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("MgeX"),r=a.n(o),i=a("lC5x"),l=a.n(i),n=a("3cXf"),s=a.n(n),c=a("ZLEe"),u=a.n(c),d=a("J0Oq"),f=a.n(d),_=a("EuRQ"),m={name:"rainmaker_config",data:function(){return{tableData:[],visible:!1,form:{level:"",growth_value:"",award_coin:"",draw_num:"",icon_cash_cow_url:"xxxx",weight_info:""},rules:{level:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],growth_value:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],award_coin:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],draw_num:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],icon_cash_cow_url:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],weight_info:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},title:"新增等级",keys:"",id:"",allData:{},servebg_url:"",loading:!1}},created:function(){this.initData()},methods:{add:function(){this.editForm(!0,"新增",{})},send:function(e){var t=this;return f()(l.a.mark(function a(){var o,r,i,n;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return(o=Object(_.b)(t.tableData)).forEach(function(e){var t=e.weight_info,a=[],o={};if(-1!==t.search(",")){var r={};(a=t.split(",")).forEach(function(e,t){e=e.split("="),r[t+1]={coin:e[0],weight:e[1]}}),o=r}else{var i={};i[(a=t.split("=")).length-1]={coin:a[0],weight:a[1]},o=i}e.weight_info=o}),r={},o.forEach(function(e,t){r[t+1]=e}),u()(t.allData).forEach(function(e){"10003"===t.allData[e].ac_type&&(t.allData[e].ac_content.cash_cow=r)}),console.log(t.allData),a.next=8,t.$http.HallFunConfig.PostActivityNew33({keys:t.keys,values:s()(t.allData),id:t.id});case 8:i=a.sent,n=i.data,console.log(n),1===n.code&&"ok"===n.msg?1===e?(t.loading=!1,t.$message({type:"success",message:"保存成功!"})):(t.loading=!1,t.$message({type:"success",message:"发送服务器配置成功!"})):1===e?(t.loading=!1,t.$message({type:"success",message:"保存失败!"})):(t.loading=!1,t.$message({type:"warning",message:"发送服务器配置失败!"}));case 12:case"end":return a.stop()}},a,t)}))()},upLoad:function(e){var t=this,a=new FormData;a.append("filename",e.file),a.append("types",1),this.$http.post("v1/backend/upload",a).then(function(a){1===a.data.code&&"ok"===a.data.msg&&(t.servebg_url=a.data.path,t.form.icon_cash_cow_url=URL.createObjectURL(e))})},beforeAvatarUpload:function(e){e&&(this.form.icon_cash_cow_url=URL.createObjectURL(e))},onSubmit:function(){this.form.icon_cash_cow_url=this.servebg_url,this.tableData.push(this.form),this.send(1),this.editForm(!1,"新增",{})},back:function(){this.editForm(!1,"新增",{})},editForm:function(e,t,a){this.visible=e,this.title=t,this.form=a},initData:function(){var e=this;return f()(l.a.mark(function t(){var a,o,i;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetActivityNew33({key:"activity_new.lua"});case 2:a=t.sent,o=a.data,console.log(o),e.keys=o.data[0].sys_key,e.id=o.data[0].id,i=o.data[0].sys_val,e.allData=JSON.parse(i),console.log(e.allData),u()(e.allData).forEach(function(t){"10003"===e.allData[t].ac_type&&(e.tableData=r()(e.allData[t].ac_content.cash_cow))}),e.tableData.forEach(function(e){var t="";r()(e.weight_info).forEach(function(a){e.weight_info=t+=a.coin+"="+a.weight+",",e.weight_info=e.weight_info.substring(0,e.weight_info.lastIndexOf(","))})}),console.log(e.tableData,e.allData);case 13:case"end":return t.stop()}},t,e)}))()}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{id:"MoneyTree","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("添加")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"rainmaker_config_send",expression:"'rainmaker_config_send'"}],attrs:{type:"primary"},on:{click:function(t){return e.send(2)}}},[e._v("发送服务器配置")])],1),e._v(" "),a("div",{directives:[{name:"has",rawName:"v-has",value:"rainmaker_config_detail",expression:"'rainmaker_config_detail'"}],staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},[a("el-table-column",{attrs:{prop:"level",label:"等级",align:"center",width:"260","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"draw_num",label:"摇奖次数",align:"center",width:"260","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"icon_cash_cow_url",label:"摇钱树图标展示",align:"center",width:"260","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:e.$baseUrl+t.row.icon_cash_cow_url}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"award_coin",label:"全任务金币奖励",align:"center",width:"260","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"growth_value",label:"升级所属成长值",align:"center",width:"260","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"weight_info",label:"摇一摇奖励",align:"center",width:"260","show-overflow-tooltip":""}})],1)],1),e._v(" "),a("div",{staticClass:"form"},[a("el-dialog",{attrs:{title:e.title,visible:e.visible,"destroy-on-close":!0,width:"60%"},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"form",staticStyle:{"margin-top":"20px"},attrs:{rules:e.rules,model:e.form,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"摇钱树等级",prop:"level"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"摇钱树等级"},model:{value:e.form.level,callback:function(t){e.$set(e.form,"level",t)},expression:"form.level"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"升级所需成长值",prop:"growth_value"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"0"},model:{value:e.form.growth_value,callback:function(t){e.$set(e.form,"growth_value",t)},expression:"form.growth_value"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"抽奖次数",prop:"award_coin"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"0"},model:{value:e.form.award_coin,callback:function(t){e.$set(e.form,"award_coin",t)},expression:"form.award_coin"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"摇钱树图展示",prop:"icon_cash_cow_url"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","show-file-list":!1,"http-request":e.upLoad,"before-upload":e.beforeAvatarUpload,limit:1}},[e.form.icon_cash_cow_url?a("img",{staticClass:"avatar",attrs:{src:e.form.icon_cash_cow_url}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"全任务金币奖励数量",prop:"draw_num"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"0"},model:{value:e.form.draw_num,callback:function(t){e.$set(e.form,"draw_num",t)},expression:"form.draw_num"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"摇一摇金币奖励数量",prop:"weight_info"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"1=2 ... 以 , 分隔"},model:{value:e.form.weight_info,callback:function(t){e.$set(e.form,"weight_info",t)},expression:"form.weight_info"}}),e._v(" "),a("p",[e._v("(金额1=权重1,金额2=权重2,...以 , 分隔)")])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"rainmaker_config_save",expression:"'rainmaker_config_save'"}],attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("form",e.title)}}},[e._v("保 存")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.back()}}},[e._v("返 回")])],1)],1)],1)])},staticRenderFns:[]};var h=a("C7Lr")(m,p,!1,function(e){a("O64Z")},"data-v-14a58e7a",null);t.default=h.exports}});
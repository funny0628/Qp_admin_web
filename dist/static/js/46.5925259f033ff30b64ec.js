webpackJsonp([46],{oo9B:function(t,e){},"x+7F":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("MgeX"),l=a.n(o),r=a("lC5x"),i=a.n(r),n=a("3cXf"),s=a.n(n),c=a("ZLEe"),u=a.n(c),d=a("J0Oq"),f=a.n(d),p=a("EuRQ"),_={data:function(){return{tableData:[],visible:!1,form:{level:"",growth_value:"",award_coin:"",draw_num:"",icon_cash_cow_url:"xxxx",weight_info:""},rules:{level:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],growth_value:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],award_coin:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],draw_num:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],icon_cash_cow_url:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],weight_info:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},title:"新增等级",keys:"",id:"",allData:{},servebg_url:"",loading:!1}},created:function(){this.initData()},methods:{add:function(){this.editForm(!0,"新增",{})},send:function(t){var e=this;return f()(i.a.mark(function a(){var o,l,r,n;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return(o=Object(p.a)(e.tableData)).forEach(function(t){var e=t.weight_info,a=[],o={};if(-1!==e.search(",")){var l={};(a=e.split(",")).forEach(function(t,e){t=t.split("="),l[e+1]={coin:t[0],weight:t[1]}}),o=l}else{var r={};r[(a=e.split("=")).length-1]={coin:a[0],weight:a[1]},o=r}t.weight_info=o}),l={},o.forEach(function(t,e){l[e+1]=t}),u()(e.allData).forEach(function(t){"10003"===e.allData[t].ac_type&&(e.allData[t].ac_content.cash_cow=l)}),console.log(e.allData),a.next=8,e.$http.HallFunConfig.PostActivityNew3({keys:e.keys,values:s()(e.allData),id:e.id});case 8:r=a.sent,n=r.data,console.log(n),1===n.code&&"ok"===n.msg?1===t?(e.loading=!1,e.$message({type:"success",message:"保存成功!"})):(e.loading=!1,e.$message({type:"success",message:"发送服务器配置成功!"})):1===t?(e.loading=!1,e.$message({type:"success",message:"保存失败!"})):(e.loading=!1,e.$message({type:"warning",message:"发送服务器配置失败!"}));case 12:case"end":return a.stop()}},a,e)}))()},upLoad:function(t){var e=this,a=new FormData;a.append("filename",t.file),a.append("types",1),this.$http.post("v1/backend/upload",a).then(function(a){1===a.data.code&&"ok"===a.data.msg&&(e.servebg_url=a.data.path,e.form.icon_cash_cow_url=URL.createObjectURL(t))})},beforeAvatarUpload:function(t){t&&(this.form.icon_cash_cow_url=URL.createObjectURL(t))},onSubmit:function(){this.form.icon_cash_cow_url=this.servebg_url,this.tableData.push(this.form),this.send(1),this.editForm(!1,"新增",{})},back:function(){this.editForm(!1,"新增",{})},editForm:function(t,e,a){this.visible=t,this.title=e,this.form=a},initData:function(){var t=this;return f()(i.a.mark(function e(){var a,o,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.HallFunConfig.GetActivityNew3({key:"activity_new.lua"});case 2:a=e.sent,o=a.data,console.log(o),t.keys=o.data[0].sys_key,t.id=o.data[0].id,r=o.data[0].sys_val,t.allData=JSON.parse(r),console.log(t.allData),u()(t.allData).forEach(function(e){"10003"===t.allData[e].ac_type&&(t.tableData=l()(t.allData[e].ac_content.cash_cow))}),t.tableData.forEach(function(t){var e="";l()(t.weight_info).forEach(function(a){t.weight_info=e+=a.coin+"="+a.weight+",",t.weight_info=t.weight_info.substring(0,t.weight_info.lastIndexOf(","))})}),console.log(t.tableData,t.allData);case 13:case"end":return e.stop()}},e,t)}))()}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{id:"MoneyTree","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("el-button",{attrs:{type:"primary"},on:{click:t.add}},[t._v("添加")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.send(2)}}},[t._v("发送服务器配置")])],1),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},[a("el-table-column",{attrs:{prop:"level",label:"等级",align:"center",width:"260","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"draw_num",label:"摇奖次数",align:"center",width:"260","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"icon_cash_cow_url",label:"摇钱树图标展示",align:"center",width:"260","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{attrs:{src:t.$baseUrl+e.row.icon_cash_cow_url}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"award_coin",label:"全任务金币奖励",align:"center",width:"260","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"growth_value",label:"升级所属成长值",align:"center",width:"260","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"weight_info",label:"摇一摇奖励",align:"center",width:"260","show-overflow-tooltip":""}})],1)],1),t._v(" "),a("div",{staticClass:"form"},[a("el-dialog",{attrs:{title:t.title,visible:t.visible,"destroy-on-close":!0,width:"60%"},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"form",staticStyle:{"margin-top":"20px"},attrs:{rules:t.rules,model:t.form,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"摇钱树等级",prop:"level"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"摇钱树等级"},model:{value:t.form.level,callback:function(e){t.$set(t.form,"level",e)},expression:"form.level"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"升级所需成长值",prop:"growth_value"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"0"},model:{value:t.form.growth_value,callback:function(e){t.$set(t.form,"growth_value",e)},expression:"form.growth_value"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"抽奖次数",prop:"award_coin"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"0"},model:{value:t.form.award_coin,callback:function(e){t.$set(t.form,"award_coin",e)},expression:"form.award_coin"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"摇钱树图展示",prop:"icon_cash_cow_url"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","show-file-list":!1,"http-request":t.upLoad,"before-upload":t.beforeAvatarUpload,limit:1}},[t.form.icon_cash_cow_url?a("img",{staticClass:"avatar",attrs:{src:t.form.icon_cash_cow_url}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),a("el-form-item",{attrs:{label:"全任务金币奖励数量",prop:"draw_num"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"0"},model:{value:t.form.draw_num,callback:function(e){t.$set(t.form,"draw_num",e)},expression:"form.draw_num"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"摇一摇金币奖励数量",prop:"weight_info"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"1=2 ... 以 , 分隔"},model:{value:t.form.weight_info,callback:function(e){t.$set(t.form,"weight_info",e)},expression:"form.weight_info"}}),t._v(" "),a("p",[t._v("(金额1=权重1,金额2=权重2,...以 , 分隔)")])],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("form",t.title)}}},[t._v("保 存")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.back()}}},[t._v("返 回")])],1)],1)],1)])},staticRenderFns:[]};var m=a("C7Lr")(_,h,!1,function(t){a("oo9B")},"data-v-6771663f",null);e.default=m.exports}});
//# sourceMappingURL=46.5925259f033ff30b64ec.js.map
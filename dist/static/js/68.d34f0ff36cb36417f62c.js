webpackJsonp([68],{dMmZ:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("3cXf"),a=n.n(o),l=n("iVUn"),i=n("fftp"),s=n("zhQY"),c=n("Z/hU"),r=n("2u00"),u=(n("y35B"),n("22Zk")),f=n("06fe"),m=(c.a,f.a,u.a,l.a,i.a,r.a,{name:"BottomMenu",extends:c.a,components:{InfoTableItem:f.a,InputArea:u.a,SelectTime:l.a,InfoTable:i.a,PermissionButton:r.a},data:function(){return{isEditCheckChannel:!0,pagesize:5,currentPage:1,total:0,player_id:"",labelPosition:"left",dialogFormVisible:!1,dialogTitle:"",platforms:[{value:1,label:"平台1"},{value:2,label:"平台2"}],format:{platform:""},ChannelList:[],checkChannelCode:"",channel_code:"",funOpts:[],tableData:[],records:[],pageInfo:new s.a(0,[5,10,15],5),dialogAddVisible:!1,form:{id:null,checkList:[],function1:"留空",function2:"留空",function3:"留空",function4:"留空",function5:"留空",function6:"留空"}}},methods:{getBottomMenuList:function(){var t=this;this.$http.get("v1/backend/lobby/bottom",{params:{page:this.currentPage,limit:this.pagesize,type:1}}).then(function(e){console.log(e),1===e.data.code&&(t.tableData=e.data.data,t.total=e.data.total,t.func_list_index(),console.log(t.tableData))})},func_list_index:function(){this.tableData.map(function(t,e){JSON.parse(t.func_list).map(function(e,n){t["func_"+(n+1)]=e})})},resetForm:function(){this.form={id:null,checkList:[],function1:"留空",function2:"留空",function3:"留空",function4:"留空",function5:"留空",function6:"留空"}},openAddDialog:function(){this.dialogFormVisible=!0,this.dialogTitle="添加活动入口配置",this.resetForm(),this.getChannelList(),this.getFunNameList()},getFunNameList:function(){var t=this;this.$http.get("v1/backend/lobby/name_type",{params:{type_id:3}}).then(function(e){console.log(e),t.funOpts=e.data.data})},getChannelList:function(){var t=this;this.$http.get("v1/backend/no_channel").then(function(e){console.log(e),t.ChannelList=e.data.data})},getChannleCode:function(){var t=this;this.ChannelList.forEach(function(e,n){console.log(e),console.log(t.form.checkList),t.form.checkList[0]===e.channel_name&&(t.checkChannelCode=e.channel_code,console.log(t.checkChannelCode))})},addChannelFun:function(){var t=this;if(this.form.id){console.log("wojinlaile ");var e=(this.form.function1+","+this.form.function2+","+this.form.function3+","+this.form.function4+","+this.form.function5+","+this.form.function6).split(","),n={banner_id:this.form.id,name:this.form.checkList[0],code:this.form.checkList[0],list_id:a()(e),type:1};console.log(n),this.$http.put("v1/backend/lobby/bottom",n).then(function(e){console.log(e),1===e.data.code&&(t.dialogFormVisible=!1,t.getBottomMenuList())})}else{var o=(this.form.function1+","+this.form.function2+","+this.form.function3+","+this.form.function4+","+this.form.function5+","+this.form.function6).split(","),l={name:this.form.checkList[0],code:this.checkChannelCode,list_id:a()(o),type:1};this.$http.post("v1/backend/lobby/bottom",l).then(function(e){console.log(e),1===e.data.code&&(t.dialogFormVisible=!1,t.getBottomMenuList())})}},handleEdit:function(t){console.log(t),this.getChannelList(),this.getFunNameList(),this.dialogFormVisible=!0,this.dialogTitle="更新活动入口配置",this.form.checkList=[t.channel_name],this.form.id=t.id,this.form.function1=JSON.parse(t.func_list)[0],this.form.function2=JSON.parse(t.func_list)[1],this.form.function3=JSON.parse(t.func_list)[2],this.form.function4=JSON.parse(t.func_list)[3],this.form.function5=JSON.parse(t.func_list)[4],this.form.function6=JSON.parse(t.func_list)[5]},handleDelete:function(t){var e=this;console.log(t),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.delete("v1/backend/lobby/bottom",{params:{id:t.id}}).then(function(t){1===t.data.code&&(e.getBottomMenuList(),e.$message({type:"success",message:"删除成功!"}))})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(t){this.pagesize=t,this.getBottomMenuList()},handleCurrentChange:function(t){this.currentPage=t,this.getBottomMenuList()},search:function(){var t=this.format;this.userList(t,1e3)},addUser:function(){this.dialogAddVisible=!0},handelClick:function(t,e){"edit"===t.type&&(this.dialogFormVisible=!0)}},watch:{"form.checkList":function(t,e){console.log(t,e),t&&this.getChannleCode()}},mounted:function(){this.getBottomMenuList()}}),h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"BottomMenu-main"}},[n("input-area",[n("el-button",{attrs:{type:"primary"},on:{click:t.openAddDialog}},[t._v("添加")])],1),t._v(" "),n("div",{staticClass:"bd"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[n("el-table-column",{attrs:{prop:"id",label:"ID",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"channel_name",label:"渠道名称",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"channel_code",label:"渠道KEY",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"功能1",prop:"func_1",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"功能2",prop:"func_2",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"功能3",prop:"func_3",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"功能4",prop:"func_4",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"功能5",prop:"func_5",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"功能6",prop:"func_6",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作者",prop:"auth",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"创建时间",prop:"create_time",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"请求时间",prop:"update_time",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return t.handleEdit(e.row)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":t.currentPage,"page-sizes":[5,10,15,20],"page-size":t.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),n("div",[n("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[n("el-form",{attrs:{model:t.form,"label-position":"top"}},[n("el-form-item",{attrs:{label:"渠道(可多选)"}},[n("el-checkbox-group",{attrs:{max:1},model:{value:t.form.checkList,callback:function(e){t.$set(t.form,"checkList",e)},expression:"form.checkList"}},t._l(t.ChannelList,function(t,e){return n("el-checkbox",{key:e,attrs:{label:t.channel_name}})}),1)],1),t._v(" "),n("el-form-item",{attrs:{label:"功能1"}},[n("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[n("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),n("el-col",{attrs:{span:20}},[n("el-select",{model:{value:t.form.function1,callback:function(e){t.$set(t.form,"function1",e)},expression:"form.function1"}},t._l(t.funOpts,function(t,e){return n("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"功能2"}},[n("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[n("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),n("el-col",{attrs:{span:20}},[n("el-select",{model:{value:t.form.function2,callback:function(e){t.$set(t.form,"function2",e)},expression:"form.function2"}},t._l(t.funOpts,function(t,e){return n("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"功能3"}},[n("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[n("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),n("el-col",{attrs:{span:20}},[n("el-select",{model:{value:t.form.function3,callback:function(e){t.$set(t.form,"function3",e)},expression:"form.function3"}},t._l(t.funOpts,function(t,e){return n("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"功能4"}},[n("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[n("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),n("el-col",{attrs:{span:20}},[n("el-select",{model:{value:t.form.function4,callback:function(e){t.$set(t.form,"function4",e)},expression:"form.function4"}},t._l(t.funOpts,function(t,e){return n("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"功能5"}},[n("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[n("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),n("el-col",{attrs:{span:20}},[n("el-select",{model:{value:t.form.function5,callback:function(e){t.$set(t.form,"function5",e)},expression:"form.function5"}},t._l(t.funOpts,function(t,e){return n("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"功能6"}},[n("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[n("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),n("el-col",{attrs:{span:20}},[n("el-select",{model:{value:t.form.function6,callback:function(e){t.$set(t.form,"function6",e)},expression:"form.function6"}},t._l(t.funOpts,function(t,e){return n("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.addChannelFun}},[t._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var d=n("C7Lr")(m,h,!1,function(t){n("jm5a")},"data-v-14f51365",null);e.default=d.exports},jm5a:function(t,e){}});
//# sourceMappingURL=68.d34f0ff36cb36417f62c.js.map
webpackJsonp([42],{V6hT:function(t,n){},dMmZ:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("3cXf"),i=e.n(o),a=e("iVUn"),l=e("fftp"),s=e("zhQY"),c=e("Z/hU"),r=e("2u00"),u=(e("y35B"),e("22Zk")),f=e("06fe"),m=(c.a,f.a,u.a,a.a,l.a,r.a,{name:"button_menu_config",extends:c.a,components:{InfoTableItem:f.a,InputArea:u.a,SelectTime:a.a,InfoTable:l.a,PermissionButton:r.a},data:function(){return{isEditCheckChannel:!0,pagesize:10,currentPage:1,total:0,player_id:"",labelPosition:"left",dialogFormVisible:!1,dialogTitle:"",platforms:[{value:1,label:"平台1"},{value:2,label:"平台2"}],format:{platform:""},ChannelList:[],checkChannelCode:"",channel_code:"",funOpts:[],tableData:[],records:[],pageInfo:new s.a(0,[5,10,15],5),dialogAddVisible:!1,form:{id:null,checkList:[],function1:"",function2:"",function3:"",function4:"",function5:"",function6:"",function7:"",function8:""}}},methods:{formatFuncName:function(t){for(var n=0;n<this.funOpts.length;n++){var e=this.funOpts[n];if(e.id==t)return e.name}},getBottomMenuList:function(){var t=this;this.$http.get("v1/backend/lobby/bottom",{params:{page:this.currentPage,limit:this.pagesize,type:1}}).then(function(n){console.log(n),1===n.data.code&&(t.tableData=n.data.data,t.total=n.data.total,t.func_list_index(),console.log(t.tableData))})},func_list_index:function(){this.tableData.map(function(t,n){JSON.parse(t.func_list).map(function(n,e){t["func_"+(e+1)]=n})})},resetForm:function(){this.form={id:null,checkList:[],function1:"",function2:"",function3:"",function4:"",function5:"",function6:"",function7:"",function8:""}},openAddDialog:function(){this.dialogFormVisible=!0,this.dialogTitle="添加活动入口配置",this.resetForm(),this.getChannelList(),this.form.function1=String(this.funOpts[0].id),this.form.function2=String(this.funOpts[0].id),this.form.function3=String(this.funOpts[0].id),this.form.function4=String(this.funOpts[0].id),this.form.function5=String(this.funOpts[0].id),this.form.function6=String(this.funOpts[0].id),this.form.function7=String(this.funOpts[0].id),this.form.function8=String(this.funOpts[0].id)},getFunNameList:function(){var t=this;this.$http.get("v1/backend/lobby/name_type",{params:{type_id:4}}).then(function(n){console.log(n),t.funOpts=n.data.data})},getChannelList:function(){var t=this;this.$http.post("v1/backend/no_channel",{type_id:1,add_id:3}).then(function(n){console.log(n),t.ChannelList=n.data.data})},getAllChannelList:function(){var t=this;this.$http.post("v1/backend/no_channel",{type_id:2,add_id:3}).then(function(n){console.log(n),t.ChannelList=n.data.data})},getChannleCode:function(){var t=this;this.ChannelList.forEach(function(n,e){t.form.checkList[0]===n.channel_name&&(t.checkChannelCode=n.channel_code,console.log(t.checkChannelCode))})},addChannelFun:function(){var t=this;if(this.form.id){console.log("wojinlaile ");var n=(this.form.function1+","+this.form.function2+","+this.form.function3+","+this.form.function4+","+this.form.function5+","+this.form.function6+","+this.form.function7+","+this.form.function8).split(","),e={banner_id:this.form.id,name:this.form.checkList[0],code:this.form.checkList[0],list_id:i()(n),type:1};console.log(e),this.$http.put("v1/backend/lobby/bottom",e).then(function(n){console.log(n),1===n.data.code&&(t.dialogFormVisible=!1,t.getBottomMenuList())})}else{var o=(this.form.function1+","+this.form.function2+","+this.form.function3+","+this.form.function4+","+this.form.function5+","+this.form.function6+","+this.form.function7+","+this.form.function8).split(","),a={name:this.form.checkList[0],code:this.checkChannelCode,list_id:i()(o),type:1};this.$http.post("v1/backend/lobby/bottom",a).then(function(n){console.log(n),1===n.data.code&&(t.dialogFormVisible=!1,t.getBottomMenuList())})}},handleEdit:function(t){console.log(t),this.getAllChannelList(),this.dialogFormVisible=!0,this.dialogTitle="更新活动入口配置",this.form.checkList=[t.channel_name],this.form.id=t.id,this.form.function1=t.func_1,this.form.function2=t.func_2,this.form.function3=t.func_3,this.form.function4=t.func_4,this.form.function5=t.func_5,this.form.function6=t.func_6,this.form.function7=t.func_7,this.form.function8=t.func_8},handleDelete:function(t){var n=this;console.log(t),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.$http.delete("v1/backend/lobby/bottom",{params:{id:t.id}}).then(function(t){1===t.data.code&&(n.getBottomMenuList(),n.$message({type:"success",message:"删除成功!"}))})}).catch(function(){n.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(t){this.pagesize=t,this.getBottomMenuList()},handleCurrentChange:function(t){this.currentPage=t,this.getBottomMenuList()},search:function(){var t=this.format;this.userList(t,1e3)},addUser:function(){this.dialogAddVisible=!0},handelClick:function(t,n){"edit"===t.type&&(this.dialogFormVisible=!0)}},watch:{"form.checkList":function(t,n){t&&this.getChannleCode()}},mounted:function(){this.getBottomMenuList()},created:function(){this.getFunNameList()}}),h={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"BottomMenu-main"}},[e("input-area",[e("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_button_menu_config",expression:"'add_button_menu_config'"}],attrs:{type:"primary"},on:{click:t.openAddDialog}},[t._v("添加")])],1),t._v(" "),e("div",{staticClass:"bd"},[e("el-table",{directives:[{name:"has",rawName:"v-has",value:"button_menu_config_list",expression:"'button_menu_config_list'"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[e("el-table-column",{attrs:{prop:"id",label:"ID",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"channel_name",label:"渠道名称",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"channel_code",label:"渠道KEY",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{label:"功能1",prop:"func_1",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("span",[t._v(t._s(t.formatFuncName(n.row.func_1)))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"功能2",prop:"func_2",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("span",[t._v(t._s(t.formatFuncName(n.row.func_2)))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"功能3",prop:"func_3",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("span",[t._v(t._s(t.formatFuncName(n.row.func_3)))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"功能4",prop:"func_4",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("span",[t._v(t._s(t.formatFuncName(n.row.func_4)))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"功能5",prop:"func_5",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("span",[t._v(t._s(t.formatFuncName(n.row.func_5)))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"功能6",prop:"func_6",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("span",[t._v(t._s(t.formatFuncName(n.row.func_6)))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"功能7",prop:"func_7",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("span",[t._v(t._s(t.formatFuncName(n.row.func_7)))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"功能8",prop:"func_8",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("span",[t._v(t._s(t.formatFuncName(n.row.func_8)))])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"操作者",prop:"auth",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{label:"创建时间",prop:"create_time",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{label:"请求时间",prop:"update_time",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_button_menu_config",expression:"'modify_button_menu_config'"}],attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.handleEdit(n.row)}}},[t._v("编辑")]),t._v(" "),e("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_button_menu_config",expression:"'delete_button_menu_config'"}],attrs:{size:"mini",type:"danger"},on:{click:function(e){return t.handleDelete(n.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),e("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":t.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),e("div",[e("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(n){t.dialogFormVisible=n}}},[e("el-form",{attrs:{model:t.form,"label-position":"top"}},[e("el-form-item",{attrs:{label:"渠道(可多选)"}},[e("el-checkbox-group",{attrs:{max:1},model:{value:t.form.checkList,callback:function(n){t.$set(t.form,"checkList",n)},expression:"form.checkList"}},t._l(t.ChannelList,function(t,n){return e("el-checkbox",{key:n,attrs:{label:t.channel_name}})}),1)],1),t._v(" "),e("el-form-item",{attrs:{label:"功能1"}},[e("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),e("el-col",{attrs:{span:20}},[e("el-select",{model:{value:t.form.function1,callback:function(n){t.$set(t.form,"function1",n)},expression:"form.function1"}},t._l(t.funOpts,function(n,o){return e("el-option",{key:o,attrs:{label:n.name,value:String(n.id)}},[t._v(t._s(n.name))])}),1)],1)],1)],1),t._v(" "),e("el-form-item",{attrs:{label:"功能2"}},[e("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),e("el-col",{attrs:{span:20}},[e("el-select",{model:{value:t.form.function2,callback:function(n){t.$set(t.form,"function2",n)},expression:"form.function2"}},t._l(t.funOpts,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:String(t.id)}})}),1)],1)],1)],1),t._v(" "),e("el-form-item",{attrs:{label:"功能3"}},[e("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),e("el-col",{attrs:{span:20}},[e("el-select",{model:{value:t.form.function3,callback:function(n){t.$set(t.form,"function3",n)},expression:"form.function3"}},t._l(t.funOpts,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:String(t.id)}})}),1)],1)],1)],1),t._v(" "),e("el-form-item",{attrs:{label:"功能4"}},[e("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),e("el-col",{attrs:{span:20}},[e("el-select",{model:{value:t.form.function4,callback:function(n){t.$set(t.form,"function4",n)},expression:"form.function4"}},t._l(t.funOpts,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:String(t.id)}})}),1)],1)],1)],1),t._v(" "),e("el-form-item",{attrs:{label:"功能5"}},[e("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),e("el-col",{attrs:{span:20}},[e("el-select",{model:{value:t.form.function5,callback:function(n){t.$set(t.form,"function5",n)},expression:"form.function5"}},t._l(t.funOpts,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:String(t.id)}})}),1)],1)],1)],1),t._v(" "),e("el-form-item",{attrs:{label:"功能6"}},[e("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),e("el-col",{attrs:{span:20}},[e("el-select",{model:{value:t.form.function6,callback:function(n){t.$set(t.form,"function6",n)},expression:"form.function6"}},t._l(t.funOpts,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:String(t.id)}})}),1)],1)],1)],1),t._v(" "),e("el-form-item",{attrs:{label:"功能7"}},[e("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),e("el-col",{attrs:{span:20}},[e("el-select",{model:{value:t.form.function7,callback:function(n){t.$set(t.form,"function7",n)},expression:"form.function7"}},t._l(t.funOpts,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:String(t.id)}})}),1)],1)],1)],1),t._v(" "),e("el-form-item",{attrs:{label:"功能8"}},[e("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("功能名称")]),t._v(" "),e("el-col",{attrs:{span:20}},[e("el-select",{model:{value:t.form.function8,callback:function(n){t.$set(t.form,"function8",n)},expression:"form.function8"}},t._l(t.funOpts,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:String(t.id)}})}),1)],1)],1)],1)],1),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(n){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.addChannelFun}},[t._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var d=e("C7Lr")(m,h,!1,function(t){e("V6hT")},"data-v-58bd8242",null);n.default=d.exports}});
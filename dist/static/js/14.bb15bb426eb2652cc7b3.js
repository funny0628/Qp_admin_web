webpackJsonp([14],{XsCA:function(t,e){},zAmQ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("3cXf"),o=a.n(i),l=a("iVUn"),n=a("fftp"),s=a("zhQY"),r=a("Z/hU"),c=a("2u00"),f=(a("y35B"),a("22Zk")),u=a("06fe"),p=(r.a,u.a,f.a,l.a,n.a,c.a,{name:"FunSortConf",extends:r.a,components:{InfoTableItem:u.a,InputArea:f.a,SelectTime:l.a,InfoTable:n.a,PermissionButton:c.a},data:function(){return{pagesize:5,currentPage:1,total:0,dialogTitle:"",value:!0,labelPosition:"left",dialogFormVisible:!1,platforms:[{value:1,label:"平台1"},{value:2,label:"平台2"}],format:{platform:""},funOpts:[],channelOpts:[],tableStyle:[{label:"ID",prop:"id",width:""},{label:"渠道名称",prop:"channel_name",width:""},{label:"渠道KEY",prop:"channel_code",width:""},{label:"活动1",prop:"func_1",width:""},{label:"活动2",prop:"func_2",width:""},{label:"活动3",prop:"func_3",width:""},{label:"活动4",prop:"func_4",width:""},{label:"活动5",prop:"func_5",width:""},{label:"活动6",prop:"func_6",width:""},{label:"操作者",prop:"auth",width:""},{label:"创建时间",prop:"create_time",width:"160"},{label:"操作",prop:"action",width:"150"}],records:[],pageInfo:new s.a(0,[5,10,15],5),dialogAddVisible:!1,form:{checkList:[],active_1:"留空",active_2:"留空",active_3:"留空",active_4:"留空",active_5:"留空",active_6:"留空"}}},methods:{resetForm:function(){this.form={id:null,checkList:[],active_1:"留空",active_2:"留空",active_3:"留空",active_4:"留空",active_5:"留空",active_6:"留空"}},getFunSortList:function(){var t=this;this.$http.get("v1/backend/lobby/bottom",{params:{page:this.currentPage,limit:this.pagesize,type:2}}).then(function(e){console.log(e),1===e.data.code&&(t.records=e.data.data,t.total=e.data.total,t.func_list_index(),console.log(t.records))})},func_list_index:function(){this.records.map(function(t,e){JSON.parse(t.func_list).map(function(e,a){t["func_"+(a+1)]=e})})},search:function(){},openAddDialog:function(){this.dialogTitle="添加活动入口配置",this.dialogFormVisible=!0,this.resetForm(),this.getActiveOpts(),this.getChannelList()},addFunSortConf:function(){var t=this;if(this.form.id){var e=(this.form.active_1+","+this.form.active_2+","+this.form.active_3+","+this.form.active_4+","+this.form.active_5+","+this.form.active_6).split(","),a={name:this.form.checkList[0],code:this.form.checkList[0],list_id:o()(e),type:2,banner_id:this.form.id};this.$http.put("v1/backend/lobby/bottom",a).then(function(e){console.log(e),1===e.data.code&&(t.dialogFormVisible=!1,t.getFunSortList())})}else{var i=(this.form.active_1+","+this.form.active_2+","+this.form.active_3+","+this.form.active_4+","+this.form.active_5+","+this.form.active_6).split(","),l={name:this.form.checkList[0],code:this.form.checkList[0],list_id:o()(i),type:2};this.$http.post("v1/backend/lobby/bottom",l).then(function(e){console.log(e),1===e.data.code&&(t.dialogFormVisible=!1,t.getFunSortList())})}},handleEdit:function(t){console.log(t),this.dialogTitle="更新活动入口配置",this.dialogFormVisible=!0,this.getActiveOpts(),this.getChannelList(),this.form.id=t.id,this.form.checkList=[t.channel_name],this.form.active_1=JSON.parse(t.func_list)[0],this.form.active_2=JSON.parse(t.func_list)[1],this.form.active_3=JSON.parse(t.func_list)[2],this.form.active_4=JSON.parse(t.func_list)[3],this.form.active_5=JSON.parse(t.func_list)[4],this.form.active_6=JSON.parse(t.func_list)[5]},handleDelete:function(t){var e=this;console.log(t),this.$confirm("确认删除吗？","信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.delete("v1/backend/lobby/bottom",{params:{id:t.id}}).then(function(t){console.log(t),1===t.data.code&&(e.getFunSortList(),e.$message({type:"success",message:t.data.msg}))})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},getChannelList:function(){var t=this;console.log("我调用了吗","getChannelList"),this.$http.get("v1/backend/no_channel",{params:{type_id:2}}).then(function(e){console.log(e),1===e.data.code&&(t.channelOpts=e.data.data)})},getActiveOpts:function(){var t=this;console.log("我调用了吗","getActiveOpts"),this.$http.get("v1/backend/lobby/name_type",{params:{type_id:3}}).then(function(e){console.log(e),1===e.data.code&&(t.funOpts=e.data.data)})},handleSizeChange:function(t){this.pagesize=t,this.currentPage=1,this.getFunSortList()},handleCurrentChange:function(t){this.currentPage=t,this.getFunSortList()}},mounted:function(){this.getFunSortList()}}),h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"FunSortConf-main"}},[a("input-area",[a("el-button",{attrs:{type:"primary"},on:{click:t.openAddDialog}},[t._v("添加")])],1),t._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:t.search,"table-style":t.tableStyle,records:t.records,"page-info":t.pageInfo,"hide-page":!0}},[a("info-table-item",{attrs:{"table-style":t.tableStyle},scopedSlots:t._u([{key:"default",fn:function(e){return["action"===e.prop?[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.handleEdit(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleDelete(e.row)}}},[t._v("删除")])]:t._e(),t._v(" "),["action","func_list"].indexOf(e.prop)<0?[t._v(t._s(e.row[e.prop]))]:t._e()]}}])})],1),t._v(" "),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":t.currentPage,"page-sizes":[5,10,15,20],"page-size":t.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("div",[a("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{attrs:{model:t.form,"label-position":"top"}},[a("el-form-item",{attrs:{label:"渠道(可多选)"}},[a("el-checkbox-group",{attrs:{max:1},model:{value:t.form.checkList,callback:function(e){t.$set(t.form,"checkList",e)},expression:"form.checkList"}},t._l(t.channelOpts,function(e,i){return a("el-checkbox",{key:i,attrs:{label:e.channel_code}},[t._v(t._s(e.channel_name))])}),1),t._v(" "),a("div",[t._v(t._s(t.form.checkList))])],1),t._v(" "),a("el-form-item",{attrs:{label:"活动1"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("活动名称")]),t._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:t.form.active_1,callback:function(e){t.$set(t.form,"active_1",e)},expression:"form.active_1"}},t._l(t.funOpts,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"活动2"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("活动名称")]),t._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:t.form.active_2,callback:function(e){t.$set(t.form,"active_2",e)},expression:"form.active_2"}},t._l(t.funOpts,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"活动3"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("活动名称")]),t._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:t.form.active_3,callback:function(e){t.$set(t.form,"active_3",e)},expression:"form.active_3"}},t._l(t.funOpts,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"活动4"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("活动名称")]),t._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:t.form.active_4,callback:function(e){t.$set(t.form,"active_4",e)},expression:"form.active_4"}},t._l(t.funOpts,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"活动5"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("活动名称")]),t._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:t.form.active_5,callback:function(e){t.$set(t.form,"active_5",e)},expression:"form.active_5"}},t._l(t.funOpts,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"活动6"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[t._v("活动名称")]),t._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:t.form.active_6,callback:function(e){t.$set(t.form,"active_6",e)},expression:"form.active_6"}},t._l(t.funOpts,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.name}})}),1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addFunSortConf}},[t._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var d=a("C7Lr")(p,h,!1,function(t){a("XsCA")},"data-v-e3e9dd14",null);e.default=d.exports}});
//# sourceMappingURL=14.bb15bb426eb2652cc7b3.js.map
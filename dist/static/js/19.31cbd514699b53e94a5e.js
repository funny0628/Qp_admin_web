webpackJsonp([19],{"/KwP":function(e,a){},OYEc:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("iVUn"),o=t("fftp"),i=t("zhQY"),l=t("Z/hU"),s=t("2u00"),c=(t("y35B"),t("22Zk")),r=t("06fe"),m=(l.a,r.a,c.a,n.a,o.a,s.a,{name:"channels",extends:l.a,components:{InfoTableItem:r.a,InputArea:c.a,SelectTime:n.a,InfoTable:o.a,PermissionButton:s.a},data:function(){return{currentPage:1,pagesize:10,total:0,dialogTitle:"",formLabelWidth:"120px",companyList:[],format:{company:"",searchChannel:""},tableStyle:[{label:"ID",prop:"id",width:""},{label:"渠道名",prop:"name",width:""},{label:"代码",prop:"code",width:""},{label:"关联总代id",prop:"uid",width:""},{label:"隶属公司",prop:"cname",width:""},{label:"创建时间",prop:"created_time",width:""},{label:"修改时间",prop:"modified_time",width:""},{label:"操作",prop:"action",width:"150"}],records:[],pageInfo:new i.a(0,[5,10,15],5),dialogFormVisible:!1,dialogVisible:!1,form:{channel_name:"",channel_id:"",belong_company:""},form1:{company_name:""}}},methods:{resetForm:function(){this.form={channel_name:"",channel_id:"",belong_company:""}},getChannelList:function(){var e=this;this.$http.get("v1/backend/operation/channels",{params:{page:this.currentPage,limit:this.pagesize,company:this.format.company,channel_name:this.format.searchChannel}}).then(function(a){console.log(a),200===a.data.code&&(e.records=a.data.data,e.total=a.data.total)})},searchData:function(){this.getChannelList()},getCompanyList:function(){var e=this;this.$http.get("v1/backend/operation/channel/company").then(function(a){console.log(a),200===a.data.code&&(e.companyList=a.data.data)})},openAddDialog:function(){this.resetForm(),this.dialogTitle="添加渠道",this.dialogFormVisible=!0},openAddComDialog:function(){this.dialogVisible=!0,this.form1.company_name=""},addCompany:function(){var e=this,a={name:this.form1.company_name};this.$http.post("v1/backend/operation/channel/company",a).then(function(a){console.log(a),200===a.data.code&&(e.dialogVisible=!1,e.getCompanyList(),e.$message({type:"success",message:a.data.msg}))})},addChannel:function(){var e=this;if(this.form.id){console.log("wojinolei");var a={channel_name:this.form.channel_name,channel_num:this.form.channel_id,company:this.form.belong_company,channel_id:this.form.id};this.$http.put("v1/backend/operation/channels",a).then(function(a){console.log(a),200===a.data.code&&(e.dialogFormVisible=!1,e.getChannelList(),e.$message({type:"success",message:a.data.msg}))})}else{var t={channel_name:this.form.channel_name,channel_num:this.form.channel_id,company:this.form.belong_company};this.$http.post("v1/backend/operation/channels",t).then(function(a){console.log(a),200===a.data.code&&(e.dialogFormVisible=!1,e.getChannelList(),e.$message({type:"success",message:a.data.msg}))})}},search:function(){},handleEdit:function(e,a){console.log(e,a),this.dialogTitle="编辑渠道",this.dialogFormVisible=!0,this.form.id=a.id,this.form.channel_name=a.name,this.form.channel_id=a.code,this.form.belong_company=a.cname},handleDelete:function(e,a){var t=this;console.log(a),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.delete("v1/backend/operation/channels",{params:{channel_id:a.id}}).then(function(e){console.log(e),200===e.data.code&&(t.getChannelList(),t.$message({type:"success",message:e.data.msg}))})}).catch(function(){t.$message({type:"info",message:res.data.msg})})},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.pagesize=e,this.getChannelList()},handleCurrentChange:function(e){console.log("当前页: "+e),this.currentPage=e,this.getChannelList()}},mounted:function(){this.getChannelList(),this.getCompanyList()}}),d={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"ChannelList-main"}},[t("input-area",[t("div",{staticStyle:{"margin-bottom":"10px"}},[t("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_channel",expression:"'add_channel'"}],attrs:{type:"primary",size:"medium"},on:{click:e.openAddDialog}},[e._v("添加")]),e._v(" "),t("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.openAddComDialog}},[e._v("添加公司")])],1),e._v(" "),t("span",[e._v("公司")]),e._v(" "),t("el-select",{attrs:{clearable:"",placeholder:"请选择公司",size:"medium"},model:{value:e.format.company,callback:function(a){e.$set(e.format,"company",a)},expression:"format.company"}},e._l(e.companyList,function(e){return t("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})}),1),e._v(" "),t("span",[e._v("渠道")]),e._v(" "),t("el-input",{staticStyle:{width:"20%"},attrs:{autocomplete:"off",placeholder:"请输入渠道名"},model:{value:e.format.searchChannel,callback:function(a){e.$set(e.format,"searchChannel",a)},expression:"format.searchChannel"}}),e._v(" "),t("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.searchData}},[e._v("搜索")])],1),e._v(" "),t("div",{staticClass:"bd"},[t("info-table",{directives:[{name:"has",rawName:"v-has",value:"channel_list",expression:"'channel_list'"}],attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo,hidePage:!0}},[t("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(a){return["action"===a.prop?[t("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_channel",expression:"'modify_channel'"}],attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.handleEdit(a.$index,a.row)}}},[e._v("编辑")]),e._v(" "),t("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_channel",expression:"'delete_channel'"}],attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(a.$index,a.row)}}},[e._v("删除")])]:e._e(),e._v(" "),["action"].indexOf(a.prop)<0?[e._v(e._s(a.row[a.prop]))]:e._e()]}}])})],1),e._v(" "),t("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),t("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible,width:"30%"},on:{"update:visible":function(a){e.dialogFormVisible=a}}},[t("el-form",{attrs:{model:e.form}},[t("el-form-item",{attrs:{label:"渠道名","label-width":e.formLabelWidth}},[t("el-input",{attrs:{autocomplete:"off",placeholder:"请输入渠道名"},model:{value:e.form.channel_name,callback:function(a){e.$set(e.form,"channel_name",a)},expression:"form.channel_name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"渠道编号","label-width":e.formLabelWidth}},[t("el-input",{attrs:{autocomplete:"off",placeholder:"请输入渠道编号"},model:{value:e.form.channel_id,callback:function(a){e.$set(e.form,"channel_id",a)},expression:"form.channel_id"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"所属公司","label-width":e.formLabelWidth}},[t("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"请选择"},model:{value:e.form.belong_company,callback:function(a){e.$set(e.form,"belong_company",a)},expression:"form.belong_company"}},e._l(e.companyList,function(e){return t("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})}),1)],1)],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.addChannel}},[e._v("确 定")])],1)],1),e._v(" "),t("el-dialog",{attrs:{title:"添加公司",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(a){e.dialogVisible=a}}},[t("el-form",{attrs:{model:e.form}},[t("el-form-item",{attrs:{label:"公司名","label-width":e.formLabelWidth}},[t("el-input",{attrs:{autocomplete:"off",placeholder:"请输入公司名"},model:{value:e.form1.company_name,callback:function(a){e.$set(e.form1,"company_name",a)},expression:"form1.company_name"}})],1)],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.addCompany}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var h=t("C7Lr")(m,d,!1,function(e){t("/KwP")},"data-v-79fac521",null);a.default=h.exports}});
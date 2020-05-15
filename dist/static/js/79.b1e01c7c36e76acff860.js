webpackJsonp([79],{hrU5:function(t,e){},oabC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("22Zk"),o=(i.a,{name:"ip_blacklist",components:{InputArea:i.a},data:function(){return{disabled:!1,search_ip:"",currentPage:1,pageSize:10,total:0,dialogTitle:"",formLabelWidth:"120px",dialogFormVisible:!1,tableData:[],form:{forbid_ip:"",type:"1",remark:""}}},filters:{formatStatus:function(t){return 1===t?"解禁":"封号"}},methods:{resetForm:function(){this.form={id:null,forbid_ip:"",type:"1",remark:""}},getBlackList:function(){var t=this;this.$http.get("v1/backend/sys-conf/ip-blacklist",{params:{page:this.currentPage,limit:this.pageSize}}).then(function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data,t.total=e.data.total)})},searchData:function(){var t=this;this.$http.get("v1/backend/sys-conf/ip-blacklist",{params:{page:this.currentPage,limit:this.pageSize,ip:this.search_ip}}).then(function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data,t.total=e.data.total)})},addBlackList:function(){var t=this;if(this.form.id){var e={ip:this.form.forbid_ip,op_type:Number(this.form.type),remarks:this.form.remark};this.$http.post("v1/backend/sys-conf/ip-blacklist",e).then(function(e){console.log(e),200===e.data.code&&(t.dialogFormVisible=!1,t.getBlackList(),t.$message({type:"success",message:e.data.msg}))})}else{var a={ip:this.form.forbid_ip,op_type:Number(this.form.type),remarks:this.form.remark};this.$http.post("v1/backend/sys-conf/ip-blacklist",a).then(function(e){console.log(e),200===e.data.code&&(t.dialogFormVisible=!1,t.getBlackList(),t.$message({type:"success",message:e.data.msg}))})}},openAddDialog:function(){this.resetForm(),this.disabled=!1,this.dialogTitle="添加控制名单",this.dialogFormVisible=!0},handleEdit:function(t){console.log(t),this.dialogTitle="编辑",this.dialogFormVisible=!0,this.form.id=t.id,this.form.forbid_ip=t.lock_data,this.form.type=String(t.lock_status),this.form.remark=t.memo},change:function(){this.form.id&&(this.disabled=!0)},updateStatus:function(t){var e=this;console.log(t);var a={id:t.id,lock_status:0===t.lock_status?1:0};this.$http.put("v1/backend/sys-conf/ip-blacklist",a).then(function(t){console.log(t),200===t.data.code&&(e.getBlackList(),e.$message({type:"success",message:t.data.msg}))})},handleSizeChange:function(t){this.pageSize=t,this.getBlackList()},handleCurrentChange:function(t){this.currentPage=t,this.getBlackList()}},mounted:function(){this.getBlackList()}}),l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"blackList-main"}},[a("input-area",[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_ip_blacklist",expression:"'add_ip_blacklist'"}],attrs:{type:"primary",size:"medium"},on:{click:t.openAddDialog}},[t._v("添加")]),t._v(" "),a("div",[a("span",[t._v("ip")]),t._v(" "),a("el-input",{staticStyle:{width:"20%","margin-top":"10px"},attrs:{placeholder:"请输入ip"},model:{value:t.search_ip,callback:function(e){t.search_ip=e},expression:"search_ip"}}),t._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.searchData}},[t._v("查找")])],1)],1),t._v(" "),a("div",{staticClass:"bd"},[a("el-table",{directives:[{name:"has",rawName:"v-has",value:"ip_blacklist_records",expression:"'ip_blacklist_records'"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:t.tableData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"id",label:"ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"lock_data",label:"禁止",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"lock_status",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.lock_status?a("span",[t._v("封号")]):t._e(),t._v(" "),0===e.row.lock_status?a("span",[t._v("解禁")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"memo",label:"备注",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"op_name",label:"最后修改的操作人",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"op_time",label:"操作时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("dateFormat")(e.row.op_time)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"action",label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.lock_status?a("el-button",{directives:[{name:"has",rawName:"v-has",value:"forbidden_ip_blacklist",expression:"'forbidden_ip_blacklist'"}],staticStyle:{"background-color":"#30a99d",color:"#fff"},attrs:{size:"mini"},on:{click:function(a){return t.updateStatus(e.row)}}},[t._v(t._s(t._f("formatStatus")(e.row.lock_status)))]):t._e(),t._v(" "),0===e.row.lock_status?a("el-button",{directives:[{name:"has",rawName:"v-has",value:"unforbidden_ip_blacklist",expression:"'unforbidden_ip_blacklist'"}],staticStyle:{"background-color":"#fc7658",color:"#fff"},attrs:{size:"mini"},on:{click:function(a){return t.updateStatus(e.row)}}},[t._v(t._s(t._f("formatStatus")(e.row.lock_status)))]):t._e(),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_ip_blacklist",expression:"'modify_ip_blacklist'"}],staticStyle:{"background-color":"#30a99d",color:"#fff"},attrs:{size:"mini"},on:{click:function(a){t.handleEdit(e.row),t.change()}}},[t._v("编辑")])]}}])})],1),t._v(" "),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{attrs:{model:t.form}},[a("el-form-item",{attrs:{label:"被禁ip","label-width":t.formLabelWidth}},[a("el-input",{ref:"forbidEle",attrs:{autocomplete:"off",disabled:t.disabled},model:{value:t.form.forbid_ip,callback:function(e){t.$set(t.form,"forbid_ip",e)},expression:"form.forbid_ip"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"类型","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},[a("el-option",{attrs:{label:"封号",value:"1"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"备注","label-width":t.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addBlackList}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=a("C7Lr")(o,l,!1,function(t){a("hrU5")},"data-v-238b0ba0",null);e.default=s.exports}});
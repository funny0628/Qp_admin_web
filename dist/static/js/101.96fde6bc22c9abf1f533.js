webpackJsonp([101],{lver:function(e,t){},wqZ8:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("lC5x"),o=a.n(n),i=a("J0Oq"),s=a.n(i),r=a("22Zk"),l=(r.a,{name:"userList",components:{InputArea:r.a},data:function(){return{currentPage:1,pagesize:5,total:0,dialogAddRole:!1,dialogTitle:"",formLabelWidth:"120px",roleId:-1,form:{role_id:-1,name:"",display_name:""},form2:{role:""},dialogRoleAssign:!1,dialogRightAssign:!1,tableData:[],multipleSelection:[],rightData:[],defaultProps:{children:"children",label:"display_name"},checkedKeys:[],currentRole:{}}},methods:{getRoleList:function(){var e=this;return s()(o.a.mark(function t(){var a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("v1/backend/auth/roles",{params:{page:e.currentPage,limit:e.pagesize}});case 2:a=t.sent,console.log(a),200===a.data.code?(e.tableData=a.data.data,e.total=a.data.data.total,e.$message({type:"success",message:a.data.msg})):e.$message({type:"info",message:a.data.msg});case 5:case"end":return t.stop()}},t,e)}))()},getRigthList:function(){var e=this;return s()(o.a.mark(function t(){var a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("v1/backend/auth/permissions");case 2:a=t.sent,console.log(a);case 4:case"end":return t.stop()}},t,e)}))()},addRoleFn:function(){var e=this;return s()(o.a.mark(function t(){var a,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.form.role_id){t.next=7;break}return t.next=3,e.$http.post("v1/backend/auth/roles",{name:e.form.name,display_name:e.form.display_name});case 3:200===(a=t.sent).data.code?(e.dialogAddRole=!1,e.getRoleList(),e.$message({type:"success",message:a.data.msg})):e.$message({type:"info",message:a.data.msg}),t.next=13;break;case 7:return console.log(e.form),t.next=10,e.$http.put("v1/backend/auth/roles",{name:e.form.name,display_name:e.form.display_name,role_id:e.form.role_id});case 10:n=t.sent,console.log(n),200===n.data.code?(e.dialogAddRole=!1,e.getRoleList(),e.$message({type:"success",message:n.data.msg})):e.$message({type:"info",message:n.data.msg});case 13:case"end":return t.stop()}},t,e)}))()},handleRights:function(){var e=this;return s()(o.a.mark(function t(){var a,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a=e.$refs.tree.getCheckedNodes(),console.log(a),n=[],a.forEach(function(e){n.push(e.id.toString()),"number"==typeof e.parent_id?n.push(e.parent_id.toString()):n=n.concat(e.parent_id.split(",")),console.log(n)});case 4:case"end":return t.stop()}},t,e)}))()},handleSelectionChange:function(e){this.multipleSelection=e,console.log(this.multipleSelection)},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.pagesize=e,this.getRoleList()},handleCurrentChange:function(e){console.log("当前页: "+e),this.currentPage=e,this.getRoleList()},addRole:function(){this.dialogAddRole=!0,this.dialogTitle="添加角色",this.form={name:"",diaplay_name:""}},handleEdit:function(e,t){console.log(e,t),this.dialogAddRole=!0,this.dialogTitle="编辑角色",this.form.name=t.name,this.form.display_name=t.display_name,this.form.role_id=t.id},handleRole:function(e,t){this.dialogRoleAssign=!0},showRightsDialog:function(e){var t=this;return s()(o.a.mark(function a(){var n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log(e),t.dialogRightAssign=!0,t.roleId=e.id,a.next=5,t.$http.get("v1/backend/auth/permissions",{params:{role_id:e.id}}).then(function(e){});case 5:return a.sent,a.next=8,t.$http.get("v1/backend/auth/permissions");case 8:n=a.sent,console.log(n),200===n.data.code&&(t.rightData=n.data.data);case 11:case"end":return a.stop()}},a,t)}))()},handleDelete:function(e,t){var a=this;this.form.role_id=t.id,console.log(this.form.role_id),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(s()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.$http.delete("v1/backend/auth/roles",{params:{role_id:a.form.role_id}});case 2:200===e.sent.data.code&&(a.$message({type:"success",message:"删除成功!"}),a.getRoleList());case 4:case"end":return e.stop()}},e,a)}))).catch(function(){a.$message({type:"info",message:"已取消删除"})})}},mounted:function(){this.getRoleList(),this.getRigthList()}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"userList—main"}},[a("input-area",[a("el-button",{attrs:{type:"danger"}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addRole}},[e._v("添加")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"id",label:"ID",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"display_name",label:"显示名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("dateFormat")(1e3*t.row.create_time)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"update_time",label:"更新时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("dateFormat")(1e3*t.row.update_time)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"action",label:"操作",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.showRightsDialog(t.row)}}},[e._v("权限")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[5,10,15,20],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogAddRole,width:"30%"},on:{"update:visible":function(t){e.dialogAddRole=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色描述","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.display_name,callback:function(t){e.$set(e.form,"display_name",t)},expression:"form.display_name"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogAddRole=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addRoleFn}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"权限分配",visible:e.dialogRightAssign,width:"30%"},on:{"update:visible":function(t){e.dialogRightAssign=t}}},[a("div",[a("el-tree",{ref:"tree",attrs:{"default-expand-all":"",data:e.rightData,"show-checkbox":"","node-key":"id","default-checked-keys":e.checkedKeys,props:e.defaultProps}})],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogRightAssign=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleRights}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var d=a("C7Lr")(l,c,!1,function(e){a("lver")},"data-v-091254af",null);t.default=d.exports}});
//# sourceMappingURL=101.96fde6bc22c9abf1f533.js.map
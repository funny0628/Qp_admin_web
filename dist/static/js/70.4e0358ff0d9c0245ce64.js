webpackJsonp([70],{AvYc:function(e,t){},cUb6:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("3cXf"),o=a.n(r),n=a("lC5x"),s=a.n(n),l=a("J0Oq"),i=a.n(l),c=a("22Zk"),d=(c.a,{name:"user_manage",components:{InputArea:c.a},data:function(){var e=this;return{dialogFormVisible:!1,pagesize:5,currentPage:1,total:0,dialogAddUser:!1,dialogTitle:"",formLabelWidth:"120px",form:{uid:-1,username:"",nick_name:"",email:"",phone:"",password:"",password2:"",channel:[]},channelList:[],form2:{role:""},rules:{username:[{validator:function(t,a,r){return a?e.form.username.length<6?r(new Error("长度在 6 到 8 个字符")):void 0:r(new Error("用户名不能为空"))},trigger:"blur"}],phone:[{validator:function(e,t,a){return t?/^[1][345789]\d{9}$/.test(t)?void a():a(new Error("请输入正确的手机号")):a(new Error("手机号不能为空"))},trigger:"blur"}],password:[{validator:function(t,a,r){""===a?r(new Error("请输入密码")):(""!==e.form.password2&&e.$refs.form.validateField("password2"),r())},trigger:"blur"}],password2:[{validator:function(t,a,r){""===a?r(new Error("请再次输入密码")):a!==e.form.password?r(new Error("两次输入密码不一致!")):r()},trigger:"blur"}],email:[{validator:function(e,t,a){if(""===t)a(new Error("请输入验证邮箱"));else{if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(t))return a(new Error("请输入正确的邮箱地址"));a()}},trigger:"blur"}]},dialogRoleAssign:!1,dialogRightAssign:!1,roleOpts:[],tableData:[],multipleSelection:[],defaultProps:{children:"children",label:"label"}}},methods:{resetForm:function(){this.form={username:"",nick_name:"",email:"",phone:"",password:"",password2:"",channel:[]}},getUserList:function(){var e=this;return i()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("v1/backend/auth/users",{params:{page:e.currentPage,limit:e.pagesize}});case 2:a=t.sent,console.log(a),200===a.data.code&&(e.tableData=a.data.data,e.total=a.data.total);case 5:case"end":return t.stop()}},t,e)}))()},addUserFn:function(){var e=this;return i()(s.a.mark(function t(){var a,r,n,l;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.form.uid){t.next=9;break}return a={username:e.form.username,nick_name:e.form.nick_name,email:e.form.email,phone:e.form.phone,password:e.form.password,password2:e.form.password2,channel:o()(e.form.channel)},t.next=4,e.$http.post("v1/backend/auth/users",a);case 4:r=t.sent,console.log(r),200===r.data.code&&(e.dialogAddUser=!1,e.getUserList()),t.next=15;break;case 9:return n={uid:e.form.uid,username:e.form.username,nick_name:e.form.nick_name,email:e.form.email,phone:e.form.phone,password:e.form.password,password2:e.form.password2,channel:o()(e.form.channel)},t.next=12,e.$http.put("v1/backend/auth/users",n);case 12:l=t.sent,console.log(l),200===l.data.code&&(e.dialogAddUser=!1,e.getUserList());case 15:case"end":return t.stop()}},t,e)}))()},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e,console.log(this.multipleSelection)},handleSizeChange:function(e){this.pagesize=e,this.getUserList()},handleCurrentChange:function(e){this.currentPage=e,this.getUserList()},addUser:function(){this.dialogAddUser=!0,this.dialogTitle="添加用户",this.resetForm(),this.$refs.form&&this.$refs.form.resetFields(),this.getChannelList()},handleEdit:function(e,t){console.log(e,t),this.dialogAddUser=!0,this.dialogTitle="编辑用户",this.$refs.form&&this.$refs.form.resetFields(),this.getChannelList(),this.form.username=t.username,this.form.nick_name=t.username,this.form.email=t.email,this.form.phone=t.phone,this.form.uid=t.id,this.form.channel=JSON.parse(t.channel)},handleRole:function(e,t){console.log(t),this.dialogRoleAssign=!0,this.form.uid=t.id,this.form2.role="",this.getRoleList()},assignRole:function(){var e=this;return i()(s.a.mark(function t(){var a,r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e.form.uid,e.form2.role),a={role_id:e.form2.role,user_id:e.form.uid},t.next=4,e.$http.post("v1/backend/auth/role-assignment",a);case 4:r=t.sent,console.log(r),200===r.data.code&&(e.dialogRoleAssign=!1);case 7:case"end":return t.stop()}},t,e)}))()},handleDelete:function(e,t){var a=this;console.log(t);var r=t.id.toString();console.log(r),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(i()(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.$http.delete("v1/backend/auth/users",{params:{uids:r}});case 2:t=e.sent,console.log(t),200===t.data.code&&(a.dialogAddUser=!1,a.getUserList(),a.$message({type:"success",message:t.data.msg}));case 5:case"end":return e.stop()}},e,a)}))).catch(function(){a.$message({type:"info",message:res.data.msg})})},getRoleList:function(){var e=this;return i()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("v1/backend/auth/roles");case 2:a=t.sent,console.log(a),200===a.data.code?e.roleOpts=a.data.data:e.$message({type:"info",message:a.data.msg});case 5:case"end":return t.stop()}},t,e)}))()},getChannelList:function(){var e=this;this.$http.get("v1/backend/operation/channels",{params:{page:1,limit:100}}).then(function(t){console.log(t),200===t.data.code&&(e.channelList=t.data.data)})}},mounted:function(){this.getUserList()}}),u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"userMan—main"}},[a("input-area",[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_user",expression:"'add_user'"}],attrs:{type:"primary"},on:{click:e.addUser}},[e._v("添加")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("el-table",{directives:[{name:"has",rawName:"v-has",value:"users",expression:"'users'"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"id",label:"ID",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"username",label:"用户名",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"email",label:"邮箱",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"电话",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"channel",label:"渠道",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(String(JSON.parse(t.row.channel))))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("dateFormat")(t.row.create_time)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"update_time",label:"更新时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("dateFormat")(t.row.update_time)))]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_user",expression:"'modify_user'"}],attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"role_assign",expression:"'role_assign'"}],attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleRole(t.$index,t.row)}}},[e._v("角色")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_user",expression:"'delete_user'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":e.pagesize,layout:"total,sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogAddUser},on:{"update:visible":function(t){e.dialogAddUser=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-form-item",{staticStyle:{width:"50%"},attrs:{label:"用户名","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"50%"},attrs:{label:"昵称","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.nick_name,callback:function(t){e.$set(e.form,"nick_name",t)},expression:"form.nick_name"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"50%"},attrs:{label:"邮箱",prop:"email","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"50%"},attrs:{label:"手机号",prop:"phone","label-width":e.formLabelWidth}},[a("el-input",{attrs:{maxlength:"11",autocomplete:"off"},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"50%"},attrs:{label:"密码",prop:"password","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"50%"},attrs:{label:"确认密码",prop:"password2","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.form.password2,callback:function(t){e.$set(e.form,"password2",t)},expression:"form.password2"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"渠道","label-width":e.formLabelWidth}},[a("el-checkbox-group",{attrs:{limit:1},model:{value:e.form.channel,callback:function(t){e.$set(e.form,"channel",t)},expression:"form.channel"}},e._l(e.channelList,function(e,t){return a("el-checkbox",{key:t,attrs:{label:e.name}})}),1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogAddUser=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addUserFn}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"用户[root]分配角色",visible:e.dialogRoleAssign,width:"25%"},on:{"update:visible":function(t){e.dialogRoleAssign=t}}},[a("el-form",{attrs:{model:e.form2}},[a("el-form-item",{attrs:{label:"角色","label-width":"80px"}},[a("el-select",{attrs:{placeholder:"请选择角色"},model:{value:e.form2.role,callback:function(t){e.$set(e.form2,"role",t)},expression:"form2.role"}},e._l(e.roleOpts,function(t,r){return a("el-option",{key:r,attrs:{label:t.display_name,value:t.id}},[e._v(e._s(t.display_name))])}),1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogRoleAssign=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.assignRole}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=a("C7Lr")(d,u,!1,function(e){a("AvYc")},"data-v-47f68a0b",null);t.default=m.exports}});
//# sourceMappingURL=70.4e0358ff0d9c0245ce64.js.map
webpackJsonp([69],{"7KVx":function(t,e){},XORi:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("lC5x"),i=a.n(r),l=a("J0Oq"),o=a.n(l),s=a("EuRQ"),n={data:function(){return{title:"记录",searchinput:"",currentPage:1,limit:10,total:0,visible:!1,imageUrl:"",serveUrl:"",tableData:[],form:{id:-1,title:"",type_id:"",description:"",image_url:"",tag:"",start_time:"",end_time:"",sort:"",show_status:""},rules:{title:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],type_id:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],description:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],start_time:[{required:!0,message:"必填项不能为空",trigger:"blur"}],end_time:[{required:!0,message:"必填项不能为空",trigger:"blur"}],sort:[{required:!0,message:"必填项不能为空,只能输入数字",trigger:"blur"}],show_status:[{required:!0,message:"必填项不能为空",trigger:"blur"}]}}},created:function(){this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},methods:{beforeAvatarUpload:function(t){console.log(t),t&&(this.imageUrl=URL.createObjectURL(t))},upLoad:function(t){var e=this,a=new FormData;a.append("filename",t.file),a.append("types",1),this.$http.post("v1/backend/upload",a).then(function(t){1===t.data.code&&"ok"===t.data.msg&&(e.serveUrl=t.data.path)})},handleClose:function(){this.imageUrl="",this.editForm("记录",!1,{})},add:function(t){this.editForm("记录",!0,{}),this.$refs[t].resetFields()},search:function(){""===this.searchinput&&this.$message({type:"warning",message:"请输入你要搜索的标题!"}),this.currentPage=1,this.limit=10,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},handleCurrentChange:function(t){this.currentPage=t,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},handleEdit:function(t,e){this.form=Object(s.a)(t),this.form.start_time=this.data(t.start_time),this.form.end_time=this.data(t.end_time),this.editForm("编辑",!0,this.form),this.$refs[e].resetFields()},handleDelete:function(t,e){var a=this;console.log(t,e.id),this.$confirm("确认删除吗？","信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(o()(i.a.mark(function t(){var r,l;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.$http.HallFunConfig.DeleteGameNotice({id:e.id});case 2:r=t.sent,l=r.data,console.log(l),1===l.code&&"ok"===l.msg&&a.initdata({page:a.currentPage,limit:a.limit,title:a.searchinput}),a.$message({type:"success",message:"删除成功!"});case 7:case"end":return t.stop()}},t,a)}))).catch(function(){a.$message({type:"info",message:"已取消删除"})})},onSubmit:function(t,e){var a,r=this;this.$refs[t].validate((a=o()(i.a.mark(function t(a){var l,o,s,n,c;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=27;break}if("记录"!==e){t.next=12;break}return console.log(r.form),r.form.image_url=r.serveUrl,t.next=6,r.$http.HallFunConfig.PostGameNotice(r.form);case 6:l=t.sent,o=l.data,console.log(o),1===o.code&&"ok"===o.msg&&r.initdata({page:r.currentPage,limit:r.limit,title:r.searchinput}),t.next=23;break;case 12:if("编辑"!==e){t.next=23;break}return s=r.formateNum(r.form),console.log(s),2===s.type_id&&(s.image_url=r.serveUrl),console.log(s),t.next=19,r.$http.HallFunConfig.PutGameNotice(s);case 19:n=t.sent,c=n.data,console.log(c),1===c.code&&"ok"===c.msg&&r.initdata({page:r.currentPage,limit:r.limit,title:r.searchinput});case 23:r.editForm("添加",!1,{}),r.imageUrl="",t.next=29;break;case 27:return console.log("error submit!!"),t.abrupt("return",!1);case 29:case"end":return t.stop()}},t,r)})),function(t){return a.apply(this,arguments)}))},editForm:function(t,e,a){this.title=t,this.visible=e,this.form=a},formateData:function(t){return t.forEach(function(t){t.type_id=1===t.type_id?"文字":"图片",t.show_status=1===t.show_status?"展示":"隐藏",1===t.tag?t.tag="没有标签":2===t.tag?t.tag="新":t.tag="热门"}),t},formateNum:function(t){if("number"!=typeof t.type_id||"number"!=typeof t.tag||"number"!=typeof t.show_status)return t.type_id="文字"===t.type_id?1:2,t.show_status="展示"===t.show_status?1:2,"没有标签"===t.tag?t.tag=1:"新"===t.tag?t.tag=2:t.tag=3,t},data:function(t){var e=Date.parse(t);return new Date(e).getTime()},initdata:function(t){var e=this;return o()(i.a.mark(function a(){var r,l,o;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.HallFunConfig.GetGameNotice(t);case 2:r=a.sent,l=r.data,o=e.formateData(l.data),e.tableData=o,e.total=l.total;case 7:case"end":return a.stop()}},a,e)}))()}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"gameAnnouncement"}},[a("div",{staticClass:"title"},[a("p",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.add("form")}}},[t._v("添加")])],1),t._v("\n    标题\n    "),a("el-input",{staticStyle:{"margin-top":"10px",width:"200px"},model:{value:t.searchinput,callback:function(e){t.searchinput=e},expression:"searchinput"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查找")])],1),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"",data:t.tableData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"id",label:"ID",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"公告标题",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"tag",label:"标签",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"start_time",label:"公告开始时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"end_time",label:"公告结束时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"type_id",label:"公告类型",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"sort",label:"排序",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"show_status",label:"状态",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","show-overflow-tooltip":"",width:"200px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleEdit(e.row,"form")}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[5,10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1),t._v(" "),a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{"before-close":t.handleClose,title:t.title,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"form",attrs:{rules:t.rules,model:t.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"公告标题",prop:"title"}},[a("el-input",{attrs:{placeholder:"邮件标题"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公告类型",prop:"type_id"}},[a("el-select",{model:{value:t.form.type_id,callback:function(e){t.$set(t.form,"type_id",e)},expression:"form.type_id"}},[a("el-option",{attrs:{label:"文字",value:1}}),t._v(" "),a("el-option",{attrs:{label:"图片",value:2}})],1)],1),t._v(" "),1===t.form.type_id?a("el-form-item",{attrs:{label:"公告简介",prop:"description"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容"},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"标签",prop:"tag"}},[a("el-select",{model:{value:t.form.tag,callback:function(e){t.$set(t.form,"tag",e)},expression:"form.tag"}},[a("el-option",{attrs:{label:"没有标签",value:1}}),t._v(" "),a("el-option",{attrs:{label:"新",value:2}}),t._v(" "),a("el-option",{attrs:{label:"热门",value:3}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"开始时间",prop:"start_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"timestamp"},model:{value:t.form.start_time,callback:function(e){t.$set(t.form,"start_time",e)},expression:"form.start_time"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"end_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"timestamp"},model:{value:t.form.end_time,callback:function(e){t.$set(t.form,"end_time",e)},expression:"form.end_time"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"排序",prop:"sort"}},[a("el-input",{model:{value:t.form.sort,callback:function(e){t.$set(t.form,"sort",e)},expression:"form.sort"}}),t._v(" "),a("span",[t._v("排序只可以为数字")])],1),t._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"show_status"}},[a("el-select",{model:{value:t.form.show_status,callback:function(e){t.$set(t.form,"show_status",e)},expression:"form.show_status"}},[a("el-option",{attrs:{label:"展示",value:1}}),t._v(" "),a("el-option",{attrs:{label:"隐藏",value:2}})],1)],1),t._v(" "),2===t.form.type_id?a("el-form-item",{attrs:{label:"公告图片"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","show-file-list":!1,"http-request":t.v1/t.backend/t.upload,"before-upload":t.beforeAvatarUpload,limit:1}},[t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):t._e()],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("form",t.title)}}},[t._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var u=a("C7Lr")(n,c,!1,function(t){a("7KVx")},"data-v-32957877",null);e.default=u.exports}});
//# sourceMappingURL=69.ce25a60b8abc6270af0f.js.map
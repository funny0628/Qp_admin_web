webpackJsonp([24],{PYvV:function(e,t){},XORi:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("ZLEe"),r=a.n(i),n=a("lC5x"),o=a.n(n),l=a("J0Oq"),s=a.n(l),m=a("EuRQ"),c={name:"game_notice",data:function(){return{title:"新增",searchinput:"",currentPage:1,limit:10,total:0,visible:!1,imageUrl:"",serveUrl:"",imageChange:!1,baseimage:"",tableData:[],form:{Title:"",type_id:"",Description:"",ImageUrl:"",Tag:"",StartTime:"",EndTime:"",Sort:"",Status:""},rules:{Title:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],Description:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],type_id:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],StartTime:[{required:!0,message:"必填项不能为空",trigger:"blur"}],EndTime:[{required:!0,message:"必填项不能为空",trigger:"blur"}],Sort:[{required:!0,message:"必填项不能为空,只能输入数字",trigger:"blur"}],Status:[{required:!0,message:"必填项不能为空",trigger:"blur"}],ImageUrl:[{required:!0,message:"必填项不能为空",trigger:"blur"}]},initform:{Title:"",type_id:"",Description:"",ImageUrl:"",Tag:"",StartTime:"",EndTime:"",Sort:"",Status:""},initForm:{Title:"",type_id:"",Description:"",ImageUrl:"",Tag:"",StartTime:"",EndTime:"",Sort:"",Status:""},titleData:[{prop:"AnnouncementId",label:"ID"},{prop:"Title",label:"公告标题"},{prop:"Tag",label:"标签"},{prop:"StartTime",label:"公告开始时间"},{prop:"EndTime",label:"公告结束时间"},{prop:"type_id",label:"公告类型"},{prop:"Sort",label:"排序"},{prop:"Status",label:"状态"}]}},created:function(){this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},methods:{beforeAvatarUpload:function(e){e&&this.$set(this.form,"ImageUrl",URL.createObjectURL(e))},fileChange:function(e,t){console.log(e,t,"文件改变了"),e&&(this.imageChange=!0)},upLoad:function(e){var t=this,a=new FormData;a.append("filename",e.file),a.append("types",1),this.$http.post("v1/backend/upload",a).then(function(e){1===e.data.code&&"ok"===e.data.msg&&(t.serveUrl=e.data.path)})},add:function(){this.editForm("新增",!0,Object(m.a)(this.initform))},search:function(){""===this.searchinput&&this.$message({type:"warning",message:"请输入你要搜索的标题!"}),this.currentPage=1,this.limit=10,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},handleSizeChange:function(e){this.limit=e,this.currentPage=1,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},handleCurrentChange:function(e){this.currentPage=e,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},handleEdit:function(e){this.form=this.formateNum(Object(m.a)(e)),this.form.StartTime=this.data(e.StartTime),this.form.EndTime=this.data(e.EndTime),this.editForm("编辑",!0,this.form)},handleDelete:function(e,t){var a=this;this.$confirm("确认删除吗？","信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(s()(o.a.mark(function e(){var i,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.$http.HallFunConfig.DeleteGameNotice({id:t.AnnouncementId});case 2:i=e.sent,1===(r=i.data).code&&"ok"===r.msg&&a.initdata({page:a.currentPage,limit:a.limit,title:a.searchinput}),a.$message({type:"success",message:"删除成功!"});case 6:case"end":return e.stop()}},e,a)}))).catch(function(){a.$message({type:"info",message:"已取消删除"})})},onSubmit:function(e,t){var a,i=this;this.$refs[e].validate((a=s()(o.a.mark(function e(a){var n,l,s,m;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=26;break}if(r()(i.initForm).forEach(function(e){r()(i.form).forEach(function(t){e===t&&(i.initForm[t]=i.form[t])})}),"新增"!==t){e.next=13;break}return i.form.ImageUrl=i.serveUrl,console.log(i.form,i.initForm),e.next=7,i.$http.HallFunConfig.PostGameNotice(i.initForm);case 7:n=e.sent,l=n.data,console.log(l),1===l.code&&"ok"===l.msg?(i.initdata({page:i.currentPage,limit:i.limit,title:i.searchinput}),i.$message({type:"success",message:"新增成功!"})):i.$message({type:"warning",message:"新增失败!"}),e.next=23;break;case 13:if("编辑"!==t){e.next=23;break}return i.initForm.AnnouncementId=i.form.AnnouncementId,i.imageChange&&(console.log("图片改过啦"),i.form.ImageUrl=i.serveUrl,console.log(i.form),i.imageChange=!1),console.log(i.form,i.initForm),e.next=19,i.$http.HallFunConfig.PutGameNotice(i.initForm);case 19:s=e.sent,m=s.data,console.log(m),1===m.code&&"ok"===m.msg?(i.initdata({page:i.currentPage,limit:i.limit,title:i.searchinput}),i.$message({type:"success",message:"修改成功!"})):i.$message({type:"warning",message:"修改失败!"});case 23:i.editForm("添加",!1,i.initform),e.next=28;break;case 26:return console.log("error submit!!"),e.abrupt("return",!1);case 28:case"end":return e.stop()}},e,i)})),function(e){return a.apply(this,arguments)}))},editForm:function(e,t,a){this.title=e,this.visible=t,this.form=a},formateData:function(e){return e.forEach(function(e){e.type_id=e.Description?"文字":"图片",e.Status=1===e.Status?"展示":"隐藏",0===e.Tag?e.Tag="没有标签":1===e.Tag?e.Tag="新":e.Tag="热门"}),e},formateNum:function(e){if("number"!=typeof e.type_id||"number"!=typeof e.Tag||"number"!=typeof e.Status)return e.type_id="文字"===e.type_id?1:2,e.Status="展示"===e.Status?1:2,"没有标签"===e.Tag?(console.log(e.Tag,"=="),e.Tag=0):"新"===e.Tag?(console.log(e.Tag,"===="),e.Tag=1):(console.log(e.Tag,"======="),e.Tag=2),e},data:function(e){var t=Date.parse(e);return new Date(t).getTime()},initdata:function(e){var t=this;return s()(o.a.mark(function a(){var i,r,n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$http.HallFunConfig.GetGameNotice(e);case 2:i=a.sent,r=i.data,n=t.formateData(r.data),t.tableData=n,t.total=r.total;case 7:case"end":return a.stop()}},a,t)}))()}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"gameAnnouncement"}},[a("div",{staticClass:"title"},[a("p",[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_game_notice",expression:"'add_game_notice'"}],attrs:{type:"primary"},on:{click:e.add}},[e._v("添加")])],1),e._v("\n    标题\n    "),a("el-input",{staticStyle:{"margin-top":"10px",width:"200px"},model:{value:e.searchinput,callback:function(t){e.searchinput=t},expression:"searchinput"}}),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查找")])],1),e._v(" "),a("div",{directives:[{name:"has",rawName:"v-has",value:"game_notice_records",expression:"'game_notice_records'"}],staticClass:"table"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"",data:e.tableData,"tooltip-effect":"dark"}},[e._l(e.titleData,function(e,t){return a("el-table-column",{key:t,attrs:{prop:e.prop,label:e.label,align:"center","show-overflow-tooltip":""}})}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","show-overflow-tooltip":"",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_game_notice",expression:"'modify_game_notice'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_game_notice",expression:"'delete_game_notice'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],2),e._v(" "),e.total>5?a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1),e._v(" "),a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{title:e.title,visible:e.visible,"destroy-on-close":!0},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"公告标题",prop:"Title"}},[a("el-input",{attrs:{placeholder:"邮件标题"},model:{value:e.form.Title,callback:function(t){e.$set(e.form,"Title",t)},expression:"form.Title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"公告类型",prop:"type_id"}},[a("el-select",{model:{value:e.form.type_id,callback:function(t){e.$set(e.form,"type_id",t)},expression:"form.type_id"}},[a("el-option",{attrs:{label:"文字",value:1}}),e._v(" "),a("el-option",{attrs:{label:"图片",value:2}})],1)],1),e._v(" "),1===e.form.type_id?a("el-form-item",{attrs:{label:"公告简介",prop:"Description"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容"},model:{value:e.form.Description,callback:function(t){e.$set(e.form,"Description",t)},expression:"form.Description"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"标签",prop:"Tag"}},[a("el-select",{model:{value:e.form.Tag,callback:function(t){e.$set(e.form,"Tag",t)},expression:"form.Tag"}},[a("el-option",{attrs:{label:"没有标签",value:0}}),e._v(" "),a("el-option",{attrs:{label:"新",value:1}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:2}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"开始时间",prop:"StartTime"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:e.form.StartTime,callback:function(t){e.$set(e.form,"StartTime",t)},expression:"form.StartTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"EndTime"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:e.form.EndTime,callback:function(t){e.$set(e.form,"EndTime",t)},expression:"form.EndTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"排序",prop:"Sort"}},[a("el-input",{model:{value:e.form.Sort,callback:function(t){e.$set(e.form,"Sort",t)},expression:"form.Sort"}}),e._v(" "),a("span",[e._v("排序只可以为数字")])],1),e._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"Status"}},[a("el-select",{model:{value:e.form.Status,callback:function(t){e.$set(e.form,"Status",t)},expression:"form.Status"}},[a("el-option",{attrs:{label:"展示",value:1}}),e._v(" "),a("el-option",{attrs:{label:"隐藏",value:2}})],1)],1),e._v(" "),2===e.form.type_id?a("el-form-item",{attrs:{label:"公告图片",prop:"ImageUrl"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"",accept:"image/jpeg, image/png","show-file-list":!1,"http-request":e.upLoad,"before-upload":e.beforeAvatarUpload}},[e.form.ImageUrl?a("img",{staticClass:"avatar",attrs:{src:e.form.ImageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e()],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("form",e.title)}}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var p=a("C7Lr")(c,u,!1,function(e){a("PYvV")},"data-v-7b24a4e7",null);t.default=p.exports}});
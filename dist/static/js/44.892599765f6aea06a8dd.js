webpackJsonp([44],{BwcQ:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("3cXf"),i=o.n(a),l=o("a3Yh"),r=o.n(l),n=o("iVUn"),s=o("fftp"),c=o("zhQY"),d=o("Z/hU"),m=o("2u00"),p=(o("y35B"),o("22Zk")),f=o("06fe"),u=(d.a,f.a,p.a,n.a,s.a,m.a,{name:"HallAdvertiseConf",extends:d.a,components:{InfoTableItem:f.a,InputArea:p.a,SelectTime:n.a,InfoTable:s.a,PermissionButton:m.a},data:function(){var t;return t={dialogTitle:"",pagesize:5,currentPage:1,total:0,formLabelWidth:"120px",dialogVisible:!1,tableStyle:[{label:"渠道名称",prop:"channel",width:""},{label:"KEY",prop:"channel_key",width:""},{label:"文字一",prop:"pic_one_url",width:""},{label:"文字二",prop:"pic_two_url",width:""},{label:"文字三",prop:"pic_three_url",width:""},{label:"操作时间",prop:"create_time",width:""},{label:"操作",prop:"action",width:""}],tableData:[],pageInfo:new c.a(1,[5,10,15,20],6),dialogFormVisible:!1,form:{channel_name:"",channel_key:"",word1:"",word1_type:"701",word1_url:"",word1_jump_position:"",word2:"",word2_type:"701",word2_url:"",word2_jump_position:"",word3:"",word3_type:"701",word3_url:"",word3_jump_position:""},channelOpts:[],wordTypeOpts:[],jumpPathOpts:[],form2:{name:""}},r()(t,"formLabelWidth","100px"),r()(t,"fileList",{imgList1:[],imgList2:[],imgList3:[]}),r()(t,"imageUrl",{imgList1:"",imgList2:"",imgList3:""}),r()(t,"uploadHeaders",{Authorization:"application/json"}),t},methods:{resetForm:function(){this.form={channel_name:"",channel_key:"",word1:"",word1_type:"701",word1_url:"",word1_jump_position:"",word2:"",word2_type:"701",word2_url:"",word2_jump_position:"",word3:"",word3_type:"701",word3_url:"",word3_jump_position:""}},getChannelList:function(){var t=this;this.$http.get("v1/backend/no_channel",{params:{type_id:2}}).then(function(e){console.log(e),1===e.data.code&&(t.channelOpts=e.data.data)})},getPicTypeList:function(){var t=this;this.$http.get("v1/backend/lobby/name_type",{params:{type_id:7}}).then(function(e){console.log(e),1===e.data.code&&(t.wordTypeOpts=e.data.data)})},getJumpPathList:function(){var t=this;this.$http.get("v1/backend/lobby/name_type",{params:{type_id:8}}).then(function(e){console.log(e),1===e.data.code&&(t.jumpPathOpts=e.data.data)})},getAdvertiseConfList:function(){var t=this;this.$http.get("v1/backend/lobby/flyer",{params:{page:this.currentPage,limit:this.pagesize}}).then(function(e){console.log(e),t.tableData=e.data.data,t.total=e.data.total})},openAddDialog:function(){this.dialogFormVisible=!0,this.getPicTypeList(),this.resetForm(),this.getChannelList()},addNewChannel:function(){var t=this;if(this.form.id){var e={banner_id:this.form.id,name:this.form.channel_name,key:this.form.channel_key,name_one:"我是图片一",url_one:this.imageUrl.imgList1,type_one:JSON.parse(this.form.word1_type),jump_id_one:JSON.parse(this.form.word1_jump_position),name_two:"我是图片二",url_two:this.imageUrl.imgList2,type_two:JSON.parse(this.form.word2_type),jump_id_two:JSON.parse(this.form.word2_jump_position),name_three:"我是图片三",url_three:this.imageUrl.imgList3,type_three:JSON.parse(this.form.word3_type),jump_id_three:JSON.parse(this.form.word3_jump_position)};this.$http.put("v1/backend/lobby/flyer",e).then(function(e){console.log(e),1===e.data.code&&(t.dialogFormVisible=!1,t.getAdvertiseConfList())})}else{var o={name:this.form.channel_name,key:this.form.channel_key,name_one:"我是图片一",url_one:this.imageUrl.imgList1,type_one:Number(this.form.word1_type),jump_id_one:Number(this.form.word1_jump_position),name_two:"我是图片二",url_two:this.imageUrl.imgList2,type_two:Number(this.form.word2_type),jump_id_two:Number(this.form.word2_jump_position),name_three:"我是图片三",url_three:this.imageUrl.imgList3,type_three:Number(this.form.word3_type),jump_id_three:Number(this.form.word3_jump_position)};this.$http.post("v1/backend/lobby/flyer",o).then(function(e){console.log(e),1===e.data.code&&(t.dialogFormVisible=!1,t.getAdvertiseConfList())})}},handleEdit:function(t){console.log(t),this.getPicTypeList(),this.getJumpPathList(),this.dialogFormVisible=!0,this.dialogTitle="更新渠道信息",this.form.id=t.id,this.form.channel_name=t.channel,this.form.channel_key=t.channel_key,this.form.word1_type=i()(t.pic_one_type),this.form.word1_url=t.pic_one_url,this.form.word2_type=i()(t.pic_two_type),this.form.word2_url=t.pic_two_url,this.form.word3_type=i()(t.pic_three_type),this.form.word3_url=t.pic_three_url,this.form.word1_jump_position=i()(t.jump_id_one),this.form.word2_jump_position=i()(t.jump_id_two),this.form.word3_jump_position=i()(t.jump_id_three),this.imageUrl.imgList1=t.pic_one_url,this.imageUrl.imgList2=t.pic_two_url,this.imageUrl.imgList3=t.pic_three_url},handleDelete:function(t){var e=this;console.log(t),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.delete("v1/backend/lobby/flyer",{params:{id:t.id}}).then(function(t){1===t.data.code&&(e.getAdvertiseConfList(),e.$message({type:"success",message:"删除成功!"}))})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},search:function(){},handleSizeChange:function(t){this.pagesize=t,this.getAdvertiseConfList()},handleCurrentChange:function(t){this.currentPage=t,this.getAdvertiseConfList()},handleAvatarSuccess:function(t,e){},handleChange:function(t,e,o){this.fileList[o]=e},beforeUpload:function(t){},uploadFile:function(t){var e=this,o=new FormData;this.fileList[t].forEach(function(t){o.append("filename",t.raw),o.append("types",1)}),this.$http.post("v1/backend/upload",o).then(function(o){1===o.data.code&&(e.imageUrl[t]=o.data.path)})}},watch:{"form.word1_type":function(t,e){var o=this;console.log(t),"704"===t&&this.getJumpPathList(),"702"===t||"701"!==t?this.$nextTick(function(){o.form.word1_url=o.form.word1}):this.$nextTick(function(){o.form.word1_url=""})}},mounted:function(){this.getAdvertiseConfList()}}),_={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"HallAdvertiseConf-main"}},[o("el-button",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-left":"20px"},attrs:{type:"danger"}},[t._v("删除")]),t._v(" "),o("el-button",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{type:"primary"},on:{click:t.openAddDialog}},[t._v("添加")]),t._v(" "),o("div",{staticClass:"bd"},[o("info-table",{attrs:{search:t.search,"table-style":t.tableStyle,records:t.tableData,"page-info":t.pageInfo,"hide-page":!0}},[o("info-table-item",{attrs:{"table-style":t.tableStyle},scopedSlots:t._u([{key:"default",fn:function(e){return["action"===e.prop?[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(o){return t.handleEdit(e.row)}}},[t._v("编辑")]),t._v(" "),o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(o){return t.handleDelete(e.row)}}},[t._v("删除")])]:t._e(),t._v(" "),["action"].indexOf(e.prop)<0?[t._v(t._s(e.row[e.prop]))]:t._e()]}}])})],1),t._v(" "),o("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":t.currentPage,"page-sizes":[5,10,15,20],"page-size":t.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),o("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[o("el-form",{attrs:{model:t.form,enctype:"multipart/form-data"}},[o("el-form-item",{attrs:{label:"渠道名","label-width":t.formLabelWidth}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择渠道名"},model:{value:t.form.channel_name,callback:function(e){t.$set(t.form,"channel_name",e)},expression:"form.channel_name"}},t._l(t.channelOpts,function(t){return o("el-option",{key:t.id,attrs:{label:t.channel_name,value:t.channel_name}})}),1)],1),t._v(" "),o("el-form-item",{attrs:{label:"KEY","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.channel_key,callback:function(e){t.$set(t.form,"channel_key",e)},expression:"form.channel_key"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"文字一","label-width":t.formLabelWidth}},[o("el-upload",{staticClass:"avatar-uploader",attrs:{action:"",fileList:t.fileList.imgList1,accept:"image/jpeg, image/png","show-file-list":!1,headers:t.uploadHeaders,"on-change":function(e,o,a){return t.handleChange(e,o,"imgList1")},"before-upload":t.beforeUpload,"on-success":t.handleAvatarSuccess,"http-request":function(e){return t.uploadFile("imgList1")}}},[t.imageUrl.imgList1?o("img",{staticClass:"avatar",attrs:{src:t.imageUrl.imgList1}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"文字一类型","label-width":t.formLabelWidth}},[o("el-select",{attrs:{placeholder:"请选择文字一类型"},model:{value:t.form.word1_type,callback:function(e){t.$set(t.form,"word1_type",e)},expression:"form.word1_type"}},t._l(t.wordTypeOpts,function(t,e){return o("el-option",{key:e,attrs:{label:t.name,value:JSON.stringify(t.id)}})}),1)],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},["704"!==t.form.word1_type?o("el-form-item",{attrs:{label:"URL","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.word1_url,callback:function(e){t.$set(t.form,"word1_url",e)},expression:"form.word1_url"}})],1):o("el-form-item",{attrs:{label:"跳转位置","label-width":t.formLabelWidth}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.word1_jump_position,callback:function(e){t.$set(t.form,"word1_jump_position",e)},expression:"form.word1_jump_position"}},t._l(t.jumpPathOpts,function(t,e){return o("el-option",{key:e,attrs:{label:t.name,value:JSON.stringify(t.id)}})}),1)],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"文字二","label-width":t.formLabelWidth}},[o("el-upload",{staticClass:"avatar-uploader",attrs:{action:"",fileList:t.fileList.imgList2,accept:"image/jpeg, image/png","show-file-list":!1,headers:t.uploadHeaders,"on-change":function(e,o,a){return t.handleChange(e,o,"imgList2")},"before-upload":t.beforeUpload,"on-success":t.handleAvatarSuccess,"http-request":function(e){return t.uploadFile("imgList2")}}},[t.imageUrl.imgList2?o("img",{staticClass:"avatar",attrs:{src:t.imageUrl.imgList2}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"文字二类型","label-width":t.formLabelWidth}},[o("el-select",{model:{value:t.form.word2_type,callback:function(e){t.$set(t.form,"word2_type",e)},expression:"form.word2_type"}},t._l(t.wordTypeOpts,function(t,e){return o("el-option",{key:e,attrs:{label:t.name,value:JSON.stringify(t.id)}})}),1)],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},["704"!==t.form.word2_type?o("el-form-item",{attrs:{label:"URL","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.word2_url,callback:function(e){t.$set(t.form,"word2_url",e)},expression:"form.word2_url"}})],1):o("el-form-item",{attrs:{label:"跳转位置","label-width":t.formLabelWidth}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.word2_jump_position,callback:function(e){t.$set(t.form,"word2_jump_position",e)},expression:"form.word2_jump_position"}},t._l(t.jumpPathOpts,function(t,e){return o("el-option",{key:e,attrs:{label:t.name,value:JSON.stringify(t.id)}})}),1)],1)],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"文字三","label-width":t.formLabelWidth}},[o("el-upload",{staticClass:"avatar-uploader",attrs:{action:"",fileList:t.fileList.imgList3,accept:"image/jpeg, image/png","show-file-list":!1,headers:t.uploadHeaders,"on-change":function(e,o,a){return t.handleChange(e,o,"imgList3")},"before-upload":t.beforeUpload,"on-success":t.handleAvatarSuccess,"http-request":function(e){return t.uploadFile("imgList3")}}},[t.imageUrl.imgList3?o("img",{staticClass:"avatar",attrs:{src:t.imageUrl.imgList3}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"文字三类型","label-width":t.formLabelWidth}},[o("el-select",{model:{value:t.form.word3_type,callback:function(e){t.$set(t.form,"word3_type",e)},expression:"form.word3_type"}},t._l(t.wordTypeOpts,function(t,e){return o("el-option",{key:e,attrs:{label:t.name,value:JSON.stringify(t.id)}})}),1)],1)],1),t._v(" "),o("el-col",{attrs:{span:12}},["704"!==t.form.word3_type?o("el-form-item",{attrs:{label:"URL","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.word3_url,callback:function(e){t.$set(t.form,"word3_url",e)},expression:"form.word3_url"}})],1):o("el-form-item",{attrs:{label:"跳转位置","label-width":t.formLabelWidth}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.word3_jump_position,callback:function(e){t.$set(t.form,"word3_jump_position",e)},expression:"form.word3_jump_position"}},t._l(t.jumpPathOpts,function(t,e){return o("el-option",{key:e,attrs:{label:t.name,value:JSON.stringify(t.id)}})}),1)],1)],1)],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.addNewChannel}},[t._v("确 定")])],1)],1),t._v(" "),o("div",[o("el-dialog",{attrs:{title:"添加宣传页",visible:t.dialogVisible,width:"40%",center:""},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("el-form",{attrs:{model:t.form2}},[o("el-form-item",[o("table",{staticStyle:{width:"80%"},attrs:{cellspacing:"0",cellpadding:"10",border:"1"}},[o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("选择渠道")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[o("el-select",{attrs:{placeholder:"请选择渠道"},model:{value:t.form.region,callback:function(e){t.$set(t.form,"region",e)},expression:"form.region"}},[o("el-option",{attrs:{label:"渠道一",value:""}}),t._v(" "),o("el-option",{attrs:{label:"渠道二",value:""}})],1)],1)])])]),t._v(" "),o("el-form-item",[o("table",{staticStyle:{"border-color":"#c0c4cc",width:"80%"},attrs:{border:"1",cellspacing:"0",cellpadding:"10"}},[o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("上传内容1")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:""},model:{value:t.form2.name,callback:function(e){t.$set(t.form2,"name",e)},expression:"form2.name"}})],1)]),t._v(" "),o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("海报类型")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[t._v("轮播海报")])]),t._v(" "),o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("选择动作类型")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[t._v("跳转")])]),t._v(" "),o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("跳转地址")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:""},model:{value:t.form2.name,callback:function(e){t.$set(t.form2,"name",e)},expression:"form2.name"}})],1)])])]),t._v(" "),o("el-form-item",[o("table",{staticStyle:{"border-color":"#c0c4cc",width:"80%"},attrs:{border:"1",cellspacing:"0",cellpadding:"10"}},[o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("上传内容2")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:""},model:{value:t.form2.name,callback:function(e){t.$set(t.form2,"name",e)},expression:"form2.name"}})],1)]),t._v(" "),o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("海报类型")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[t._v("轮播海报")])]),t._v(" "),o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("选择动作类型")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[t._v("复制")])]),t._v(" "),o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("复制内容")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:""},model:{value:t.form2.name,callback:function(e){t.$set(t.form2,"name",e)},expression:"form2.name"}})],1)])])]),t._v(" "),o("el-form-item",[o("table",{staticStyle:{"border-color":"#c0c4cc",width:"80%"},attrs:{border:"1",cellspacing:"0",cellpadding:"10"}},[o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("上传内容3")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:""},model:{value:t.form2.name,callback:function(e){t.$set(t.form2,"name",e)},expression:"form2.name"}})],1)]),t._v(" "),o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("海报类型")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[t._v("轮播海报")])]),t._v(" "),o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("选择动作类型")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[t._v("加入游戏")])]),t._v(" "),o("tr",[o("td",{staticStyle:{width:"150px","text-align":"center","background-color":"#f2f2f2"}},[t._v("选择游戏")]),t._v(" "),o("td",{staticStyle:{"text-align":"center"}},[o("el-select",{attrs:{placeholder:"请选择游戏类型"},model:{value:t.form.region,callback:function(e){t.$set(t.form,"region",e)},expression:"form.region"}},[o("el-option",{attrs:{label:"游戏一",value:""}}),t._v(" "),o("el-option",{attrs:{label:"游戏二",value:""}}),t._v(" "),o("el-option",{attrs:{label:"游戏三",value:""}})],1)],1)])])])],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var h=o("C7Lr")(u,_,!1,function(t){o("vz+Q")},"data-v-43ef3b1e",null);e.default=h.exports},"vz+Q":function(t,e){}});
//# sourceMappingURL=44.892599765f6aea06a8dd.js.map
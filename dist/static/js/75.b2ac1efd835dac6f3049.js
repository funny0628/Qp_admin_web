webpackJsonp([75],{MZNZ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("lC5x"),n=a.n(r),i=a("J0Oq"),s=a.n(i),o=a("EuRQ"),l={name:"sys_broadcast",data:function(){return{orderlist:["ascending","descending"],tableData:[],form:{info:"",num_times:"",circulation:"",play_start_time:"",play_end_time:""},rules:{info:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],num_times:[{required:!0,message:"必填项不可以为空,需要填入数字",trigger:"blur"}],circulation:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],play_start_time:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],play_end_time:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},total:0,currentPage:1,limit:10,visible:!1,title:"添加系统公告",selectList:[],loading:!1,initForm:{info:"",num_times:"",circulation:"",play_start_time:"",play_end_time:""}}},created:function(){this.initdata({page:this.currentPage,limit:this.limit})},methods:{del:function(){var t=this;return s()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:0!=t.selectList.length?t.$confirm("确认删除吗?","信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(s()(n.a.mark(function e(){var a,r,i;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.selectList.join(),e.next=3,t.$http.HallFunConfig.DeleteSysBroadcast({id_list:"("+a+")"});case 3:r=e.sent,1===(i=r.data).code&&"ok"===i.msg&&t.initdata({page:t.currentPage,limit:t.limit}),t.$message({type:"success",message:"删除成功!"});case 7:case"end":return e.stop()}},e,t)}))).catch(function(){t.$message({type:"info",message:"已取消删除"})}):t.$message("请选择需要删除的数据");case 1:case"end":return e.stop()}},e,t)}))()},add:function(){this.editForm("添加系统公告",!0,{})},send:function(){var t=this;this.$confirm("确认发送吗?","信息",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(s()(n.a.mark(function e(){var a,r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,t.$http.HallFunConfig.PostTableConfig({type_id:6});case 3:a=e.sent,1===(r=a.data).code&&r.data&&(t.loading=!1,t.$message({type:"success",message:r.msg}));case 6:case"end":return e.stop()}},e,t)})))},handleSelectionChange:function(t){var e=t.map(function(t){return t.id});this.selectList=e},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.initdata({page:this.currentPage,limit:this.limit})},handleCurrentChange:function(t){this.currentPage=t,this.initdata({page:this.currentPage,limit:this.limit})},handleEdit:function(t){var e=Object(o.a)(t);e.play_start_time=this.data(t.play_start_time),e.play_end_time=this.data(t.play_end_time),this.editForm("更新系统公告",!0,e)},handleDelete:function(t,e){var a=this;this.$confirm("确认删除吗?","信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(s()(n.a.mark(function t(){var r,i;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.$http.HallFunConfig.DeleteSysBroadcast({id:e.id});case 2:r=t.sent,1===(i=r.data).code&&"ok"===i.msg&&a.initdata({page:a.currentPage,limit:a.limit,title:a.searchinput}),a.$message({type:"success",message:"删除成功!"});case 6:case"end":return t.stop()}},t,a)}))).catch(function(){a.$message({type:"info",message:"已取消删除"})})},onSubmit:function(t,e){var a,r=this;this.$refs[t].validate((a=s()(n.a.mark(function t(a){var i,s,o,l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=19;break}if(r.form=r.formateNum(r.form),"添加系统公告"!==e){t.next=10;break}return t.next=5,r.$http.HallFunConfig.PostSysBroadcast(r.form);case 5:i=t.sent,1===(s=i.data).code&&"ok"===s.msg&&r.initdata({page:r.currentPage,limit:r.limit}),t.next=16;break;case 10:if("更新系统公告"!==e){t.next=16;break}return t.next=13,r.$http.HallFunConfig.PutSysBroadcast(r.form);case 13:o=t.sent,1===(l=o.data).code&&"ok"===l.msg&&r.initdata({page:r.currentPage,limit:r.limit});case 16:r.editForm("添加系统公告",!1,{}),t.next=21;break;case 19:return console.log("error submit!!"),t.abrupt("return",!1);case 21:case"end":return t.stop()}},t,r)})),function(t){return a.apply(this,arguments)}))},back:function(){this.editForm("添加系统公告",!1,{})},editForm:function(t,e,a){this.title=t,this.visible=e,this.form=a},formateData:function(t){return t.forEach(function(t){t.circulation=1===t.circulation?"按时间":"按日期时间"}),t},formateNum:function(t){return t.circulation="按时间"===t.circulation?1:2,t},data:function(t){var e=Date.parse(t);return new Date(e).getTime()},initdata:function(t){var e=this;return s()(n.a.mark(function a(){var r,i,s;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.HallFunConfig.GetSysBroadcast(t);case 2:r=a.sent,i=r.data,s=e.formateData(Object(o.a)(i.data)),e.tableData=s,e.total=i.total;case 7:case"end":return a.stop()}},a,e)}))()}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{id:"systemBroadcast","element-loading-text":"正在上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.6)"}},[a("div",{staticClass:"title"},[a("div",{staticClass:"botton"},[a("el-button",{attrs:{type:"danger"},on:{click:t.del}},[t._v("删除")]),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_sys_broadcast",expression:"'add_sys_broadcast'"}],attrs:{type:"primary"},on:{click:t.add}},[t._v("添加")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.send}},[t._v("发送到服务器配置")])],1)]),t._v(" "),a("div",{directives:[{name:"has",rawName:"v-has",value:"sys_broadcast_records",expression:"'sys_broadcast_records'"}]},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"","default-sort":{prop:"ID",order:t.orderlist[0]},data:t.tableData,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"id",label:"ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"info",label:"公告内容",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"num_times",label:"时间间隔(秒)",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"circulation",label:"循环",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"play_start_time",label:"播放开始时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"play_end_time",label:"播放结束时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"change",label:"",align:"center","show-overflow-tooltip":"",width:"200px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_sys_broadcast",expression:"'modify_sys_broadcast'"}],attrs:{size:"mini"},on:{click:function(a){return t.handleEdit(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_sys_broadcast",expression:"'delete_sys_broadcast'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1),t._v(" "),a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{title:t.title,visible:t.visible,"destroy-on-close":!0},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"form",attrs:{rules:t.rules,model:t.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"公告内容",prop:"info"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容"},model:{value:t.form.info,callback:function(e){t.$set(t.form,"info",e)},expression:"form.info"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"时间间隔(秒)",prop:"num_times"}},[a("el-input",{attrs:{placeholder:"请输入间隔时间xx秒"},model:{value:t.form.num_times,callback:function(e){t.$set(t.form,"num_times",e)},expression:"form.num_times"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"循环",prop:"circulation"}},[a("el-select",{model:{value:t.form.circulation,callback:function(e){t.$set(t.form,"circulation",e)},expression:"form.circulation"}},[a("el-option",{attrs:{label:"按时间",value:1}}),t._v(" "),a("el-option",{attrs:{label:"按日期时间",value:2}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"播放开始",prop:"play_start_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请输入播放开始时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:t.form.play_start_time,callback:function(e){t.$set(t.form,"play_start_time",e)},expression:"form.play_start_time"}}),t._v(" "),a("span",[t._v("格式：2018-09-19 00:00:00\n            （注意：若使用按时间循环，所选日期会忽略，只对时间生效）")])],1),t._v(" "),a("el-form-item",{attrs:{label:"播放结束",prop:"play_end_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请输入播放结束时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:t.form.play_end_time,callback:function(e){t.$set(t.form,"play_end_time",e)},expression:"form.play_end_time"}}),t._v(" "),a("span",[t._v("格式：2018-09-19 00:00:00\n            （注意：若使用按时间循环，所选日期会忽略，只对时间生效）")])],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("form",t.title)}}},[t._v("确 定")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.back()}}},[t._v("返 回")])],1)],1)],1)])},staticRenderFns:[]};var u=a("C7Lr")(l,c,!1,function(t){a("ZJd8")},"data-v-2877417a",null);e.default=u.exports},ZJd8:function(t,e){}});
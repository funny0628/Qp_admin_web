webpackJsonp([5],{"5l1f":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i("lC5x"),a=i.n(r),n=i("J0Oq"),o=i.n(n),l=i("EuRQ"),s={data:function(){return{orderlist:["ascending","descending"],tableData:[],total:0,rules:{title:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],info:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],inscribe:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],notice_time:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],start_time:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],end_time:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},form:{title:"",info:"",inscribe:"",notice_time:"",start_time:"",end_time:"3",redactor:""},currentPage:1,limit:10,visible:!1,title:"添加停服公告",selectList:[]}},created:function(){this.initdata({page:this.currentPage,limit:this.limit})},methods:{del:function(){var t=this;0!=this.selectList.length?(console.log("已经有数据了"),this.$confirm("确认删除吗?","信息",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(o()(a.a.mark(function e(){var i,r,n;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.selectList.join(),e.next=3,t.$http.HallFunConfig.DeleteStopNotice({id_list:"("+i+")"});case 3:r=e.sent,n=r.data,console.log(n),1===n.code&&"ok"===n.msg&&t.initdata({page:t.currentPage,limit:t.limit,title:t.searchinput}),t.$message({type:"success",message:"删除成功!"});case 8:case"end":return e.stop()}},e,t)}))).catch(function(){t.$message({type:"info",message:"已取消删除"})})):this.$message("请选择需要删除的数据")},add:function(){this.editForm("添加停服公告",!0,{})},handleSelectionChange:function(t){var e=t.map(function(t){return t.id});this.selectList=e},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.initdata({page:this.currentPage,limit:this.limit})},handleCurrentChange:function(t){this.currentPage=t,this.initdata({page:this.currentPage,limit:this.limit})},handleEdit:function(t){var e=Object(l.a)(t);e.start_time=this.data(t.start_time),e.end_time=this.data(t.end_time),e.notice_time=this.data(t.notice_time),this.editForm("更新停服公告",!0,e)},handleDelete:function(t,e){var i=this;this.$confirm("确认删除吗?","信息",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(o()(a.a.mark(function t(){var r,n;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.$http.HallFunConfig.DeleteStopNotice({id:e.id});case 2:r=t.sent,1===(n=r.data).code&&"ok"===n.msg&&i.initdata({page:i.currentPage,limit:i.limit}),i.$message({type:"success",message:"删除成功!"});case 6:case"end":return t.stop()}},t,i)}))).catch(function(){i.$message({type:"info",message:"已取消删除"})})},onSubmit:function(t,e){var i,r=this;this.$refs[t].validate((i=o()(a.a.mark(function t(i){var n,o,l,s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!i){t.next=20;break}if("添加停服公告"!==e){t.next=10;break}return r.form.redactor="redactor",t.next=5,r.$http.HallFunConfig.PostStopNotice(r.form);case 5:n=t.sent,1===(o=n.data).code&&"ok"===o.msg&&r.initdata({page:r.currentPage,limit:r.limit}),t.next=17;break;case 10:if("更新停服公告"!==e){t.next=17;break}return console.log(r.form),t.next=14,r.$http.HallFunConfig.PutStopNotice(r.form);case 14:l=t.sent,1===(s=l.data).code&&"ok"===s.msg&&r.initdata({page:r.currentPage,limit:r.limit});case 17:r.editForm("添加停服公告",!1,{}),t.next=22;break;case 20:return console.log("error submit!!"),t.abrupt("return",!1);case 22:case"end":return t.stop()}},t,r)})),function(t){return i.apply(this,arguments)}))},back:function(){this.editForm("添加停服公告",!1,{})},editForm:function(t,e,i){this.title=t,this.visible=e,this.form=i},data:function(t){var e=Date.parse(t);return new Date(e).getTime()},initdata:function(t){var e=this;return o()(a.a.mark(function i(){var r,n;return a.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,e.$http.HallFunConfig.GetStopNotice(t);case 2:r=i.sent,n=r.data,e.tableData=n.data,e.total=n.total;case 6:case"end":return i.stop()}},i,e)}))()}}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"stopNotice"}},[i("div",{staticClass:"title"},[i("div",{staticClass:"botton"},[i("el-button",{attrs:{type:"danger"},on:{click:t.del}},[t._v("删除")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.add}},[t._v("添加")])],1)]),t._v(" "),i("div",[i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"","default-sort":{prop:"ID",order:t.orderlist[0]},data:t.tableData,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{sortable:"",prop:"id",label:"ID",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"title",label:"公告标题",align:"center","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"info",label:"公告内容",align:"center","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"inscribe",label:"\t公告落款",align:"center","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"notice_time",label:"通知时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"start_time",label:"公示开始时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"end_time",label:"公示结束时间",align:"center","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"redactor",label:"操作者",align:"center","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"change",label:"",align:"center","show-overflow-tooltip":"",width:"200px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini"},on:{click:function(i){return t.handleEdit(e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.total>5?i("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[5,10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1),t._v(" "),i("div",{staticClass:"dialog"},[i("el-dialog",{attrs:{title:t.title,visible:t.visible,"destroy-on-close":!0},on:{"update:visible":function(e){t.visible=e}}},[i("el-form",{ref:"form",attrs:{rules:t.rules,model:t.form,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"公告标题",prop:"title"}},[i("el-input",{attrs:{placeholder:"请输入停服公告标题"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"公告内容",prop:"info"}},[i("el-input",{attrs:{type:"textarea",placeholder:"请输入公告内容"},model:{value:t.form.info,callback:function(e){t.$set(t.form,"info",e)},expression:"form.info"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"公告落款",prop:"inscribe"}},[i("el-input",{attrs:{placeholder:"请输入公告落款"},model:{value:t.form.inscribe,callback:function(e){t.$set(t.form,"inscribe",e)},expression:"form.inscribe"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"通知时间",prop:"notice_time"}},[i("el-date-picker",{attrs:{type:"date",placeholder:"请输入通知时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:t.form.notice_time,callback:function(e){t.$set(t.form,"notice_time",e)},expression:"form.notice_time"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开始时间",prop:"start_time"}},[i("el-date-picker",{attrs:{type:"date",placeholder:"请输入结束时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:t.form.start_time,callback:function(e){t.$set(t.form,"start_time",e)},expression:"form.start_time"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"结束时间",prop:"end_time"}},[i("el-date-picker",{attrs:{type:"date",placeholder:"请输入结束时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:t.form.end_time,callback:function(e){t.$set(t.form,"end_time",e)},expression:"form.end_time"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("form",t.title)}}},[t._v("确 定")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.back()}}},[t._v("返 回")])],1)],1)],1)])},staticRenderFns:[]};var m=i("C7Lr")(s,c,!1,function(t){i("cv9T")},"data-v-ff804100",null);e.default=m.exports},cv9T:function(t,e){}});
//# sourceMappingURL=5.9bced335483645a87749.js.map
webpackJsonp([68],{"5l1f":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("lC5x"),r=i.n(a),n=i("J0Oq"),o=i.n(n),s=i("EuRQ"),l={name:"stop_notice",data:function(){return{orderlist:["ascending","descending"],tableData:[],total:0,rules:{title:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],info:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],inscribe:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],notice_time:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],start_time:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],end_time:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},form:{title:"",info:"",inscribe:"",notice_time:"",start_time:"",end_time:"3",redactor:""},currentPage:1,limit:10,visible:!1,title:"添加停服公告",selectList:[],titleData:[{prop:"id",label:"ID"},{prop:"title",label:"公告标题"},{prop:"info",label:"公告内容"},{prop:"inscribe",label:"公告落款"},{prop:"notice_time",label:"通知时间"},{prop:"start_time",label:"公示开始时间"},{prop:"end_time",label:"公示结束时间"},{prop:"redactor",label:"操作者"}]}},created:function(){this.initdata({page:this.currentPage,limit:this.limit})},methods:{del:function(){var e=this;0!=this.selectList.length?(console.log("已经有数据了"),this.$confirm("确认删除吗?","信息",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(o()(r.a.mark(function t(){var i,a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=e.selectList.join(),t.next=3,e.$http.HallFunConfig.DeleteStopNotice({id_list:"("+i+")"});case 3:a=t.sent,n=a.data,console.log(n),1===n.code&&"ok"===n.msg&&e.initdata({page:e.currentPage,limit:e.limit,title:e.searchinput}),e.$message({type:"success",message:"删除成功!"});case 8:case"end":return t.stop()}},t,e)}))).catch(function(){e.$message({type:"info",message:"已取消删除"})})):this.$message("请选择需要删除的数据")},add:function(){this.editForm("添加停服公告",!0,{})},handleSelectionChange:function(e){var t=e.map(function(e){return e.id});this.selectList=t},handleSizeChange:function(e){this.limit=e,this.currentPage=1,this.initdata({page:this.currentPage,limit:this.limit})},handleCurrentChange:function(e){this.currentPage=e,this.initdata({page:this.currentPage,limit:this.limit})},handleEdit:function(e){console.log(e);var t=Object(s.a)(e);t.start_time=this.data(e.start_time),t.end_time=this.data(e.end_time);var i=new RegExp("[\\u4E00-\\u9FFF]+","g");t.notice_time=t.notice_time.replace(i,"-"),this.editForm("更新停服公告",!0,t)},handleDelete:function(e,t){var i=this;this.$confirm("确认删除吗?","信息",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(o()(r.a.mark(function e(){var a,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.$http.HallFunConfig.DeleteStopNotice({id:t.id});case 2:a=e.sent,1===(n=a.data).code&&"ok"===n.msg&&i.initdata({page:i.currentPage,limit:i.limit}),i.$message({type:"success",message:"删除成功!"});case 6:case"end":return e.stop()}},e,i)}))).catch(function(){i.$message({type:"info",message:"已取消删除"})})},onSubmit:function(e,t){var i,a=this;this.$refs[e].validate((i=o()(r.a.mark(function e(i){var n,o,s,l,c,m;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!i){e.next=32;break}if(a.form.start_time=Math.ceil(a.form.start_time/1e3),a.form.end_time=Math.ceil(a.form.end_time/1e3),"-"!==a.form.notice_time[a.form.notice_time.length-1]&&(a.form.notice_time+="-"),n=a.form.notice_time.split(""),o=[],n.forEach(function(e,t){"-"===e&&o.push(t)}),n[o[0]]="年",n[o[1]]="月",n[o[2]]="日",a.form.notice_time=n.join(""),console.log(a.form),"添加停服公告"!==t){e.next=22;break}return console.log(a.form),a.form.redactor="redactor",e.next=17,a.$http.HallFunConfig.PostStopNotice(a.form);case 17:s=e.sent,1===(l=s.data).code&&"ok"===l.msg?(a.initdata({page:a.currentPage,limit:a.limit}),a.$message({type:"success",message:"保存成功!"})):a.$message({type:"warning",message:"保存失败"}),e.next=29;break;case 22:if("更新停服公告"!==t){e.next=29;break}return console.log(a.form),e.next=26,a.$http.HallFunConfig.PutStopNotice(a.form);case 26:c=e.sent,1===(m=c.data).code&&"ok"===m.msg?(a.initdata({page:a.currentPage,limit:a.limit}),a.loading=!1,a.$message({type:"success",message:"编辑成功!"})):(a.loading=!1,a.$message({type:"warning",message:"编辑失败"}));case 29:a.editForm("添加停服公告",!1,{}),e.next=34;break;case 32:return console.log("error submit!!"),e.abrupt("return",!1);case 34:case"end":return e.stop()}},e,a)})),function(e){return i.apply(this,arguments)}))},back:function(){this.editForm("添加停服公告",!1,{})},editForm:function(e,t,i){this.title=e,this.visible=t,this.form=i},initTime:function(e){var t=new Date(e);return t.getFullYear()+"-"+(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(t.getDate()<10?"0"+t.getDate():t.getDate())+" "+(t.getHours()<10?"0"+t.getHours():t.getHours())+":"+(t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":"+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())},data:function(e){var t=Date.parse(e);return new Date(t).getTime()},initdata:function(e){var t=this;return o()(r.a.mark(function i(){var a,n;return r.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,t.$http.HallFunConfig.GetStopNotice(e);case 2:a=i.sent,n=a.data,t.tableData=n.data,t.total=n.total,t.tableData.forEach(function(e){e.start_time=t.initTime(1e3*e.start_time),e.end_time=t.initTime(1e3*e.end_time)}),console.log(n.data);case 8:case"end":return i.stop()}},i,t)}))()}}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"stopNotice"}},[i("div",{staticClass:"title"},[i("div",{staticClass:"botton"},[i("el-button",{attrs:{type:"danger"},on:{click:e.del}},[e._v("删除")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_stop_notice",expression:"'add_stop_notice'"}],attrs:{type:"primary"},on:{click:e.add}},[e._v("添加")])],1)]),e._v(" "),i("div",{directives:[{name:"has",rawName:"v-has",value:"stop_notice_records",expression:"'stop_notice_records'"}]},[i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"","default-sort":{prop:"ID",order:e.orderlist[0]},data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",align:"center"}}),e._v(" "),e._l(e.titleData,function(e,t){return i("el-table-column",{key:t,attrs:{prop:e.prop,label:e.label,align:"center","show-overflow-tooltip":"",sortable:"ID"===e.label}})}),e._v(" "),i("el-table-column",{attrs:{prop:"change",label:"",align:"center","show-overflow-tooltip":"",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_stop_notice",expression:"'modify_stop_notice'"}],attrs:{size:"mini"},on:{click:function(i){return e.handleEdit(t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_stop_notice",expression:"'delete_stop_notice'"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],2),e._v(" "),e.total>5?i("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1),e._v(" "),i("div",{staticClass:"dialog"},[i("el-dialog",{attrs:{title:e.title,visible:e.visible,"destroy-on-close":!0},on:{"update:visible":function(t){e.visible=t}}},[i("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"公告标题",prop:"title"}},[i("el-input",{attrs:{placeholder:"请输入停服公告标题"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"公告内容",prop:"info"}},[i("el-input",{attrs:{type:"textarea",placeholder:"请输入公告内容"},model:{value:e.form.info,callback:function(t){e.$set(e.form,"info",t)},expression:"form.info"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"公告落款",prop:"inscribe"}},[i("el-input",{attrs:{placeholder:"请输入公告落款"},model:{value:e.form.inscribe,callback:function(t){e.$set(e.form,"inscribe",t)},expression:"form.inscribe"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"通知时间",prop:"notice_time"}},[i("el-date-picker",{attrs:{type:"date",placeholder:"请输入通知时间",format:"yyyy 年 MM 月 dd 日","value-format":"yyyy-MM-dd"},model:{value:e.form.notice_time,callback:function(t){e.$set(e.form,"notice_time",t)},expression:"form.notice_time"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开始时间",prop:"start_time"}},[i("el-date-picker",{attrs:{type:"date",placeholder:"请输入结束时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:e.form.start_time,callback:function(t){e.$set(e.form,"start_time",t)},expression:"form.start_time"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"结束时间",prop:"end_time"}},[i("el-date-picker",{attrs:{type:"date",placeholder:"请输入结束时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:e.form.end_time,callback:function(t){e.$set(e.form,"end_time",t)},expression:"form.end_time"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("form",e.title)}}},[e._v("确 定")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.back()}}},[e._v("返 回")])],1)],1)],1)])},staticRenderFns:[]};var m=i("C7Lr")(l,c,!1,function(e){i("WPfr")},"data-v-43d8c9bc",null);t.default=m.exports},WPfr:function(e,t){}});
//# sourceMappingURL=68.37b7ff200ed36c9a08bd.js.map
webpackJsonp([43],{"N4/x":function(e,t){},"rU+Z":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("lC5x"),i=a.n(o),n=a("J0Oq"),s=a.n(n),r=a("a3Yh"),l=a.n(r),c=a("fftp"),m=a("zhQY"),d=a("06fe"),p=a("22Zk"),u=(d.a,c.a,p.a,{name:"withdraw_config",components:{InfoTableItem:d.a,InfoTable:c.a,InputArea:p.a},data:function(){return l()({pagesize:10,currentPage:1,total:0,imageUrl:"",fileList:[],tableData:[],dialogFormVisible:!1,dialogVisible:!1,formLabelWidth:"160px",dialogTitle:"",tableStyle:[{label:"ID",prop:"id",width:""},{label:"兑换方式",prop:"method",width:""},{label:"当前状态",prop:"online_status",width:""},{label:"兑换最小额度(元)",prop:"min_money",width:""},{label:"兑换最大额度(元)",prop:"max_money",width:""},{label:"角标",prop:"thumb",width:""},{label:"操作",prop:"action",width:"200"}],records:[],pageInfo:new m.a(1,[5,10,15],0),form:{id:null,pay_type:"",exchange_min:"",exchange_max:"",status:""},form2:{keep_money:1e3}},"fileList",[])},filters:{formatStatus:function(e){return 1===e?"下线":"上线"}},methods:{resetForm:function(){this.form={id:null,pay_type:"",exchange_min:"",exchange_max:"",status:""}},getExchangeList:function(){var e=this;return s()(i.a.mark(function t(){var a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("v1/backend/lobby/conversion",{params:{page:e.currentPage,limit:e.pagesize}});case 2:a=t.sent,console.log(a),1===a.data.code&&(e.records=a.data.data,e.total=a.data.total);case 5:case"end":return t.stop()}},t,e)}))()},addConfig:function(){var e=this;return s()(i.a.mark(function t(){var a,o,n,s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.form.id){t.next=10;break}return a={method:Number(e.form.pay_type),keep_money:e.form2.keep_money,min_money:Number(e.form.exchange_min),max_money:Number(e.form.exchange_max),online_status:Number(e.form.status),thumb:e.imageUrl},console.log(a),t.next=5,e.$http.post("v1/backend/lobby/conversion",a);case 5:1===(o=t.sent).data.code&&(e.dialogFormVisible=!1,e.getExchangeList()),console.log(o),t.next=16;break;case 10:return n={method:Number(e.form.pay_type),keep_money:e.form2.keep_money,min_money:Number(e.form.exchange_min),max_money:Number(e.form.exchange_max),online_status:Number(e.form.status),thumb:e.imageUrl,id:e.form.id},t.next=13,e.$http({method:"put",url:"v1/backend/lobby/conversion",data:n});case 13:s=t.sent,console.log(s),1===s.data.code&&(e.dialogFormVisible=!1,e.getExchangeList());case 16:case"end":return t.stop()}},t,e)}))()},openAdd:function(){this.dialogFormVisible=!0,this.dialogTitle="添加配置信息",this.resetForm(),this.imageUrl="",this.fileList=[]},handleEdit:function(e){console.log(e),this.dialogFormVisible=!0,this.dialogTitle="编辑配置信息",this.form.id=e.id,this.form.pay_type=String(e.method),this.form.exchange_min=e.min_money,this.form.exchange_max=e.max_money,this.form.status=String(e.online_status),this.imageUrl=e.thumb},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.delete("v1/backend/lobby/conversion",{params:{id:e.id}}).then(function(e){1===e.data.code&&(t.getExchangeList(),t.$message({type:"success",message:"删除成功!"}))})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},updateStatus:function(e){var t=this;this.$confirm("确认更新状态吗?","信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={id:e.id,online_status:1===e.online_status?2:1};t.$http.patch("v1/backend/lobby/conversion",a).then(function(e){1===e.data.code&&t.getExchangeList()})})},setKeepMoney:function(){this.dialogVisible=!1,this.$message({type:"success",message:"设置成功"})},handleAvatarSuccess:function(e,t){},handleChange:function(e,t){this.fileList=t},beforeUpload:function(e){},uploadFile:function(){var e=this,t=new FormData;this.fileList.forEach(function(e){t.append("filename",e.raw),t.append("types",1)}),this.$http.post("v1/backend/upload",t).then(function(t){console.log(t),1===t.data.code&&(e.imageUrl=t.data.path)})},handleSizeChange:function(e){this.pagesize=e,this.getExchangeList()},handleCurrentChange:function(e){this.currentPage=e,this.getExchangeList()},handleSelectionChange:function(e){this.multipleSelection=e},open:function(){var e=this;this.$prompt("保留金额","设置保留金额",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!0,inputValue:this.keep_money,inputType:"number"}).then(function(t){t.value;e.$message({type:"success",message:"操作成功"})}).catch(function(){e.$message({type:"info",message:"取消输入"})})}},mounted:function(){this.getExchangeList()}}),f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"ExchangeConf-main"}},[a("input-area",[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_withdraw_config",expression:"'add_withdraw_config'"}],staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{type:"primary"},on:{click:e.openAdd}},[e._v("添加")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("保留金额设置")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{directives:[{name:"has",rawName:"v-has",value:"withdraw_config_list",expression:"'withdraw_config_list'"}],attrs:{"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo,"hide-page":!0}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["method".indexOf(t.prop)>=0?[1===t.row[t.prop]?a("span",[e._v("支付宝")]):e._e(),e._v(" "),2===t.row[t.prop]?a("span",[e._v("银行卡")]):e._e()]:e._e(),e._v(" "),"online_status".indexOf(t.prop)>=0?[1===t.row[t.prop]?a("span",[e._v("上线")]):e._e(),e._v(" "),2===t.row[t.prop]?a("span",[e._v("下线")]):e._e()]:e._e(),e._v(" "),"thumb".indexOf(t.prop)>=0?[a("img",{attrs:{src:t.row[t.prop],width:"50",height:"50",alt:""}})]:e._e(),e._v(" "),"action"===t.prop?[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_withdraw_config",expression:"'modify_withdraw_config'"}],staticStyle:{"background-color":"#30a99d",color:"#fff"},attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_withdraw_config",expression:"'delete_withdraw_config'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"offline_withdraw_config",expression:"'offline_withdraw_config'"}],staticStyle:{"background-color":"#30a99d",color:"#fff"},attrs:{size:"mini"},on:{click:function(a){return e.updateStatus(t.row)}}},[e._v(e._s(e._f("formatStatus")(t.row.online_status)))])]:e._e(),e._v(" "),["action","method","thumb","online_status"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"支付方式","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.form.pay_type,callback:function(t){e.$set(e.form,"pay_type",t)},expression:"form.pay_type"}},[a("el-option",{attrs:{label:"支付宝",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"银行卡",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"最小兑换金额","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.exchange_min,callback:function(t){e.$set(e.form,"exchange_min",t)},expression:"form.exchange_min"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"最大兑换金额","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.exchange_max,callback:function(t){e.$set(e.form,"exchange_max",t)},expression:"form.exchange_max"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[a("el-option",{attrs:{label:"上线",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"下线",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"角标","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"",fileList:e.fileList,accept:"image/jpeg, image/png","show-file-list":!1,"on-change":e.handleChange,"before-upload":e.beforeUpload,"on-success":e.handleAvatarSuccess,"http-request":e.uploadFile}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addConfig}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"设置保留金额",visible:e.dialogVisible,width:"20%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{attrs:{model:e.form2}},[a("el-form-item",{attrs:{label:"保留金额","label-width":"100px"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form2.keep_money,callback:function(t){e.$set(e.form2,"keep_money",e._n(t))},expression:"form2.keep_money"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.setKeepMoney}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var h=a("C7Lr")(u,f,!1,function(e){a("N4/x")},"data-v-5630283d",null);t.default=h.exports}});
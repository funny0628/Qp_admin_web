webpackJsonp([37],{l4Oo:function(e,t){},vmZU:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("lC5x"),i=a.n(r),l=a("J0Oq"),o=a.n(l),n=a("EuRQ"),s={name:"payList",data:function(){return{orderlist:["ascending","descending"],tableData:[],total:0,currentPage:1,limit:10,visible:!1,title:"添加",searchinput:"",selectList:[],form:{id:"",pay_name:"",pay_channel:"",pay_way:"",is_diy:"",money_num:"",diy_max:"",diy_min:"",sort_num:"",pay_desc:"",o_status:"",o_activity:"",op_name:"op_name"},rules:{sort_num:[{required:!0,message:"必填项不可以为空,只能输入数字",trigger:"blur"}],pay_name:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],pay_channel:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],pay_way:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],is_diy:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],diy_max:[{required:!0,message:"必填项不可以为空,只能输入数字",trigger:"blur"}],diy_min:[{required:!0,message:"必填项不可以为空,只能输入数字",trigger:"blur"}],money_num:[{required:!0,message:"必填项不可以为空,只能输入数字",trigger:"blur"}],pay_desc:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],o_activity:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],o_status:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]}}},created:function(){this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},methods:{handleSelectionChange:function(e){var t=e.map(function(e){return e.id});this.selectList=t},handleEdit:function(e,t){this.editForm("更新",!0,this.formateNum(Object(n.a)(e))),this.$refs[t].resetFields()},handleDelete:function(e,t){var a=this;console.log(e,t.id),this.$confirm("确认删除吗？","信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(o()(i.a.mark(function e(){var r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.$http.HallFunConfig.DeletePaylist({id:t.id});case 2:r=e.sent,r.data,a.initdata({page:a.currentPage,limit:a.limit,title:a.searchinput}),a.$message({type:"success",message:"删除成功!"});case 6:case"end":return e.stop()}},e,a)}))).catch(function(){a.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(e){this.limit=e,this.currentPage=1,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},handleCurrentChange:function(e){this.currentPage=e,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},onSubmit:function(e,t){var a,r=this;this.$refs[e].validate((a=o()(i.a.mark(function e(a,l){var o,n,s,c;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=19;break}if("添加"!==t){e.next=10;break}return r.form.op_name="op_name",e.next=5,r.$http.HallFunConfig.PostPaylist(r.form);case 5:o=e.sent,1===(n=o.data).code&&"ok"===n.msg&&r.initdata({page:r.currentPage,limit:r.limit,title:r.searchinput}),e.next=16;break;case 10:if("更新"!==t){e.next=16;break}return e.next=13,r.$http.HallFunConfig.PutPaylist(r.form);case 13:s=e.sent,1===(c=s.data).code&&"ok"===c.msg&&r.initdata({page:r.currentPage,limit:r.limit,title:r.searchinput});case 16:r.editForm("添加",!1,{}),e.next=21;break;case 19:return console.log("error submit!!"),e.abrupt("return",!1);case 21:case"end":return e.stop()}},e,r)})),function(e,t){return a.apply(this,arguments)}))},dialogFormVisible:function(){this.editForm("添加",!1,{})},add:function(e){this.editForm("添加",!0,{}),this.$refs[e].resetFields()},del:function(){var e=this;return o()(i.a.mark(function t(){var a,r,l;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(0==e.selectList.length){t.next=9;break}return a=e.selectList.join(),t.next=4,e.$http.HallFunConfig.DeletePaylist({id_list:"("+a+")"});case 4:r=t.sent,1===(l=r.data).code&&"ok"===l.msg&&e.initdata({page:e.currentPage,limit:e.limit,title:e.searchinput}),t.next=10;break;case 9:e.$message("请选择需要删除的数据");case 10:case"end":return t.stop()}},t,e)}))()},search:function(){""===this.searchinput&&this.$message({type:"warning",message:"请输入你要搜索的支付名称!"}),this.currentPage=1,this.limit=10,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},editForm:function(e,t,a){this.title=e,this.visible=t,this.form=a},formateData:function(e){var t=this;return Array.isArray(e)?e.forEach(function(e){t.formate(e)}):this.formate(e),e},formate:function(e){switch(e.is_diy=1===e.is_diy?"固定金额":"自定义金额",e.o_status=1===e.o_status?"不生效":"生效",e.o_activity=1===e.o_activity?"不推荐":"推荐",e.pay_way){case 1:e.pay_way="支付宝";break;case 2:e.pay_way="微信";break;case 3:e.pay_way="银联";break;case 4:e.pay_way="银行转账";break;case 5:e.pay_way="VIP充值"}},formateNum:function(e){if("number"!=typeof e.is_diy||"number"!=typeof e.o_status||"number"!=typeof e.o_activity||"number"!=typeof e.pay_way){switch(e.is_diy="固定金额"===e.is_diy?1:2,e.o_status="不生效"===e.o_status?1:2,e.o_activity="不推荐"===e.o_activity?1:2,e.pay_way){case"支付宝":e.pay_way=1;break;case"微信":e.pay_way=2;break;case"银联":e.pay_way=3;break;case"银行转账":e.pay_way=4;break;case"VIP充值":e.pay_way=5}return e}},initdata:function(e){var t=this;return o()(i.a.mark(function a(){var r,l,o;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$http.HallFunConfig.GetPaylist(e);case 2:r=a.sent,l=r.data,o=t.formateData(Object(n.a)(l.data)),t.tableData=o,t.total=l.total;case 7:case"end":return a.stop()}},a,t)}))()}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"payList"}},[a("div",{staticClass:"title"},[a("div",{staticClass:"botton"},[a("el-button",{attrs:{type:"danger"},on:{click:e.del}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.add("form")}}},[e._v("添加")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")])],1),e._v(" "),a("el-input",{staticClass:"el_input",staticStyle:{width:"200px"},attrs:{placeholder:"请输入支付名称"},model:{value:e.searchinput,callback:function(t){e.searchinput=t},expression:"searchinput"}})],1),e._v(" "),a("div",{staticClass:"table"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"","default-sort":{prop:"ID",order:e.orderlist[0]},data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"id",label:"ID",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sort_num",label:"排序",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_name",label:"支付名称",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_channel",label:"支付渠道",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_way",label:"支付方式",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"money_num",label:"固定金额",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"is_diy",label:"充值类型",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"diy_max",label:"自定义最大金额",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"diy_min",label:"可自定义最小金额",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_desc",label:"支付备注",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"o_status",label:"是否生效",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"o_activity",label:"是否推荐",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"op_name",label:"操作者",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"update_time",label:"操作时间",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"change",label:"",align:"center","show-overflow-tooltip":"",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.row,"form")}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),e.total>10?a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[5,10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1),e._v(" "),a("div",{staticClass:"form"},[a("el-dialog",{attrs:{title:e.title,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"显示排序",prop:"sort_num"}},[a("el-input",{attrs:{placeholder:"显示排序"},model:{value:e.form.sort_num,callback:function(t){e.$set(e.form,"sort_num",t)},expression:"form.sort_num"}}),e._v(" "),a("span",[e._v("排序只可以为数字")])],1),e._v(" "),a("el-form-item",{attrs:{label:"支付名称",prop:"pay_name"}},[a("el-input",{attrs:{placeholder:"支付名称"},model:{value:e.form.pay_name,callback:function(t){e.$set(e.form,"pay_name",t)},expression:"form.pay_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"支付渠道(小类)",prop:"pay_channel"}},[a("el-input",{attrs:{placeholder:"支付渠道名称"},model:{value:e.form.pay_channel,callback:function(t){e.$set(e.form,"pay_channel",t)},expression:"form.pay_channel"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"支付方式(大类)",prop:"pay_way"}},[a("el-select",{model:{value:e.form.pay_way,callback:function(t){e.$set(e.form,"pay_way",t)},expression:"form.pay_way"}},[a("el-option",{attrs:{label:"支付宝",value:1}}),e._v(" "),a("el-option",{attrs:{label:"微信",value:2}}),e._v(" "),a("el-option",{attrs:{label:"银联",value:3}}),e._v(" "),a("el-option",{attrs:{label:"银行卡转账",value:4}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"自定义金额",prop:"is_diy"}},[a("el-radio-group",{model:{value:e.form.is_diy,callback:function(t){e.$set(e.form,"is_diy",t)},expression:"form.is_diy"}},[a("el-radio",{attrs:{label:1}},[e._v("固定金额")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("自定义金额")])],1)],1),e._v(" "),2===e.form.is_diy?a("p",[a("el-form-item",{attrs:{label:"最大自定义金额",prop:"diy_max"}},[a("el-input",{model:{value:e.form.diy_max,callback:function(t){e.$set(e.form,"diy_max",t)},expression:"form.diy_max"}}),e._v(" "),a("span",[e._v("金额只可以为数字")])],1),e._v(" "),a("el-form-item",{attrs:{label:"最小自定义金额",prop:"diy_min"}},[a("el-input",{model:{value:e.form.diy_min,callback:function(t){e.$set(e.form,"diy_min",t)},expression:"form.diy_min"}}),e._v(" "),a("span",[e._v("金额只可以为数字")])],1)],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"常用充值金额",prop:"money_num"}},[a("el-input",{attrs:{placeholder:"请输入充值金额"},model:{value:e.form.money_num,callback:function(t){e.$set(e.form,"money_num",t)},expression:"form.money_num"}}),e._v(" "),a("span",[e._v("金额只可以为数字")])],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"pay_desc"}},[a("el-input",{model:{value:e.form.pay_desc,callback:function(t){e.$set(e.form,"pay_desc",t)},expression:"form.pay_desc"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否推荐",prop:"o_activity"}},[a("el-radio-group",{model:{value:e.form.o_activity,callback:function(t){e.$set(e.form,"o_activity",t)},expression:"form.o_activity"}},[a("el-radio",{attrs:{label:1}},[e._v("不推荐")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("推荐")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"是否生效",prop:"o_status"}},[a("el-radio-group",{model:{value:e.form.o_status,callback:function(t){e.$set(e.form,"o_status",t)},expression:"form.o_status"}},[a("el-radio",{attrs:{label:1}},[e._v("不生效")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("生效中")])],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("form",e.title)}}},[e._v("确 定")]),e._v(" "),a("el-button",{on:{click:e.dialogFormVisible}},[e._v("返 回")])],1)],1)],1)])},staticRenderFns:[]};var u=a("C7Lr")(s,c,!1,function(e){a("l4Oo")},"data-v-503a5db2",null);t.default=u.exports}});
//# sourceMappingURL=37.722a7c5dd94a0e72148d.js.map
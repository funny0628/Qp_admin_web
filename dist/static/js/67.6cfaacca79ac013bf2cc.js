webpackJsonp([67],{"1AP9":function(e,t){},vmZU:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("ZLEe"),r=a.n(i),n=a("3cXf"),s=a.n(n),o=a("lC5x"),l=a.n(o),c=a("J0Oq"),p=a.n(c),u=a("EuRQ"),m={name:"pay_list",data:function(){return{orderlist:["ascending","descending"],tableData:[],total:0,currentPage:1,limit:10,visible:!1,title:"添加",searchinput:"",selectList:[],form:{id:"",pay_name:"",pay_channel:"",pay_way:"",is_diy:"",money_list:"",diy_max:"",diy_min:"",sort_id:"",pay_desc:"",o_status:"",o_activity:"",op_name:"op_name",pay_info:{}},rules:{sort_id:[{required:!0,message:"必填项不可以为空,只能输入数字",trigger:"blur"}],pay_name:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],pay_channel:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],pay_way:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],pay_info:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],is_diy:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],diy_max:[{required:!0,message:"必填项不可以为空,只能输入数字",trigger:"blur"}],diy_min:[{required:!0,message:"必填项不可以为空,只能输入数字",trigger:"blur"}],money_list:[{required:!0,message:"必填项不可以为空,只能输入数字",trigger:"blur"}],pay_desc:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],o_activity:[{required:!0,message:"必填项不可以为空",trigger:"blur"}],o_status:[{required:!0,message:"必填项不可以为空",trigger:"blur"}]},opaObj:[],SmopaObj:[],pay_info:{rece_name:"",rece_card_id:"",rece_bank_name:"",rece_bank_subname:"",rece_time_limit:""},titleData:[{prop:"id",label:"ID"},{prop:"sort_id",label:"排序"},{prop:"pay_name",label:"支付名称"},{prop:"pay_channel",label:"支付渠道"},{prop:"pay_way",label:"支付方式"},{prop:"money_list",label:"固定充值金额"},{prop:"is_diy",label:"充值类型"},{prop:"diy_max",label:"自定义最大金额"},{prop:"diy_min",label:"可自定义最小金额"},{prop:"pay_desc",label:"支付备注"},{prop:"o_status",label:"是否生效"},{prop:"o_activity",label:"是否推荐"},{prop:"op_name",label:"操作者"},{prop:"created_at",label:"操作时间"}]}},created:function(){this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput}),this.initopa(),this.initSopa()},methods:{handleSelectionChange:function(e){var t=e.map(function(e){return e.id});this.selectList=t},handleEdit:function(e,t){"unioncard"===e.pay_way&&(this.pay_info=JSON.parse(e.pay_info));var a=/[\u4e00-\u9fa5]/;a.test(e.pay_channel)&&this.SmopaObj.forEach(function(t){t.label===e.pay_channel&&(e.pay_channel=t.value)}),a.test(e.pay_way)&&this.opaObj.forEach(function(t){t.label===e.pay_way&&(e.pay_way=t.value)}),this.editForm("更新",!0,this.formateNum(Object(u.a)(e)))},handleDelete:function(e,t){var a=this;this.$confirm("确认删除吗？","信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(p()(l.a.mark(function e(){var i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.$http.HallFunConfig.DeletePaylist({id:t.id});case 2:i=e.sent,1===i.data.code&&(a.currentPage=1,a.limit=10,a.initdata({page:a.currentPage,limit:a.limit,title:a.searchinput}),a.$message({type:"success",message:"删除成功!"}));case 5:case"end":return e.stop()}},e,a)}))).catch(function(){a.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(e){this.limit=e,this.currentPage=1,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},handleCurrentChange:function(e){this.currentPage=e,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},onSubmit:function(e,t){var a,i=this;this.$refs[e].validate((a=p()(l.a.mark(function e(a,r){var n,o,c,p;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=25;break}if(i.form.op_name="op_name",i.form.pay_info=s()(i.pay_info),"添加"!==t){e.next=12;break}return e.next=6,i.$http.HallFunConfig.PostPaylist(i.form);case 6:n=e.sent,o=n.data,console.log(o),1===o.code&&"ok"===o.msg?(i.initdata({page:i.currentPage,limit:i.limit,title:i.searchinput}),i.$message({type:"success",message:"新增成功!"})):i.$message({type:"warning",message:"新增失败!"}),e.next=21;break;case 12:if("更新"!==t){e.next=21;break}return delete i.form.created_at,delete i.form.updated_at,console.log(i.form),e.next=18,i.$http.HallFunConfig.PutPaylist(i.form);case 18:c=e.sent,1===(p=c.data).code&&"ok"===p.msg?(i.initdata({page:i.currentPage,limit:i.limit,title:i.searchinput}),i.$message({type:"success",message:"更新成功!"})):i.$message({type:"warning",message:"更新失败!"});case 21:i.pay_info={rece_name:"",rece_card_id:"",rece_bank_name:"",rece_bank_subname:"",rece_time_limit:""},i.editForm("添加",!1,{}),e.next=27;break;case 25:return console.log("error submit!!"),e.abrupt("return",!1);case 27:case"end":return e.stop()}},e,i)})),function(e,t){return a.apply(this,arguments)}))},dialogFormVisible:function(){this.editForm("添加",!1,{})},add:function(e){this.editForm("添加",!0,{})},del:function(){var e=this;return p()(l.a.mark(function t(){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:0!=e.selectList.length?(a=e.selectList.join(),e.$confirm("确认删除吗？","信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(p()(l.a.mark(function t(){var i,r;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.DeletePaylist({id_list:"("+a+")"});case 2:i=t.sent,1===(r=i.data).code&&"ok"===r.msg&&e.initdata({page:e.currentPage,limit:e.limit,title:e.searchinput}),e.$message({type:"success",message:"删除成功!"});case 6:case"end":return t.stop()}},t,e)}))).catch(function(){e.$message({type:"info",message:"已取消删除"})})):e.$message("请选择需要删除的数据");case 1:case"end":return t.stop()}},t,e)}))()},search:function(){""===this.searchinput&&this.$message({type:"warning",message:"请输入你要搜索的支付名称!"}),this.currentPage=1,this.limit=10,this.initdata({page:this.currentPage,limit:this.limit,title:this.searchinput})},editForm:function(e,t,a){this.title=e,this.visible=t,this.form=a},formateData:function(e){var t=this;return Array.isArray(e)?e.forEach(function(e){t.formate(e)}):this.formate(e),e},timestampToTime:function(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+(t.getDate()+" ")+(t.getHours()+":")+(t.getMinutes()+":")+t.getSeconds()},formate:function(e){e.is_diy=0===e.is_diy?"固定":"可自定义",e.o_status=1===e.o_status?"不生效":"生效",e.o_activity=1===e.o_activity?"不推荐":"推荐",e.created_at=this.timestampToTime(e.created_at)},formateNum:function(e){if("number"!=typeof e.is_diy||"number"!=typeof e.o_status||"number"!=typeof e.o_activity||"number"!=typeof e.pay_way)return e.is_diy="固定"===e.is_diy?1:2,e.o_status="不生效"===e.o_status?1:2,e.o_activity="不推荐"===e.o_activity?1:2,e},initdata:function(e){var t=this;return p()(l.a.mark(function a(){var i,r,n;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$http.HallFunConfig.GetPaylist(e);case 2:i=a.sent,r=i.data,n=t.formateData(Object(u.a)(r.data)),t.tableData=n,t.total=r.total;case 7:case"end":return a.stop()}},a,t)}))()},initopa:function(){var e=this;return p()(l.a.mark(function t(){var a,i,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetNameLiat({type_id:2});case 2:a=t.sent,i=a.data.data[0],n=[],r()(i).forEach(function(e){n.push({label:i[e],value:e})}),e.opaObj=n,console.log(e.opaObj);case 8:case"end":return t.stop()}},t,e)}))()},initSopa:function(){var e=this;return p()(l.a.mark(function t(){var a,i,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.HallFunConfig.GetNameLiat({type_id:9});case 2:a=t.sent,i=a.data.data[0],n=[],r()(i).forEach(function(e){n.push({label:i[e],value:e})}),e.SmopaObj=n,console.log(e.SmopaObj);case 8:case"end":return t.stop()}},t,e)}))()}}},_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"payList"}},[a("div",{staticClass:"title"},[a("div",{staticClass:"botton"},[a("el-button",{attrs:{type:"danger"},on:{click:e.del}},[e._v("删除")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_pay_record",expression:"'add_pay_record'"}],attrs:{type:"primary"},on:{click:function(t){return e.add("form")}}},[e._v("添加")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")])],1),e._v(" "),a("el-input",{staticClass:"el_input",staticStyle:{width:"200px"},attrs:{placeholder:"请输入支付名称"},model:{value:e.searchinput,callback:function(t){e.searchinput=t},expression:"searchinput"}})],1),e._v(" "),a("div",{directives:[{name:"has",rawName:"v-has",value:"pay_records",expression:"'pay_records'"}],staticClass:"table"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"","default-sort":{prop:"ID",order:e.orderlist[0]},data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",align:"center"}}),e._v(" "),e._l(e.titleData,function(e,t){return a("el-table-column",{key:t,attrs:{prop:e.prop,label:e.label,align:"center","show-overflow-tooltip":"",sortable:"ID"===e.label}})}),e._v(" "),a("el-table-column",{attrs:{prop:"change",label:"",align:"center","show-overflow-tooltip":"",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_pay_record",expression:"'modify_pay_record'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.row,"form")}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_pay_record",expression:"'delete_pay_record'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],2),e._v(" "),e.total>10?a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1),e._v(" "),a("div",{staticClass:"form"},[a("el-dialog",{attrs:{title:e.title,visible:e.visible,"destroy-on-close":!0},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"显示排序",prop:"sort_id"}},[a("el-input",{attrs:{placeholder:"显示排序"},model:{value:e.form.sort_id,callback:function(t){e.$set(e.form,"sort_id",t)},expression:"form.sort_id"}}),e._v(" "),a("span",[e._v("排序只可以为数字")])],1),e._v(" "),a("el-form-item",{attrs:{label:"支付名称",prop:"pay_name"}},[a("el-input",{attrs:{maxlength:"5",placeholder:"支付名称"},model:{value:e.form.pay_name,callback:function(t){e.$set(e.form,"pay_name",t)},expression:"form.pay_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"支付渠道(小类)",prop:"pay_channel"}},[a("el-select",{model:{value:e.form.pay_channel,callback:function(t){e.$set(e.form,"pay_channel",t)},expression:"form.pay_channel"}},e._l(e.SmopaObj,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"支付方式(大类)",prop:"pay_way"}},[a("el-select",{model:{value:e.form.pay_way,callback:function(t){e.$set(e.form,"pay_way",t)},expression:"form.pay_way"}},e._l(e.opaObj,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),"unioncard"===e.form.pay_way?a("el-form-item",{attrs:{label:"转账银行卡配置",prop:""}},[a("el-row",[a("el-col",{attrs:{span:12}},[e._v(" \n                  收款人: "),a("el-input",{staticClass:"el_input",staticStyle:{width:"200px","margin-top":"20px"},attrs:{placeholder:"收款人"},model:{value:e.pay_info.rece_name,callback:function(t){e.$set(e.pay_info,"rece_name",t)},expression:"pay_info.rece_name"}})],1),e._v(" "),a("el-col",{attrs:{span:12}},[e._v(" \n                  卡号: "),a("el-input",{staticClass:"el_input",staticStyle:{width:"200px","margin-top":"20px"},attrs:{placeholder:"卡号"},model:{value:e.pay_info.rece_card_id,callback:function(t){e.$set(e.pay_info,"rece_card_id",t)},expression:"pay_info.rece_card_id"}})],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[e._v(" \n                   银行名称: "),a("el-input",{staticClass:"el_input",staticStyle:{width:"200px","margin-top":"20px"},attrs:{placeholder:"银行名称"},model:{value:e.pay_info.rece_bank_name,callback:function(t){e.$set(e.pay_info,"rece_bank_name",t)},expression:"pay_info.rece_bank_name"}})],1),e._v(" "),a("el-col",{attrs:{span:12}},[e._v(" \n                   银行支行: "),a("el-input",{staticClass:"el_input",staticStyle:{width:"200px","margin-top":"20px"},attrs:{placeholder:"银行支行"},model:{value:e.pay_info.rece_bank_subname,callback:function(t){e.$set(e.pay_info,"rece_bank_subname",t)},expression:"pay_info.rece_bank_subname"}})],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[e._v(" \n                   付款时限: "),a("el-input",{staticClass:"el_input",staticStyle:{width:"200px","margin-top":"20px"},attrs:{placeholder:"付款时限"},model:{value:e.pay_info.rece_time_limit,callback:function(t){e.$set(e.pay_info,"rece_time_limit",t)},expression:"pay_info.rece_time_limit"}})],1),e._v(" "),a("el-col",{attrs:{span:12}})],1)],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"自定义金额",prop:"is_diy"}},[a("el-radio-group",{model:{value:e.form.is_diy,callback:function(t){e.$set(e.form,"is_diy",t)},expression:"form.is_diy"}},[a("el-radio",{attrs:{label:1}},[e._v("固定金额")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("自定义金额")])],1)],1),e._v(" "),2===e.form.is_diy?a("p",[a("el-form-item",{attrs:{label:"最大自定义金额",prop:"diy_max"}},[a("el-input",{model:{value:e.form.diy_max,callback:function(t){e.$set(e.form,"diy_max",t)},expression:"form.diy_max"}}),e._v(" "),a("span",[e._v("金额只可以为数字")])],1),e._v(" "),a("el-form-item",{attrs:{label:"最小自定义金额",prop:"diy_min"}},[a("el-input",{model:{value:e.form.diy_min,callback:function(t){e.$set(e.form,"diy_min",t)},expression:"form.diy_min"}}),e._v(" "),a("span",[e._v("金额只可以为数字")])],1)],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"常用充值金额",prop:"money_list"}},[a("el-input",{attrs:{placeholder:"请输入充值金额"},model:{value:e.form.money_list,callback:function(t){e.$set(e.form,"money_list",t)},expression:"form.money_list"}}),e._v(" "),a("span",[e._v("金额只可以为数字")])],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"pay_desc"}},[a("el-input",{model:{value:e.form.pay_desc,callback:function(t){e.$set(e.form,"pay_desc",t)},expression:"form.pay_desc"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否推荐",prop:"o_activity"}},[a("el-radio-group",{model:{value:e.form.o_activity,callback:function(t){e.$set(e.form,"o_activity",t)},expression:"form.o_activity"}},[a("el-radio",{attrs:{label:1}},[e._v("不推荐")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("推荐")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"是否生效",prop:"o_status"}},[a("el-radio-group",{model:{value:e.form.o_status,callback:function(t){e.$set(e.form,"o_status",t)},expression:"form.o_status"}},[a("el-radio",{attrs:{label:1}},[e._v("不生效")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("生效中")])],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("form",e.title)}}},[e._v("确 定")]),e._v(" "),a("el-button",{on:{click:e.dialogFormVisible}},[e._v("返 回")])],1)],1)],1)])},staticRenderFns:[]};var d=a("C7Lr")(m,_,!1,function(e){a("1AP9")},"data-v-398a9ddc",null);t.default=d.exports}});
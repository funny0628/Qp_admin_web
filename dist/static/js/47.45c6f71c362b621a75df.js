webpackJsonp([47],{HDJG:function(e,t){},syTM:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("3cXf"),o=a.n(i),l=a("lC5x"),r=a.n(l),n=a("J0Oq"),s=a.n(n),c=a("fftp"),m=(a("zhQY"),a("06fe")),d=a("22Zk"),f=(m.a,c.a,d.a,{name:"vip_rank_config",components:{InfoTableItem:m.a,InfoTable:c.a,InputArea:d.a},data:function(){return{pagesize:10,currentPage:1,total:0,dialogTitle:"",tableData:[],dialogFormVisible:!1,formLabelWidth:"160px",form:{vip_class:0,checkList:[],gold_flow:"",class_award:"",month_money:"",salary:"",salary_need_coin:"",vip_tip_text:"",probability:"",withdraw:"",avatar_id:"",avatar_name:"",avatar_deadline:"",use_deadline:"",unlock:""},fileList:{imgList1:[],imgList2:[],imgList3:[]},imageUrl:{imgList1:"",imgList2:"",imgList3:""},videoList:[],videoUrl:"",privilegeOpts:[]}},filters:{formatPrivilege:function(e){var t="";for(var a in e)t+=a+","+e[a]+" ";return t}},methods:{sendTabelData:function(){var e=this;this.$http.post("v1/backend/lobby/server_config_two",{type_id:1}).then(function(t){console.log(t),1===t.data.code&&e.$message({type:"success",message:t.data.msg})})},resetForm:function(){this.form={vip_class:0,checkList:[],gold_flow:"",class_award:"",month_money:"",salary_need_coin:"",salary:"",vip_tip_text:"",probability:"",withdraw:"",avatar_id:"",avatar_name:"",avatar_deadline:"",use_deadline:"",unlock:""},this.fileList={imgList1:[],imgList2:[],imgList3:[]},this.imageUrl={imgList1:"",imgList2:"",imgList3:""},this.videoList=[],this.videoUrl=""},getVipList:function(){var e=this;return s()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("v1/backend/lobby/grade",{params:{page:e.currentPage,limit:e.pagesize}});case 2:a=t.sent,console.log(a),1===a.data.code&&(e.tableData=a.data.data,e.total=a.data.total);case 5:case"end":return t.stop()}},t,e)}))()},handleSizeChange:function(e){this.pagesize=e,this.getVipList()},handleCurrentChange:function(e){this.currentPage=e,this.getVipList()},handleSelectionChange:function(e){this.multipleSelection=e,console.log(this.multipleSelection)},openAddDialog:function(){var e=this;return s()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.dialogTitle="添加信息",e.dialogFormVisible=!0,e.resetForm(),e.getPrivilegeList();case 4:case"end":return t.stop()}},t,e)}))()},addNewConf:function(){var e=this;return s()(r.a.mark(function t(){var a,i,l,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.form.grade_id){t.next=9;break}return a={level:Number(e.form.vip_class),privilege:o()(e.form.checkList),charge_coins:1e3*Number(e.form.gold_flow),enter_word:e.form.vip_tip_text,caishen_base_rate:Number(e.form.probability),speedup_weight:Number(e.form.withdraw),icon_url:e.imageUrl.imgList1,avator_id:Number(e.form.avatar_id),name:e.form.avatar_name,icon_type:Number(e.form.avatar_deadline),number_day:Number(e.form.use_deadline),no_condition:e.form.unlock,battery_url:e.imageUrl.imgList2,img_url:e.imageUrl.imgList3,video_url:e.videoUrl,award:Number(e.form.class_award),salary:Number(e.form.salary),salary_need_coin:Number(e.form.salary_need_coin)},t.next=4,e.$http.post("v1/backend/lobby/grade",a);case 4:i=t.sent,console.log(i),1===i.data.code&&(e.dialogFormVisible=!1,e.getVipList()),t.next=16;break;case 9:return console.log(e.form.checkList),l={level:Number(e.form.vip_class),privilege:e.form.checkList,charge_coins:1e3*Number(e.form.gold_flow),enter_word:e.form.vip_tip_text,caishen_base_rate:Number(e.form.probability),speedup_weight:Number(e.form.withdraw),icon_url:e.imageUrl.imgList1,avator_id:Number(e.form.avatar_id),name:e.form.avatar_name,icon_type:Number(e.form.avatar_deadline),number_day:Number(e.form.use_deadline),no_condition:e.form.unlock,battery_url:e.imageUrl.imgList2,img_url:e.imageUrl.imgList3,video_url:e.videoUrl,grade_id:e.form.grade_id},t.next=13,e.$http.put("v1/backend/lobby/grade",l);case 13:n=t.sent,console.log(n),1===n.data.code&&(e.dialogFormVisible=!1,e.getVipList());case 16:case"end":return t.stop()}},t,e)}))()},handleOffline:function(){var e=this;this.$confirm("确认更新状态吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$message({type:"success",message:"更新成功!"})}).catch(function(){e.$message({type:"info",message:"已取消更新"})})},handleEdit:function(e,t){console.log(e,t),this.dialogFormVisible=!0,this.dialogTitle="更新信息",this.getPrivilegeList(),this.form.grade_id=t.id,this.form.vip_class=t.level,this.form.checkList=JSON.parse(t.privilege),this.form.gold_flow=t.charge_coins,this.form.class_award=t.award,this.form.month_money=t.consecrate,this.form.vip_tip_text=t.enter_word,this.form.probability=t.caishen_base_rate,this.form.withdraw=t.speedup_weight,this.form.avatar_id=t.avator_id,this.form.avatar_name=t.avator_name,this.form.avatar_deadline=o()(t.icon_type),this.form.use_deadline=t.number_day,this.form.unlock=t.no_condition,this.imageUrl.imgList1=t.icon_border_url,this.imageUrl.imgList2=t.battery_url,this.imageUrl.imgList3=t.video_url,this.videoUrl=t.video_url},handleDelete:function(e,t){var a=this;console.log(e,t),this.$confirm("确认删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$http.delete("v1/backend/lobby/grade",{params:{type_id:3,grade_id:""+t.id}}).then(function(e){console.log(e),1===e.data.code&&a.getVipList()}),a.$message({type:"success",message:"删除成功!"})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},getPrivilegeList:function(){var e=this;this.$http.get("v1/backend/lobby/name_type",{params:{type_id:5}}).then(function(t){1===t.data.code&&(e.privilegeOpts=t.data.data)})},open:function(){var e=this;this.$confirm("确认发送吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$message({type:"success",message:"发送成功!"})}).catch(function(){e.$message({type:"info",message:"已取消发送"})})},handleChange:function(e,t,a){console.log(t),console.log(a),this.fileList[a]=t,console.log(this.fileList)},beforeUpload:function(e){},handleAvatarSuccess:function(){},uploadFile:function(e){var t=this;console.log(e),console.log(this.fileList[e]);var a=new FormData;this.fileList[e].forEach(function(e){a.append("filename",e.raw),a.append("types",1)}),this.$http.post("v1/backend/upload",a).then(function(a){console.log(a),1===a.data.code&&(t.imageUrl[e]=a.data.path,console.log(t.imageUrl))})},changeHandle:function(e,t){console.log(e),console.log(t),this.videoList=t},uploadVideo:function(){var e=this,t=new FormData;this.videoList.forEach(function(e){t.append("filename",e.raw),t.append("types",2)}),this.$http.post("v1/backend/upload",t).then(function(t){console.log(t),1===t.data.code&&(e.videoUrl=t.data.path)})}},mounted:function(){this.getVipList()}}),u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"VipClassConf-main"}},[a("input-area",[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_vip_rank_config",expression:"'add_vip_rank_config'"}],staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{type:"primary"},on:{click:e.openAddDialog}},[e._v("添加")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.sendTabelData}},[e._v("发送到服务端配置")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("el-table",{directives:[{name:"has",rawName:"v-has",value:"vip_rank_config_records",expression:"'vip_rank_config_records'"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"id",label:"ID",sortable:"",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"level",label:"VIP等级",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"VIP特权",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("formatPrivilege")(JSON.parse(t.row.privilege))))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"icon_border_url",label:"头像框",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{attrs:{src:e.row.icon_border_url,width:"50",height:"50",alt:""}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_vip_rank_config",expression:"'modify_vip_rank_config'"}],attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_vip_rank_config",expression:"'delete_vip_rank_config'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form,"label-position":"left"}},[a("el-form-item",{attrs:{label:"VIP等级","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.vip_class,callback:function(t){e.$set(e.form,"vip_class",t)},expression:"form.vip_class"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"特权列表","label-width":e.formLabelWidth}},[a("el-checkbox-group",{model:{value:e.form.checkList,callback:function(t){e.$set(e.form,"checkList",t)},expression:"form.checkList"}},e._l(e.privilegeOpts,function(t,i){return a("el-checkbox",{key:i,attrs:{label:t.id+","+t.name,value:JSON.stringify(t.id)}},[e._v(e._s(t.name))])}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"所需累计金币流水","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.gold_flow,callback:function(t){e.$set(e.form,"gold_flow",t)},expression:"form.gold_flow"}}),e._v(" "),a("span",[e._v("充值金额(单位: 元)")])],1),e._v(" "),a("el-form-item",{attrs:{label:"等级奖励","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.class_award,callback:function(t){e.$set(e.form,"class_award",t)},expression:"form.class_award"}}),e._v(" "),a("span",[e._v("(单位: 元)")])],1),e._v(" "),a("el-form-item",{attrs:{label:"月俸禄","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.month_money,callback:function(t){e.$set(e.form,"month_money",t)},expression:"form.month_money"}}),e._v(" "),a("span",[e._v("(单位: 元)")])],1),e._v(" "),a("el-form-item",{attrs:{label:"月俸禄领取金币","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.salary,callback:function(t){e.$set(e.form,"salary",t)},expression:"form.salary"}}),e._v(" "),a("span",[e._v("(单位: 元)")])],1),e._v(" "),a("el-form-item",{attrs:{label:"月俸禄领取所需流水","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.salary_need_coin,callback:function(t){e.$set(e.form,"salary_need_coin",t)},expression:"form.salary_need_coin"}}),e._v(" "),a("span",[e._v("(单位: 元)")])],1),e._v(" "),a("el-form-item",{attrs:{label:"VIP进场提示语","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.vip_tip_text,callback:function(t){e.$set(e.form,"vip_tip_text",t)},expression:"form.vip_tip_text"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"财神驾到触发概率加成","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.probability,callback:function(t){e.$set(e.form,"probability",t)},expression:"form.probability"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"提现加速权重","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.withdraw,callback:function(t){e.$set(e.form,"withdraw",t)},expression:"form.withdraw"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"头像框ID","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.avatar_id,callback:function(t){e.$set(e.form,"avatar_id",t)},expression:"form.avatar_id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"头像框名称","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.avatar_name,callback:function(t){e.$set(e.form,"avatar_name",t)},expression:"form.avatar_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"头像框期限类型","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.avatar_deadline,callback:function(t){e.$set(e.form,"avatar_deadline",t)},expression:"form.avatar_deadline"}},[a("el-option",{attrs:{label:"永久",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"实时",value:"2"}})],1)],1),e._v(" "),"2"===e.form.avatar_deadline?a("el-form-item",{attrs:{label:"使用期限","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.use_deadline,callback:function(t){e.$set(e.form,"use_deadline",t)},expression:"form.use_deadline"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"解锁条件","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.unlock,callback:function(t){e.$set(e.form,"unlock",t)},expression:"form.unlock"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"头像框样式","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"",fileList:e.fileList.imgList1,accept:"image/jpeg, image/png","show-file-list":!1,"on-change":function(t,a,i){return e.handleChange(t,a,"imgList1")},"before-upload":e.beforeUpload,"on-success":e.handleAvatarSuccess,"http-request":function(t){return e.uploadFile("imgList1")}}},[e.imageUrl.imgList1?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl.imgList1}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"专属炮台图片","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"",fileList:e.fileList.imgList2,accept:"image/jpeg, image/png","show-file-list":!1,"on-change":function(t,a,i){return e.handleChange(t,a,"imgList2")},"before-upload":e.beforeUpload,"on-success":e.handleAvatarSuccess,"http-request":function(t){return e.uploadFile("imgList2")}}},[e.imageUrl.imgList2?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl.imgList2}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"视频缩略图上传","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"",fileList:e.fileList.imgList3,accept:"image/jpeg, image/png","show-file-list":!1,"on-change":function(t,a,i){return e.handleChange(t,a,"imgList3")},"before-upload":e.beforeUpload,"on-success":e.handleAvatarSuccess,"http-request":function(t){return e.uploadFile("imgList3")}}},[e.imageUrl.imgList3?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl.imgList3}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"炮台演示视频","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","show-file-list":!1,"on-change":e.changeHandle,"before-upload":e.beforeUpload,"on-success":e.handleAvatarSuccess,"http-request":e.uploadVideo}},[e.videoUrl?a("video",{staticClass:"avatar",attrs:{src:e.videoUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.addNewConf}},[e._v("确认")]),e._v(" "),a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("返回")])],1)],1)],1)},staticRenderFns:[]};var p=a("C7Lr")(f,u,!1,function(e){a("HDJG")},"data-v-6794ee81",null);t.default=p.exports}});
//# sourceMappingURL=47.45c6f71c362b621a75df.js.map
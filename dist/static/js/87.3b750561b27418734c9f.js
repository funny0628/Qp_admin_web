webpackJsonp([87],{BCpn:function(t,e){},"x/dN":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("3cXf"),a=o.n(i),n=o("lC5x"),r=o.n(n),l=o("J0Oq"),s=o.n(l),p=o("fftp"),c=(o("zhQY"),o("06fe")),m=o("22Zk"),f=(c.a,p.a,m.a,{name:"PayOrderRecord",components:{InfoTableItem:c.a,InfoTable:p.a,InputArea:m.a},data:function(){return{pagesize:5,currentPage:1,total:0,tableData:[],dialogFormVisible:!1,dialogVisible:!1,formLabelWidth:"120px",form:{min_coins:"",max_coins:"",vip_0:"",vip_1:"",vip_2:"",vip_3:"",vip_4:"",vip_5:"",vip_6:""},dialogTitle:"",rankRobotProbList:{},id:0,keys:""}},created:function(){var t=this;return s()(r.a.mark(function e(){var o,i,a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.HallFunConfig.GetServerConfig({key:"robot_rank_vip.lua"});case 2:o=e.sent,i=o.data,console.log(i),t.id=i.data[0].id,t.keys=i.data[0].sys_key,a=JSON.parse(i.data[0].sys_val),console.log(a),t.rankRobotProbList=a;case 10:case"end":return e.stop()}},e,t)}))()},methods:{sendDataToServer:function(){var t=this;this.$http.post("api/lobby/server_config_two",{type_id:3}).then(function(e){console.log(e),1===e.data.code&&t.$message({type:"success",message:e.data.msg})})},resetForm:function(){this.form={min_coins:"",max_coins:"",vip_0:"",vip_1:"",vip_2:"",vip_3:"",vip_4:"",vip_5:"",vip_6:""}},getRobotConfList:function(){var t=this;this.$http.get("api/lobby/robot",{params:{page:this.currentPage,limit:this.pagesize}}).then(function(e){console.log(e),t.tableData=e.data.data,t.total=e.data.total})},openAddDialog:function(){this.dialogFormVisible=!0,this.dialogTitle="添加信息",this.resetForm()},addNewRobotConf:function(){var t=this;if(this.form.robot_id){var e={vip_0:this.form.vip_0,vip_1:this.form.vip_1,vip_2:this.form.vip_2,vip_3:this.form.vip_3,vip_4:this.form.vip_4,vip_5:this.form.vip_5,vip_6:this.form.vip_6},o={min_coins:Number(this.form.min_coins),max_coins:Number(this.form.max_coins),vip_rate:a()(e),robot_id:this.form.robot_id};this.$http.put("api/lobby/robot",o).then(function(e){console.log(e),1===e.data.code&&(t.dialogFormVisible=!1,t.getRobotConfList())})}else{var i={vip_0:this.form.vip_0,vip_1:this.form.vip_1,vip_2:this.form.vip_2,vip_3:this.form.vip_3,vip_4:this.form.vip_4,vip_5:this.form.vip_5,vip_6:this.form.vip_6},n={min_coins:Number(this.form.min_coins),max_coins:Number(this.form.max_coins),vip_rate:a()(i)};this.$http.post("api/lobby/robot",n).then(function(e){console.log(e),1===e.data.code&&(t.dialogFormVisible=!1,t.getRobotConfList())})}},handleEdit:function(t){console.log(t),this.dialogTitle="更新信息",this.dialogFormVisible=!0,this.form.robot_id=t.id,this.form.min_coins=t.min_coins,this.form.max_coins=t.max_coins,this.form.vip_0=JSON.parse(t.vip_rate).vip_0,this.form.vip_1=JSON.parse(t.vip_rate).vip_1,this.form.vip_2=JSON.parse(t.vip_rate).vip_2,this.form.vip_3=JSON.parse(t.vip_rate).vip_3,this.form.vip_4=JSON.parse(t.vip_rate).vip_4,this.form.vip_5=JSON.parse(t.vip_rate).vip_5,this.form.vip_6=JSON.parse(t.vip_rate).vip_6},handleDelete:function(t){var e=this;console.log(t),this.$confirm("确认删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.delete("api/lobby/robot",{params:{robot_id:t.id}}).then(function(t){console.log(t),1===t.data.code&&e.getRobotConfList()}),e.$message({type:"success",message:"删除成功!"})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},send:function(){var t=this;return s()(r.a.mark(function e(){var o,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,t.$http.HallFunConfig.PostServerConfig({keys:t.keys,values:a()(t.rankRobotProbList),id:t.id});case 3:o=e.sent,i=o.data,console.log(i),1===i.code&&"ok"===i.msg&&(t.loading=!1,t.$message({type:"success",message:"发送服务器配置成功!"}));case 7:case"end":return e.stop()}},e,t)}))()},save:function(){var t=this;return s()(r.a.mark(function e(){var o,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.HallFunConfig.PutServerConfig({keys:t.keys,values:a()(t.rankRobotProbList),id:t.id});case 2:o=e.sent,1===(i=o.data).code&&"ok"===i.msg&&(t.dialogVisible=!1,t.$message({type:"success",message:"保存成功!"}));case 5:case"end":return e.stop()}},e,t)}))()},handleSizeChange:function(t){this.pagesize=t,this.getRobotConfList()},handleCurrentChange:function(t){this.currentPage=t,this.getRobotConfList()},handleSelectionChange:function(t){this.multipleSelection=t},open:function(){var t=this;this.$confirm("确认发送吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$message({type:"success",message:"发送成功!"})}).catch(function(){t.$message({type:"info",message:"已取消发送"})})},handleRemove:function(t,e){console.log(t,e)},handlePreview:function(t){console.log(t)}},mounted:function(){this.getRobotConfList()}}),_={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"VipClassConf-main"}},[o("input-area",[o("el-button",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{type:"danger"}},[t._v("删除")]),t._v(" "),o("el-button",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{type:"primary"},on:{click:t.openAddDialog}},[t._v("添加")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.sendDataToServer}},[t._v("发送到服务端配置")]),t._v(" "),o("el-button",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{type:"danger",size:"medium"},on:{click:function(e){t.dialogVisible=!0}}},[t._v("排行榜机器人随机概率")])],1),t._v(" "),o("div",{staticClass:"bd"},[o("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:t.tableData,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[o("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),o("el-table-column",{attrs:{prop:"id",label:"ID",align:"center"}}),t._v(" "),o("el-table-column",{attrs:{label:"机器人携带金币",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s([e.row.min_coins,e.row.max_coins]))]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"vip_rate",label:"VIP级别+概率",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(JSON.parse(e.row.vip_rate)))]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"create_time",label:"创建时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("dateFormat")(e.row.create_time)))]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"update_time",label:"更新时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("dateFormat")(e.row.update_time)))]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"action",label:"操作",fixed:"right",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){return t.handleEdit(e.row)}}},[t._v("编辑")]),t._v(" "),o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),o("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[5,10,15,20],"page-size":t.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),o("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[o("el-form",{attrs:{model:t.form}},[o("el-form-item",{attrs:{label:"携带金币","label-width":t.formLabelWidth}},[o("el-row",[o("el-col",{attrs:{span:10}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.min_coins,callback:function(e){t.$set(t.form,"min_coins",e)},expression:"form.min_coins"}})],1),t._v(" "),o("el-col",{staticStyle:{"text-align":"center"},attrs:{span:4}},[t._v("-")]),t._v(" "),o("el-col",{attrs:{span:10}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.max_coins,callback:function(e){t.$set(t.form,"max_coins",e)},expression:"form.max_coins"}})],1)],1),t._v(" "),o("span",[t._v("机器人携带金币(左闭右开)")])],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_0","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.vip_0,callback:function(e){t.$set(t.form,"vip_0",e)},expression:"form.vip_0"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_1","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.vip_1,callback:function(e){t.$set(t.form,"vip_1",e)},expression:"form.vip_1"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_2","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.vip_2,callback:function(e){t.$set(t.form,"vip_2",e)},expression:"form.vip_2"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_3","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.vip_3,callback:function(e){t.$set(t.form,"vip_3",e)},expression:"form.vip_3"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_4","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.vip_4,callback:function(e){t.$set(t.form,"vip_4",e)},expression:"form.vip_4"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_5","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.vip_5,callback:function(e){t.$set(t.form,"vip_5",e)},expression:"form.vip_5"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_6","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.vip_6,callback:function(e){t.$set(t.form,"vip_6",e)},expression:"form.vip_6"}})],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.addNewRobotConf}},[t._v("确 定")])],1)],1),t._v(" "),o("el-dialog",{attrs:{title:"排行榜机器人随机概率",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[o("el-form",{attrs:{model:t.form}},[o("div",{staticStyle:{"margin-bottom":"20px","font-size":"16px"}},[o("span",[t._v("排行榜机器人随机概率")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.send}},[t._v("发送到服务端配置")])],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_0","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.rankRobotProbList.vip_0,callback:function(e){t.$set(t.rankRobotProbList,"vip_0",e)},expression:"rankRobotProbList.vip_0"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_1","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.rankRobotProbList.vip_1,callback:function(e){t.$set(t.rankRobotProbList,"vip_1",e)},expression:"rankRobotProbList.vip_1"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_2","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.rankRobotProbList.vip_2,callback:function(e){t.$set(t.rankRobotProbList,"vip_2",e)},expression:"rankRobotProbList.vip_2"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_3","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.rankRobotProbList.vip_3,callback:function(e){t.$set(t.rankRobotProbList,"vip_3",e)},expression:"rankRobotProbList.vip_3"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_4","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.rankRobotProbList.vip_4,callback:function(e){t.$set(t.rankRobotProbList,"vip_4",e)},expression:"rankRobotProbList.vip_4"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_5","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.rankRobotProbList.vip_5,callback:function(e){t.$set(t.rankRobotProbList,"vip_5",e)},expression:"rankRobotProbList.vip_5"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"VIP_6","label-width":t.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:t.rankRobotProbList.vip_6,callback:function(e){t.$set(t.rankRobotProbList,"vip_6",e)},expression:"rankRobotProbList.vip_6"}})],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var v=o("C7Lr")(f,_,!1,function(t){o("BCpn")},"data-v-1bb92e8e",null);e.default=v.exports}});
//# sourceMappingURL=87.3b750561b27418734c9f.js.map
webpackJsonp([57],{lIeN:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("iVUn"),l=a("fftp"),i=a("zhQY"),r=a("Z/hU"),n=a("2u00"),s=(a("y35B"),a("22Zk")),d=a("06fe"),p=(r.a,d.a,s.a,o.a,l.a,n.a,{name:"change_coins",extends:r.a,components:{InfoTableItem:d.a,InputArea:s.a,SelectTime:o.a,InfoTable:l.a,PermissionButton:n.a},data:function(){return{pagesize:10,currentPage:1,total:0,dialogFormVisible:!1,formLabelWidth:"120px",format:{play_id:""},tableStyle:[{label:"玩家ID",prop:"uid",width:""},{label:"修改类型",prop:"type",width:""},{label:"修改途径",prop:"path",width:""},{label:"修改数量",prop:"value",width:""},{label:"备注",prop:"remarks",width:""},{label:"操作者",prop:"auth",width:""},{label:"操作时间",prop:"updated_at",width:""}],records:[],form:{play_id:"",mod_type:"",mod_path:"",mod_num:"",remark:""},pageInfo:new i.a(0,[5,10,15],5)}},methods:{getModGoldList:function(){var e=this,t={page:this.currentPage,limit:this.pagesize,user_id:Number(this.format.play_id)};this.$http.get("v1/backend/operation/coin-modify",{params:t}).then(function(t){console.log(t),200===t.data.code&&(e.records=t.data.data,e.total=t.data.total)})},modPlayGoldFn:function(){var e=this,t={user_id:Number(this.form.play_id),modify_type:Number(this.form.mod_type),modify_path:Number(this.form.mod_path),modify_value:Number(this.form.mod_num),remarks:this.form.remark};this.$http.post("v1/backend/operation/coin-modify",t).then(function(t){console.log(t),200===t.data.code&&(e.dialogFormVisible=!1,e.getModGoldList(),e.$message({type:"success",message:t.data.msg}))})},search:function(){},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){var a=this;console.log(t);var o=t.id.toString();console.log(o),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(this.$message({type:"success",message:res.data.msg})).catch(function(){a.$message({type:"info",message:res.data.msg})})},handleSizeChange:function(e){this.pagesize=e,this.getModGoldList()},handleCurrentChange:function(e){this.currentPage=e,this.getModGoldList()}},mounted:function(){this.getModGoldList()}}),m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"ModPlayGold-main"}},[a("input-area",[a("span",[e._v("玩家ID")]),e._v(" "),a("el-input",{attrs:{placeholder:"请输入玩家id",size:"medium",clearable:""},model:{value:e.format.play_id,callback:function(t){e.$set(e.format,"play_id",t)},expression:"format.play_id"}}),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("查找")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("修改金币")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo,"hide-page":!0}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["type".indexOf(t.prop)>=0?[1===t.row[t.prop]?a("span",[e._v("加金币")]):e._e(),e._v(" "),2===t.row[t.prop]?a("span",[e._v("减金币")]):e._e()]:e._e(),e._v(" "),"path".indexOf(t.prop)>=0?[1===t.row[t.prop]?a("span",[e._v("普通")]):e._e(),e._v(" "),2===t.row[t.prop]?a("span",[e._v("流水")]):e._e()]:e._e(),e._v(" "),"updated_at".indexOf(t.prop)>=0?[a("span",[e._v(e._s(e._f("dateFormat")(t.row.updated_at)))])]:e._e(),e._v(" "),["action","type","path","updated_at"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"修改玩家金币",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"玩家id","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.play_id,callback:function(t){e.$set(e.form,"play_id",t)},expression:"form.play_id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"修改类型","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.form.mod_type,callback:function(t){e.$set(e.form,"mod_type",t)},expression:"form.mod_type"}},[a("el-option",{attrs:{label:"减金币",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"修改途径","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.form.mod_path,callback:function(t){e.$set(e.form,"mod_path",t)},expression:"form.mod_path"}},[a("el-option",{attrs:{label:"普通",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"流水",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"修改数量","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.mod_num,callback:function(t){e.$set(e.form,"mod_num",t)},expression:"form.mod_num"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.modPlayGoldFn}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=a("C7Lr")(p,m,!1,function(e){a("xJpv")},"data-v-4317dd14",null);t.default=c.exports},xJpv:function(e,t){}});
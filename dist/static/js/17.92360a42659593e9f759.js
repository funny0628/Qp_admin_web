webpackJsonp([17],{"/0m9":function(e,t){},mUM0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("iVUn"),o=a("fftp"),s=a("zhQY"),r=a("Z/hU"),n=a("2u00"),m=(a("y35B"),a("22Zk")),l=a("06fe"),d=(r.a,l.a,m.a,i.a,o.a,n.a,{name:"game_list",extends:r.a,components:{InfoTableItem:l.a,InputArea:m.a,SelectTime:i.a,InfoTable:o.a,PermissionButton:n.a},data:function(){return{disabled:!1,pagesize:10,currentPage:1,total:0,formLabelWidth:"120px",showReturn:!1,value:!0,labelPosition:"left",tableStyle:[{label:"游戏名称",prop:"game_name",width:""},{label:"游戏类型",prop:"game_id",width:""},{label:"创建时间",prop:"created_at",width:""},{label:"操作",prop:"action",width:""}],records:[],tableData:[],pageInfo:new s.a(1,[5,10,15,20],6),dialogFormVisible:!1,dialogTitle:"",form:{classOneAddOrEditRemark:1,classTwoEditRemark:1,parent_id:0,sup_game:"大厅",game_name:"",game_id:"",robot_type:""},game_name:"",fileList:[]}},methods:{getGameList:function(){var e=this;this.$http.get("/v1/backend/lobby/game_list",{params:{page:this.currentPage,limit:this.pagesize,parent_id:this.form.parent_id}}).then(function(t){console.log(t),1===t.data.code&&(e.records=t.data.data,e.tableData=t.data.data.slice(1),e.total=t.data.total-1)})},resetForm:function(){this.form={classOneAddOrEditRemark:1,classTwoEditRemark:1,id:-1,parent_id:0,sup_game:"",game_name:"",game_id:"",robot_type:""}},openAdd:function(){this.dialogTitle="记录",this.dialogFormVisible=!0,this.resetForm(),console.log(this.form.parent_id)},addGame:function(){var e=this;if(0===this.form.parent_id&&1===this.form.classOneAddOrEditRemark){var t={parent_id:0,game_name:this.form.game_name,robot_type:this.form.robot_type,game_id:Number(this.form.game_id)};this.$http.post("/v1/backend/lobby/game_list",t).then(function(t){console.log(t),1===t.data.code&&(e.dialogFormVisible=!1,e.getGameList(),e.$message({type:"success",message:t.data.msg}))})}if(0===this.form.parent_id&&2===this.form.classOneAddOrEditRemark){console.log("我进来了？");var a={id:this.form.id,game_name:this.form.game_name};this.$http.patch("v1/backend/lobby/game_list",a).then(function(t){console.log(t),1===t.data.code&&(e.dialogFormVisible=!1,e.getGameList(),e.$message({type:"success",message:t.data.msg}))})}if(0!==this.form.parent_id&&2===this.form.classTwoEditRemark){var i={id:this.form.id,game_name:this.form.game_name};this.$http.patch("v1/backend/lobby/game_list",i).then(function(t){console.log(t),1===t.data.code&&(e.dialogFormVisible=!1,e.getGameList(),e.$message({type:"success",message:t.data.msg}))})}},handleEdit:function(e){console.log(e),this.dialogTitle="编辑",this.dialogFormVisible=!0,0===e.parent_id?(this.form.classOneAddOrEditRemark=2,this.form.id=e.game_id,this.form.parent_id=e.parent_id,this.form.sup_game="大厅",this.form.game_name=e.game_name,this.form.game_id=e.game_id,this.form.robot_type=e.robot_type,this.disabled=!0):(this.form.classTwoEditRemark=2,this.form.id=e.game_id,this.form.parent_id=e.parent_id,this.form.sup_game=this.game_name,this.form.game_name=e.game_name,this.form.game_id=e.game_id,this.form.robot_type=e.robot_type,this.disabled=!0,console.log(this.form))},handleDelete:function(e){var t=this;console.log(e),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.delete("v1/backend/lobby/game_list",{params:{game_id:e.game_id}}).then(function(e){1===e.data.code&&(t.getGameList(),t.$message({type:"success",message:"删除成功!"}))})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},checkSubGame:function(e){var t=this;console.log(e),this.showReturn=!0,this.game_name=e.game_name;var a=e.game_id;this.$http.get("v1/backend/lobby/game_list",{params:{page:this.currentPage,limit:this.pagesize,parent_id:a}}).then(function(e){console.log(e),1===e.data.code&&(t.tableData=e.data.data,t.total=e.data.total)})},returnSupClass:function(){this.showReturn=!1,this.resetForm(),this.getGameList()},search:function(){var e=this.format;this.userList(e,1e3)},handleSizeChange:function(e){this.pagesize=e,this.getGameList()},handleCurrentChange:function(e){this.currentPage=e,this.getGameList()}},watch:{"form.sup_game":function(e,t){var a=this;console.log(e,t),this.records.forEach(function(t,i){t.game_name===e&&(a.form.game_id=t.next_id,a.form.robot_type=t.robot_type,a.form.parent_id=t.game_id)})}},mounted:function(){this.getGameList()}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"GameList-main"}},[e.showReturn?e._e():a("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_game",expression:"'add_game'"}],staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{type:"primary"},on:{click:e.openAdd}},[e._v("添加")]),e._v(" "),e.showReturn?a("el-button",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{type:"primary"},on:{click:e.returnSupClass}},[e._v("返回")]):e._e(),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{directives:[{name:"has",rawName:"v-has",value:"game_records",expression:"'game_records'"}],attrs:{search:e.search,"table-style":e.tableStyle,records:e.tableData,"page-info":e.pageInfo,"hide-page":!0}},[a("info-table-item",{attrs:{"table-style":e.tableStyle,"hide-mul":!0},scopedSlots:e._u([{key:"default",fn:function(t){return["action"===t.prop?[e.showReturn?e._e():a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.checkSubGame(t.row)}}},[e._v("子游戏")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_game",expression:"'modify_game'"}],attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除")])]:e._e(),e._v(" "),["action"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"上级游戏","label-width":e.formLabelWidth}},[a("el-select",{attrs:{disabled:e.disabled},model:{value:e.form.sup_game,callback:function(t){e.$set(e.form,"sup_game",t)},expression:"form.sup_game"}},e._l(e.records,function(t,i){return a("el-option",{key:i,attrs:{value:t.game_name}},[e._v(e._s(t.game_name))])}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏名称","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.game_name,callback:function(t){e.$set(e.form,"game_name",t)},expression:"form.game_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏id","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"",autocomplete:"off"},model:{value:e.form.game_id,callback:function(t){e.$set(e.form,"game_id",t)},expression:"form.game_id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"机器人类型","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"",autocomplete:"off"},model:{value:e.form.robot_type,callback:function(t){e.$set(e.form,"robot_type",t)},expression:"form.robot_type"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addGame}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var g=a("C7Lr")(d,c,!1,function(e){a("/0m9")},"data-v-81f1005c",null);t.default=g.exports}});
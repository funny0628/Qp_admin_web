webpackJsonp([89],{IekG:function(e,t){},cIpR:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("lC5x"),o=a.n(i),r=a("J0Oq"),n=a.n(r),s=a("3cXf"),l=a.n(s),m=a("iVUn"),c=a("fftp"),f=a("zhQY"),d=a("Z/hU"),_=a("2u00"),p=(a("y35B"),a("22Zk")),u=a("06fe"),g=(a("CtzY"),d.a,u.a,p.a,m.a,c.a,_.a,{name:"broadcast_config",extends:d.a,components:{InfoTableItem:u.a,InputArea:p.a,SelectTime:m.a,InfoTable:c.a,PermissionButton:_.a},data:function(){return{pagesize:10,currentPage:1,total:0,formLabelWidth:"120px",dialogTitle:"",value:!0,labelPosition:"left",dialogFormVisible:!1,platforms:[{value:1,label:"平台1"},{value:2,label:"平台2"}],format:{platform:""},funOpts:[{value:"1",label:"留空"},{value:"2",label:"活动"},{value:"3",label:"邮件"},{value:"4",label:"排行榜"},{value:"5",label:"设置"},{value:"6",label:"保险箱"},{value:"7",label:"广播"},{value:"8",label:"财神"}],tableStyle:[{label:"ID",prop:"id",width:""},{label:"广播类型",prop:"type",width:""},{label:"游戏名称",prop:"game_name",width:""},{label:"信息",prop:"info",width:""},{label:"保留时间(秒)",prop:"exit_time",width:""},{label:"生成金币范围",prop:"coins_range",width:""},{label:"生成时间范围",prop:"time_range",width:""},{label:"触发金额",prop:"target_coins",width:""},{label:"操作",prop:"action",width:"150"}],records:[],pageInfo:new f.a(0,[5,10,15],5),dialogAddVisible:!1,form:{mid:"",type:"",game_name:"",info:"",exit_time:"",coins_range:["",""],time_range:["",""],target_coins:"",interval_time:"",is_need_fake:""}}},methods:{sendDataToServer:function(){var e=this;this.$http.post("v1/backend/lobby/server_config_two",{type_id:5}).then(function(t){console.log(t),1===t.data.code&&e.$message({type:"success",message:t.data.msg})})},getBroadcastList:function(){var e=this;this.$http.get("v1/backend/lobby/play_broadcast",{params:{page:this.currentPage,limit:this.pagesize}}).then(function(t){console.log(t),1===t.data.code&&(e.records=t.data.data,e.total=t.data.total)})},addBroadcast:function(){var e=this;if(this.form.id){var t={id:this.form.id,mid:Number(this.form.mid),type:Number(this.form.type),game_name:this.form.game_name,info:this.form.info,exit_time:Number(this.form.exit_time),coins_range:l()(this.form.coins_range),time_range:l()(this.form.time_range),target_coins:this.form.target_coins,interval_time:this.form.interval_time,is_need_fake:this.form.is_need_fake};this.$http.put("v1/backend/lobby/play_broadcast",t).then(function(t){console.log(t),1===t.data.code&&(e.dialogFormVisible=!1,e.getBroadcastList(),e.$message({type:"success",message:t.data.msg}))})}else{var a={mid:Number(this.form.mid),type:Number(this.form.type),game_name:this.form.game_name,info:this.form.info,exit_time:Number(this.form.exit_time),coins_range:l()(this.form.coins_range),time_range:l()(this.form.time_range),target_coins:this.form.target_coins,interval_time:this.form.interval_time,is_need_fake:this.form.is_need_fake};this.$http.post("v1/backend/lobby/play_broadcast",a).then(function(t){console.log(t),1===t.data.code&&(e.dialogFormVisible=!1,e.getBroadcastList(),e.$message({type:"success",message:t.data.msg}))})}},resetForm:function(){this.form={mid:"",type:"",game_name:"",info:"",exit_time:"",coins_range:["",""],time_range:["",""],target_coins:"",interval_time:"",is_need_fake:""}},handleEdit:function(e){console.log(e),this.dialogTitle="编辑系统广播",this.dialogFormVisible=!0,this.form.id=e.id,this.form.mid=e.mid,this.form.type=String(e.type),this.form.game_name=e.game_name,this.form.info=e.info,this.form.exit_time=String(e.exit_time),this.form.coins_range[0]=JSON.parse(e.coins_range)[0],this.form.coins_range[1]=JSON.parse(e.coins_range)[1],this.form.time_range[0]=JSON.parse(e.time_range)[0],this.form.time_range[1]=JSON.parse(e.time_range)[1],this.form.target_coins=e.target_coins,this.form.interval_time=e.interval_time,this.form.is_need_fake=String(e.is_need_fake)},handleDelete:function(e){var t=this;console.log(e);var a=e.id;this.$confirm("此操作将删除该项, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(n()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.delete("v1/backend/lobby/play_broadcast",{params:{id:a}}).then(function(e){console.log(e),1===e.data.code&&(t.getBroadcastList(),t.$message({type:"success",message:"删除成功!"}))});case 2:e.sent;case 3:case"end":return e.stop()}},e,t)}))).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleSizeChange:function(e){this.pagesize=e,this.getBroadcastList()},handleCurrentChange:function(e){this.currentPage=e,this.getBroadcastList()},search:function(){var e=this.format;this.userList(e,1e3)},openAdd:function(){this.dialogTitle="添加系统广播",this.dialogFormVisible=!0,this.resetForm()}},mounted:function(){this.getBroadcastList()}}),h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"BroadcastConf-main"}},[a("input-area",[a("div",[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_broadcast_config",expression:"'add_broadcast_config'"}],attrs:{type:"primary"},on:{click:e.openAdd}},[e._v("添加")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.sendDataToServer}},[e._v("发送到服务端配置")])],1)]),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{directives:[{name:"has",rawName:"v-has",value:"broadcast_config_list",expression:"'broadcast_config_list'"}],attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo,"hide-page":!0}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["type"===t.prop?[1===t.row[t.prop]?a("span",[e._v("对局广播")]):e._e(),e._v(" "),2===t.row[t.prop]?a("span",[e._v("vip上线广播")]):e._e(),e._v(" "),3===t.row[t.prop]?a("span",[e._v("引导弹窗广播")]):e._e()]:e._e(),e._v(" "),"action"===t.prop?[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_broadcast_config",expression:"'modify_broadcast_config'"}],attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_broadcast_config",expression:"'delete_broadcast_config'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除")])]:e._e(),e._v(" "),["action","type"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("div",[a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"ID","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.mid,callback:function(t){e.$set(e.form,"mid",t)},expression:"form.mid"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"类型","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[a("el-option",{attrs:{label:"对局广播",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"VIP上线广播",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"引导弹窗广播",value:"3"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏名称","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.game_name,callback:function(t){e.$set(e.form,"game_name",t)},expression:"form.game_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"公告信息","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.info,callback:function(t){e.$set(e.form,"info",t)},expression:"form.info"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"广播保留时间","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.exit_time,callback:function(t){e.$set(e.form,"exit_time",t)},expression:"form.exit_time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"金币范围","label-width":e.formLabelWidth}},[a("el-row",[a("el-col",{attrs:{span:10}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.coins_range[0],callback:function(t){e.$set(e.form.coins_range,0,t)},expression:"form.coins_range[0]"}})],1),e._v(" "),a("el-col",{staticStyle:{"text-align":"center"},attrs:{span:4}},[e._v("-")]),e._v(" "),a("el-col",{attrs:{span:10}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.coins_range[1],callback:function(t){e.$set(e.form.coins_range,1,t)},expression:"form.coins_range[1]"}})],1)],1),e._v(" "),a("span",[e._v("生成的金币范围格式: 100,5000")])],1),e._v(" "),a("el-form-item",{attrs:{label:"时间范围","label-width":e.formLabelWidth}},[a("el-row",[a("el-col",{attrs:{span:10}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.time_range[0],callback:function(t){e.$set(e.form.time_range,0,t)},expression:"form.time_range[0]"}})],1),e._v(" "),a("el-col",{staticStyle:{"text-align":"center"},attrs:{span:4}},[e._v("-")]),e._v(" "),a("el-col",{attrs:{span:10}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.time_range[1],callback:function(t){e.$set(e.form.time_range,1,t)},expression:"form.time_range[1]"}})],1)],1),e._v(" "),a("span",[e._v("生成的时间范围格式: 600,1200")])],1),e._v(" "),a("el-form-item",{attrs:{label:"触发金额","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.target_coins,callback:function(t){e.$set(e.form,"target_coins",t)},expression:"form.target_coins"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"时间间隔","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.interval_time,callback:function(t){e.$set(e.form,"interval_time",t)},expression:"form.interval_time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否MOCK数据","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.form.is_need_fake,callback:function(t){e.$set(e.form,"is_need_fake",t)},expression:"form.is_need_fake"}},[a("el-option",{attrs:{label:"否",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"是",value:"1"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addBroadcast}},[e._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var b=a("C7Lr")(g,h,!1,function(e){a("IekG")},"data-v-0eac11fe",null);t.default=b.exports}});
webpackJsonp([58],{J5bL:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("3cXf"),o=a.n(l),s=a("iVUn"),r=a("fftp"),_=(a("zhQY"),a("Z/hU")),m=a("2u00"),i=(a("y35B"),a("22Zk")),n=a("06fe"),c=(_.a,n.a,i.a,s.a,r.a,m.a,{name:"game_sort_config",extends:_.a,components:{InfoTableItem:n.a,InputArea:i.a,SelectTime:s.a,InfoTable:r.a,PermissionButton:m.a},data:function(){return{value:!0,labelPosition:"left",dialogFormVisible:!1,searchChannel:"",funOpts:[{value:"1",label:"留空"},{value:"2",label:"活动"},{value:"3",label:"邮件"},{value:"4",label:"排行榜"},{value:"5",label:"设置"},{value:"6",label:"保险箱"},{value:"7",label:"广播"},{value:"8",label:"财神"}],gameOpts:[],tableData:[],form:{id:null,checkList:[],game_1_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_2_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_3_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_4_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_5_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_6_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_7_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_8_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_9_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_10_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_11_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_12_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"}},gameList:{},channelOpts:[],allChannelOpts:[]}},methods:{resetForm:function(){this.form={id:null,checkList:[],game_1_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_2_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_3_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_4_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_5_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_6_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_7_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_8_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_9_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_10_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_11_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"},game_12_obj:{game_des:"",corner_remark:"0",status:"0",leader:"1"}}},sendDataToServer:function(){var e=this;this.$http.post("v1/backend/lobby/server_config_two",{type_id:4}).then(function(t){console.log(t),1===t.data.code&&e.$message({type:"success",message:t.data.msg})})},getGameSortList:function(){var e=this;this.$http.get("v1/backend/lobby/game_sort",{params:{page:1,limit:10}}).then(function(t){console.log(t),1===t.data.code&&(e.tableData=t.data.data,e.game_list_index(),console.log(e.tableData))})},game_list_index:function(){var e=this;this.tableData.map(function(t){var a=JSON.parse(t.game_list);for(var l in e.gameList=JSON.parse(t.game_list),a)t["game_"+l]=a[l].game_type})},getGameList:function(){var e=this;this.$http.get("v1/backend/lobby/all_game_list",{params:{page:this.currentPage,limit:this.pagesize,type_id:1}}).then(function(t){console.log(t),1===t.data.code&&(e.gameOpts=t.data.data)})},getAddChannelList:function(){var e=this;this.$http.post("v1/backend/no_channel",{type_id:1,add_id:2}).then(function(t){console.log(t),1===t.data.code&&(e.channelOpts=t.data.data)})},getEditChannelList:function(){var e=this;this.$http.post("v1/backend/no_channel",{type_id:2,add_id:2}).then(function(t){console.log(t),1===t.data.code&&(e.channelOpts=t.data.data)})},getAllChannelList:function(){var e=this;this.$http.post("v1/backend/no_channel",{type_id:2,add_id:2}).then(function(t){console.log(t),1===t.data.code&&(e.allChannelOpts=t.data.data)})},openAddDialog:function(){this.dialogFormVisible=!0,this.getAddChannelList(),this.getGameList(),this.resetForm()},addGameSortConf:function(){var e=this;if(this.form.id){var t={1:{position:1,game_type:this.form.game_1_obj.game_des,shown_type:1,notice_type:this.form.game_1_obj.corner_remark,status:this.form.game_1_obj.status,guide_status:this.form.game_1_obj.leader},2:{position:2,game_type:this.form.game_2_obj.game_des,shown_type:1,notice_type:this.form.game_2_obj.corner_remark,status:this.form.game_2_obj.status,guide_status:this.form.game_2_obj.leader},3:{position:3,game_type:this.form.game_3_obj.game_des,shown_type:1,notice_type:this.form.game_3_obj.corner_remark,status:this.form.game_3_obj.status,guide_status:this.form.game_3_obj.leader},4:{position:4,game_type:this.form.game_4_obj.game_des,shown_type:1,notice_type:this.form.game_4_obj.corner_remark,status:this.form.game_4_obj.status,guide_status:this.form.game_4_obj.leader},5:{position:5,game_type:this.form.game_5_obj.game_des,shown_type:1,notice_type:this.form.game_5_obj.corner_remark,status:this.form.game_5_obj.status,guide_status:this.form.game_5_obj.leader},6:{position:6,game_type:this.form.game_6_obj.game_des,shown_type:1,notice_type:this.form.game_6_obj.corner_remark,status:this.form.game_6_obj.status,guide_status:this.form.game_6_obj.leader},7:{position:7,game_type:this.form.game_7_obj.game_des,shown_type:7,notice_type:this.form.game_7_obj.corner_remark,status:this.form.game_7_obj.status,guide_status:this.form.game_7_obj.leader},8:{position:8,game_type:this.form.game_8_obj.game_des,shown_type:1,notice_type:this.form.game_8_obj.corner_remark,status:this.form.game_8_obj.status,guide_status:this.form.game_8_obj.leader},9:{position:9,game_type:this.form.game_9_obj.game_des,shown_type:1,notice_type:this.form.game_9_obj.corner_remark,status:this.form.game_9_obj.status,guide_status:this.form.game_9_obj.leader},10:{position:10,game_type:this.form.game_10_obj.game_des,shown_type:1,notice_type:this.form.game_10_obj.corner_remark,status:this.form.game_10_obj.status,guide_status:this.form.game_10_obj.leader},11:{position:11,game_type:this.form.game_11_obj.game_des,shown_type:1,notice_type:this.form.game_11_obj.corner_remark,status:this.form.game_11_obj.status,guide_status:this.form.game_11_obj.leader},12:{position:12,game_type:this.form.game_12_obj.game_des,shown_type:1,notice_type:this.form.game_12_obj.corner_remark,status:this.form.game_12_obj.status,guide_status:this.form.game_12_obj.leader}},a={id:this.form.id,name:String(this.form.checkList),code:String(this.form.checkList),game_list:o()(t)};this.$http.put("v1/backend/lobby/game_sort",a).then(function(t){console.log(t),1===t.data.code&&(e.dialogFormVisible=!1,e.getGameSortList())})}else{var l={1:{position:1,game_type:this.form.game_1_obj.game_des,shown_type:1,notice_type:this.form.game_1_obj.corner_remark,status:this.form.game_1_obj.status,guide_status:this.form.game_1_obj.leader},2:{position:2,game_type:this.form.game_2_obj.game_des,shown_type:1,notice_type:this.form.game_2_obj.corner_remark,status:this.form.game_2_obj.status,guide_status:this.form.game_2_obj.leader},3:{position:3,game_type:this.form.game_3_obj.game_des,shown_type:1,notice_type:this.form.game_3_obj.corner_remark,status:this.form.game_3_obj.status,guide_status:this.form.game_3_obj.leader},4:{position:4,game_type:this.form.game_4_obj.game_des,shown_type:1,notice_type:this.form.game_4_obj.corner_remark,status:this.form.game_4_obj.status,guide_status:this.form.game_4_obj.leader},5:{position:5,game_type:this.form.game_5_obj.game_des,shown_type:1,notice_type:this.form.game_5_obj.corner_remark,status:this.form.game_5_obj.status,guide_status:this.form.game_5_obj.leader},6:{position:6,game_type:this.form.game_6_obj.game_des,shown_type:1,notice_type:this.form.game_6_obj.corner_remark,status:this.form.game_6_obj.status,guide_status:this.form.game_6_obj.leader},7:{position:7,game_type:this.form.game_7_obj.game_des,shown_type:1,notice_type:this.form.game_7_obj.corner_remark,status:this.form.game_7_obj.status,guide_status:this.form.game_7_obj.leader},8:{position:8,game_type:this.form.game_8_obj.game_des,shown_type:1,notice_type:this.form.game_8_obj.corner_remark,status:this.form.game_8_obj.status,guide_status:this.form.game_8_obj.leader},9:{position:9,game_type:this.form.game_9_obj.game_des,shown_type:1,notice_type:this.form.game_9_obj.corner_remark,status:this.form.game_9_obj.status,guide_status:this.form.game_9_obj.leader},10:{position:10,game_type:this.form.game_10_obj.game_des,shown_type:1,notice_type:this.form.game_10_obj.corner_remark,status:this.form.game_10_obj.status,guide_status:this.form.game_10_obj.leader},11:{position:11,game_type:this.form.game_11_obj.game_des,shown_type:1,notice_type:this.form.game_11_obj.corner_remark,status:this.form.game_11_obj.status,guide_status:this.form.game_11_obj.leader},12:{position:12,game_type:this.form.game_12_obj.game_des,shown_type:1,notice_type:this.form.game_12_obj.corner_remark,status:this.form.game_12_obj.status,guide_status:this.form.game_12_obj.leader}},s={name:String(this.form.checkList),code:String(this.form.checkList),game_list:o()(l)};this.$http.post("v1/backend/lobby/game_sort",s).then(function(t){console.log(t),1===t.data.code&&(e.dialogFormVisible=!1,e.getGameSortList())})}},handleEdit:function(e){console.log(e),this.getEditChannelList(),this.getGameList(),this.dialogFormVisible=!0,this.form.id=e.id,this.form.checkList=[e.channel_name];var t=JSON.parse(e.game_list);for(var a in console.log(t),t)this.form["game_"+a+"_obj"]={game_des:t[a].game_type,corner_remark:t[a].notice_type,status:t[a].status,leader:t[a].guide_status}},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.delete("v1/backend/lobby/game_sort",{params:{id:e.id}}).then(function(e){1===e.data.code&&(t.getGameSortList(),t.$message({type:"success",message:"删除成功!"}))})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})}},mounted:function(){this.getGameSortList(),this.getAllChannelList()}}),g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"GameSortConf-main"}},[a("input-area",[a("div",[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"add_game_sort_config",expression:"'add_game_sort_config'"}],attrs:{type:"primary"},on:{click:e.openAddDialog}},[e._v("添加")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.sendDataToServer}},[e._v("发送到服务端配置")])],1),e._v(" "),a("el-select",{staticStyle:{"margin-top":"10px"},attrs:{placeholder:"请选择渠道"},model:{value:e.searchChannel,callback:function(t){e.searchChannel=t},expression:"searchChannel"}},e._l(e.allChannelOpts,function(e){return a("el-option",{key:e.id,attrs:{label:e.channel_name,value:e.channel_name}})}),1)],1),e._v(" "),a("div",{staticClass:"bd"},[a("el-table",{directives:[{name:"has",rawName:"v-has",value:"game_sort_configs",expression:"'game_sort_configs'"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{label:"ID",prop:"id",align:"center",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{label:"渠道名称",prop:"channel_name",align:"center",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{label:"渠道KEY",prop:"channel_code",align:"center",width:"100"}}),e._v(" "),e._l(e.gameList,function(t,l){return a("el-table-column",{key:l,attrs:{label:"游戏"+l,prop:"game_"+l,align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row["game_"+l]?a("span",[e._v("留空")]):e._e(),e._v(" "),1==t.row["game_"+l]?a("span",[e._v("炸金花")]):e._e(),e._v(" "),2==t.row["game_"+l]?a("span",[e._v("抢庄牛牛")]):e._e(),e._v(" "),3==t.row["game_"+l]?a("span",[e._v("斗地主")]):e._e(),e._v(" "),6==t.row["game_"+l]?a("span",[e._v("捕鱼")]):e._e(),e._v(" "),2e3==t.row["game_"+l]?a("span",[e._v("红黑大战")]):e._e(),e._v(" "),2001==t.row["game_"+l]?a("span",[e._v("三倍场百人牛牛")]):e._e(),e._v(" "),2002==t.row["game_"+l]?a("span",[e._v("十倍场百人牛牛")]):e._e(),e._v(" "),2003==t.row["game_"+l]?a("span",[e._v("龙虎斗")]):e._e(),e._v(" "),2004==t.row["game_"+l]?a("span",[e._v("水果机")]):e._e(),e._v(" "),2005==t.row["game_"+l]?a("span",[e._v("奔驰宝马")]):e._e(),e._v(" "),2006==t.row["game_"+l]?a("span",[e._v("百家乐")]):e._e(),e._v(" "),2007==t.row["game_"+l]?a("span",[e._v("二八杠")]):e._e()]}}],null,!0)})}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"created_at",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("dateFormat")(t.row.created_at)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"has",rawName:"v-has",value:"modify_game_sort_config",expression:"'modify_game_sort_config'"}],attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:"delete_game_sort_config",expression:"'delete_game_sort_config'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],2)],1),e._v(" "),a("div",[a("el-dialog",{attrs:{title:"游戏排序配置",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form,"label-position":"top"}},[a("el-form-item",{attrs:{label:"渠道(可多选)"}},[a("el-checkbox-group",{attrs:{max:1},model:{value:e.form.checkList,callback:function(t){e.$set(e.form,"checkList",t)},expression:"form.checkList"}},e._l(e.channelOpts,function(t,l){return a("el-checkbox",{key:l,attrs:{label:t.channel_name,value:t.channel_code}},[e._v(e._s(t.channel_name))])}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏1"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_1_obj.game_des,callback:function(t){e.$set(e.form.game_1_obj,"game_des",t)},expression:"form.game_1_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_1_obj.corner_remark,callback:function(t){e.$set(e.form.game_1_obj,"corner_remark",t)},expression:"form.game_1_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_1_obj.status,callback:function(t){e.$set(e.form.game_1_obj,"status",t)},expression:"form.game_1_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_1_obj.leader,callback:function(t){e.$set(e.form.game_1_obj,"leader",t)},expression:"form.game_1_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏2"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_2_obj.game_des,callback:function(t){e.$set(e.form.game_2_obj,"game_des",t)},expression:"form.game_2_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_2_obj.corner_remark,callback:function(t){e.$set(e.form.game_2_obj,"corner_remark",t)},expression:"form.game_2_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_2_obj.status,callback:function(t){e.$set(e.form.game_2_obj,"status",t)},expression:"form.game_2_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_2_obj.leader,callback:function(t){e.$set(e.form.game_2_obj,"leader",t)},expression:"form.game_2_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏3"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_3_obj.game_des,callback:function(t){e.$set(e.form.game_3_obj,"game_des",t)},expression:"form.game_3_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_3_obj.corner_remark,callback:function(t){e.$set(e.form.game_3_obj,"corner_remark",t)},expression:"form.game_3_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_3_obj.status,callback:function(t){e.$set(e.form.game_3_obj,"status",t)},expression:"form.game_3_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_3_obj.leader,callback:function(t){e.$set(e.form.game_3_obj,"leader",t)},expression:"form.game_3_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏4"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_4_obj.game_des,callback:function(t){e.$set(e.form.game_4_obj,"game_des",t)},expression:"form.game_4_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_4_obj.corner_remark,callback:function(t){e.$set(e.form.game_4_obj,"corner_remark",t)},expression:"form.game_4_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_4_obj.status,callback:function(t){e.$set(e.form.game_4_obj,"status",t)},expression:"form.game_4_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_4_obj.leader,callback:function(t){e.$set(e.form.game_4_obj,"leader",t)},expression:"form.game_4_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏5"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_5_obj.game_des,callback:function(t){e.$set(e.form.game_5_obj,"game_des",t)},expression:"form.game_5_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_5_obj.corner_remark,callback:function(t){e.$set(e.form.game_5_obj,"corner_remark",t)},expression:"form.game_5_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_5_obj.status,callback:function(t){e.$set(e.form.game_5_obj,"status",t)},expression:"form.game_5_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_5_obj.leader,callback:function(t){e.$set(e.form.game_5_obj,"leader",t)},expression:"form.game_5_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏6"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_6_obj.game_des,callback:function(t){e.$set(e.form.game_6_obj,"game_des",t)},expression:"form.game_6_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_6_obj.corner_remark,callback:function(t){e.$set(e.form.game_6_obj,"corner_remark",t)},expression:"form.game_6_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_6_obj.status,callback:function(t){e.$set(e.form.game_6_obj,"status",t)},expression:"form.game_6_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_6_obj.leader,callback:function(t){e.$set(e.form.game_6_obj,"leader",t)},expression:"form.game_6_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏7"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_7_obj.game_des,callback:function(t){e.$set(e.form.game_7_obj,"game_des",t)},expression:"form.game_7_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_7_obj.corner_remark,callback:function(t){e.$set(e.form.game_7_obj,"corner_remark",t)},expression:"form.game_7_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_7_obj.status,callback:function(t){e.$set(e.form.game_7_obj,"status",t)},expression:"form.game_7_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_7_obj.leader,callback:function(t){e.$set(e.form.game_7_obj,"leader",t)},expression:"form.game_7_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏8"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_8_obj.game_des,callback:function(t){e.$set(e.form.game_8_obj,"game_des",t)},expression:"form.game_8_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_8_obj.corner_remark,callback:function(t){e.$set(e.form.game_8_obj,"corner_remark",t)},expression:"form.game_8_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_8_obj.status,callback:function(t){e.$set(e.form.game_8_obj,"status",t)},expression:"form.game_8_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_8_obj.leader,callback:function(t){e.$set(e.form.game_8_obj,"leader",t)},expression:"form.game_8_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏9"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_9_obj.game_des,callback:function(t){e.$set(e.form.game_9_obj,"game_des",t)},expression:"form.game_9_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_9_obj.corner_remark,callback:function(t){e.$set(e.form.game_9_obj,"corner_remark",t)},expression:"form.game_9_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_9_obj.status,callback:function(t){e.$set(e.form.game_9_obj,"status",t)},expression:"form.game_9_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_9_obj.leader,callback:function(t){e.$set(e.form.game_9_obj,"leader",t)},expression:"form.game_9_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏10"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_10_obj.game_des,callback:function(t){e.$set(e.form.game_10_obj,"game_des",t)},expression:"form.game_10_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_10_obj.corner_remark,callback:function(t){e.$set(e.form.game_10_obj,"corner_remark",t)},expression:"form.game_10_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_10_obj.status,callback:function(t){e.$set(e.form.game_10_obj,"status",t)},expression:"form.game_10_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_10_obj.leader,callback:function(t){e.$set(e.form.game_10_obj,"leader",t)},expression:"form.game_10_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏11"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_11_obj.game_des,callback:function(t){e.$set(e.form.game_11_obj,"game_des",t)},expression:"form.game_11_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_11_obj.corner_remark,callback:function(t){e.$set(e.form.game_11_obj,"corner_remark",t)},expression:"form.game_11_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_11_obj.status,callback:function(t){e.$set(e.form.game_11_obj,"status",t)},expression:"form.game_11_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_11_obj.leader,callback:function(t){e.$set(e.form.game_11_obj,"leader",t)},expression:"form.game_11_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏12"}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("游戏名称")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_12_obj.game_des,callback:function(t){e.$set(e.form.game_12_obj,"game_des",t)},expression:"form.game_12_obj.game_des"}},[a("el-option",{attrs:{label:"留空",value:"0"}}),e._v(" "),e._l(e.gameOpts,function(e,t){return a("el-option",{key:t,attrs:{label:e.game_name,value:e.game_id}})})],2)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("角标")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_12_obj.corner_remark,callback:function(t){e.$set(e.form.game_12_obj,"corner_remark",t)},expression:"form.game_12_obj.corner_remark"}},[a("el-option",{attrs:{label:"无",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"推荐",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"热门",value:"2"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("状态")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_12_obj.status,callback:function(t){e.$set(e.form.game_12_obj,"status",t)},expression:"form.game_12_obj.status"}},[a("el-option",{attrs:{label:"正常",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"敬请期待",value:"1"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:20}},[a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:4}},[e._v("是否强引导")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-select",{model:{value:e.form.game_12_obj.leader,callback:function(t){e.$set(e.form.game_12_obj,"leader",t)},expression:"form.game_12_obj.leader"}},[a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"1"}})],1)],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addGameSortConf}},[e._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]};var u=a("C7Lr")(c,g,!1,function(e){a("yhxo")},"data-v-45043f12",null);t.default=u.exports},yhxo:function(e,t){}});
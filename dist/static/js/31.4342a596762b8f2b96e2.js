webpackJsonp([31],{NDpw:function(t,e){},lOKY:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("iVUn"),l=a("fftp"),s=a("zhQY"),r=a("Z/hU"),d=a("2u00"),_=(a("y35B"),a("22Zk")),o=a("06fe"),n=(r.a,o.a,_.a,i.a,l.a,d.a,{name:"play_records",extends:r.a,components:{InfoTableItem:o.a,InputArea:_.a,SelectTime:i.a,InfoTable:l.a,PermissionButton:d.a},data:function(){return{loading:!1,pagesize:10,currentPage:1,total:0,formLabelWidth:"120px",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},allGameType:[],format:{session:"",id:"",dateArr:[new Date((new Date).getTime()-6048e5),new Date]},tableStyle:[{label:"牌局号",prop:"table_gid",width:""},{label:"房间类型",prop:"table_name",width:""},{label:"游戏时间(开始)",prop:"begin_time",width:""},{label:"游戏时间(结束)",prop:"end_time",width:""},{label:"参与人数/机器人",prop:"all_user_count",width:""},{label:"玩家总输赢",prop:"total_win",width:""},{label:"台费",prop:"total_fee",width:""},{label:"玩家id",prop:"true_user",width:""},{label:"操作",prop:"action",width:"150"}],records:[],pageInfo:new s.a(0,[5,10,15],5),dialogFormVisible:!1,form:{user_id:"",pay_type:"1",goods_type:100,money:"",check_money:""},dialogFruitVisible:!1,tableName:"",exinfo:{},tableData:[],lineData:[],dialogCowVisible:!1,system_result:"",err_result:"",game_name:"",dialogLandlordVisible:!1,dialogFishVisible:!1,dialogBaihapVisible:!1,dialogRedBlackVisible:!1,player_win_list:[],dialogGoldFlowVisible:!1,dialogDragonVisible:!1,dialogBaiNiuNiuVisible:!1,dialogCarVisible:!1,dialogErBaGangVisible:!1,uid:null}},methods:{getPlayList:function(){var t=this,e={page:this.currentPage,limit:this.pagesize};this.$http.get("v1/backend/operation/play/records",{params:e}).then(function(e){console.log(e),200===e.data.code&&(t.records=e.data.data,t.total=e.data.total)})},search:function(){},searchData:function(){var t=this,e={page:this.currentPage,limit:this.pagesize,table_type:Number(this.format.session),user_id:Number(this.format.id),start_time:this.format.dateArr?parseInt(new Date(Number(this.format.dateArr[0])).getTime()/1e3):0,end_time:this.format.dateArr?parseInt(new Date(Number(this.format.dateArr[1])).getTime()/1e3):0};this.$http.get("v1/backend/operation/play/records",{params:e}).then(function(e){console.log(e),200===e.data.code&&(t.records=e.data.data,t.total=e.data.total)})},getAllGameType:function(){var t=this;this.$http.get("v1/backend/operation/game-type").then(function(e){console.log(e),200===e.data.code&&(t.allGameType=e.data.data)})},handleEdit:function(t){var e=this;this.loading=!0,console.log(t),this.$http.get("v1/backend/operation/play/detail",{params:{table_gid:t.table_gid}}).then(function(t){console.log(t),200===t.data.code&&(e.loading=!1,e.tableName=t.data.data.table_name,"水果机"==t.data.data.game_name?(e.dialogFruitVisible=!0,e.exinfo=t.data.data.exinfo,e.tableData=t.data.data.exinfo.result_shape,e.lineData=t.data.data.exinfo.lines):"抢庄牛牛"==t.data.data.game_name?(e.dialogCowVisible=!0,e.system_result=t.data.data.exinfo.system_result,e.tableData=t.data.data.side_list):"斗地主"==t.data.data.game_name?(e.dialogLandlordVisible=!0,e.exinfo=t.data.data.exinfo,e.tableData=t.data.data.side_list):"捕鱼达人"==t.data.data.game_name?e.dialogFishVisible=!0:"百家乐"==t.data.data.game_name?(e.dialogBaihapVisible=!0,e.system_result=t.data.data.exinfo.system_result,e.err_result=t.data.data.exinfo.err_result,e.game_name=t.data.data.game_name,e.tableData=t.data.data.side_list):"红黑大战"==t.data.data.game_name?(e.dialogRedBlackVisible=!0,e.system_result=t.data.data.exinfo.system_result,e.err_result=t.data.data.exinfo.err_result,e.game_name=t.data.data.game_name,e.tableData=t.data.data.side_list,e.player_win_list=t.data.data.side_list.filter(function(t){return t})[0].player_win_list):"炸金花"==t.data.data.game_name?(e.dialogGoldFlowVisible=!0,e.system_result=t.data.data.exinfo.system_result,e.exinfo=t.data.data.exinfo,e.tableData=t.data.data.side_list):"龙虎斗"==t.data.data.game_name?(e.dialogDragonVisible=!0,e.system_result=t.data.data.exinfo.system_result,e.err_result=t.data.data.exinfo.err_result,e.game_name=t.data.data.game_name,e.tableData=t.data.data.side_list,e.player_win_list=t.data.data.side_list.filter(function(t){return t})[0].player_win_list):"三倍场百人牛牛"==t.data.data.game_name?(e.dialogBaiNiuNiuVisible=!0,e.system_result=t.data.data.exinfo.system_result,e.err_result=t.data.data.exinfo.err_result,e.game_name=t.data.data.game_name,e.tableData=t.data.data.side_list,e.player_win_list=t.data.data.side_list.filter(function(t){return t})[0].player_win_list):"奔驰宝马"==t.data.data.game_name?(e.dialogCarVisible=!0,e.system_result=t.data.data.exinfo.system_result,e.err_result=t.data.data.exinfo.err_result,e.game_name=t.data.data.game_name,e.exinfo=t.data.data.exinfo,e.tableData=t.data.data.side_list):"二八杠"==t.data.data.game_name&&(e.dialogErBaGangVisible=!0,e.system_result=t.data.data.exinfo.system_result,e.err_result=t.data.data.exinfo.err_result,e.game_name=t.data.data.game_name,e.tableData=t.data.data.side_list,e.player_win_list=t.data.data.side_list.map(function(t){return t.player_win_list}),console.log(e.player_win_list)))})},handleSizeChange:function(t){this.pagesize=t,this.getPlayList()},handleCurrentChange:function(t){this.currentPage=t,this.getPlayList()}},mounted:function(){this.getPlayList(),this.getAllGameType()}}),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"GamblingRecord-main"}},[a("input-area",[a("span",[t._v("场次")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择",clearable:"",size:"medium"},model:{value:t.format.session,callback:function(e){t.$set(t.format,"session",e)},expression:"format.session"}},t._l(t.allGameType,function(t){return a("el-option",{key:t.game_id,attrs:{label:t.game_name,value:t.game_id}})}),1),t._v(" "),a("span",[t._v("账号ID")]),t._v(" "),a("el-input",{staticStyle:{width:"20%"},attrs:{placeholder:"请输入账号id"},model:{value:t.format.id,callback:function(e){t.$set(t.format,"id",e)},expression:"format.id"}}),t._v(" "),a("span",[t._v("时间范围")]),t._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":t.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right",clearable:!1},model:{value:t.format.dateArr,callback:function(e){t.$set(t.format,"dateArr",e)},expression:"format.dateArr"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.searchData}},[t._v("查找")])],1),t._v(" "),a("div",{staticClass:"bd"},[a("info-table",{directives:[{name:"has",rawName:"v-has",value:"play_lists",expression:"'play_lists'"}],attrs:{search:t.search,"table-style":t.tableStyle,records:t.records,"page-info":t.pageInfo,"hide-page":!0}},[a("info-table-item",{attrs:{"table-style":t.tableStyle},scopedSlots:t._u([{key:"default",fn:function(e){return["begin_time".indexOf(e.prop)>=0?[a("span",[t._v(t._s(t._f("dateFormat")(e.row.begin_time)))])]:t._e(),t._v(" "),"end_time".indexOf(e.prop)>=0?[a("span",[t._v(t._s(t._f("dateFormat")(e.row.end_time)))])]:t._e(),t._v(" "),"all_user_count".indexOf(e.prop)>=0?[a("span",[t._v(t._s(e.row.all_user_count+"/"+e.row.true_user_count))])]:t._e(),t._v(" "),"action"===e.prop?[a("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen",value:t.loading,expression:"loading",modifiers:{fullscreen:!0}},{name:"has",rawName:"v-has",value:"play_detail",expression:"'play_detail'"}],attrs:{"element-loading-text":"加载中...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.1)",size:"mini",type:"primary"},on:{click:function(a){return t.handleEdit(e.row)}}},[t._v("详情")])]:t._e(),t._v(" "),["action","all_user_count","begin_time","end_time"].indexOf(e.prop)<0?[t._v(t._s(e.row[e.prop]))]:t._e()]}}])})],1),t._v(" "),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":t.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"添加人工订单",visible:t.dialogFormVisible,width:"30%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{attrs:{model:t.form}},[a("el-form-item",{attrs:{label:"用户id","label-width":t.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入用户id"},model:{value:t.form.user_id,callback:function(e){t.$set(t.form,"user_id",e)},expression:"form.user_id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"付款方式","label-width":t.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"人工充值"},model:{value:t.form.pay_type,callback:function(e){t.$set(t.form,"pay_type",e)},expression:"form.pay_type"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"商品类型","label-width":t.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:t.form.goods_type,callback:function(e){t.$set(t.form,"goods_type",e)},expression:"form.goods_type"}},[a("el-option",{attrs:{label:"金币",value:"gold"}}),t._v(" "),a("el-option",{attrs:{label:"现金",value:"money"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"金额","label-width":t.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入金额"},model:{value:t.form.money,callback:function(e){t.$set(t.form,"money",e)},expression:"form.money"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"确认金额","label-width":t.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请确认输入金额"},model:{value:t.form.check_money,callback:function(e){t.$set(t.form,"check_money",e)},expression:"form.check_money"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogFruitVisible},on:{"update:visible":function(e){t.dialogFruitVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.tableName))]),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},[a("tr",[a("td",[t._v("下注线数:"+t._s(t.exinfo.bet_lines))])]),t._v(" "),a("tr",[a("td",[t._v("单注金额:"+t._s(t.exinfo.bet_score))])]),t._v(" "),a("tr",[a("td",[t._v("获胜:"+t._s(t.exinfo.add_score))])]),t._v(" "),a("tr",[a("td",[t._v("彩金:"+t._s(t.exinfo.caijin_coins))])]),t._v(" "),a("tr",[a("td",[t._v("免费次数:"+t._s(t.exinfo.free_times))])])]),t._v(" "),a("div",{staticStyle:{border:"1px solid #e6e6e6",height:"30px","line-height":"30px","border-bottom":"none","text-align":"center","margin-top":"10px","background-color":"#fff"}},[t._v("开奖结果")]),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},t._l(t.tableData,function(e,i){return a("tr",{key:i},t._l(e,function(e,i){return a("td",{key:i},[t._v(t._s(e))])}),0)}),0),t._v(" "),a("div",{staticStyle:{border:"1px solid #e6e6e6",height:"30px","line-height":"30px","border-top":"none","text-align":"center","background-color":"#fff"}},t._l(t.lineData,function(e,i){return a("div",{key:i,staticStyle:{width:"100%"}},[a("span",[t._v("第"+t._s(e.line_num)+"线,获得"+t._s(e.line_times)+"倍")])])}),0)])],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogCowVisible},on:{"update:visible":function(e){t.dialogCowVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.tableName)+t._s("------")+t._s("系统控制类:"+t.system_result))]),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},[t._l(t.tableData,function(e,i){return a("tr",{key:i},[!1===e.is_banker?a("td",{attrs:{width:"100"}},[t._v("闲家,id: "+t._s(e.uid))]):a("td",{attrs:{width:"100"}},[t._v("庄家,id: "+t._s(e.uid))]),t._v(" "),a("td",{attrs:{width:"100"}},[t._v("叫庄倍数* "+t._s(e.banker_times))]),t._v(" "),a("td",{attrs:{width:"100"}},[t._v("叫倍* "+t._s(e.bet_times))]),t._v(" "),a("td",{attrs:{width:"100"}},[t._v(t._s(e.card_type))]),t._v(" "),a("td",{attrs:{width:"100"}},[t._v(t._s(String(e.cards)))]),t._v(" "),a("td",{attrs:{width:"100"}},[t._v(t._s(e.card_times))]),t._v(" "),a("td",{attrs:{width:"100"}},[t._v(t._s(e.add_score))])])}),t._v(" "),a("tr"),t._v(" "),a("tr")],2)])],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogLandlordVisible,width:"60%"},on:{"update:visible":function(e){t.dialogLandlordVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.tableName))]),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},[a("tr",[a("td",{attrs:{colspan:"5"}},[t._v("底注: "+t._s(t.exinfo.difen)+",叫分: "+t._s(t.exinfo.jiaofen))]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),t._l(t.tableData,function(e,i){return a("tr",{key:i},[a("td",{attrs:{width:"100"}},[t._v("id: "+t._s(e.uid))]),t._v(" "),a("td",{attrs:{width:"100"}},[t._v(t._s(e.jiaofen)+"分")]),t._v(" "),!0===e.jiabei?a("td",{attrs:{width:"100"}},[t._v("加倍")]):a("td",{attrs:{width:"100"}},[t._v("不加倍")]),t._v(" "),!0===e.is_banker?a("td",{attrs:{width:"100"}},[t._v(t._s(String(e.dizhu_cards)))]):a("td",{attrs:{width:"100"}}),t._v(" "),a("td",{attrs:{width:"100"}},[t._v(t._s(String(e.cards)))]),t._v(" "),a("td",{attrs:{width:"100"}},[t._v("炸弹数: "+t._s(e.zhadan_num))]),t._v(" "),a("td",{attrs:{width:"100"}},[t._v("输赢: "+t._s(e.add_score))])])})],2)])],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogFishVisible,width:"60%"},on:{"update:visible":function(e){t.dialogFishVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.tableName))]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.tableData}},[a("el-table-column",{attrs:{prop:"date",label:"玩家id",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"游戏前的金币",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"address",label:"游戏后的金币"}}),t._v(" "),a("el-table-column",{attrs:{prop:"address",label:"输赢金额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"address",label:"台费"}})],1)],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogBaihapVisible,width:"70%"},on:{"update:visible":function(e){t.dialogBaihapVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.game_name+"-")+t._s(t.tableName)+t._s("------")+t._s("系统控制类:"+t.system_result)+t._s("------系统控制结果:"+t.err_result))]),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},t._l(t.tableData,function(e,i){return a("tr",{key:i},[a("td",{attrs:{width:"150"}},[t._v(t._s(e.side))]),t._v(" "),e.cards?a("td",{attrs:{width:"150"}},[t._v("\n            "+t._s(String(e.cards))+"\n            "),!0===e.win?a("span",{staticStyle:{"font-size":"20px",color:"#ff6746"}},[t._v("赢")]):a("span",{staticStyle:{"font-size":"20px",color:"#55b97b"}},[t._v("输")])]):a("td",{attrs:{width:"150"}},[a("span",[t._v("否")])]),t._v(" "),a("td",{staticStyle:{color:"#129e90"},attrs:{width:"200"}},[t._v("总输赢: "+t._s(e.total_side_win)+"    总下注:"+t._s(e.bet_coins))]),t._v(" "),a("td",{staticStyle:{color:"#129e90"},attrs:{width:"200"}},[t._v("玩家输赢: "+t._s(e.player_side_win)+"    玩家下注:"+t._s(e.player_bet_coins))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v("非免佣: "+t._s(e.bet_coins_not_commission)+"    免佣:"+t._s(e.bet_coins_commission))])])}),0),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},[a("tr",[a("th",[t._v("玩家id")]),t._v(" "),a("th",[t._v("下注模式")]),t._v(" "),a("th",[t._v("庄家")]),t._v(" "),a("th",[t._v("闲家")]),t._v(" "),a("th",[t._v("和")]),t._v(" "),a("th",[t._v("庄对")]),t._v(" "),a("th",[t._v("闲对")]),t._v(" "),a("th",[t._v("输赢金额")]),t._v(" "),a("th",[t._v("台费")])]),t._v(" "),a("tr")])])],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogRedBlackVisible,width:"70%"},on:{"update:visible":function(e){t.dialogRedBlackVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.game_name+"-")+t._s(t.tableName)+t._s("------")+t._s("系统控制类:"+t.system_result)+t._s("------系统控制结果:"+t.err_result))]),t._v(" "),a("div",{staticStyle:{"text-align":"center",height:"50px","line-height":"50px"}},t._l(t.tableData,function(e,i){return a("span",{key:i},[t._v("\n          "+t._s(e.side+":"+String(e.cards)+"("+e.card_type+");")+"\n          "),!0===e.win?a("span",[t._v("结果:"+t._s(e.side+"赢"))]):t._e()])}),0),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},t._l(t.tableData,function(e,i){return a("tr",{key:i},[a("td",{attrs:{width:"150"}},[t._v(t._s(e.side))]),t._v(" "),a("td",{staticStyle:{color:"#129e90"},attrs:{width:"200"}},[t._v("总下注:"+t._s(e.bet_coins)+"    玩家下注: "+t._s(e.player_bet_coins))]),t._v(" "),a("td",{staticStyle:{color:"#129e90"},attrs:{width:"200"}},[t._v("玩家输赢: "+t._s(e.player_side_win)+"    ")])])}),0),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff","margin-top":"10px"},attrs:{border:"1",width:"100%"}},[a("tr",[a("th",[t._v("玩家id")]),t._v(" "),a("th",[t._v("红")]),t._v(" "),a("th",[t._v("黑")]),t._v(" "),a("th",[t._v("特殊牌型")]),t._v(" "),a("th",[t._v("输赢金额")]),t._v(" "),a("th",[t._v("台费")])]),t._v(" "),t._l(t.player_win_list,function(e,i){return a("tr",{key:i},[a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.win_coins))]),t._v(" "),a("td",[t._v(t._s(e.uid))])])})],2)])],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogGoldFlowVisible,width:"70%"},on:{"update:visible":function(e){t.dialogGoldFlowVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.tableName)+t._s("------")+t._s("系统控制类:"+t.system_result))]),t._v(" "),a("div",{staticStyle:{"text-align":"center",height:"50px","line-height":"50px"}},[t._v("\n        底注: "+t._s(t.exinfo.dizhu)+"    \n        轮数: "+t._s(t.exinfo.round)+"    \n        所有下注:"+t._s(t.exinfo.total_score)+"    \n        结束原因: "+t._s(t.exinfo.end_type)+"\n      ")]),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},t._l(t.tableData,function(e,i){return a("tr",{key:i},[a("td",{attrs:{width:"150"}},[t._v(t._s(e.uid))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v(t._s(e.card_type))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v("下注:"+t._s(e.bet_coins))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v("输赢:"+t._s(e.add_score))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v(t._s(String(e.cards)))]),t._v(" "),!0===e.win?a("td",{attrs:{width:"150"}},[t._v("赢")]):a("td",{attrs:{width:"150"}},[t._v("输")])])}),0)])],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogDragonVisible,width:"70%"},on:{"update:visible":function(e){t.dialogDragonVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.game_name+"-")+t._s(t.tableName)+t._s("------")+t._s("系统控制类:"+t.system_result)+t._s("------系统控制结果:"+t.err_result))]),t._v(" "),a("div",{staticStyle:{"text-align":"center",height:"50px","line-height":"50px"}},[t._l(t.tableData,function(e,i){return a("span",{key:i},[t._v(t._s(e.side+":"+String(e.cards)+","))])}),t._v(" "),t._l(t.tableData,function(e,i){return!0===e.win?a("span",{key:i},[t._v("结果:"+t._s(e.side+"赢"))]):t._e()})],2),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},t._l(t.tableData,function(e,i){return a("tr",{key:i},[a("td",{attrs:{width:"150"}},[t._v(t._s(e.side))]),t._v(" "),a("td",{staticStyle:{color:"#129e90"},attrs:{width:"200"}},[t._v("总下注:"+t._s(e.bet_coins)+"    玩家下注: "+t._s(e.player_bet_coins))]),t._v(" "),a("td",{staticStyle:{color:"#129e90"},attrs:{width:"200"}},[t._v("玩家输赢: "+t._s(e.player_side_win)+"    ")])])}),0),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff","margin-top":"10px"},attrs:{border:"1",width:"100%"}},[a("tr",[a("th",[t._v("玩家id")]),t._v(" "),a("th",[t._v("龙")]),t._v(" "),a("th",[t._v("虎")]),t._v(" "),a("th",[t._v("和")]),t._v(" "),a("th",[t._v("输赢金额")]),t._v(" "),a("th",[t._v("台费")])]),t._v(" "),t._l(t.player_win_list,function(e,i){return a("tr",{key:i},[a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.win_coins))]),t._v(" "),a("td",[t._v(t._s(e.uid))])])})],2)])],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogBaiNiuNiuVisible,width:"70%"},on:{"update:visible":function(e){t.dialogBaiNiuNiuVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.game_name+"-")+t._s(t.tableName)+t._s("------")+t._s("系统控制类:"+t.system_result)+t._s("------系统控制结果:"+t.err_result))]),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},t._l(t.tableData,function(e,i){return a("tr",{key:i},[a("td",{attrs:{width:"150"}},[t._v(t._s(e.side))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v(t._s(e.card_type))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v(t._s(String(e.cards)))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v("总下注:"+t._s(e.bet_coins))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v("总输赢:"+t._s(e.total_side_win))])])}),0),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff","margin-top":"10px"},attrs:{border:"1",width:"100%"}},[a("tr",[a("th",[t._v("玩家id")]),t._v(" "),a("th",[t._v("庄家")]),t._v(" "),a("th",[t._v("黑")]),t._v(" "),a("th",[t._v("红")]),t._v(" "),a("th",[t._v("梅")]),t._v(" "),a("th",[t._v("方")]),t._v(" "),a("th",[t._v("输赢金额")]),t._v(" "),a("th",[t._v("台费")])]),t._v(" "),t._l(t.player_win_list,function(e,i){return a("tr",{key:i},[a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.uid))]),t._v(" "),a("td",[t._v(t._s(e.win_coins))]),t._v(" "),a("td",[t._v(t._s(e.uid))])])})],2)])],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogCarVisible,width:"70%"},on:{"update:visible":function(e){t.dialogCarVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.game_name+"-")+t._s(t.tableName)+t._s("------")+t._s("系统控制类:"+t.system_result)+t._s("------系统控制结果:"+t.err_result))]),t._v(" "),a("div",{staticStyle:{"text-align":"center",height:"50px","line-height":"50px"}},[t._v("\n        开奖: "+t._s(t.exinfo.win_side)+"    \n        玩家下注:"+t._s(t.exinfo.total_bet)+"    \n        玩家总输赢: "+t._s(t.exinfo.total_win)+"\n      ")]),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},t._l(t.tableData,function(e,i){return a("tr",{key:i},[a("td",{attrs:{width:"150"}},[t._v(t._s(e.side))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v("下注:"+t._s(e.bet_coins))]),t._v(" "),!0===e.is_winner?a("td",{attrs:{width:"150"}},[t._v("赢")]):a("td",{attrs:{width:"150"}},[t._v("输")])])}),0),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff","margin-top":"10px"},attrs:{border:"1",width:"100%"}},[a("tr",[a("th",[t._v("玩家id")]),t._v(" "),t._l(t.tableData,function(e,i){return a("th",{key:i},[t._v(t._s(e.side))])}),t._v(" "),a("th",[t._v("输赢金额")]),t._v(" "),a("th",[t._v("台费")])],2),t._v(" "),a("tr",[a("td")])])])],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogErBaGangVisible,width:"70%"},on:{"update:visible":function(e){t.dialogErBaGangVisible=e}}},[a("el-form",{staticStyle:{"background-color":"#f2f2f2"},attrs:{model:t.form}},[a("div",{staticStyle:{width:"100%",height:"30px","line-height":"30px"}},[t._v(t._s(t.game_name+"-")+t._s(t.tableName)+t._s("------")+t._s("系统控制类:"+t.system_result)+t._s("------系统控制结果:"+t.err_result))]),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff"},attrs:{border:"1",width:"100%"}},t._l(t.tableData,function(e,i){return a("tr",{key:i},[a("td",{attrs:{width:"150"}},[t._v(t._s(e.side))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v(t._s(e.card_type))]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v(" "+t._s(String(e.cards))+" ")]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v("总下注:"+t._s(e.bet_coins)+" ")]),t._v(" "),a("td",{attrs:{width:"150"}},[t._v("总输赢:"+t._s(e.total_side_win)+" ")])])}),0),t._v(" "),a("table",{staticStyle:{"text-align":"center","background-color":"#fff","margin-top":"10px"},attrs:{border:"1",width:"100%"}},[a("tr",[a("th",[t._v("玩家id")]),t._v(" "),t._l(t.tableData,function(e,i){return a("th",{key:i},[t._v(t._s(e.side))])}),t._v(" "),a("th",[t._v("输赢金额")]),t._v(" "),a("th",[t._v("台费")])],2),t._v(" "),a("tr",[a("td"),t._v(" "),t._l(t.player_win_list,function(e,i){return a("td",{key:i},[t._v(t._s(e[0]))])}),t._v(" "),a("td"),t._v(" "),a("td")],2)])])],1)],1)},staticRenderFns:[]};var v=a("C7Lr")(n,c,!1,function(t){a("NDpw")},"data-v-787b3876",null);e.default=v.exports}});
//# sourceMappingURL=31.4342a596762b8f2b96e2.js.map
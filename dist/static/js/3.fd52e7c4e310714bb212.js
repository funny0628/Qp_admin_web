webpackJsonp([3],{"4F/M":function(t,e,a){t.exports=a.p+"static/img/lobby_headIcon_4_225.7d3677a.png"},Hhit:function(t,e,a){t.exports=a.p+"static/img/lobby_headIcon_8_225.1faa013.png"},WaWy:function(t,e,a){t.exports=a.p+"static/img/lobby_headIcon_2_225.54435f2.png"},jeuz:function(t,e){},k1ix:function(t,e,a){t.exports=a.p+"static/img/lobby_headIcon_3_225.6b48d62.png"},"n9+l":function(t,e,a){t.exports=a.p+"static/img/lobby_headIcon_6_225.14146d5.png"},pcOB:function(t,e,a){t.exports=a.p+"static/img/lobby_headIcon_7_225.b68ba80.png"},wNSR:function(t,e,a){t.exports=a.p+"static/img/lobby_headIcon_1_225.cb158cf.png"},x4by:function(t,e,a){t.exports=a.p+"static/img/lobby_headIcon_5_225.9735f97.png"},zyc9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("lC5x"),n=a.n(i),o=a("J0Oq"),r=a.n(o),l=a("Z/hU"),s=a("EuRQ"),c=(l.a,{name:"users",extends:l.a,data:function(){return{visible:!1,visibleF:!1,input:"",total:"",currentPage:1,limit:10,accountType:"",tableData:[],formTable:[],formData:{},optionData:[],optionchannels:[],avator_nameO:"所有渠道",value:0,level:-1,UID:"",IP:"",phone:"",start_time:"",end_time:"",formF:{user_id:"",reason:"",end_time:""},defaultImage:[{ImageUrl:a("wNSR")},{ImageUrl:a("WaWy")},{ImageUrl:a("k1ix")},{ImageUrl:a("4F/M")},{ImageUrl:a("x4by")},{ImageUrl:a("n9+l")},{ImageUrl:a("pcOB")},{ImageUrl:a("Hhit")}]}},created:function(){var t=this;return r()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.initdata({page:t.currentPage,limit:t.limit}),t.initVIP();case 2:case"end":return e.stop()}},e,t)}))()},methods:{search:function(){"所有渠道"===this.avator_nameO&&(this.avator_nameO=""),this.initdata({page:this.currentPage,limit:this.limit,uid:this.UID||0,last_ip:this.IP,phone:this.phone,channel:this.avator_nameO,status:this.value,vip_level:this.level,start_time:this.start_time/1e3||0,end_time:this.end_time/1e3||0}),this.avator_nameO="所有渠道"},handleClick:function(t,e){var a=this;return r()(n.a.mark(function i(){var o;return n.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(console.log(t,e),"封号"!==e){i.next=6;break}a.visibleF=!0,a.formF.user_id=t.uid,i.next=12;break;case 6:if("解封"!==e){i.next=12;break}return i.next=9,a.$http.OperationMan.PostUserUnlock({user_id:t.uid});case 9:o=i.sent,o.data,a.initdata({page:a.currentPage,limit:a.limit});case 12:case"end":return i.stop()}},i,a)}))()},onSubmit:function(t){var e=this;return r()(n.a.mark(function t(){var a,i,o;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(""!==e.formF.user_id&&""!==e.formF.reason&&""!==e.formF.end_time){t.next=4;break}e.$message({type:"info",message:"请完整填写信息"}),t.next=13;break;case 4:return a=(e.formF.end_time+864e5)/1e3,i={user_id:+e.formF.user_id,reason:e.formF.reason,end_time:a},t.next=8,e.$http.OperationMan.PostUserLock(i);case 8:o=t.sent,200===o.data.code&&e.initdata({page:e.currentPage,limit:e.limit}),e.visibleF=!1,e.formF={};case 13:case"end":return t.stop()}},t,e)}))()},handleEdit:function(t,e){this.visible=!0,this.formTable=[],this.iniDetail({user_id:e.uid}),this.initUserLock({user_id:e.uid})},handleSizeChange:function(t){this.limit=t,this.currentPage=1,this.initdata({page:this.currentPage,limit:this.limit})},handleCurrentChange:function(t){this.currentPage=t,this.initdata({page:this.currentPage,limit:this.limit})},timestampToTime:function(t){var e=new Date(1e3*t);return e.getFullYear()+"-"+((e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+(e.getDate()+" ")+(e.getHours()+":")+(e.getMinutes()+":")+e.getSeconds()},formateData:function(t){var e=this;return t.forEach(function(t){t.accountType=""===t.phone||void 0===t.phone?"游客":"正式用户",t.nickname=""===t.nickname||void 0===t.nickname?t.uid:t.nickname,t.status=1===t.status?"解封":"封号",t.last_deposit_time=void 0===t.last_deposit_time?"":e.timestampToTime(t.last_deposit_time)}),t},data:function(t){var e=Date.parse(t);return new Date(e).getTime()},formateNum:function(t){return t.status=1===t.status?"解封":"封号",t.sex=1===t.sex?"男":"女",t.nickname=""===t.nickname||void 0===t.nickname?t.uid:t.nickname,t.last_deposit_time=void 0===t.last_deposit_time?"":this.timestampToTime(t.last_deposit_time),t},initdata:function(t){var e=this;return r()(n.a.mark(function a(){var i,o,r;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.OperationMan.GetUsers(t);case 2:i=a.sent,o=i.data,r=e.formateData(Object(s.a)(o.data)),e.tableData=r,e.total=o.total;case 7:case"end":return a.stop()}},a,e)}))()},initVIP:function(t){var e=this;return r()(n.a.mark(function a(){var i,o,r,l;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.OperationMan.GetVips(t);case 2:return i=a.sent,o=i.data,e.optionData=Object(s.a)(o.data),e.optionData.unshift({avator_name:"所有",level:-1}),a.next=8,e.$http.OperationMan.GetChannels(t);case 8:r=a.sent,l=[],r.data.data.forEach(function(t){l.push(t.name)}),l.forEach(function(t,a){e.optionchannels.push({avator_nameO:t,levelO:a})}),e.optionchannels.unshift({avator_nameO:"所有渠道",levelO:-1});case 13:case"end":return a.stop()}},a,e)}))()},iniDetail:function(t){var e=this;return r()(n.a.mark(function a(){var i,o;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.OperationMan.GetUserDetail(t);case 2:i=a.sent,o=i.data,e.formData=o.data,e.formData.icon_border=e.formData.icon_border,e.formData.status=1===e.formData.status?"封号":"正常",e.formData.sex=1===e.formData.sex?"男":"女",e.formData.icon=e.defaultImage[e.formData.icon-1].ImageUrl;case 9:case"end":return a.stop()}},a,e)}))()},initUserLock:function(t){var e=this;return r()(n.a.mark(function a(){var i,o;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.OperationMan.GetUserLock(t);case 2:i=a.sent,(o=i.data).data.constructor===Array?console.log("没有数据的数组"):(o.data.lock_status=1===o.data.lock_status?"封号":"正常",o.data.endtime=e.timestampToTime(o.data.endtime),o.data.op_time=e.timestampToTime(o.data.op_time),e.formTable.push(o.data));case 5:case"end":return a.stop()}},a,e)}))()}}}),p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"UserList-main"}},[a("div",{staticClass:"title"},[t._v("\n    UID"),a("el-input",{staticStyle:{"margin-top":"10px",width:"200px"},model:{value:t.UID,callback:function(e){t.UID=e},expression:"UID"}}),t._v("\n    手机号码"),a("el-input",{staticStyle:{"margin-top":"10px",width:"200px"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),t._v("\n    IP\n    "),a("el-input",{staticStyle:{"margin-top":"10px",width:"200px"},model:{value:t.IP,callback:function(e){t.IP=e},expression:"IP"}}),t._v("\n    渠道"),a("el-select",{staticStyle:{"margin-top":"10px",width:"200px"},model:{value:t.avator_nameO,callback:function(e){t.avator_nameO=e},expression:"avator_nameO"}},t._l(t.optionchannels,function(t){return a("el-option",{key:t.levelO,attrs:{label:t.avator_nameO,value:t.avator_nameO}})}),1),t._v("\n    状态"),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("el-option",{attrs:{label:"所有",value:0}}),t._v(" "),a("el-option",{attrs:{label:"封号",value:1}})],1),t._v("\n    vip等级"),a("el-select",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{placeholder:"请选择"},model:{value:t.level,callback:function(e){t.level=e},expression:"level"}},t._l(t.optionData,function(t){return a("el-option",{key:t.level,attrs:{label:t.avator_name,value:t.level}})}),1),t._v("\n    日期\n    "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:t.start_time,callback:function(e){t.start_time=e},expression:"start_time"}}),t._v("\n    -\n    "),a("el-date-picker",{staticStyle:{"margin-top":"10px",width:"200px"},attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp"},model:{value:t.end_time,callback:function(e){t.end_time=e},expression:"end_time"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查找")])],1),t._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"highlight-current-row":"","tooltip-effect":"dark",border:""}},[a("el-table-column",{attrs:{fixed:"",prop:"uid",label:"玩家Id",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"玩家昵称",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"accountType",label:"账号类型",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"level",label:"vip等级",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"total_deposit",label:"累计充值",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机号码",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"channel",label:"渠道",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"created_time",label:"注册时间",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"ip",label:"创建IP",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"modified_time",label:"最后登录时间",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"last_deposit_time",label:"最后充值时间",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"last_ip",label:"最后登陆IP",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"bank_info",label:"银行卡信息",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"alipay",label:"支付宝信息",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"client_version",label:"客户端版本",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"device_id",label:"机器码",align:"center",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"200","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleClick(e.row,e.row.status)}}},[t._v(t._s(e.row.status))]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[t._v("详情")])]}}])})],1),t._v(" "),t.total>5?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1),t._v(" "),a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{title:"用户详情",visible:t.visible,width:"60%"},on:{"update:visible":function(e){t.visible=e}}},[a("div",{staticClass:"msg"},[a("div",{staticClass:"left"},[a("p",{staticClass:"image"},[a("img",{attrs:{src:t.formData.icon,alt:""}})]),t._v(" "),a("p",[t._v(t._s(t.formData.nickname))]),t._v(" "),a("p",[t._v("状态:"+t._s(t.formData.status))])]),t._v(" "),a("div",{staticClass:"right"},[a("p",{staticClass:"title"},[t._v("基本信息")]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"i-f"},[a("p",[t._v("uid/昵称:"+t._s(t.formData.uid+"/"+t.formData.nickname))]),t._v(" "),a("p",[t._v("注册时间:"+t._s(t.formData.created_time))]),t._v(" "),a("p",[t._v("最后登陆时间:"+t._s(t.formData.modified_time))]),t._v(" "),a("p",[t._v("手机号:"+t._s(t.formData.phone))]),t._v(" "),a("p",[t._v("渠道:"+t._s(t.formData.channel))])]),t._v(" "),a("div",{staticClass:"i-r"},[a("p",[t._v("性别:"+t._s(t.formData.sex))]),t._v(" "),a("p",[t._v("注册IP:"+t._s(t.formData.ip))]),t._v(" "),a("p",[t._v("最后登陆IP:"+t._s(t.formData.last_ip))]),t._v(" "),a("p",[t._v("设备号:"+t._s(t.formData.device_id))]),t._v(" "),a("p",[t._v("客户端版本号:"+t._s(t.formData.client_version))])])]),t._v(" "),a("p",{staticClass:"title"},[t._v("高级信息")]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"i-f"},[a("p",[t._v("首次充值时间:"+t._s(t.formData.first_buy_time))]),t._v(" "),a("p",[t._v("金币余额:"+t._s(t.formData.total_coins))]),t._v(" "),a("p",[t._v("最后充值时间:"+t._s(t.formData.last_deposit_time))]),t._v(" "),a("p",[t._v("累积赢金币:"+t._s(t.formData.total_win_coins))]),t._v(" "),a("p",[t._v("累积充值次数:"+t._s(t.formData.total_count))]),t._v(" "),a("p",[t._v("累积押注:"+t._s(t.formData.total_lose_coins))])]),t._v(" "),a("div",{staticClass:"i-r"},[a("p",[t._v("VIP等级:"+t._s(t.formData.vip_level))]),t._v(" "),a("p",[t._v("今日流水:"+t._s(t.formData.today_cash_flow))]),t._v(" "),a("p",[t._v("累积充值:"+t._s(t.formData.total_deposit))]),t._v(" "),a("p",[t._v("累积兑换:"+t._s(t.formData.buycount))]),t._v(" "),a("p",[t._v("累积扣台费:"+t._s(t.formData.total_fee_coins))]),t._v(" "),a("p",[t._v("今日充值:"+t._s(t.formData.today_depoist_amount))]),t._v(" "),a("p",[t._v("今日兑换:"+t._s(t.formData.today_exchange_coins))])])])])]),t._v(" "),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.formTable,"highlight-current-row":"","tooltip-effect":"dark",border:""}},[a("el-table-column",{attrs:{prop:"uid",label:"uid",align:"center",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"lock_status",label:"\t封号状态",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"reason",label:"原因",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"endtime",label:"结束时间",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"op_name",label:"最后修改的操作人",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"op_time",label:"操作时间",align:"center"}})],1)],1)])],1),t._v(" "),a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{title:"封号",visible:t.visibleF,"destroy-on-close":!0},on:{"update:visible":function(e){t.visibleF=e}}},[a("el-form",{ref:"formF",attrs:{model:t.formF,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"ID",prop:"user_id"}},[a("el-input",{attrs:{placeholder:"ID"},model:{value:t.formF.user_id,callback:function(e){t.$set(t.formF,"user_id",e)},expression:"formF.user_id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"原因",prop:"reason\t"}},[a("el-input",{attrs:{placeholder:"原因"},model:{value:t.formF.reason,callback:function(e){t.$set(t.formF,"reason",e)},expression:"formF.reason\t"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"end_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"结束时间",format:"yyyy-MM-dd","value-format":"timestamp"},model:{value:t.formF.end_time,callback:function(e){t.$set(t.formF,"end_time",e)},expression:"formF.end_time"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("formF")}}},[t._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var m=a("C7Lr")(c,p,!1,function(t){a("jeuz")},"data-v-e5e4b63a",null);e.default=m.exports}});
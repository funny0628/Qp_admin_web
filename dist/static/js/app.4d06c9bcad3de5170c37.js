webpackJsonp([113],{"+cgv":function(e,n){},"3f40":function(e,n){},"4qOc":function(e,n){},"927w":function(e,n){},DAHQ:function(e,n,t){"use strict";var r=t("Zrlr"),o=t.n(r),a=t("//Fk"),u=t.n(a),i=t("mtWM"),c=t.n(i),l=c.a.CancelToken,s=void 0,f=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"post",r=void 0,o=((s=c.a.create({baseURL:"",timeout:2e4,cancelToken:new l(function(e){r=e})})).interceptors.request.use(function(e){return e},function(e){return u.a.reject(e)}),s.interceptors.response.use(function(e){var n=e.data||{};return 200===(e.status||400)?n:{}},function(e){return u.a.reject(e)}),new u.a(function(r,o){s({method:t||"post",url:e,data:n}).then(function(e){r(e)}).catch(function(e){o(e)})}));return new m(o,r)},m=function e(n,t){o()(this,e),this.promise=n,this.cancel="function"==typeof t?t:function(){}};n.a={post:function(e,n){return f(e,n,"post")},get:function(e,n){e+="?";var t=[];for(var r in n)t.push(r+"="+n[r]);return e+=t.join("&"),f(e,{},"get")},all:function(e,n){}}},HaFW:function(e,n,t){"use strict";var r=t("Dd8w"),o=t.n(r),a=t("mvHQ"),u=t.n(a),i={},c={},l={},s=[],f=null,m=null,d=null,h="",v={};n.a={checkPermission:function(e){return!0},checkLogin:function(){return!0},get models(){return i},set models(e){i=e,void 0===e||null===e?(c={},l={}):(c=function(){var e=function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r={},a={};if(!n.name)throw"no find vue name, data is "+u()(n);var i=[t,n.name].join("/");if(r[i]={},r[i].vue=n.vue||null,r[i].parent=t,n.children&&n.children.length>0)for(var c in n.children)a=o()({},a,e(n.children[c],i));return o()({},r,a)},n={};for(var t in i)n=o()({},e(i[t],""),n);return n}(),l=function(){var e=function e(n,t){var r={},a={};if(!n.name)throw"no find vue name, data is "+u()(n);if(r[n.name]={},r[n.name].vue=n.vue||null,r[n.name].name=n.name,r[n.name].text=n.text||"",r[n.name].parent=t,n.children&&n.children.length>0)for(var i in n.children)a=o()({},a,e(n.children[i],n.name));return o()({},r,a)},n={};for(var t in i)n=o()({},e(i[t],""),n);return n}())},get pageMap(){return c},get pageList(){return l},get headerVue(){return f},set headerVue(e){f=e},get loopArray(){return s},set loopArray(e){s=e},get loginVue(){return m},set loginVue(e){m=e},get startApp(){return d},set startApp(e){d=e},get el(){return h},set el(e){h=e},get store(){return v},set store(e){v=e}}},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t("7+uW"),o=(t("DAHQ"),{render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]});var a=t("VU/8")({name:"App"},o,!1,function(e){t("sHqE")},null,null).exports,u=t("Dd8w"),i=t.n(u),c=t("pFYg"),l=t.n(c),s=t("NYxO"),f=t("/ocq"),m=t("zL8q"),d=t.n(m),h=t("Y81h"),v=t.n(h),b=t("hKoQ"),p=t.n(b),g=(t("UVIz"),t("927w"),t("HaFW")),x=(t("fM06"),t("xNI1"),t("bOdI")),y=t.n(x),P=t("Vetr"),_={state:{isPhone:!1},mutations:y()({},P.a,function(e,n){e.isPhone=n||!1})},k=t("wUZ8"),C=t.n(k),G=t("Vi3T"),w=t.n(G),A=t("TXmL"),M={_admin_plugin:{click:"click",hide:"hide",show:"show",year:"year",month:"month",day:"day",time_min:"start_time",time_max:"end_time",this_month:"this month",this_week:"this week",today:"today"}},L={_admin_plugin:{click:"点击",hide:"隐藏",show:"显示",search:"搜索",year:"年",month:"月",day:"日",time_min:"开始时间",time_max:"结束时间",this_month:"本月",this_week:"本周",today:"本日",no_data:"暂无数据"}},S=t("urW8"),R=t.n(S);var F={index:{name:"index",vue:null,text:"首页",children:[]},authentications:{name:"authentications",vue:null,text:"权限管理",children:[{name:"user_manage",text:"用户管理",vue:function(e){return Promise.all([t.e(0),t.e(50)]).then(function(){return e(t("cUb6"))}.bind(null,t)).catch(t.oe)}},{name:"role_manage",text:"角色管理",vue:function(e){return Promise.all([t.e(0),t.e(1)]).then(function(){return e(t("wqZ8"))}.bind(null,t)).catch(t.oe)}},{name:"operation_logs",text:"系统操作日志",vue:function(e){return Promise.all([t.e(0),t.e(75)]).then(function(){return e(t("SasV"))}.bind(null,t)).catch(t.oe)}}]},allAgency:{name:"allAgency",vue:null,text:"全民代理",children:[{name:"AgencyConfig",text:"全民代理配置",vue:function(e){return Promise.all([t.e(0),t.e(32)]).then(function(){return e(t("9Fu8"))}.bind(null,t)).catch(t.oe)}},{name:"Agency",text:"全民代理",vue:function(e){return Promise.all([t.e(0),t.e(60)]).then(function(){return e(t("kICx"))}.bind(null,t)).catch(t.oe)}}]},gameMan:{name:"SubGameConfig",vue:null,text:"子游戏配置",children:[{name:"happyFishing",text:"欢乐捕鱼",vue:null,children:[{name:"fishRoomCofig",text:"捕鱼-房间配置",vue:function(e){return Promise.all([t.e(0),t.e(42)]).then(function(){return e(t("uPKo"))}.bind(null,t)).catch(t.oe)}},{name:"fishControl",text:"捕鱼-机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(39)]).then(function(){return e(t("zjUI"))}.bind(null,t)).catch(t.oe)}},{name:"batteryConfig",text:"炮台配置",vue:function(e){return Promise.all([t.e(0),t.e(105)]).then(function(){return e(t("vsM9"))}.bind(null,t)).catch(t.oe)}}]},{name:"hundredNiuNiu",text:"百人牛牛",vue:null,children:[{name:"trineRoomCofig",text:"三倍场房间配置",vue:function(e){return Promise.all([t.e(0),t.e(97)]).then(function(){return e(t("3Sw5"))}.bind(null,t)).catch(t.oe)}},{name:"decupleRoomCofig",text:"十倍场房间配置",vue:function(e){return Promise.all([t.e(0),t.e(18)]).then(function(){return e(t("xFes"))}.bind(null,t)).catch(t.oe)}},{name:"trineRobotControl",text:"三倍场机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(92)]).then(function(){return e(t("pmzJ"))}.bind(null,t)).catch(t.oe)}},{name:"decupleRobotControl",text:"十倍场机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(84)]).then(function(){return e(t("EtYc"))}.bind(null,t)).catch(t.oe)}},{name:"trineBankerControl",text:"三倍场上庄机器人控制 ",vue:function(e){return Promise.all([t.e(0),t.e(109)]).then(function(){return e(t("Gu8o"))}.bind(null,t)).catch(t.oe)}},{name:"decupleBankerControl",text:"十倍场上庄机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(48)]).then(function(){return e(t("Z3Tb"))}.bind(null,t)).catch(t.oe)}}]},{name:"RobNiuNiu",text:"抢庄牛牛",vue:null,children:[{name:"RoomCofig",text:"抢庄牛-房间配置",vue:function(e){return Promise.all([t.e(0),t.e(14)]).then(function(){return e(t("BRu6"))}.bind(null,t)).catch(t.oe)}},{name:"RobotControl",text:"抢庄牛-机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(81)]).then(function(){return e(t("7nmj"))}.bind(null,t)).catch(t.oe)}}]},{name:"GoldenFlower",text:"炸金花",vue:null,children:[{name:"F_RoomCofig",text:"金花-房间配置",vue:function(e){return Promise.all([t.e(0),t.e(44)]).then(function(){return e(t("clSp"))}.bind(null,t)).catch(t.oe)}},{name:"F_RobotControl",text:"金花-机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(77)]).then(function(){return e(t("Gx0D"))}.bind(null,t)).catch(t.oe)}},{name:"F_ProbConfig",text:"金花-牌型概率配置",vue:function(e){return Promise.all([t.e(0),t.e(28)]).then(function(){return e(t("K2C3"))}.bind(null,t)).catch(t.oe)}}]},{name:"Landlords",text:"斗地主",vue:null,children:[{name:"L_RoomCofig",text:"斗地主-房间配置",vue:function(e){return Promise.all([t.e(0),t.e(91)]).then(function(){return e(t("R6E6"))}.bind(null,t)).catch(t.oe)}},{name:"L_RobotControl",text:"斗地主-机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(78)]).then(function(){return e(t("SWVw"))}.bind(null,t)).catch(t.oe)}},{name:"L_PreventConfig",text:"斗地主-防刷配置",vue:function(e){return Promise.all([t.e(0),t.e(40)]).then(function(){return e(t("NXIz"))}.bind(null,t)).catch(t.oe)}}]},{name:"FruitMachine",text:"水果机",vue:null,children:[{name:"S_RoomCofig",text:"水果机-房间配置",vue:function(e){return Promise.all([t.e(0),t.e(55)]).then(function(){return e(t("LlVw"))}.bind(null,t)).catch(t.oe)}},{name:"S_BasicDeploy",text:"水果机-基础配置",vue:function(e){return Promise.all([t.e(0),t.e(68)]).then(function(){return e(t("9ucc"))}.bind(null,t)).catch(t.oe)}}]},{name:"RedBlackWar",text:"红黑大战",vue:null,children:[{name:"W_RoomCofig",text:"红黑-房间配置",vue:function(e){return Promise.all([t.e(0),t.e(36)]).then(function(){return e(t("iUlP"))}.bind(null,t)).catch(t.oe)}},{name:"W_RobotControl",text:"红黑-机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(108)]).then(function(){return e(t("JtDv"))}.bind(null,t)).catch(t.oe)}}]},{name:"ChineseBoxer",text:"龙虎斗",vue:null,children:[{name:"C_RoomCofig",text:"龙虎-房间配置",vue:function(e){return Promise.all([t.e(0),t.e(54)]).then(function(){return e(t("UY32"))}.bind(null,t)).catch(t.oe)}},{name:"C_RobotControl",text:"龙虎-机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(29)]).then(function(){return e(t("vT8U"))}.bind(null,t)).catch(t.oe)}}]},{name:"BMW",text:"奔驰宝马",vue:null,children:[{name:"B_RoomCofig",text:"奔驰-房间配置",vue:function(e){return Promise.all([t.e(0),t.e(33)]).then(function(){return e(t("QrRD"))}.bind(null,t)).catch(t.oe)}},{name:"B_RobotControl",text:"奔驰-机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(9)]).then(function(){return e(t("HCjl"))}.bind(null,t)).catch(t.oe)}}]},{name:"FamiliesHappy",text:"百家乐",vue:null,children:[{name:"H_RoomCofig",text:"百家乐-房间配置",vue:function(e){return Promise.all([t.e(0),t.e(59)]).then(function(){return e(t("XgMV"))}.bind(null,t)).catch(t.oe)}},{name:"H_RobotControl",text:"百家乐-机器人控制",vue:function(e){return Promise.all([t.e(0),t.e(35)]).then(function(){return e(t("sAZr"))}.bind(null,t)).catch(t.oe)}}]},{name:"LinConfiguration",text:"百人场下注额度配置",vue:function(e){return Promise.all([t.e(0),t.e(12)]).then(function(){return e(t("2F3w"))}.bind(null,t)).catch(t.oe)}}]},lobby_config:{name:"lobby_config",text:"大厅功能配置",vue:null,children:[{name:"payConfig",text:"支付配置",children:[{name:"VIPpayConfig",text:"VIP充值配置",vue:function(e){return Promise.all([t.e(0),t.e(43)]).then(function(){return e(t("/VVj"))}.bind(null,t)).catch(t.oe)}},{name:"payList",text:"支付列表",vue:function(e){return Promise.all([t.e(0),t.e(52)]).then(function(){return e(t("vmZU"))}.bind(null,t)).catch(t.oe)}},{name:"reportWayConfig",text:"举报方式配置",vue:function(e){return Promise.all([t.e(0),t.e(22)]).then(function(){return e(t("xnFa"))}.bind(null,t)).catch(t.oe)}}]},{name:"Announcements ",text:"活动和公告",children:[{name:"gameAnnouncement",text:"游戏公告",vue:function(e){return Promise.all([t.e(0),t.e(7)]).then(function(){return e(t("XORi"))}.bind(null,t)).catch(t.oe)}},{name:"systemBroadcast",text:"系统广播",vue:function(e){return Promise.all([t.e(0),t.e(8)]).then(function(){return e(t("MZNZ"))}.bind(null,t)).catch(t.oe)}},{name:"activityList",text:"活动列表",vue:function(e){return Promise.all([t.e(0),t.e(16)]).then(function(){return e(t("A9/V"))}.bind(null,t)).catch(t.oe)}},{name:"stopNotice",text:"停服公告",vue:function(e){return Promise.all([t.e(0),t.e(3)]).then(function(){return e(t("5l1f"))}.bind(null,t)).catch(t.oe)}}]},{name:"RankListManage",text:"排行榜管理",children:[{name:"RankListManageConf",text:"排行榜配置",vue:function(e){return Promise.all([t.e(0),t.e(58)]).then(function(){return e(t("yuQq"))}.bind(null,t)).catch(t.oe)}},{name:"RankListManageHistory",text:"排行榜历史数据",vue:function(e){return Promise.all([t.e(0),t.e(5)]).then(function(){return e(t("NLCO"))}.bind(null,t)).catch(t.oe)}}]},{name:"VipSystem",text:"vip系统",vue:null,children:[{name:"vipClassConf",text:"VIP等级配置",vue:function(e){return Promise.all([t.e(0),t.e(71)]).then(function(){return e(t("syTM"))}.bind(null,t)).catch(t.oe)}},{name:"vipRobotConf",text:"VIP机器人配置",vue:function(e){return Promise.all([t.e(0),t.e(99)]).then(function(){return e(t("x/dN"))}.bind(null,t)).catch(t.oe)}}]},{name:"gameList",text:"游戏列表",vue:function(e){return Promise.all([t.e(0),t.e(104)]).then(function(){return e(t("mUM0"))}.bind(null,t)).catch(t.oe)}},{name:"GameSortConf",text:"游戏排序配置",vue:function(e){return Promise.all([t.e(0),t.e(73)]).then(function(){return e(t("J5bL"))}.bind(null,t)).catch(t.oe)}},{name:"BroadcastConf",text:"对局广播配置",vue:function(e){return Promise.all([t.e(0),t.e(74)]).then(function(){return e(t("cIpR"))}.bind(null,t)).catch(t.oe)}},{name:"exchange_config",text:"兑换配置",vue:function(e){return Promise.all([t.e(0),t.e(15)]).then(function(){return e(t("rU+Z"))}.bind(null,t)).catch(t.oe)}},{name:"HallAdvertiseConf",text:"大厅宣传页配置",vue:function(e){return Promise.all([t.e(0),t.e(25)]).then(function(){return e(t("BwcQ"))}.bind(null,t)).catch(t.oe)}},{name:"BottomMenu",text:"底部菜单",vue:function(e){return Promise.all([t.e(0),t.e(41)]).then(function(){return e(t("dMmZ"))}.bind(null,t)).catch(t.oe)}},{name:"FunSortConf",text:"功能排序配置",vue:function(e){return Promise.all([t.e(0),t.e(13)]).then(function(){return e(t("zAmQ"))}.bind(null,t)).catch(t.oe)}},{name:"EmailSystem",text:"邮件管理",children:[{name:"platformEmail",text:"平台邮件",vue:function(e){return Promise.all([t.e(0),t.e(63)]).then(function(){return e(t("5uL3"))}.bind(null,t)).catch(t.oe)}},{name:"allServersEmail",text:"全服邮件",vue:function(e){return Promise.all([t.e(0),t.e(107)]).then(function(){return e(t("LSmk"))}.bind(null,t)).catch(t.oe)}}]}]},operations:{name:"operations",vue:null,text:"运营管理",children:[{name:"bank_card",text:"银行卡订单",vue:function(e){return Promise.all([t.e(0),t.e(87)]).then(function(){return e(t("QxSb"))}.bind(null,t)).catch(t.oe)}},{name:"order_manage",text:"订单管理",vue:function(e){return Promise.all([t.e(0),t.e(51)]).then(function(){return e(t("ybfJ"))}.bind(null,t)).catch(t.oe)}},{name:"users",text:"用户列表",vue:function(e){return Promise.all([t.e(0),t.e(53)]).then(function(){return e(t("zyc9"))}.bind(null,t)).catch(t.oe)}},{name:"channels",text:"渠道列表",vue:function(e){return Promise.all([t.e(0),t.e(79)]).then(function(){return e(t("OYEc"))}.bind(null,t)).catch(t.oe)}},{name:"play_records",text:"牌局记录",vue:function(e){return Promise.all([t.e(0),t.e(49)]).then(function(){return e(t("lOKY"))}.bind(null,t)).catch(t.oe)}},{name:"fresher_awards",text:"新人奖励",vue:function(e){return Promise.all([t.e(0),t.e(106)]).then(function(){return e(t("OZJx"))}.bind(null,t)).catch(t.oe)}},{name:"cash_flows",text:"流水查询",vue:function(e){return Promise.all([t.e(0),t.e(47)]).then(function(){return e(t("L31j"))}.bind(null,t)).catch(t.oe)}},{name:"fish_statistic",text:"捕鱼统计",vue:function(e){return Promise.all([t.e(0),t.e(11)]).then(function(){return e(t("Bot7"))}.bind(null,t)).catch(t.oe)}},{name:"withdraw_records",text:"提现记录",vue:function(e){return Promise.all([t.e(0),t.e(57)]).then(function(){return e(t("3iG9"))}.bind(null,t)).catch(t.oe)}},{name:"change_coins",text:"修改玩家金币",vue:function(e){return Promise.all([t.e(0),t.e(19)]).then(function(){return e(t("lIeN"))}.bind(null,t)).catch(t.oe)}}]},repertoryMan:{name:"RepertoryMan",vue:null,text:"库存管理",children:[{name:"GMconfig",text:"GM配置",children:[{name:"GMrepControl",text:"GM库存控制",vue:function(e){return Promise.all([t.e(0),t.e(62)]).then(function(){return e(t("j8hf"))}.bind(null,t)).catch(t.oe)}},{name:"GMconf",text:"GM配置",vue:function(e){return Promise.all([t.e(0),t.e(31)]).then(function(){return e(t("U1Qm"))}.bind(null,t)).catch(t.oe)}},{name:"GMdata",text:"GM库存数据",vue:function(e){return Promise.all([t.e(0),t.e(86)]).then(function(){return e(t("PziM"))}.bind(null,t)).catch(t.oe)}},{name:"GMcontrol",text:"GM控制",vue:function(e){return Promise.all([t.e(0),t.e(66)]).then(function(){return e(t("ixb8"))}.bind(null,t)).catch(t.oe)}},{name:"GMrepFlow",text:"GM库存流水",vue:function(e){return Promise.all([t.e(0),t.e(24)]).then(function(){return e(t("8Ed7"))}.bind(null,t)).catch(t.oe)}}]},{name:"Landlords",text:"斗地主",children:[{name:"LandDrawWater",text:"斗地主-抽水数据",vue:function(e){return Promise.all([t.e(0),t.e(10)]).then(function(){return e(t("eA5S"))}.bind(null,t)).catch(t.oe)}}]},{name:"BombFlower",text:"炸金花",children:[{name:"GFlowerControl",text:"炸金花-库存控制",vue:function(e){return Promise.all([t.e(0),t.e(110)]).then(function(){return e(t("gnAq"))}.bind(null,t)).catch(t.oe)}},{name:"GFlowerWater",text:"炸金花-抽水数据",vue:function(e){return t.e(95).then(function(){return e(t("npNf"))}.bind(null,t)).catch(t.oe)}}]},{name:"HogCow",text:"抢庄牛牛",children:[{name:"CowControl",text:"抢庄牛牛-抢庄控制",vue:function(e){return Promise.all([t.e(0),t.e(93)]).then(function(){return e(t("Q9se"))}.bind(null,t)).catch(t.oe)}},{name:"CowWater",text:"抢庄牛牛-抽水数据",vue:function(e){return t.e(38).then(function(){return e(t("gP63"))}.bind(null,t)).catch(t.oe)}}]},{name:"HundredNiu",text:"百人牛牛",children:[{name:"HNControl",text:"百人牛牛-抢庄控制",vue:function(e){return Promise.all([t.e(0),t.e(101)]).then(function(){return e(t("c9e+"))}.bind(null,t)).catch(t.oe)}},{name:"HNWater",text:"百人牛牛-抽水数据",vue:function(e){return t.e(67).then(function(){return e(t("SWGe"))}.bind(null,t)).catch(t.oe)}}]},{name:"RedBlackWar",text:"红黑大战",children:[{name:"RBControl",text:"红黑-抢庄控制",vue:function(e){return Promise.all([t.e(0),t.e(34)]).then(function(){return e(t("szzp"))}.bind(null,t)).catch(t.oe)}},{name:"RBWater",text:"红黑-抽水数据",vue:function(e){return t.e(80).then(function(){return e(t("eOd2"))}.bind(null,t)).catch(t.oe)}}]},{name:"ChineseWar",text:"龙虎斗",children:[{name:"C_Control",text:"龙虎斗-抢庄控制",vue:function(e){return Promise.all([t.e(0),t.e(88)]).then(function(){return e(t("MvPp"))}.bind(null,t)).catch(t.oe)}},{name:"C_Water",text:"龙虎斗-抽水数据",vue:function(e){return t.e(26).then(function(){return e(t("Uh8f"))}.bind(null,t)).catch(t.oe)}}]},{name:"HappyFishing",text:"欢乐捕鱼",children:[{name:"H_Control",text:"欢乐捕鱼-抢庄控制",vue:function(e){return Promise.all([t.e(0),t.e(85)]).then(function(){return e(t("LsAQ"))}.bind(null,t)).catch(t.oe)}},{name:"H_Water",text:"欢乐捕鱼-抽水数据",vue:function(e){return t.e(82).then(function(){return e(t("B8PQ"))}.bind(null,t)).catch(t.oe)}}]},{name:"FruitMachine",text:"水果机",children:[{name:"F_Control",text:"水果机-抢庄控制",vue:function(e){return Promise.all([t.e(0),t.e(94)]).then(function(){return e(t("oF5v"))}.bind(null,t)).catch(t.oe)}},{name:"F_Water",text:"水果机-抽水数据",vue:function(e){return t.e(17).then(function(){return e(t("j1yU"))}.bind(null,t)).catch(t.oe)}}]},{name:"Mammon",text:"财神驾到",children:[{name:"M_Control",text:"财神驾到-抢庄控制",vue:function(e){return Promise.all([t.e(0),t.e(96)]).then(function(){return e(t("tf2g"))}.bind(null,t)).catch(t.oe)}},{name:"M_Water",text:"财神驾到-抽水数据",vue:function(e){return t.e(83).then(function(){return e(t("bif3"))}.bind(null,t)).catch(t.oe)}}]},{name:"HundredHappy",text:"百家乐",children:[{name:"Happy_Control",text:"百家乐-抢庄控制",vue:function(e){return Promise.all([t.e(0),t.e(89)]).then(function(){return e(t("cTPd"))}.bind(null,t)).catch(t.oe)}},{name:"Happy_Water",text:"百家乐-抽水数据",vue:function(e){return t.e(21).then(function(){return e(t("5eMy"))}.bind(null,t)).catch(t.oe)}}]},{name:"BCBM",text:"百家乐",children:[{name:"BC_Control",text:"百家乐-抢庄控制",vue:function(e){return Promise.all([t.e(0),t.e(72)]).then(function(){return e(t("ZY/G"))}.bind(null,t)).catch(t.oe)}},{name:"BC_Water",text:"百家乐-抽水数据",vue:function(e){return t.e(90).then(function(){return e(t("Tywy"))}.bind(null,t)).catch(t.oe)}}]}]},sys_config:{name:"sys_config",vue:null,text:"系统配置",children:[{name:"hot_update",text:"热更新",vue:function(e){return Promise.all([t.e(0),t.e(65)]).then(function(){return e(t("BCLz"))}.bind(null,t)).catch(t.oe)}},{name:"whiteList",text:"ip白名单",vue:function(e){return Promise.all([t.e(0),t.e(27)]).then(function(){return e(t("ziV7"))}.bind(null,t)).catch(t.oe)}},{name:"ip_blacklist",text:"ip黑名单",vue:function(e){return Promise.all([t.e(0),t.e(103)]).then(function(){return e(t("oabC"))}.bind(null,t)).catch(t.oe)}},{name:"device_blacklist",text:"设备黑名单",vue:function(e){return Promise.all([t.e(0),t.e(37)]).then(function(){return e(t("dsVN"))}.bind(null,t)).catch(t.oe)}}]},DataAnalysis:{name:"DataAnalysis",vue:null,text:"数据分析",children:[{name:"ChannelsReport",text:"渠道报表日",vue:function(e){return Promise.all([t.e(0),t.e(98)]).then(function(){return e(t("lpkv"))}.bind(null,t)).catch(t.oe)}},{name:"Channels",text:"渠道报表",vue:function(e){return Promise.all([t.e(0),t.e(100)]).then(function(){return e(t("aVLu"))}.bind(null,t)).catch(t.oe)}},{name:"LTVReport",text:"LTV报表",vue:function(e){return Promise.all([t.e(0),t.e(46)]).then(function(){return e(t("ypOL"))}.bind(null,t)).catch(t.oe)}},{name:"lastAnalysis",text:"留存分析",vue:function(e){return Promise.all([t.e(0),t.e(56)]).then(function(){return e(t("m6Lc"))}.bind(null,t)).catch(t.oe)}},{name:"NewPlayerChange",text:"新玩家付费转换",vue:function(e){return Promise.all([t.e(0),t.e(30)]).then(function(){return e(t("KLyU"))}.bind(null,t)).catch(t.oe)}},{name:"Statistics",text:"台费统计",vue:function(e){return Promise.all([t.e(0),t.e(69)]).then(function(){return e(t("oW7z"))}.bind(null,t)).catch(t.oe)}},{name:"CardpPandect",text:"牌局总览",vue:function(e){return Promise.all([t.e(0),t.e(4)]).then(function(){return e(t("zdk0"))}.bind(null,t)).catch(t.oe)}},{name:"AddUser",text:"新增用户",vue:function(e){return Promise.all([t.e(0),t.e(23)]).then(function(){return e(t("1LlS"))}.bind(null,t)).catch(t.oe)}},{name:"FlyBack",text:"流失与回归",vue:function(e){return Promise.all([t.e(0),t.e(111)]).then(function(){return e(t("xg2C"))}.bind(null,t)).catch(t.oe)}}]},ActivityOperations:{name:"ActivityOperations",vue:null,text:"活动运营",children:[{name:"FirstConfig",text:"首充配置",vue:function(e){return Promise.all([t.e(0),t.e(64)]).then(function(){return e(t("PsO3"))}.bind(null,t)).catch(t.oe)}},{name:"SignUp",text:"每日签到",vue:function(e){return Promise.all([t.e(0),t.e(20)]).then(function(){return e(t("T+Ee"))}.bind(null,t)).catch(t.oe)}},{name:"SaveMoney",text:"每日救赎金",vue:function(e){return Promise.all([t.e(0),t.e(70)]).then(function(){return e(t("Wb+b"))}.bind(null,t)).catch(t.oe)}},{name:"Rainstorm",text:"每日暴风雨",vue:function(e){return Promise.all([t.e(0),t.e(76)]).then(function(){return e(t("8vWr"))}.bind(null,t)).catch(t.oe)}},{name:"MoneyTree",text:"摇钱树活动",vue:null,children:[{name:"MT_Config",text:"摇钱树配置",vue:function(e){return t.e(45).then(function(){return e(t("x+7F"))}.bind(null,t)).catch(t.oe)}},{name:"MT_TaskConfig",text:"摇钱树任务配置",vue:function(e){return t.e(61).then(function(){return e(t("2STE"))}.bind(null,t)).catch(t.oe)}},{name:"MT_OtherConfig",text:"其他配置",vue:function(e){return Promise.all([t.e(0),t.e(102)]).then(function(){return e(t("pxl1"))}.bind(null,t)).catch(t.oe)}}]}]}},B=(t("slWF"),t("XLwt")),V=t.n(B),z=t("G0J2"),N=t.n(z),W=t("mtWM"),H=t.n(W),D=(t("mw3O"),{GetServerConfig:function(e){return H.a.get("v1/backend/lobby/server_config",{params:e})},PutServerConfig:function(e){return H.a.put("v1/backend/lobby/server_config",e)},PostServerConfig:function(e){return H.a.post("v1/backend/lobby/server_config",e)},GetTableConfig:function(e){return H.a.get("v1/backend/lobby/server_config_two")},PostTableConfig:function(e){return H.a.post("v1/backend/lobby/server_config_two",e)},GetAllGameList:function(e){return H.a.get("v1/backend/lobby/all_game_list",{params:e})},GetPaylist:function(e){return H.a.get("v1/backend/lobby/pay_list",{params:e})},PostPaylist:function(e){return H.a.post("v1/backend/lobby/pay_list",e)},PutPaylist:function(e){return H.a.put("v1/backend/lobby/pay_list",e)},DeletePaylist:function(e){return H.a.delete("v1/backend/lobby/pay_list",{params:e})},GetGameNotice:function(e){return H.a.get("v1/backend/lobby/game_notice",{params:e})},PostGameNotice:function(e){return console.log("post"),H.a.post("v1/backend/lobby/game_notice",e)},PutGameNotice:function(e){return console.log("put"),H.a.put("v1/backend/lobby/game_notice",e)},DeleteGameNotice:function(e){return console.log("delete"),H.a.delete("v1/backend/lobby/game_notice",{params:e})},GetSysBroadcast:function(e){return H.a.get("v1/backend/lobby/sys_broadcast",{params:e})},PostSysBroadcast:function(e){return console.log("post"),H.a.post("v1/backend/lobby/sys_broadcast",e)},PutSysBroadcast:function(e){return console.log("put"),H.a.put("v1/backend/lobby/sys_broadcast",e)},DeleteSysBroadcast:function(e){return H.a.delete("v1/backend/lobby/sys_broadcast",{params:e})},GetActivityList:function(e){return H.a.get("v1/backend/lobby/activity_list",{params:e})},PostActivityList:function(e){return console.log("put"),H.a.post("v1/backend/lobby/activity_list",e)},PutActivityList:function(e){return console.log("put"),H.a.put("v1/backend/lobby/activity_list",e)},DeleteActivityList:function(e){return H.a.delete("v1/backend/lobby/activity_list",{params:e})},GetStopNotice:function(e){return H.a.get("v1/backend/lobby/stop_notice",{params:e})},PostStopNotice:function(e){return console.log("put"),H.a.post("v1/backend/lobby/stop_notice",e)},PutStopNotice:function(e){return console.log("put"),H.a.put("v1/backend/lobby/stop_notice",e)},DeleteStopNotice:function(e){return H.a.delete("v1/backend/lobby/stop_notice",{params:e})},GetEmail:function(e){return H.a.get("v1/backend/lobby/mail",{params:e})},PostEmail:function(e){return console.log("post"),H.a.post("v1/backend/lobby/mail",e)},PutEmail:function(e){return console.log("put"),H.a.put("v1/backend/lobby/mail",e)},patchEmail:function(e){return H.a.patch("v1/backend/lobby/mail",e)},GetManageHistory:function(e){return H.a.get("v1/backend/lobby/ranking_history",{params:e})}}),E=t("JSQk"),U=t.n(E),T={GetUsers:function(e){return H.a.get("v1/backend/operation/users",{params:e})},GetUserDetail:function(e){return H.a.get("v1/backend/operation/user/detail",{params:e})},PostUserLock:function(e){return H.a.post("v1/backend/operation/user/lock",e)},PostUserUnlock:function(e){return H.a.post("v1/backend/operation/user/unlock",e)},GetUserLock:function(e){return H.a.get("v1/backend/operation/user/lock",{params:e})},GetVips:function(e){return H.a.get("v1/backend/operation/vips",{params:e})},GetChannels:function(e){return H.a.get("v1/backend/operation/channels",{params:e})},GetGameControl:function(e){return H.a.get("v1/backend/inventory/game_control",{params:e})},GetInvenData:function(e){return H.a.get("v1/backend/inventory/inventory_data",{params:e})},GetGameWater:function(e){return H.a.get("v1/backend/inventory/game_water",{params:e})},GetSonGame:function(e){return H.a.get("v1/backend/lobby/all_game_list",{params:e})}},I={GetAllAgency:function(e){return H.a.get("v1/backend/agency/config",{params:e})},PostAllAgency:function(e){return H.a.post("v1/backend/agency/config",e)},PutAllAgency:function(e){return H.a.put("v1/backend/agency/config",e)},DeleteAllAgency:function(e){return H.a.delete("v1/backend/agency/config",{params:e})},GetAgency:function(e){return H.a.get("v1/backend/agency/data",{params:e})},GetEarnings:function(e){return H.a.get("v1/backend/agency/earnings_info",{params:e})},GetAgencyLevel:function(e){return H.a.get("v1/backend/agency/subordinate",{params:e})}},O={GetrReportEveryday:function(e){return H.a.get("v1/backend/channel/report_everyday",{params:e})},GetrReportLtv:function(e){return H.a.get("v1/backend/channel/report_ltv",{params:e})},GetrAnalysis:function(e){return H.a.get("v1/backend/channel/retained_analysis",{params:e})},GetrPaySwitch:function(e){return H.a.get("v1/backend/channel/pay_switch",{params:e})},GetrMatchOverview:function(e){return H.a.get("v1/backend/channel/match_overview",{params:e})},GetrNewUsers:function(e){return H.a.get("v1/backend/channel/new_users",{params:e})},GetStatistical:function(e){return H.a.get("v1/backend/channel/fee_statistical",{params:e})},GetrReport:function(e){return H.a.get("v1/backend/channel/report_eachday",{params:e})},GetrLoss:function(e){return H.a.get("v1/backend/channel/loss_regression",{params:e})},GetDdz:function(e){return H.a.get("v1/backend/songame/ddz_prevent",{params:e})},PostDdz:function(e){return H.a.post("v1/backend/songame/ddz_prevent",e)},PutDdz:function(e){return H.a.put("v1/backend/songame/ddz_prevent",e)},DeleterDdz:function(e){return H.a.delete("v1/backend/songame/ddz_prevent",{params:e})}},j=(t("3f40"),t("4qOc"),t("+cgv"),t("K/Lq")),Q=t.n(j);r.default.use(function(){r.default.prototype.uploadFile=function(e,n){var t=this;!function(e,n){var t=new FileReader,r=2097152,o=Math.ceil(e.size/r),a=0,u=new U.a;function i(){var n=a*r,o=n+r>=e.size?e.size:n+r;t.readAsBinaryString(e.slice(n,o))}t.onload=function(e){u.appendBinary(e.target.result),++a<o?i():n(u.end())},i()}(e,function(r){e.md5=r,t.handleAjax("api/doc/file/getFileByMd5",{md5:r,name:e.name},function(r){r.data?n&&n():function(e,n,t,r){var o=new FileReader,a=2097152,u=Math.ceil(n.size/a);function i(){e.handleAjax("api/common/file/checkChunk",{md5:upload.md5,chunk:t},function(e){if(!1===e.data){var r=t*a,c=Math.min(r+a,n.size);o.readAsArrayBuffer(n.slice(r,c))}else++t<u&&i()},function(e){})}o.onload=function(e){var o=new FormData;o.append("md5",n.md5),o.append("chunks",u),o.append("chunksize",chunksize),o.append("currentChunk",t),o.append("fileObj",new Blob([this.result]));var c=new XMLHttpRequest;c.open("post","api/common/file/upload",!0),c.onreadystatechange=function(){if(4==c.readyState&&200==c.status)return++t<u?i():r&&r(),void(c=null);4==c.readyState&&c.status},c.upload.onprogress=function(e){parseInt((e.loaded+t*a)/n.size*100)},c.onerror=c.upload.onerror=function(){},c.send(o),o=null},i()}(t,e,0,n)})})}}),H.a.HallFunConfig=D,H.a.OperationMan=T,H.a.allAgency=I,H.a.DataAnalysis=O,r.default.prototype.$http=H.a,r.default.prototype.$echarts=V.a,r.default.use(Q.a),r.default.use(N.a),r.default.config.productionTip=!1,r.default.filter("dateFormat",function(e){var n=new Date(1e3*e);return n.getFullYear()+"-"+(n.getMonth()+1).toString().padStart(2,"0")+"-"+n.getDate().toString().padStart(2,"0")+" "+n.getHours().toString().padStart(2,"0")+":"+n.getMinutes().toString().padStart(2,"0")+":"+n.getSeconds().toString().padStart(2,"0")}),r.default.directive("has",{inserted:function(e,n){(function(e){for(var n=function(e){var n=[];return function e(t){0!==t.length&&t.forEach(function(t){t.children?(n.push(t.name),e(t.children)):n.push(t.name)})}(e),console.log(n),n}(JSON.parse(localStorage.getItem("user_info"))),t=0;t<n.length;t++)if(n[t]===e)return!0;return!1})(n.value)||e.parentNode.removeChild(e)}}),r.default.use(function(e,n){var o=n.config,a=n.models,u=n.checkPermission,c=n.headerVue,m=void 0===c?null:c,h=n.loopArray,b=void 0===h?[]:h,x=n.loginVue,y=void 0===x?null:x,P=n.store,k=void 0===P?{}:P,G=n.startApp,S=void 0===G?null:G,F=n.el,B=void 0===F?"#app":F,V=n.checkLogin,z=n.language,N=void 0===z?{}:z,W=n.extraInstall,H=void 0===W?{}:W;if(void 0===(void 0===a?"undefined":l()(a)))throw"can not find models";void 0!==(void 0===u?"undefined":l()(u))&&"function"==typeof u||console.warn("no find check permission"),k=k||{},g.a.models=a,g.a.checkPermission=u,g.a.headerVue=m,g.a.loopArray=b,g.a.loginVue=y,g.a.startApp=S,g.a.checkLogin=V,g.a.store={state:i()({},_.state||{},k.state||{}),mutations:i()({},_.mutations||{},k.mutations||{}),actions:i()({},_.actions||{},k.actions||{}),getters:i()({},_.getters||{},k.getters||{})},g.a.el=B,e.mixin({beforeCreate:function(){this.$pageInfo._app=this},created:function(){},deactivated:function(){},destroyed:function(){}}),Object.defineProperty(e.prototype,"$pageInfo",{value:{get app(){return this._app||null},get models(){return g.a.models},get pageList(){return g.a.pageList},get pageMap(){return g.a.pageMap},get config(){return o}}});var D={"zh-cn":i()({},w.a,L),en:i()({},C.a,M)},E={en:C.a,"zh-cn":w.a},U={},T=o.LANGUAGE||"zh-cn";for(var I in N){var O=N[I];if("_admin_plugin"in O)throw I+" language package key use _admin_plugin";U[I]=I in D?i()({},D[I],O):O}r.default.use(A.a),r.default.use(f.a),r.default.use(d.a),r.default.use(s.a);var j=new A.a({locale:T,messages:U});window.i18n=j,R.a.use(E[T]),p.a.polyfill();var Q=new s.a.Store(g.a.store),Z=[{path:"/",redirect:o.baseRedirect||"/home"},{path:"/home",name:"home",component:function(e){return Promise.all([t.e(0),t.e(2)]).then(function(){return e(t("TeE2"))}.bind(null,t)).catch(t.oe)}},{path:"/login",name:"login",component:y}],q=new f.a({mode:"history",strict:!1,scrollBehavior:function(e,n,t){return t||(n.meta.keepAlive&&(n.meta.savedPosition=document.body.scrollTop),{x:0,y:e.meta.savedPosition||0})},routes:Z});q.beforeEach(function(e,n,t){v.a.start(),"/login"===e.fullPath||"function"!=typeof g.a.checkLogin||g.a.checkLogin()?t():t("/login")}),q.afterEach(function(){v.a.done()}),new r.default(i()({el:B||"#app",components:{startApp:S},router:q,store:Q,i18n:j},H,{template:"<start-app/>"}))},{config:{IS_DEBUG:{state:!1,activePage:"userList"},ACTIVE_PAGE:"index"},models:F,checkPermission:function(e){},headerVue:function(e){return t.e(6).then(function(){return e(t("nhXY"))}.bind(null,t)).catch(t.oe)},loginVue:function(e){return t.e(0).then(function(){return e(t("vdVF"))}.bind(null,t)).catch(t.oe)},startApp:a})},UVIz:function(e,n){},Vetr:function(e,n,t){"use strict";t.d(n,"a",function(){return r});var r="SIZE_CHANGE"},fM06:function(e,n){},sHqE:function(e,n){},slWF:function(e,n){},xNI1:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.4d06c9bcad3de5170c37.js.map
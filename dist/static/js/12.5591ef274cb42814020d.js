webpackJsonp([12],{Bot7:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("iVUn"),i=a("fftp"),n=a("zhQY"),o=a("Z/hU"),l=a("2u00"),s=(a("y35B"),a("22Zk")),d=a("06fe"),c=(o.a,d.a,s.a,r.a,i.a,l.a,{name:"fish_statistic",extends:o.a,components:{InfoTableItem:d.a,InputArea:s.a,SelectTime:r.a,InfoTable:i.a,PermissionButton:l.a},data:function(){return{pagesize:10,currentPage:1,total:0,dialogFormVisible:!1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},format:{play_id:"",dateArr:[new Date((new Date).getTime()-6048e5),new Date]},tableStyle:[{label:"玩家id",prop:"uid",width:""},{label:"子弹发送总量",prop:"total_bullet",width:""},{label:"子弹价值",prop:"bullet_value",width:""},{label:"鱼总价值",prop:"fish_value",width:""},{label:"收支",prop:"payment",width:""},{label:"操作",prop:"action",width:"150"}],records:[],recordTableData:[],pageInfo:new n.a(0,[5,10,15],5)}},methods:{getFishList:function(){var e=this;this.$http.get("v1/backend/operation/fishes").then(function(t){console.log(t),200===t.data.code&&(e.records=t.data.data,e.total=t.data.total)})},searchData:function(){var e=this,t={user_id:Number(this.format.play_id),start_time:this.format.dateArr?parseInt(new Date(Number(this.format.dateArr[0])).getTime()/1e3):0,end_time:this.format.dateArr?parseInt(new Date(Number(this.format.dateArr[1])).getTime()/1e3):0};this.$http.get("v1/backend/operation/fishes",{params:t}).then(function(t){console.log(t),200===t.data.code&&(e.records=t.data.data,e.total=t.data.total)})},handleRecord:function(e){var t=this;console.log(e),this.dialogFormVisible=!0;var a={user_id:Number(e.uid),start_time:this.format.dateArr?parseInt(new Date(Number(this.format.dateArr[0])).getTime()/1e3):0,end_time:this.format.dateArr?parseInt(new Date(Number(this.format.dateArr[1])).getTime()/1e3):0};this.$http.get("v1/backend/operation/fish-data",{params:a}).then(function(e){console.log(e),200===e.data.code&&(t.recordTableData=e.data.data)})},handleSizeChange:function(e){this.pagesize=e,this.getFishList()},handleCurrentChange:function(e){this.currentPage=e,this.getFishList()}},mounted:function(){this.getFishList()}}),p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"FishStatistic-main"}},[a("input-area",[a("el-input",{attrs:{placeholder:"请输入玩家id",size:"medium",clearable:""},model:{value:e.format.play_id,callback:function(t){e.$set(e.format,"play_id",t)},expression:"format.play_id"}}),e._v(" "),a("span",[e._v("时间范围")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right",clearable:!1},model:{value:e.format.dateArr,callback:function(t){e.$set(e.format,"dateArr",t)},expression:"format.dateArr"}}),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.searchData}},[e._v("查询")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo,"hide-page":!0}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["payment".indexOf(t.prop)>=0?[a("span",[e._v(e._s(Number(t.row.fish_value)-Number(t.row.bullet_value)))])]:e._e(),e._v(" "),"action"===t.prop?[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleRecord(t.row)}}},[e._v("记录")])]:e._e(),e._v(" "),["action"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":e.currentPage,"page-sizes":[10,15,20],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"捕鱼记录",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.recordTableData,border:""}},[a("el-table-column",{attrs:{prop:"create_date",label:"时间",width:"180",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"bullet_value",label:"子弹总价值",width:"180",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"fish_value",label:"鱼价值",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"收支",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(Number(t.row.fish_value)-Number(t.row.bullet_value)))])]}}])})],1)],1)],1)},staticRenderFns:[]};var u=a("C7Lr")(c,p,!1,function(e){a("tJsG")},"data-v-eae6aa94",null);t.default=u.exports},tJsG:function(e,t){}});
//# sourceMappingURL=12.5591ef274cb42814020d.js.map
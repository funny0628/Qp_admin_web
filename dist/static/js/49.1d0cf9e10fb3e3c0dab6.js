webpackJsonp([49],{PziM:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("fftp"),l=a("zhQY"),r=a("22Zk"),o=a("06fe"),i=(o.a,r.a,n.a,{name:"GMdata",components:{InfoTableItem:o.a,InputArea:r.a,InfoTable:n.a},data:function(){return{platforms:[{value:1,label:"全部"},{value:2,label:"审核中"},{value:3,label:"已拒绝"},{value:4,label:"已关闭"},{value:5,label:"已完成"},{value:6,label:"申请中"}],format:{widthdraw_status:""},tableStyle:[{label:"日期",prop:"order_id",width:""},{label:"实时库存值",prop:"channel_name",width:""},{label:"实时库存变化值",prop:"channel_name",width:""},{label:"添加库存值",prop:"fun_1",width:""},{label:"添加库存变化值",prop:"fun_2",width:""},{label:"回收值",prop:"fun_5",width:""}],records:[{order_id:"10012",channel_name:"主包",fun_1:"备份",fun_2:"排行榜",fun_3:"邮箱",fun_4:"客服",fun_5:"未设定"}],pageInfo:new l.a(0,[5,10,15],5)}},methods:{search:function(){},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){var a=this;console.log(t);var n=t.id.toString();console.log(n),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(this.$message({type:"success",message:res.data.msg})).catch(function(){a.$message({type:"info",message:res.data.msg})})}},mounted:function(){}}),s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"GMdata-main"}},[a("input-area",[a("el-select",{attrs:{placeholder:"请选择",clearable:"",size:"medium"},model:{value:e.format.widthdraw_status,callback:function(t){e.$set(e.format,"widthdraw_status",t)},expression:"format.widthdraw_status"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("查找")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["action"===t.prop?[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]:e._e(),e._v(" "),["action"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1)],1)],1)},staticRenderFns:[]};var u=a("C7Lr")(i,s,!1,function(e){a("ir+k")},"data-v-39d1a09e",null);t.default=u.exports},"ir+k":function(e,t){}});
//# sourceMappingURL=49.1d0cf9e10fb3e3c0dab6.js.map
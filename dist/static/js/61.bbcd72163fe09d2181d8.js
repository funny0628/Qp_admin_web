webpackJsonp([61],{FOct:function(e,t){},lOKY:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("iVUn"),l=a("fftp"),n=a("zhQY"),i=a("Z/hU"),r=a("2u00"),s=(a("y35B"),a("22Zk")),c=a("06fe"),m=(i.a,c.a,s.a,o.a,l.a,r.a,{name:"GamblingRecord",extends:i.a,components:{InfoTableItem:c.a,InputArea:s.a,SelectTime:o.a,InfoTable:l.a,PermissionButton:r.a},data:function(){return{formLabelWidth:"120px",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},platforms:[{value:1,label:"全部"},{value:2,label:"审核中"},{value:3,label:"已拒绝"},{value:4,label:"已关闭"},{value:5,label:"已完成"},{value:6,label:"申请中"}],format:{session:"",id:"",time_range:""},tableStyle:[{label:"牌局号",prop:"order_id",width:""},{label:"房间类型",prop:"channel_name",width:""},{label:"游戏时间(开始)",prop:"channel_name",width:""},{label:"游戏时间(结束)",prop:"channel_name",width:""},{label:"参与人数/机器人",prop:"fun_1",width:""},{label:"玩家总输赢",prop:"fun_2",width:""},{label:"台费",prop:"fun_5",width:""},{label:"玩家id",prop:"fun_6",width:""},{label:"操作",prop:"action",width:"150"}],records:[{order_id:"10012",channel_name:"主包",fun_1:"备份",fun_2:"排行榜",fun_3:"邮箱",fun_4:"客服",fun_5:"未设定",fun_6:"未设定",fun_7:"未设定",fun_8:"设定",operator:"json",create_time:"2020-02-10 12:00:00",action:""}],pageInfo:new n.a(0,[5,10,15],5),dialogFormVisible:!1,form:{user_id:"",pay_type:"1",goods_type:100,money:"",check_money:""}}},methods:{search:function(){},handelClick:function(e,t){"edit"===e.type&&(this.dialogFormVisible=!0)},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){var a=this;console.log(t);var o=t.id.toString();console.log(o),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(this.$message({type:"success",message:res.data.msg})).catch(function(){a.$message({type:"info",message:res.data.msg})})}},mounted:function(){}}),d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"GamblingRecord-main"}},[a("input-area",[a("span",[e._v("场次")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择",clearable:"",size:"medium"},model:{value:e.format.session,callback:function(t){e.$set(e.format,"session",t)},expression:"format.session"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("span",[e._v("账号ID")]),e._v(" "),a("el-input",{staticStyle:{width:"20%"},attrs:{placeholder:"请输入账号id"},model:{value:e.format.id,callback:function(t){e.$set(e.format,"id",t)},expression:"format.id"}}),e._v(" "),a("span",[e._v("时间范围")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:e.format.time_range,callback:function(t){e.$set(e.format,"time_range",t)},expression:"format.time_range"}}),e._v(" "),a("el-button",{attrs:{type:"primary"}},[e._v("查找")]),e._v(" "),a("el-button",{attrs:{type:"primary"}},[e._v("导出excel")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["action"===t.prop?[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]:e._e(),e._v(" "),["action"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"添加人工订单",visible:e.dialogFormVisible,width:"30%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"用户id","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入用户id"},model:{value:e.form.user_id,callback:function(t){e.$set(e.form,"user_id",t)},expression:"form.user_id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"付款方式","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"人工充值"},model:{value:e.form.pay_type,callback:function(t){e.$set(e.form,"pay_type",t)},expression:"form.pay_type"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商品类型","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.form.goods_type,callback:function(t){e.$set(e.form,"goods_type",t)},expression:"form.goods_type"}},[a("el-option",{attrs:{label:"金币",value:"gold"}}),e._v(" "),a("el-option",{attrs:{label:"现金",value:"money"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"金额","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请输入金额"},model:{value:e.form.money,callback:function(t){e.$set(e.form,"money",t)},expression:"form.money"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"确认金额","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off",placeholder:"请确认输入金额"},model:{value:e.form.check_money,callback:function(t){e.$set(e.form,"check_money",t)},expression:"form.check_money"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var f=a("C7Lr")(m,d,!1,function(e){a("FOct")},"data-v-3dbe28b6",null);t.default=f.exports}});
//# sourceMappingURL=61.bbcd72163fe09d2181d8.js.map
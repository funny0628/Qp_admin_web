webpackJsonp([59],{ixb8:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("fftp"),o=a("zhQY"),n=a("22Zk"),r=a("06fe"),i=(r.a,n.a,l.a,{name:"GMcontrol",components:{InfoTableItem:r.a,InputArea:n.a,InfoTable:l.a},data:function(){return{dialogFormVisible:!1,formLabelWidth:"120px",platforms:[{value:1,label:"全部"},{value:2,label:"审核中"},{value:3,label:"已拒绝"},{value:4,label:"已关闭"},{value:5,label:"已完成"},{value:6,label:"申请中"}],format:{play_id:"",status:"",control_money:""},tableStyle:[{label:"玩家昵称",prop:"order_id",width:""},{label:"玩家id",prop:"channel_name",width:""},{label:"控制金额",prop:"channel_name",width:""},{label:"当前个人库存值",prop:"fun_1",width:""},{label:"状态",prop:"fun_2",width:""},{label:"权重值",prop:"fun_5",width:""},{label:"输钱概率(%)",prop:"fun_5",width:""},{label:"赢钱概率(%)",prop:"fun_5",width:""},{label:"创建类型",prop:"fun_5",width:""},{label:"创建时间",prop:"fun_5",width:""},{label:"最后修改人员",prop:"fun_5",width:""},{label:"操作",prop:"action",width:"150"}],records:[{order_id:"10012",channel_name:"主包",fun_1:"备份",fun_2:"排行榜",fun_3:"邮箱",fun_4:"客服",fun_5:"未设定",fun_6:"未设定",fun_7:"未设定",fun_8:"设定",operator:"json",create_time:"2020-02-10 12:00:00",action:""}],pageInfo:new o.a(0,[5,10,15],5),form:{name:""}}},methods:{search:function(){},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){var a=this;console.log(t);var l=t.id.toString();console.log(l),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(this.$message({type:"success",message:res.data.msg})).catch(function(){a.$message({type:"info",message:res.data.msg})})}},mounted:function(){}}),s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"GMcontrol-main"}},[a("input-area",[a("div",[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("添加")])],1),e._v(" "),a("el-input",{attrs:{placeholder:"请输入玩家id",size:"medium",clearable:""},model:{value:e.format.play_id,callback:function(t){e.$set(e.format,"play_id",t)},expression:"format.play_id"}}),e._v(" "),a("el-select",{attrs:{placeholder:"请选择",clearable:"",size:"medium"},model:{value:e.format.status,callback:function(t){e.$set(e.format,"status",t)},expression:"format.status"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-select",{attrs:{placeholder:"请选择",clearable:"",size:"medium"},model:{value:e.format.control_money,callback:function(t){e.$set(e.format,"control_money",t)},expression:"format.control_money"}},e._l(e.platforms,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("查找")])],1),e._v(" "),a("div",{staticClass:"bd"},[a("info-table",{attrs:{search:e.search,"table-style":e.tableStyle,records:e.records,"page-info":e.pageInfo}},[a("info-table-item",{attrs:{"table-style":e.tableStyle},scopedSlots:e._u([{key:"default",fn:function(t){return["action"===t.prop?[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]:e._e(),e._v(" "),["action"].indexOf(t.prop)<0?[e._v(e._s(t.row[t.prop]))]:e._e()]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"添加控制名单",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"ID","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"控制金额","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"权重值","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"输钱概率(%)","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"赢钱概率(%)","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=a("C7Lr")(i,s,!1,function(e){a("oxLR")},"data-v-2bf722cc",null);t.default=m.exports},oxLR:function(e,t){}});
//# sourceMappingURL=59.423a19cf172ed017b6bd.js.map
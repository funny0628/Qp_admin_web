webpackJsonp([88],{"5l1f":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={data:function(){return{orderlist:["ascending","descending"],tableData:[{topuptype:"充值类型",maxamount:"自定义最大金额",minamount:"可自定义最小金额",paynode:"支付备注",effect:"是否生效",recommend:"是否推荐",operation:"操作者",operationtime:"操作时间"}],rules:{},form:{sort:"",jianjie:"",aa:"文字",bb:"没有标签",paixun:"",zhuangtai:"展示",name:"按时间",channel:"",type:"支付宝",custom:"固定金额",common:"",remark:"0",maxcustom:"0",mincustom:"0",recommend:"不推荐",operant:"不生效"},currentPage4:1,visiblity:!1,title:"添加停服公告",selList:[]}},methods:{del:function(){0!=this.selList.length?console.log("已经有数据了"):this.$message("请选择需要删除的数据")},add:function(){this.visiblity=!0,this.title="添加停服公告"},handleSelectionChange:function(e){this.selList=e,console.log(e)},handleSizeChange:function(){},handleCurrentChange:function(){},handleEdit:function(){this.visiblity=!0,this.title="更新停服公告"},handleDelete:function(){var e=this;this.$confirm("确认删除吗?","信息",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.$message({type:"success",message:"删除成功!"})})},onSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.$store.commit("ADD_PAYITEM",e.form),e.forminit()})},back:function(){this.forminit()},forminit:function(){this.visiblity=!1}}},n={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{attrs:{id:"stopNotice"}},[l("div",{staticClass:"title"},[l("div",{staticClass:"botton"},[l("el-button",{attrs:{type:"danger"},on:{click:e.del}},[e._v("删除")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("添加")])],1)]),e._v(" "),l("div",[l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"","highlight-current-row":"","default-sort":{prop:"ID",order:e.orderlist[0]},data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{sortable:"",prop:"ID",label:"ID",align:"center"}}),e._v(" "),l("el-table-column",{attrs:{prop:"payname",label:"支付名称",align:"center","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"channel",label:"支付渠道",align:"center","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"paytype",label:"支付方式",align:"center","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"amount",label:"固定金额",align:"center","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"amount",label:"固定金额",align:"center","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"change",label:"XX",align:"center","show-overflow-tooltip":"",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini"},on:{click:function(l){return e.handleEdit(t.row)}}},[e._v("编辑")]),e._v(" "),l("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(l){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("el-pagination",{attrs:{"current-page":e.currentPage4,"page-sizes":[100,200,300,400],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:400},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),l("div",{staticClass:"dialog"},[l("el-dialog",{attrs:{title:e.title,visible:e.visiblity},on:{"update:visible":function(t){e.visiblity=t}}},[l("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"公告标题"}},[l("el-input",{attrs:{placeholder:"请输入停服公告标题"},model:{value:e.form.paixun,callback:function(t){e.$set(e.form,"paixun",t)},expression:"form.paixun"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"公告内容",prop:"sort"}},[l("el-input",{attrs:{type:"textarea",placeholder:"请输入公告内容"},model:{value:e.form.sort,callback:function(t){e.$set(e.form,"sort",t)},expression:"form.sort"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"公告落款"}},[l("el-input",{attrs:{placeholder:"请输入公告落款"},model:{value:e.form.paixun,callback:function(t){e.$set(e.form,"paixun",t)},expression:"form.paixun"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"通知时间"}},[l("el-input",{attrs:{placeholder:"请输入通知时间"},model:{value:e.form.paixun,callback:function(t){e.$set(e.form,"paixun",t)},expression:"form.paixun"}}),e._v(" "),l("span",[e._v("格式：2018年10月20日")])],1),e._v(" "),l("el-form-item",{attrs:{label:"时间间隔(秒)"}},[l("el-input",{attrs:{placeholder:"请输入间隔时间xx秒"},model:{value:e.form.paixun,callback:function(t){e.$set(e.form,"paixun",t)},expression:"form.paixun"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"循环",prop:"name"}},[l("el-select",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}},[l("el-option",{attrs:{label:"按时间",value:"按时间"}}),e._v(" "),l("el-option",{attrs:{label:"按日期时间",value:"按日期时间"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"开始时间",prop:"channel"}},[l("el-input",{attrs:{placeholder:"请输入播放开始时间"},model:{value:e.form.channel,callback:function(t){e.$set(e.form,"channel",t)},expression:"form.channel"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"结束时间",prop:"channel"}},[l("el-input",{attrs:{placeholder:"请输入播放结束时间"},model:{value:e.form.channel,callback:function(t){e.$set(e.form,"channel",t)},expression:"form.channel"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit(e.form)}}},[e._v("确 定")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.back(e.form)}}},[e._v("返 回")])],1)],1)],1)])},staticRenderFns:[]};var a=l("VU/8")(o,n,!1,function(e){l("f6yz")},"data-v-16fa2765",null);t.default=a.exports},f6yz:function(e,t){}});
//# sourceMappingURL=88.26342b65534eadddc51f.js.map
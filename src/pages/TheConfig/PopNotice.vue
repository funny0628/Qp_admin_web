<template>
  <div id="PopNotice-main">
    <input-area>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size='medium'>新增</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template
              v-if="['user_gold', 'money_change', 'time'].indexOf(scope.prop) >= 0">
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button :action="btn.type" v-for="(btn,index) in scope.row[scope.prop]" :key="index"
                                 @click="handeClick(btn)"
                                 style="cursor: pointer; padding-left: 5px;">
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'money_change', 'time'].indexOf(scope.prop) < 0">
              {{scope.row[scope.prop]}}
            </template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div class="dialog">
      <!-- 新增、修改 -->
      <el-dialog
        :title="dialogTitleType"
        :visible.sync="dialogVisible"
        width="30%"
        center
      >
        <el-form :model="formDate" >
          <el-form-item label="标题：" :label-width="labelWidth">
            <el-input autocomplete="off" v-model="formDate.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="开始时间：" :label-width="labelWidth">
            <el-date-picker
              v-model="formDate.begin_time"
              type="date"
              placeholder="请选择开始时间" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：" :label-width="labelWidth">
            <el-date-picker
              v-model="formDate.end_time"
              type="date"
              placeholder="请选择结束时间"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="内容：" :label-width="labelWidth">
            <el-input autocomplete="off" type="textarea" v-model="formDate.content" placeholder="请输入滚动公告内容"></el-input>
          </el-form-item>
          <el-form-item label="排序：" :label-width="labelWidth">
            <el-input autocomplete="off"  v-model="formDate.sort" placeholder="数值越小越优先"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import PermissionButton from "../../plugin/components/PermissionButton";
  import InfoTable from '../../plugin/components/InfoTable';
  import BaseIframe from '../../plugin/script/common/BaseIframe';
  import PageInfo from '../../plugin/script/common/PageInfo';
  import InputArea from "../../plugin/components/InputArea";
  import InfoTableItem from "../../plugin/components/InfoTableItem";

  export default {
    name: "PopNotice",
    extends: BaseIframe,
    components: {InfoTableItem, InputArea, PermissionButton, InfoTable},
    data() {
      return {
        tableStyle:
          [
            {label: '标题', prop: 'title', width: ''},
            {label: '内容', prop: 'content', width: ''},
            {label: '发送人', prop: 'sender', width: ''},
            {label: '发送时间', prop: 'send_time', width: ''},
            {label: '操作', prop: 'action', width: ''}
          ],
        records: [
          {
            title: '维护通知',
            content: '这边是内容',
            sender: 'admin',
            send_time: '2019-01-01 12:00:00',
            action: [{label: '修改', type: 'edit'}, {label: '删除', type: 'delete'}]
          }
        ],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        /*dialog*/
        dialogTitleType:'',
        dialogVisible:false,
        labelWidth:'90px',
        formDate:{
          title:'',
          content:'',
          begin_time:'',
          end_time:'',
          sort:''
        }
      }
    },
    methods:{
      search(){
        this.dialogTitleType = '新增弹窗公告';
        this.dialogVisible = true;
      },
      /**edit */
      handeClick(btn) {
        if (btn.type === 'edit') {
          this.dialogTitleType = '修改弹窗公告';
          this.dialogVisible = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
<!--弹窗公告-->

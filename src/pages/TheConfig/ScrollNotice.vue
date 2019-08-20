<template>
  <div id="ScrollNotice-main">
    <div class="input-area">
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size='medium'>新增</el-button>
      </permission-button>
    </div>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        <el-table-column v-for="(item,index) in tableStyle" :key="index" :prop="item.prop" :label="item.label"
                         :width="item.width"
                         align="center">
          <template slot-scope="scope">
            <template
              v-if="['user_gold', 'money_change', 'time'].indexOf(item.prop) >= 0">
              <p v-for="(label, ind) in scope.row[item.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="item.prop === 'action'">
              <permission-button :action="btn.type" v-for="(btn,index) in scope.row[item.prop]" :key="index"
                                 @click="handeClick(btn)"
                                 style="cursor: pointer; padding-left: 5px;">
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'money_change', 'time'].indexOf(item.prop) < 0">
              {{scope.row[item.prop]}}
            </template>
          </template>
        </el-table-column>
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
          <el-form-item label="播放间隔：" :label-width="labelWidth">
            <el-input autocomplete="off" v-model="formDate.interval" placeholder="播放间隔（s）"></el-input>
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

  export default {
    name: "ScrollNotice",
    extends: BaseIframe,
    components: {PermissionButton, InfoTable},
    data() {
      return {
        tableStyle:
          [
            {label: '标题', prop: 'title', width: ''},
            {label: '内容', prop: 'content', width: ''},
            {label: '排序', prop: 'sort', width: ''},
            {label: '开始时间／结束时间', prop: 'time', width: ''},
            {label: '操作', prop: 'action', width: ''}
          ],
        records: [
          {
            title:'维护通知',
            content:'这边是内容',
            sort:'1',
            time:['2019-01-01 12:00:00','2019-01-04 12:00:00'],
            action:[{label:'修改',type:'edit'},{label:'删除',type:'delete'}]
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
          interval:'',
          begin_time:'',
          end_time:'',
          sort:''
        }
      }
    },
    methods:{
      search(){
        this.dialogTitleType = '新增滚动公告';
        this.dialogVisible = true;
      },
      /**edit */
      handeClick(btn) {
        if (btn.type === 'edit') {
          this.dialogTitleType = '修改滚动公告';
          this.dialogVisible = true;
        }
      }
    }
  }
</script>

<style scoped>
  #ScrollNotice-main .bd p {
    margin: 0;
  }
</style>
<!--滚动公告-->

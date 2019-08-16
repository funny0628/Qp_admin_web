<template>
  <div id="PosterHall-main">
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
            <template v-if="['images'].indexOf(item.prop) >= 0">
              <img :src="scope.row[item.prop]" alt="" style="max-width: 80px;max-height: 30px;">
            </template>
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
              v-if="['action', 'user_gold', 'money_change', 'time','images'].indexOf(item.prop) < 0">
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
        width="50%"
      >
        <el-form :model="formDate" style="display: flex; justify-content: space-between;flex-wrap:wrap ;">
          <el-form-item label="标题" :label-width="labelWidth" style="width: 50%;">
            <el-input autocomplete="off" v-model="formDate.title"></el-input>
          </el-form-item>
          <el-form-item label="用户分层" :label-width="labelWidth" style="width: 50%;">
            <el-checkbox-group v-model="checkedCities">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="海报类型" :label-width="labelWidth" style="width: 50%;">
            <el-select v-model="formDate.posters_type" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in posters"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="动作类型" :label-width="labelWidth" style="width: 50%;">
            <el-select v-model="formDate.action_type" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in actions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传海报" :label-width="labelWidth" style="width: 50%;">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="padding-left: 5px;">只能上传jpg/png文件，且不超过500kb</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="" :label-width="labelWidth" style="width: 50%;">
          </el-form-item>
          <el-form-item label="备注" :label-width="labelWidth" style="width: 50%;">
            <el-input autocomplete="off" v-model="formDate.note" type="textarea"></el-input>
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
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    name: "PosterHall",
    extends: BaseIframe,
    components: {PermissionButton, InfoTable},
    data() {
      return {
        tableStyle:
          [
            {label: 'ID', prop: 'id', width: ''},
            {label: '标题', prop: 'title', width: ''},
            {label: '图片', prop: 'images', width: ''},
            {label: '排序', prop: 'sort', width: ''},
            {label: '状态', prop: 'status', width: ''},
            {label: '开始时间／结束时间', prop: 'time', width: ''},
            {label: '操作', prop: 'action', width: ''}
          ],
        records: [
          {
            id:'1',
            title:'活动banner',
            images:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3319449337,2452395002&fm=26&gp=0.jpg',
            sort:'1',
            status:'启用',
            time:['2019-01-01 12:00:00','2019-01-04 12:00:00'],
            action:[{label:'修改',type:'edit'},{label:'删除',type:'delete'}]
          }
        ],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        /*dialog*/
        dialogTitleType:'',
        dialogVisible:false,
        labelWidth:'100px',
        formDate:{
          title:'',
          content:'',
          posters_type:'',
          action_type:'',
          note:''
        },
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        posters:[
          {
            value: '1',
            label: '海报类型1'
          },
          {
            value: '2',
            label: '海报类型2'
          }
        ],
        actions:[
          {
            value: '1',
            label: '动作类型1'
          },
          {
            value: '2',
            label: '动作类型2'
          },
        ],
        /*uploads*/
        fileList:[],
      }
    },
    methods:{
      search(){
        this.dialogTitleType = '新增大厅海报';
        this.dialogVisible = true;
      },
      /**edit */
      handeClick(btn) {
        if (btn.type === 'edit') {
          this.dialogTitleType = '修改大厅海报';
          this.dialogVisible = true;
        }
      },
      //  uploads
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>

<style scoped>
  #PosterHall-main .bd p {
    margin: 0;
  }
</style>
<!--大厅海报-->

<template>
  <div id="Level-main">
    <input-area>
      <permission-button :action="ActionType.ADD" @click="handelAddClick()">
        <el-button type="primary" size='medium'>新增</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hidePage="true"
      >
        <el-table-column v-for="(item,index) in tableStyle" :key="index" :prop="item.prop" :label="item.label"
                         :width="item.width"
                         align="center">
          <template slot-scope="scope">
            <template
              v-if="['user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(item.prop) >= 0">
              <p v-for="(label, ind) in scope.row[item.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="item.prop === 'action'">
              <permission-button :action="btn.type" v-for="(btn,index) in scope.row[item.prop]" :key="index"
                                 @click="handleClick(btn,scope.row)"
                                 style="cursor: pointer; padding-left: 5px;">
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(item.prop) < 0">
              {{scope.row[item.prop]}}
            </template>
          </template>
        </el-table-column>
      </info-table>
    </div>
    <!-- 新增、修改 -->
    <el-dialog
      :title="dialogTitleType"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="dataForm" ref="dataForm">
        <el-form-item label="层级名称" :label-width="labelWidth" prop="hierarchy_name">
          <el-input autocomplete="off" v-model="dataForm.hierarchy_name"></el-input>
        </el-form-item>
        <el-form-item label="别名" :label-width="labelWidth" prop="alias">
          <el-input autocomplete="off" v-model="dataForm.alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLevel">确 定</el-button>
<!--        <el-button @click="reset">重置</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import PermissionButton from "../../plugin/components/PermissionButton";
  import InfoTable from '../../plugin/components/InfoTable';
  import BaseIframe from '../../plugin/script/common/BaseIframe';
  import PageInfo from '../../plugin/script/common/PageInfo';
  import TierHandler from './../../script/handlers/tierHandler';
  import InputArea from "../../plugin/components/InputArea";
  import tierHandler from './../../script/handlers/tierHandler';
  import storage from './../../script/storage/storage'

  export default {
    name: "Level",
    extends: BaseIframe,
    components: {InputArea, PermissionButton, InfoTable},
    data() {
      return {
        //表格数据
        tableStyle:
          [
            {label: '层级ID', prop: 'tier', width: ''},
            {label: '层级名称', prop: 'tier_name', width: ''},
            {label: '别名', prop: 'tier_alias', width: ''},
            {label: '操作', prop: 'action', width: ''},
          ],
        records: [],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        //新增、编辑数据
        dialogTitleType: '',
        dialogVisible: false,
        labelWidth: '70px',
        dataForm: {
          tier: '', //id
          hierarchy_name: '', //层级名称
          alias: '', //别名
        },
      }
    },
    methods: {
      search() {
      },
      //新增代理层
      handelAddClick() {
        this.dataForm.tier ='';
        this.dataForm.hierarchy_name ='';
        this.dataForm.alias = '';
        this.dialogTitleType = '新增代理分层';
        this.dialogVisible = true;
      },
      //修改代理层
      handleClick(btn, row) {
        if (btn.type === 'edit') {
          this.dialogTitleType = '修改代理分层';
          this.dialogVisible = true;
          this.dataForm.hierarchy_name = row.tier_name;
          this.dataForm.alias = row.tier_alias;
          this.dataForm.tier = row.tier;
        }
      },
      //代理层级
      getList() {
        tierHandler.list().promise.then(res => {
          // console.log(res);
          if (Number(res.code) === 200) {
            // cache = res.data;
            this.records = res.data;
            storage.set('list',this.records)
          }
          //数据处理
          this.records.map((item) => {
            item.action = [
              {label: '修改', type: 'edit'}
            ]
          })
        })
      },
      //增加代理分层
      addLevel() {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            if (!this.dataForm.tier){
              let data = {
                "tier_name": this.dataForm.hierarchy_name,
                "tier_alias": this.dataForm.alias
              };
              tierHandler.add(data).promise.then(res => {
                // console.log(res)
                if (Number(res.code) === 200) {
                  this.$message.success(res.msg)
                }
                this.dialogVisible = false;
                this.getList();
                this.$refs["dataForm"].resetFields();// 失效
              }).catch(e => {
                // 打印一下错误
                console.log(e)
              })
            } else{
              //修改代理分层
              let data = {
                "tier": this.dataForm.tier,
                "tier_name": this.dataForm.hierarchy_name,
                "tier_alias": this.dataForm.alias
              };
              // console.log(data);
              tierHandler.set(data).promise.then(res => {
                if (Number(res.code) === 200) {
                  this.$message.success(res.msg)
                }
                this.dialogVisible = false;
                this.$refs["dataForm"].resetFields();// 失效
                this.getList();
              }).catch(e => {
                console.log(e);
              })
            }
          }
        })
      },
      // reset(){
      //   this.$refs["dataForm"].resetFields();// 失效
      // }
    },
    mounted() {
      this.getList()
    },
    watch: {}
  };
</script>

<style scoped>

</style>

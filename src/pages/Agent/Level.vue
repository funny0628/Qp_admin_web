<template>
  <div id="Level-main">
    <div class="input-area">
      <permission-button :action="ActionType.ADD" @click="handelAddClick()">
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
              v-if="['user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(item.prop) >= 0">
              <p v-for="(label, ind) in scope.row[item.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="item.prop === 'action'">
              <permission-button :action="btn.type" v-for="(btn,index) in scope.row[item.prop]" :key="index"
                                 @click="handeClick(btn,scope.row)"
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
      <el-form :model="user_layer" >
        <el-form-item label="层级名称" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="user_layer.hierarchy_name"></el-input>
        </el-form-item>
        <el-form-item label="别名" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="user_layer.alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLevel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import PermissionButton from "../../plugin/components/PermissionButton";
  import InfoTable from '../../plugin/components/InfoTable';
  import BaseIframe from '../../plugin/script/common/BaseIframe';
  import PageInfo from '../../plugin/script/common/PageInfo';
  import tierHandler from './../../script/handlers/tierHandler'
  export default {
    name: "Level",
    extends: BaseIframe,
    components: {PermissionButton, InfoTable},
    data() {
      return {
        /**table */
        tableStyle:
          [
            {label: '层级ID', prop: 'tier', width: ''},
            {label: '层级名称', prop: 'tier_name', width: ''},
            {label: '别名', prop: 'tier_alias', width: ''},
            {label: '操作', prop: 'action', width: ''},
          ],
        records: [],
        /**{
              tier: '1',
              tier_name: '第一级代理',
              tier_alias: '董事长',
              action: [{label: '修改', type: 'edit'}]
            }*/
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        /*type 判断现在是添加还是修改*/
        dialogTitleType: '',
        /*dialog */
        dialogVisible: false,
        labelWidth: '70px',
        user_layer: {
          tier:'',
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
        this.dialogTitleType = '新增代理分层';
        this.dialogVisible = true;
      },
      //修改代理层
      handeClick(btn,row) {
        if (btn.type === 'edit') {
          this.dialogTitleType = '修改代理分层';
          this.dialogVisible = true;
          this.user_layer.hierarchy_name = row.tier_name;
          this.user_layer.alias = row.tier_alias;
          this.user_layer.tier = row.tier;
        }
      },
      //代理层级
      getList(){
        tierHandler.list().promise.then(res=>{
          console.log(res);
          if(Number(res.code) === 200){
            // cache = res.data;
            this.records = res.data;
          }
          //数据处理
          this.records.map((item)=>{
            item.action = [
              {label: '修改', type: 'edit'}
            ]
          })
        })
      },
      //增加代理分层
      addLevel(){
        if(!this.user_layer.tier){
          let data = {
            "tier_name": this.user_layer.hierarchy_name,
            "tier_alias": this.user_layer.alias
          };
          tierHandler.add(data).promise.then(res=>{
            // console.log(res)
            if(Number(res.code) === 200){
              this.$message.success(res.msg)
            }
          });
          this.dialogVisible = false;
          this.user_layer.hierarchy_name = '';
          this.user_layer.alias = '';
          this.getList();
        }else{
          let data = {
            "tier": this.user_layer.tier,
            "tier_name": this.user_layer.hierarchy_name,
            "tier_alias": this.user_layer.alias
          };
          console.log(data);
          tierHandler.set(data).promise.then(res=>{
            if(Number(res.code) === 200){
              this.$message.success(res.msg)
            }
            this.dialogVisible = false;
            this.user_layer.alias = '';
            this.getList();
          })
        }
      }
    },
    mounted() {
      this.getList()
    },
    watch:{

    }
  };
</script>

<style scoped>

</style>

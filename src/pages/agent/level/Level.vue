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
                                 @click="handeClick(btn)"
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import PermissionButton from "../../../plugin/components/PermissionButton";
  import InfoTable from '../../../plugin/components/InfoTable';
  import BaseIframe from '../../../plugin/script/common/BaseIframe';
  import PageInfo from '../../../plugin/script/common/PageInfo';
  export default {
    name: "Level",
    extends: BaseIframe,
    components: {PermissionButton, InfoTable},
    data() {
      return {
        /**table */
        tableStyle:
          [
            {label: '代理层级', prop: 'level', width: ''},
            {label: '最小业绩', prop: 'min_results', width: ''},
            {label: '最大业绩', prop: 'max_results', width: ''},
            {label: '返佣比例（%）', prop: 'commission_col', width: ''},
            {label: '操作', prop: 'action', width: ''},
          ],
        records:
          [
            {
              level: '第一级代理',
              min_results: '0',
              max_results: '10000',
              commission_col: '0.2',
              action: [{label: '修改', type: 'edit'}]
            }
          ],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        /***type 判断现在是添加还是修改*/
        dialogTitleType: '',
        /***dialog */
        dialogVisible: false,
        labelWidth: '70px',
        user_layer: {
          hierarchy_name: '', //层级名称
          alias: '', //别名
        },
      }
    },
    methods: {
      search() {
      },
      handelAddClick() {
        this.dialogTitleType = '新增代理分层';
        this.dialogVisible = true;
      },
      /**edit */
      handeClick(btn) {
        if (btn.type === 'edit') {
          this.dialogTitleType = '修改代理分层';
          this.dialogVisible = true;

        }
      }
    }
  };
</script>

<style scoped>

</style>

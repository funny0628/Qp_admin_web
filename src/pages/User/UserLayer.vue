<template>
  <div id="UserLayer-main">
    <div class="input-area">
      <permission-button :action="ActionType.ADD" @click="handelAddClick()">
        <el-button type="primary" size='medium'>添加条件</el-button>
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
        <el-form-item label="充值金额" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="user_layer.up_amount"></el-input>
        </el-form-item>
        <el-form-item label="充值笔数" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="user_layer.up_number"></el-input>
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
  import PermissionButton from "../../plugin/components/PermissionButton";
  import InfoTable from '../../plugin/components/InfoTable';
  import BaseIframe from '../../plugin/script/common/BaseIframe';
  import PageInfo from '../../plugin/script/common/PageInfo';

  export default {
    name: "UserLayer",
    extends: BaseIframe,
    components: {PermissionButton, InfoTable},
    data() {
      return {
        /**table */
        tableStyle:
          [
            {label: '层级ID', prop: 'hierarchy_id', width: ''},
            {label: '层级名称', prop: 'hierarchy_name', width: ''},
            {label: '充值金额', prop: 'up_amount', width: ''},
            {label: '充值笔数', prop: 'up_number', width: ''},
            {label: '操作', prop: 'action', width: ''},
          ],
        records:
          [
            {
              hierarchy_id: '1',
              hierarchy_name: 'VIP0',
              up_amount: '0',
              up_number: '0',
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
          up_amount: '', //充值金额
          up_number: '', //充值笔数
        },
      }
    },
    methods: {
      search() {
      },
      handelAddClick() {
        this.dialogTitleType = '新增用户分层';
        this.dialogVisible = true;
      },
      /**edit */
      handeClick(btn) {
        if (btn.type === 'edit') {
          this.dialogTitleType = '修改用户分层';
          this.dialogVisible = true;

        }
      }
    }
  };
</script>

<style scoped>
  /*@import "./../../../assets/styles/common.css";*/
</style>

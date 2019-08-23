<template>
  <div id="Bank-main">
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
      >
        <el-table-column v-for="(item,index) in tableStyle" :key="index" :prop="item.prop" :label="item.label"
                         :width="item.width"
                         align="center">
          <template slot-scope="scope">
            <template v-if="['bank_logo'].indexOf(item.prop) >= 0">
              <img :src="scope.row[item.prop]" alt="" style="max-width: 80px;max-height: 30px;">
            </template>
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
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','registration_time','bank_logo'].indexOf(item.prop) < 0">
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
      <el-form :model="change_bank" >
        <el-form-item label="银行ID" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="change_bank.bank_id"></el-input>
        </el-form-item>
        <el-form-item label="银行缩写" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="change_bank.bank_abbr"></el-input>
        </el-form-item>
        <el-form-item label="银行名称" :label-width="labelWidth">
          <el-input autocomplete="off" v-model="change_bank.bank_name"></el-input>
        </el-form-item>
        <el-form-item label="银行logo" :label-width="labelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="change_bank.bank_logo"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="change_bank.delivery"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
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
  import InputArea from "../../plugin/components/InputArea";
  export default {
    name: "Bank",
    extends: BaseIframe,
    components: {InputArea, PermissionButton, InfoTable},
    data() {
      return {
        /**table */
        tableStyle:
          [
            {label: '银行ID', prop: 'bank_id', width: ''},
            {label: '银行缩写', prop: 'bank_abbr', width: ''},
            {label: '银行名称', prop: 'bank_name', width: ''},
            {label: '银行logo', prop: 'bank_logo', width: ''},
            {label: '操作', prop: 'action', width: ''},
          ],
        records:
          [
            {
              bank_id: '1',
              bank_abbr: 'CMB',
              bank_name: '招商银行',
              bank_logo: 'https://www.baidu.com/img/bd_logo1.png',
              action: [{label: '修改', type: 'edit'},{label:'删除', type :'delete'}]
            }
          ],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        /***type 判断现在是添加还是修改*/
        dialogTitleType: '',
        /***dialog */
        dialogVisible: false,
        labelWidth: '70px',
        change_bank: {
          bank_id: '',
          bank_abbr: '',
          bank_logo:[],
          delivery:false,
        },
      }
    },
    methods: {
      search() {
      },
      handelAddClick() {
        this.dialogTitleType = '新增银行';
        this.dialogVisible = true;
      },
      /**edit */
      handeClick(btn) {
        if (btn.type === 'edit') {
          this.dialogTitleType = '修改银行';
          this.dialogVisible = true;

        }
      },
      /** 处理图片**/
      handleRemove(file, bank_logo) {
        console.log(file, bank_logo);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  };
</script>

<style scoped>

</style>

<template>
  <div id="BankAccount-main">
    <input-area>
      <el-input v-model="format.channel_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-input v-model="format.payee" placeholder="收款人" size="medium"></el-input>
      <permission-button :action="ActionType.READ" @click="handelReadClick()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="handelAddClick()" style="float: right;">
        <el-button type="primary" size="medium">新增</el-button>
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
              v-if="['user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(scope.prop) >= 0"
            >
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handeClick(btn)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!-- 弹框 -->
    <div class="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
        <el-form
          :v-model="formData"
          style="display: flex; justify-content: space-between;flex-wrap:wrap ;"
        >
          <el-form-item label="银行名称" :label-width="labelWidth" style="width: 50%;">
            <el-input v-model="formData.bank_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="labelWidth" style="width: 50%;">
            <el-switch v-model="formData.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="收款账号" :label-width="labelWidth" style="width: 50%;">
            <el-input v-model="formData.payment" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="二维码收款" :label-width="labelWidth" style="width: 50%;">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="formData.fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="收款姓名" :label-width="labelWidth" style="width: 50%;">
            <el-input v-model="formData.collection_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户分层" :label-width="labelWidth" style="width: 50%;">
            <el-checkbox-group
              v-model="formData.user_layer"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="开户行" :label-width="labelWidth" style="width: 50%;">
            <el-input v-model="formData.open_account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预设金额" :label-width="labelWidth" style="width: 50%;">
            <el-input v-model="formData.preset_money" autocomplete="off"></el-input>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              style="cursor: pointer;"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item>
          <el-form-item label="单笔最小额度" :label-width="labelWidth" style="width: 50%;">
            <el-input v-model="formData.min_account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单笔最大额度" :label-width="labelWidth" style="width: 50%;">
            <el-input v-model="formData.max_account" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PageInfo from "../../plugin/script/common/PageInfo";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

const cityOptions = ["vip1", "vip2", "vip3", "vip4", "vip5", "vip6"];
export default {
  name: "BankAccount",
  extends: BaseIframe,
  components: { InputArea, PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      format: {
        channel_id: "", //渠道id
        payee: "" //收款人
      },
      /**table */
      tableStyle: [
        { label: "渠道ID", prop: "channel_id", width: "" },
        { label: "银行账号ID", prop: "account_id", width: "" },
        { label: "银行名称", prop: "bank_name", width: "" },
        { label: "收款人", prop: "payee", width: "" },
        { label: "收款账号", prop: "payment", width: "" },
        { label: "开户行", prop: "open_account", width: "" },
        { label: "单笔最小额度", prop: "min_account", width: "" },
        { label: "单笔最大额度", prop: "max_account", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "备注说明", prop: "note", width: "" },
        { label: "添加时间", prop: "add_time", width: "160" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          channel_id: "01",
          account_id: "1",
          bank_name: "招商银行",
          payee: "王毅",
          payment: "5673891625868",
          open_account: "北京支行",
          min_account: "100",
          max_account: "100000",
          status: "启用",
          note: "",
          add_time: "2019-01-01 12:00:00",
          action: [
            { label: "修改", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      /* dialog */
      dialogTitle: "",
      labelWidth: "120px",
      dialogVisible: false,
      formData: {
        bank_name: "",
        delivery: false,
        payment: "",
        fileList: [], //图片list
        collection_name: "",
        user_layer: ["vip1"],
        open_account: "",
        preset_money: "",
        min_account: "",
        max_account: ""
      },
      cities: cityOptions,
      dynamicTags: ["100元", "200元"], //标签选择
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    search() {},
    /***查询 */
    handelReadClick() {},
    /***添加 */
    handelAddClick() {
      this.dialogTitle = "新增银行收款账号";
      this.dialogVisible = true;
    },
    /***修改、删除 */
    handeClick(btn) {
      if (btn.type === "edit") {
        this.dialogTitle = "修改银行收款账号";
        this.dialogVisible = true;
      }
      if (btn.type === "delete") {
      }
    },
    /***上传图片 */
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    /*** 标签选择*/
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    /** handleCheckedCitiesChange*/
    handleCheckedCitiesChange() {}
  }
};
</script>

<style scoped>
</style>

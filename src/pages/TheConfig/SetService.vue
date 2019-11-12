<!--客服设置-->
<template>
  <div id="SetService-main">
    <input-area>
      <permission-button :action="ActionType.READ" @click="search()">
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
            <template v-if="['user_gold', 'money_change', 'time'].indexOf(scope.prop) >= 0">
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
              v-if="['action', 'user_gold', 'money_change', 'time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div class="dialog">
      <!-- 新增、修改 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" center>
        <el-form
          :model="formDate"
          style="display: flex; justify-content: space-between;flex-wrap:wrap ;"
        >
          <el-form-item label="标题" :label-width="labelWidth" style="width: 45%;">
            <el-input autocomplete="off" v-model="formDate.title"></el-input>
          </el-form-item>
          <el-form-item label="用户分层" :label-width="labelWidth" style="width: 45%;">
            <el-checkbox-group v-model="checkedCities">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="海报类型" :label-width="labelWidth" style="width: 45%;">
            <el-select v-model="formDate.posters_type" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in posters"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="动作类型" :label-width="labelWidth" style="width: 45%;">
            <el-select v-model="formDate.action_type" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in actions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传海报" :label-width="labelWidth" style="width: 100%;">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注" :label-width="labelWidth" style="width: 60%;">
            <el-input autocomplete="off" v-model="formDate.note" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" center>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import PageInfo from "../../plugin/script/common/PageInfo";
import InputArea from "../../plugin/components/InputArea";

const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  name: "SetService",
  extends: BaseIframe,
  components: { InputArea, PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      tableStyle: [
        { label: "ID", prop: "id", width: "" },
        { label: "客服名称", prop: "service_name", width: "" },
        { label: "微信号", prop: "wechat", width: "" },
        { label: "QQ号", prop: "qq", width: "" },
        { label: "第三方客服", prop: "third_service", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          id: "1",
          service_name: "客服1",
          wechat: "-",
          qq: "10086",
          third_service: "-",
          action: [
            { label: "修改", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      dialogTitle: "",
      dialogVisible: false,
      labelWidth: "100px",
      formDate: {
        title: "",
        content: "",
        posters_type: "",
        action_type: "",
        note: ""
      },
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      posters: [
        {
          value: "1",
          label: "海报类型1"
        },
        {
          value: "2",
          label: "海报类型2"
        }
      ],
      actions: [
        {
          value: "1",
          label: "动作类型1"
        },
        {
          value: "2",
          label: "动作类型2"
        }
      ],
    };
  },
  methods: {
    search() {
      this.dialogTitle = "新增客服";
      this.dialogVisible = true;
    },
    /**修改 */
    handeClick(btn) {
      if (btn.type === "edit") {
        this.dialogTitle = "修改客服";
        this.dialogVisible = true;
      }
    },
    /**图片上传*/
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
#SetService-main .bd p {
  margin: 0;
}
</style>

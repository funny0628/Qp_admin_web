<template>
  <div id="modifySupAgent-main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-input v-model="format.channel_id" placeholder="修改前渠道id" size="medium" clearable></el-input>
      <el-input v-model="format.operate_id" placeholder="请输入操作者ID" size="medium" clearable></el-input>
      <el-date-picker
        v-model="format.Registration_time"
        value-format="yyyy-MM-dd"
        align="right"
        type="date"
        size="medium"
        clearable
        placeholder="请输入注册时间"
        :picker-options="pickerOptions"
        style="width: 180px"
      ></el-date-picker>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="addUser()">
        <el-button type="primary" size="medium">修改上级</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="tabeData"
        :page-info="pageInfo"
      >
        item.state = 'input/disabled'
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop=='user_id'">
              <span @click="handelAgent(scope.row)" class="platformchoice">{{scope.row[scope.prop]}}</span>
            </template>
            <template
              v-if="['action','status','user_id'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div>
      <!-- 修改上级 -->
      <el-dialog title="修改上级" :visible.sync="dialogAddVisible" width="30%" center>
        <el-form :model="form" ref="form">
          <el-form-item
            label="渠道号"
            label-width="200px"
            style="display: inline-block;"
          >
            <el-input
              v-model="form.channel_id"
              autocomplete="off"
              style="width: 200px;"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="用户ID"
            label-width="200px"
            style="display: inline-block;"
          >
            <el-input v-model="form.user_id" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item
            label="上级渠道"
            label-width="200px"
            style="display: inline-block;"
          >
            <el-input
              v-model="form.sup_channel"
              autocomplete="off"
              style="width: 200px;"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="上级ID"
            label-width="200px"
            style="display: inline-block;"
          >
            <el-input
              v-model="form.sup_id"
              autocomplete="off"
              style="width: 200px;"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="修改备注"
            label-width="200px"
            style="display: inline-block;"
          >
            <el-input type="textarea" row="2" v-model="form.remark" style="width: 200px;">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SelectTime from "../../plugin/components/SelectTime";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import UserHandler from "../../script/handlers/UserHandler";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "modifySupAgent",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  data() {
    /*校验手机号*/
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        if (/^[1][345789]\d{9}$/.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      labelPosition: "left", //左对齐
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: "",
        user_id: "",
        channel_id: "",
        operate_id: "",
        Registration_time: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      tableStyle: [
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "修改前的上级", prop: "modify_before_sup", width: "" },
        { label: "修改后的上级", prop: "modify_after_sup", width: "" },
        { label: "修改前的渠道号", prop: "modify_before_channel", width: "" },
        { label: "修改后的渠道号", prop: "modify_after_channel", width: "" },
        { label: "操作者ID", prop: "operation_id", width: "" },
        { label: "操作时间", prop: "operation_time", width: "" },
        { label: "修改说明", prop: "modify_state", width: "" }
      ],
      tabeData: [
        {
          user_id: "1001001",
          modify_before_sup: "玛丽莲",
          modify_after_sup: "陆律师",
          modify_before_channel: "10201",
          modify_after_channel: "20109",
          operation_id: "1001",
          operation_time: "2019-10-10 13:00:00",
          modify_state: "上级转移"
        },
        {
          user_id: "1001002",
          modify_before_sup: "梦露",
          modify_after_sup: "俊才",
          modify_before_channel: "10201",
          modify_after_channel: "20109",
          operation_id: "1001",
          operation_time: "2019-10-12 15:00:00",
          modify_state: "手动入款"
        },
        {
          user_id: "1001002",
          modify_before_sup: "梦露",
          modify_after_sup: "俊才",
          modify_before_channel: "10201",
          modify_after_channel: "20109",
          operation_id: "1001",
          operation_time: "2019-10-12 15:00:00",
          modify_state: "手动入款"
        },
        {
          user_id: "1001002",
          modify_before_sup: "梦露",
          modify_after_sup: "俊才",
          modify_before_channel: "10201",
          modify_after_channel: "20109",
          operation_id: "1001",
          operation_time: "2019-10-12 15:00:00",
          modify_state: "手动入款"
        },
        {
          user_id: "1001002",
          modify_before_sup: "梦露",
          modify_after_sup: "俊才",
          modify_before_channel: "10201",
          modify_after_channel: "20109",
          operation_id: "1001",
          operation_time: "2019-10-12 15:00:00",
          modify_state: "手动入款"
        },
        {
          user_id: "1001002",
          modify_before_sup: "梦露",
          modify_after_sup: "俊才",
          modify_before_channel: "10201",
          modify_after_channel: "20109",
          operation_id: "1001",
          operation_time: "2019-10-12 15:00:00",
          modify_state: "手动入款"
        }
      ],
      records: [],
      pageInfo: new PageInfo(1, [5, 10, 15], 6),
      dialogAddVisible: false,
      form: {
        channel_id: "",
        user_id: "",
        sup_channel: "",
        sup_id: "",
        remark: ""
      },
    };
  },
  methods: {
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    handelAgent(row) {

    },
    /** 添加会员 */
    addUser() {
      this.dialogAddVisible = true;
    }
  },
  mounted() {
    // this.getUserPlatform()
  }
};
</script>

<style scoped>
#modifySupAgent-main .bd {
  padding-left: 20px;
  padding-right: 20px;
}
#modifySupAgent-main .bd p {
  margin: 0;
}

.platformchoice {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
.bankCard {
  width: 100%;
}

.itemClass {
  width: 45%;
}
</style>

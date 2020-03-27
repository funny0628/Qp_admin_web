<template>
  <div id="HallAdvertiseConf-main">
    <el-button type="danger" style="margin-top: 10px;margin-bottom: 10px;margin-left:20px;">删除</el-button>
    <el-button
      type="primary"
      @click="dialogFormVisible=true"
      style="margin-top: 10px;margin-bottom: 10px;"
    >添加</el-button>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="tableData"
        :page-info="pageInfo"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handelClick(btn,scope.row)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','status','user_id'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!--添加新渠道 -->
    <el-dialog title="添加新渠道" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="渠道名" :label-width="formLabelWidth">
          <el-input v-model="form.channel_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="KEY" :label-width="formLabelWidth">
          <el-input v-model="form.channel_key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文字一" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            show-word-limit
            clearable
            maxlength="30"
            :autosize="{minRows:1,maxRows:3}"
            resize="none"
            placeholder="请输入内容;最多只能写30个字;最多三行!"
            v-model="form.word1"
          ></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文字一类型" :label-width="formLabelWidth">
              <el-select v-model="form.word1_type" placeholder="请选择文字一类型">
                <el-option label="普通" value="general"></el-option>
                <el-option label="复制" value="copy"></el-option>
                <el-option label="跳转网页" value="jump_webpage"></el-option>
                <el-option label="跳转" value="jump"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.word1_type!=='jump'" label="URL" :label-width="formLabelWidth">
              <el-input v-model="form.word1_url" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-else label="跳转位置" :label-width="formLabelWidth">
              <el-select v-model="form.jump_position" placeholder="请选择">
                <el-option
                  v-for="(item,index) in jumpposOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文字二" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.name"
            :autosize="{minRows:1,maxRows:3}"
            resize="none"
            maxlength="30"
            placeholder="请输入内容;最多只能写30个字;最多三行!"
          ></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文字二类型" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="普通" value="shanghai"></el-option>
                <el-option label="一般" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="URL" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文字三" :label-width="formLabelWidth">
          <el-input type="textarea" maxlength="30" placeholder="请输入内容;最多只能写30个字;最多三行!"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文字三类型" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="普通" value="shanghai"></el-option>
                <el-option label="一般" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="URL" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <!-- 添加宣传页 -->
      <el-dialog title="添加宣传页" :visible.sync="dialogVisible" width="40%" center>
        <el-form :model="form2">
          <el-form-item>
            <table style="width: 80%;" cellspacing="0" cellpadding="10" border="1">
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">选择渠道</td>
                <td style="text-align: center">
                  <el-select v-model="form.region" placeholder="请选择渠道">
                    <el-option label="渠道一" value></el-option>
                    <el-option label="渠道二" value></el-option>
                  </el-select>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <table
              border="1"
              style="border-color: #c0c4cc;width: 80%;"
              cellspacing="0"
              cellpadding="10"
            >
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">上传内容1</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">海报类型</td>
                <td style="text-align: center">轮播海报</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">选择动作类型</td>
                <td style="text-align: center">跳转</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">跳转地址</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <table
              border="1"
              style="border-color: #c0c4cc;width: 80%;"
              cellspacing="0"
              cellpadding="10"
            >
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">上传内容2</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">海报类型</td>
                <td style="text-align: center">轮播海报</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">选择动作类型</td>
                <td style="text-align: center">复制</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">复制内容</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <table
              border="1"
              style="border-color: #c0c4cc;width: 80%;"
              cellspacing="0"
              cellpadding="10"
            >
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">上传内容3</td>
                <td style="text-align: center">
                  <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">海报类型</td>
                <td style="text-align: center">轮播海报</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">选择动作类型</td>
                <td style="text-align: center">加入游戏</td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;background-color:#f2f2f2;">选择游戏</td>
                <td style="text-align: center">
                  <el-select v-model="form.region" placeholder="请选择游戏类型">
                    <el-option label="游戏一" value></el-option>
                    <el-option label="游戏二" value></el-option>
                    <el-option label="游戏三" value></el-option>
                  </el-select>
                </td>
              </tr>
            </table>
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
import SelectTime from "../../plugin/components/SelectTime";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import UserHandler from "../../script/handlers/UserHandler";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";
export default {
  name: "HallAdvertiseConf",
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
      pageNum: 1,
      pageSize: 5,
      total: 0,
      formLabelWidth: "120px",
      value: true,
      dialogModifyVisible: false,
      dialogVisible: false,
      labelPosition: "left", //左对齐
      activeName: "first",
      tableStyle: [
        { label: "渠道名称", prop: "channel_name", width: "" },
        { label: "KEY", prop: "channel_name", width: "" },
        { label: "文字一", prop: "content", width: "" },
        { label: "文字二", prop: "content", width: "" },
        { label: "文字三", prop: "content", width: "" },
        { label: "操作时间", prop: "create_time", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      tableData: [
        {
          channel_id: "10012",
          channel_name: "主包",
          content: "",
          status: "启用",
          create_time: "2020-01-01 12:00:00",
          action: [
            { label: "编辑", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        },
        {
          channel_id: "10012",
          channel_name: "主包",
          content: "",
          status: "启用",
          create_time: "2020-01-01 12:00:00",
          action: [
            { label: "编辑", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        },
        {
          channel_id: "10012",
          channel_name: "主包",
          content: "",
          status: "启用",
          create_time: "2020-01-01 12:00:00",
          action: [
            { label: "编辑", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        }
      ],
      records: [],
      pageInfo: new PageInfo(1, [5, 10, 15, 20], 6),
      dialogFormVisible: false,
      jumpposOpts: [
        { label: "vip", value: "vip" },
        { label: "全民代理", value: "agent" },
        { label: "客服", value: "server" },
        { label: "兑换", value: "exchange" },
        { label: "充值", value: "recharge" },
        { label: "活动", value: "active" },
        { label: "绑定手机", value: "bind_phone" },
        { label: "返水", value: "return" },
        { label: "vip福利", value: "vip_reward" },
        { label: "签到", value: "attendance" }
      ],
      form: {
        channel_name: "",
        channel_key: "",
        word1: "",
        word1_type: "general",
        word1_url: "",
        jump_position: "",
        name: "",
        region: ""
      },
      form2: {
        name: ""
      },
      formLabelWidth: "100px",
      fileList: []
    };
  },
  methods: {
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    handelClick() {
      this.dialogModifyVisible = true;
    },
    pageNumFn(val) {
      console.log(val, this.pageSize, this.pageNum);
      this.pageNum = val;
    },
    pageSizeFn(val) {
      console.log(val);
      this.pageSize = val;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  watch: {
    "form.word1_type": function(newVal, oldVal) {
      console.log(newVal);
      if (newVal === "copy" || "jump_webpage" && newVal !== "general") {
        this.$nextTick(() => {
          this.form.word1_url = this.form.word1;
        });
      } else {
        this.$nextTick(() => {
          this.form.word1_url = "";
        });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
#HallAdvertiseConf-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#HallAdvertiseConf-main .bd p {
  margin: 0;
}
#addPoster,
#addPoster tr td {
  border: none;
}
.platformchoice {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
table {
  border-collapse: collapse;
  margin: 0 auto;
}
table,
table tr td {
  border: 1px solid #c0c4cc;
}
.bankCard {
  width: 100%;
}

.itemClass {
  width: 45%;
}
</style>

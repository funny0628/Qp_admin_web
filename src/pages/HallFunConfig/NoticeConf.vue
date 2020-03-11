<template>
  <div id="NoticeConf-main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="dialogFormVisible=true">新增</el-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        item.state = 'input/disabled'
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
    <div>
      <!-- 新增公告 -->
      <el-dialog title="新增公告" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-form-item>
            <table style="width: 80%;" cellspacing="0" cellpadding="10">
              <tr>
                <td style="width: 150px;text-align: center">公告标题</td>
                <td style="text-align: center">
                  <el-input v-model="form.notice_title" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">公告类型</td>
                <td style="text-align: center">
                  <el-select v-model="form.notice_type" placeholder="请选择公告类型">
                    <el-option label="文字公告" value></el-option>
                    <el-option label="图片公告" value></el-option>
                    <el-option label="游戏公告" value></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">公告时间</td>
                <td style="text-align: center">
                  <el-input v-model="form.notice_time" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">公告内容</td>
                <td style="text-align: center">
                  <quill-editor
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                  ></quill-editor>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">排序</td>
                <td style="text-align: center">
                  <el-input v-model="form.notice_time" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center">状态</td>
                <td style="text-align: center">
                  <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </td>
              </tr>
            </table>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
  name: "NoticeConf",
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
      value: true,
      player_id: "", // 玩家id
      labelPosition: "left", //左对齐
      dialogFormVisible: false,
      platforms: [
        { value: 1, label: "平台1" },
        { value: 2, label: "平台2" }
      ],
      format: {
        platform: ""
      },
      fun_1_list: [
        { value: 1, label: "彩金客服" },
        { value: 2, label: "分享彩金" },
        { value: 3, label: "活动公告" },
        { value: 4, label: "推广中心" },
        { value: 5, label: "未设定" }
      ],
      tableStyle: [
        { label: "公告标题", prop: "notice_title", width: "" },
        { label: "开始时间", prop: "start_time", width: "" },
        { label: "结束时间", prop: "end_time", width: "" },
        { label: "公告类型", prop: "notice_type", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "排序", prop: "sort", width: "" },
        { label: "创建时间", prop: "create_time", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          notice_title: "新活动通知",
          start_time: "2020-01-01 12:00:00",
          end_time: "2020-01-01 14:00:00",
          notice_type: "文字公告",
          status: "启用",
          sort: "2",
          create_time: "2020-01-01 12:00:00",
          action: [
            { label: "修改", type: "edit" },
            { label: "禁用", type: "ban" },
            { label: "删除", type: "delete" }
          ]
        },
        {
          notice_title: "新活动通知",
          start_time: "2020-01-01 12:00:00",
          end_time: "2020-01-01 14:00:00",
          notice_type: "文字公告",
          status: "启用",
          sort: "2",
          create_time: "2020-01-01 12:00:00",
          action: [
            { label: "修改", type: "edit" },
            { label: "禁用", type: "ban" },
            { label: "删除", type: "delete" }
          ]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        notice_type: "",
        notice_title: "",
        notice_time: ""
      }
    };
  },
  methods: {
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    /** 添加会员 */
    addUser() {
      this.dialogAddVisible = true;
    },
    handelClick(btn,row) {
      if(btn.type === 'edit') {
        this.dialogFormVisible = true
      }
    },
    /**获取用户列表接口 */
    userList(data, user_id) {
      UserHandler.list(data, user_id).promise.then(res => {
        if (Number(res.code) === 200) {
          this.records = res.data.list;
          /**数据处理*/
          let goldArr = [];
          let top_up_amount = "";
          let change_amount = "";
          let alipay_account = [];
          let personArr = [];
          this.records.map(item => {
            goldArr.push("总金额：" + item.money);
            goldArr.push("理财：" + item.fanancial);
            top_up_amount = item.pay_sum + "/" + item.pay_count;
            change_amount = item.draw_sum + "/" + item.draw_count;
            if (item.bank_info.length > 0) {
              item.bank_info.map(bank => {
                if (Number(bank.bank_id) !== 1) {
                  /** 支付宝 **/
                  personArr.push("开户人：" + bank.bank_user);
                  personArr.push("卡号：" + bank.bank_card);
                  personArr.push("开户行：" + bank.subbranch);
                } else {
                  alipay_account.push("账号：" + bank.bank_card);
                  alipay_account.push("名称：" + bank.bank_name);
                }
              });
            }
            item.action = [
              {
                label: "修改",
                type: "edit"
              },
              {
                label: "冻结",
                type: "freeze"
              },
              {
                label: "强制下线",
                type: "light"
              }
            ];
            item.user_gold = goldArr;
            item.top_up_amount = top_up_amount;
            item.change_amount = change_amount;
            item.alipay_account = alipay_account;
            item.account_person = personArr;
          });
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
#NoticeConf-main .bd {
  padding-left: 20px;
}
#NoticeConf-main .bd p {
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
table {
  border-collapse: collapse;
}
table,
table tr td {
  border: 1px solid #c0c4cc;
}
.itemClass {
  width: 45%;
}
</style>

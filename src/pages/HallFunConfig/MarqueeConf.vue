<template>
  <div id="MarqueeConf-main">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="dialogFormVisible=true">新增滚动公告</el-button>
      <el-button type="primary" @click="dialogVisible=true">新增跑马灯</el-button>
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
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  == 1">启用</span>
              <span v-else>冻结</span>
            </template>
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
      <!-- 新增滚动公告 -->
      <el-dialog title="新增滚动公告" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="form">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="请输入标题"
              style="width: 218px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="播放间隔" :label-width="formLabelWidth">
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="播放间隔(s)"
              style="width: 218px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="开始时间" :label-width="formLabelWidth">
            <el-date-picker v-model="value1" type="datetime" placeholder="选择开始时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" :label-width="formLabelWidth">
            <el-date-picker v-model="value2" type="datetime" placeholder="选择结束时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              row="3"
              v-model="form.name"
              autocomplete="off"
              placeholder="请输入滚动公告内容"
              style="width: 218px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" style="width: 218px;">
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="数值越小越优先"
              style="width: 218px;"
            ></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增跑马灯 -->
      <el-dialog title="收货地址" :visible.sync="dialogVisible" width="30%" center>
        <el-form :model="form2">
          <el-form-item :label-width="LabelWidth">
            <table style="width: 80%;" cellspacing="0" cellpadding="10">
              <tr>
                <td style="width: 200px;text-align: center">跑马灯内容</td>
                <td style="text-align: center">
                  <el-input v-model="form2.marquee_content" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 200px;text-align: center">播放间隔</td>
                <td style="text-align: center">
                  <el-input v-model="form2.play_space" autocomplete="off" placeholder="播放间隔(s)"></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 200px;text-align: center">排序</td>
                <td style="text-align: center">
                  <el-input v-model="form2.sort" autocomplete="off" placeholder></el-input>
                </td>
              </tr>
              <tr>
                <td style="width: 200px;text-align: center">播放开始时间</td>
                <td style="text-align: center">
                  <el-date-picker v-model="value1" type="datetime" placeholder="选择开始时间"></el-date-picker>
                </td>
              </tr>
              <tr>
                <td style="width: 200px;text-align: center">播放结束时间</td>
                <td style="text-align: center">
                  <el-date-picker v-model="value1" type="datetime" placeholder="选择结束时间"></el-date-picker>
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
  name: "MarqueeConf",
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
      dialogVisible: false,
      formLabelWidth: "160px",
      LabelWidth: "80px",
      pickerOptions: {
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
      value1: "",
      value2: "",
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
        { label: "序号", prop: "serial_num", width: "" },
        { label: "跑马灯内容", prop: "marquee_content", width: "" },
        { label: "播放间隔", prop: "play_space", width: "" },
        { label: "排序", prop: "sort", width: "" },
        {
          label: "开始时间/结束时间",
          prop: "start_and_end_time",
          width: "300"
        },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          serial_num: "维护通知",
          marquee_content: "内容",
          play_space: "",
          sort: "1",
          start_and_end_time: "2020-01-01 10:00:00 / 2020-01-01 12:00:00",
          status: "启用",
          action: [
            { label: "修改", type: "edit" },
            { label: "禁用", type: "ban" },
            { label: "删除", type: "delete" }
          ]
        },
        {
          serial_num: "维护通知",
          marquee_content: "内容",
          play_space: "",
          sort: "1",
          start_and_end_time: "2020-01-01 10:00:00-2020-01-01 12:00:00",
          status: "1",
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
      },
      form2: {
        marquee_content: "",
        play_space: "",
        sort: ""
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
#MarqueeConf-main .bd {
  padding-left: 20px;
}
#MarqueeConf-main .bd p {
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

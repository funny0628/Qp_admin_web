<template>
  <div id="HallAdvertiseConf-main">
    <el-button
      type="primary"
      style="margin-top: 10px;margin-bottom: 10px;"
      @click="dialogFormVisible=true"
    >新增</el-button>
    <el-button
      type="primary"
      style="margin-top: 10px;margin-bottom: 10px;"
      @click="dialogVisible=true"
    >添加宣传页</el-button>
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
    <!--新增大厅海报 -->
    <div>
      <el-dialog title="新增大厅海报" :visible.sync="dialogFormVisible" center>
        <el-form :model="form" label-position="left">
          <!-- <table id="addPoster">
              <tr>
                <td style="width: 50%;">
                  <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input
                      v-model="form.name"
                      autocomplete="off"
                      placeholder="请输入标题"
                      style="width: 80%;"
                    ></el-input>
                  </el-form-item>
                </td>
                <td style="width: 50%;">
                  <el-form-item label="海报类型" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择海报类型">
                      <el-option label="轮播海报" value="lunPoster"></el-option>
                      <el-option label="活动海报" value="activePoster"></el-option>
                      <el-option label="绑定手机海报" value="bangdingPoster"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="上传海报" :label-width="formLabelWidth" width="100%">
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="动作类型" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择动作类型">
                      <el-option label="跳转" value="lunPoster"></el-option>
                      <el-option label="复制" value="activePoster"></el-option>
                      <el-option label="加入游戏" value="bangdingPoster"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="用户分层" :label-width="formLabelWidth">
                    <el-checkbox v-model="checked">vip1</el-checkbox>
                    <el-checkbox v-model="checked">vip1</el-checkbox>
                    <el-checkbox v-model="checked">vip1</el-checkbox>
                    <el-checkbox v-model="checked">vip1</el-checkbox>
                    <el-checkbox v-model="checked">vip1</el-checkbox>
                    <el-checkbox v-model="checked">vip1</el-checkbox>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入备注信息"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td style="width: 50%;">
                  <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
          </table>-->
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" placeholder="请输入标题" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="海报类型" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择海报类型">
                  <el-option label="轮播海报" value="lunPoster"></el-option>
                  <el-option label="活动海报" value="activePoster"></el-option>
                  <el-option label="绑定手机海报" value="bangdingPoster"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="上传海报" :label-width="formLabelWidth">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="动作类型" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择动作类型">
                  <el-option label="跳转" value="lunPoster"></el-option>
                  <el-option label="复制" value="activePoster"></el-option>
                  <el-option label="加入游戏" value="bangdingPoster"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="用户分层" :label-width="formLabelWidth">
                <el-checkbox v-model="checked">vip1</el-checkbox>
                <el-checkbox v-model="checked">vip1</el-checkbox>
                <el-checkbox v-model="checked">vip1</el-checkbox>
                <el-checkbox v-model="checked">vip1</el-checkbox>
                <el-checkbox v-model="checked">vip1</el-checkbox>
                <el-checkbox v-model="checked">vip1</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" placeholder="请输入备注信息" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" placeholder="请输入" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
      value: true,
      dialogModifyVisible: false,
      dialogVisible: false,
      labelPosition: "left", //左对齐
      activeName: "first",
      tableStyle: [
        { label: "渠道ID", prop: "channel_id", width: "" },
        { label: "渠道名称", prop: "channel_name", width: "" },
        { label: "内容", prop: "content", width: "" },
        { label: "内容", prop: "content", width: "" },
        { label: "内容", prop: "content", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "创建时间", prop: "create_time", width: "" },
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
            { label: "修改", type: "edit" },
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
            { label: "修改", type: "edit" },
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
            { label: "修改", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogFormVisible: false,
      form: {
        name: ""
      },
      form2: {
        name: ""
      },
      formLabelWidth: "100px"
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
    switchTabs(tab, event) {
      console.log(tab, event);
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

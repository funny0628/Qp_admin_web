<!--全民代理列表-->
<template>
  <div id="Universal">
    <input-area>
      <el-select v-model="format.platform" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
      <permission-button :action="ActionType.ADD">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD">
        <el-button type="primary" size="medium" @click="dialogVisible=true">设置比例</el-button>
      </permission-button>
       <permission-button :action="ActionType.ADD">
        <el-button type="primary" size="medium" @click="dialogModelVisible=true">比例</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hidePage="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template
              v-if="['user_gold', 'alipay_account', 'account_person'].indexOf(scope.prop) >= 0"
            >
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  == 1">启用</span>
              <span v-else>冻结</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handelClick(btn)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','status'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div class="dialog">
      <el-dialog title="全民返佣设置" :visible.sync="dialogVisible" width="30%" center>
        <el-form :model="formData" ref="formData">
          <el-form-item label="返佣模式：" label-width="140px" prop="mode">
            <el-input v-model="formData.mode" autocomplete="off" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="返佣比例：" label-width="140px" prop="ratio">
            <el-input
              v-model="formData.ratio"
              autocomplete="off"
              style="width: 80%;"
              placeholder="请输入充值金额"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-dialog title="设置比例" :visible.sync="dialogModelVisible" width="30%" center>
      <el-form :model="form" ref="form">
        <el-form-item>
          <table cellspacing="0" cellpadding="10">
            <tr>
              <td style="width: 120px;text-align: center">税收返利比例</td>
              <td style="text-align: center">
                <el-input v-model="form.ratio"></el-input>
              </td>
            </tr>
          </table>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogModelVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogModelVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import InputArea from "../../plugin/components/InputArea";
import SelectTime from "../../plugin/components/SelectTime";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import { truncate } from "fs";

export default {
  name: "Universal",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  data() {
    return {
      format: {
        platform: ""
      },
      platforms: [
        { label: "平台一", value: "1" },
        { label: "平台二", value: "2" }
      ],
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
      date: [],
      tableStyle: [
        { label: "日期", prop: "time", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "所属渠道", prop: "user_desc", width: "" },
        { label: "直属玩家税收", prop: "tax", width: "" },
        { label: "直属玩家返利", prop: "getCom", width: "" },
        { label: "其他玩家税收", prop: "getCom", width: "" },
        { label: "其他玩家返利", prop: "getCom", width: "" },
        { label: "总返利金额", prop: "getCom", width: "" }
      ],
      records: [
        {
          time: "2019-09-01 12:00:00",
          user_id: "100012",
          user_desc: "这边是昵称",
          tax: "100.00",
          getCom: "50.00"
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      dialogVisible: false,
      dialogModelVisible: false,
      formData: {
        mode: "税收",
        ratio: ""
      },
      form: {
        ratio: "30%"
      }
    };
  },
  methods: {
    search() {},
    /** 表格操作 **/
    handelClick(btn) {}
  }
};
</script>

<style scoped>
#Universal .bd {
  padding: 0 20px;
}
table {
  border-collapse: collapse;
}
table,table tr td {
  border: 1px solid #c0c4cc;
}
</style>
<!--全民返佣-->

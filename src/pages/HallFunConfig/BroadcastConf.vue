<template>
  <div id="BroadcastConf-main">
    <input-area>
      <div>
        <el-button type="danger">删除</el-button>
        <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
        <el-button type="primary" @click="open">发送到服务端配置</el-button>
      </div>
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
            <template v-if="scope.prop === 'action'">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div>
      <!-- 添加系统广播 -->
      <el-dialog title="添加系统广播" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="120px">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="请选择活动区域">
              <el-option label="对局广播" value="play_broadcast"></el-option>
              <el-option label="VIP上线广播" value="online_broadcast"></el-option>
              <el-option label="引导弹窗广播" value="pop_broadcast"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏名称" :label-width="formLabelWidth">
            <el-input v-model="form.game_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公告信息" :label-width="formLabelWidth">
            <el-input v-model="form.notice_msg" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="广播保留时间" :label-width="formLabelWidth">
            <el-input v-model="form.keep_time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="金币范围" :label-width="formLabelWidth">
            <el-row>
              <el-col :span="10">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="4" style="text-align:center;">-</el-col>
              <el-col :span="10">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-col>
            </el-row>
            <span>生成的金币范围格式: 100,5000</span>
          </el-form-item>
          <el-form-item label="时间范围" :label-width="formLabelWidth">
            <el-row>
              <el-col :span="10">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="4" style="text-align:center;">-</el-col>
              <el-col :span="10">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-col>
            </el-row>
            <span>生成的时间范围格式: 600,1200</span>
          </el-form-item>
          <el-form-item label="触发金额" :label-width="formLabelWidth">
            <el-input v-model="form.trigger_money" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时间间隔" :label-width="formLabelWidth">
            <el-input v-model="form.time_gap" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否MOCK数据" :label-width="formLabelWidth">
            <el-select v-model="form.is_mock" placeholder="请选择活动区域">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
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
  name: "BroadcastConf",
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
      funOpts: [
        { value: "1", label: "留空" },
        { value: "2", label: "活动" },
        { value: "3", label: "邮件" },
        { value: "4", label: "排行榜" },
        { value: "5", label: "设置" },
        { value: "6", label: "保险箱" },
        { value: "7", label: "广播" },
        { value: "8", label: "财神" }
      ],
      tableStyle: [
        { label: "ID", prop: "channel_id", width: "" },
        { label: "广播类型", prop: "channel_name", width: "" },
        { label: "游戏名称", prop: "channel_name", width: "" },
        { label: "信息", prop: "fun_1", width: "" },
        { label: "保留时间(秒)", prop: "fun_2", width: "" },
        { label: "生成金币范围", prop: "fun_3", width: "" },
        { label: "生成时间范围", prop: "fun_4", width: "" },
        { label: "触发金额", prop: "fun_5", width: "" },
        { label: "操作", prop: "action", width: "150" }
      ],
      records: [
        {
          channel_id: "10012",
          channel_name: "主包",
          fun_1: "备份",
          fun_2: "排行榜",
          fun_3: "邮箱",
          fun_4: "客服",
          fun_5: "未设定",
          fun_6: "未设定",
          fun_7: "未设定",
          fun_8: "设定",
          operator: "json",
          create_time: "2020-02-10 12:00:00",
          action: ""
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        id: "",
        type: "",
        game_name: "",
        notice_msg: "",
        keep_time: "",
        gold_range: "",
        time_range: "",
        trigger_money: "",
        time_gap: "",
        is_mock: ""
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
    open() {
      this.$confirm("确认发送吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "发送成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送"
          });
        });
    }
  },
  mounted() {}
};
</script>

<style scoped>
#BroadcastConf-main .bd {
  padding-left: 20px;
}
#BroadcastConf-main .bd p {
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
.itemClass {
  width: 45%;
}
</style>

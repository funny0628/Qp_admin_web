<template>
  <div id="GameSortConf-main">
    <input-area>
      <div>
        <el-button type="danger">删除</el-button>
        <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
        <el-button type="primary" @click="open">发送到服务端配置</el-button>
      </div>
      <el-select v-model="form.region" placeholder="请选择渠道" style="margin-top:10px;">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
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
      <!-- 添加活动入口配置 -->
      <el-dialog title="添加活动入口配置" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-position="top">
          <el-form-item label="渠道(可多选)">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox label="0902代理01"></el-checkbox>
              <el-checkbox label="0902代理02"></el-checkbox>
              <el-checkbox label="0902代理03"></el-checkbox>
              <el-checkbox label="0902代理04"></el-checkbox>
              <el-checkbox label="0902代理05"></el-checkbox>
              <el-checkbox label="0902代理06"></el-checkbox>
              <el-checkbox label="0902代理07"></el-checkbox>
              <el-checkbox label="0902代理08"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="游戏1">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.corner_remark">
                  <el-option label="无" value="none"></el-option>
                  <el-option label="推荐" value="recommend"></el-option>
                  <el-option label="热门" value="hot"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.status">
                  <el-option label="正常" value="normal"></el-option>
                  <el-option label="敬请期待" value="expect"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.leader">
                  <el-option label="是" value="yes"></el-option>
                  <el-option label="否" value="no"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏2">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏3">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏4">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏5">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏6">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏7">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏8">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.function" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
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
  name: "GameSortConf",
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
      tableData: [
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
          action: "修改 删除"
        }
      ],
      tableStyle: [
        { label: "ID", prop: "channel_id", width: "" },
        { label: "渠道名称", prop: "channel_name", width: "" },
        { label: "渠道KEY", prop: "channel_name", width: "" },
        { label: "游戏1", prop: "fun_1", width: "" },
        { label: "游戏2", prop: "fun_2", width: "" },
        { label: "游戏3", prop: "fun_3", width: "" },
        { label: "游戏4", prop: "fun_4", width: "" },
        { label: "游戏5", prop: "fun_5", width: "" },
        { label: "游戏6", prop: "fun_6", width: "" },
        { label: "游戏7", prop: "fun_7", width: "" },
        { label: "游戏8", prop: "fun_8", width: "" },
        { label: "操作者", prop: "operator", width: "" },
        { label: "创建时间", prop: "create_time", width: "160" },
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
          action: [
            { label: "编辑", type: "edit" },
            { label: "删除", type: "delete" }
          ]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        checkList: ["0902代理01", "0902代理02"],
        function: "1",
        status: "normal",
        corner_remark: "recommend",
        leader: "no",
        agent: 100,
        nickname: "",
        password: "",
        money_password: "",
        phone: "",
        user_type: "1"
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
#GameSortConf-main .bd {
  padding-left: 20px;
}
#GameSortConf-main .bd p {
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

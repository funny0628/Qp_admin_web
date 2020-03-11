<!--管理员角色-->
<template>
  <div id="Admin-main">
    <input-area>
      <permission-button :action="ActionType.ADD" @click="handelAddClick()">
        <el-button type="primary" size="medium" @click="dialogFormVisible=true">新增</el-button>
        <el-button type="primary" size="medium" @click="dialogVisible=true">权限设置</el-button>
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
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handleClick(btn,scope.row)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!-- 新增角色 -->
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="form">
        <el-form-item label-width="120px">
          <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
            <tr>
              <td style="width: 150px;text-align: center;background-color: #f2f2f2;">角色名称</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 150px;text-align: center;background-color: #f2f2f2;">角色描述</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 150px;text-align: center;background-color: #f2f2f2;">角色状态</td>
              <td style="text-align: center">
                <el-select v-model="form2.status">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
          </table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
      </div>
    </el-dialog>
    <!-- 权限设置 -->
    <el-dialog :visible.sync="dialogVisible" center>
      <div class="title" style="background-color: #f2f2f2;">权限设置</div>
      <div class="content">
        <el-form :model="form2">
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">- 子平台管理</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr>
                <td style="width: 150px;text-align: center;">子平台设置</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">子包设置</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">灰度名单配置</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">子包更新配置</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">+ 用户管理</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr>
                <td style="width: 150px;text-align: center;">用户列表</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">进出游戏记录</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">金币记录</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">用户加减金币</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">修改上级代理</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">用户日志</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">流水记录查询</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">支付订单记录</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">兑换订单记录</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">- 游戏数据</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr>
                <td style="width: 150px;text-align: center;">牌局记录</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">捕鱼统计</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">游戏房间配置</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
              <tr>
                <td style="width: 150px;text-align: center;">子游戏盈亏数据</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">- 大厅功能配置</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr v-for="(item,index) in hallFunConfItem" :key="index">
                <td style="width: 150px;text-align: center;">{{item}}</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">- 运营报表</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr v-for="(item,index) in operationRepItem" :key="index">
                <td style="width: 150px;text-align: center;">{{item}}</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">- 渠道包管理</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr v-for="(item,index) in channelPackageManItem" :key="index">
                <td style="width: 150px;text-align: center;">{{item}}</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">- 代理数据</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr v-for="(item,index) in agentDataItem" :key="index">
                <td style="width: 150px;text-align: center;">{{item}}</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">- 数据分析</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr v-for="(item,index) in dataAnaylzeItem" :key="index">
                <td style="width: 150px;text-align: center;">{{item}}</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">- 活动运营</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr v-for="(item,index) in activeOperationItem" :key="index">
                <td style="width: 150px;text-align: center;">{{item}}</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">- 系统配置</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr v-for="(item,index) in systemConfItem" :key="index">
                <td style="width: 150px;text-align: center;">{{item}}</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="border: 1px solid #e4e4e4;">
            <div style="height: 30px;line-height: 30px;background-color: #f2f2f2;">- 权限管理</div>
            <table style="width: 80%;border-collapse: collapse;" cellspacing="0" cellpadding="10">
              <tr v-for="(item,index) in powerManItem" :key="index">
                <td style="width: 150px;text-align: center;">{{item}}</td>
                <td style="text-align: center">
                  <el-checkbox>全部</el-checkbox>
                  <el-checkbox>添加</el-checkbox>
                  <el-checkbox>编辑</el-checkbox>
                  <el-checkbox>删除</el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
        </el-form>
        <div class="footer" style="text-align:center;">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary">保 存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PageInfo from "../../plugin/script/common/PageInfo";
import InputArea from "../../plugin/components/InputArea";
import tierHandler from "./../../script/handlers/tierHandler";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import storage from "./../../script/storage/storage";

export default {
  name: "Admin",
  extends: BaseIframe,
  components: { InputArea, PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      //表格数据
      tableStyle: [
        { label: "序号", prop: "serial_number", width: "" },
        { label: "角色名称", prop: "role_name", width: "" },
        { label: "角色描述", prop: "role_state", width: "" },
        { label: "创建时间", prop: "create_time", width: "" },
        { label: "更新时间", prop: "update_time", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          serial_number: "1",
          role_name: "超级管理员",
          role_state: "无法删除",
          create_time: "2020-02-02 12:00:00",
          update_time: "2020-03-01 10:00:00",
          status: "启用",
          action: [
            { label: "编辑", type: "edit" },
            { label: "权限", type: "admin" },
            { label: "删除", type: "delete" }
          ]
        }
      ],
      options: [
        { label: "启用", value: "1" },
        { label: "禁用", value: "2" }
      ],
      hallFunConfItem: [
        "支付配置",
        "线下支付",
        "支付页签控制",
        "排行榜管理",
        "vip系统",
        "背景音乐设置",
        "app热更配置",
        "默认头像上传",
        "大厅宣传页配置",
        "底部菜单配置",
        "功能排序设置",
        "公告配置",
        "跑马灯配置",
        "邮件系统"
      ],
      operationRepItem: [
        "用户团队报表",
        "游戏报表",
        "平台报表",
        "出入款报表"
      ],
      channelPackageManItem: [
        "渠道统计",
        "渠道管理",
        "渠道盈亏数据",
        "渠道支付设置"
      ],
      agentDataItem: [
        "代理层级",
        "全民代理列表",
        "业绩返佣",
        "业绩返佣列表"
      ],
      dataAnaylzeItem: [
        "在线在玩",
        "留存分析",
        "代理日新增收益"
      ],
      activeOperationItem: [
        "充值优惠",
        "每日签到",
        "抽奖设置",
        "红包雨活动",
        "救援金活动",
        "投注返水活动",
        "活动领取记录"
      ],
      systemConfItem: [
        "推送功能",
        "属性配置",
        "推广配置"
      ],
      powerManItem: [
        "管理员角色",
        "管理员列表",
        "系统操作日志"
      ],
      pageInfo: new PageInfo(4, [5, 10, 15], 4),
      //新增、编辑数据
      dialogTitleType: "",
      dialogFormVisible: false,
      dialogVisible: false,
      labelWidth: "70px",
      dataForm: {
        tier: "", //id
        hierarchy_name: "", //层级名称
        alias: "" //别名
      },
      form2: {
        name: "",
        status: "1"
      }
    };
  },
  methods: {
    search() {},
    //新增代理层
    handelAddClick() {
      this.dataForm.tier = "";
      this.dataForm.hierarchy_name = "";
      this.dataForm.alias = "";
      this.dialogTitleType = "新增代理分层";
      this.dialogVisible = true;
    },
    //修改代理层
    handleClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogTitleType = "修改代理分层";
        this.dialogVisible = true;
        this.dataForm.hierarchy_name = row.tier_name;
        this.dataForm.alias = row.tier_alias;
        this.dataForm.tier = row.tier;
      }
    },
    //代理层级
    getList() {
      tierHandler.list().promise.then(res => {
        if (Number(res.code) === 200) {
          // cache = res.data;
          this.records = res.data;
          storage.set("list", this.records);
        }
        //数据处理
        this.records.map(item => {
          item.action = [{ label: "修改", type: "edit" }];
        });
      });
    },
    /**增加代理分层*/
    addLevel() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          if (!this.dataForm.tier) {
            let data = {
              tier_name: this.dataForm.hierarchy_name,
              tier_alias: this.dataForm.alias
            };
            tierHandler
              .add(data)
              .promise.then(res => {
                if (Number(res.code) === 200) {
                  this.$message.success(res.msg);
                }
                this.dialogVisible = false;
                this.getList();
                this.$refs["dataForm"].resetFields(); // 失效
              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          } else {
            //修改代理分层
            let data = {
              tier: this.dataForm.tier,
              tier_name: this.dataForm.hierarchy_name,
              tier_alias: this.dataForm.alias
            };
            tierHandler
              .set(data)
              .promise.then(res => {
                if (Number(res.code) === 200) {
                  this.$message.success(res.msg);
                }
                this.dialogVisible = false;
                this.$refs["dataForm"].resetFields(); // 失效
                this.getList();
              })
              .catch(e => {
                console.log(e);
              });
          }
        }
      });
    }
  },
  mounted() {
    this.getList();
  },
  watch: {}
};
</script>

<style scoped>
.title {
  height: 35px;
  line-height: 35px;
  padding-left: 20px;
  font-weight: bold;
  border: 1px solid #e4e4e4;
}
.content {
  padding: 20px;
  border: 1px solid #e4e4e4;
  border-top: none;
}
</style>

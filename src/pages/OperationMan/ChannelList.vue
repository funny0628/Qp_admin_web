<template>
  <div id="ChannelList-main">
    <input-area>
      <div style="margin-bottom:10px;">
        <el-button type="primary" size="medium" @click="dialogFormVisible=true">添加</el-button>
        <el-button type="primary" size="medium" @click="dialogVisible=true">添加公司</el-button>
      </div>
      <span>公司</span>
      <el-select v-model="format.channel" placeholder="请选择" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>渠道</span>
      <el-select v-model="format.channel" placeholder="请选择渠道" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" size="medium">搜索</el-button>
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
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!-- 渠道添加 -->
    <el-dialog title="渠道添加" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="渠道名" :label-width="formLabelWidth">
          <el-input v-model="form.channel_name" autocomplete="off" placeholder="请输入渠道名"></el-input>
        </el-form-item>
        <el-form-item label="渠道编号" :label-width="formLabelWidth">
          <el-input v-model="form.channel_id" autocomplete="off" placeholder="请输入渠道编号"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth">
          <el-select v-model="form.belong_company" placeholder="请选择" style="width:100%;">
            <el-option label="金币" value="gold"></el-option>
            <el-option label="现金" value="money"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加公司 -->
    <el-dialog title="添加公司" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="公司名" :label-width="formLabelWidth">
          <el-input v-model="form.company_name" autocomplete="off" placeholder="请输入公司名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
  name: "ChannelList",
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
      formLabelWidth: "120px",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      platforms: [
        { value: 1, label: "全部" },
        { value: 2, label: "审核中" },
        { value: 3, label: "已拒绝" },
        { value: 4, label: "已关闭" },
        { value: 5, label: "已完成" },
        { value: 6, label: "申请中" }
      ],
      format: {
        user_id: "",
        phone: "",
        ip: "",
        robot_code: "",
        channel: "",
        order_status: "",
        vip_class: "",
        time_range: ""
      },
      tableStyle: [
        { label: "ID", prop: "order_id", width: "" },
        { label: "渠道名", prop: "channel_name", width: "" },
        { label: "代码", prop: "channel_name", width: "" },
        { label: "关联总代id", prop: "fun_1", width: "" },
        { label: "隶属公司", prop: "fun_2", width: "" },
        { label: "创建时间", prop: "fun_5", width: "" },
        { label: "修改时间", prop: "fun_6", width: "" },
        { label: "操作", prop: "action", width: "150" }
      ],
      records: [
        {
          order_id: "10012",
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
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        user_id: "",
        pay_type: "1",
        goods_type: 100,
        money: "",
        check_money: ""
      }
    };
  },
  methods: {
    /**搜索*/
    search() {},
    handelClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogFormVisible = true;
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(row);
      const ids = row.id.toString();
      console.log(ids);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(
          this.$message({
            type: "success",
            message: res.data.msg
          })
        )
        .catch(() => {
          this.$message({
            type: "info",
            message: res.data.msg
          });
        });
    }
  },
  mounted() {}
};
</script>

<style scoped>
#ChannelList-main .bd {
  padding-left: 20px;
}
#ChannelList-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#ChannelList-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#ChannelList-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
table {
  border-collapse: collapse;
}
</style>

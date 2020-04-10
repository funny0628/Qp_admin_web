<template>
  <div id="DrawWaterDate-main">
    <input-area>
      <el-select v-model="format.game_type" placeholder="平台" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary">查找</el-button>
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
            <template
              v-if="['action'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
  </div>
</template>
         

<script>
import InfoTable from "../../../plugin/components/InfoTable";
import PageInfo from "../../../plugin/script/common/PageInfo";
import InputArea from "../../../plugin/components/InputArea";
import InfoTableItem from "../../../plugin/components/InfoTableItem";

export default {
  name: "DrawWaterDate",
  components: {
    InfoTableItem,
    InputArea,
    InfoTable,
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
        game_type: ""
      },
      funOpts: [
        { value: "1", label: "留空" },
        { value: "2", label: "代理" },
        { value: "3", label: "客服" },
        { value: "4", label: "服务中心" }
      ],
      tableStyle: [
        { label: "日期", prop: "id", width: "" },
        { label: "基础库存值", prop: "channel_name", width: "" },
        { label: "基础库存变化值", prop: "channel_code", width: "" },
        { label: "奖励库存值", prop: "func_list", width: "" },
        { label: "奖励库存变化值", prop: "func_list", width: "" },
        { label: "抽水", prop: "func_list", width: "" },
        { label: "抽水变化值", prop: "func_list", width: "" },
        { label: "回收金币值", prop: "func_list", width: "" },
        { label: "操作", prop: "action", width: "150" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      form: {
        checkList: ["0902代理01", "0902代理02"],
        function: "1",
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
    getFunSortList() {
      this.$http
        .get("api/lobby/bottom", {
          params: {
            page: 1,
            limit: 10,
            type: 2
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.records = res.data.data;
          }
        });
    },
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    handleEdit(row) {},
    handleDelete(row) {
      this.$confirm("确认删除吗？", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //###--------------------------------------------------------------------
          //1.只作为把页面的数据删除
          this.tableData.splice(y, 1);
          //2.发送请求在后台删除数据

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          // console.log('点击了取消');

          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.getFunSortList();
  }
};
</script>

<style scoped>
#DrawWaterDate-main .bd {
  padding-left: 20px;
}
#DrawWaterDate-main .bd p {
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

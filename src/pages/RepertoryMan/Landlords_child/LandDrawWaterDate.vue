<template>
  <div id="landDrawWaterDate-main">
    <input-area>
      <el-select v-model="format.game_type" placeholder="请选择" size="medium">
        <el-option
          v-for="item in gameList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div>{{format}}</div>
      <el-button type="primary" @click="searchData">查找</el-button>
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
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
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
  name: "LandDrawWaterDate",
  components: {
    InfoTableItem,
    InputArea,
    InfoTable
  },
  data() {
    return {
      gameList: [
        { value: 300, label: "斗地主-低倍场" },
        { value: 301, label: "斗地主-中倍场" },
        { value: 302, label: "斗地主-高倍场" }
      ],
      format: {
        game_type: 300
      },
      tableStyle: [
        { label: "ID", prop: "id", width: "" },
        { label: "日期", prop: "today", width: "" },
        { label: "基础库存值", prop: "base_store", width: "" },
        { label: "基础库存变化值", prop: "modified_time", width: "" },
        { label: "奖励库存值", prop: "award_store", width: "" },
        { label: "奖励库存变化值", prop: "fee_store", width: "" },
        { label: "抽水", prop: "robot_type", width: "" },
        { label: "抽水变化值", prop: "table_type", width: "" },
        { label: "回收金币值", prop: "jackpot_store", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5)
    };
  },
  methods: {
    getDrawWaterList() {
      // let data = {
      //   page: 1,
      //   limit: 10,
      //   game_id: 3
      // }
      this.$http
        .get("api/inventory/inventory_manage", {
          params: {
            page: 1,
            limit: 10,
            game_id: this.format.game_type
          }
        })
        .then(res => {
          console.log(res);
          if(res.data.code === 1) {
            this.records = res.data.data
          }
        })
    },
    searchData() {
      this.getDrawWaterList()
    },
    /**搜索*/
    search() {},
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
    this.getDrawWaterList();
  }
};
</script>

<style scoped>
#landDrawWaterDate-main .bd {
  padding-left: 20px;
}
#landDrawWaterDate-main .bd p {
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

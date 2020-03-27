<template>
  <div id="RankListManageHistory">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <span :class="{ orClass: avtiveIndex === 0 }" @click="makeMoney"
          >历史赚金排行</span
        >
        <span :class="{ orClass: avtiveIndex === 1 }" @click="exchange"
          >历史兑换排行</span
        >
        <span :class="{ orClass: avtiveIndex === 2 }" @click="online"
          >历史在线排行</span
        >
      </div>
      <el-input
        style="margin-top:10px;width:200px;"
        v-model="input"
        placeholder="请输入玩家ID"
      ></el-input>
      <el-date-picker
        style="margin-top:10px;width:200px;"
        v-model="value1"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      <span class="search" @click="search">查找</span>
    </div>
    <!-- table -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="玩家昵称" width="180">
        </el-table-column>
        <el-table-column prop="name" label="玩家ID" width="180">
        </el-table-column>
        <el-table-column v-if="avtiveIndex === 0" prop="address" label="赚金"> </el-table-column>
        <el-table-column v-if="avtiveIndex === 1" prop="address" label="兑换"> </el-table-column>
        <el-table-column v-if="avtiveIndex === 2" prop="address" label="在线"> </el-table-column>
        <el-table-column prop="address" label="排名"> </el-table-column>
        <el-table-column prop="address" label="充值"> </el-table-column>
        <el-table-column prop="address" label="日期"> </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avtiveIndex: 0,
      input: "",
      value1: "",
      currentPage3:1,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    makeMoney() {
      this.avtiveIndex = 0;
    },
    exchange() {
      this.avtiveIndex = 1;
    },
    online() {
      this.avtiveIndex = 2;
    },
    search() {},
    handleSizeChange() {},
    handleCurrentChange() {},
  }
};
</script>

<style lang="less" scoped>
#RankListManageHistory {
  background-color: #f2f2f2;
  .title {
    padding: 20px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
    span {
      display: inline-block;
      color: #fff;
      width: 140px;
      height: 30px;
      margin-right: 5px;
      line-height: 30px;
      text-align: center;
      background-color: #009688;
      &:hover {
        background-color: #30a89d;
      }
      &.orClass {
        background-color: #ff5722;
        &:hover {
          background-color: #ff794e;
        }
      }
      &.search {
        width: 50px;
      }
    }
  }
  .table {
    margin-top: 10px;
  }
}
</style>

<template>
  <div id="RankListManageHistory">
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <el-button type="primary" @click="makeMoney">历史赚金排行</el-button>
        <el-button type="primary" @click="exchange">历史兑换排行</el-button>
        <el-button type="primary" @click="online">历史在线排行</el-button>
      </div>
      <el-input
        style="margin-top:10px;width:200px;"
        v-model="uid"
        placeholder="请输入玩家ID"
      ></el-input>
      <el-date-picker
        v-model="datas"
        type="date"
        placeholder="请选择日期"
        format="yyyy-MM-dd"
        value-format="timestamp"
      >
      </el-date-picker>
      <el-button type="primary" @click="search">查找</el-button>
    </div>
    <!-- table -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="nick_name" label="玩家昵称" width="180">
        </el-table-column>
        <el-table-column prop="uid" label="玩家ID" width="180">
        </el-table-column>
        <el-table-column
          v-if="avtiveIndex === 0"
          prop="today_income"
          label="赚金"
        >
        </el-table-column>
        <el-table-column
          v-if="avtiveIndex === 1"
          prop="today_income"
          label="兑换"
        >
        </el-table-column>
        <el-table-column
          v-if="avtiveIndex === 2"
          prop="today_income"
          label="在线"
        >
        </el-table-column>
        <el-table-column prop="rank_level" label="排名"> </el-table-column>
        <el-table-column prop="recharge_money" label="充值"> </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-if="total > 5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
      datas: "",
      uid: "",
      currentPage: 1,
      limit: 10,
      total: 0,
      type: 1,
      tableData: []
    };
  },
  created() {
    this.initdata({
      page: this.currentPage,
      limit: this.limit,
      type: this.type
    });
  },
  methods: {
    //赚钱排行
    makeMoney() {
      this.activehtpp(0, 1);
    },

    //历史排行
    exchange() {
      this.activehtpp(1, 2);
    },

    //历史在线
    online() {
      this.activehtpp(2, 3);
    },

    //查找
    search() {
      if (this.uid === "") {
        this.uid = 0;
      }else if(this.datas === ''){
        this.datas = 0
      }
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        type: this.type,
        uid: this.uid,
        datas: this.datas
      });
      this.uid = "";
      this.datas = "";
    
    },

    //页容量变化
    handleSizeChange(num) {
      this.limit = num;
      this.currentPage = 1;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        type: this.type
      });
    },

    //页码变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        type: this.type
      });
    },

    activehtpp(avtiveIndex, type) {
      this.avtiveIndex = avtiveIndex;
      this.type = type;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        type: this.type
      });
    },

    async initdata(params) {
      let { data } = await this.$http.HallFunConfig.GetManageHistory(params);
      // let fres = this.formateData(data.data);
      this.tableData = data.data;
      this.total = data.total;
      // console.log(data);
    }
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
  }
  .table {
    margin-top: 10px;
  }
}
</style>

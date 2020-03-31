<template>
  <div id="F_ProbConfig">
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="save">保存</el-button
      ><el-button type="primary" @click="send">发送到服务器配置</el-button>
      <p><el-button>牌型概率配置</el-button></p>
    </div>
    <!-- table  -->
    <div class="table">
      <el-table tooltip-effect="dark" border :data="tableData" style="width: 50%">
        <el-table-column label="牌型" prop="caozuo" width="180">
        
        </el-table-column>
        <el-table-column label="概率 (百分比)" prop="gailv">
          <template slot-scope="scope">
           <el-input style="width:200px" v-model="scope.row.gailv" placeholder="0"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input:"",
      tableData: [
        {
          caozuo: "高牌不带A",
          gailv: "王小虎",
        },
        {
          caozuo: "高牌带A",
          gailv: "王小虎",
        },
        {
          caozuo: "对子2-9",
          gailv: "王小虎",
        },
        {
          caozuo: "对子10-A",
          gailv: "王小虎",
        },
        {
          caozuo: "顺子",
          gailv: "王小虎",
        },
        {
          caozuo: "金花",
          gailv: "王小虎",
        },
        {
          caozuo: "顺金",
          gailv: "王小虎",
        },
        {
          caozuo: "豹子",
          gailv: "王小虎",
        },
      
      ]
    };
  },
  methods: {
    save() {},
    send() {}
  }
};
</script>

<style lang="less" scoped>
#F_ProbConfig {
  background-color: #f2f2f2;
  .title {
    font-size: 25px;
    border-bottom: 1px solid #ccc;
  }
}
</style>

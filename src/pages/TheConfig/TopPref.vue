<template>
  <div id="TopPref-main">
    <div class="title">
      活动配置
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 95%;margin: 0 auto;"
      >
        <el-table-column
          prop="up_channel"
          label="充值渠道"
          width=""
          align="center"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.up_channel" size="" placeholder="选择充值渠道">
              <el-option label="支付宝" value='0'></el-option>
              <el-option label="银行卡" value='1'></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="game_type"
          label="充值金额(元)"
          width=""
          align="center"
        >
          <template slot-scope="scope">
            <div >
              <el-input size="" v-model="scope.row.up_money" placeholder="请输入充值金额"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="given_type"
          label="赠送方式:"
          width=""
          align="center"
        >
          <template slot-scope="scope">
            <div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="game_type"
          label="赠送金额（固定金额单位为元）"
          width=""
          align="center"
        >
          <template slot-scope="scope">
            <div >
              <el-input size="" v-model="scope.row.given_money" placeholder="请输入充值金额"></el-input>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="" align="center">
          <template slot-scope="scope">
            <el-button size="" type="warning" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer" style="text-align: center;padding-top: 30px;">
        <el-button ><i class="el-icon-plus"></i>  添 加</el-button>
        <el-button type="primary">保 存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TopPref",
    data(){
      return{
        tableData:[{up_channel:'0',up_money:'',given_type:'',given_money:''}]
      }
    }
  }
</script>

<style scoped>
  #TopPref-main{
    width: 100%;
    padding: 15px 20px 0 20px;
  }
  #TopPref-main .title {
    width: 100%;
    height: 50px;
    border: 1px solid #e9e9e9;
    line-height: 50px;
    padding-left: 15px;
    font-weight: bold;
    font-size: 16px;
  }
  #TopPref-main .content {
    border: 1px solid #e9e9e9;
    border-top: none;
    height: 400px;
    width: 100%;
  }
</style>
<!--充值优惠-->

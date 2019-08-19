<template>
    <div id="Universal">
      <div class="content" style="padding: 100px 20px 0 20px">
        <template>
          <el-table
            :data="tableData"
            border
            :header-cell-style="{background:'#f2f2f2',color:'#606266'}"
            style="width: 100%">
            <el-table-column
              prop="level"
              label="代理层级"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="amount_tol"
              label="总发放金额"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="proportion"
              align="center"
              label="分成比例">
            </el-table-column>
            <el-table-column
              prop="commission"
              align="center"
              label="返佣比例（%）">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Universal",
      data(){
          return{
            tableData:[
              {
                level:'第一级代理',
                amount_tol:'0',
                proportion:'10000',
                commission:'0.2'
              }
            ]
          }
      }
    }
</script>

<style scoped>

</style>
<!--全民返佣-->

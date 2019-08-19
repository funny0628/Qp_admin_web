<template>
  <div id="SalesList">
    <div class="content" style="padding: 100px 20px 0 20px">
      <template>
        <el-table
          :data="tableData"
          border
          :header-cell-style="{background:'#f2f2f2',color:'#606266'}"
          style="width: 100%">
          <el-table-column
            prop="user_id"
            label="用户ID"
            align="center"
            width="">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户昵称"
            align="center"
            width="">
          </el-table-column>
          <el-table-column
            prop="team_result"
            align="center"
            label="团队业绩">
          </el-table-column>
          <el-table-column
            prop="ratio"
            align="center"
            label="返佣比例">
          </el-table-column>
          <el-table-column
            prop="team_ratio"
            align="center"
            label="团队业绩总金额">
          </el-table-column>
          <el-table-column
            prop="obtain_ratio"
            align="center"
            label="获得返佣">
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SalesList",
    data(){
      return{
        tableData:[
          {
            user_id:'1001100',
            user_name:'武广',
            team_result:'1000000.00',
            ratio:'6',
            team_ratio:'600.00',
            obtain_ratio:'100.00'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
<!--业绩返佣列表-->

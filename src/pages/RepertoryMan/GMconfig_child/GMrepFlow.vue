<template>
  <div id="GMrepFlow-main">
<!-- title -->
<div class="title">
      <el-input v-model="user_id" placeholder="请输入用户id" style="width:200px" size="medium" clearable></el-input>
      <el-select v-model="room_status" placeholder="房间选择" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        value-format="timestamp"
      ></el-date-picker>
      <el-button type="primary" @click="search">搜索</el-button>
</div>

    <!-- table -->
    <div class="table">
       <el-table
        border
        highlight-current-row
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column  prop="uid" label="uid" align="center">
        </el-table-column>
        <el-table-column prop="table_type" label="房间类型" align="center">
        </el-table-column>
        <el-table-column
          prop="add_coins"
          label="金币变化值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="by_web" 
          label="是否后台添加"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="gm_add_coins"
          label="后台添加GM总值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          
          prop="date"
          label="时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
       <!-- 分页 -->
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
  name: "GMrepFlow",

  data() {
    return {
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
      value2: [],
      tableData:[],
      platforms: [],
      user_id: "",
      room_status: "",
      currentPage:1,
      limit:10,
      total:'',
    
    };
  },
  created() {
    let today = new Date().getTime();
    
    this.value2[this.value2.length] = today - 60 * 60 * 24 * 7 * 1000;
    this.value2[this.value2.length] = today
    // console.log(this.value2);    
    this.initGame()
    this.getData()
  },
  methods: {
    /**搜索*/
    search() {

      this.getData()
    },


    //页容量变化
    handleSizeChange(num){
      this.limit = num
      this.currentPage = 1
      this.getData()
    },

    //页码变化
    handleCurrentChange(pagenum){
      this.currentPage = pagenum
      this.getData()
    },


     getData() {
      this.initData({
        page: this.currentPage,
        limit: this.limit,
        start_time:  Math.ceil(this.value2[0] / 1000),
        end_time: Math.ceil(this.value2[1] / 1000),
        uid:this.user_id === '' ? 0 : +this.user_id,
        table_type: this.room_status === "" ? 0 : this.room_status
      });
    },


    //获取表格和数据
     async initData(params){
      let {data} = await this.$http.OperationMan.GetGameWater(params)
      // console.log(data);
      this.total = data.total
      data.data.forEach((item)=>{
        item.by_web = item.by_web === 1 ? '是' : '不是'
      })
      this.tableData = data.data
    },

    //获取素有子游戏
     async initGame(params){
      let {data} = await this.$http.OperationMan.GetSonGame({type_id:5})
      // console.log(data);
      data.data.forEach((item)=>{
        this.platforms.push({value:item.game_id,label:item.game_name})
      })
      this.platforms.unshift({value:'',label:'房间选择'})
      // console.log(this.platforms);
    },


  },
};
</script>

<style scoped lang="less">
#GMrepFlow-main  {
  .table {
    margin-top: 20px;
  }
}


</style>

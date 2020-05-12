<template>
  <div id="playerSys">
      <!-- title -->
    <div class="title">
      <el-input v-model="uid" style="margin-top:10px;width:200px" placeholder="用户ID"></el-input>
      <el-date-picker
        style="margin-top:10px;width:200px"
        v-model="start_time"
        type="date"
        placeholder="选择日期"
        format="yyyyMMdd"
        value-format="timestamp"
      >
      </el-date-picker>
      -
      <el-date-picker
        style="margin-top:10px;width:200px"
        v-model="end_time"
        type="date"
        placeholder="选择日期"
        format="yyyyMMdd"
        value-format="timestamp"
      >
      </el-date-picker>
      实际盈亏 <el-input v-model="max" style="margin-top:10px;width:200px" placeholder="0"></el-input>- <el-input v-model="min" style="margin-top:10px;width:200px" placeholder="0"></el-input>
      <el-button type="primary" @click="search">查找</el-button>
    </div>
      <!-- table -->
    <div class="table">
      <el-table
        :default-sort="{ prop: 'date', order: 'descending' }"
        :data="tableData"
        highlight-current-row
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column
        v-for="(item,index) in titleData"
        :key="index"
          :fixed="(item.label === '新增日' || item.label === '新增用户' || item.label === '平均价值') ? 'left' : false"
          :prop="item.prop"
          :label="item.label"
          align="center"
          width="120"
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
    name:'data_analysis',
    data() {
        return {
            uid:"",
            start_time:'',
            end_time:'',
            max:"",
            min:"",
            currentPage:1,
            limit:10,
            total:0,
            tableData:[],
            titleData:[
                {
                    prop:"uid",
                    label:"用户名ID",
                },
                {
                    prop:"nickname",
                    label:"	用户昵称",
                },
                {
                    prop:"recharge",
                    label:"	充值",
                },
                {
                    prop:"exchange",
                    label:"	兑换",
                },
                {
                    prop:"water",
                    label:"流水",
                },
                {
                    prop:"diff",
                    label:"充值兑换差额",
                },
                {
                    prop:"gold",
                    label:"总金币",
                },
                {
                    prop:"subnum",
                    label:"下级用户与代理",
                },
                {
                    prop:"team_recharge",
                    label:"	团队充值",
                },
                {
                    prop:"team_exchange",
                    label:"	团队兑换",
                },
                {
                    prop:"team_agent_withdraw",
                    label:"团队代理提现",
                },
                {
                    prop:"agent_rebate",
                    label:"代理收益",
                },
                {
                    prop:"game_winlose",
                    label:"	游戏输赢",
                },
                {
                    prop:"ative_winlose",
                    label:"	实际输赢",
                },
            ],
        }
    },
    created() {
        let today = new Date().getTime();
        this.start_time = today
        this.end_time = today
        this.initData()
    },
    methods: {
        //搜索 
        search(){
            this.initData() 
        },

        //页容量变化
        handleSizeChange(num){
            this.limit = num;
            this.currentPage = 1
            this.initData()
        },

        //页码变化
        handleCurrentChange(pagenum){
            this.currentPage = pagenum
            this.initData()  
        },

        initTime(today) {
            let myDate = new Date(today);
            let year = myDate.getFullYear();
            let month = myDate.getMonth() + 1 < 10 ? '0' +  (myDate.getMonth() + 1) :  myDate.getMonth() + 1;
            let day = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
            return `${year}${month}${day}`;
        },

        async initData(){
            // console.log(+this.initTime(this.start_time),this.start_time);
            let {data} = await this.$http.DataAnalysis.GetStatisticsDay({
                page:this.currentPage,
                limit:this.limit,
                start_date:+this.initTime(this.start_time-60*60*24*1000*2),
                end_data:+this.initTime(this.end_time-60*60*24*1000*2),
                winlose_max: 0 || +this.max,
                winlose_min: 0 || +this.min,
                uid: 0 || +this.uid,
            })
            // console.log(data);
            this.tableData = data.data
            this.total = data.total
            if(data.data.length === 0){
                console.log('没有数据');
            }
        }
    },

}
</script>

<style lang="less" scoped>
#playerSys {
    padding: 20px;
    box-sizing: border-box;
    .table {
        margin-top: 20px;
    }
}

</style>
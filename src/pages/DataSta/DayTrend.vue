<!--每日趋势-->
<template>
  <div id="DayTrend-main">
    <div class="analysis">
      <div class="bar">数据分析(今日)</div>
      <div class="content">
        <ul>
          <li>
            <p class="title">主账户平台内余额</p>
            <p class="num">
              <span>1000.00</span> 元
            </p>
          </li>
          <li>
            <p class="title">今日充值</p>
            <p class="num">
              <span>10.00</span> 元
            </p>
          </li>
          <li>
            <p class="title">今日兑换</p>
            <p class="num">
              <span>10.00</span> 元
            </p>
          </li>
          <li>
            <p class="title">今日游戏盈亏</p>
            <p class="num">
              <span>10.00</span> 元
            </p>
          </li>
          <li>
            <p class="title">今日新增用户</p>
            <p class="num">
              <span>10.00</span> 元
            </p>
          </li>
          <li>
            <p class="title">今日活动人次</p>
            <p class="num">
              <span>200.00</span> 元
            </p>
          </li>
          <li>
            <p class="title">今日活动金额</p>
            <p class="num">
              <span>200.00</span> 元
            </p>
          </li>
        </ul>
      </div>
    </div>
    <input-area style="text-align: center;">
      <select-time :date="date" :select-time.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
    </input-area>
    <div class="LCharts">
      <div ref="LCharts" class="LContent"></div>
    </div>
  </div>
</template>

<script>
import SelectTime from "../../plugin/components/SelectTime";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import InputArea from "../../plugin/components/InputArea";

export default {
  name: "DayTrend",
  extends: BaseIframe,
  components: { InputArea, PermissionButton, SelectTime },
  data() {
    return {
      date: []
    };
  },
  methods: {
    search() {},
    /*L线图*/
    DrawLine() {
      let myChart = this.$echarts.init(this.$refs.LCharts);
      let option = {
        tooltip: {
          trigger: "axis"
        },
        color: ["blue", "red", "orange", "purple"],
        legend: {
          data: [
            {
              name: "主账户平台内余额",
              icon: "circle"
            },
            {
              name: "今日充值",
              icon: "circle"
            },
            {
              name: "今日兑换",
              icon: "circle"
            },
            {
              name: "今日游戏盈亏",
              icon: "circle"
            }
          ],
          bottom: 0,
          itemGap: 100
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          splitNumber: 0,
          show: true,
          axisTick: {
            show: false
          },
          axisPointer: {
            label: {
              color: "#666"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#e8e8e8"
            }
          },
          data: ["8.27", "8.28", "8.29", "8.30", "8.31", "9.1", "9.2"]
        },
        yAxis: {
          type: "value",
          show: false
        },
        series: [
          //弹框图
          {
            name: "主账户平台内余额",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "今日充值",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "今日兑换",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "今日游戏盈亏",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.DrawLine();
  }
};
</script>

<style scoped>
#DayTrend-main .analysis {
  width: 100%;
  padding: 15px 20px 0 20px;
}

#DayTrend-main .analysis .bar {
  width: 100%;
  height: 40px;
  border: 1px solid #e9e9e9;
  line-height: 40px;
  padding-left: 15px;
  font-weight: bold;
}

#DayTrend-main .analysis .content {
  border: 1px solid #e9e9e9;
  border-top: none;
}

#DayTrend-main .analysis .content ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-top: 10px;
  margin-left: 5px;
}

#DayTrend-main .analysis .content ul li {
  display: inline-block;
}

#DayTrend-main .analysis .content ul li .title {
  color: #999;
  font-weight: 500;
}

#DayTrend-main .analysis .content ul li .num {
  color: #999;
}

#DayTrend-main .analysis .content ul li .num span {
  color: #6f6f6f;
  font-size: 20px;
}
#DayTrend-main .LCharts {
  width: 100%;
  padding: 0 20px 0 20px;
  height: 400px;
}
#DayTrend-main .LCharts .LContent {
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
}
</style>

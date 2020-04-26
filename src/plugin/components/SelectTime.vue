<template>
  <div class="select-time">
    <el-date-picker
            type="daterange"
            v-model="selectDate"
            size="medium"
            :format="'yyyy'+ $t('_admin_plugin.year') + 'MM' + $t('_admin_plugin.month') + 'dd' + $t('_admin_plugin.day')"
            value-format="yyyy-MM-dd"
            range-separator="-"
            :start-placeholder="$t('_admin_plugin.time_min')"
            :end-placeholder="$t('_admin_plugin.time_max')"
            v-if="!isPhone"
    ></el-date-picker>
    <div class="mobile-date" v-else>
      <datetime v-model="mobileDate.startDate" :value="mobileDate.startDate" format="YYYY-MM-DD" class="no-select" @on-change="onStartTimeChange">
        <span v-if="mobileDate.startDate">{{mobileDate.startDate}}</span>
        <span v-else style="color:#aaa">{{$t('_admin_plugin.time_min')}}</span>
      </datetime>
      -
      <datetime v-model="mobileDate.endDate" :value="mobileDate.endDate" format="YYYY-MM-DD" class="no-select" @on-change="onEndTimeChange">
        <span v-if="mobileDate.endDate">{{mobileDate.endDate}}</span>
        <span v-else style="color:#aaa">{{$t('_admin_plugin.time_max')}}</span>
      </datetime>
    </div>
    <el-radio-group v-model="quickDate" size="medium" @change="handlerQuickDateChange">
      <el-radio-button label="month">{{$t('_admin_plugin.this_month')}}</el-radio-button>
      <el-radio-button label="week">{{$t('_admin_plugin.this_week')}}</el-radio-button>
      <el-radio-button label="day">{{$t('_admin_plugin.today')}}</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
  import utils from '../script/tools/utils';
  import {mapState} from 'vuex';
  import {Datetime} from 'vux';
  import BaseComponent from "../script/common/BaseComponent";

  /**
   * :date 默认数据
   * :select-date.sync 变更数据通知参数
   * **/

  export default {
    name: "SelectTime",
    extends: BaseComponent,
    components: {Datetime},
    props:{
      date: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    model: {
      prop: 'date',
      event: 'change'
    },
    data() {
      return {
        selectDate: this.date,
        quickDate: '',
        mobileDate: {
          startDate: '',
          endDate: ''
        }
      }
    },
    computed: {
      ...mapState(['isPhone'])
    },
    methods: {
      init(){},
      handlerQuickDateChange(val) {
        if (val === 'month') {
          this.selectDate = utils.getCurentMonth();
        } else if (val === 'week') {
          this.selectDate = utils.getCurentWeek();
        } else if (val === 'day') {
          this.selectDate = [utils.getToday(), utils.getToday()];
        }
        this.mobileDate.startDate = this.selectDate[0];
        this.mobileDate.endDate = this.selectDate[1];

        this.$forceUpdate();
      },
      checkTimeType(date) {
        if (!date || date.length !== 2)  {
          this.quickDate = ''
        } else if (date[0] === utils.getCurentMonth()[0] && date[1] === utils.getCurentMonth()[1]) {
          this.quickDate = 'month';
        } else if (date[0] === utils.getCurentWeek()[0] && date[1] === utils.getCurentWeek()[1])  {
          this.quickDate = 'week';
        } else if (date[0] === utils.getToday() && date[1] === utils.getToday())  {
          this.quickDate = 'day';
        } else {
          this.quickDate = ''
        }

      },
      onStartTimeChange(val) {

      },
      onEndTimeChange(val) {

      }
    },
    watch: {
      selectDate: {
        handler(newVal) {
          if (!this.selectDate) {
            this.selectDate = ["", ""];
            return;
          }

          this.$emit('change', arguments[0] || []);
          this.checkTimeType(this.selectDate);
        }
      },
      mobileDate: {
        handler(newVal) {
          this.selectDate = [newVal.startDate, newVal.endDate];
        },
        deep: true
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .select-time {display: inline-block;}
  .select-time .mobile-date {margin-right: 10px;width: 280px;height: 36px;line-height: 36px;color: rgb(96, 98, 102);border: 1px solid rgb(220, 223, 230);border-radius: 4px;display: flex;}
</style>
<style>
  .select-time .vux-datetime {flex:1;text-align: center}
</style>

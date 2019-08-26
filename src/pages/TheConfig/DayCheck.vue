<template>
  <div id="DayCheck-main">
    <div class="title">
      每日签到设置
    </div>
    <div class="content">
      <el-form ref="form" :model="formDate" label-width="100px" style="padding: 30px 0 30px 30px;">
        <el-form-item label="活动开启/关闭">
          <el-switch
            v-model="formDate.active"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="formDate.begin_time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="奖励配置">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="用户层级"
              width=""
              align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              label="第一天"
              width=""
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="第二天"
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="第三天"
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="第四天"
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="第五天"
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="第六天"
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="第七天"
              align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <div class="footer" style="text-align: center;">
          <el-button ><i class="el-icon-plus"></i>  添 加</el-button>
          <el-button type="primary" >保 存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import BaseIframe from '../../plugin/script/common/BaseIframe';
  export default {
    name: "DayCheck",
    extends:BaseIframe,
    data() {
      return {
        formDate: {
          active: false,
          begin_time: '',
        },
        tableData:[{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区',
          zip: 200333,
          tag: '家'
        }]
      }
    },
    methods:{
      handleDelete(row) {
        console.log(row);
      }
    }
  }
</script>

<style scoped>
  #DayCheck-main {
    width: 100%;
    padding: 15px 20px 0 20px;
  }

  #DayCheck-main .title {
    width: 100%;
    height: 50px;
    border: 1px solid #e9e9e9;
    line-height: 50px;
    padding-left: 15px;
    font-weight: bold;
    font-size: 16px;
  }

  #DayCheck-main .content {
    border: 1px solid #e9e9e9;
    border-top: none;
    height: 400px;
    width: 100%;
  }
</style>
<!--每日签到-->

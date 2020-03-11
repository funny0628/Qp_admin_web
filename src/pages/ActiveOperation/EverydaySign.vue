<!--每日签到-->
<template>
  <div id="EverydaySign-main">
    <div class="title">每日签到设置</div>
    <div class="content">
      <el-form ref="form" :model="format" style="padding: 30px 0 30px 30px;">
        <el-form-item label="活动开启/关闭" label-width="120px">
          <el-switch v-model="format.active" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="format.begin_time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="奖励配置">
          <div class="bd" style="padding-right:15px;">
            <info-table
              :search="search"
              :table-style="tableStyle"
              :records="records"
              :page-info="pageInfo"
              :hide-page="true"
            >
              <info-table-item :table-style="tableStyle">
                <template slot-scope="scope">
                  <template v-if="scope.prop === 'action'">
                    <permission-button
                      :action="btn.type"
                      v-for="(btn,index) in scope.row[scope.prop]"
                      :key="index"
                      @click="dialogVisible = true"
                      style="cursor: pointer; padding-left: 5px;"
                    >
                      <span>{{btn.label}}</span>
                    </permission-button>
                  </template>
                  <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
                </template>
              </info-table-item>
            </info-table>
          </div>
        </el-form-item>
        <el-form-item label="连续签到设定">
          <div class="bd" style="padding-right:15px;">
            <info-table
              :search="search"
              :table-style="tableStyle"
              :records="records"
              :page-info="pageInfo"
              :hide-page="true"
            >
              <info-table-item :table-style="tableStyle">
                <template slot-scope="scope">
                  <template v-if="scope.prop === 'action'">
                    <permission-button
                      :action="btn.type"
                      v-for="(btn,index) in scope.row[scope.prop]"
                      :key="index"
                      @click="handelClick(btn)"
                      style="cursor: pointer; padding-left: 5px;"
                    >
                      <span>{{btn.label}}</span>
                    </permission-button>
                  </template>
                  <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
                </template>
              </info-table-item>
            </info-table>
          </div>
        </el-form-item>
        <div class="footer" style="text-align:center;">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary">保 存</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog :title="dialogTitleType" center :visible.sync="dialogVisible" width="25%">
      <el-form :model="formDates" ref="dataForm" >
        <el-form-item label="用户层级" :label-width="labelWidth" class="el-item">
          <el-select v-model="formDates.level" clearable placeholder="请选择用户层级" style="width: 100%;">
            <el-option
              v-for="item in userLevels"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第一天" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formDates.day1" clearable></el-input>
        </el-form-item>
        <el-form-item label="第二天" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formDates.day2" clearable></el-input>
        </el-form-item>
        <el-form-item label="第三天" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formDates.day3" clearable></el-input>
        </el-form-item>
        <el-form-item label="第四天" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formDates.day4" clearable></el-input>
        </el-form-item>
        <el-form-item label="第五天" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formDates.day5" clearable></el-input>
        </el-form-item>
        <el-form-item label="第六天" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formDates.day6" clearable></el-input>
        </el-form-item>
        <el-form-item label="第七天" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formDates.day7" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import InfoTableItem from "../../plugin/components/InfoTableItem";
export default {
  name: "EverydaySign",
  extends: BaseIframe,
  components: { PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      format: {
        active: false,
        begin_time: ""
      },
      //表格数据
      tableStyle: [
        { label: "用户层级", prop: "user_level", width: "" },
        { label: "第一天", prop: "one", width: "" },
        { label: "第二天", prop: "two", width: "" },
        { label: "第三天", prop: "three", width: "" },
        { label: "第四天", prop: "four", width: "" },
        { label: "第五天", prop: "five", width: "" },
        { label: "第六天", prop: "six", width: "" },
        { label: "第七天", prop: "seven", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          user_level: "vip0",
          one: "10000.00",
          two: "1",
          three: "1",
          four: "1",
          five: "1",
          six: "1",
          seven: "1",
          action: [{ label: "修改", type: "edit" }]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0), // page pageSizes total
      dialogTitleType:'每日签到设置',
      dialogVisible:false,
      userLevels:[],
      labelWidth:'100px',
      formDates:{
        level:'',
        day1:'',
        day2:'',
        day3:'',
        day4:'',
        day5:'',
        day6:'',
        day7:''
      }
    };
  },
  methods: {
    search() {},
    confirm(){

    }
  }
};
</script>

<style scoped>
#EverydaySign-main {
  width: 100%;
  padding: 15px 20px 0 20px;
}

#EverydaySign-main .title {
  width: 100%;
  height: 50px;
  border: 1px solid #e9e9e9;
  line-height: 50px;
  padding-left: 15px;
  font-weight: bold;
  font-size: 16px;
}

#EverydaySign-main .content {
  border: 1px solid #e9e9e9;
  border-top: none;
  height: 100%;
  width: 100%;
}
.el-form-item__label {
    text-align: left;
}
  .el-item{
    width: 90%;
  }
</style>


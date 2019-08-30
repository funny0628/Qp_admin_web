<template>
  <div id="DayCheck-main">
    <div class="title">每日签到设置</div>
    <div class="content">
      <el-form ref="form" :model="formDate" style="padding: 30px 0 30px 30px;">
        <el-form-item label="活动开启/关闭" label-width="100px">
          <el-switch v-model="formDate.active" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="formDate.begin_time" type="date" placeholder="选择日期"></el-date-picker>
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
                      @click="handeClick(btn)"
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
          <el-button>
            <i class="el-icon-plus"></i> 添 加
          </el-button>
          <el-button type="primary">保 存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import InfoTableItem from "../../plugin/components/InfoTableItem";
export default {
  name: "DayCheck",
  extends: BaseIframe,
  components: { PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      formDate: {
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
          action: [{ label: "删除", type: "delete" }]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0) // page pageSizes total
    };
  },
  methods: {
    search() {},
    //表格操作
    handeClick(btn, row) {
      // consoloe.log(btn)
      if (btn.type === "delete") {
        console.log("删除");
      }
    }
  }
};
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

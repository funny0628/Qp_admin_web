<!--每日签到-->
<template>
  <div id="RedPackageRain-main">
    <div class="title">红包雨活动</div>
    <div class="content">
      <el-form :model="form2" style="width:30%;">
        <el-form-item>
          <table
            style="width: 80%;border-collapse: collapse;border-color: #e9e9e9"
            cellspacing="0"
            cellpadding="10"
          >
            <tr>
              <td style="width: 150px;text-align: center;background-color: #f2f2f2;">总赠送金额</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off" placeholder="(元)"></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 150px;text-align: center;background-color: #f2f2f2;">发红包个数</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 150px;text-align: center;background-color: #f2f2f2;">活动时间</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 150px;text-align: center;background-color: #f2f2f2;">每轮用户可领取数</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 150px;text-align: center;background-color: #f2f2f2;">红包雨持续时间</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 150px;text-align: center;background-color: #f2f2f2;">提示语</td>
              <td style="text-align: center">
                <el-input v-model="form2.name" autocomplete="off" placeholder></el-input>
              </td>
            </tr>
          </table>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">保 存</el-button>
      </div>
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
  name: "RedPackageRain",
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
      dialogTitleType: "每日签到设置",
      dialogVisible: false,
      userLevels: [],
      labelWidth: "100px",
      formDates: {
        level: "",
        day1: "",
        day2: "",
        day3: "",
        day4: "",
        day5: "",
        day6: "",
        day7: ""
      }
    };
  },
  methods: {
    search() {},
    confirm() {}
  }
};
</script>

<style scoped>
#RedPackageRain-main {
  width: 100%;
  padding: 15px 20px 0 20px;
}

#RedPackageRain-main .title {
  width: 100%;
  height: 50px;
  border: 1px solid #e9e9e9;
  background-color: #f2f2f2;
  line-height: 50px;
  padding-left: 15px;
  font-weight: bold;
  font-size: 16px;
}

#RedPackageRain-main .content {
  border: 1px solid #e9e9e9;
  border-top: none;
  padding: 20px;
  height: 100%;
  width: 100%;
}
.el-form-item__label {
  text-align: left;
}
.el-item {
  width: 90%;
}
table,table tr th, table tr td {
  border: 1px solid #e9e9e9;
}
</style>
<script>
export default {
  data() {
    return {
      dialogFormVisible: true,
      form2: {
        name: ""
      }
    };
  }
};
</script>
<!--充值优惠-->
<template>
  <div id="TopPref-main">
    <div class="title">活动配置</div>
    <div class="content">
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
      <div class="footer" style="text-align: center;padding-top: 30px;">
        <el-button>
          <i class="el-icon-plus"></i> 添 加
        </el-button>
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
  name: "TopPref",
  extends: BaseIframe,
  components: { PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      //表格数据
      tableStyle: [
        { label: "充值通道", prop: "up_channel", width: "" },
        { label: "充值金额（元）", prop: "up_money", width: "" },
        { label: "赠送方式：", prop: "given_type", width: "" },
        {
          label: "赠送金额（固定金额单位为元）",
          prop: "given_money",
          width: ""
        },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          up_channel: "0",
          up_money: "10000",
          given_type: "固定金额",
          given_money: "100000",
          action: [{ label: "删除", type: "delete" }]
        }
      ],
      pageInfo: new PageInfo(4, [5, 10, 15], 4),
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
#TopPref-main {
  width: 100%;
  padding: 15px 20px 0 20px;
}
#TopPref-main .title {
  width: 100%;
  height: 50px;
  border: 1px solid #e9e9e9;
  line-height: 50px;
  padding-left: 15px;
  font-weight: bold;
  font-size: 16px;
}
#TopPref-main .content {
  border: 1px solid #e9e9e9;
  border-top: none;
  height: 400px;
  width: 100%;
}
</style>

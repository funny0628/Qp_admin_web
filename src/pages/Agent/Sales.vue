<template>
  <div id="Sales-main">
    <div class="title">业绩返佣</div>
    <div class="content">
      <el-form ref="form" :model="formData" label-width="100px" style="padding: 30px 0 30px 30px;">
        <el-form-item label="活动开启/关闭">
          <i-switch v-model="formData.switch" size="large">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </el-form-item>
      </el-form>
      <div class="bd">
        <info-table
          :search="search"
          :table-style="tableStyle"
          :records="records"
          :page-info="pageInfo"
          :hide-page="true"
        >
          <info-table-item :table-style="tableStyle">
            <template slot-scope="scope">
              <template v-if="['rate_result'].indexOf(scope.prop) >= 0">
                <span placeholder="请输入内容">
                  <template slot="prepend">万分之</template>
                </span>
              </template>
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
  name: "Sales",
  extends: BaseIframe,
  components: { PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      formData: {
        active: false,
        switch: true
      },
      //表格数据
      tableStyle: [
        { label: "业绩区间", prop: "min_result", width: "" },
        { label: "业绩区间", prop: "max_result", width: "" },
        { label: "业绩返佣比例", prop: "rate_result", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          min_result: "1.00",
          max_result: "10000.00",
          rate_result: "1",
          action:[
            {label:''}
          ]
        }
      ]
    };
  },
  methods: {
    //删除
    handleDelete(row) {
      console.log(row);
    },
    //新增
    handelAdd() {}
  }
};
</script>

<style scoped>
#Sales-main {
  width: 100%;
  padding: 15px 20px 0 20px;
}

#Sales-main .title {
  width: 100%;
  height: 50px;
  border: 1px solid #e9e9e9;
  line-height: 50px;
  padding-left: 15px;
  font-weight: bold;
  font-size: 16px;
}

#Sales-main .content {
  border: 1px solid #e9e9e9;
  border-top: none;
  height: 600px;
  width: 100%;
}
</style>

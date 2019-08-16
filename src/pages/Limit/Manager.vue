<template>
<div class="manager">
    <permission-button :action="ActionType.ADD" @click="forward('setlimit', {type: 'add'})">
        <el-button type="primary" size="medium" class="addnewbtn">新增</el-button>
      </permission-button>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      ></info-table>
    </div>
</div>

</template>
<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
export default {
  extends: BaseIframe,
  components: { InfoTable, PermissionButton },
  data(){
      return{
        tableStyle: [
        { label: "序号", prop: "id", width: "" },
        { label: "角色名称", prop: "role", width: "" },
        { label: "角色描述", prop: "roledescribe", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "operate", width: "" },
      ],
      records: [],
      pageInfo: new PageInfo(0, [10, 15, 20], 0)
      }
  },
  methods: {
    search() {},
  }
}
</script>
<style scoped>
.addnewbtn{
    margin: 10px 20px;
    font-size: 16px!important;
    width: 120px!important;
    height: 35px!important;
}
</style>
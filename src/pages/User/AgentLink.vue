<!--代理链接管理-->
<template>
  <div id="AgentLink—main">
    <input-area>
      <el-input v-model="format.child_id" placeholder="子后台ID" size="medium" clearable></el-input>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-input v-model="format.channel_id" placeholder="请输入渠道id" size="medium" clearable></el-input>
      <el-input v-model="format.website" placeholder="代理链接" size="medium" clearable></el-input>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'user_type'.indexOf(scope.prop) >= 0">
              <span v-if="scope.row[scope.prop]  == 1">代理</span>
              <span v-else>普通用户</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handelClick(btn,scope.row)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template v-if="['action', 'user_type'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
  </div>
</template>

<script>
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import UserHandler from "../../script/handlers/UserHandler";

export default {
  name: "AgentLink",
  extends: BaseIframe,
  components: { InfoTableItem, InputArea, InfoTable, PermissionButton },
  data() {
    return {
      format: {
        uid: "",
        user_id: "",
        platform_id: "",
        website: ""
      },
      tableStyle: [
        { label: "渠道ID", prop: "platform_id", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "用户昵称", prop: "nickname", width: "" },
        { label: "用户身份", prop: "user_type", width: "" },
        { label: "代理链接", prop: "website", width: "" },
        { label: "注册人数", prop: "used", width: "" },
        { label: "操作", prop: "action", width: "200" }
      ],
      records: [
        {
          platform_id: "01",
          user_id: "1001100",
          nickname: "大牛比较懒",
          user_type: "第一级代理",
          website: "www.baidu.com",
          used: "10",
          action: [
            {
              label: "查看链接",
              type: "search"
            }
          ]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0)
    };
  },
  methods: {
    /***查询搜索 */
    search() {
      let data = this.format,user_id=1000;
      this.listInfo(data,user_id);
    },
    /**查看链接*/
    handelClick(btn,row) {
      console.log(btn,row);
      let url = row.website;
      // location.href = url;
    },
    getSpreadList() {
      let data = {
        platform_id: 1000,
        user_id: "",
        website: "",
        page_index: "",
        page_size: ""
      },user_id=1000;
      this.listInfo(data,user_id);
    },
    /**获取列表信息*/
    listInfo(data,user_id){
      UserHandler.spread_list(data,user_id).promise.then(res => {
        if (Number(res.code) === 200) {
          this.records = res.data.list;
        }
        /**数据处理*/
        this.records.map(item => {
          item.action = [
            {
              label: "查看链接",
              type: "search"
            }
          ];
        });
      });
    }
  },
  mounted() {
    this.getSpreadList();
  }
};
</script>

<style scoped>
</style>

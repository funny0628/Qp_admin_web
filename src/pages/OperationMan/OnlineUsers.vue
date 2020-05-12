<template>
  <div id="OnlineUsers-main">
    <input-area>
      <el-select v-model="format.game_name" size="medium">
        <el-option label="所有" :value="-1"></el-option>
        <el-option
          v-for="item in allGameType"
          :key="item.game_id"
          :label="item.game_name"
          :value="item.game_id"
        ></el-option>
      </el-select>
      <el-button type="primary" size="medium" @click="searchData">搜索</el-button>
    </input-area>
    <div class="bd">
      <info-table
        v-has="'online_users_records'"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hidePage="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="scope.prop === 'action'">
              <el-button size="mini" type="primary" @click="handleOffline(scope.row)">下线</el-button>
            </template>
            <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
      <el-pagination
        style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
         

<script>
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import UserHandler from "../../script/handlers/UserHandler";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "online_users",
  inject:['reload'],
  components: {
    InfoTableItem,
    InputArea,
    InfoTable
  },
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      total: 0,
      tableStyle: [
        { label: "玩家id", prop: "uid", width: "" },
        { label: "昵称", prop: "nickname", width: "" },
        { label: "所在位置", prop: "table_type", width: "" },
        { label: "携带金币额度", prop: "coins", width: "" },
        { label: "渠道来源", prop: "channel", width: "" },
        { label: "注册时间", prop: "created_time", width: "" },
        { label: "注册ip", prop: "ip", width: "" },
        { label: "最后登录ip", prop: "last_ip", width: "" },
        { label: "机器码", prop: "device_id", width: "" },
        { label: "操作", prop: "action", width: "150" }
      ],
      format: {
        game_name: -1
      },
      allGameType: [],
      records: [],
      status: 0, //在线
      pageInfo: new PageInfo(0, [5, 10, 15], 5)
    };
  },
  methods: {
    getOnlineUsersList() {
      this.$http
        .get("v1/backend/operation/online-users", {
          params: {
            page: this.currentPage,
            limit: this.pagesize,
            game_type: this.format.game_name
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.records = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    getAllGameType() {
      this.$http.get("v1/backend/operation/game-type").then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.allGameType = res.data.data;
        }
      });
    },
    searchData() {
      this.getOnlineUsersList();
    },
    handleOffline(row) {
      console.log(row);
      this.$confirm("确定踢该玩家下线吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            user_id: row.uid
          };
          this.$http
            .post("v1/backend/operation/online-users", data)
            .then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.getOnlineUsersList();
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getOnlineUsersList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOnlineUsersList();
    }
  },
  mounted() {
    this.getOnlineUsersList();
    this.getAllGameType();
  }
};
</script>

<style scoped>
#OnlineUsers-main .bd {
  padding-left: 20px;
}
#OnlineUsers-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#OnlineUsers-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#OnlineUsers-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
</style>

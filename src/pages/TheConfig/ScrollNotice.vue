<!--滚动公告-->
<template>
  <div id="ScrollNotice-main">
    <input-area>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">新增</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hidePage="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="['user_gold', 'money_change', 'time'].indexOf(scope.prop) >= 0">
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span v-if="Number(scope.row[scope.prop]) === 1">启用</span>
              <span v-else>禁用</span>
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
            <template
              v-if="['action', 'user_gold', 'money_change', 'time','status'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div class="dialog">
      <!-- 新增、修改 -->
      <el-dialog :title="dialogTitleType" :visible.sync="dialogVisible" width="30%" @close="reset" center>
        <el-form :model="formData" ref="formData">
          <el-form-item label="标题：" :label-width="labelWidth" prop="title">
            <el-input autocomplete="off" v-model="formData.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="播放间隔：" :label-width="labelWidth" prop="play_interval">
            <el-input autocomplete="off" v-model="formData.play_interval" placeholder="播放间隔（s）"></el-input>
          </el-form-item>
          <el-form-item label="开始时间：" :label-width="labelWidth" prop="enabled_at">
            <el-date-picker
              v-model="formData.enabled_at"
              type="date"
              placeholder="请选择开始时间"
              style="width: 100%;"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：" :label-width="labelWidth" prop="expired_at">
            <el-date-picker
              v-model="formData.expired_at"
              type="date"
              placeholder="请选择结束时间"
              style="width: 100%;"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="内容：" :label-width="labelWidth" prop="content">
            <el-input
              autocomplete="off"
              type="textarea"
              v-model="formData.content"
              placeholder="请输入滚动公告内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序：" :label-width="labelWidth" prop="notice_sorted">
            <el-input autocomplete="off" v-model="formData.notice_sorted" placeholder="数值越小越优先"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddEditClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PageInfo from "../../plugin/script/common/PageInfo";
import InfoTableItem from "../../plugin/components/InfoTableItem";
import InputArea from "../../plugin/components/InputArea";
import HallHandler from "../../script/handlers/HallHandler";

export default {
  name: "ScrollNotice",
  extends: BaseIframe,
  components: { InputArea, PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      tableStyle: [
        { label: "标题", prop: "title", width: "" },
        { label: "内容", prop: "content", width: "" },
        { label: "排序", prop: "notice_sorted", width: "" },
        { label: "开始时间／结束时间", prop: "time", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5), // page pageSizes total
      dialogTitleType: "",
      dialogVisible: false,
      labelWidth: "90px",
      formData: {
        notice_id: "",
        title: "",
        play_interval: "",
        enabled_at: "",
        expired_at: "",
        content: "",
        notice_sorted: ""
      }
    };
  },
  methods: {
    search() {
      this.dialogTitleType = "新增滚动公告";
      this.dialogVisible = true;
    },
    //表格操作
    handelClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogTitleType = "修改滚动公告";
        this.dialogVisible = true;
        this.formData.title = row.title;
        this.formData.play_interval = row.play_interval;
        this.formData.enabled_at = row.enabled_at;
        this.formData.expired_at = row.expired_at;
        this.formData.content = row.content;
        this.formData.notice_sorted = row.notice_sorted;
        this.formData.notice_id = row.notice_id;
      } else if (btn.type === "delete") {
        //删除
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = { notice_id: row.notice_id },
              user_id = 1000;
            this.handelDelete(data, user_id);
            this.getRollList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        //禁用
        let data = {
            notice_id: row.notice_id,
            status: Number(row.status) === 1 ? "2" : "1"
          },
          user_id = 1000;
        this.handelStatus(data, user_id);
        this.getRollList();
      }
    },
    //获取滚动公告
    getRollList() {
      let data = {
          notice_type: 1,
          platform_id: 1000
        },
        user_id = 1000;
      HallHandler.notice_list(data, user_id).promise.then(res => {
        if (Number(res.code) === 200) {
          this.records = res.data;
        }
        //数据处理
        let timeArr = [];
        this.records.map(item => {
          timeArr = [item.enabled_at, item.expired_at];
          item.action = [
            { label: "修改", type: "edit" },
            { label: "删除", type: "delete" },
            { label: "禁用", type: "disable" }
          ];
          item.time = timeArr;
        });
      });
    },
    /**弹窗操作*/
    AddEditClick() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          //通过notice_id来判断是新增还是修改
          if (!this.formData.notice_id) {
            //！notice_id就是新增的弹窗
            let data = {
                platform_id: 1000,
                notice_type: 1,
                title: this.formData.title,
                content: this.formData.content,
                status: 1,
                enabled_at: this.formData.enabled_at,
                expired_at: this.formData.expired_at,
                interval: this.formData.play_interval,
                notice_sorted: this.formData.notice_sorted
              },
              user_id = 1000;
            this.handelAdd(data, user_id);
            this.dialogVisible = false;
            //this.$refs["formData"].resetFields();
            this.getRollList(); // 失效
          } else {
            //修改
            console.log("这是修改");
            let data = {
                platform_id: 1000,
                notice_id: this.formData.notice_id,
                notice_type: 1,
                title: this.formData.title,
                content: this.formData.content,
                status: this.formData.status,
                enabled_at: this.formData.enabled_at,
                expired_at: this.formData.expired_at,
                notice_sorted: this.formData.notice_sorted
              },
              user_id = 1000;
            this.handelUpdate(data, user_id);
            this.dialogVisible = false;
            //this.$refs["formData"].resetFields(); // 失效
            this.getRollList();
          }
        }
      });
    },
    /**删除方法*/
    handelDelete(data, user_id) {
      HallHandler.notice_delete(data, user_id).promise.then(rs => {
        // console.log(rs);
        if (Number(rs.data) === 200) {
          this.$message({
            type: "success",
            message: rs.msg
          });
        } else {
          this.$message({
            type: "error",
            message: rs.msg
          });
        }
      });
    },
    /**修改*/
    handelUpdate(data, user_id) {
      HallHandler.notice_set(data, user_id)
        .promise.then(rs => {
          if (Number(rs.data) === 200) {
            this.$message.success(rs.msg);
          } else {
            this.$message.error(rs.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**新增*/
    handelAdd(data, user_id) {
      HallHandler.notice_add(data, user_id)
        .promise.then(rs => {
          // console.log(rs);
          if (Number(rs.data) === 200) {
            this.$message(rs.msg);
          } else {
            this.$message.error(rs.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**重置表单*/
    reset() {
      this.formData = this.$options.data().formData;
      this.dialogVisible = false;
    },
    /**启用或禁用公告*/
    handelStatus(data, user_id) {
      HallHandler.notice_status(data, user_id)
        .promise.then(res => {
          // console.log(res)
          if (Number(res.code) === 200) {
            this.$message(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getRollList();
  }
};
</script>

<style scoped>
#ScrollNotice-main .bd p {
  margin: 0;
}
</style>


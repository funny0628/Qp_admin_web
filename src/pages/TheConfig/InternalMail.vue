<!--内部邮件-->
<template>
  <div id="InternalMail-main">
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
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="['user_gold', 'money_change', 'time'].indexOf(scope.prop) >= 0">
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
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
              v-if="['action', 'user_gold', 'money_change', 'time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}
            </template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div class="dialog">
      <!-- 新增、修改 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" center>
        <el-form :model="formData" ref="formData">
          <el-form-item label="标题：" :label-width="labelWidth" style="width:90%" prop="title">
            <el-input autocomplete="off" v-model="formData.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="发送时间：" :label-width="labelWidth" style="width:90%" prop="begin_time">
            <el-date-picker
              v-model="formData.begin_time"
              type="date"
              style="width: 100%"
              placeholder="请选择开始时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="内容：" :label-width="labelWidth" style="width:90%" prop="content">
            <el-input
              autocomplete="off"
              v-model="formData.content"
              type="textarea"
              placeholder="请输入内部邮件内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="接收人：" :label-width="labelWidth" style="width:90%" prop="render">
            <el-input autocomplete="off" v-model="formData.render" placeholder="请输入接受人"></el-input>
          </el-form-item>
          <el-form-item label="接收层级：" :label-width="labelWidth" prop="checkedCities">
            <el-checkbox-group v-model="formData.checkedCities" style="width: 60%">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
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
  import InputArea from "../../plugin/components/InputArea";
  import InfoTableItem from "../../plugin/components/InfoTableItem";
  import HallHandler from "../../script/handlers/HallHandler";

  export default {
    name: "InternalMail",
    extends: BaseIframe,
    components: {InfoTableItem, InputArea, PermissionButton, InfoTable},
    data() {
      return {
        tableStyle: [
          {label: "标题", prop: "subject", width: ""},
          {label: "内容", prop: "content", width: ""},
          {label: "接收者", prop: "recipients", width: ""},
          {label: "发送人", prop: "sender", width: ""},
          {label: "发送时间", prop: "send_at", width: ""},
          {label: "操作", prop: "action", width: ""}
        ],
        records: [
          {
            subject: "金币兑换通知",
            content: "这边是内容",
            recipients: "vip1",
            sender: "admin",
            send_at: "2019-01-01 12:00:00",
            action: [
              {label: "删除", type: "delete"}
            ]
          }
        ],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        dialogTitle: "",
        dialogVisible: false,
        labelWidth: "100px",
        formData: {
          title: "",
          begin_time: "",
          content: "",
          render: "",
          checkedCities: ["vip1", "vip2"]
        },
        cities: ["vip1", "vip2", "vip3", "vip4", "vip5", "vip6"]
      };
    },
    methods: {
      search() {
        this.dialogTitle = "新增大厅海报";
        this.dialogVisible = true;
      },
      //表格操作
      handelClick(btn, row) {
        let data = {
          platform_id: 1000,
          email_id: row.email_id
        };
        this.handelDelete(data);
        this.getMailList();
      },
      //获取内部邮件列表
      getMailList() {
        let data = {
          platform_id: 1000,
          page_index: "",
          page_size: ""
        },user_id= 1000;
        HallHandler.email_list(data,user_id).promise.then(res => {
          console.log(res);
          if (Number(res.code) === 200) {
            this.records = [...this.records, ...res.data.list];
          }
          //数据处理
          this.records.map(item => {
            item.action = [
              {label: "删除", type: "delete"}
            ];
          });
        });
      },
      AddEditClick() {
        let data = {
          platform_id: 1000,
          subject: this.formData.subject,
          content: this.formData.content,
          sender: this.formData.sender,
          recipients: this.formData.recipients,
          send_at: this.formData.begin_time,
          vip: this.formData.checkedCities
        },user_id = 1000;
        this.handelAdd(data,user_id);
        this.getMailList();
        this.dialogVisible = false;
        this.$refs["formData"].resetFields(); // 失效
      },
      /**删除方法*/
      handelDelete(data) {
        HallHandler.email_delete(data).promise.then(rs => {
          console.log(rs);
        })
      },
      /**新增方法*/
      handelAdd(data,user_id) {
        HallHandler.email_add(data,user_id).promise.then(rs => {
          console.log(rs);
        })
      },
    },
    mounted() {
      this.getMailList();
    }
  };
</script>

<style scoped>
  #ScrollNotice-main .bd p {
    margin: 0;
  }
</style>

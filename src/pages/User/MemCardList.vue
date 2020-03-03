<!--银行卡列表-->
<template>
  <div id="MemCardList—main">
    <input-area>
      <el-input v-model="format.child_id" placeholder="子后台ID" size="medium" clearable></el-input>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-input v-model="format.platform_id" placeholder="请输入渠道id" size="medium" clearable></el-input>
      <el-input v-model="format.bank_card" placeholder="银行卡号" size="medium" clearable></el-input>
      <el-input v-model="format.card_name" placeholder="银行卡姓名" size="medium" clearable></el-input>
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
            <template
              v-if="['user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(scope.prop) >= 0"
            >
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
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <!--修改会员银行卡 -->
    <div>
      <el-dialog title="修改会员银行卡" :visible.sync="dialogModifyVisible" width="30%" center>
        <el-form :model="dialogData">
          <el-form-item label="持卡人姓名" label-width="100px">
            <el-input v-model="dialogData.bank_user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属银行" label-width="100px">
            <el-select v-model="dialogData.bank_name" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in banks"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行卡号" label-width="100px">
            <el-input v-model="dialogData.bank_card" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="银行卡开户行" label-width="100px">
            <el-input v-model="dialogData.subbranch" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属省份" label-width="100px">
            <el-select v-model="dialogData.province" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属城市" label-width="100px">
            <el-select v-model="dialogData.city" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in citys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogModifyVisible = false">取 消</el-button>
          <el-button type="primary" @click="editDialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import UserHandler from "../../script/handlers/UserHandler";
import PermissionButton from "../../plugin/components/PermissionButton";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "MemCardList",
  extends: BaseIframe,
  components: { InfoTableItem, InputArea, InfoTable, PermissionButton },
  data() {
    return {
      format: {
        child_id: "",
        user_id: "",
        platform_id: "",
        bank_card:'',
        card_name:'',
      },
      tableStyle: [
        { label: "渠道ID", prop: "platform_id", width: "" },
        { label: "用户ID", prop: "user_id", width: "" },
        { label: "所属银行", prop: "bank_name", width: "" },
        { label: "银行卡号", prop: "bank_card", width: "" },
        { label: "银行卡开户行", prop: "subbranch", width: "" },
        { label: "持卡人姓名", prop: "bank_user", width: "" },
        { label: "创建时间", prop: "created_at", width: "160" },
        { label: "修改时间", prop: "updated_at", width: "160" },
        { label: "操作", prop: "action", width: "200" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      /**修改银行卡信息*/
      dialogModifyVisible: false,
      dialogData: {},
      provinces: [],
      citys: [],
      banks: []
    };
  },
  methods: {
    /**搜索 */
    search() {
      let data = this.format,id=1000;
      UserHandler.bank_list(data,id).promise.then(res=>{
          if (Number(res.code) === 200) {
            this.records = res.data.list;
          }
          /**数据处理*/
          this.records.map(item => {
            item.action = [
              {
                label: "修改",
                type: "edit"
              },
              {
                label: "删除",
                type: "delete"
              }
            ];
          })
      })
    },
    /**表格操作*/
    handelClick(btn, row) {
      if (btn.type === "edit") {
        /**编辑*/
        this.dialogModifyVisible = true;
        this.dialogData = row;
      } else {
        /**删除会员银行卡信息*/
        let data = {
          uid: row.uid
        },user_id=1000;
        console.log(data);
        this.$confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            UserHandler.bank_delete(data,user_id).promise.then(res => {
              if(Number(res.code)===200){
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getBank_list()
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    /**编辑*/
    editDialog(){
      let data = {
        platform_id:1000,
        uid:this.dialogData.uid,
        bank_id:this.dialogData.bank_id,
        bank_user:this.dialogData.bank_user,
        bank_name:this.dialogData.bank_name,
        bank_card:this.dialogData.bank_card,
        country:this.dialogData.count,
        province: this.dialogData.country,
        city:this.dialogData.city,
        subbranch: this.dialogData.subbranch
      },user_id = 1000;
      UserHandler.bank_set(data,user_id).promise.then(res=>{
        console.log(res);
      })
    },
    /**会员银行卡列表*/
    getBank_list() {
      let data = {
        platform_id: 1000,
        user_id: "",
        bank_card: "",
        bank_user: ""
      },id=1000;
      UserHandler.bank_list(data,id).promise.then(res => {
        if (Number(res.code) === 200) {
          this.records = res.data.list;
        }
        /**数据处理*/
        this.records.map(item => {
          item.action = [
            {
              label: "修改",
              type: "edit"
            },
            {
              label: "删除",
              type: "delete"
            }
          ];
        });
      });
    },
  },
  mounted() {
    this.getBank_list();
  }
};
</script>

<style scoped>
</style>


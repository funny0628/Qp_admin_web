<!--银行卡列表-->
<template>
  <div id="MemCardList—main">
    <input-area>
      <el-input v-model="format.child_id" placeholder="子后台ID" size="medium"></el-input>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium"></el-input>
      <el-input v-model="format.channel_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-input v-model="format.bank_card" placeholder="银行卡号" size="medium"></el-input>
      <el-input v-model="format.cardholder_name" placeholder="银行卡姓名" size="medium"></el-input>
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
                @click="handeClick(btn,scope.row)"
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
            <el-input v-model="dialogData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属银行" label-width="100px">
            <el-select v-model="dialogData.bank" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in banks"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行卡号" label-width="100px">
            <el-input v-model="dialogData.card" autocomplete="off"></el-input>
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
          <el-button type="primary" @click="handelEdit">确 定</el-button>
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
    let $this = this;
    return {
      format: {
        child_id: "", //子后台id
        user_id: "", //用户id
        channel_id: "" //渠道id
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
      records: [
        {
          platform_id: "01",
          user_id: "1001100",
          bank_name: "中国银行",
          bank_card: "622790876671282917",
          bank_user: "北京朝阳支行",
          cardholder_name: "武广",
          created_at: "2019-03-06 12:00:00",
          updated_at: "2019-03-06 12:00:00",
          action: [
            {
              label: "修改",
              type: "edit"
            },
            {
              label: "删除",
              type: "delete"
            }
          ]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      /*修改银行卡信息*/
      dialogModifyVisible: false,
      dialogData: {
        name: "",
        bank: "",
        card: "",
        subbranch: "",
        province: "",
        city: ""
      },
      provinces: [
        {
          value: "1",
          label: "四川省"
        },
        {
          value: "2",
          label: "广东省"
        },
        {
          value: "3",
          label: "湖南省"
        },
        {
          value: "4",
          label: "云南省"
        },
        {
          value: "5",
          label: "福建省"
        }
      ],
      citys: [
        {
          value: "1",
          label: "成都市"
        },
        {
          value: "2",
          label: "北京市"
        },
        {
          value: "3",
          label: "上海市"
        },
        {
          value: "4",
          label: "天津市"
        },
        {
          value: "5",
          label: "重庆市"
        }
      ],
      banks: [
        {
          value: "1",
          label: "中国银行"
        },
        {
          value: "2",
          label: "交通银行"
        },
        {
          value: "3",
          label: "招商银行"
        },
        {
          value: "4",
          label: "广大银行"
        },
        {
          value: "5",
          label: "浦发银行"
        }
      ]
    };
  },
  methods: {
    search() {
      console.log("这是查询");
    },
    //表格操作
    handeClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogModifyVisible = true;
        // console.log(row)
        this.dialogData.name = row.bank_user;
        this.dialogData.bank = row.bank_name;
        this.dialogData.card = row.bank_card;
        this.dialogData.subbranch = row.subbranch;
        this.dialogData.province = row.province;
        this.dialogData.city = row.city;
      } else {
        // console.log('这是删除')
        let data = {
          bank_id: row.bank_id
        };
        this.$confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
           this.handelDelete(data);
            this.$message({
              type: "success",
              message: "删除成功!"
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
    //会员银行卡列表
    getBank_list() {
      let data = {
        platform_id: 1000,
        user_id: "",
        bank_card: "",
        bank_user: ""
      };
      UserHandler.bank_list(data).promise.then(res => {
        console.log(res);
        if (Number(res.code) === 200) {
          this.records = res.data.list;
        }
        //数据处理
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
    //删除方法
    handelDelete(data){
      UserHandler.bank_delete(data).promise.then(res => {
        console.log(res);
      });
    },
    //编辑方法
    handelEdit(data,user_id){
      UserHandler.bank_set(data,user_id).promise.then(res=>{
        console.log(res);
      })
    },
  },
  mounted() {
    this.getBank_list();
  }
};
</script>

<style scoped>
</style>


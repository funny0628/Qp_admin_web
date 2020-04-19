<template>
  <div id="GMrepFlow-main">
    <input-area>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium" clearable></el-input>
      <el-select v-model="format.order_status" placeholder="房间选择" clearable size="medium">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button type="primary" @click="search">搜索</el-button>

    </input-area>
    <!-- table -->
    <div class="table">
       <el-table
        border
        highlight-current-row
        ref="multipleTable"
        :data="tableDialog"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column  prop="id" label="uid" align="center">
        </el-table-column>
        <el-table-column prop="sort_num" label="房间类型" align="center">
        </el-table-column>
        <el-table-column
          prop="pay_name"
          label="金币变化值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_channel"
          label="是否后台添加"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_way"
          label="后台添加GM总值"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          
          prop="money_num"
          label="时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
         

<script>
import InfoTable from "../../../plugin/components/InfoTable";
import PageInfo from "../../../plugin/script/common/PageInfo";
import InputArea from "../../../plugin/components/InputArea";
import InfoTableItem from "../../../plugin/components/InfoTableItem";

export default {
  name: "GMrepFlow",
  components: {
    InfoTableItem,
    InputArea,
    InfoTable,
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: [1587225600000,1587225700000],
      tableDialog:[],
      platforms: [
        { value: 1, label: "全部" },
        { value: 2, label: "审核中" },
        { value: 3, label: "已拒绝" },
        { value: 4, label: "已关闭" },
        { value: 5, label: "已完成" },
        { value: 6, label: "申请中" },
      ],
      format: {
        user_id: "",
        order_status: ""
      },
   
      // records: [
      //   {
      //     order_id: "10012",
      //     channel_name: "主包",
      //     fun_1: "备份",
      //     fun_2: "排行榜",
      //     fun_3: "邮箱",
      //     fun_4: "客服",
      //     fun_5: "未设定",
      //     fun_6: "未设定",
      //     fun_7: "未设定",
      //     fun_8: "设定",
      //     operator: "json",
      //     create_time: "2020-02-10 12:00:00",
      //     action: ""
      //   }
      // ],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogAddVisible: false,
      // form: {
      //   checkList: ["0902代理01", "0902代理02"],
      //   function: "1",
      //   agent: 100,
      //   nickname: "",
      //   password: "",
      //   money_password: "",
      //   phone: "",
      //   user_type: "1"
      // }
    };
  },
  methods: {
    /**搜索*/
    search() {
      let data = this.format,
        user_id = 1000;
      this.userList(data, user_id);
    },
    /** 添加会员 */
    addUser() {
      this.dialogAddVisible = true;
    },
    handelClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogFormVisible = true;
      }
    },
    /**获取用户列表接口 */
    // userList(data, user_id) {
    //   UserHandler.list(data, user_id).promise.then(res => {
    //     if (Number(res.code) === 200) {
    //       this.records = res.data.list;
    //       /**数据处理*/
    //       let goldArr = [];
    //       let top_up_amount = "";
    //       let change_amount = "";
    //       let alipay_account = [];
    //       let personArr = [];
    //       this.records.map(item => {
    //         goldArr.push("总金额：" + item.money);
    //         goldArr.push("理财：" + item.fanancial);
    //         top_up_amount = item.pay_sum + "/" + item.pay_count;
    //         change_amount = item.draw_sum + "/" + item.draw_count;
    //         if (item.bank_info.length > 0) {
    //           item.bank_info.map(bank => {
    //             if (Number(bank.bank_id) !== 1) {
    //               /** 支付宝 **/
    //               personArr.push("开户人：" + bank.bank_user);
    //               personArr.push("卡号：" + bank.bank_card);
    //               personArr.push("开户行：" + bank.subbranch);
    //             } else {
    //               alipay_account.push("账号：" + bank.bank_card);
    //               alipay_account.push("名称：" + bank.bank_name);
    //             }
    //           });
    //         }
    //         item.action = [
    //           {
    //             label: "修改",
    //             type: "edit"
    //           },
    //           {
    //             label: "冻结",
    //             type: "freeze"
    //           },
    //           {
    //             label: "强制下线",
    //             type: "light"
    //           }
    //         ];
    //         item.user_gold = goldArr;
    //         item.top_up_amount = top_up_amount;
    //         item.change_amount = change_amount;
    //         item.alipay_account = alipay_account;
    //         item.account_person = personArr;
    //       });
    //     }
    //   });
    // }
  },
  mounted() {}
};
</script>

<style scoped>
#GMrepFlow-main .bd {
  padding-left: 20px;
}
#GMrepFlow-main .bd p {
  margin: 0;
}
#GMrepFlow-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
table {
  border-collapse: collapse;
}
</style>

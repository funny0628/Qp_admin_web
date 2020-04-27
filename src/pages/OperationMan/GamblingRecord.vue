<template>
  <div id="GamblingRecord-main">
    <input-area>
      <span>场次</span>
      <el-select v-model="format.session" placeholder="请选择" clearable size="medium">
        <el-option
          v-for="item in allGameType"
          :key="item.game_id"
          :label="item.game_name"
          :value="item.game_id"
        ></el-option>
      </el-select>
      <span>账号ID</span>
      <el-input v-model="format.id" placeholder="请输入账号id" style="width:20%;"></el-input>
      <span>时间范围</span>
      <el-date-picker
        v-model="format.dateArr"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        :clearable="false"
      ></el-date-picker>
      <el-button type="primary" @click="searchData">查找</el-button>
      <el-button type="primary">导出excel</el-button>
    </input-area>
    <div class="bd">
      <info-table
        v-has="'play_lists'"
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
        :hide-page="true"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="'begin_time'.indexOf(scope.prop) >= 0">
              <span>{{scope.row.begin_time | dateFormat}}</span>
            </template>
            <template v-if="'end_time'.indexOf(scope.prop) >= 0">
              <span>{{scope.row.end_time | dateFormat}}</span>
            </template>
            <template v-if="'all_user_count'.indexOf(scope.prop) >= 0">
              <span>{{scope.row.all_user_count + "/" + scope.row.true_user_count}}</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <el-button
                v-has="'play_detail'"
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)"
              >详情</el-button>
            </template>
            <template
              v-if="['action','all_user_count','begin_time','end_time'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}</template>
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
    <!-- 添加人工订单 -->
    <el-dialog title="添加人工订单" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="用户id" :label-width="formLabelWidth">
          <el-input v-model="form.user_id" autocomplete="off" placeholder="请输入用户id"></el-input>
        </el-form-item>
        <el-form-item label="付款方式" :label-width="formLabelWidth">
          <el-input v-model="form.pay_type" autocomplete="off" placeholder="人工充值"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" :label-width="formLabelWidth">
          <el-select v-model="form.goods_type" placeholder="请选择" style="width:100%;">
            <el-option label="金币" value="gold"></el-option>
            <el-option label="现金" value="money"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="form.money" autocomplete="off" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="确认金额" :label-width="formLabelWidth">
          <el-input v-model="form.check_money" autocomplete="off" placeholder="请确认输入金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 游戏详情  水果机 -->
    <el-dialog title="详情" :visible.sync="dialogFruitVisible">
      <el-form :model="form" style="background-color:#f2f2f2;">
        <div style="width:100%;height:30px;line-height:30px;">{{tableName}}</div>
        <table border="1" width="100%" style="text-align:center;background-color:#fff;">
          <tr>
            <td>下注线数:{{exinfo.bet_lines}}</td>
          </tr>
          <tr>
            <td>单注金额:{{exinfo.bet_score}}</td>
          </tr>
          <tr>
            <td>获胜:{{exinfo.add_score}}</td>
          </tr>
          <tr>
            <td>彩金:{{exinfo.caijin_coins}}</td>
          </tr>
          <tr>
            <td>免费次数:{{exinfo.free_times}}</td>
          </tr>
        </table>
        <div
          style="border:1px solid #e6e6e6;height:30px;line-height:30px;border-bottom:none;text-align:center;margin-top:10px;background-color:#fff;"
        >开奖结果</div>
        <table border="1" width="100%" style="text-align:center;background-color:#fff;">
          <tr v-for="(item,index1) in tableData" :key="index1">
            <td v-for="(ele,index2) in item" :key="index2">{{ele}}</td>
          </tr>
        </table>
        <div
          style="border:1px solid #e6e6e6;height:30px;line-height:30px;border-top:none;text-align:center;background-color:#fff;"
        >
          <div v-for="(item,index) in lineData" :key="index" style="width:100%;">
            <span>第{{item.line_num}}线,获得{{item.line_times}}倍</span>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 游戏详情  抢牛庄庄 -->
    <el-dialog title="详情" :visible.sync="dialogCowVisible">
      <el-form :model="form" style="background-color:#f2f2f2;">
        <div
          style="width:100%;height:30px;line-height:30px;"
        >{{tableName}}{{'------'}}{{"系统控制类:"+system_result}}</div>
        <table border="1" width="100%" style="text-align:center;background-color:#fff;">
          <tr v-for="(item,index) in tableData" :key="index">
            <td width="100" v-if="item.is_banker===false">闲家,id: {{item.uid}}</td>
            <td width="100" v-else>庄家,id: {{item.uid}}</td>
            <td width="100">叫庄倍数* {{item.banker_times}}</td>
            <td width="100">叫倍* {{item.bet_times}}</td>
            <td width="100">{{item.card_type}}</td>
            <td width="100">{{String(item.cards)}}</td>
            <td width="100">{{item.card_times}}</td>
            <td width="100">{{item.add_score}}</td>
          </tr>
          <tr />
          <tr></tr>
        </table>
      </el-form>
    </el-dialog>
    <!-- 游戏详情  斗地主 -->
    <el-dialog title="详情" :visible.sync="dialogLandlordVisible" width="60%">
      <el-form :model="form" style="background-color:#f2f2f2;">
        <div style="width:100%;height:30px;line-height:30px;">{{tableName}}</div>
        <table border="1" width="100%" style="text-align:center;background-color:#fff;">
          <tr>
            <td colspan="5">底注: {{exinfo.difen}},叫分: {{exinfo.jiaofen}}</td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="(item,index) in tableData" :key="index">
            <td width="100">id: {{item.uid}}</td>
            <td width="100">{{item.jiaofen}}分</td>
            <td width="100" v-if="item.jiabei === true">加倍</td>
            <td width="100" v-else>不加倍</td>
            <td width="100" v-if="item.is_banker === true">{{String(item.dizhu_cards)}}</td>
            <td width="100" v-else></td>
            <td width="100">{{String(item.cards)}}</td>
            <td width="100">炸弹数: {{item.zhadan_num}}</td>
            <td width="100">输赢: {{item.add_score}}</td>
          </tr>
        </table>
      </el-form>
    </el-dialog>
    <!-- 游戏详情  捕鱼 -->
    <el-dialog title="详情" :visible.sync="dialogFishVisible" width="60%">
      <el-form :model="form" style="background-color:#f2f2f2;">
        <div style="width:100%;height:30px;line-height:30px;">{{tableName}}</div>
        <el-table border :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="玩家id" width="180"></el-table-column>
          <el-table-column prop="name" label="游戏前的金币" width="180"></el-table-column>
          <el-table-column prop="address" label="游戏后的金币"></el-table-column>
          <el-table-column prop="address" label="输赢金额"></el-table-column>
          <el-table-column prop="address" label="台费"></el-table-column>
        </el-table>
      </el-form>
    </el-dialog>
    <!-- 游戏详情  百家乐-传奇 -->
    <el-dialog title="详情" :visible.sync="dialogBaihapVisible" width="70%">
      <el-form :model="form" style="background-color:#f2f2f2;">
        <div style="width:100%;height:30px;line-height:30px;">{{tableName}}{{'------'}}{{"系统控制类:"+system_result}}{{"------系统控制结果:"+err_result}}</div>
        <table border="1" width="100%" style="text-align:center;background-color:#fff;">
          <tr v-for="(item,index) in tableData" :key="index">
            <td width="150">{{item.side}}</td>
            <td width="150" v-if="item.cards">{{String(item.cards)}} <span v-if="item.win===true" style="font-size:20px;color:#ff6746;">赢</span><span v-else style="font-size:20px;color:#55b97b;">输</span></td>
            <td width="150" v-else><span>否</span></td>
            <td width="200" style="color:#129e90;">总输赢: {{item.total_side_win}}&nbsp;&nbsp;&nbsp;&nbsp;总下注:{{item.bet_coins}}</td>
            <td width="200" style="color:#129e90;">玩家输赢: {{item.player_side_win}}&nbsp;&nbsp;&nbsp;&nbsp;玩家下注:{{item.player_bet_coins}}</td>
            <td width="150">非免佣: {{item.bet_coins_not_commission}}&nbsp;&nbsp;&nbsp;&nbsp;免佣:{{item.bet_coins_commission}}</td>
          </tr>
        </table>
        <table border="1" width="100%" style="text-align:center;background-color:#fff;">
          <tr>
            <th>玩家id</th>
            <th>下注模式</th>
            <th>庄家</th>
            <th>闲家</th>
            <th>和</th>
            <th>庄对</th>
            <th>闲对</th>
            <th>输赢金额</th>
            <th>台费</th>
          </tr>
          <tr>
            
          </tr>
        </table>
      </el-form>
    </el-dialog>
  </div>
</template>
         

<script>
import SelectTime from "../../plugin/components/SelectTime";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import UserHandler from "../../script/handlers/UserHandler";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "play_records",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      total: 0,
      formLabelWidth: "120px",
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
      allGameType: [],
      format: {
        session: "",
        id: "",
        dateArr: [
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
          new Date()
        ]
      },
      tableStyle: [
        { label: "牌局号", prop: "table_gid", width: "" },
        { label: "房间类型", prop: "table_name", width: "" },
        { label: "游戏时间(开始)", prop: "begin_time", width: "" },
        { label: "游戏时间(结束)", prop: "end_time", width: "" },
        { label: "参与人数/机器人", prop: "all_user_count", width: "" },
        { label: "玩家总输赢", prop: "total_win", width: "" },
        { label: "台费", prop: "total_fee", width: "" },
        { label: "玩家id", prop: "true_user", width: "" },
        { label: "操作", prop: "action", width: "150" }
      ],
      records: [],
      pageInfo: new PageInfo(0, [5, 10, 15], 5),
      dialogFormVisible: false,
      form: {
        user_id: "",
        pay_type: "1",
        goods_type: 100,
        money: "",
        check_money: ""
      },
      dialogFruitVisible: false, //水果机
      tableName: "",
      exinfo: {},
      tableData: [],
      lineData: [],
      dialogCowVisible: false, //抢牛庄主
      system_result: "",
      err_result: "",
      dialogLandlordVisible: false, //斗地主
      dialogFishVisible: false,//捕鱼达人
      dialogBaihapVisible:false,//百家乐
    };
  },
  methods: {
    getPlayList() {
      let params = {
        page: this.currentPage,
        limit: this.pagesize
      };
      this.$http
        .get("v1/backend/operation/play/records", {
          params
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.records = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    /**搜索*/
    search() {},
    searchData() {
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        table_type: Number(this.format.session),
        user_id: Number(this.format.id),
        start_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[0])).getTime() / 1000)
          : 0,
        end_time: this.format.dateArr
          ? parseInt(new Date(Number(this.format.dateArr[1])).getTime() / 1000)
          : 0
      };
      this.$http
        .get("v1/backend/operation/play/records", {
          params
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
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
    handleEdit(row) {
      console.log(row);
      this.$http
        .get("v1/backend/operation/play/detail", {
          params: {
            table_gid: row.table_gid
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.tableName = res.data.data.table_name;
            if (res.data.data.game_name == "水果机") {
              this.dialogFruitVisible = true;
              // this.tableName = res.data.data.table_name;
              this.exinfo = res.data.data.exinfo;
              this.tableData = res.data.data.exinfo.result_shape;
              this.lineData = res.data.data.exinfo.lines;
            } else if (res.data.data.game_name == "抢庄牛牛") {
              this.dialogCowVisible = true;
              // this.tableName = res.data.data.table_name
              this.system_result = res.data.data.exinfo.system_result;
              this.tableData = res.data.data.side_list;
            } else if (res.data.data.game_name == "斗地主") {
              this.dialogLandlordVisible = true;
              this.exinfo = res.data.data.exinfo
              this.tableData = res.data.data.side_list;
            } else if (res.data.data.game_name == "捕鱼达人") {
              this.dialogFishVisible = true;
            }else if(res.data.data.game_name == "百家乐") {
              this.dialogBaihapVisible = true
              this.system_result = res.data.data.exinfo.system_result;
              this.err_result = res.data.data.exinfo.err_result;
              this.tableData = res.data.data.side_list
            }
          }
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getPlayList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPlayList();
    },
    Change() {
      var myTable;
      myTable = document.getElementById("tbltest");
      var TDcount = myTable.firstChild.children[0].children.length;

      for (i = 0; i < TDcount; i++) {
        //添加转换后的tbody内的子元素
        myTable.firstChild.appendChild(
          creatTR(myTable.firstChild.children[0].children[i].innerHTML)
        );
      }

      //删除原始的tbody内的子元素
      myTable.firstChild.removeChild(myTable.firstChild.children[0]);
    },

    //根据传进来的内如形成一行
    creatTR(innetHTML) {
      var newTD = document.createElement("TD");
      newTD.innerText = innetHTML;
      var newTR = document.createElement("TR");
      newTR.appendChild(newTD);
      return newTR;
    }
  },
  mounted() {
    this.getPlayList();
    this.getAllGameType();
  }
};
</script>

<style scoped>
#GamblingRecord-main .bd {
  padding-left: 20px;
}
#GamblingRecord-main .bd p {
  margin: 0;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  margin-left: 0px;
}
#GamblingRecord-main >>> .el-date-editor .el-range-separator {
  width: 10%;
}
#home .main-box .input-area >>> .el-date-editor {
  width: auto;
}
#GamblingRecord-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
table {
  border-collapse: collapse;
  border: none;
}
table,
tr,
td {
  border-color: #e6e6e6;
  text-align: center;
}
tr {
  height: 50px;
}
</style>

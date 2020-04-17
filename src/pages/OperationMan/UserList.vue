<template>
  <div id="UserList-main">
    <!-- title -->
    <div class="title">
      UID<el-input
        v-model="input"
        style="margin-top:10px;width:200px"
      ></el-input>
      手机号码<el-input
        v-model="input"
        style="margin-top:10px;width:200px"
      ></el-input>
      IP
      <el-input v-model="input" style="margin-top:10px;width:200px"></el-input>
      渠道<el-select v-model="value" style="margin-top:10px;width:200px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      状态<el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      vip等级<el-select
        v-model="value"
        placeholder="请选择"
        style="margin-top:10px;width:200px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      日期
      <el-date-picker
        style="margin-top:10px;width:200px"
        v-model="form.end_time"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="timestamp"
      >
      </el-date-picker>
      -
      <el-date-picker
        style="margin-top:10px;width:200px"
        v-model="form.end_time"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="timestamp"
      >
      </el-date-picker>
      <el-button type="primary" @click="search">查找</el-button>
    </div>

    <!-- table -->
    <div class="table">
      <el-table
        :data="tableData"
        highlight-current-row
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="date"
          label="玩家Id"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="玩家昵称"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="账号类型"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="date" label="vip等级" align="center" width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          label="累计充值"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="手机号码"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="date" label="渠道" align="center" width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          label="注册时间"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="date" label="创建IP" align="center" width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          label="最后登录时间"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="最后充值时间"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="最后登陆IP"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="银行卡信息"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="支付宝信息"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="客户端版本"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="date" label="机器码" align="center" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <!-- 正式用户才有 -->
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small"
              >修改登陆密码</el-button
            > -->
            <el-button size="mini" type="danger" @click="handleClick(scope.row)"
              >封号</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- dialog -->
    <div class="dialog">
      <el-dialog title="用户详情" :visible.sync="visible" width="50%">
        <div class="msg">
          <div class="left">
            <p class="image">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587117883027&di=6f4043c74c615c71e54ae49211f71f12&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg"
                alt=""
              />
            </p>
            <p>名字</p>
            <p>状态:</p>
          </div>
          <div class="right">
            <p class="title">基本信息</p>
            <div class="item">
              <div class="i-f">
                <p>uid/昵称:10456/名字</p>
                <p>注册时间:2020-04-16 15:18:51</p>
                <p>最后登陆时间:2020-04-16 15:18:51</p>
                <p>手机号:</p>
                <p>渠道:windows</p>
              </div>
              <div class="i-r">
                <p>性别:男</p>
                <p>注册IP:192.168.1.61</p>
                <p>最后登陆IP:192.168.1.61</p>
                <p>设备号:122312</p>
                <p>客户端版本号:1.0.0</p>
              </div>
            </div>
            <p class="title">累计信息</p>
            <div class="item">
              <div class="i-f">
                <p>首次充值时间:10456/名字</p>
                <p>金币余额:2020-04-16 15:18:51</p>
                <p>保险箱金币:2020-04-16 15:18:51</p>
                <p>累计充值:</p>
                <p>累计赢金币:windows</p>
                <p>累计充值数量:windows</p>
              </div>
              <div class="i-r">
                <p>最后充值时间:男</p>
                <p>累计兑换:192.168.1.61</p>
                <p>累计扣台费:192.168.1.61</p>
                <p>累计押注:122312</p>
                <p>vip等级:1.0.0</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <el-table
            :data="tableData"
            highlight-current-row
            tooltip-effect="dark"
            border
            style="width: 100%"
          >
            <el-table-column prop="date" label="UID" align="center" width="120">
            </el-table-column>
            <el-table-column
              prop="date"
              label="	封号状态"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="原因"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="结束时间"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="最后修改的操作人"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="操作时间"
              align="center"
              width="120"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BaseIframe from "../../plugin/script/common/BaseIframe";
export default {
  name: "UserList",
  extends: BaseIframe,

  data() {
    return {
      visible: false,
      input: "",
      value: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ],

      options: [
        { value: "1", label: "启用" },
        { value: "2", label: "在线" },
        { value: "3", label: "离线" },
        { value: "4", label: "冻结" }
      ],

      form: {
        user_id: "",
        pay_type: "1",
        goods_type: 100,
        money: "",
        check_money: ""
      }
    };
  },

  async created() {
    console.log("000000");

    let data = await this.$http.OperationMan.GetUsers({ page: 1, limit: 10 });
    console.log(data);
  },

  methods: {
    getUserList() {
      this.$http.get('v1/backend/operation/users').then(res=>{
        console.log(res)
      })
    },
    /**搜索*/
    search() {},
    handleClick(btn, row) {
      if (btn.type === "edit") {
        this.dialogFormVisible = true;
      }
    },
    handleEdit() {
      console.log("-------");

      this.visible = true;
    }
  }
};
</script>

<style scoped lang="less">
#UserList-main {
  background-color: #f2f2f2;
  .title {
    padding: 10px;
    box-sizing: border-box;
    p {
      margin: 0;
      padding: 0;
    }
  }
  .table {
    margin-top: 10px;
  }
  .dialog {
    .msg {
      display: flex;
      justify-content: space-between;
      align-items: top;
      .left {
        flex: 1;
        .image {
          width: 100px;
          height: 100px;
          border: 1px solid red;
          background-color: red;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .right {
        flex: 3;
        .title {
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: #eee;
          height: 30px;
          line-height: 30px;
        }
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>

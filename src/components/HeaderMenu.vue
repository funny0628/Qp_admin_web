<template>
  <div id="header-menu">
    <ul>
      <li v-for="(item, index) in menu" :key="index" @click="forward(item.name,item.count)">
        <el-badge :value="item.count" :hidden="item.count <= 0" :max="99">{{item.label}}</el-badge>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      intervalId: null,
      menu: {
        // userBanker: {
        //   name: 'userBanker',
        //   count: 0,
        //   label: '银商'
        // }, // 银商
        bank: {
          name: "bank_card",
          count: 0,
          label: "银行卡"
        }, // 银行卡
        thirdPay: {
          name: "order_manage",
          count: 0,
          label: "第三方"
        }, // 第三方
        withdraw: {
          name: "withdraw_records",
          count: 0,
          label: "兑换"
        } // 兑换
        // recharge: {
        //   name: 'recharge',
        //   count: 0,
        //   label: '充值'
        // }
      }
    };
  },
  methods: {
    forward(name, count) {
      this.$emit("forward", { name }, count);
    },
    newMsgSearch() {
      this.$http.get("v1/backend/operation/withdraw/notice").then(res => {
        console.log(res);
        if (res.data.code == 200) {
          if (res.data.data.unread_total) {
            this.menu.withdraw.count = res.data.data.unread_total;
            console.log(this.menu.withdraw.count)
          }
        }
      });
    }
  },
  created() {
    this.newMsgSearch();
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.intervalId = setInterval(() => {
      this.newMsgSearch();
    }, 1000*30);
  },
  // mounted() {
  //   this.newMsgSearch();
  //   this.intervalId = setInterval(() => {
  //     this.newMsgSearch();
  //   }, 1000 * 60 * 60);
  // },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>

<style>
#header-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-right: 10px;
}
#header-menu ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
}
#header-menu ul li {
  display: inline-block;
  cursor: pointer;
}
#header-menu ul li .el-badge sup {
  border: none;
}
</style>

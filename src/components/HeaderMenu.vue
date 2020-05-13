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
import bus from "../assets/js/bus.js";
import BaseIframe from "../plugin/script/common/BaseIframe";
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
    resetMenu() {
      this.menu = {
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
      };
    },
    forward(name, count) {
      this.$emit("forward", { name }, count);
      // bus.$emit('clickItemTransformCount',count)
    },
    newMsgSearch() {
      this.$http.get("v1/backend/operation/withdraw/notice").then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.menu.withdraw.count = res.data.data.unread_total;
          bus.$emit("un_read", this.menu.withdraw.count);
        }
      });
    },
    setTimer() {
      if (this.intervalId == null) {
        this.intervalId = setInterval(() => {
          this.newMsgSearch();
        }, 1000 * 30);
      }
    }
  },
  created() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.setTimer()
  },
  mounted() {
    this.newMsgSearch()
    bus.$on("resetMenu", is_read => {
      this.menu.withdraw.count = is_read;
    });
    // this.newMsgSearch();
    // clearInterval(this.intervalId);
    // this.intervalId = null;
    // console.log(this.intervalId, "header-menu");
    // this.intervalId = setInterval(() => {
    //   this.newMsgSearch();
    // }, 1000 * 30);
    // console.log(this.intervalId, "header-menu----new-setinterval");
  },
  updated() {},
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

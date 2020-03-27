<template>
  <div id="payList">
    <div class="title">
      <div class="botton">
        <span @click="del" class="del">删除</span>
        <span @click="add">添加</span>
        <span @click="search">搜索</span>
      </div>
      <el-input
        style="width:200px"
        v-model="input"
        placeholder="请输入支付名称"
        class="el_input"
      ></el-input>
    </div>
    <div class="table">
      <Table />
      <Pagination />
    </div>
    <Form  @change="Change" />
  </div>
</template>

<script>
// 点击新增的按钮,显示新增的弹框,
// import Table from "./table.vue";
import Form from '../../../components/form.vue'
import Table from '../../../components/table.vue'
import Pagination from "../../../components/pagination.vue";
import store from "vuex";
export default {
  name: "payList",
  components: {
    Table,
    Form,
    Pagination
  },
  data() {
    return {
      input: "",
      delData: []
    };
  },
  computed: {
    selected() {
      return this.$store.state.selectedDel;
    }
  },
  watch: {
    selected(v) {
      this.delData = v;
    }
  },
  methods: {
    add() {
      this.$store.commit("SHOW_FORM", {
        show: true,
        type: 0
      });
    },
    del() {
      //勾选需要删除的项目批量删除
      if (this.delData.length != 0) {
        //###1.删除dom的数据
        //2.删除后台的数据
        console.log('已经有数据了');
        
      }else{
         this.$message("请选择需要删除的数据");
      }
     
    },
    search() {
      //获取表格中的支付名称,点击搜索
    },
    //修改新增弹框的显示
    Change(v) {
        this.$store.commit("SHOW_FORM", {
        show: false,
        type: 0
      });
    }
  }
};
</script>

<style lang="less" scoped>
#payList {
  background-color: #f2f2f2;

  .title {
    height: 120px;
    padding: 20px 10px 0px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .botton {
      display: flex;
      span {
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-right: 2px;
        background-color: #009688;
        &:hover {
          background-color: #30a89d;
        }
        &.del {
          background-color: #ff5722;
          &:hover {
            background-color: #ff794e;
          }
        }
      }
    }
    .el_input {
      margin-top: 10px;
    }
  }
  .table {
    padding: 5px 10px;
    box-sizing: border-box;
  }
}
</style>

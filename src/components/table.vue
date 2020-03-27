<template>
<div>
    <el-table
    border
    highlight-current-row
    :default-sort="{ prop: 'ID', order: orderlist[0] }"
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" align="center">
    </el-table-column>
    <el-table-column sortable prop="ID" label="ID"  align="center">
    </el-table-column>
    <el-table-column prop="sort" label="排序"  align="center">
    </el-table-column>
    <el-table-column
      prop="payname"
      label="支付名称"

      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="channel"
      label="支付渠道"
   
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="paytype"
      label="支付方式"
    
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="amount"
      label="固定金额"
   
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="topuptype"
      label="充值类型"
    
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="maxamount"
      label="自定义最大金额"
    
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="minamount"
      label="可自定义最小金额"
    
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="paynode"
      label="支付备注"
    
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="effect"
      label="是否生效"
    
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="recommend"
      label="是否推荐"
    
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="operation"
      label="操作者"
    
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      prop="operationtime"
      label="操作时间"
    
      align="center"
      show-overflow-tooltip
    >
    </el-table-column>
  
    <el-table-column
      prop="change"
      label="XX"
      align="center"
      show-overflow-tooltip
      width="200px"
    >
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
   
  </el-table>
    <Form :editdata="editData" @change="Change" />
</div>

</template>

<script>
import Form from './form.vue'
import store from "vuex";
export default {
   components: {
    Form
  },
  data() {
    return {
      editData:{},
      orderlist: ["ascending", "descending"],
      tableData: [
        {
          ID: "1",
          sort: "排序",
          payname: "支付名称",
          channel: "是否生效",
          paytype: "支付方式",
          amount: "固定金额",
          topuptype: "充值类型",
          maxamount: "自定义最大金额",
          minamount: "可自定义最小金额",
          paynode: "支付备注",
          effect: "是否生效",
          recommend: "是否推荐",
          operation: "操作者",
          operationtime: "操作时间",

        },
        {
          ID: "2",
          sort: "排序",
          payname: "支付名称",
          channel: "是否生效",
          paytype: "支付方式",
          amount: "固定金额",
          topuptype: "充值类型",
          maxamount: "自定义最大金额",
          minamount: "可自定义最小金额",
          paynode: "支付备注",
          effect: "是否生效",
          recommend: "是否推荐",
          operation: "操作者",
          operationtime: "操作时间",

        }
      ]
    };
  },

   computed: {
    addItem(){
      return this.$store.state.addPayItem
    }
  },
  watch: {
    addItem(val){
      // console.log(val);
      this.tableData.push(val)
    }
  },
  methods: {
    handleSelectionChange(sel) {
      // console.log("0000000",sel);
      this.$store.commit("SELECTED_DEL",sel)
    },
    handleEdit(x) {
      // console.log(x);
      this.$store.commit("EDIT_ITEM",x)
       this.$store.commit("SHOW_FORM", {
        show: true,
        type: 1
      });
    },
    Change(){
        this.$store.commit("SHOW_FORM", {
        show: false,
        type: 0
      });
    },
    handleDelete(y) {
      // console.log(y);
       this.$confirm('确认删除吗？', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          //###--------------------------------------------------------------------
          //1.只作为把页面的数据删除
          this.tableData.splice(y,1)
          //2.发送请求在后台删除数据
          
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
            // console.log('点击了取消');
            
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
</script>

<style></style>

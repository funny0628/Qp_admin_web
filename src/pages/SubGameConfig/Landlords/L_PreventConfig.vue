<template>
  <div id="L_PreventConfig">
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="add">添加</el-button
      ><el-button type="primary" @click="send">发送配置</el-button>
    </div>
    <!-- tabale -->
    <div class="table">
      <el-table
        :default-sort="{ prop: 'date', order: 'descending' }"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column  sortable align="center" prop="date" label="编号" width="180">
        </el-table-column>
        <el-table-column align="center" prop="name" label="渠道" width="180">
        </el-table-column>
        <el-table-column align="center" prop="address" label="有效时间">
        </el-table-column>
        <el-table-column align="center" prop="address" label="最后操作时间">
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作者">
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

      <!-- form表单 -->
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="visible" :destroy-on-close="true">
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-width="120px"
        >
          <el-form-item label="支付方式(大类)" prop="pay_way">
            <el-select v-model="form.pay_way">
              <el-option label="支付宝" :value="1"></el-option>
              <el-option label="微信" :value="2"></el-option>
              <el-option label="银联" :value="3"></el-option>
              <el-option label="银行卡转账" :value="4"></el-option>
              <el-option label="VIP充值" :value="5"1</el-option>
            </el-select>
          </el-form-item>
        
          <el-form-item label="有效时间 始" prop="start_time">
            <el-date-picker
              v-model="form.start_time"
              type="date"
            
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="有效时间 止" prop="end_time">
            <el-date-picker
              v-model="form.end_time"
              type="date"
             
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div v-if="title != '邮件详情'" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form', title)"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // order: "descending",
      tableData: [],
      title:'添加控制名单',
      visible:false,
      form:{

      },
      rules:{},
    };
  },
  methods: {
    add(){},
    send(){},
    handleEdit(){},
    onSubmit(){},
  },
};
</script>

<style lang="less" scoped>
#L_PreventConfig {
  background-color: #f2f2f2;
  .title {
    padding: 10px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
}
</style>

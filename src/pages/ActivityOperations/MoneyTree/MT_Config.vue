<template>
  <div id="MoneyTree">
    <!-- title -->
    <div class="title">
      <el-button type="primary" @click="add">添加</el-button>
      <el-button type="primary" @click="send">发送服务器配置</el-button>
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
          prop="days"
          label="等级"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="user_reg"
          label="摇奖次数"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_user_d"
          label="摇钱树图标展示"
          align="center"
          width="260"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <img
              src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3675415932,4054970339&fm=26&gp=0.jpg"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="day_change"
          label="全任务金币奖励"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="pay_user_w"
          label="升级所属成长值"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="week_change"
          label="摇一摇奖励"
          align="center"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="week_change"
          label="操作"
          align="center"
          width="260"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
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
      <!-- 分页 -->
      <el-pagination
        v-if="total > 5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- form -->
    <div class="form">
      <el-dialog
        :title="title"
        :visible.sync="visible"
        :destroy-on-close="true"
        width="60%"
      >
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-width="150px"
          style="margin-top:20px"
        >
          <el-form-item label="摇钱树等级" prop="ac_name">
            <el-input
              style="width:220px"
              v-model="form.ac_name"
              placeholder="摇钱树等级"
            ></el-input>
          </el-form-item>
          <el-form-item label="升级所需成长值" prop="ac_name">
            <el-input
              style="width:220px"
              v-model="form.ac_name"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="抽奖次数" prop="ac_name">
            <el-input
              style="width:220px"
              v-model="form.ac_name"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="摇钱树图展示" prop="ac_name">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="upLoad"
              :before-upload="beforeAvatarUpload"
              :limit="1"
            >
              <img v-if="form" :src="form" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="全任务金币奖励数量" prop="ac_name">
            <el-input
              style="width:220px"
              v-model="form.ac_name"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="摇一摇金币奖励数量" prop="ac_name">
            <el-input
              style="width:220px"
              v-model="form.ac_name"
              placeholder="1=2"
            ></el-input>
            <p>(金额1=权重1,金额2=权重2,...)</p>
          </el-form-item>
        </el-form>
        <div style="margin-top:20px" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form', title)"
            >保 存</el-button
          >
          <el-button type="primary" @click="back()">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: ["", ""],
      currentPage: 1,
      limit: 10,
      total: "",
      visible: false,
      form: {},
      rules: {},
      title: "新增等级"
    };
  },
  methods: {
    add() {
      this.visible = true;
    },
    send() {},
    //页容量变化
    handleSizeChange() {},

    //页码变化
    handleCurrentChange() {},

    handleEdit() {},
    handleDelete() {},
    upLoad() {
      console.log("----");
    },
    beforeAvatarUpload() {
      console.log("--------");
    },
    onSubmit(){},
    back(){},

    initData() {}
  }
};
</script>

<style lang="less" scoped>
#MoneyTree {
  .table {
    margin-top: 20px;
    img {
      width: 100%;
      object-fit: scale-down;
    }
  }
  .form {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      border: 1px dashed #ccc;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      border: 1px dashed #ccc;
    }
  }
}
</style>

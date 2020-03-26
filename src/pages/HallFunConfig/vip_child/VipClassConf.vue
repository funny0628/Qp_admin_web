<template>
  <div id="vipSystem-main">
    <input-area>
      <el-button
        type="danger"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="dialogFormVisible=true"
      >删除</el-button>
      <el-button
        type="primary"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="dialogFormVisible=true"
      >添加</el-button>
      <el-button type="primary" @click="open">发送到服务端配置</el-button>
    </input-area>
    <div class="bd">
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" label="VIP等级" align="center"></el-table-column>
        <el-table-column prop="phone" label="VIP特权" align="center"></el-table-column>
        <el-table-column prop="channel" label="头像框" align="center"></el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" align="center" width="200">
          <template>
            <el-button size="mini" type="primary" @click="open">下线</el-button>
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left">
        <el-form-item label="VIP等级" :label-width="formLabelWidth">
          <el-input v-model="form.vip_class" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特权列表" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.checkList">
            <el-checkbox label="vip头像框"></el-checkbox>
            <el-checkbox label="vip专属炮台"></el-checkbox>
            <el-checkbox label="财神触发概率"></el-checkbox>
            <el-checkbox label="入场动画"></el-checkbox>
            <el-checkbox label="上线广播"></el-checkbox>
            <el-checkbox label="互动礼物"></el-checkbox>
            <el-checkbox label="美女1v1"></el-checkbox>
            <el-checkbox label="提现加速"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="所需累计金币流水" :label-width="formLabelWidth">
          <el-input v-model="form.gold_flow" autocomplete="off"></el-input>
          <span>充值金额(单位: 元)</span>
        </el-form-item>
        <el-form-item label="等级奖励" :label-width="formLabelWidth">
          <el-input v-model="form.class_award" autocomplete="off"></el-input>
          <span>(单位: 元)</span>
        </el-form-item>
        <el-form-item label="月俸禄" :label-width="formLabelWidth">
          <el-input v-model="form.month_money" autocomplete="off"></el-input>
          <span>(单位: 元)</span>
        </el-form-item>
        <el-form-item label="VIP进场提示语" :label-width="formLabelWidth">
          <el-input v-model="form.vip_tip_text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="财神驾到触发概率加成" :label-width="formLabelWidth">
          <el-input v-model="form.probability" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提现加速权重" :label-width="formLabelWidth">
          <el-input v-model="form.withdraw" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像框ID" :label-width="formLabelWidth">
          <el-input v-model="form.avatar_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像框名称" :label-width="formLabelWidth">
          <el-input v-model="form.avatar_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像框期限类型" :label-width="formLabelWidth">
          <el-select v-model="form.avatar_deadline" placeholder="请选择">
            <el-option label="永久" value="forever"></el-option>
            <el-option label="实时" value="now"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.avatar_deadline === 'now'" label="使用期限" :label-width="formLabelWidth">
          <el-input v-model="form.use_deadline" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="解锁条件" :label-width="formLabelWidth">
          <el-input v-model="form.unlock" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像框样式" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="专属炮台图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频缩略图上传" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频上传" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">视频上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">确认</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InfoTable from "../../../plugin/components/InfoTable";
import PageInfo from "../../../plugin/script/common/PageInfo";
import InfoTableItem from "../../../plugin/components/InfoTableItem";
import InputArea from "../../../plugin/components/InputArea";
export default {
  name: "PayOrderRecord",
  components: {
    InfoTableItem,
    InfoTable,
    InputArea
  },
  data() {
    return {
      pagesize: 5,
      currentPage: 1,
      total: 0,
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "160px",
      form: {
        vip_class: "",
        checkList: ["vip头像框", "vip专属炮台"],
        gold_flow: "",
        class_award: "",
        month_money: "",
        vip_tip_text: "",
        probability: "",
        withdraw: "",
        avatar_id: "",
        avatar_name: "",
        avatar_deadline: "",
        use_deadline: "",
        unlock: ""
      },
      fileList: []
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    open() {
      this.$confirm("确认发送吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "发送成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送"
          });
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  mounted() {}
};
</script>

<style scoped>
#vipSystem-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#vipSystem-main .bd p {
  margin: 0;
}
#vipSystem-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
.el-pagination {
  margin-top: 20px;
}
</style>

<template>
  <div id="VipClassConf-main">
    <input-area>
      <el-button type="danger" style="margin-top: 10px;margin-bottom: 10px;">删除</el-button>
      <el-button type="primary" style="margin-top: 10px;margin-bottom: 10px;" @click="add">添加</el-button>
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
        <el-table-column prop="id" label="ID" sortable align="center"></el-table-column>
        <el-table-column prop="level" label="VIP等级" align="center"></el-table-column>
        <el-table-column prop="privilege" label="VIP特权" align="center"></el-table-column>
        <el-table-column prop="icon_border_url" label="头像框" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleOffline">下线</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
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
        <el-form-item
          v-if="form.avatar_deadline === 'now'"
          label="使用期限"
          :label-width="formLabelWidth"
        >
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
            <el-button type="success" size="small">
              图片上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
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
            <el-button type="success" size="small">
              图片上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
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
            <el-button type="success" size="small">
              视频缩略图上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="炮台演示视频" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button type="success" size="small">
              视频上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNewConf">确认</el-button>
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
      dialogTitle: "",
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "160px",
      form: {
        vip_class: 0,
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
    async getVipList() {
      const res = await this.$http.get("lobby/grade", {
        params: {
          page: 1,
          limit: 10
        }
      });
      console.log(res);
      if (res.data.code === 1) {
        this.tableData = res.data.data;
      }
    },
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
      console.log(this.multipleSelection);
    },
    async add() {
      this.dialogTitle = "添加信息";
      this.dialogFormVisible = true;
    },
    async addNewConf() {
      let params = {
        level: 6,
        privilege: "vip",
        charge_coins: 100,
        enter_word: "我进来了",
        caishen_base_rate: 0.8,
        speedup_weight: 0.9,
        icon_url: "头像框",
        avator_id: 1,
        name: "CIA神",
        icon_type: 1,
        number_day: 30,
        no_condition: "ide",
        battery_url: "jeiowfioepjwi",
        img_url: "www.baidu.com",
        video_url: "www.baidu.com"
      };
      const res = await this.$http.post("lobby/grade", params);
      console.log(res);
      if (res.data.code === 1) {
        this.dialogFormVisible = false;
        this.getVipList();
      }
    },
    handleOffline() {
      this.$confirm("确认更新状态吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "更新成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更新"
          });
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.dialogTitle = "更新信息";
      this.form.vip_class = row.level;
      this.form.gold_flow = row.charge_coins;
      this.form.class_award = row.award;
      this.form.vip_tip_text = row.enter_word;
      this.form.probability = row.caishen_base_rate;
      this.form.withdraw = row.speedup_weight;
      this.form.avatar_id = row.avator_id;
      this.form.avatar_name = row.avator_name;
      this.form.unlock = row.no_condition;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // let data = {
          //   type_id: 3,
          //   grade_id: `${row.level}`
          // }
          this.$http
            .delete("lobby/grade", {
              params: {
                type_id: 3,
                grade_id: `${row.id}`
              }
            })
            .then(res => {
              console.log(res);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
  mounted() {
    this.getVipList();
  }
};
</script>

<style scoped>
#VipClassConf-main .bd {
  padding-right: 20px;
  padding-left: 20px;
}
#VipClassConf-main .bd p {
  margin: 0;
}
#VipClassConf-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
.el-pagination {
  margin-top: 20px;
}
</style>

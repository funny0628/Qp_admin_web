<template>
  <div id="VipClassConf-main">
    <input-area>
      <!-- <el-button type="danger" style="margin-top: 10px;margin-bottom: 10px;">删除</el-button> -->
      <el-button
        v-has="'add_vip_rank_config'"
        type="primary"
        style="margin-top: 10px;margin-bottom: 10px;"
        @click="openAddDialog"
      >添加</el-button>
      <el-button type="primary" @click="sendTabelData">发送到服务端配置</el-button>
    </input-area>
    <div class="bd">
      <el-table
        v-has="'vip_rank_config_records'"
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
        <el-table-column label="VIP特权" align="center">
          <template slot-scope="scope">
            <span>{{JSON.parse(scope.row.privilege) | formatPrivilege}}</span>
            <!-- <span>{{JSON.parse(scope.row.privilege)}}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="icon_border_url" label="头像框" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.icon_border_url" width="50" height="50" alt />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" @click="handleOffline">下线</el-button> -->
            <el-button
              v-has="'modify_vip_rank_config'"
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              v-has="'delete_vip_rank_config'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
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
            <el-checkbox
              v-for="(item,index) in privilegeOpts"
              :key="index"
              :label="item.name"
              :value="JSON.stringify(item.id)"
            >{{item.name}}</el-checkbox>
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
        <el-form-item label="月俸禄领取金币" :label-width="formLabelWidth">
          <el-input v-model="form.salary" autocomplete="off"></el-input>
          <span>(单位: 元)</span>
        </el-form-item>
        <el-form-item label="月俸禄领取所需流水" :label-width="formLabelWidth">
          <el-input v-model="form.salary_need_coin" autocomplete="off"></el-input>
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
            <el-option label="永久" value="1"></el-option>
            <el-option label="实时" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="form.avatar_deadline === '2'"
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
            class="avatar-uploader"
            action
            :fileList="fileList.imgList1"
            accept="image/jpeg, image/png"
            :show-file-list="false"
            :on-change="(val1,val2,val3)=>handleChange(val1,val2,'imgList1')"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :http-request="val=>uploadFile('imgList1')"
          >
            <img v-if="imageUrl.imgList1" :src="imageUrl.imgList1" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="专属炮台图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action
            :fileList="fileList.imgList2"
            accept="image/jpeg, image/png"
            :show-file-list="false"
            :on-change="(val1,val2,val3)=>handleChange(val1,val2,'imgList2')"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :http-request="val=>uploadFile('imgList2')"
          >
            <img v-if="imageUrl.imgList2" :src="imageUrl.imgList2" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频缩略图上传" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action
            :fileList="fileList.imgList3"
            accept="image/jpeg, image/png"
            :show-file-list="false"
            :on-change="(val1,val2,val3)=>handleChange(val1,val2,'imgList3')"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :http-request="val=>uploadFile('imgList3')"
          >
            <img v-if="imageUrl.imgList3" :src="imageUrl.imgList3" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="炮台演示视频" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :on-change="changeHandle"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :http-request="uploadVideo"
          >
            <video v-if="videoUrl" :src="videoUrl" class="avatar"></video>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div>{{form}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addNewConf">确认</el-button>
        <el-button @click="dialogFormVisible = false">返回</el-button>
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
  name: "vip_rank_config",
  components: {
    InfoTableItem,
    InfoTable,
    InputArea
  },
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      total: 0,
      dialogTitle: "",
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "160px",
      form: {
        vip_class: 0,
        checkList: [],
        gold_flow: "",
        class_award: "",
        month_money: "",
        salary: "",
        salary_need_coin: "",
        vip_tip_text: "",
        probability: "",
        withdraw: "",
        avatar_id: "",
        avatar_name: "",
        avatar_deadline: "",
        use_deadline: "",
        unlock: ""
      },
      fileList: {
        imgList1: [],
        imgList2: [],
        imgList3: []
      },
      imageUrl: {
        imgList1: "",
        imgList2: "",
        imgList3: ""
      },
      videoList: [],
      videoUrl: "",
      privilegeOpts: [] //特权列表项
    };
  },
  filters: {
    formatPrivilege: function(obj) {
      if (Object.prototype.toString.call(obj) !== "[object Array]") {
        var rantStr = "";
        for (var key in obj) {
          rantStr += key + "," + obj[key];
        }
        return rantStr;
      }else {
        var rantStr = "";
        for (var i=0;i<obj.length;i++) {
          rantStr += obj[i] + ','
        }
        return rantStr;
      }
    }
    // formatPrivilege: function(obj) {
    //   var rantStr = "";
    //   for (var key in obj) {
    //     rantStr += key + "," + obj[key] + " ";
    //   }
    //   return rantStr;
    // }
  },
  methods: {
    sendTabelData() {
      let data = {
        type_id: 1
      };
      this.$http.post("v1/backend/lobby/server_config_two", data).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    resetForm() {
      this.form = {
        vip_class: 0,
        checkList: [],
        gold_flow: "",
        class_award: "",
        month_money: "",
        salary_need_coin: "",
        salary: "",
        vip_tip_text: "",
        probability: "",
        withdraw: "",
        avatar_id: "",
        avatar_name: "",
        avatar_deadline: "",
        use_deadline: "",
        unlock: ""
      };
      (this.fileList = {
        imgList1: [],
        imgList2: [],
        imgList3: []
      }),
        (this.imageUrl = {
          imgList1: "",
          imgList2: "",
          imgList3: ""
        }),
        (this.videoList = []);
      this.videoUrl = "";
    },
    async getVipList() {
      const res = await this.$http.get("v1/backend/lobby/grade", {
        params: {
          page: this.currentPage,
          limit: this.pagesize
        }
      });
      console.log(res);
      if (res.data.code === 1) {
        this.tableData = res.data.data;
        this.total = res.data.total;
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getVipList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getVipList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    async openAddDialog() {
      this.dialogTitle = "添加信息";
      this.dialogFormVisible = true;
      this.resetForm();
      this.getPrivilegeList();
    },
    async addNewConf() {
      if (!this.form.grade_id) {
        let data = {
          level: Number(this.form.vip_class),
          privilege: JSON.stringify(this.form.checkList),
          charge_coins: Number(this.form.gold_flow) * 1000,
          enter_word: this.form.vip_tip_text,
          caishen_base_rate: Number(this.form.probability),
          speedup_weight: Number(this.form.withdraw),
          icon_url: this.imageUrl.imgList1,
          avator_id: Number(this.form.avatar_id),
          name: this.form.avatar_name,
          icon_type: Number(this.form.avatar_deadline),
          number_day: Number(this.form.use_deadline),
          no_condition: this.form.unlock,
          battery_url: this.imageUrl.imgList2,
          img_url: this.imageUrl.imgList3,
          video_url: this.videoUrl,
          award: Number(this.form.class_award),
          salary: Number(this.form.salary),
          salary_need_coin: Number(this.form.salary_need_coin)
        };
        const res = await this.$http.post("v1/backend/lobby/grade", data);
        console.log(res);
        if (res.data.code === 1) {
          this.dialogFormVisible = false;
          this.getVipList();
        }
      } else {
        console.log(this.form.checkList);
        let data = {
          level: Number(this.form.vip_class),
          privilege: this.form.checkList,
          charge_coins: Number(this.form.gold_flow) * 1000,
          enter_word: this.form.vip_tip_text,
          caishen_base_rate: Number(this.form.probability),
          speedup_weight: Number(this.form.withdraw),
          icon_url: this.imageUrl.imgList1,
          avator_id: Number(this.form.avatar_id),
          name: this.form.avatar_name,
          icon_type: Number(this.form.avatar_deadline),
          number_day: Number(this.form.use_deadline),
          no_condition: this.form.unlock,
          battery_url: this.imageUrl.imgList2,
          img_url: this.imageUrl.imgList3,
          video_url: this.videoUrl,
          grade_id: this.form.grade_id
        };
        const res = await this.$http.put("v1/backend/lobby/grade", data);
        console.log(res);
        if (res.data.code === 1) {
          this.dialogFormVisible = false;
          this.getVipList();
        }
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
      this.getPrivilegeList();
      this.form.grade_id = row.id;
      this.form.vip_class = row.level;
      this.form.checkList = JSON.parse(row.privilege);
      this.form.gold_flow = row.charge_coins;
      this.form.class_award = row.award;
      this.form.month_money = row.consecrate;
      this.form.vip_tip_text = row.enter_word;
      this.form.probability = row.caishen_base_rate;
      this.form.withdraw = row.speedup_weight;
      this.form.avatar_id = row.avator_id;
      this.form.avatar_name = row.avator_name;
      this.form.avatar_deadline = JSON.stringify(row.icon_type);
      this.form.use_deadline = row.number_day;
      this.form.unlock = row.no_condition;
      this.imageUrl.imgList1 = row.icon_border_url;
      this.imageUrl.imgList2 = row.battery_url;
      this.imageUrl.imgList3 = row.video_url;
      this.videoUrl = row.video_url;
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
            .delete("v1/backend/lobby/grade", {
              params: {
                type_id: 3,
                grade_id: `${row.id}`
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 1) {
                this.getVipList();
              }
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
    getPrivilegeList() {
      this.$http
        .get("v1/backend/lobby/name_type", {
          params: {
            type_id: 5
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.privilegeOpts = res.data.data;
          }
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
    handleChange(file, fileList, info) {
      console.log(fileList);
      console.log(info);
      this.fileList[info] = fileList;
      console.log(this.fileList);
    },
    beforeUpload(file) {},
    handleAvatarSuccess() {},
    uploadFile(info) {
      console.log(info);
      console.log(this.fileList[info]);
      let formData = new FormData();
      this.fileList[info].forEach(item => {
        formData.append("filename", item.raw);
        formData.append("types", 1);
      });
      this.$http.post("v1/backend/upload", formData).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.imageUrl[info] = res.data.path;
          console.log(this.imageUrl);
        }
      });
    },
    changeHandle(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.videoList = fileList;
    },
    uploadVideo() {
      let formData = new FormData();
      this.videoList.forEach(item => {
        formData.append("filename", item.raw);
        formData.append("types", 2);
      });
      this.$http.post("v1/backend/upload", formData).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.videoUrl = res.data.path;
        }
      });
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
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

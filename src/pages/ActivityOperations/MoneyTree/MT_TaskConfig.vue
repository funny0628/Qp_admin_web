<template>
  <div
    id="MT_TaskConfig"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
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
          prop="task_type"
          label="任务类型"
          align="center"
          width="300px"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="task_describe"
          label="任务描述"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="fertilizers"
          label="任务奖励肥料数量"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="task_target"
          label="任务目标数量"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="is_draw"
          label="是否摇奖次数必须"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_draw"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="task_guide"
          label="任务指引"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="week_change"
          label="操作"
          align="center"
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
          <el-form-item label="任务类型" prop="task_type">
            <el-select v-model="form.task_type" placeholder="请选择">
              <el-option
                v-for="item in optiontype"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务描述" prop="task_describe">
            <el-input
              style="width:220px"
              v-model="form.task_describe"
              placeholder="任务描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="任务目标数量" prop="task_target">
            <el-input
              style="width:220px"
              v-model="form.task_target"
              placeholder="0"
            ></el-input>
          </el-form-item>

          <el-form-item label="肥料奖励数量" prop="fertilizers">
            <el-input
              style="width:220px"
              v-model="form.fertilizers"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否摇奖次数必须" prop="fertilizers">
            <el-switch
              v-model="form.is_draw"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="任务指引" prop="task_guide">
            <el-select v-model="form.task_guide" placeholder="请选择">
              <el-option
                v-for="item in optionguide"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="margin-top:20px" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form', title)"
            >确认</el-button
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
      tableData: [],
      title: "新增任务",
      visible: false,
      //任务配置数据
      form: {
        task_type: "",
        task_describe: "",
        task_target: "",
        fertilizers: "",
        is_draw: false,
        task_guide: ""
      },
      rules: {
        task_type: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        task_describe: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        task_target: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        fertilizers: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        is_draw: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        task_guide: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      optiontype: [
        {
          value: 1,
          label: "登录游戏大厅"
        },
        {
          value: 2,
          label: "分享微信朋友"
        },
        {
          value: 3,
          label: "分享微信朋友圈"
        },
        {
          value: 4,
          label: "游戏流水达到特定值"
        },
        {
          value: 5,
          label: "发展下级数量达到特定值"
        }
      ],
      optionguide: [
        {
          value: 1,
          label: "无指引"
        },
        {
          value: 2,
          label: "跳转分享微信朋友圈"
        },
        {
          value: 3,
          label: "跳转分享微信朋友"
        }
      ],
      keys: "",
      id: "",
      //活动所有数据
      allData: {},
      //10003 数据
      currentData: {},
      //保存当前编辑的下标
      currentIndex: "",
      loading: false
    };
  },
  created() {
    this.initData();
  },
  methods: {
    add() {
      this.editForm(true, "新增", this.form);
    },

    //发送服务器配置
    async send() {
      this.loading = true;
      let postData = {};
      this.tableData.forEach((item, index) => {
        postData[index + 1] = item;
      });
      this.currentData.ac_content.task = postData;
      // console.log(this.currentData,this.allData);
      let { data } = await this.$http.HallFunConfig.PostServerConfig({
        keys: this.keys,
        values: JSON.stringify(this.allData),
        id: this.id
      });
      if (data.code === 1 && data.msg === "ok") {
        this.loading = false;
        this.$message({
          type: "success",
          message: "发送服务器配置成功!"
        });
      } else {
        this.loading = false;
        this.$message({
          type: "warning",
          message: "发送服务器配置失败!"
        });
      }
    },

    handleEdit(index, row) {
      this.currentIndex = index;
      this.editForm(true, "编辑", { ...row });
    },

    //表格删除
    handleDelete(index, row) {
      this.tableData = this.tableData.filter((item, idx) => {
        return index !== idx;
      });
    },

    //新增和编辑的提交
    onSubmit(formName, title) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (title === "新增") {
            this.tableData.push(this.form);
          } else if (title === "编辑") {
            let resTable = [];
            this.tableData.forEach((item, index) => {
              resTable.push(item);
              if (this.currentIndex === index) {
                resTable[index] = this.form;
              }
            });
            this.tableData = resTable;
            // console.log(this.tableData,resTable);
          }
          this.editForm(false, "新增", this.form);
        } else {
          this.$message({
            type: "warning",
            message: "必填的项不可以为空!"
          });
          return false;
        }
      });
    },
    back() {},

    editForm(visible, title, form) {
      this.visible = visible;
      this.title = title;
      this.form = form;
    },

    async initData() {
      let { data } = await this.$http.HallFunConfig.GetServerConfig({
        key: "activity_new.lua"
      });
      //   console.log(data);
      this.keys = data.data[0].sys_key;
      this.id = data.data[0].id;
      let res = data.data[0].sys_val;
      this.allData = JSON.parse(res);
      Object.keys(this.allData).forEach(item => {
        if (this.allData[item].ac_type === "10003") {
          this.currentData = this.allData[item];
          this.tableData = Object.values(this.allData[item].ac_content.task);
          this.total = this.tableData.length;
        }
      });

      // console.log(this.tableData, this.allData);
    }
  }
};
</script>

<style lang="less" scoped>
#MT_TaskConfig {
  .table {
    margin-top: 20px;
  }
}
</style>

<template>
  <div id="MT_TaskConfig">
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
          label="任务类型"
          align="center"
          width="300px"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="user_reg"
          label="任务描述"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pay_user_d"
          label="任务奖励肥料数量"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="day_change"
          label="任务目标数量"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="pay_user_w"
          label="是否摇奖次数必须"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="week_change"
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
      <!-- 分页 -->
      <el-pagination
        v-if="total > 5"
        @size-change="handleSizeChange"
        @current-change="handleSizeChange"
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
          <el-form-item label="任务类型" prop="ac_name">
            <el-select v-model="valuetype" placeholder="请选择">
              <el-option
                v-for="item in optiontype"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务描述" prop="ac_name">
            <el-input
              style="width:220px"
              v-model="form.ac_name"
              placeholder="任务描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="任务目标数量" prop="ac_name">
            <el-input
              style="width:220px"
              v-model="form.ac_name"
              placeholder="0"
            ></el-input>
          </el-form-item>

          <el-form-item label="肥料奖励数量" prop="ac_name">
            <el-input
              style="width:220px"
              v-model="form.ac_name"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否摇奖次数必须" prop="ac_name">
            <el-switch
              v-model="form.value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="任务指引" prop="ac_name">
            <el-select v-model="valueguide" placeholder="请选择">
              <el-option
                v-for="item in optionguide"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
      total: "",
      limit: 10,
      currentPage: 1,
      title: "新增任务",
      visible: false,
      form: {},
      rules: {},
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
      valuetype: "登录游戏大厅",
      valueguide: "无指引",
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
      ]
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
    handleSizeChange() {},

    handleEdit() {},
    handleDelete() {},

    onSubmit() {},
    back() {}
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

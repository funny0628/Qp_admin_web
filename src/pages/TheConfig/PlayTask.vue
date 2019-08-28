<template>
  <div id="PlayTask-main">
    <div class="title">任务设置</div>
    <div class="content">
      <el-form ref="form" :model="formData" label-width="100px" style="padding: 30px 0 30px 30px;">
        <el-form-item label="活动开启/关闭">
          <el-switch v-model="formData.active" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 95%;margin: 0 auto;">
        <el-table-column prop="enabled" label="任务需求" width align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.enabled" size>
              <el-option label="流水" value="0"></el-option>
              <el-option label="对局" value="1"></el-option>
              <el-option label="对局" value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="game_type" label="游戏类型" width align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.game_type" size>
              <el-option label="全部" value="0"></el-option>
              <el-option label="无" value="1"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="game_type" label="任务描述" width align="center">
          <template slot-scope="scope">
            <div>
              <el-input size v-model="scope.row.game_type" placeholder="请输入任务描述"></el-input>
            </div>
            <div>
              <span>{{scope.row.game_type}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="game_type" label="达到条件" width align="center">
          <template slot-scope="scope">
            <el-input size v-model="scope.row.game_type" placeholder="请输入金额"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="game_type" label="赠送金币" width align="center">
          <template slot-scope="scope">
            <el-input size v-model="scope.row.game_type" placeholder="请输入赠送金额"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width align="center">
          <template slot-scope="scope">
            <el-button size type="warning" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer" style="text-align: center;padding-top: 30px;">
        <el-button>
          <i class="el-icon-plus"></i> 添 加
        </el-button>
        <el-button type="primary">保 存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseIframe from "../../plugin/script/common/BaseIframe";
export default {
  name: "PlayTask",
  extends: BaseIframe,
  data() {
    return {
      formData: {
        active: false
      },
      tableData: [{ game_type: "" }]
    };
  }
};
</script>

<style scoped>
#PlayTask-main {
  width: 100%;
  padding: 15px 20px 0 20px;
}

#PlayTask-main .title {
  width: 100%;
  height: 50px;
  border: 1px solid #e9e9e9;
  line-height: 50px;
  padding-left: 15px;
  font-weight: bold;
  font-size: 16px;
}

#PlayTask-main .content {
  width: 100%;
  height: 600px;
  border: 1px solid #e9e9e9;
  border-top: none;
}
</style>
<!--玩家任务-->

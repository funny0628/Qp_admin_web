<!--玩家任务-->
<template>
  <div id="PlayTask-main">
    <div class="title">任务设置</div>
    <div class="content">
      <el-form ref="form" :model="format" label-width="100px" style="padding: 30px 0 30px 30px;">
        <el-form-item label="活动开启/关闭">
          <el-switch v-model="format.active" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="奖励配置">
          <div class="bd" style="padding-right:15px;">
            <info-table
              :search="search"
              :table-style="tableStyle"
              :records="records"
              :page-info="pageInfo"
              :hide-page="true"
            >
              <info-table-item :table-style="tableStyle">
                <template slot-scope="scope">
                  <template v-if="scope.prop === 'action'">
                    <permission-button
                      :action="btn.type"
                      v-for="(btn,index) in scope.row[scope.prop]"
                      :key="index"
                      @click="handeClick(btn)"
                      style="cursor: pointer; padding-left: 5px;"
                    >
                      <span>{{btn.label}}</span>
                    </permission-button>
                  </template>
                  <template v-if="['action'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
                </template>
              </info-table-item>
            </info-table>
          </div>
        </el-form-item>
        <div class="footer" style="text-align: center;">
          <el-button @click="dialogVisible = true">
            <i class="el-icon-plus"></i> 添 加
          </el-button>
          <el-button type="primary">保 存</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog :title="dialogTitle" center :visible.sync="dialogVisible" width="25%">
      <el-form :model="formData" ref="formData">
        <el-form-item label="任务需求：" :label-width="labelWidth" class="el-item">
          <el-select
            v-model="formData.level"
            clearable
            placeholder="请选择用户层级"
            style="width: 100%;"
          >
            <el-option
              v-for="item in levels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏类型：" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formData.play_type" clearable placeholder="固定金额单位为元"></el-input>
        </el-form-item>
        <el-form-item label="任务描述：" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formData.description" clearable placeholder="固定金额单位为元"></el-input>
        </el-form-item>
        <el-form-item label="达到条件：" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formData.condition" clearable placeholder="固定金额单位为元"></el-input>
        </el-form-item>
        <el-form-item label="赠送金额：" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formData.given" clearable placeholder="固定金额单位为元"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import InfoTableItem from "../../plugin/components/InfoTableItem";
export default {
  name: "PlayTask",
  extends: BaseIframe,
  components: { PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      format: {
        active: false
      },
      tableStyle: [
        { label: "任务需求", prop: "enabled", width: "" },
        { label: "游戏类型", prop: "type", width: "" },
        { label: "任务描述", prop: "description", width: "" },
        { label: "达到条件", prop: "condition", width: "" },
        { label: "赠送金币", prop: "present", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          enabled: "流水",
          type: "射击类",
          description: "按时完成",
          condition: "10000",
          present: "100",
          action: [{ label: "删除", type: "delete" }]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      dialogTitle:'每日签到设置',
      dialogVisible:false,
      labelWidth:'100px',
      formData:{
        level:'',
        play_type:'',
        description:'',
        condition:'',
        given:''
      },
      levels:[]
    };
  },
  methods: {
    search() {},
    handeClick(btn, row) {
      if (btn.type === "delete") {
        console.log("删除");
      }
    },
    confirm(){}
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
.el-item{
  width: 90%;
}
</style>


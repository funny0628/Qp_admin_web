<!--转盘活动-->
<template>
  <div id="RotaActive-main">
    <div class="title">转盘活动设置</div>
    <div class="content">
      <el-form ref="form" :model="format" style="padding: 30px 0 30px 30px;">
        <el-form-item label="活动开启/关闭" label-width="100px">
          <el-switch v-model="format.active" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="format.begin_time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="转盘次数条件">
          <el-checkbox-group v-model="format.checkedCities">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="获得次数">
          <el-input v-model="format.number" style="width:220px;"></el-input>
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
        <el-form-item label="金额：" :label-width="labelWidth" class="el-item">
          <el-select
            v-model="formData.perpaid"
            clearable
            placeholder="请选择充值通道"
            style="width: 100%;"
          >
            <el-option
              v-for="item in prepaidChannels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="概率：" :label-width="labelWidth" class="el-item">
          <el-input autocomplete="off" v-model="formData.credit" clearable placeholder="请输入充值金额"></el-input>
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
  name: "RotaActive",
  extends: BaseIframe,
  components: { PermissionButton, InfoTable, InfoTableItem },
  data() {
    return {
      format: {
        active: false,
        begin_time: "",
        checkedCities: "",
        number:'',
      },
      checkedCities: [],
      cities: ["新用户首次进入", "每日充值任意金额", "每日登陆"],
      tableStyle: [
        { label: "用户层级", prop: "user_level", width: "" },
        { label: "ID", prop: "id", width: "" },
        { label: "金额", prop: "money", width: "" },
        { label: "概率", prop: "probability ", width: "" },
        { label: "操作", prop: "action", width: "" }
      ],
      records: [
        {
          user_level: "普陀区",
          id: "王小虎",
          money: "上海",
          probability: "35%",
          action: [{ label: "删除", type: "delete" }]
        }
      ],
      pageInfo: new PageInfo(0, [5, 10, 15], 0),
      formData:{
        perpaid:'',
        credit:''
      },
      dialogTitle:'',
      dialogVisible:false,
      labelWidth:'70px',
      prepaidChannels:[]
    };
  },
  methods: {
    search() {},
    /***表格操作 */
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
#RotaActive-main {
  width: 100%;
  padding: 15px 20px 0 20px;
}
#RotaActive-main .title {
  width: 100%;
  height: 50px;
  border: 1px solid #e9e9e9;
  line-height: 50px;
  padding-left: 15px;
  font-weight: bold;
  font-size: 16px;
}
#RotaActive-main .content {
  border: 1px solid #e9e9e9;
  border-top: none;
  height: 600px;
  width: 100%;
}
</style>


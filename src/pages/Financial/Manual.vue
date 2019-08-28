<template>
  <div id="Manual-main">
    <div class="manual-form" style="max-width: 900px;padding: 40px 20px">
      <el-form ref="form" :model="form" label-width="76">
        <el-form-item label="模式：">
          <el-radio-group v-model="form.resource">
            <el-radio label="上分"></el-radio>
            <el-radio label="下分"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户ID：">
          <el-input type="textarea" v-model="form.desc" placeholder="批量用户用 ‘;’  隔开."></el-input>
        </el-form-item>
        <el-form-item label="金额：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import BaseIframe from "../../plugin/script/common/BaseIframe";
export default {
  name: "Manual",
  extends: BaseIframe,
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
</style>

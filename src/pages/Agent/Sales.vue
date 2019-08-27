<template>
  <div id="Sales-main">
    <div class="title">业绩返佣</div>
    <div class="content">
      <el-form ref="form" :model="formData" label-width="100px" style="padding: 30px 0 30px 30px;">
        <el-form-item label="活动开启/关闭">
          <i-switch v-model="formData.switch" size="large">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </el-form-item>
      </el-form>
      <div class="tb" style="width: 95%; margin: 0 auto;">
        <el-table
          :data="tableData"
        >
          <el-table-column
            prop="min_result"
            label="业绩区间"
            width=""
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-input size="" v-model="scope.row.min_result" placeholder="请输入业绩" style="width: 80%;"></el-input>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label=""
            width="30"
            align="center"
          >
            <template>
              <div>
                <span>-</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="max_result"
            label="业绩区间"
            width=""
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-input size="" v-model="scope.row.max_result" placeholder="请输入业绩" style="width: 80%;"></el-input>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="rate_result"
            label="业绩返佣比例"
            width=""
            align="center"
          >
            <template slot-scope="scope">
              <div style="display: flex;">
                <button
                  style="width: 70px; height: 40px; border: none; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
                  万分之
                </button>
                <el-input size="" v-model="scope.row.rate_result" style="width: 80%;"></el-input>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="" align="center">
            <template slot-scope="scope">
              <el-button size="" type="warning" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="footer" style="text-align: center;padding-top: 30px;">
          <el-button><i class="el-icon-plus"></i> 添 加</el-button>
          <el-button type="primary">保 存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseIframe from '../../plugin/script/common/BaseIframe';

  export default {
    name: "Sales",
    extends: BaseIframe,
    data() {
      return {
        formData: {
          active: false,
          switch: true,
        },
        tableData: [{min_result: '1.00', max_result: '10000.00', rate_result: '1'}]
      }
    },
    methods: {
      handleDelete(row) {
        console.log(row)
      }
    }
  }
</script>

<style scoped>
  #Sales-main {
    width: 100%;
    padding: 15px 20px 0 20px;
  }

  #Sales-main .title {
    width: 100%;
    height: 50px;
    border: 1px solid #e9e9e9;
    line-height: 50px;
    padding-left: 15px;
    font-weight: bold;
    font-size: 16px;
  }

  #Sales-main .content {
    border: 1px solid #e9e9e9;
    border-top: none;
    height: 600px;
    width: 100%;
  }
</style>

<template>
  <div class="info-table">
    <el-table :data="records" border size="medium" v-if="!isPhone">
      <slot></slot>
      <el-table-column
        v-if="!$slots.default"
        v-for="(item, index) in tableStyle"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        align="center"
      ></el-table-column>
    </el-table>
    <el-table :data="records" border size="medium" @selection-change="handleSelectionChange" v-else>
      <template v-if="$slots.default">
        <slot></slot>
      </template>
      <template v-else>
        <el-table-column type="expand" v-if="tableStyle.length >= 3">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item
                v-for="(item, index) in tableStyle"
                :key="index"
                v-if="index >= 3"
                :label="item.label"
              >
                <span>{{props.row[item.prop]}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableStyle"
          v-if="index < 3"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        ></el-table-column>
      </template>
    </el-table>
    <div class="page-info" v-if="!hidePage">
      <el-pagination
        background
        @size-change="handlerSizeChange"
        @current-change="handlerCurrentChange"
        :current-page.sync="cur_page"
        :page-sizes="[5,10,15]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      ></el-pagination>
      <div>{{pageInfo}}</div>
    </div>
  </div>
</template>

<script>
import PageInfo from "../script/common/PageInfo";
import { mapState } from "vuex";
import BaseComponent from "../script/common/BaseComponent";

export default {
  name: "InfoTable",
  extends: BaseComponent,
  props: {
    /**
       * example:   key 值与 tableStyle 中的prop对应
       * {
          id:1,
          user_name: 'xxx',
          user_dec: '111',
          state: 1,
          action: ''
        }
       *
       **/
    records: {
      type: Array,
      required: true
    },
    /**
       * example
       * [
       {label: 'ID', prop: 'id', width: ''},
       {label: '角色名称', prop: 'user_name', width: ''},
       {label: '角色描述', prop: 'user_dec', width: ''},
       {label: '状态', prop: 'state', width: ''},
       {label: '操作', prop: 'action', width: ''}
       ]
       **/
    tableStyle: {
      type: Array,
      required: true
    },
    /** 查询调用接口 **/
    /** 页码数据 **/
    pageInfo: {
      type: PageInfo
    },
    /** 是否隐藏页面 default false **/
    hidePage: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    ...mapState(["isPhone"])
  },
  data() {
    return {
      cur_page: 1
    };
  },
  methods: {
    handlerSizeChange(val) {
      console.log(val);
      this.$emit("pageSizeFn", val);
    },
    handlerCurrentChange(val) {
      console.log(val);
      /** TODO 校验 **/
      this.$emit("pageNumFn", val);
    },
    refresh_page() {
      let $this = this;
      this.$nextTick(() => {
        $this.cur_page = $this.pageInfo.page;
      });
    }
  },
  watch: {
    pageInfo: {
      handler(newVal, oldVal) {
        this.cur_page = newVal.page;
      },
      deep: true
    }
  },
  mounted() {
    if (!this.hidePage) this.cur_page = this.pageInfo.page;
  }
};
</script>

<style>
.info-table table {
}
.info-table table th {
  background: #f2f2f2;
  color: #333;
  font-weight: normal;
  border-color: #e6e6e6;
}
.info-table table td {
  border-color: #e6e6e6;
}
.info-table .page-info {
  text-align: center;
  padding-top: 20px;
}
.info-table
  .page-info
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background: #2a7cf5;
}
.info-table .el-table__expanded-cell {
  padding: 10px;
}
.info-table .el-form--inline .el-form-item {
  display: block;
  margin: 0 0 4px;
}
.el-pagination .el-select .el-input .el-input__inner {
  height: 28px !important;
  line-height: 28px !important;
}
</style>

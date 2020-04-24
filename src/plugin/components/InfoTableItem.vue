<template>
  <fragment>
    <template v-if="show">
      <template v-if="isPhone">
        <el-table-column type="expand" key="0" v-if="tableStyle.length >= 3">
          <el-form slot-scope="scope" label-position="left" inline>
            <el-form-item
              v-for="(item, index) in tableStyle"
              :key="index"
              v-if="index >= 3"
              :label="item.label"
            >
              <slot
                :row="scope.row"
                :prop="item.prop"
                :columnIndex="index"
                :$index="scope.$index"
                :column="scope.column"
              ></slot>
            </el-form-item>
          </el-form>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableStyle"
          v-if="index < 3"
          :key="index + 1"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <slot
            slot-scope="scope"
            :row="scope.row"
            :prop="item.prop"
            :columnIndex="index"
            :$index="scope.$index"
            :column="scope.column"
          ></slot>
          <!--<template slot-scope="scope" v-if="hasSlots">{{scope.row[item.prop]}}</template>-->
        </el-table-column>
      </template>
      <template v-else>
        <!-- <el-table-column v-if="!hideMul" type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column
          v-for="(item, index) in tableStyle"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <slot
            slot-scope="scope"
            :row="scope.row"
            :prop="item.prop"
            :columnIndex="index"
            :$index="scope.$index"
            :column="scope.column"
          ></slot>
          <!--<template slot-scope="scope" v-if="hasSlots">{{scope.row[item.prop]}}</template>-->
        </el-table-column>
      </template>
    </template>
  </fragment>
</template>

<script>
import { mapState } from "vuex";
import { Fragment } from "vue-fragment";
import BaseComponent from "../script/common/BaseComponent";

export default {
  name: "InfoTableItem",
  extends: BaseComponent,
  components: { Fragment },
  props: {
    tableStyle: {
      type: Array,
      required: true
    },
    hideMul: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isHide: false,
      show: false,
      hasSlots: false,
      obj: {
        text: "1111"
      },
      scope: {}
    };
  },
  methods: {},
  computed: {
    ...mapState(["isPhone"])
  },
  created() {},
  mounted() {
    let $this = this;
    // TODO 处理界面刷新有问题
    this.$nextTick(() => {
      $this.show = true;
      $this.$forceUpdate();
    });
  }
};
</script>

<style scoped>
.info-table-item {
}
</style>

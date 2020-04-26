<template>
  <div class="type-select">
    <template v-if="isPhone">
      <popup-picker
              v-model="phoneSelectVal"
              :placeholder="title"
              :data="formatData()"
              value-text-align="left">
      </popup-picker>
    </template>
    <template v-else>
      <el-select v-model="selectVal" :placeholder="title">
        <el-option v-for="(item,index) in selectList" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </template>
  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import PopupPicker from "vux/src/components/popup-picker/index";
  import BaseComponent from "../script/common/BaseComponent";

  export default {
    name: "TypeSelect",
    extends: BaseComponent,
    components: {PopupPicker},
    props: {
      selectList: {
        type: Array,
        required: true
      },
      title: {
        type: String
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    data() {
      return {
        selectVal: '',
        // 手机模式
        phoneSelectVal: []
      }
    },
    computed: {
      ...mapState(['isPhone']),
    },
    methods: {
      init() {},
      formatData() {
        let data = [];
        for (let i = 0; i < this.selectList.length; i++) {
          data.push(this.selectList[i].label);
        }
        data.length === 0 && (data = [this.$t('_admin_plugin.no_data')]);
        return [data];
      }
    },
    watch: {
      selectVal: {
        handler(newVal, oldVal) {
          this.$emit('change', newVal);
        }
      },
      phoneSelectVal: {
        handler(newVal, oldVal) {
          let label = newVal[0];
          let val = '';
          for (let i = 0; i < this.selectList.length; i ++) {
            if (label === this.selectList[i].label) {
              val = this.selectList[i].value;
              break;
            }
          }
          this.selectVal = val;
        },
        deep: true
      }
    },
    created() {

    },
    mounted() {
    },
  }
</script>

<style scoped>
  .type-select {display: inline-block;height:40px;padding-top:1px}
</style>
<style>
  .type-select .vux-cell-box {display:inline-block;min-width:80px;padding: 0 26px 0 6px;border: 1px solid #dcdfe6;height:36px;line-height: 36px;border-radius: 4px;}
  .type-select .vux-cell-box .weui-cell,
  .type-select .vux-cell-box .vux-cell-primary,
  .type-select .vux-cell-box .vux-popup-picker-select
  {height:100%}

  .type-select .vux-cell-box .weui-cell__ft {text-align: right;color:#999;padding-right:13px;position:absolute;top:50%;right:6px;transform: translateY(-50%)}
  .type-select .vux-cell-box .weui-cell__ft:after {
    content: " ";
    display: inline-block;
    height: 8px;
    width: 8px;
    border-width: 0 2px 2px 0;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
    transform: matrix(.71,.71,-.71,.71,0,0);
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
  }
</style>

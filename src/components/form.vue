<template>
  <div>
    <el-dialog
      :title="showForm.type === 0 ? '添加' : '更新'"
      :visible.sync="showForm.show"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="显示排序" prop="sort">
          <el-input placeholder="显示排序" v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="支付名称" prop="name">
          <el-input placeholder="支付名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="支付渠道(小类)" prop="channel">
          <el-input
            placeholder="支付渠道名称"
            v-model="form.channel"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付方式(大类)">
          <el-select v-model="form.type">
            <el-option label="支付宝" value="zhifubao"></el-option>
            <el-option label="微信" value="weixin"></el-option>
            <el-option label="银联" value="yinlian"></el-option>
            <el-option label="银行卡转账" value="yinhangka"></el-option>
            <el-option label="VIP充值" value="chongzhi"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义金额">
          <el-radio-group v-model="form.custom">
            <el-radio label="固定金额"></el-radio>
            <el-radio label="自定义金额"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="this.form.custom === '自定义金额'"
          label="最大自定义金额"
        >
          <el-input v-model="form.maxcustom"></el-input>
        </el-form-item>
        <el-form-item
          v-if="this.form.custom === '自定义金额'"
          label="最小自定义金额"
        >
          <el-input v-model="form.mincustom"></el-input>
        </el-form-item>
        <el-form-item label="常用充值金额" prop="common">
          <el-input
            placeholder="请输入充值金额"
            v-model="form.common"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-radio-group v-model="form.recommend">
            <el-radio label="不推荐"></el-radio>
            <el-radio label="推荐"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否生效">
          <el-radio-group v-model="form.operant">
            <el-radio label="不生效"></el-radio>
            <el-radio label="生效中"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit(form)">确 定</el-button>
        <el-button @click="dialogFormVisible">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations,mapState } from "vuex";
import store from "vuex";
export default {
  data() {
    return {
      form: {
        sort: "",
        name: "",
        channel: "",
        type: "支付宝",
        custom: "固定金额",
        common: "",
        remark: "0",
        maxcustom: "0",
        mincustom: "0",
        recommend: "不推荐",
        operant: "不生效"
      },
      rules: {
        sort: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        channel: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        common: [{ required: true, message: "充值金额不合法", trigger: "blur" }]
      }
    };
  },
  computed: {
    editItem() {
      return this.$store.state.EditItem;
    },
    ...mapState(["showForm"])
  },
  watch: {
    editItem(val) {
      this.form = val
    }
  },
  methods: {
    onSubmit() {
      //表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          //1.将form数据传递到paylist,新增到table中先显示一个dom
          this.$store.commit("ADD_PAYITEM", this.form);
          //2.发送请求追加数据到后台-------------------------------------------------------------

          // console.log("发送请求");

          //3.关闭新增的弹框
          this.forminit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dialogFormVisible() {
      //关闭新增的弹框
      this.forminit();
    },
    forminit() {
      this.$listeners.change(false);
      this.form = {
        sort: "",
        name: "",
        channel: "",
        type: "支付宝",
        custom: "固定金额",
        common: "",
        remark: "0",
        maxcustom: "0",
        mincustom: "0",
        recommend: "不推荐",
        operant: "不生效"
      };
    }
  }
};
</script>

<style>
/* 
点击取消和确认先要关闭弹框
如果是取消什么都不做
如果是确认
2. 检验通过,先给form表单添加一条数据,为了显示dom,然后再发送请求给后台添加该条数据
 */
</style>

<template>
  <div id="MemCardList—main">
    <div class="input-area">
      <el-input v-model="format.child_id" placeholder="子后台ID" size="medium"></el-input>
      <el-input v-model="format.user_id" placeholder="请输入用户id" size="medium"></el-input>
      <el-input v-model="format.channel_id" placeholder="请输入渠道id" size="medium"></el-input>
      <el-input v-model="format.bank_card" placeholder="银行卡号" size="medium"></el-input>
      <el-input v-model="format.cardholder_name" placeholder="银行卡姓名" size="medium"></el-input>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
    </div>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        <el-table-column v-for="item in tableStyle" :prop="item.prop" :label="item.label" :width="item.width"
                         align="center">
          <template slot-scope="scope">
            <template
              v-if="['user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(item.prop) >= 0">
              <p v-for="(label, ind) in scope.row[item.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="item.prop === 'action'">
              <permission-button :action="btn.type" v-for="btn in scope.row[item.prop]" @click="handeClick(btn)"
                                 style="cursor: pointer; padding-left: 5px;">
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(item.prop) < 0">
              {{scope.row[item.prop]}}
            </template>
          </template>
        </el-table-column>
      </info-table>
    </div>
    <!--修改会员银行卡 -->
    <div>
      <el-dialog title="修改会员银行卡" :visible.sync="dialogModifyVisible" width="30%" center>
        <el-form :model="modify_member_card">
          <el-form-item label="持卡人姓名" label-width="100px">
            <el-input v-model="modify_member_card.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属银行" label-width="100px">
            <el-select v-model="modify_member_card.value" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in banks"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行卡号" label-width="100px">
            <el-input v-model="modify_member_card.bank_card" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="银行卡开户行" label-width="100px">
            <el-input v-model="modify_member_card.open_bank" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属省份" label-width="100px">
            <!--            <el-input v-model="modify_member_card.provinces" autocomplete="off"></el-input>-->
            <el-select v-model="modify_member_card.province" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属城市" label-width="100px">
<!--            <el-input v-model="modify_member_card.city" autocomplete="off"></el-input>-->
            <el-select v-model="modify_member_card.city" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in citys"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogModifyVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogModifyVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import InfoTable from '../../../plugin/components/InfoTable'
  import PageInfo from "../../../plugin/script/common/PageInfo"
  import BaseIframe from "../../../plugin/script/common/BaseIframe"
  import PermissionButton from "../../../plugin/components/PermissionButton"

  export default {
    name: "MemCardList",
    extends: BaseIframe,
    components: {InfoTable, PermissionButton},
    data() {
      let $this = this;
      return {
        // date: [],
        format: {
          child_id: '', //子后台id
          user_id: '', //用户id
          channel_id: '',//渠道id
        },
        tableStyle: [
          {label: '渠道ID', prop: 'channel_id', width: ''},
          {label: '用户ID', prop: 'user_id', width: ''},
          {label: '所属银行', prop: 'belong_bank', width: ''},
          {label: '银行卡号', prop: 'bank_card', width: ''},
          {label: '银行卡开户行', prop: 'open_bank', width: ''},
          {label: '持卡人姓名', prop: 'cardholder_name', width: ''},
          {label: '创建时间', prop: 'creation_time', width: '160'},
          {label: '修改时间', prop: 'modify_time', width: '160'},
          {label: '操作', prop: 'action', width: '200'},
        ],
        records: [{
          channel_id: '01',
          user_id: '1001100',
          belong_bank: '中国银行',
          bank_card: '622790876671282917',
          open_bank: '北京朝阳支行',
          cardholder_name: '武广',
          creation_time: '2019-03-06 12:00:00',
          modify_time: '2019-03-06 12:00:00',
          action: [
            {
              label: '修改', type: 'edit'
            },
            {
              label: '删除', type: 'delete'
            }
          ],
        }],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        /*修改银行卡信息*/
        dialogModifyVisible: false,
        modify_member_card: {
          name: '',
          value: '',
          bank_card: '',
          open_bank: '',
          province: '',
          city: '',
        },
        provinces: [{
          value: '1',
          label: '四川省'
        }, {
          value: '2',
          label: '广东省'
        }, {
          value: '3',
          label: '湖南省'
        }, {
          value: '4',
          label: '云南省'
        }, {
          value: '5',
          label: '福建省'
        }],
        citys: [{
          value: '1',
          label: '成都市'
        }, {
          value: '2',
          label: '北京市'
        }, {
          value: '3',
          label: '上海市'
        }, {
          value: '4',
          label: '天津市'
        }, {
          value: '5',
          label: '重庆市'
        }],
        banks: [{
          value: '1',
          label: '中国银行'
        }, {
          value: '2',
          label: '交通银行'
        }, {
          value: '3',
          label: '招商银行'
        }, {
          value: '4',
          label: '广大银行'
        }, {
          value: '5',
          label: '浦发银行'
        }],
      }
    },
    methods: {
      search() {
        console.log('这是查询');
      },
      handeClick(btn) {
        if (btn.type === 'edit') {
          this.dialogModifyVisible = true;
        }
      }
    }
  }
</script>

<style scoped>
  @import "./../../../assets/styles/common.css";
</style>

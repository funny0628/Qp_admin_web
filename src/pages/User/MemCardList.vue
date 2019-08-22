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
        <el-table-column v-for="(item,index) in tableStyle" :prop="item.prop" :label="item.label" :width="item.width" :key="index"
                         align="center">
          <template slot-scope="scope">
            <template
              v-if="['user_gold', 'alipay_account', 'account_person','registration_time'].indexOf(item.prop) >= 0">
              <p v-for="(label, ind) in scope.row[item.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="item.prop === 'action'">
              <permission-button :action="btn.type" v-for="(btn,index) in scope.row[item.prop]" :key="index" @click="handeClick(btn)"
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
  import InfoTable from '../../plugin/components/InfoTable'
  import PageInfo from "../../plugin/script/common/PageInfo"
  import BaseIframe from "../../plugin/script/common/BaseIframe"
  import PermissionButton from "../../plugin/components/PermissionButton";
  import UserHandler from '../../script/handlers/UserHandler'

  export default {
    name: "MemCardList",
    extends: BaseIframe,
    components: {InfoTable, PermissionButton},
    data() {
      let $this = this;
      return {
        format: {
          child_id: '', //子后台id
          user_id: '', //用户id
          channel_id: '',//渠道id
        },
        tableStyle: [
          {label: '渠道ID', prop: 'platform_id', width: ''},
          {label: '用户ID', prop: 'user_id', width: ''},
          {label: '所属银行', prop: 'bank_name', width: ''},
          {label: '银行卡号', prop: 'bank_card', width: ''},
          {label: '银行卡开户行', prop: 'bank_user', width: ''},
          {label: '持卡人姓名', prop: 'cardholder_name', width: ''},
          {label: '创建时间', prop: 'created_at', width: '160'},
          {label: '修改时间', prop: 'updated_at', width: '160'},
          {label: '操作', prop: 'action', width: '200'},
        ],
        records: [{
          platform_id: '01',
          user_id: '1001100',
          bank_name: '中国银行',
          bank_card: '622790876671282917',
          bank_user: '北京朝阳支行',
          cardholder_name: '武广',
          created_at: '2019-03-06 12:00:00',
          updated_at: '2019-03-06 12:00:00',
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
      },
      //会员银行卡列表
      getBank_list(){
        let data = {
          "platform_id": 1000,
          "user_id": "",
          "sub_id": 1000,
          "bank_card": "",
          "bank_user": ""
        };
        UserHandler.bank_list(data).promise.then(res=>{
          // console.log(res)
          if(Number(res.code) === 200){
            this.records = res.list
          }
        })
      }
    },
    mounted() {
      this.getBank_list();
    }
  }
</script>

<style scoped>
</style>
<!--银行卡列表-->

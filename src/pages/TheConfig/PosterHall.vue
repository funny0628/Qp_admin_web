<template>
  <div id="PosterHall-main">
    <input-area>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">新增</el-button>
      </permission-button>
    </input-area>
    <div class="bd">
      <info-table
        :search="search"
        :table-style="tableStyle"
        :records="records"
        :page-info="pageInfo"
      >
        <info-table-item :table-style="tableStyle">
          <template slot-scope="scope">
            <template v-if="['image'].indexOf(scope.prop) >= 0">
              <img :src="scope.row[scope.prop]" alt style="max-width: 80px;max-height: 30px;"/>
            </template>
            <template v-if="[ 'time'].indexOf(scope.prop) >= 0">
              <p v-for="(label, ind) in scope.row[scope.prop]" :key="ind">{{label}}</p>
            </template>
            <template v-if="'status'.indexOf(scope.prop) >= 0">
              <span v-if="Number(scope.row[scope.prop]) === 1">启用</span>
              <span v-else>禁用</span>
            </template>
            <template v-if="scope.prop === 'action'">
              <permission-button
                :action="btn.type"
                v-for="(btn,index) in scope.row[scope.prop]"
                :key="index"
                @click="handelClick(btn,scope.row)"
                style="cursor: pointer; padding-left: 5px;"
              >
                <span>{{btn.label}}</span>
              </permission-button>
            </template>
            <template
              v-if="['action', 'time','image','status'].indexOf(scope.prop) < 0"
            >{{scope.row[scope.prop]}}
            </template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <div class="dialog">
      <!-- 新增、修改 -->
      <el-dialog :title="dialogTitleType" :visible.sync="dialogVisible" width="50%">
        <el-form
          :model="formData"
          ref="formData"
          style="display: flex; justify-content: space-between;flex-wrap:wrap ;"
        >
          <el-form-item label="标题" :label-width="labelWidth" style="width: 50%;">
            <el-input autocomplete="off" v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="海报类型" :label-width="labelWidth" style="width: 50%;">
            <el-select v-model="formData.posters_type" placeholder="请选择海报类型" style="width: 100%;">
              <el-option
                v-for="item in posters"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传海报:" :label-width="labelWidth" style="width: 50%;">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogImgVisible">
              <img width="100%" :src="formData.image" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="用户分层" :label-width="labelWidth" style="width: 50%;">
            <el-checkbox-group v-model="formData.lay">
              <el-checkbox v-for="city in lays" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="动作类型:" :label-width="labelWidth" style="width: 50%;">
            <el-select v-model="formData.action_type" placeholder="请选择动作类型" style="width: 100%;">
              <el-option
                v-for="item in actions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:" :label-width="labelWidth" style="width: 50%;">
            <el-input autocomplete="off" v-model="formData.note" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="排序：" :label-width="labelWidth" style="width: 50%;">
            <el-input autocomplete="off" v-model="formData.poster_sorted" placeholder="请输入备注信息"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddEditClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import PermissionButton from "../../plugin/components/PermissionButton";
  import InfoTable from "../../plugin/components/InfoTable";
  import BaseIframe from "../../plugin/script/common/BaseIframe";
  import PageInfo from "../../plugin/script/common/PageInfo";
  import InfoTableItem from "../../plugin/components/InfoTableItem";
  import InputArea from "../../plugin/components/InputArea";
  import HallHandler from "../../script/handlers/HallHandler";

  export default {
    name: "PosterHall",
    extends: BaseIframe,
    components: {InputArea, PermissionButton, InfoTable, InfoTableItem},
    data() {
      return {
        tableStyle: [
          {label: "ID", prop: "poster_id", width: ""},
          {label: "标题", prop: "title", width: ""},
          {label: "图片", prop: "image", width: ""},
          {label: "排序", prop: "poster_sorted", width: ""},
          {label: "状态", prop: "status", width: ""},
          {label: "开始时间／结束时间", prop: "time", width: ""},
          {label: "操作", prop: "action", width: ""}
        ],
        records: [
          {
            poster_id: "1",
            title: "活动banner",
            image: "http://192.168.0.187:7300/public/images/group-default.png",
            poster_sorted: "1",
            status: 1,
            time: ['2019-01-01 12:00:00', '2019-01-04 12:00:00'],
            action: [
              {label: "修改", type: "edit"},
              {label: "删除", type: "delete"}
            ]
          }
        ],
        pageInfo: new PageInfo(0, [5, 10, 15], 0),
        //弹窗数据
        dialogTitleType: "",
        dialogVisible: false,
        labelWidth: "100px",
        formData: {
          poster_id:"",
          title: "",
          content: "",
          posters_type: "",
          action_type: "",
          note: "",
          lay: ["vip1", "vip2"],
          //上传图片
          image: ""
        },
        dialogImgVisible:false,
        lays: ["vip1", "vip2", "vip3", "vip4"],
        posters: [
          {
            value: "1",
            label: "轮播海报"
          },
          {
            value: "2",
            label: "弹出海报"
          },
          {
            value:"3",
            label:"绑定手机海报"
          }
        ],
        actions: [
          {
            value: "1",
            label: "跳转"
          },
          {
            value: "2",
            label: "复制"
          },
          {
            value:'3',
            label:"加入游戏"
          }
        ],
      };
    },
    methods: {
      search() {
        this.dialogTitleType = "新增大厅海报";
        this.dialogVisible = true;
      },
      //表格操作
      handelClick(btn, row) {
        if (btn.type === "edit") {
          this.dialogTitleType = "修改大厅海报";
          this.dialogVisible = true;
        } else {
          //删除操作
          let data = {
            poster_id: row.poster_id,
            platform_id: 1000,
            pg_id: row.pg_id
          };
          this.handelDelete(data)
        }
      },
      //上传图片
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.formData.image = file.url;
        this.dialogImgVisible = true;
      },
      //获取大厅海报
      getPosterList() {
        HallHandler.poster_list().promise.then(res => {
          // console.log(res);
          if (Number(res.code) === 200) {
            this.records.push(res.data);
          }
          //数据处理
          this.records.map(item => {
            item.action = [
              {label: "修改", type: "edit"},
              {label: "删除", type: "delete"}
            ];
          });
        });
      },
      //弹窗操作
      AddEditClick() {
        this.$refs.formData.validate(vaild => {
          if (vaild) {
            if (this.formData.poster_id) {
              const {poster_id,poster_type,title,status,enabled_at,expired_at,image,act,link,} = this.formDate
              let data = {
                poster_id:this.formData.poster_id,
                platform_id:1000,
                poster_type:this.formData.poster_type,
                title:this.formData.title,
                status:this.formData.status,
                enabled_at:this.formData.enabled_at,
                image:this.fromData.image,
                act:this.formData.act,
                link:this.formData
              };
              this.handelEdit(data)
            }else {
              let data = {
                platform_id:1000,
                poster_type:"",
                title:"",
                image:"",
                act:1,
                link:"",
                status:1,
                enabled_at:"",
                expired_at:"",
                group_type:1,
                val:"",
                comment:"",
                poster_sorted:""
              };
              this.handelAdd(data)
            }
          }
        })
      },
      //修改大厅海报
      handelEdit(data) {
        HallHandler.poster_set(data).promise.then(rs => {
          console.log(rs);
        })
      },
      //删除大厅海报
      handelDelete(data) {
        HallHandler.poster_delete(data).promise.then(rs => {
          console.log(rs);
        })
      },
      //增加大厅海报
      handelAdd(data) {
        HallHandler.poster_add(data).promise.then(rs => {
          console.log(rs);
        })
      },
      //大厅海报类型查询列表
      getPosterType(){
        let data = {
          platform_id : 1000
        };
        HallHandler.poster_type_list(data).promise.then(rs=>{
          console.log(rs);
        })
      },
      //大厅海报点击动作查询列表
      getPosterAct(){
        let data = {
          platform_id : 1000
        };
        HallHandler.poster_act_list(data).promise.then(rs=>{
          console.log(rs);
        })
      }
    },
    mounted() {
      this.getPosterType();
      this.getPosterAct();
      this.getPosterList();
    }
  };
</script>

<style scoped>
  #PosterHall-main .bd p {
    margin: 0;
  }
</style>
<!--大厅海报-->

<template>
  <div
    id="MoneyTree"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <!-- title -->
    <div class="title">
      <el-button type="primary" @click="add">添加</el-button>
      <el-button v-has="'rainmaker_config_send'" type="primary" @click="send(2)">发送服务器配置</el-button>
    </div>
    <!-- table -->
    <div class="table" v-has="'rainmaker_config_detail'">
      <el-table
        :data="tableData"
        highlight-current-row
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="level"
          label="等级"
          align="center"
 
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="draw_num"
          label="摇奖次数"
          align="center"
 
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="icon_cash_cow_url"
          label="摇钱树图标展示"
          align="center"
 
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <img :src="$baseUrl + scope.row.icon_cash_cow_url" />
          </template>
        </el-table-column>
        <el-table-column
          prop="award_coin"
          label="全任务金币奖励"
          align="center"
 
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="growth_value"
          label="升级所属成长值"
          align="center"
 
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="weight_info"
          label="摇一摇奖励"
          align="center"
 
          show-overflow-tooltip
        >
        </el-table-column>
         <el-table-column
          prop="week_change"
          label="操作"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- form -->
    <div class="form">
      <el-dialog
        :title="title"
        :visible.sync="visible"
        :destroy-on-close="true"
        width="60%"
      >
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-width="150px"
          style="margin-top:20px"
        >
          <el-form-item label="摇钱树等级" prop="level">
            <el-input
            type="number"
              style="width:220px"
              v-model="form.level"
              placeholder="摇钱树等级"
            ></el-input>
          </el-form-item>
          <el-form-item label="升级所需成长值" prop="growth_value">
            <el-input
            type="number"
              style="width:220px"
              v-model="form.growth_value"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="抽奖次数" prop="award_coin">
            <el-input
            type="number"
              style="width:220px"
              v-model="form.award_coin"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="摇钱树图展示" prop="icon_cash_cow_url">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="upLoad"
              :before-upload="beforeAvatarUpload"

              :on-change="fileChange"
            >
              <img
                v-if="form.icon_cash_cow_url"
                :src="form.icon_cash_cow_url"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="全任务金币奖励数量" prop="draw_num">
            <el-input
            type="number"
              style="width:220px"
              v-model="form.draw_num"
              placeholder="0"
            ></el-input>
          </el-form-item>
          <el-form-item label="摇一摇金币奖励数量" prop="weight_info">
            <el-input
              style="width:80%"
              v-model="form.weight_info"
              placeholder="1=2 ... 以 , 分隔"
            ></el-input>
            <p>(金额1=权重1,金额2=权重2,...以 , 分隔)</p>
          </el-form-item>
        </el-form>
        <div style="margin-top:20px" slot="footer" class="dialog-footer">
          <el-button v-has="'rainmaker_config_save'" type="primary" @click="onSubmit('form', title)"
            >保 存</el-button
          >
          <el-button type="primary" @click="back()">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DeepData from "../../../assets/js/formate.js";
export default {
  name:'rainmaker_config',
  data() {
     let checkTime = (rule,value,callback) => {
      if(value === '') {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    };
     let checkImg = (rule,value,callback) => {
      if(value === '') {
        return callback(new Error('必填项不可以为空!!'))
      }else{
        callback();
      }
    };
     let checkWeight = (rule,value,callback) => {
      let reg = /^([-+] ?)?[0-9]+(,[0-9]+)?(=[0-9]+)?$/
      if(value !== '') {
        if(!reg.test(value)){
          return callback(new Error('请按照提示的格式填写!!'))
        }else{
          callback();
        }
      }else{
        return callback(new Error('必填项不可以为空!!'))
      }
    };
    
    return {
      tableData: [],
      visible: false,
      form: {
        level: "",
        growth_value: "",
        award_coin: "",
        draw_num: "",
        icon_cash_cow_url: "",
        weight_info: ""
      },
      initform: {
        level: "",
        growth_value: "",
        award_coin: "",
        draw_num: "",
        icon_cash_cow_url: "",
        weight_info: ""
      },
      rules: {
        level: [
          { required: true, validator: checkTime, trigger: "blur" }
        ],
        growth_value: [
          { required: true, validator: checkTime, trigger: "blur" }
        ],
        award_coin: [
          { required: true, validator: checkTime, trigger: "blur" }
        ],
        draw_num: [
          { required: true, validator: checkTime, trigger: "blur" }
        ],
        weight_info: [
          { required: true, validator: checkWeight, trigger: "blur" }
        ],
        icon_cash_cow_url: [
          { required: true, validator: checkImg, trigger: "blur" }
        ]
      },
      title: "新增等级",
      keys: "",
      id: "",
      allData: {},
      servebg_url: "",
      loading: false,
      ResData:{},
      //默认没有改过
      imageChange:false,
      currentIndex:-1
    };
  },
  created() {
    this.initData();
  },
  methods: {
    add() {
      this.editForm(true, "新增", this.initform);
    },

    //编辑
    handleEdit(index,row){
      this.currentIndex = index
      this.editForm(true, "编辑", {...row});
    },

    //删除
    handleDelete(index,row){
      this.$confirm('确认永久删除？')
          .then(_ => {
           this.tableData = this.tableData.filter((item, idx) => {
              return index !== idx;
            });
            this.initBackData(this.tableData)
          })
          .catch(_ => {
               this.$message({
                type: "info",
                message: "取消删除!"
              });
          });
    },
    async send(type) {
      //发送post
      this.initBackData(this.tableData,type) 
    },

    upLoad(file) {
      const formData = new FormData();
      formData.append("filename", file.file);
      formData.append("types", 1);
      this.$http.post("v1/backend/upload", formData).then(data => {
        if (data.data.code === 1 && data.data.msg === "ok") {
          this.servebg_url = data.data.path;
        }
      });
    },

    beforeAvatarUpload(file) {
      if (file) {
        // console.log(file,'文件',URL.createObjectURL(file));
        this.$set(this.form,'icon_cash_cow_url',URL.createObjectURL(file))
      }
    },
    fileChange(file, fileList){
      // console.log(file, fileList,'文件改变了');
      if(file){
        this.imageChange = true
      }
    },
 

    onSubmit(formName, title) {
      // console.log(this.form);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (title === "新增") {
            this.form.icon_cash_cow_url = this.servebg_url
            this.tableData.push(this.form);
            console.log(this.tableData);
          } else if (title === "编辑") {
            // console.log(this.form);
            if(this.imageChange){
              // console.log('图片改过啦');
              this.form.icon_cash_cow_url = this.servebg_url
              // console.log(this.form);
              this.imageChange = false
            }
            
            let resTable = [];
            this.tableData.forEach((item, index) => {
              resTable.push(item);
              if (this.currentIndex === index) {
                resTable[index] = this.form;
              }
            });
            this.tableData = resTable;
            console.log(this.tableData);
            
          }
          this.initBackData(this.tableData,1)        
          this.editForm(false, "新增", this.initform);
        } else {
          this.$message({
            type: "warning",
            message: "必填的项不可以为空!"
          });
          return false;
        }
      })
    },
    back() {
      this.editForm(false, "新增", this.initform);
    },

    async initBackData(tableData,type){
        let RestableData = JSON.parse(JSON.stringify(tableData))
          RestableData.forEach((item)=>{
            item.level = +item.level
            item.growth_value = +item.growth_value
            item.award_coin = +item.award_coin
            item.draw_num = +item.draw_num
            let infoObj = {}
            item.weight_info = item.weight_info.split(',')
           
          })

           RestableData.forEach((item)=>{
             let infoObj = {}
            item.weight_info.forEach((it,idx)=>{
              infoObj[idx + 1] = it
            })
            item.weight_info = infoObj
           })
          //  console.log(RestableData);
            RestableData.forEach((item,index)=>{
              let weightArr ={}
              let weightObj = {}
              Object.values(item.weight_info).forEach((it,idx)=>{
                // let weightObj = {}
                weightObj.coin = +it.split('=')['0']
                weightObj.weight = +it.split('=')['1']
                it = weightObj
                // console.log(weightObj,it);
                weightArr[idx + 1] = weightObj
              })
              item.weight_info = weightArr
           })
          //  console.log(obj);
           
          console.log(RestableData);
          let ObjRes = {}
          RestableData.forEach((item,index)=>{
            ObjRes[index + 1] = item
          })
          // console.log(ObjRes);
           Object.keys(this.ResData).forEach((item)=>{
            if(item === '112'){
              this.ResData[item].ac_content.cash_cow = ObjRes
            }
          })
          console.log(this.ResData);

          if(type === 2){
            let { data } = await this.$http.HallFunConfig.PostActivityNew33({
              keys: this.keys,
              values: JSON.stringify(this.ResData),
              id: this.id
            });
            console.log(data);
             if (data.code === 1 && data.msg === "ok") {
              this.initData()
              this.$message({
                type: "success",
                message: "发送服务器配置成功!"
              });
            } else {
              this.$message({
                type: "warning",
                message: "发送服务器配置失败!"
              });
            }
          }else{
              let { data } = await this.$http.HallFunConfig.PutActivityNew33({
              keys: this.keys,
              values: JSON.stringify(this.ResData),
              id: this.id
            });
          // console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.initData()
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            } else {
              this.$message({
                type: "warning",
                message: "保存失败!"
              });
            }
          }
    },
    editForm(visible, title, form) {
      this.visible = visible;
      this.title = title;
      this.form = form;
    },

    async initData() {
      let { data } = await this.$http.HallFunConfig.GetActivityNew33({
        key: "activity_new.lua"
      });
      console.log(data);
      this.keys = data.data[0].sys_key;
      this.id = data.data[0].id;
      let res = data.data[0].sys_val;
      this.allData = JSON.parse(res);
      console.log(this.allData);
       this.ResData = JSON.parse(JSON.stringify(this.allData))
      console.log(this.ResData);
      Object.keys(this.allData).forEach(item => {
        if (item === "112") {
          this.tableData = Object.values(
            this.allData[item].ac_content.cash_cow
          );
        }
      });

      this.tableData.forEach(item => {
        let weight = "";
        Object.values(item.weight_info).forEach(it => {
          item.weight_info = weight += `${it.coin}=${it.weight},`;
          item.weight_info = item.weight_info.substring(
            0,
            item.weight_info.lastIndexOf(",")
          );
        });
      });
      console.log(this.tableData, this.allData);
    }
  }
};
</script>

<style lang="less" scoped>
#MoneyTree {
  .title {
    margin-top: 20px;
  }
  .table {
    margin: 20px;
    img {
      width: 100%;
      object-fit: scale-down;
    }
  }
  .form {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      border: 1px dashed #ccc;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      border: 1px dashed #ccc;
    }
  }
}
</style>

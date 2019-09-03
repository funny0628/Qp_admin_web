<template>
  <div id="packagemanage">
    <input-area>
     <el-select v-model="runvalue" placeholder="运营" size="medium">
    <el-option
      v-for="item1 in runoptions"
      :key="item1.value1"
      :label="item1.label1"
      :value="item1.value1"> 
    </el-option>
  </el-select>
    <el-select v-model="platformvalue" placeholder="平台" size="medium">
    <el-option
      v-for="item2 in platformoptions"
      :key="item2.value2"
      :label="item2.label2"
      :value="item2.value2"> 
    </el-option>
  </el-select>
      <el-input v-model="package_id" placeholder="请输入包id" size="medium"></el-input>
      <el-input v-model="mark" placeholder="标示" size="medium" class="w-160"></el-input>
      <el-input v-model="package_status" placeholder="包状态" size="medium"></el-input>
      <select-time :date="date" :select-date.sync="date"></select-time>
      <permission-button :action="ActionType.READ" @click="search()">
        <el-button type="primary" size="medium">查询</el-button>
      </permission-button>
      <permission-button :action="ActionType.ADD" @click="addpackage=true">
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
            <template v-if="scope.prop==='belong'">
              <p v-for="(ite,ind) in scope.row[scope.prop]" :key="ind">{{ite}}</p>
            </template>
            <template v-if="scope.prop==='operate'">
              <el-button type="text" @click="addpackage=true">编辑</el-button>
              <el-button type="text">禁用</el-button>
              <el-button type="text">推广链接</el-button>
            </template>
            <template v-if="['belong','operate'].indexOf(scope.prop) < 0">{{scope.row[scope.prop]}}</template>
          </template>
        </info-table-item>
      </info-table>
    </div>
    <el-dialog :visible.sync="addpackage" width="50%" title="新增包设置">
      <div class="checkbox">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="平台名称" prop="platform" class="formleft">
                <el-input v-model="ruleForm.platform" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="唯一标识" prop="mark">
                <el-input v-model="ruleForm.mark" placeholder="请输入标识"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="绑定用户" prop="user" class="formleft">
                <el-input v-model.number="ruleForm.user" placeholder="（6-8位数字）"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下载地址" prop="url">
                <el-input v-model="ruleForm.url" placeholder="请输入下载地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="大厅热更" prop="lobbyupdate" class="lobbyupdate">
                <el-switch v-model="ruleForm.lobbyupdate"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="包状态" prop="packagestatus" class="packagestatus">
                <el-switch v-model="ruleForm.packagestatus"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="游戏开放" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="游戏1" name="type"></el-checkbox>
                  <el-checkbox label="游戏2" name="type"></el-checkbox>
                  <el-checkbox label="游戏3" name="type"></el-checkbox>
                  <el-checkbox label="游戏4" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addpackage = false" class="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="addpackage = false,submitForm('ruleForm')"
          class="confirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import SelectTime from "../../plugin/components/SelectTime";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  extends: BaseIframe,
  components: {InputArea, SelectTime, InfoTable, PermissionButton,InfoTableItem },
  data() {
    var validateid = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error("密码为纯数字"));
      } else if (value.toString().length < 6 || value.toString().length > 8) {
        return callback(new Error("密码位数为6-8位"));
      } else {
        callback();
      }
    };
    return {
      package_id: "",
      mark: "",
      package_status: "",
      date: [],
      addpackage: false,
      runvalue:'',
      platformvalue:'',
      ruleForm: {
        platform: "",
        mark: "",
        user: "",
        url: "",
        lobbyupdate: true,
        packagestatus: true,
        type: []
      },
      rules: {
        platform: [
          { required: true, message: "请输入平台名称", trigger: "blur" }
        ],
        mark: [{ required: true, message: "请输入唯一标识", trigger: "blur" }],
        user: [
          { required: true, message: "请输入用户id", trigger: "blur" },
          { validator: validateid, trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个游戏",
            trigger: "change"
          }
        ]
      },
      tableStyle: [
        { label: "包ID", prop: "packageid", width: "" },
        { label: "标识", prop: "mark", width: "" },
        { label: "平台名称", prop: "platform", width: "" },
        { label: "包所属用户", prop: "belong", width: "260" },
        { label: "下载地址", prop: "download", width: "205" },
        { label: "大厅热更新", prop: "update", width: "" },
        { label: "游戏开放", prop: "open", width: "230" },
        { label: "扣费", prop: "deduction", width: "" },
        { label: "下级玩家总数", prop: "lowerplayernum", width: "" },
        { label: "状态", prop: "status", width: "" },
        { label: "创建时间", prop: "createtime", width: "205" },
        { label: "操作", prop: "operate", width: "250" }
      ],
      records: [
        {
          packageid: 1,
          mark: "2",
          platform: "666",
          belong: ["已绑定用户ID：100001", "已绑定管理员账号：000000001"],
          download: "www.baidudsfse.com",
          update: "开启",
          open: "游戏1、游戏2、游戏3、游戏4",
          deduction: "-",
          lowerplayernum: "100",
          status: "开启",
          createtime: "20190822 12:00:00",
        }
      ],
      runoptions:[
        {
          value1: '选项1',
          label1: '黄金糕'
        }, {
          value1: '选项2',
          label1: '双皮奶'
        }, {
          value1: '选项3',
          label1: '蚵仔煎'
        },
      ],
      platformoptions:[
          {
          value2: '选项1',
          label2: '黄金糕'
        }, {
          value2: '选项2',
          label2: '双皮奶'
        }, {
          value2: '选项3',
          label2: '蚵仔煎'
        },
      ],
      pageInfo: new PageInfo(0, [10, 15, 20], 0)
    };
  },
  methods: {
    search() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.bd{
  margin: 0 20px;
}
.el-row {
  margin: 10px 0 30px;
}
.lobbyupdate {
  margin-left: 8px;
}
.packagestatus {
  margin-left: 8px;
}
.cancel,
.confirm {
  width: 160px !important;
  color: #fff !important;
  font-size: 15px !important;
  font-weight: 650 !important;
}
.cancel {
  background-color: #ccc;
  border: transparent;
  margin-right: 100px;
}
.confirm {
  margin-left: 100px;
}
#packagemanage .bd p {
  margin: 0;
}
.select-time{
  margin-right: 10px !important;
}
#packagemanage .el-button.el-button--primary.el-button--medium{
margin-left: 0px!important;
  margin-right: 5px !important;
}
</style>

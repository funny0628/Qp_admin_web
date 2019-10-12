<template>
  <div id="setlimit">
    <input-area>
      <div class="row">
        <div class="label">角色名称</div>
        <div class="input">
          <el-input size="medium" v-model="user_name" placeholder="请输入角色名"></el-input>
        </div>
      </div>
      <div class="row">
        <div class="label">角色描述</div>
        <div class="input">
          <el-input size="medium" v-model="user_describe" placeholder="请输入角色名"></el-input>
        </div>
      </div>
      <div class="row">
        <div class="label">授权管理</div>
      </div>
    </input-area>
    <div class="permission-bd">
      <el-table
        :data="permission"
        row-key="menu"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          v-for="(item, index) in tableStyle"
          :prop="item.prop"
          :label="item.label"
          :key="index"
        >
          <template slot-scope="scope">
            <template v-if="index !== 1">{{scope.row[item.prop]}}</template>
            <template v-if="index === 1">
              <el-checkbox-group v-model="checkList[scope.row[item.prop].key]">
                <el-checkbox
                  v-for="it in scope.row[item.prop].list"
                  :label="it.name"
                  :key="it.name"
                  @change="singleCheckboxChange(
                  checkList[scope.row[item.prop].key].indexOf(it.name) >= 0,
                  it.name,
                  scope.row[item.prop].key
                )"
                >{{it.text}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="t-c" style="margin-top:20px">
        <el-button type="info" size="medium" @click="back()">取消</el-button>
        <permission-button :action="ActionType.EDIT">
          <el-button type="primary" size="medium">提交</el-button>
        </permission-button>
      </div>
    </div>
  </div>
</template>
<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import InputArea from "../../plugin/components/InputArea";
import RoleHandler from "../../script/handlers/RoleHandler";

export default {
  components: { InputArea, PermissionButton },
  extends: BaseIframe,
  data() {
    return {
      user_name: "",
      user_describe: "",
      user_id: 2000,
      permission: [],
      datalist:[],
      checkList: {},
      tableStyle: [
        { label: "菜单", prop: "menu", width: "" },
        { label: "全选", prop: "model", width: "" }
      ],
      originchecklist: {}
    };
  },
  created() {
    this.init();
    this.getmsg();
  },
  methods: {
    init() {
      /** 测试数据 **/
      let examplePermission = [
        {
          menu: "账户管理",
          model: {
            key: "user",
            list: [new PermissionCheckbox("all", "全部", 1)]
            // list: [{ name: "all", text: "全部", val: 1 }]
          },
          children: [
            {
              menu: "充值记录",
              model: {
                key: "depositRecords",
                list: [
                  new PermissionCheckbox("all", "全部", 1),
                  new PermissionCheckbox("read", "查看", 1)
                ]
              }
            },
            {
              menu: "登陆日志",
              model: {
                key: "loginRecords",
                list: [
                  new PermissionCheckbox("all", "全部", 1),
                  new PermissionCheckbox("read", "查看", 1)
                ]
              }
            }
          ]
        },
        {
          menu: "权限管理",
          model: {
            key: "permission",
            list: [new PermissionCheckbox("all", "全部", 1)]
          },
          children: [
            {
              menu: "角色列表",
              model: {
                key: "userList",
                list: [
                  new PermissionCheckbox("all", "全部", 1),
                  new PermissionCheckbox("read", "查看", 1)
                ]
              }
            },
            {
              menu: "账户列表",
              model: {
                key: "accountList",
                list: [
                  new PermissionCheckbox("all", "全部", 1),
                  new PermissionCheckbox("read", "查看", 1)
                ]
              }
            }
          ]
        }
      ];

      this.permission = examplePermission;
      this.checkList = (function() {
        let selectLs = ls => {
          let obj = {};
          for (let i = 0; i < ls.length; i++) {
            let item = ls[i];
            obj[item.model.key] = (function() {
              let ls = [];
              for (let j = 0; j < item.model.list.length; j++) {
                let it = item.model.list[j];
                if (it.val === 1) {
                  ls.push(it.name);
                }
              }
              return ls;
            })();

            if (item.children && item.children.length > 0)
              obj = { ...obj, ...selectLs(item.children) };
          }
          return obj;
        };
        return selectLs(examplePermission);
      })();

      this.originchecklist = JSON.parse(JSON.stringify(this.checkList));
      for (let prop in this.checkList) {
        this.checkList[prop] = [];
      }
      // console.log(this.modelPath);
      // console.log(this.originchecklist);
    },
    // TODO 硬编码
    singleCheckboxChange(val, name, model) {
      // console.log(val, name, model);

      /** 点击全部 **/
      if (name === "all") {
        // 判断当前点击是否为第一层级
        if (this.modelPath.hasOwnProperty(model)) {
          //  选中
          if (val) {
            for (let prop of this.modelPath[model]) {
              this.checkList[prop] = this.originchecklist[prop];
            }
          }
          // 非选中
          else {
            for (let prop of this.modelPath[model]) {
              this.checkList[prop] = [];
            }
          }
        }
        // 非第一层级
        else {
          // 选中
          if (val) {
            this.checkList[model] = this.originchecklist[model];
            let count = 0;
            for (let p in this.modelPath) {
              if (this.modelPath[p].indexOf(model) != -1) {
                for (let k of this.modelPath[p]) {
                  if (
                    this.checkList[k].length == this.originchecklist[k].length
                  ) {
                    count++;
                  }
                }
                if (count == this.modelPath[p].length) {
                  this.checkList[p] = this.originchecklist[p];
                } else {
                  this.checkList[p] = [];
                }
              }
            }
          }
          // 非选中
          else {
            this.checkList[model] = [];
            for (let p in this.modelPath) {
              if (this.modelPath[p].indexOf(model) != -1) {
                this.checkList[p] = [];
              }
            }
          }
        }
      }
      // 非全选
      else {
        // 判断当前行是否已经全选
        if (val) {
          let value = JSON.parse(
            JSON.stringify(this.originchecklist[model])
          ).slice(1);
          if (this.checkList[model].length == value.length) {
            this.checkList[model] = this.originchecklist[model];

            // 判断所有行是否已经全选
            let count = 0;
            for (let p in this.modelPath) {
              if (this.modelPath[p].indexOf(model) != -1) {
                for (let k of this.modelPath[p]) {
                  if (
                    this.checkList[k].length == this.originchecklist[k].length
                  ) {
                    count++;
                  }
                }
                if (count == this.modelPath[p].length) {
                  this.checkList[p] = this.originchecklist[p];
                } else {
                  this.checkList[p] = [];
                }
              }
            }
          }
        } else {
          for (let i = 0; i < this.checkList[model].length; i++) {
            if (this.checkList[model][i] == "all") {
              this.checkList[model].splice(i, i + 1);
            }
          }
          for (let p in this.modelPath) {
            if (this.modelPath[p].indexOf(model) != -1) {
              this.checkList[p] = [];
            }
          }
        }
      }
    },
    getmsg(){
      let data={}
      RoleHandler.newrole(data, this.user_id).promise.then(res=>{
        console.log(res)
        const { data, msg, code } = res;
        if(Number(code) == 200){
          if(data.length>0){
             for(let i=0;i<data.length;i++){  
               this.datalist[i]={};
               this.datalist[i].model={};
                this.datalist[i].power_name=data[i].power_name;
                this.datalist[i].power=data[i].power;



           }
           console.log('--------',this.datalist)
          }else{
            return;
          }
        } else {
          return this.$message.error(msg);
        }
      })
    }
  },
  computed: {
    modelPath() {
      let obj = {};
      for (let i = 0; i < this.permission.length; i++) {
        let permissionObj = this.permission[i];
        let item =[];
        let name = permissionObj.model["key"];
        item = (ls => {
          let l = [];
          for (let j = 0; j < ls.length; j++) {
            l.push(ls[j].model["key"]);
          }
          return l;
        })(permissionObj.children || []);
        obj[name] = item;
      }
      return obj;
    }
  }
};
class PermissionCheckbox {
  constructor(name, text, val) {
    this.name = name;
    this.text = text;
    this.val = val;
  }
}
</script>
<style scoped>
#setlimit {
}
#setlimit .inp-area {
  padding-left: 60px;
}
#setlimit .inp-area .row {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 15px 0;
}
#setlimit .inp-area .row .label {
  padding-right: 30px;
}
#setlimit .inp-area .row .el-input {
  width: 450px;
}
#setlimit .inp-area .row .el-input input {
  border-radius: 0;
}
</style>

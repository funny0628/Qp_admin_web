<template>
  <div id="setpermission">
    <p class="title">权限设置</p>
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
export default {
  components: { PermissionButton },
  extends: BaseIframe,
  data() {
    return {
      permission: [],
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
  },
  methods: {
    init() {
      /**测试数据**/
      let examplePermission = [
        {
          menu: "账户管理",
          model: {
            key: "user",
            list: [new PermissionCheckbox("all", "全部", 1)]
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
                if (it.val == 1) {
                  ls.push(it.name);
                }
              }
              return ls;
            })();
            if (item.children && item.children.length > 0) {
              obj = { ...obj, ...selectLs(item.children) };
            }
          }
          return obj;
        };
        return selectLs(examplePermission);
      })();
      this.originchecklist = JSON.parse(JSON.stringify(this.checkList));
      for (let prop in this.checkList) {
        this.checkList[prop] = [];
      }
    },
    singleCheckboxChange(val, name, model) {
      //     点击全部的情况
      if (name === "all") {
        //     判断当前点击是否为第一层级
        if (this.modelPath.hasOwnProperty(model)) {
          // 点击第一层级的全部，选中所有
          if (val) {
            for (let prop of this.modelPath[model]) {
              this.checkList[prop] = this.originchecklist[prop];
            }
          }
          // 点击第一层级的全部，取消选中
          else {
            for (let prop of this.modelPath[model]) {
              this.checkList[prop] = [];
            }
          }
        }
      //   点击非第一层级的全部
      else{
      //选中
        if(val){
              this.checkList[model]=this.originchecklist[model];
              let count=0;
              for(let p in this.modelPath){
                    if(this.modelPath[p].indexOf(model)!=-1){
                          for(let k of this.modelPath[p]){
                                if(this.checkList[k].length==this.originchecklist[k].length){
                                      count++
                                }
                                else{
                                      return
                                }
                          }
                          if(count==this.modelPath[p].length){
                                this.checkList[p]=this.originchecklist[p]
                          }
                          else{
                                this.checkList[p]=[]
                          }
                          break
                    }
              }
        }
      //   取消选中
      else{
            this.checkList[model]=[];
            for(let p in this.modelPath){
                  if(this.modelPath[p].indexOf(model)!=-1){
                        this.checkList[p]=[];
                  }
            }
      }
      }
      }
      // 非全选，点击不是all的按钮
      else{
            if(val){
            // 判断当前行是否已经选完
            let value =JSON.parse(JSON.stringify(this.originchecklist[model])).slice(1)
            if(this.checkList[model].length==value.length){
                  this.checkList[model]=this.originchecklist[model]
                  let count=0;
                  for(let p in this.modelPath){
                        if(this.modelPath[p].indexOf(model)!=-1){
                              for(let k of this.modelPath[p]){
                                    if(this.checkList[k].length==this.originchecklist[k].length){
                                          count++
                                    }
                              }
                              if(count==this.modelPath[p].length){
                                    this.checkList[p]=this.originchecklist[p]
                              }
                              else{
                                    this.checkList[p]=[]
                              }
                        }
                  }
            }
            }
            // 选中非'all'按钮，取消选中
            else{
                  for(let i=0;i<this.checkList[model].length;i++){
                        if(this.checkList[model][i]=='all'){
                              this.checkList[model].splice(i,i+1)
                        }
                  }
                  for(let p in this.modelPath){
                        if(this.modelPath[p].indexOf(model)!=-1){
                              this.checkList[p]=[];
                        }
                  }
            }
      }
    }
  },

  computed: {
    modelPath() {
      let obj = {};
      for (let i = 0; i < this.permission.length; i++) {
        let permissionObj = this.permission[i];
        let item = {};
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
#setpermission {
  margin: 20px 20px;
}
.title {
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #666666;
  margin: 0 10px;
}
</style>
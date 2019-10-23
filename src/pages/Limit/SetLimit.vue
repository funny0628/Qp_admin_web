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
        <permission-button :action="ActionType.EDIT" @click="confirm()">
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
import AdminRoleHandler from "../../script/handlers/AdminRoleHandler";
import PageInfo from "../../plugin/script/common/PageInfo";

export default {
  components: { InputArea, PermissionButton },
  extends: BaseIframe,
  name: "SetLimit",
  data() {
    return {
      user_name: "",
      user_describe: "",
      user_id: 2000,
      permission: [],
      checkList: {},
      cache_data: {},
      tableStyle: [
        { label: "菜单", prop: "menu", width: "" },
        { label: "全选", prop: "model", width: "" }
      ],
      originchecklist: {},
      fromclickedit: ""
    };
  },
  created() {
    this.fromclickedit = this.$pageInfo.param.role_id;
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
            list: [new PermissionCheckbox("all", "全部", 2)]
            // list: [{ name: "all", text: "全部", val: 1 }]
          },
          children: [
            {
              menu: "充值记录",
              model: {
                key: "depositRecords",
                list: [
                  new PermissionCheckbox("all", "全部", 2),
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

      // this.permission = [];
      // this.checkList = this.getCheckList(this.permission)['obj'];
      // this.originchecklist = this.getCheckList(this.permission)['checkObj'];
      // if (!this.fromclickedit) {
      //   for (let prop in this.checkList) {
      //     this.checkList[prop] = [];
      //   }
      // }else{
      //   return
      // }

      // console.log(this.modelPath);
      // console.log(this.originchecklist);
    },
    // 再次整理数据，obj为选中状态下的数据，checkobj为所有数据
    getCheckList(list) {
      let selectLs = ls => {
        let obj = {};
        let checkObj = {};
        for (let i = 0; i < ls.length; i++) {
          let item = ls[i];
          obj[item.model.key] = (function() {
            let ls = [];
            for (let j = 0; j < item.model.list.length; j++) {
              let it = item.model.list[j];
              if (Number(it.val) === 1) {
                ls.push(it.name);
              }
            }
            return ls;
          })();
          checkObj[item.model.key] = (function() {
            let ls = [];
            for (let j = 0; j < item.model.list.length; j++) {
              let it = item.model.list[j];
              ls.push(it.name);
            }
            return ls;
          })();

          if (item.children && item.children.length > 0) {
            obj = { ...obj, ...selectLs(item.children)["obj"] };
            checkObj = { ...checkObj, ...selectLs(item.children)["checkObj"] };
          }
        }
        return { obj: obj, checkObj: checkObj };
      };
      return selectLs(list);
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
              // this.checkList[prop] = this.originchecklist[prop];
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
    getmsg() {
      let model = {};
      let check_dict = {};
      // 整理返回的数据，将正式使用的数据的status变为只关注最里层的status
      let classify2 = (list, level, alldict) => {
        level = !level ? 1 : level;
        let dict = alldict ? alldict : {};
        // 等到最内层的check为true时，再执行此方法以判断父级是否变为选中状态。接收一个最内层的选项代表的对象，找到其父级。check_count代表最内层选项的选中数量，若等于该父级的孩子数量，则要选中
        let commit_parent_change = (item, dict) => {
          let parent_id = item.parent;
          let parentIt = dict[parent_id];
          parentIt.check_count++;
          if (parentIt.check_count >= parentIt.children_count) {
            parentIt.check = true;

            if (parentIt.parent) {
              commit_parent_change(parentIt, dict);
            }
          }
        };
        // 递归循环返回数据的每一层，处理为以每一层的power为属性名的新对象dict
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          !dict[item.power] && (dict[item.power] = {});
          dict[item.power].children_count = item.Children.length;
          dict[item.power].parent = item.parents;
          dict[item.power].check_count = 0;
          dict[item.power].check = false;
          dict[item.power].level = level;
          // 递归处理
          if (item.Children.length > 0) {
            let d = classify2(item.Children, level + 1, dict);
            dict = { ...dict, ...d };
          }
          // 为最内层的数据时，若最内层的选项为选中状态（status=1），该层判断的选中标志check变为true，继续执行commit_parent_change函数判断父级的check，将该最内层的power代表的对象以及整个dict对象通过该函数传出
          if (level === 3) {
            dict[item.power].check = Number(item.status) === 1;
            dict[item.power].check &&commit_parent_change(dict[item.power], dict);
          }
        }

        return dict;
      };

      let classify = (list, permission, level) => {
        level = !level ? 1 : level;
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          //  获取整理好的数据
          if (level !== 3) {
            permission[i] = {
              menu: item.power_name,
              model: {
                key: item.power,
                list: [
                  new PermissionCheckbox(
                    "all",
                    "全部",
                    check_dict[item.power].check ? 1 : 2
                  )
                ]
              }
            };
            level === 1 && (permission[i].children = []);
          } else {
            permission.push(
              new PermissionCheckbox(
                item.power,
                item.power_name,
                check_dict[item.power].check ? 1 : 2
              )
            );
          }
          if (item.Children.length > 0) {
            classify(
              item.Children,
              level === 2 ? permission[i].model.list : permission[i].children,
              level + 1
            );
          }
        }
        return permission;
      };
      let $this = this;

      if (this.fromclickedit) {
        let data = { role_id: this.fromclickedit };
        AdminRoleHandler.edit_role(data, this.user_id).promise.then(res => {
          const { data, msg, code } = res;
          if (Number(code) == 200) {
            let list = [];
            this.user_name = data.role_name;
            this.user_describe = data.remark;
            $this.cache_data = data.power_list;
            check_dict = classify2(JSON.parse(JSON.stringify(data.power_list)));
            console.log("check_dict", check_dict);
            classify(JSON.parse(JSON.stringify(data.power_list)), list);

            this.permission = list;
            this.checkList = this.getCheckList(this.permission)["obj"];

            this.originchecklist = this.getCheckList(this.permission)["checkObj"];
          } else {
            return this.$message.error(msg);
          }
        });
      } else {
        let data = {};
        AdminRoleHandler.newrole(data, this.user_id).promise.then(res => {
          const { data, msg, code } = res;
          if (Number(code) == 200) {
            let list = [];
            $this.cache_data = data;
            check_dict = classify2(JSON.parse(JSON.stringify(data)));
            classify(JSON.parse(JSON.stringify(data)), list);

            this.permission = list;
            this.checkList = this.getCheckList(this.permission)["obj"];

            this.originchecklist = this.getCheckList(this.permission)["checkObj"];
          } else {
            return this.$message.error(msg);
          }
        });
        for (let prop in this.checkList) {
          this.checkList[prop] = [];
        }
      }
      // this.init();
    },
    confirm() {
      function classifyCheck(checkDict) {
        let selectDict = {};
        for (let key in checkDict) {
          let item = checkDict[key];
          if (item.length > 0) {
            for (let j = 0; j < item.length; j++) {
              let it = item[j];
              if (it === "all") {
                selectDict[key] = 2;
              } else {
                selectDict[it] = 1;
              }
            }
          } else {
            selectDict[key] = 2;
          }
        }
        console.log("result", selectDict);
        return selectDict;
      }

      /**
       * 更新权限传参
       * @param list 原始数据
       * @param selectDict  界面点击选中按钮状态字典
       */
      let resetClassify = (list, selectDict) => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          item.status = selectDict[item.power] || 2;

          if (item.Children && item.Children.length > 0) {
            resetClassify(item.Children, selectDict);
          }
        }

        return list;
      };

      resetClassify(this.cache_data, classifyCheck(this.checkList));
      console.log("传值", this.cache_data);
      if (this.fromclickedit) {
        let data = {
          role_id: this.fromclickedit,
          role_name: this.user_name,
          remark: this.user_describe,
          power_list: this.cache_data
        };
        AdminRoleHandler.confirm_edit(data, this.user_id).promise.then(res => {
          const { data, msg, code } = res;
          if (Number(code) == 200) {
            this.$message.success(msg);
            this.forward("manager", { type: "add" });
          } else {
            this.$message.error(msg);
          }
        });
      } else {
        let data = {
          role_name: this.user_name,
          remark: this.user_describe,
          power_list: this.cache_data
        };
        AdminRoleHandler.create_role(data, this.user_id).promise.then(res => {
          const { data, msg, code } = res;
          if (Number(code) == 200) {
            this.$message.success(msg);
            this.forward("manager", { type: "add" });
          } else {
            this.$message.error(msg);
          }
        });
      }
    }
  },
  computed: {
    modelPath() {
      let obj = {};
      for (let i = 0; i < this.permission.length; i++) {
        let permissionObj = this.permission[i];
        let item = [];
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

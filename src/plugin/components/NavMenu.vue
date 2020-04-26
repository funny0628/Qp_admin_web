<!-- 左侧滚动条 -->
<template>
  <div id="navMenu">
    <div class="logo"></div>
    <el-menu default-active="1" class @open="close" @close="open">
      <!-- <div
        v-for="(item, index) in models"
        :key="index"
        :class="item.children && item.children.length <= 0?'single': ''"
      >
        <el-submenu :index="(index+1).toString()" v-if="item.children.length > 0">
          <span slot="title">{{item.text}}</span>
          <el-menu-item-group v-if="item.children.length > 0">
            <el-menu-item
              v-for="(item2, index2) in item.children"
              :key="index2"
              :index="(index+1)+ '-' + (index2+1)"
              @click="clickItem(item2)"
            >{{item2.text}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item
          :index="(index+1).toString()"
          v-if="!item.children || item.children.length <= 0"
          @click="clickItem(item)"
        >
          <span slot="title">{{item.text}}</span>
        </el-menu-item>
      </div>-->
      <el-submenu v-for="(item, index) in MODEL" :key="index" :index="(index+1).toString()">
        <span slot="title">{{item.text}}</span>
        <el-menu-item
          v-for="(item2, index2) in item.children"
          v-if="!item2.children"
          :key="index2"
          :index="(index+1)+ '-' + (index2+1)"
          @click="clickItem(item2)"
        >{{item2.text}}</el-menu-item>
        <el-submenu
          v-for="(item2, index2) in item.children"
          v-if="item2.children"
          :key="index2"
          :index="(index+1)+ '-' + (index2+1)"
        >
          <template slot="title">
            <span slot="title">{{item2.text}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(item3, index3) in item2.children"
              :key="index3"
              :index="(index+1)+ '-' + (index2+1)+'-'+(index3+1)"
              @click="clickItem(item3)"
            >{{item3.text}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-submenu>

      <!-- <el-menu-item
        :index="(index+1).toString()"
        v-if="!item.children || item.children.length <= 0"
        @click="clickItem(item)"
      >
        <span slot="title">{{item.text}}</span>
      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
// import {models} from '../script/config/pages';

import BaseComponent from "../script/common/BaseComponent";
import MODEL from "../../../src/script/config/models";

export default {
  name: "NavMenu",
  extends: BaseComponent,
  props: {
    navClick: {
      type: Function,
      default() {
        return function() {};
      }
    },
    userRightsData: {
      type: Array
    }
  },
  data() {
    let $this = this;
    return {
      MODEL: MODEL,
      // models: (function () {
      //     let ls = [];
      //     for (let k in $this.$pageInfo.models) {
      //       let item = $this.$pageInfo.models[k];

      //       ls.push({
      //         name: $this.$pageInfo.models[k].name,
      //         text: $this.$pageInfo.models[k].text,
      //         children: item.children
      //       });
      //     }

      //     return ls;
      //   })()
      /**
      models: (function() {
        let ls = [];
        let rightArr = {};
        $this.userRightsData.forEach(item => {
          console.log(item);
          console.log($this.$pageInfo.models);
          // console.log($this.$pageInfo.models[item.name])
          // console.log(rightArr[item.name] = $this.$pageInfo.models[item.name])
          // console.log(rightArr)
          let topNameArr = $this.$pageInfo.models;
          rightArr[item.name] = {
            name: topNameArr[item.name].name,
            text: topNameArr[item.name].text,
            vue: null,
            children: [
              {
                name: (function() {
                  if (topNameArr[item.name].children.length > 0) {
                    let res = topNameArr[item.name].children.map(val => {
                      console.log(val)
                      return val.name
                    })
                    return res.reverse().pop()
                    console.log(res)
                    console.log(res.reverse().pop())
                  }
                })(),
                text: (function() {
                  if (topNameArr[item.name].children.length > 0) {
                    let res = topNameArr[item.name].children.map(val => {
                      return val.text
                    })
                    return res.reverse().pop()
                  }
                })(),
                // children: [
                //   {
                //     name: topNameArr[item.name].children
                //   }
                // ]
              }
            ]
          };
        });
        console.log(rightArr);
        for (let k in rightArr) {
          console.log(k);
          let item = rightArr[k];
          console.log(item);
          console.log(item.children);
          // if(item === undefined) {
          //   continue
          // }

          ls.push({
            name: item.name,
            text: item.text,
            children: item.children
          });
        }
        console.log(ls, "--------------------------------------");
        // for (let k in $this.$pageInfo.models) {
        //   console.log(k)
        //   console.log($this.$pageInfo.models)
        //   let item = $this.$pageInfo.models[k];
        //   console.log(item)
        //   console.log($this.$pageInfo.models[k].children)

        //   ls.push({
        //     name: $this.$pageInfo.models[k].name,
        //     text: $this.$pageInfo.models[k].text,
        //     children: item.children
        //   });
        // }

        return ls;
      })()
       */
    };
  },
  methods: {
    clickItem(item) {
      this.$emit("clickItem", item);
    },
    close() {
    },
    open() {
    },
    //获取侧边栏权限列表
    getRightsList(dict, names) {

      if (Object.prototype.toString.call(dict) !== '[object Array]') {
        for (let key in dict) {
          let item = dict[key];
          if (names.indexOf(key) < 0) {
            delete dict[key];
            continue
          }
          if (item.children && item.children.length > 0) {
            this.getRightsList(item.children, names);
          }
        }
      } else {
        for (let i = dict.length - 1; i >= 0 ; i --) {
          let item2 = dict[i];
          if (names.indexOf(item2.name) < 0) {
            dict.splice(i, 1);
            continue;
          }
          if (item2.children && item2.children.length > 0) {
            this.getRightsList(item2.children, names);
          }
        }
      }
      /**
      this.userRightsData.map(item => {
        return item.name;
      });
       **/
    },
    get_permission_names(rightArr) {
      let arr = [];
      let nameList = []
      const fn = function(list) {
        // if(list.length === 0) {
        //   return undefined
        // }
        list.forEach(item => {
          if(!item.children) {
            arr.push(item.name)
            nameList.push(item.display_name)
          }else {
            arr.push(item.name)
            nameList.push(item.display_name)
            fn(item.children)
          }
        })
      }
      // for (let i = 0; i < list.length; i++) {
      //   let item = list[i];
      //   console.log(item)
      //   arr[arr.length] = item.name;
      //   console.log(arr)
      //   console.log(item.children.length)
      //   if(item.children.length === 0) {
      //     continue
      //   }else {
      //     let childrenArr
      //     arr = [...arr, ...self.get_permission_names(item.children)];
      //   }
      //   // if (item.children.length > 0) {
      //   //   arr = [...arr, ...self.get_permission_names(item.children)];
      //   // }
      // }
      fn(rightArr)
      console.log(nameList)
      return arr;
    },
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('user_info'));
    console.log(userInfo)
    let permission_names = this.get_permission_names(userInfo);
    console.log(permission_names)
    // this.getRightsList(MODEL, permission_names);
  }
};
</script>

<style>
#navMenu {
  height: 100%;
  background: #262e3f;
}
#navMenu .logo {
  width: 100%;
  min-height: 56px;
}
#navMenu .el-menu {
  border: none;
  -webkit-user-select: none;
  user-select: none;
}
#navMenu .el-menu .single .el-menu-item {
  background: #262e3f;
  color: #8e8e8e;
  height: 40px;
  line-height: 40px;
}
#navMenu .el-menu .single .el-menu-item:hover,
#navMenu .el-menu .single .el-menu-item.is-active {
  background: #262e3f;
  color: #fff;
}
#navMenu .el-submenu {
  width: 100%;
  text-align: left;
  cursor: pointer;
}
#navMenu .el-submenu .el-submenu__title {
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #262e3f;
}
#navMenu .el-submenu:hover .el-submenu__title {
  color: #fff;
  background: #262e3f;
}
#navMenu .el-submenu.is-opened {
  height: auto;
}
#navMenu .el-submenu.is-opened .el-submenu__title {
  color: #fff;
}
#navMenu .el-submenu.is-opened .el-submenu__title span::selection,
#navMenu .el-submenu.is-opened .el-submenu__title span::-moz-selection {
  color: #fff;
}
#navMenu .el-submenu li {
  outline: none;
  overflow: hidden;
}
#navMenu .el-submenu .el-menu-item {
  height: 36px;
  line-height: 36px;
}
#navMenu .el-menu-item-group > ul {
  background: #1a1f2b;
  overflow: hidden;
}
#navMenu .el-submenu .el-menu-item:hover,
#navMenu .el-submenu .el-menu-item.is-active {
  color: #fff;
  background: #1a1f2b;
}
#navMenu .el-menu-item:hover span::selection,
#navMenu .el-menu-item.is-active span::selection,
#navMenu .el-menu-item:hover span::-moz-selection,
#navMenu .el-menu-item.is-active span::-moz-selection {
  color: #fff;
}

#navMenu .el-menu-item-group__title {
  display: none;
}
</style>



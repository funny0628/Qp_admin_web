<template>
  <div id="home" :class="isPhone?'is-phone': ''">
    <el-row class="admin-box content-100 rel">
      <!-- 左侧导航栏 -->
      <el-col class="nav-menu-box" :xs="4" :sm="4" :md="4" :lg="3" v-if="!isPhone">
        <nav-menu @clickItem="clickItem"></nav-menu>
      </el-col>
      <el-drawer
        class="menu-drawer"
        size="160px"
        title
        :show-close="false"
        :visible.sync="showNavMenu"
        direction="ltr"
        :before-close="closeNavMenu"
        v-else
      >
        <div class="nav-menu-box">
          <nav-menu @clickItem="clickItem"></nav-menu>
        </div>
      </el-drawer>
      <el-col class="container f-l cnt-box" :xs="20" :sm="20" :md="20" :lg="21">
        <!-- 顶部内容 -->
        <div class="header-box">
          <el-row class="header">
            <el-col :xs="6" v-if="isPhone">
              <a class="btn-menu" @click="showNavMenu = !showNavMenu"></a>
            </el-col>
            <el-col class="header-row hidden-xs-only" :sm="12" :md="12" :lg="12" v-if="!isPhone">
              <span>本次登陆IP: 192.168.1.1</span>
            </el-col>
            <el-col
              class="header-row"
              :xs="14"
              :sm="10"
              :md="10"
              :lg="10"
              style="justify-content: flex-end"
            >
              <template v-if="headerVue">
                <component :is="headerVue" @forward="forward"></component>
              </template>
              <template v-else>
                <div class="btn-area">
                  <a class="btn-message"></a>
                  <a class="btn-settings"></a>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      admin
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                      <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </el-col>
            <el-col :xs="4" :sm="2" :md="2" :lg="2">
              <div
                style="width:50px;height:20px;background-color:#00ff00;text-align:center;cursor:pointer;"
                @click="logout"
              >退出</div>
            </el-col>
          </el-row>
          <div class="nav-menu rel" ref="quickMenu">
            <a
              class="btn-nav"
              ref="quickNav"
              v-for="(item, index) in showItems"
              :class="item.name === activeName?'active':''"
              @click="clickItem(item)"
              :key="index"
            >
              {{item.text}}
              <a class="btn-close iconfont icon-guanbi" v-on:click.stop="del(index)"></a>
            </a>
            <div class="arrow-down">
              <el-dropdown trigger="click">
                <div class="btn-arrow-down">
                  <i class="el-icon-arrow-down"></i>
                </div>
                <el-dropdown-menu slot="dropdown" style="max-height: 520px;overflow: auto">
                  <el-dropdown-item
                    v-for="(item, index) in hideItems"
                    @click.native="add(item.name)"
                    :key="index"
                  >{{item.text}}</el-dropdown-item>
                  <el-dropdown-item
                    divided
                    v-show="items.length > 0"
                    @click.native="closeAll()"
                  >关闭所有</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <!-- 主题内容 -->
        <div class="main-box">
          <page
            v-for="(item, index) in items"
            :first-view="item.name"
            :key="item.name"
            v-show="item.name === activeName"
            :params="{}"
            @forward="forward"
            @back="del(index)"
          ></page>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import Page from "../../components/Page";
import NavMenu from "../../components/NavMenu";
import root from "../../script/common/Root";
import { mapState } from "vuex";
import { SIZE_CHANGE } from "../../script/store/mutationsType";
import NProgress from "nprogress"; // Progress 进度条

let $this = null;
export default {
  name: "Home",
  components: { NavMenu, Page },
  data() {
    return {
      defaultActive: "",
      activeName: "",
      showItems: [],
      hideItems: [],
      headerVue: root.headerVue,
      showNavMenu: false,
      userRightsData: []
    };
  },
  methods: (() => {
    return {
      init() {
        /** 启动轮询 **/
        if (root.loopArray && root.loopArray.length > 0) {
          for (let i = 0; i < root.loopArray.length; i++) {
            root.loopArray[i].start();
          }
        }
      },
      add(name) {
        let item = $this.$pageInfo.pageList[name];

        let ls = $this.items.filter(data => name === data.name);
        if (ls.length <= 0) {
          $this.showItems.unshift(item);
        } else {
          NProgress.done();
          /** 如果存在隐藏菜单里面 **/
          ls = $this.hideItems.filter(data => name === data.name);
          if (ls.length > 0) {
            let index = $this.hideItems.indexOf(ls[0]);
            $this.showItems.unshift($this.hideItems.splice(index, 1)[0]);
          }
        }

        $this.activeName = name;
        $this.arrangeMenu();
      },
      del(index) {
        // 删除界面列表
        let item = $this.showItems.splice(index, 1)[0];
        $this.activeName =
          $this.activeName === item.name ? "" : $this.activeName;
        $this.arrangeMenu("del");
        $this.defaultShow();
      },
      closeAll() {
        $this.showItems = [];
        $this.hideItems = [];
        $this.activeName = "";
        $this.defaultShow();
      },
      /** 整理显示 **/
      arrangeMenu(type = "add") {
        $this.$nextTick(() => {
          /**  **/
          let totalWidth = $this.$refs.quickMenu.clientWidth;
          let sumWidth = 0;
          if ($this.$refs.quickNav) {
            for (let i = 0; i < $this.$refs.quickNav.length; i++) {
              sumWidth += $this.$refs.quickNav[i].clientWidth;
            }
          }

          if (totalWidth - sumWidth < 80) {
            /** 将显示的内容放入隐藏队列当中 **/
            $this.hideItems.unshift(
              $this.showItems.splice($this.showItems.length - 1, 1)[0]
            );
          } else {
            if (type !== "add" && $this.hideItems.length > 0) {
              $this.showItems.push($this.hideItems.splice(0, 1)[0]);
            }
          }
        });
      },
      defaultShow() {
        if ($this.showItems.length === 0) {
          $this.showItems.push($this.$pageInfo.pageList[$this.defaultActive]);
        }
        if (!$this.activeName) {
          $this.activeName = $this.showItems[0].name;
        }
      },
      clickItem(data) {
        $this.add(data.name);
        if ($this.isPhone) {
          $this.showNavMenu = false;
        }
      },
      forward(data) {
        $this.add(data["name"]);
      },
      back() {},
      closeNavMenu(done) {
        done();
      },
      logout() {
        this.$http.get("v1/backend/logout").then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$router.push({
              name: 'login'
            })
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      },
    };
  })(),
  computed: {
    ...mapState(["isPhone"]),
    items() {
      return [...this.showItems, ...this.hideItems];
    }
  },
  watch: {
    activeName: {
      handler(newVal, oldVal) {
        Vue.prototype.$activePage = newVal;
      }
    }
  },
  created() {
    $this = this;
    let active = "";
    let config = $this.$pageInfo.config;
    /** 测试 **/
    if (
      config.IS_DEBUG.state &&
      config.IS_DEBUG.activePage &&
      $this.$pageInfo.pageList[config.IS_DEBUG.activePage]
    ) {
      $this.showItems = [$this.$pageInfo.pageList[config.IS_DEBUG.activePage]];
      active = config.IS_DEBUG.activePage;
    } else {
      $this.showItems = [$this.$pageInfo.pageList[config.ACTIVE_PAGE]];
      active = config.ACTIVE_PAGE;
    }
    $this.defaultActive = active;
    $this.activeName = active;
  },
  mounted() {
    $this.init();
    let clientWidth = document.body.offsetWidth;
    /** 判断宽度 **/
    $this.$store.commit(SIZE_CHANGE, clientWidth <= 780);
    window.onresize = () => {
      /** 判断宽度 **/
      $this.$nextTick(function() {
        clientWidth = document.body.offsetWidth;
        $this.$store.commit(SIZE_CHANGE, clientWidth <= 780);
        $this.$forceUpdate();
      });
    };
  }
};
</script>

<style scoped>
#home {
  height: 100%;
  width: 100%;
}
#home .admin-box {
}
#home .nav-menu-box {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
#home .container {
  height: 100%;
}
#home .header-box,
#home .main-box {
  width: 100%;
}
#home .header-box {
  height: 106px;
}
#home .main-box {
  height: calc(100% - 106px);
  overflow-y: auto;
  padding-bottom: 20px;
}
#home.is-phone .nav-menu-box {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
}
#home.is-phone .container {
  width: 100%;
  min-width: 100%;
}
#home .header-box .header {
  background: #006efe;
  color: #fff;
  height: 70px;
  width: 100%;
  padding: 24px 10px;
  font-weight: 400;
}
#home .header-box .header .header-row {
}
#home .header-box .header .header-row .btn-area {
  float: right;
  text-align: right;
}
#home .header-box .header .btn-message,
#home .header-box .header .btn-settings {
  cursor: pointer;
  float: left;
  display: inline-block;
  margin: 0 2px;
}
#home .header-box .header .btn-message {
  background: url("../../assets/iconMsg.png") center;
  width: 19px;
  height: 21px;
}
#home .header-box .header .btn-settings {
  background: url("../../assets/iconSetting.png") center;
  width: 20px;
  height: 20px;
}
#home .header-box .header .el-dropdown {
  color: #fff;
  padding-left: 8px;
  cursor: pointer;
  text-align: right;
}
#home .header-box .header .el-dropdown i {
  padding-left: 6px;
  font-size: 16px;
  font-weight: 900;
  margin-right: 0;
  margin-left: 0;
}
#home .header-box .nav-menu {
  background: #f2f2f2;
  width: 100%;
  height: 36px;
  line-height: 34px;
  -webkit-user-select: none;
  user-select: none;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}
#home .header-box .nav-menu .arrow-down {
  height: 100%;
  position: absolute;
  right: 0;
  padding: 0 8px;
  cursor: pointer;
  background: #f2f2f2;
}
#home .header-box .nav-menu .btn-arrow-down {
  border: none;
  border-radius: 0;
  padding: 0;
  background: #f2f2f2;
}
#home .header-box .nav-menu .btn-nav {
  line-height: 34px;
  float: left;
  color: #515a6e;
  cursor: pointer;
  position: relative;
  height: 100%;
  padding: 0 20px;
  font-size: 12px;
  background: #fff;
  border-right: 1px solid #e4e4e4;
}
#home .header-box .nav-menu .btn-nav:first-child {
  border-left: 1px solid #e4e4e4;
}
#home .header-box .nav-menu .btn-nav:before {
  content: "";
  display: inline-block;
  border-radius: 50%;
  height: 6px;
  width: 6px;
  background: #a1a1a1;
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
}
#home .header-box .nav-menu .btn-nav.active:before {
  background: #006efe;
}
#home .header-box .nav-menu .btn-close {
  color: #a5a5a5;
  position: absolute;
  right: 4px;
  font-size: 8px;
  font-weight: bold;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  line-height: 12px;
  cursor: pointer;
}
#home .el-main {
  width: 100%;
  padding: 0;
}
#home .el-main .input-area {
  line-height: 40px;
}
#home .btn-menu {
  float: left;
  margin: 0 6px 0 0;
  cursor: pointer;
  width: 18px;
  height: 18px;
  background: url("../../assets/icon-menu.png") center;
  background-size: 100% 100%;
}
</style>
<style>
.menu-drawer #el-drawer__title.el-drawer__header {
  display: none;
}
.menu-drawer .el-drawer__body {
  height: 100%;
  overflow-y: auto;
}
.menu-drawer .el-drawer__body .nav-menu-box {
  height: 100%;
}

.t-l {
  text-align: left;
}
.t-c {
  text-align: center;
}
.t-r {
  text-align: right;
}

#home .main-box .input-area {
  padding: 20px;
  line-height: 40px;
}
#home .main-box .input-area .el-input--medium {
  width: 180px;
  margin-right: 10px;
}
/*#home .main-box .input-area .el-input--medium.w-160 {width: 160px}*/
#home .main-box .input-area .el-input--medium.w-240 {
  width: 240px;
}
#home .main-box .input-area .el-date-editor {
  margin-right: 10px;
  width: 320px;
}
#home .main-box .el-radio-button:hover {
  color: #2a7cf5;
}
#home .main-box .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #2a7cf5;
  border-color: #2a7cf5;
  background: #fff;
}
#home .main-box .el-button--primary,
#home .el-main .el-button--info {
  min-width: 80px;
  margin-left: 20px;
  font-size: 12px;
}
#home .main-box .el-button--primary {
  background: #01c8ae;
  border: none;
}
#home .main-box .el-select .el-input__inner {
  height: 36px;
  line-height: 36px;
}
</style>

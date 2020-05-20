<template>
  <div id="home" :class="isPhone ? 'is-phone' : ''">
    <div class="admin-box" style="display:flex;">
      <div class="left nav-menu-box" style="width:220px;">
        <nav-menu @clickItem="clickItem"></nav-menu>
      </div>
      <div class="right" style="flex:1;">
        <el-row style="width:100%;">
          <el-col class="container f-l cnt-box">
            <!-- 顶部内容 -->
            <div class="header-box">
              <el-row class="header" style="display:flex;">
                <el-col :xs="6" v-if="isPhone">
                  <a class="btn-menu" @click="showNavMenu = !showNavMenu"></a>
                </el-col>
                <el-col
                  class="header-row hidden-xs-only"
                  v-if="!isPhone"
                  style="flex:1;"
                >
                  <span>欢迎登录</span>
                </el-col>
                <div class="header-row" style="justify-content: flex-end;">
                  <!-- <template v-if="headerVue"> -->
                  <!-- <component :is="headerVue" @forward="forward"></component> -->
                  <header-nav @forward="forward"></header-nav>
                  <!-- </template> -->
                  <!-- <template v-else>
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
                  </template>-->
                </div>
                <el-col style="text-align:center;width:148px;">
                  <el-dropdown trigger="click" placement="bottom">
                    <span class="el-dropdown-link">
                      {{ loginUser }}
                      <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <!-- <span>基本资料</span> -->
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div
                          @click="openModPsd(loginUserInfo)"
                          style="width:100%;"
                        >
                          修改密码
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div style="width:100%;" @click="modifyCode">
                          修改谷歌验证码
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div @click="logout" style="width:100%;">退出登录</div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
              <div class="nav-menu rel" ref="quickMenu">
                <a
                  class="btn-nav"
                  ref="quickNav"
                  v-for="(item, index) in showItems"
                  :class="item.name === activeName ? 'active' : ''"
                  @click="clickItem(item)"
                  :key="index"
                >
                  {{ item.text }}
                  <a
                    class="btn-close iconfont icon-guanbi"
                    v-on:click.stop="del(index)"
                  ></a>
                </a>
                <div class="arrow-down">
                  <el-dropdown trigger="click">
                    <div class="btn-arrow-down">
                      <i class="el-icon-arrow-down"></i>
                    </div>
                    <el-dropdown-menu
                      slot="dropdown"
                      style="max-height: 520px;overflow: auto"
                    >
                      <el-dropdown-item
                        v-for="(item, index) in hideItems"
                        @click.native="add(item.name)"
                        :key="index"
                        >{{ item.text }}</el-dropdown-item
                      >
                      <el-dropdown-item
                        divided
                        v-show="items.length > 0"
                        @click.native="closeAll()"
                        >关闭所有</el-dropdown-item
                      >
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
                :newOrder="newOrder"
                @back="del(index)"
              ></page>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
      title="修改用户密码"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <el-form :model="form">
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="form.psd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="form.checkPsd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyUserPsd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 绑定谷歌验证码 -->
    <el-dialog
      title="绑定谷歌验证码"
      :visible.sync="dialogVisible"
      center
      width="30%"
      top="20vh"
      :show-close="false"
      append-to-body
    >
      <el-form :model="form2">
        <el-form-item style="border: 1px solid #e0e8ed;padding:10px;">
          <div class="paycode">
            <!-- 放置二维码的容器,需要给一个ref -->
            <div id="qrcode" ref="qrcode"></div>
            <div style="float:left;margin-left:30px;">
              <div>{{ secret }}</div>
              <div style="margin-top:10px;">手动输入密钥</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <span>输入谷歌验证器中6位验证码</span>
          <el-input
            v-model="form2.code"
            maxlength="6"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bindCode" style="width:100%;"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import Page from "../../components/Page";
import NavMenu from "../../components/NavMenu";
import headerNav from "../../../components/HeaderMenu";
import root from "../../script/common/Root";
import { mapState } from "vuex";
import { SIZE_CHANGE } from "../../script/store/mutationsType";
import NProgress from "nprogress"; // Progress 进度条
import QRCode from "qrcodejs2";

let $this = null;
export default {
  name: "Home",
  components: { NavMenu, Page, headerNav },
  data() {
    return {
      defaultActive: "",
      activeName: "",
      showItems: [],
      hideItems: [],
      headerVue: root.headerVue,
      showNavMenu: false,
      loginUser: "",
      loginUserInfo: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        uid: null,
        psd: "",
        checkPsd: ""
      },
      newOrder: 0,
      form2: {
        code: ""
      },
      user_id: null,
      dialogFormVisible: false,
      dialogVisible: false,
      code_url: "",
      secret: "",
      qrcode: ""
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
      forward(data, count) {
        $this.add(data["name"]);
        $this.newOrder = count;
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
              name: "login"
            });
            this.$message({
              type: "success",
              message: res.data.msg
            });
            localStorage.removeItem("user_info");
            localStorage.removeItem("user");
          }
        });
      },
      openModPsd(loginUserInfo) {
        console.log(loginUserInfo);
        this.dialogFormVisible = true;
        this.form.uid = loginUserInfo.id;
      },
      modifyUserPsd() {
        let data = {
          uid: this.form.uid,
          password: this.form.psd,
          password2: this.form.checkPsd
        };
        this.$http
          .post("v1/backend/operation/user/password", data)
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: res.data.msg
              });
              setTimeout(() => {
                this.logout();
              }, 1000);
            }
          });
      },
      modifyCode() {
        this.$http
          .get("v1/backend/auth/ga-bind", {
            params: {
              user_id: this.loginUserInfo.id
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.code_url = res.data.data.code_url;
              this.secret = res.data.data.secret;
              this.payOrder();
            }
          });
      },
      // 展示二维码
      payOrder() {
        this.qrcode = "";
        this.form2.code = "";
        this.dialogVisible = true;
        // 二维码内容,一般是由后台返回的跳转链接,这里是写死的一个链接
        this.qrcode = this.code_url;
        // 使用$nextTick确保数据渲染
        this.$nextTick(() => {
          this.$refs.qrcode.innerHTML = "";
          this.createCode();
        });
      },
      createCode() {
        this.qrcode = new QRCode("qrcode", {
          text: this.qrcode, //# 二维码内容
          width: 100,
          height: 100,
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          colorDark: "#000000", //#前景色
          colorLight: "#ffffff", //#背景色
          correctLevel: 3
        });
        console.log(this.qrcode);
      },
      bindCode() {
        let data = {
          ga_code: Number(this.form2.code)
        };
        this.$http.put("v1/backend/auth/ga-bind", data).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.$refs.qrcode.innerHTML = "";
            this.secret = "";
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }else {
            this.dialogVisible = false;
            this.$refs.qrcode.innerHTML = "";
            this.secret = "";
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        });
      }
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
    this.loginUser = JSON.parse(localStorage.getItem("user")).username;
    this.loginUserInfo = JSON.parse(localStorage.getItem("user"));
    $this.init();
    $this.$forceUpdate();
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
.paycode {
  width: 100%;
  height: 100px;
  margin: 0 auto;
}
#qrcode {
  width: 100px;
  height: 100px;
  float: left;
}
.loginout {
  position: absolute;
  top: 20px;
  right: 0;
  background-color: #f2f2f2;
  color: #000;
  width: 80px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
}
#home {
  height: 100%;
  width: 100%;
}
#home .admin-box {
  height: 100%;
  width: 100%;
}
#home .nav-menu-box {
  height: 100%;
  /* width: 220px; */
  overflow-y: auto;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0 !important;
}
#home .admin-box .right {
  height: 100%;
  width: 100%;
  overflow-x: auto;
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
  background: #efefef;
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: center;
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
  text-align: center;
  line-height: 34px;
  float: left;
  color: #999999;
  cursor: pointer;
  position: relative;
  height: 100%;
  width: 140px;
  padding: 0 12px;
  font-size: 12px;
  background: #fff;
  border-right: 1px solid #e4e4e4;
}
#home .header-box .nav-menu .btn-nav.active {
  color: #000;
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
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}
#home .header-box .nav-menu .btn-nav.active:before {
  background: #01c8ae;
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

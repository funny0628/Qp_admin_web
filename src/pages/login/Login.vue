<template>
  <div class="login-view">
    <div class="login-wrap">
      <div class="login-form">
        <div class="login-head">
          <div>
            <img
              alt="Boilerplate"
              src="data:image/png;base64,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"
            />
          </div>
          <!-- <h3>欢迎登录1</h3> -->
        </div>
        <!-- <a @click="test" style="color:333">test</a> -->
        <!-- <form class="el-form" action="">
          <div class="el-form-item is-required">
            <div class="el-form-item__content">
              <div class="el-input el-input-group el-input-group--prepend">
                <div class="el-input-group__prepend">
                  <i class="anticon el-icon-user-solid"></i>
                </div>
                <input v-model="formData.username" type="tel" autocomplete="off" placeholder="用户名" class="el-input__inner" />
              </div>
            </div>
          </div>
          <div class="el-form-item is-required">
            <div class="el-form-item__content">
              <div class="el-input el-input-group el-input-group--prepend">
                <div class="el-input-group__prepend">
                  <i class="anticon el-icon-lock"></i>
                </div>
                <input v-model="formData.password" type="password" autocomplete="off" placeholder="密码" class="el-input__inner" />
              </div>
            </div>
          </div>
          <div class="el-form-item">
            <div class="el-form-item__content">
              <button
                type="submit"
                class="el-button el-button--primary"
                style="width: 100%;"
                @click.prevent="login"
              >
                <span>确 定</span>
              </button>
            </div>
          </div>
        </form>-->
        <el-form label-position="top" ref="ruleForm" :model="formData" label-width="80px">
          <h2 style="text-align:center;">用户登录</h2>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center;">
            <el-button class="login-btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 安全验证 -->
    <el-dialog
      title="安全验证"
      :visible.sync="dialogFormVisible"
      center
      width="30%"
      top="20vh"
      :show-close="false"
    >
      <el-form :model="form">
        <el-form-item>
          <div style="text-align:center;">输入谷歌验证器中6位验证码</div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.verificationCode" maxLength='6' autocomplete="off" placeholder="谷歌验证码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="width:100%;" type="primary" @click="codeLogin">确 定</el-button>
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
              <div>{{secret}}</div>
              <div style="margin-top:10px;">手动输入密钥</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <span>输入谷歌验证器中6位验证码</span>
          <el-input v-model="form2.code" maxlength="6" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bindCode" style="width:100%;">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      form: {
        verificationCode: ""
      },
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
  methods: {
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
        user_id: this.user_id,
        ga_code: Number(this.form2.code)
      };
      this.$http.post("v1/backend/auth/ga-bind", data).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.dialogVisible = false;
          this.$refs.qrcode.innerHTML = "";
          this.secret = "";
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.$router.push({
            name: "home"
          });
          localStorage.setItem(
            "user_info",
            JSON.stringify(res.data.data.permissions)
          );
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
        }
      });
    },
    codeLogin() {
      let data = {
        user_id: this.user_id,
        ga_code: Number(this.form.verificationCode)
      };
      this.$http.post("v1/backend/auth/ga", data).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$router.push({
            name: "home"
          });
          localStorage.setItem(
            "user_info",
            JSON.stringify(res.data.data.permissions)
          );
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          this.dialogFormVisible = false
        }else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },
    async login() {
      // this.dialogFormVisible = true;
      let data = {
        username: this.formData.username,
        password: this.formData.password
      };
      const res = await this.$http.post("/v1/backend/login", data);
      console.log(res);
      if (res.data.code === 200) {
        this.user_id = res.data.data.user_id;
        if (res.data.data.google_auth == 0) {
          this.$http
            .get("v1/backend/auth/ga-bind", {
              params: {
                user_id: res.data.data.user_id
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
        } else {
          this.dialogFormVisible = true;
          this.form.verificationCode = ""
        }

        // this.$message({
        //   type: "success",
        //   message: res.data.msg
        // });
        // this.$router.push({
        //   name: "home"
        // });
        // localStorage.setItem(
        //   "user_info",
        //   JSON.stringify(res.data.data.permissions)
        // );
        // localStorage.setItem("user", JSON.stringify(res.data.data.user));
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    }
  }
};
</script>

<style scoped>
.login-view {
  width: 100%;
  height: 100%;
  /* background: url(https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png)
    top; */
  background-size: cover;
}

.login-view .login-wrap {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-view .login-wrap .login-form {
  border-radius: 2px;
  background: #fff;
  padding: 15px 35px;
  width: 320px;
  box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.09);
}

.login-view .login-wrap .login-form .login-head {
  text-align: center;
}

.login-view .login-wrap .login-form .login-head div {
  margin-top: 10px;
}

.login-view .login-wrap .login-form .login-head div img {
  height: 39px;
}

.login-view .login-wrap .login-form .login-head h3 {
  margin-top: 10px;
  padding-bottom: 10px;
}

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
</style>

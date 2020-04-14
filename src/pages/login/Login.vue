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
        <el-form
          label-position="top"
          :rules="rules"
          ref="ruleForm"
          :model="formData"
          label-width="80px"
        >
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
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 11, message: "长度在 6 到 11 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async login() {
      let data = {
        username: this.formData.username,
        password: this.formData.password
      };
      const res = await this.$http.post("v1/backend/login", data);
      console.log(res);
      if (res.data.code === 200) {
        this.$message({
          type: "success",
          message: "登录成功!"
        });
        // 登录成功，把token记录到本地存储中
        // localStorage.setItem("token", data.data.token);
        this.$router.push({
          name: "home"
        });
      } else {
        // 登录失败，返回失败的原因
        this.$message({
          type: "error",
          message: data.meta.msg
        });
      }
    },
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
</style>

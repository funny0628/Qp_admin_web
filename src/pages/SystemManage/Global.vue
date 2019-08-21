<template>
  <div class="global">
    <div class="player">
      <p class="config">玩家配置</p>
      <div class="playerbox">
        <el-row>
          <el-col :span="4">注册填写手机号赠送</el-col>
          <el-col :span="8">
            <el-input v-model="inputtel" class="haveinput"></el-input>
            <span class="coins">金币</span>
          </el-col>
          <el-col :span="4">新用户绑定银行卡赠送</el-col>
          <el-col :span="8">
            <el-input v-model="inputbank" class="haveinput"></el-input>
            <span class="coins">金币</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">游客赠送</el-col>
          <el-col :span="8">
            <el-input v-model="inputvisitor" class="haveinput"></el-input>
            <span class="coins">金币</span>
          </el-col>
          <el-col :span="4">兑换限额</el-col>
          <el-col :span="8">
            <el-input v-model="inputlimit" class="haveinput"></el-input>
            <span class="coins">金币</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">兑换手续费</el-col>
          <el-col :span="8">
            <el-input v-model="inputfee" class="haveinput"></el-input>
          </el-col>
          <el-col :span="4">免手续费模式</el-col>
          <el-col :span="8">
            <div class="btnbox">
              <div class="fee_btn active">每日</div>
              <div class="fee_btn">每周</div>
              <div class="fee_btn">每月</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">每日兑换次数限制</el-col>
          <el-col :span="8">
            <el-input v-model="inputday" class="haveinput"></el-input>
          </el-col>
          <el-col :span="4">金币汇率</el-col>
          <el-col :span="8">
            <el-input v-model=" exchangerate" class="haveinput" disabled></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">银行账号绑定数</el-col>
          <el-col :span="8">
            <el-input v-model="binding" class="haveinput"></el-input>
          </el-col>
          <el-col :span="4"></el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </div>
      <p class="savebtnbox">
        <permission-button :action="ActionType.EDIT">
          <el-button type="primary" size="medium" class="savebtn">保存</el-button>
        </permission-button>
      </p>
    </div>
    <div class="platform">
      <p class="config">平台设置</p>
      <div class="platformbox">
        <el-row>
          <el-col :span="4">登录开关设置</el-col>
          <el-col :span="8">
            <div class="loginbox">
              <el-checkbox-group v-model="checkboxGroup">
                <el-checkbox label="微信登录" border size="small"></el-checkbox>
                <el-checkbox label="手机登录" border size="small"></el-checkbox>
                <el-checkbox label="账号登录" border size="small"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
          <el-col :span="4">保险箱功能</el-col>
          <el-col :span="8">
            <div class="safebox">
              <el-radio-group v-model="radio" size="small">
                <el-radio label="open" border>开启</el-radio>
                <el-radio label="close" border>关闭</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">平台logo</el-col>
          <el-col :span="8">
            <div class="logobox">
              <div class="imgbox">
                <img src alt />
              </div>
              <el-upload
                :limit="1"
                :http-request="uploadsuc"
                class="upload-demo"
                action="/"
                :show-file-list="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </el-col>
          <el-col :span="4"></el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </div>
      <p class="savebtnbox">
        <permission-button :action="ActionType.EDIT">
          <el-button type="primary" size="medium" class="savebtn">保存</el-button>
        </permission-button>
      </p>
    </div>
  </div>
</template>
<script>
import PermissionButton from "../../plugin/components/PermissionButton";
import BaseIframe from "../../plugin/script/common/BaseIframe";
export default {
  extends: BaseIframe,
  components: { PermissionButton },
  data() {
    return {
      inputtel: "",
      inputbank: "",
      inputvisitor: "",
      inputlimit: "",
      inputfee: "",
      inputday: "",
      exchangerate: "默认汇率1:1",
      binding: "",
      checkboxGroup: ["微信登录"],
      radio: "open"
    };
  },
  methods: {
    uploadsuc(elefrom) {}
  }
};
</script>
<style scoped>
.global {
  margin: 20px;
}
.player {
  border: 1px solid rgba(228, 228, 228, 1);
}
.player .config,
.platform .config {
  font-weight: 650;
  font-style: normal;
  font-size: 16px;
  color: #333;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(228, 228, 228, 1);
}
.playerbox,
.platformbox {
  margin: 30px 20px;
  border: 1px solid rgba(228, 228, 228, 1);
}
.playerbox .el-row,
.platformbox .el-row {
  height: 60px;
  border-bottom: 1px solid rgba(228, 228, 228, 1);
}
.playerbox .el-row:nth-last-child(1),
.platformbox .el-row:nth-last-child(1) {
  border-bottom: none;
}
.playerbox .el-col,
.platformbox .el-col {
  height: 100%;
  border-right: 1px solid rgba(228, 228, 228, 1);
  position: relative;
}
.playerbox .el-col.el-col-4,
.platformbox .el-col.el-col-4 {
  background-color: #f2f2f2;
  text-align: center;
  font-size: 13px;
  color: #333333;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
}
.haveinput {
  width: 260px;
  height: 43px;
  margin-left: 60px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.coins {
  position: absolute;
  right: 140px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #333;
  font-weight: 400;
}
.btnbox {
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
}
.fee_btn {
  display: inline-block;
  text-align: center;
  line-height: 36px;
  width: 96px;
  height: 36px;
  background-color: #e4e4e4;
  border: 1px solid rgba(188, 188, 188, 1);
  margin-right: 10px;
  font-size: 13px;
  color: #333;
}
.active {
  background-color: rgba(0, 121, 254, 1);
  color: #fff;
  border: 1px solid transparent;
}
.savebtnbox {
  text-align: center;
}
.savebtn {
  width: 130px !important;
  height: 42px !important;
  margin-bottom: 20px;
  font-size: 16px !important;
  color: #fff !important;
}
.platform {
  border: 1px solid rgba(228, 228, 228, 1);
  margin-top: 10px;
}
.loginbox,
.safebox,
.logobox {
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
}
.imgbox {
  width: 130px;
  height: 40px;
  border: 1px solid black;
  display: inline-block;
}
.imgbox img {
  width: 100%;
  height: 100%;
}
.upload-demo{
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left:200px;
}
</style>
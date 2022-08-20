<template>
  <v-dialog v-model="registerFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius:4px;height: 550px">
      <v-icon class="float-right" @click="registerFlag = false">
        mdi-close
      </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
            v-model="phone"
            label="手机号"
            placeholder="请输入您的手机号"
            clearable
            @keyup.enter="register"
        />
        <v-text-field
            v-model="userName"
            label="昵称"
            placeholder="请输入您的昵称"
            clearable
            @keyup.enter="register"
        />
        <!-- 验证码 -->
        <div class="mt-7 send-wrapper">
          <v-text-field
              maxlength="6"
              v-model="code"
              label="验证码"
              placeholder="请输入6位验证码"
              @keyup.enter="register"
          />
          <v-btn text small :disabled="flag" @click="sendCode">
            {{ codeMsg }}
          </v-btn>
        </div>
        <!-- 密码 -->
        <v-text-field
            v-model="password"
            class="mt-7"
            label="密码"
            placeholder="请输入您的密码"
            @keyup.enter="register"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
        />
        <!-- 注册按钮 -->
        <v-btn
            class="mt-7"
            block
            color="red"
            style="color:#fff"
            @click="register"
        >
          注册
        </v-btn>
        <!-- 登录 -->
        <div class="mt-10 login-tip">
          已有账号？<span @click="openLogin">登录</span>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import thirdPartyApi from "../../api/thirdParty";
import userApi from "../../api/user";

export default {
  data: function () {
    return {
      userName: "",
      phone: "",
      username: "",
      code: "",
      password: "",
      nickname: "",
      flag: true,
      codeMsg: "发送",
      time: 60,
      show: false
    };
  },
  methods: {
    openLogin() {
      this.$store.state.registerFlag = false;
      this.$store.state.loginFlag = true;
    },
    sendCode() {
      thirdPartyApi.sendPhoneCode(this.phone).then(res => {
        if (res.code === 200) {
          // 发送短信验证码
          this.countDown();
          this.$toast({type: "success", message: "验证码发送成功"});
        } else {
          this.$toast({type: "error", message: res.message});
        }
      });
    },
    countDown() {
      this.flag = true;
      this.timer = setInterval(() => {
        this.time--;
        this.codeMsg = this.time + "s";
        if (this.time <= 0) {
          clearInterval(this.timer);
          this.codeMsg = "发送";
          this.time = 60;
          this.flag = false;
        }
      }, 1000);
    },
    register() {
      if (this.code.trim().length !== 6) {
        this.$toast({type: "error", message: "请输入6位验证码"});
        return false;
      }
      if (this.password.trim().length < 6) {
        this.$toast({type: "error", message: "密码不能少于6位"});
        return false;
      }
      if (this.userName.trim().length < 2) {
        this.$toast({type: "error", message: "昵称不能少于2位"});
        return false;
      }
      const param = {
        phone: this.phone,
        password: this.password,
        userName: this.userName,
        code: this.code
      };
      userApi.addUser(param).then(res => {
        if (res.code === 200) {
          this.$toast({type: "success", message: "注册成功"});
          this.userName = "";
          this.password = "";
          this.phone = "";
          this.$store.commit("closeModel");
          this.$store.state.loginFlag = true;
        } else {
          this.$toast({type: "error", message: res.message});
        }
      });
    }
  },
  computed: {
    registerFlag: {
      set(value) {
        this.$store.state.registerFlag = value;
      },
      get() {
        return this.$store.state.registerFlag;
      }
    },
    isMobile() {
      const clientWidth = document.documentElement.clientWidth;
      return clientWidth <= 960;
    }
  },
  watch: {
    phone(value) {
      this.flag = value.length !== 11;
    }
  }
};
</script>

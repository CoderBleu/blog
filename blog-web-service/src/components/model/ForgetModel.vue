<template>
  <v-dialog v-model="forgetFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius:4px">
      <v-icon class="float-right" @click="forgetFlag = false">
        mdi-close
      </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
            v-model="phone"
            label="手机号"
            placeholder="请输入您的手机号"
            clearable
            @keyup.enter="forget"
        />
        <!-- 验证码 -->
        <div class="mt-7 send-wrapper">
          <v-text-field
              maxlength="6"
              v-model="code"
              label="验证码"
              placeholder="请输入6位验证码"
              @keyup.enter="forget"
          />
          <v-btn :disabled="flag" text small @click="sendCode">
            {{ codeMsg }}
          </v-btn>
        </div>
        <!-- 密码 -->
        <v-text-field
            v-model="password"
            class="mt-7"
            label="密码"
            placeholder="请输入您的密码"
            @keyup.enter="forget"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
        />
        <!-- 按钮 -->
        <v-btn
            class="mt-7"
            block
            color="green"
            style="color:#fff"
            @click="forget"
        >
          确定
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
      username: "",
      code: "",
      password: "",
      flag: true,
      codeMsg: "发送",
      time: 60,
      show: false,
      phone: ""
    };
  },

  methods: {
    openLogin() {
      this.$store.state.forgetFlag = false;
      this.$store.state.loginFlag = true;
    },

    sendCode() {
      // 发送短信验证码
      thirdPartyApi.sendPhoneCode(this.phone).then(res => {
        if (res.code === 200) {
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

    forget() {
      if (this.code.trim().length !== 6) {
        this.$toast({type: "error", message: "请输入6位验证码"});
        return false;
      }
      if (this.password.trim().length < 6) {
        this.$toast({type: "error", message: "密码不能少于6位"});
        return false;
      }
      const param = {
        phone: this.phone,
        password: this.password,
        code: this.code
      };
      userApi.updatePassword(param).then(res => {
        if (res.code === 200) {
          this.$toast({type: "success", message: "修改成功"});
          this.openLogin();
        } else {
          this.$toast({type: "error", message: res.message});
        }
      });
    }
  },

  computed: {
    forgetFlag: {
      set(value) {
        this.$store.state.forgetFlag = value;
      },
      get() {
        return this.$store.state.forgetFlag;
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

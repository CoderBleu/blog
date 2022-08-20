<template>
  <v-dialog v-model="emailFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius:4px">
      <v-icon class="float-right" @click="emailFlag = false">
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
        <!-- 按钮 -->
        <v-btn
            class="mt-7"
            block
            color="blue"
            style="color:#fff"
            @click="saveUserPhone"
        >
          绑定
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import userApi from "../../api/user";
import thirdPartyApi from "../../api/thirdParty";
import {Key, PcCookie} from "../../utils/cookie";

export default {
  data: function () {
    return {
      email: this.$store.state.email,
      code: "",
      flag: true,
      codeMsg: "发送",
      time: 120,
      show: false,
      user: {},
      param: {
        email: "",
        code: ""
      },
      phone: this.$store.state.phone
    };
  },
  created() {
    this.user = PcCookie.get(Key.userInfoKey)
        ? JSON.parse(PcCookie.get(Key.userInfoKey))
        : null;
  },
  methods: {
    // 发送手机验证码
    sendCode() {
      if (this.phone.length !== 11) {
        this.$toast({type: "error", message: "手机号格式不正确"});
        return;
      }
      thirdPartyApi.sendPhoneCode(this.phone).then(response => {
        if (response.code === 200) {
          this.countDown();
          this.$toast({type: "success", message: "验证码发送成功"});
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
    saveUserPhone() {
      if (this.code.trim().length !== 6) {
        this.$toast({type: "error", message: "请输入6位验证码"});
        return false;
      }
      const param = {
        phone: this.phone,
        code: this.code,
        userId: this.user.userId
      };
      userApi.updateUserPhone(param).then(response => {
        if (response.code === 200) {
          this.$store.commit("savePhone", this.phone);
          this.phone = "";
          this.email = "";
          this.code = "";
          this.$store.commit("closeModel");
          this.$toast({type: "success", message: "绑定成功"});
        } else {
          this.$toast({type: "error", message: "绑定失败，请稍后再试!"});
        }
      });
    }
  },
  computed: {
    emailFlag: {
      set(value) {
        this.$store.state.emailFlag = value;
      },
      get() {
        return this.$store.state.emailFlag;
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

<style scoped>
@media (min-width: 760px) {
  .login-container {
    padding: 1rem;
    border-radius: 4px;
    height: 400px;
  }
}
</style>

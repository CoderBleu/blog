<template>
  <div>
    <div class="banner" :style="cover">
      <h1 class="banner-title">个人中心</h1>
    </div>
    <v-card class="blog-container">
      <div>
        <span class="info-title">基本信息</span>
      </div>
      <v-row class="info-wrapper">
        <v-col md="3" cols="12">
          <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              ref="upload"
              name="filedatas"
              :action="uploadPictureHost"
              :before-upload="uploadBefore"
              :http-request="uploadSectionFile"
              multiple
          >
            <img
                style="border-radius: 50%;width: 120px;"
                v-if="user"
                :src="user.avatar"
                class="imgAvatar"
                alt=""
            />
            <i v-else class="el-icon-plus avatar-img-icon"></i>
          </el-upload>
        </v-col>
        <v-col md="7" cols="12">
          <v-text-field
              v-model="user.username"
              label="昵称"
              placeholder="请输入您的昵称"
          />
          <div class="mt-7 binding">
            <v-text-field
                v-model="phone"
                disabled
                class="mt-7"
                label="手机号码"
                placeholder="请输入您的手机号码"
            />
            <v-btn v-if="phone" text small @click="openEmailModel">
              修改绑定
            </v-btn>
            <v-btn v-else text small @click="openEmailModel">
              绑定邮箱
            </v-btn>
          </div>
          <v-btn @click="updateUserInfo" outlined class="mt-5">修改</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import fileApi from "../../api/file";
import userApi from "../../api/user";
import AvatarCropper from "vue-avatar-cropper";
import {Key, PcCookie} from "../../utils/cookie";

export default {
  components: {AvatarCropper},
  data: function () {
    return {
      uploadPictureHost: process.env.VUE_APP_BASE_API + "/file/upload",
      // 加载层信息
      loading: [],
      files: {},
      userInfo: {
        nickname: this.$store.state.nickname,
        intro: this.$store.state.intro,
        avatar: this.$store.state.avatar,
        webSite: this.$store.state.webSite
      },
      user: {}
    };
  },

  created() {
    this.user = PcCookie.get(Key.userInfoKey)
        ? JSON.parse(PcCookie.get(Key.userInfoKey))
        : null;
    this.$store.commit("savePhone", this.user.phone);
    this.phone = this.$store.state.phone
  },

  methods: {
    updateUserInfo: function () {
      const param = {
        userId: this.user.userId,
        avatar: this.user.avatar,
        userName: this.user.username,
        phone: this.$store.state.phone
      };
      userApi.updateUser(param).then(response => {
        if (response.code === 200) {
          this.$toast({type: "success", message: "修改成功"});
        }
      });
    },
    uploadBefore: function () {
      this.openLoading();
    },
    uploadSectionFile: function (file) {
      const data = new FormData();
      data.append("file", file.file);
      fileApi
          .uploadImage(data)
          .then(response => {
            if (response.code === 200) {
              this.user.avatar = response.data;
            } else if (response.code === 306) {
              this.$notify.error({
                title: "错误",
                message: "您没有上传文件权限，请联系管理员",
                duration: 1500
              });
            } else {
              this.$notify.error({
                title: "错误",
                message: "系统异常，请稍后再试",
                duration: 1500
              });
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: "上传失败"
            });
          });
      this.loading.close();
    },
    // 打开加载层
    openLoading: function () {
      this.loading = this.$loading({
        lock: true,
        text: "正在加载中~",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    openEmailModel() {
      this.$store.state.emailFlag = true;
    }
  },
  computed: {
    email() {
      return this.$store.state.email;
    },
    phone() {
      return this.$store.state.phone;
    },
    loginType() {
      return this.$store.state.loginType;
    },
    cover() {
      const cover =
          "https://98k-hk666.oss-cn-shanghai.aliyuncs.com/iblog/img/001935-1615911575642b.jpg?versionId=CAEQNxiBgICnmfjMiBgiIDNlODdiYmQ5ZTg5MzQ4M2ViMzExZDk0YTk1NjljYjI5";
      return "background: url(" + cover + ") center center / cover no-repeat";
    }
  }
};
</script>

<style scoped>
.info-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.info-wrapper {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

#pick-avatar {
  outline: none;
}

.binding {
  display: flex;
  align-items: center;
}
</style>

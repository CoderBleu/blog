<template>
  <div>
    <!-- banner -->
    <div class="message-banner" :style="cover">
      <!-- 弹幕输入框 -->
      <div class="message-container">
        <h1 class="message-title">留言板</h1>
        <div class="animated fadeInUp message-input-wrapper">
          <input
              v-model="content"
              @click="show = true"
              @keyup.enter="addToList"
              placeholder="说点什么吧"
          />
          <button
              class="ml-3 animated bounceInLeft"
              @click="saveMessage"
              v-show="show"
          >
            发送
          </button>
        </div>
      </div>
      <!-- 弹幕列表 -->
      <div class="barrage-container">
        <vue-baberrage :barrageList="barrageList">
          <template v-slot:default="slotProps">
            <span class="barrage-items">
              <img
                  :src="slotProps.item.avatar"
                  width="30"
                  height="30"
                  style="border-radius:50%"
              />
              <span class="ml-2">{{ slotProps.item.userName }} :</span>
              <span class="ml-2">{{ slotProps.item.message }}</span>
            </span>
          </template>
        </vue-baberrage>
      </div>
    </div>
  </div>
</template>

<script>
import {Key, PcCookie} from "../../utils/cookie";
import {queryWebsite} from "../../api/index";
import articleApi from "../../api/article";

export default {
  created() {
    this.fetchWebsiteConfig();
    this.user = PcCookie.get(Key.userInfoKey)
        ? JSON.parse(PcCookie.get(Key.userInfoKey))
        : null;
  },
  mounted() {
    this.listMessage();
  },
  data() {
    return {
      show: false,
      img: process.env.VUE_APP_IMG_API,
      content: "",
      count: null,
      timer: null,
      barrageList: [],
      user: {},
      config: {}
    };
  },
  methods: {
    // 查询网站配置信息
    fetchWebsiteConfig() {
      queryWebsite().then(response => {
        if (response.code === 200) {
          this.config = response.data;
        }
      });
    },
    addToList() {
      if (this.count) {
        this.$toast({type: "error", message: "30秒后才能再次留言"});
        return false;
      }
      if (this.content.trim() === "") {
        this.$toast({type: "error", message: "留言不能为空"});
        return false;
      }
      const userAvatar = this.user ? this.user.avatar : this.config.visitAvatar;
      const userNickname = this.user ? this.user.username : "游客";
      const message = {
        avatar: userAvatar,
        status: 1,
        userName: userNickname,
        message: this.content,
        time: Math.floor(Math.random() * 10 + 8)
      };
      this.barrageList.push(message);
      this.content = "";
      this.saveMessage();
      const TIME_COUNT = 30;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 30) {
            this.count--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },

    // 保存留言
    saveMessage() {
      if (this.content.trim() === "") {
        this.$message.info("留言不能为空");
        return false;
      }

      const userId = this.user ? this.user.userId : null;
      const avatar = this.user ? this.user.avatar : this.config.visitAvatar;
      const userName = this.user ? this.user.username : "游客";
      const saveObj = {
        avatar,
        status: 1,
        userName,
        userId,
        message: this.content,
        time: Math.floor(Math.random() * 10 + 8)
      };

      articleApi.saveMessage(saveObj).then(response => {
        if (response.code === 200) {
          this.barrageList.push(saveObj);
          this.content = "";
        }
      });
    },

    async listMessage() {
      const {code, data} = await articleApi.getAllMessage();
      if (code === 200) {
        data.forEach(item => {
          const obj = {
            avatar: item.avatar,
            userName: item.userName,
            message: item.message,
            time: Math.floor(Math.random() * 10 + 8)
          };
          this.barrageList.push(obj);
        });
      }
    }
  },
  computed: {
    cover() {
      const cover = "https://img-blog.csdnimg.cn/20210309194854908.jpg";
      return "background: url(" + cover + ") center center / cover no-repeat";
    }
  }
};
</script>

<style scoped>
.message-banner {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: #49b1f5;
  animation: header-effect 1s;
}

.message-title {
  color: #eee;
  animation: title-scale 1s;
}

.message-container {
  position: absolute;
  width: 360px;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  margin: 0 auto;
  color: #fff;
}

.message-input-wrapper {
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin-top: 2rem;
}

.message-input-wrapper input {
  outline: none;
  width: 70%;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  color: #eee;
  border: #fff 1px solid;
}

.message-input-wrapper input::-webkit-input-placeholder {
  color: #eeee;
}

.message-input-wrapper button {
  outline: none;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  border: #fff 1px solid;
}

.barrage-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 50px);
  width: 100%;
}

.barrage-items {
  background: rgb(0, 0, 0, 0.7);
  border-radius: 100px;
  color: #fff;
  padding: 5px 10px 5px 5px;
  align-items: center;
  display: flex;
}
</style>

<template>
  <v-footer app padless absolute>
    <div class="footer-wrap">
      <div style="height: 20px;">
        ©{{ 2021 }} -
        {{ new Date().getFullYear() }} By
        {{websiteInfo.author}}
      </div>
      <a href="https://beian.miit.gov.cn/" target="_blank" style="height: 20px;">
        {{websiteInfo.recordNum}}
      </a>
    </div>
  </v-footer>
</template>

<script>
import {queryWebsite} from "../../api/index";

export default {
  data() {
    return {
      websiteInfo: {}
    };
  },

  created() {
    this.fetchWebsiteInfo();
  },

  methods: {
    fetchWebsiteInfo() {
      queryWebsite().then(response => {
        if (response.code === 200) {
          this.websiteInfo = response.data;
        }
      });
    }
  }
  /*computed: {
    isMessage() {
      return this.$route.path == "/message";
    },
    blogInfo() {
      return this.$store.state.blogInfo;
    }
  }*/
};
</script>

<style scoped>
.footer-wrap {
  width: 100%;
  line-height: 1;
  position: relative;
  padding: 40px 20px;
  color: #eee;
  font-size: 14px;
  text-align: center;
  background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: Gradient 10s ease infinite;
}

.footer-wrap a {
  color: #eee !important;
}

@keyframes Gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>

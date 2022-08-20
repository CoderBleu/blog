<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">归档</h1>
    </div>
    <!-- 归档列表 -->
    <v-card class="blog-container">
      <timeline>
        <timeline-title> 目前共计{{ count }}篇文章，继续加油</timeline-title>
        <!--        <timeline-title v-if="!archiveList"> 目前共计{{ 0 }}篇文章，继续加油 </timeline-title>-->
        <timeline-item v-for="item of archiveList" :key="item.articleId">
          <!-- 日期 -->
          <span class="time">{{ item.createTime | date }}</span>
          <!-- 文章标题 -->
          <router-link
              :to="'/articles/' + item.articleId"
              style="color:#666;text-decoration: none"
          >
            {{ item.title }}
          </router-link>
        </timeline-item>
      </timeline>
      <!-- 分页按钮 -->
      <v-pagination
          color="#00C4B6"
          v-model="current"
          :length="Math.ceil(count / 8)"
          total-visible="7"
      />
    </v-card>
  </div>
</template>

<script>
import {Timeline, TimelineItem, TimelineTitle} from "vue-cute-timeline";
import articleApi from "../../api/article";

export default {
  metaInfo: {
    meta: [
      {
        name: "keyWords",
        content: "拾壹博客,开源博客,www.shiyit.com" //变量或字符串
      },
      {
        name: "description",
        content:
            "一个专注于技术分享的博客平台,大家以共同学习,乐于分享,拥抱开源的价值观进行学习交流"
      }
    ]
  },
  created() {
    this.listArchives();
  },
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data: function () {
    return {
      count: 0,
      current: 1,
      archiveList: []
    };
  },
  methods: {
    listArchives() {
      const param = {
        current: this.current,
        size: 8
      };
      articleApi.getArchives(param).then(response => {
        if (response.code === 200) {
          this.archiveList = response.data.list;
          this.count = response.data.total;
        }
      });
    }
  },
  computed: {
    cover() {
      const cover =
          "https://98k-hk666.oss-cn-shanghai.aliyuncs.com/iblog/img/135527719.jpg?versionId=CAEQNRiBgIDv6orahRgiIDc1YjE1MjdhODVlZjRhMmQ5N2Q2MzBjZTQyOWQ3Y2Ni";
      return "background: url(" + cover + ") center center / cover no-repeat";
    }
  },
  watch: {
    current(value) {
      this.current = value;
      this.listArchives();
    }
  }
};
</script>

<style scoped>
.time {
  font-size: 0.75rem;
  color: #555;
  margin-right: 1rem;
}
</style>

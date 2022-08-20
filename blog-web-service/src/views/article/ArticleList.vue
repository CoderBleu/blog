<template>
  <div>
    <!-- 标签或分类名 -->
    <div class="banner" :style="cover">
      <h1 class="banner-title animated fadeInDown">{{ title }}</h1>
    </div>
    <div class="article-list-wrapper">
      <v-row>
        <v-col
            md="4"
            cols="12"
            v-for="item of articleList"
            :key="item.articleId"
        >
          <!-- 文章 -->
          <v-card class="animated zoomIn article-item-card">
            <div class="article-item-cover">
              <router-link :to="'/articles/' + item.articleId">
                <!-- 缩略图 -->
                <v-img
                    class="on-hover"
                    width="100%"
                    height="100%"
                    :src="item.img"
                />
              </router-link>
            </div>
            <div class="article-item-info">
              <!-- 文章标题 -->
              <div>
                <router-link :to="'/articles/' + item.articleId">
                  {{ item.title }}
                </router-link>
              </div>
              <div style="margin-top:0.375rem">
                <!-- 发表时间 -->
                <v-icon size="20">mdi-clock-outline</v-icon>
                {{ item.createTime | date }}
                <!-- 文章分类 -->
                <router-link
                    :to="'/categories/' + item.categoryId"
                    class="float-right"
                >
                  <v-icon>mdi-bookmark</v-icon>
                  {{ item.categoryName }}
                </router-link>
              </div>
            </div>
            <!-- 分割线 -->
            <v-divider></v-divider>
            <!-- 文章标签 -->
            <!--            <div class="tag-wrapper">
              <router-link
                v-for="tag of item.tagDTOList"
                :key="tag.id"
                :to="'/tags/' + tag.id"
                class="tag-btn"
              >
                {{ tag.name }}
              </router-link>
            </div>-->
          </v-card>
        </v-col>
      </v-row>
      <!-- 分页按钮 -->
      <v-pagination style="margin-top: -5px;"
                    color="#00C4B6"
                    v-model="current"
                    :length="Math.ceil(count / 6)"
                    total-visible="7"
      />
    </div>
  </div>
</template>

<script>
import articleApi from "../../api/article";

export default {
  created() {
    const path = this.$route.path;
    if (path.indexOf("/categories") !== -1) {
      this.title = "分类";
    } else {
      this.title = "标签";
    }
    ;
    this.fetchArticle();
  },
  data: function () {
    return {
      current: 1,
      img: process.env.VUE_APP_IMG_API,
      size: 6,
      articleList: [],
      name: "",
      title: "",
      count: 0
    };
  },
  methods: {
    fetchArticle() {
      if (this.title === "分类") {
        this.fetchCategoryArticle();
      } else {
        this.fetchLabelArticle();
      }
    },

    fetchLabelArticle() {
      const param = {
        current: this.current,
        size: this.size,
        labelId: this.$route.params.tagId
      };
      articleApi.getArticlesByLabelId(param).then(response => {
        if (response.code === 200) {
          this.articleList = response.data.respVoList;
          this.count = response.data.size;
        }
      });
    },

    fetchCategoryArticle() {
      const param = {
        current: this.current,
        size: this.size,
        categoryId: this.$route.params.categoryId
      };
      articleApi.getArticlesById(param).then(response => {
        if (response.code === 200) {
          this.articleList = response.data.respVoList;
          this.count = response.data.size;
        }
      });
    }
  },
  watch: {
    current(value) {
      this.current = value;
      this.fetchArticle();
    }
  },
  computed: {
    cover() {
      const cover =
          "https://98k-hk666.oss-cn-shanghai.aliyuncs.com/iblog/img/135527719.jpg?versionId=CAEQNRiBgIDv6orahRgiIDc1YjE1MjdhODVlZjRhMmQ5N2Q2MzBjZTQyOWQ3Y2Ni";
      return "background: url(" + cover + ") center center / cover no-repeat";
    }
  }
};
</script>

<style scoped>
@media (min-width: 760px) {
  .article-list-wrapper {
    max-width: 1106px;
    margin: 370px auto 1rem auto;
  }

  .article-item-card:hover {
    transition: all 0.3s;
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  }

  .article-item-card:not(:hover) {
    transition: all 0.3s;
  }

  .article-item-card:hover .on-hover {
    transition: all 0.6s;
    transform: scale(1.1);
  }

  .article-item-card:not(:hover) .on-hover {
    transition: all 0.6s;
  }

  .article-item-info {
    line-height: 1.7;
    padding: 15px 15px 12px 18px;
    font-size: 15px;
  }
}

@media (max-width: 759px) {
  .article-list-wrapper {
    margin-top: 230px;
    padding: 0 12px;
  }

  .article-item-info {
    line-height: 1.7;
    padding: 15px 15px 12px 18px;
  }
}

.article-item-card {
  border-radius: 8px !important;
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
}

.article-item-card a {
  transition: all 0.3s;
}

.article-item-cover {
  height: 220px;
  overflow: hidden;
}

.article-item-card a:hover {
  color: #8e8cd8;
}

.tag-wrapper {
  padding: 10px 15px 10px 18px;
}

.tag-wrapper a {
  color: #fff !important;
}

.tag-btn {
  display: inline-block;
  font-size: 0.725rem;
  line-height: 22px;
  height: 22px;
  border-radius: 10px;
  padding: 0 12px !important;
  background: linear-gradient(to right, #bf4643 0%, #6c9d8f 100%);
  opacity: 0.6;
  margin-right: 0.5rem;
}
</style>

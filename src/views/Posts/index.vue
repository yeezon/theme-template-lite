<template>
  <div class="posts-view">
    <div class="ctnr">
      <article class="item" v-for="(item, index) of posts" :key="item.id">
        <div :class="['cover', { shrink: growIndex.indexOf(index) !== -1 ? false : true }]">
          <img :src="item.cover_image.src" :alt="item.cover_image.alt" @click="fnImgClick(index)"/>
        </div>
        <router-link :to="`/posts/${item.handle}`">
          <h2 class="title">{{ item.title }}</h2>
        </router-link>
        <hr class="divide-line" />
        <p class="summary">{{ item.summary }}</p>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: [],
      growIndex: []
    }
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      this.postLoading = true
      this.$sdk.post.get(this.config, ({ res }) => {
        if (res.code === 200) {
          this.postLoading = false
          this.posts = res.posts
          this.total = res.paging.pages
        }
      })
    },

    fnImgClick (index) {
      const { growIndex } = this.$data
      const curIndex = growIndex.indexOf(index)

      if (curIndex === -1) {
        growIndex.push(index)
      } else {
        growIndex.splice(curIndex, 1)
      }
    }
  }
}
</script>

<style scoped>
.posts-view {
  width: 94%;
  padding: 20px 0;
  margin: 0 auto;
}
.item {
  text-align: center;
}
.cover {
  position: relative;
  width: 100%;
  cursor: zoom-out;
  overflow: hidden;
}
.cover img {
  width: 100%;
  transform: translate3d(0, 0, 0);
  transition: margin 0.3s ease;
  margin: 0;
}
.cover.shrink {
  cursor: zoom-in;
}
.cover.shrink img {
  margin: -6% auto -6%;
}
.title {
  font-size: 40px;
  font-weight: 800;
  margin-top: 40px;
}
.title:hover {
  color: #5a7;
}
.summary {
  width: 50%;
  margin: 0 auto 70px;
  font-size: 14px;
  font-weight: 100;
  line-height: 1.8em;
}
.divide-line {
  width: 160px;
  height: 1px;
  margin: 60px auto;
  border: none;
  background-color: #e5e5e5;
}
@media (max-width: 768px) {
  .posts-view {
    width: 100% !important;
    padding: 0 !important;
  }
  .cover.shrink img {
    margin: 0 !important;
  }
  .title {
    font-size: 18px !important;
  }
  .divide-line {
    margin: 30px auto !important;
  }
}
</style>

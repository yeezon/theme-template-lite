<template>
  <div class="post-view">
    <div class="item">
      <h2 class="title">{{post.title}}</h2>
      <span class="time">{{post.publish_at | date}}</span>
      <rich-text v-if="post.content" :cont="post.content"></rich-text>
    </div>
  </div>
</template>

<script>
import RichText from '@/components/HTML/RichText'

export default {
  components: {
    RichText
  },
  data () {
    return {
      post: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const { handle } = this.$route.params

      this.$sdk.post.get(handle, ({ res }) => {
        if (res.code === 200) {
          this.post = res.post
        }
      })
    }
  }
}
</script>

<style scoped>
.post-view {
  min-height: calc(100vh - 370px);
  width: 100%;
  border-top: .1px solid transparent;
  border-bottom: .1px solid transparent;
}

.item {
  margin: 20px auto;
  max-width: 1160px;
}

.title {
  font-size: 32px;
  color: #000;
  text-align: center;
  margin-bottom: 20px;
}
.time {
  display: block;
  text-align: center;
  font-size: 12px;
  color: #777;
  margin-bottom: 15px;
}

@media screen and (max-width:768px) {
  .post-view {
    padding: 0 10px;
    box-sizing: border-box;
  }
  .title {
    font-size: 24px;
    padding-top: 20px;
  }
}
</style>

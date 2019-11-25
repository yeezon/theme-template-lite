<template>
  <div class="_404-view">
    <div>对不起，您访问的页面不存在！</div>
    <router-link class="link" to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: '404View'
}
</script>

<style scoped>
._404-view {
  margin: 100px auto;
  max-width: 500px;
  text-align: center;
  line-height: 1;
}
.link {
  display: inline-block;
  margin: 15px 0 0;
}
</style>

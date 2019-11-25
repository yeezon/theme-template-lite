<template>
  <div class="home-view">
    <div v-if="oSetting.banners_show">
      <a v-if="oSetting.banner_1_show" :href="oSetting.banner_1_link" :target="oSetting.banner_1_link_type === '1' ? '_blank' : '_self'">
        <img class="img" :src="'/assets/img/banner_1.jpg' | imgURL" alt="banner_1">
      </a>
    </div>
  </div>
</template>

<script>
import { settings } from '@/mixins'

export default {
  name: 'HomeView',
  data () {
    return {}
  },
  mixins: [settings]
}
</script>

<style scoped>
.img {
  width: 100%;
}
</style>

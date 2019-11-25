<template>
  <div class="menu">
    <div class="links">
      <template v-for="(oLink, index) of links">
        <router-link class="link" :to="oLink.page_url" :key="index">{{ oLink.title }}</router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      links: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$sdk.shop.get('linklists', ({ res }) => {
        if (res.code === 200) {
          this.links = res.linklists.main.links
        }
      })
    }
  }
}
</script>

<style scoped>
.links {
  margin: 20px 0;
}
.link {
  display: inline-block;
  margin: 0 15px 0 0;
}
</style>

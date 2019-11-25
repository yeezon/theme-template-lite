<template>
  <footer class="footer">
    <div class="cont">
      <div class="copyright" v-html="oSetting.footer_copyright"></div>
      <ul class="nav">
        <h2 class="title">相关链接</h2>
        <li v-for="item in linklists" :key="item.id" class="item">
          <a :href="item.page_url" class="title">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LayoutMainFooter',
  data () {
    return {
      linklists: []
    }
  },
  computed: {
    oSetting () {
      return this.$store.state.setting.oData
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$sdk.shop.get('linklists', ({ res }) => {
        const linkLists = res.linklists
        if (res.code === 200) {
          this.linklists = linkLists.footer.links
        }
      })
    }
  }
}
</script>

<style scoped>
.footer {
  font-size: 14px;
  color: #999;
}

.cont {
  height: 220px;
  padding: 0 100px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  text-align: center;
  margin: 0 0 15px;
}

.item {
  display: inline-block;
  margin: 0 20px;
}
</style>

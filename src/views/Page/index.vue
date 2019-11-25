<docs>
## PageView Docs
</docs>

<todo>
* 抽出，和 PageBlock 一起使用 YkHTML
</todo>

<template>
  <div :key="oPage.id" class="page-view" data-com="PageView">
    <s-html class="cont" v-if="cont" :cont="cont"></s-html>
    <div v-else-if="!isLoading && !err">暂无内容~</div>
  </div>
</template>

<script>
import sHtml from '@/components/HTML'

export default {
  name: 'PageView',
  components: {
    sHtml
  },
  data () {
    return {
      isLoading: false,
      err: '',
      cont: '',
      oPage: {}
    }
  },
  computed: {
    handle () {
      return this.$route.params.handle || ''
    }
  },
  watch: {
    oPage (oVal) {
      this.setCont(oVal)
    }
  },
  created () {
    this.getPage()
  },
  methods: {
    getPage () {
      const _handle = this.$route.params.handle

      if (this.isLoading || !_handle) return

      this.err = ''
      this.isLoading = true

      this.$sdk.page.get((_handle || {}), (data) => {
        if (data.res.code === 200) {
          this.err = ''
          this.oPage = data.res.page || {}
        } else {
          this.err = '获取内容数据失败'
        }
        this.isLoading = false
      })
    },
    setCont (oPage) {
      if (oPage.use_mobile_content && this.$env.isMobi) {
        this.cont = oPage.mobile_content_html || ''
      } else {
        this.cont = oPage.content_html || ''
      }
    },
    fnRetry () {
      this.getPage()
    }
  }
}
</script>

<style scoped>
.cont {
  z-index: 1;
}
</style>

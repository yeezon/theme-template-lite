<docs>
## SkHTML Docs

* 运行 JS 脚本
</docs>

<template>
  <div class="sk-html" data-com="SkHTML" @click="fnClickProxy">
    <div ref="cont"></div>
  </div>
</template>

<script>
export default {
  name: 'SkHTML',
  props: {
    cont: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.setCont()
  },
  methods: {
    fnClickProxy (evt) {
      const eNow = evt.target
      const eA = eNow.closest('a') // eNow 自身也参与筛选

      if (eA && !eA.querySelector('.sk-html')) {
        evt.preventDefault()
        evt.stopPropagation()

        const _link = (eA.href || '').replace(window.location.origin, '')

        if (_link && _link.indexOf('javascript:') < 0) {
          if (/^http/.test(_link)) {
            window.location.href = _link
          } else {
            this.$router.push(_link)
          }
        }
      }
    },
    setCont () {
      // 暂时先用 jQ
      const _eDOM = window.document.createElement('div')
      window.$(_eDOM).html(this.cont)
      window.$(this.$refs.cont).replaceWith(_eDOM.querySelector('.youpage-cont'))
      // 重新 ElementQueries Init
      window.ElementQueries.init()
    }
  }
}
</script>

<style scoped>
.sk-html {
  -webkit-tap-highlight-color: transparent;
}
</style>

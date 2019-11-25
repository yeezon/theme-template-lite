<docs>
## RichText Docs

* 富文本无需运行 JS 脚本
</docs>

<template>
<div class="rich-text" @click="fnClickProxy"></div>
</template>

<script>
export default {
  name: 'RichText',
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

      if (eA && !eA.querySelector('.rich-text')) {
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
      this.$el.innerHTML = this.cont || ''
    }
  }
}
</script>

<style scoped>
.rich-text {
  -webkit-tap-highlight-color: transparent;
}
.rich-text /deep/ img {
  max-width: 100%;
}
/* 图片内容，消除上下间隙，避免范围过大，影响到内联小图片对齐文字基线 */
.rich-text /deep/ > img,
.rich-text /deep/ > div > img,
.rich-text /deep/ > p > img {
  vertical-align: middle;
}
</style>

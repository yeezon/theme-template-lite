
<template>
<div id="app" class="app">
  <component :is="layoutName">
    <router-view></router-view>
  </component>
</div>
</template>

<script>
import sMain from './layouts/Main'
import sBlank from './layouts/Blank'

export default {
  name: 'App',
  components: {
    sMain,
    sBlank
  },
  data () {
    return {
      layout: 'main'
    }
  },
  computed: {
    layoutName () {
      return `s-${(this.layout || 'main')}`
    }
  },
  watch: {
    $route (oVal) {
      this.layout = (oVal.meta.layout || 'main')
    }
  },
  created () {
    this.layout = (this.$route.meta.layout || 'main')
  }
}
</script>

<template>
  <header class="header">
    <div class="nav">
      <h1>
        <router-link to="/">
          <img :src="'/assets/img/logo.png' | imgURL" alt="Logo">
        </router-link>
      </h1>
      <s-menu></s-menu>
    </div>
  </header>
</template>

<script>
import sMenu from '@/components/Menu'

export default {
  name: 'LayoutMainHeader',
  data () {
    return {
      isCompress: false
    }
  },
  components: {
    sMenu
  }
}
</script>

<style scoped>
.header {
  height: 150px;
  display: flex;
  align-items: center;
  background-color: #fff;
  transition: all .2s ease;
  z-index: 9;
}

.nav {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 94%;
  max-width: 1160px;
  margin: 0 auto;
}
</style>

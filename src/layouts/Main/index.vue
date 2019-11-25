<template>
<div>
  <keep-alive>
    <s-header></s-header>
  </keep-alive>
  <s-main>
    <slot></slot>
  </s-main>
  <s-footer></s-footer>
</div>
</template>

<script>
import sMain from './components/Main/'
import sHeader from './components/Header/'
import sFooter from './components/Footer/'

export default {
  name: 'LayoutMain',
  components: {
    sMain,
    sHeader,
    sFooter
  }
}
</script>

<style scoped></style>

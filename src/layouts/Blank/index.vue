<template>
<div class="layout-blank">
  <s-main>
    <slot></slot>
  </s-main>
</div>
</template>

<script>
import sMain from './components/Main'

export default {
  name: 'LayoutBlank',
  components: {
    sMain
  }
}
</script>

<style scoped></style>

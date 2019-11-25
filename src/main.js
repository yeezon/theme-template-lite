
// CSS Resets
import 'normalize.css'

// Ponyfills
import cssVars from 'css-vars-ponyfill'

import Vue from 'vue'
import router from './router'
import store from './store'
import i18n from './i18n'
// import './registerServiceWorker'

import Filters from './filters' // Filters
// import Components from './components'

import App from './App.vue'

import './icons' // Icons，后面优化成用 Vue.use
import './styles'

import initData from './lib/initData'
import getEnv from './lib/getEnv'
import initCSSVar from './lib/initCSSVar'

// Fix Vue CLI BUG
// Runtime PublicPath
// eslint-disable-next-line
__webpack_public_path__ = (((((window.document.currentScript || {}).src || '').match(/(.+\/)[^/]+\.js/) || [])[1]) || '').replace(/js\/$/, '') || '/'

Vue.config.productionTip = false

Vue.use(Filters)
// Vue.use(Components)

// 全局属性
Vue.prototype.$env = getEnv()
Vue.prototype.$sdk = (window.yhsd || {}).sdk || {}

const vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
})

// 初始化必要数据
initData().then(() => {
  initCSSVar(store.state.setting.oData) // 初始化 CSS 变量设置

  cssVars({
    include: 'style',
    watch: true
  })

  vm.$mount('#app')
})

import Vue from 'vue'
import Router from 'vue-router'

import Guards from './guards'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  fallback: false, // 需后端支持，所有页面访问都返回 index.html 文件内容
  routes: [
    ...routes
  ]
})

router.beforeEach(Guards.beforeEach)
router.beforeResolve(Guards.beforeResolve)

export default router

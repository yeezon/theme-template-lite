const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    path: '/pages/:handle',
    name: 'page',
    component: () => import('@/views/Page')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('@/views/Posts')
  },
  {
    path: '/posts/:handle',
    name: 'post',
    component: () => import('@/views/Post')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      layout: 'blank'
    }
  }
]

export default routes

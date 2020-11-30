import Vue from 'vue'
import VueRouter from 'vue-router'
import { LoadingBar } from 'view-design'
import routes from './routes'
import axios from '../utils/axios'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 })
})

router.beforeEach((to, from, next) => {
  localStorage.setItem('breadcrumb', JSON.stringify(to))
  if (to.fullPath == '/login') {
    next()
    return
  }
  axios.get('/rest/customUserInfo').then(
    function(r) {
      if (r.success) {
        next()
        return
      }
      router.push('/login')
    },
    function() {
      router.push('/login')
    }
  )
})

router.afterEach(() => {
  LoadingBar.finish()
})

export default router

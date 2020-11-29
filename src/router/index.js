import Vue from 'vue'
import VueRouter from 'vue-router'
import { LoadingBar } from 'view-design'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 })
})

router.beforeEach((to, from, next) => {
  localStorage.setItem('breadcrumb', JSON.stringify(to))
  // this.$store.commit('saveHeader', to)
  // console.log(to, from)
  next()
})

router.afterEach(() => {
  LoadingBar.finish()
})

export default router

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import store from './store'
import 'view-design/dist/styles/iview.css'
import './styles/reset.less'

import './styles/common.less'
Vue.config.productionTip = false
Vue.use(ViewUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

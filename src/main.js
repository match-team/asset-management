import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import store from './store'
import 'view-design/dist/styles/iview.css'
import './styles/reset.less'
import Print from 'vue-print-nb'

Vue.use(Print) //注册
import './styles/common.less'
Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.filter("DATE_DAY",function (val){
  if (val){
    return val.substr(0,val.indexOf(" "));
  }
  return "-";
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import _ from 'lodash'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

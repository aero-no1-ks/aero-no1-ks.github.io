import Vue from 'vue'
import App from './App.vue'
import _   from 'lodash'
import store from '@/store'
import router from '@/router'

import '@/plugins/vuetify'
import '@/main.styl'

//** echarts
import echarts   from 'echarts'
import echartsGl from 'echarts-gl'
import { chalk } from '@/api/echartsTheme'
// import 'zrender/lib/svg/svg'
import usa       from '@/shared/usa.fine'
import world     from 'world-map-geojson'
window.echarts   = echarts
window.echartsGl = echartsGl
echarts.registerMap('usa', usa)
echarts.registerMap('world', world)
echarts.registerTheme('chalk', chalk)

Vue.config.productionTip = false

//** helper functions & variables
window.$ = x => {
  const o = [...document.querySelectorAll(x)]
  return _.size(o) === 1 ? o[0] : o
}
window.m    = console.log
window.json = JSON.stringify
window.debounce = (fn, wait, immediate) => {
  let timeout
  return () => {
    const context = this, args = arguments, callNow = immediate && !timeout
    const later = () => { timeout = null; if(!immediate) fn.apply(context, args) }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if(callNow) fn.apply(context, args)
  }
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue    from 'vue'
import Router from 'vue-router'
import Main   from '@/components/_Main'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'main',
    component: Main
  }, {
    path: '/production',
    name: 'production',
    //** route level code-splitting
    //** this generates a separate chunk (about.[hash].js) for this route
    //** which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "production" */ '@/components/_Production.vue')
  }, {
    path: '/attraction',
    name: 'attraction',
    component: () => import(/* webpackChunkName: "attraction" */ '@/components/_Attraction.vue')
  }, {
    path: '/connection',
    name: 'connection',
    component: () => import(/* webpackChunkName: "connection" */ '@/components/_Connection.vue')
  }],
})

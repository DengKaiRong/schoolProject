'use strict'
import VueRouter from 'vue-router'

exports.VueRouter = VueRouter

var routes = [
  {
      path: '/setting',
      name: 'setting',
      component: require('./components/setting.vue')
    },
    {
      path: '/summary',
      name: 'summary',
      component: require('./components/summary.vue')
    },
    {
      path: '/personal/:id',
      name: 'personal',
      component: require('./components/personal.vue')
    }
]

exports.routerConfig = new VueRouter({
  linkActiveClass: 'active',
  routes // （缩写）相当于 routes: routes
})

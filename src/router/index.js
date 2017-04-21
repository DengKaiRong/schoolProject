import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/setting',
      name: 'setting',
      component: require('../components/setting.vue')
    },
    {
      path: '/summary',
      name: 'summary',
      component: require('../components/summary.vue')
    }
  ]
})

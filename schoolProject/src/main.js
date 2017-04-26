
import Vue from 'vue'
import App from './App'
import { VueRouter, routerConfig } from './router'
import VueResource from 'vue-resource'
import path from './path'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

require('./assets/css/style.css')


path();
// autosize();

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Element)

new Vue({
  el: '#app',
  router: routerConfig,
  template: '<App/>',
  components: { App }
})

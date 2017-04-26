
import Vue from 'vue'
import App from './App'
import { VueRouter, routerConfig } from './router'
import VueResource from 'vue-resource'
import path from './path'
// import 'expose?$!expose?jQuery!jquery/dist/jquery.min.js';

require('./assets/css/style.css')


path();
// autosize();

Vue.use(VueResource)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  router: routerConfig,
  template: '<App/>',
  components: { App }
})

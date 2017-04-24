// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './net.js'
import './path.js'

import './assets/css/style.css'
// import './assets/js/basic.js'
// import './assets/js/highcharts.js'
// import './assets/js/jquery-1.7.2.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

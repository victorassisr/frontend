import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import jquery from 'jquery/dist/jquery.min.js'
import popper from 'popper.js/dist/popper.min.js'
import bootstrapJs from 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios/dist/axios.min.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

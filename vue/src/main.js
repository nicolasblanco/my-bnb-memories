// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueMaterial)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBy8Fm2DC57L-W5zZbjkE-GONyjJG1k8o8'
    // libraries: 'places', //// If you need to use place input
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

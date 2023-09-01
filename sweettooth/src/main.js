import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify.js'
import croppa from './plugins/croppa.js'
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  croppa,
  render: h => h(App)
}).$mount('#app')

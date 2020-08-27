import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import vuetify from './plugins/vuetify'
import store from './store.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')

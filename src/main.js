import Vue from 'vue'
import App from './App.vue'
import VueAnalytics, { onAnalyticsReady } from 'vue-analytics'
import vueHeadful from 'vue-headful';

Vue.config.productionTip = false

Vue.component('vue-headful', vueHeadful);
Vue.use(VueAnalytics, {
  id: 'UA-3354517-5'
})

const A = new Vue({
  render: h => h(App)
})

onAnalyticsReady().then(() =>{
  A.$mount('#app')
})

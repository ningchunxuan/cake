import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'
import router from './router/index.js'
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

window.$ = $;

Vue.config.productionTip = false

new Vue({
    store,
    router,
  render: h => h(App)
}).$mount('#app')

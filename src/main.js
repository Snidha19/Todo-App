import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store/store';
import router from './router/index';
import '@/plugins/firebase';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

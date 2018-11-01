import Vue from 'vue';

import './plugins/vuetify';
import './registerServiceWorker';
import '@babel/polyfill';

import App from './App.vue';
import router from './router';
import { store } from './store/';

Vue.config.productionTip = false;

// Vue.component('AddSessionForm', AddSessionForm);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
